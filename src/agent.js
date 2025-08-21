// src/agent.js

class AIAgent {
    constructor(apiKey, model, webBrowsingEnabled = false) {
        this.apiKey = apiKey;
        this.model = model;
        this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        this.webBrowsingEnabled = webBrowsingEnabled;
    }

    async _callApi(prompt, history = []) {
        const contents = [...history, { role: 'user', parts: [{ text: prompt }] }];
        const systemInstruction = localStorage.getItem('systemInstruction') || '';

        const requestBody = {
            contents,
            systemInstruction: {
                parts: [{ text: systemInstruction }]
            }
        };

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`API Error: ${response.status} - ${errorBody.error.message}`);
        }
        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0]) {
            const part = data.candidates[0].content.parts[0];
            if (part.text) {
                return part.text;
            } else if (part.functionCall) {
                return { functionCall: part.functionCall };
            }
        }
        throw new Error("No valid response content from AI.");
    }

    _validateJsonResponse(json, requiredKeys) {
        for (const key of requiredKeys) {
            if (!json.hasOwnProperty(key)) {
                throw new Error(`Invalid JSON response: missing required key '${key}'.`);
            }
        }
    }

    async _getProjectSummary() {
        const allFiles = await window.getAllProjectFiles();
        if (!allFiles || allFiles.length === 0) {
            return "No project files found.";
        }

        const tree = {};
        for (const path of allFiles) {
            let currentLevel = tree;
            const parts = path.split('/');
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                if (i === parts.length - 1) {
                    currentLevel[part] = null; // It's a file
                } else {
                    if (!currentLevel[part]) {
                        currentLevel[part] = {}; // It's a directory
                    }
                    currentLevel = currentLevel[part];
                }
            }
        }

        function formatTree(node, prefix = '') {
            let result = '';
            const entries = Object.entries(node);
            for (let i = 0; i < entries.length; i++) {
                const [name, child] = entries[i];
                const isLast = i === entries.length - 1;
                const connector = isLast ? '└── ' : '├── ';
                result += `${prefix}${connector}${name}\n`;
                if (child) {
                    const childPrefix = prefix + (isLast ? '    ' : '│   ');
                    result += formatTree(child, childPrefix);
                }
            }
            return result;
        }

        return `
--- PROJECT FILE STRUCTURE ---
${formatTree(tree)}
-----------------------------
`;
    }

    async plan(userRequest, contextCode, history) {
        const projectSummary = await this._getProjectSummary();
        const planPrompt = `
             You are an expert AI programmer. Your task is to create a step-by-step plan to accomplish the user's request.
             The user's latest request is: "${userRequest}"
 
 
             You have been provided with the following project files as context:
             ${projectSummary}
             ${contextCode}
 
             **Crucially, before planning to create a file, you MUST check if a file with a similar name or purpose already exists in the provided context.**
             If a relevant file exists, your plan should be to MODIFY it, not create a new one.
 
             Based on the user's request and the provided context, generate a JSON object that describes the plan.
             The JSON object should have a single key "plan" which is an array of strings. Each string is a clear, user-facing description of a step in the plan.
 
             Example Request: "add a logout button to the navbar"
             Example Context: Contains a file named 'components/Navbar.js'.
             Example Plan Response:
             {
               "plan": [
                 "1. Modify components/Navbar.js to include a new logout button."
               ]
             }
         `;

        const rawResponse = await this._callApi(planPrompt, history);
        try {
            const startIndex = rawResponse.indexOf('{');
            const endIndex = rawResponse.lastIndexOf('}');
            if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                const jsonString = rawResponse.substring(startIndex, endIndex + 1);
                const planJson = JSON.parse(jsonString);
                this._validateJsonResponse(planJson, ['plan']);
                return planJson;
            }
        } catch (e) {
            console.error("Failed to parse plan JSON:", e);
            console.error("Raw response was:", rawResponse);
            throw new Error("Failed to parse plan from AI response. Invalid JSON received.");
        }
        throw new Error("Failed to find a valid JSON object in the plan response.");
    }

    async execute(plan, userRequest, contextCode, history) {
        const projectSummary = await this._getProjectSummary();
        const executionPrompt = `
             You are an expert AI programmer. Your task is to execute a given plan to accomplish the user's request based on the current conversation context.
             The user's latest request was: "${userRequest}"
             The agreed-upon plan is:
             ${plan.plan.join('\n')}
 
             The user has provided the following file(s) as context:
             ${projectSummary}
             ${contextCode}
 
             You have the following capabilities:
             1. Modifying files by providing diffs.
             2. Creating new files.
 
             You MUST respond with a single, valid JSON object. The object MUST contain a "statusMessage" key with a brief, user-friendly summary of the action taken.
             The JSON object can then optionally contain ONE of the following keys: "diffs", "creations", or "functionCall".
             It can also optionally contain a "suggestions" key, which is an array of strings representing follow-up commands.
 
             1. For code modifications, use "diffs":
                {
                  "statusMessage": "I've updated the login form styles.",
                  "diffs": [ { "filePath": "path/to/file.js", "search": "code to find", "replace": "code to replace with" } ],
                  "suggestions": ["/lint 'path/to/file.js'", "/test 'path/to/file.js'"]
                }
 
             2. For creating files, use "creations":
                {
                  "statusMessage": "I've created the new component file.",
                  "creations": [ { "filePath": "path/to/new_file.js", "content": "the full content of the new file" } ],
                  "suggestions": ["/lint 'path/to/new_file.js'"]
                }
 
         `;

        const rawResponse = await this._callApi(executionPrompt, history);

        if (rawResponse.functionCall) {
            return {
                statusMessage: `Attempting to use the ${rawResponse.functionCall.name} tool.`,
                functionCall: rawResponse.functionCall
            };
        }

        try {
            const startIndex = rawResponse.indexOf('{');
            const endIndex = rawResponse.lastIndexOf('}');
            if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                const jsonString = rawResponse.substring(startIndex, endIndex + 1);
                const executionJson = JSON.parse(jsonString);
                this._validateJsonResponse(executionJson, ['statusMessage']);
                return executionJson;
            }
        } catch (e) {
            console.error("Failed to parse execution JSON:", e);
            console.error("Raw response was:", rawResponse);
            throw new Error(`Failed to parse execution response from AI. Invalid JSON received: ${e.message}`);
        }
        throw new Error("Failed to find a valid JSON object in the execution response.");
    }

    async answer(userRequest, contextCode, history) {
        const answerPrompt = `
            You are a helpful AI assistant with expertise in software development. Your task is to answer the user's question based on the provided context.
            The user's question is: "${userRequest}"

            The user has provided the following file(s) as context:
            ${contextCode}

            Provide a clear, concise, and well-formatted answer in Markdown.
            If the context doesn't contain the answer, state that you don't have enough information.
        `;

        return await this._callApi(answerPrompt, history);
    }
}

window.AIAgent = AIAgent;