// This file contains the logic for handling chat commands like /code, /table, etc.

function generateThinkingSteps(prompt, context) {
    const steps = [];
    steps.push("Analyzing user request...");

    if (prompt.toLowerCase().includes('create')) {
        steps.push("Detected file creation request.");
        const filePaths = prompt.match(/([a-zA-Z0-9_\-\/]+\.[a-zA-Z0-9]+)/g) || [];
        if (filePaths.length > 0) {
            steps.push(`Planning to create ${filePaths.length} file(s): ${filePaths.join(', ')}`);
        }
        steps.push("Structuring new file content...");
    } else if (prompt.toLowerCase().includes('modify') || prompt.toLowerCase().includes('edit') || prompt.toLowerCase().includes('update')) {
        steps.push("Detected file modification request.");
    }

    if (context) {
        steps.push("Reviewing project context...");
        const files = context.match(/--- START OF FILE: (.*?) ---/g) || [];
        if (files.length > 0) {
            steps.push(`Found ${files.length} file(s) in context.`);
        }
    }

    steps.push("Formulating response...");
    steps.push("Generating code modifications or new content...");
    steps.push("Formatting response as JSON...");
    steps.push("Finalizing output...");

    return steps;
}

function saveConversationHistory() {
    localStorage.setItem('conversationHistory', JSON.stringify(window.conversationHistory));
}

function loadConversationHistory() {
    const savedHistory = localStorage.getItem('conversationHistory');
    if (savedHistory) {
        window.conversationHistory = JSON.parse(savedHistory);
        // Re-render chat bubbles from history if needed
        // This part depends on how your chat UI is structured
    }
}

// async function openFilesInEditor(filePaths) {
//     for (const filePath of filePaths) {
//         await window.openFile(filePath);
//     }
// }

// async function formatCodeInFiles(filePaths) {
//     for (const filePath of filePaths) {
//         await window.formatFile(filePath);
//     }
// }

// async function runTestsForFiles(filePaths) {
//     for (const filePath of filePaths) {
//         await window.runTests(filePath);
//     }
// }

async function handleLintCommand(apiKey, model) {
    const code = window.getCurrentCode();
    const filePath = window.getCurrentFilePath();

    if (!code || !filePath) {
        showToast("Please open a file in the editor before using /lint.");
        return;
    }

    showToast(`Analyzing ${filePath}...`);

    const lintPrompt = `
        You are an expert code reviewer. Analyze the following code from the file "${filePath}" for any bugs, style issues, or potential improvements.
        Provide your feedback in a clear, concise, and well-formatted Markdown response.
        If you find issues, suggest specific code changes.

        Code to analyze:
        \`\`\`
        ${code}
        \`\`\`
    `;

    const systemInstruction = localStorage.getItem('systemInstruction') || '';
    const requestBody = {
        contents: [{ role: 'user', parts: [{ text: lintPrompt }] }],
        systemInstruction: {
            parts: [{ text: systemInstruction }]
        }
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const rawResponse = data.candidates[0].content.parts[0].text;
            const html = converter.makeHtml(rawResponse);
            aiResponseDiv.innerHTML = html;
            appendChatBubble(`I have analyzed ${filePath} for issues.`, 'ai', rawResponse);
        } else {
            throw new Error("No valid response from AI.");
        }
    } catch (error) {
        console.error('Error processing lint command:', error);
        showToast(`Failed to analyze file: ${error.message}`);
    }
}

async function handleTableCommand(prompt, apiKey, model) {
    const userRequest = prompt.replace('/table', '').trim();
    showToast('Processing table command...');
    
    const tableSchema = JSON.stringify(tables, null, 2);
    const tablePrompt = `
        You are an expert database management AI. Your task is to interpret the user's ambiguous request and convert it into a sequence of precise JSON commands and a natural language response.
        The available commands are: "createTable", "deleteTable", "addRow", "addColumn", "renameColumn", "updateCell", "deleteRow", "clearRow", "renameTable", and "batch".
        The current table schema is:
        ${tableSchema}

        User request: "${userRequest}"

        IMPORTANT: You MUST respond with a single, valid JSON object containing two keys: "command" and "response".
        - The "command" key must contain the JSON command object to be executed.
        - The "response" key must contain a natural language confirmation of the action taken.
        
        Example of a complex request:
        User request: "create table to me columns = Features, Verified rows = Withdrawals, 999,999 USDT rows = P2P, 500,000 USD"
        
        Your JSON response MUST be:
        {
          "command": {
            "command": "batch",
            "actions": [
              { "command": "createTable", "tableName": "my_table", "columns": ["Features", "Verified"] },
              { "command": "addRow", "tableName": "my_table", "data": { "Features": "Withdrawals", "Verified": "999,999 USDT" } },
              { "command": "addRow", "tableName": "my_table", "data": { "Features": "P2P", "Verified": "500,000 USD" } }
            ]
          },
          "response": "I have created a new table named 'my_table' and added the requested rows."
        }

        Example of an update request:
        User request: "in sample_table, change the price of Banana to 1.75"
        
        Your JSON response MUST be:
        {
          "command": {
            "command": "updateCell",
            "tableName": "sample_table",
            "rowIndex": 1,
            "columnName": "PRICE",
            "newValue": "1.75"
          },
          "response": "I have updated the price for Banana in sample_table."
        }
        Note: To find the 'rowIndex', you must look at the table data provided in the schema and find the 0-based index of the row that the user is referring to (e.g., the row where the 'ITEM' is 'Banana').

        Example of a rename request:
        User request: "rename test_table to sample_table"
        
        Your JSON response MUST be:
        {
          "command": {
            "command": "renameTable",
            "oldName": "test_table",
            "newName": "sample_table"
          },
          "response": "I have renamed the table 'test_table' to 'sample_table'."
        }
    `;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const systemInstruction = localStorage.getItem('systemInstruction') || '';
    const requestBody = {
        contents: [{ role: 'user', parts: [{ text: tablePrompt }] }],
        systemInstruction: {
            parts: [{ text: systemInstruction }]
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            console.error("Invalid response structure from AI:", data);
            throw new Error("Received an invalid response from the AI. The response did not contain the expected content.");
        }
        const rawText = data.candidates[0].content.parts[0].text;
        try {
            const startIndex = rawText.indexOf('{');
            const endIndex = rawText.lastIndexOf('}');
            if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                const jsonString = rawText.substring(startIndex, endIndex + 1);
                const responseObject = JSON.parse(jsonString);
                if (responseObject.command && responseObject.response) {
                    executeTableCommand(responseObject.command);
                    appendChatBubble(responseObject.response, 'ai');
                } else {
                    throw new Error("Invalid JSON response from AI: missing 'command' or 'response' key.");
                }
            } else {
                throw new Error("No valid JSON object found in AI response.");
            }
        } catch (e) {
            console.error("Failed to parse table command JSON:", e);
            console.error("Raw response was:", rawText);
            throw new Error(`Failed to process table command: ${e.message}`);
        }
    } catch (error) {
        console.error('Error processing table command:', error);
        if (error.message.includes('429')) {
            showToast('You have exceeded your API request limit. Please wait a while before trying again.');
        } else {
            showToast('Failed to process table command.');
        }
    }
}

async function handleCodeCommand(prompt, apiKey, model, webBrowsingEnabled = false) {
    const isModification = prompt.startsWith('/code_modification') || prompt.startsWith('/create');
    const isQuestion = prompt.startsWith('/code_question');
    const userRequest = prompt.replace('/code_modification', '').replace('/code_question', '').replace('/create', '').trim();

    let fileMentions = userRequest.match(/@'([^']+)'/g) || [];
    let filePaths = fileMentions.map(mention => mention.substring(2, mention.length - 1));

    // If no files are mentioned in the current prompt, check the last user message in history.
    if (filePaths.length === 0 && window.conversationHistory.length > 0) {
        const lastUserTurn = [...window.conversationHistory].reverse().find(turn => turn.role === 'user');
        if (lastUserTurn) {
            const lastUserPrompt = lastUserTurn.parts[0].text;
            const lastFileMentions = lastUserPrompt.match(/@'([^']+)'/g) || [];
            if (lastFileMentions.length > 0) {
                filePaths = lastFileMentions.map(mention => mention.substring(2, mention.length - 1));
            }
        }
    }

    const executeCommand = async () => {
        let contextCode = '';
        let fileCount = 0;
        let charCount = 0;

        const projectSummary = await window.idb.get('projectSummary');
        if (projectSummary) {
            const summaryString = `\n\n--- START OF PROJECT SUMMARY ---\n${JSON.stringify(projectSummary, null, 2)}\n--- END OF PROJECT SUMMARY ---`;
            contextCode += summaryString;
            charCount += summaryString.length;
        }

        const filesToRead = filePaths.length > 0 ? filePaths : await window.getAllProjectFiles();
        fileCount = filesToRead.length;

        for (const path of filesToRead) {
            const content = await window.getProjectFileContent(path);
            if (content !== null) {
                const fileString = `\n\n--- START OF FILE: ${path} ---\n\`\`\`\n${content}\n\`\`\`\n--- END OF FILE: ${path} ---`;
                contextCode += fileString;
                charCount += fileString.length;
            } else if (filePaths.length > 0) { // Only show toast if file was explicitly mentioned
                showToast(`Could not read file: ${path}`);
                return;
            }
        }

        const contextSummary = `Context: ${fileCount} file(s), ~${Math.round(charCount / 1000)}k chars.`;
        let thinkingSteps = [contextSummary, "Analyzing user request..."];

        window.startAIProcessing(thinkingSteps);

        try {
            const agent = new window.AIAgent(apiKey, model, webBrowsingEnabled);
            window.conversationHistory.push({ role: 'user', parts: [{ text: userRequest }] });

            if (isQuestion) {
                window.appendThoughtToModal("Formulating an answer...");
                const answer = await agent.answer(userRequest, contextCode, window.conversationHistory);
                window.stopAIProcessing();
                
                const html = window.converter.makeHtml(answer);
                aiResponseDiv.innerHTML = html;
                appendChatBubble("I've answered your question.", 'ai', answer);
                window.conversationHistory.push({ role: 'model', parts: [{ text: answer }] });

            } else if (isModification) {
                window.appendThoughtToModal("Generating a plan...");
                const plan = await agent.plan(userRequest, contextCode, window.conversationHistory);
                window.appendThoughtToModal("Plan received from AI.");

                window.stopAIProcessing();
                window.showPlanApprovalModal(plan, async (userApproved) => {
                    if (!userApproved) {
                        showToast("Operation cancelled by user.");
                        const cancelMessage = "I have cancelled the operation as requested.";
                        appendChatBubble(cancelMessage, 'ai');
                        window.conversationHistory.push({ role: 'model', parts: [{ text: cancelMessage }] });
                        return;
                    }

                    try {
                        thinkingSteps = ["User approved the plan.", "Generating code modifications..."];
                        window.startAIProcessing(thinkingSteps);
                        window.appendThoughtToModal("Executing the plan...");

                        const executionResult = await agent.execute(plan, userRequest, contextCode, window.conversationHistory);
                        
                        window.appendThoughtToModal("Execution result received.");

                        const updatedFiles = new Set();
                        if (executionResult.creations) {
                            for (const file of executionResult.creations) {
                                if (file.filePath && file.content !== undefined) {
                                    const success = await window.updateProjectFileContent(file.filePath, file.content);
                                    if (success) updatedFiles.add(file.filePath);
                                    else throw new Error(`Failed to create file: ${file.filePath}`);
                                }
                            }
                        }
                        if (executionResult.diffs) {
                            for (const diff of executionResult.diffs) {
                                if (diff.filePath && diff.search !== undefined && diff.replace !== undefined) {
                                    const originalContent = await window.getProjectFileContent(diff.filePath) || "";
                                    const newContent = window.applyDiffToFileContent(originalContent, diff.search, diff.replace);
                                    const success = await window.updateProjectFileContent(diff.filePath, newContent);
                                    if (success) updatedFiles.add(diff.filePath);
                                    else throw new Error(`Failed to update ${diff.filePath}.`);
                                }
                            }
                        }

                        window.stopAIProcessing();
                        const modelResponseText = executionResult.response || executionResult.statusMessage;
                        appendChatBubble(executionResult.statusMessage, 'ai', executionResult.response);
                        window.conversationHistory.push({ role: 'model', parts: [{ text: modelResponseText }] });

                        if (executionResult.response) {
                            const html = window.converter.makeHtml(executionResult.response);
                            aiResponseDiv.innerHTML = html;
                        } else if (updatedFiles.size > 0) {
                            const fileList = [...updatedFiles].map(f => `<li>${f}</li>`).join('');
                            aiResponseDiv.innerHTML = `<p>Changes applied to:</p><ul>${fileList}</ul>`;
                        } else {
                            aiResponseDiv.innerHTML = `<p>${executionResult.statusMessage}</p>`;
                        }
                    } catch (error) {
                        window.stopAIProcessing();
                        const errorMessage = `I encountered an error while executing the plan: ${error.message}`;
                        console.error('Error processing code command:', error);
                        showToast(errorMessage);
                        appendChatBubble(errorMessage, 'ai');
                        window.conversationHistory.push({ role: 'model', parts: [{ text: errorMessage }] });
                    }
                });
            }
        } catch (error) {
            window.stopAIProcessing();
            const errorMessage = `An unexpected error occurred: ${error.message}`;
            console.error('Error processing code command:', error);
            showToast(errorMessage);
            appendChatBubble(errorMessage, 'ai');
        }
    };

    if (filePaths.length > 0) {
        await executeCommand();
    } else if (isModification || isQuestion) {
        const allFiles = await window.getAllProjectFiles();
        if (allFiles && allFiles.length > 0) {
            let totalChars = 0;
            for (const file of allFiles) {
                const content = await window.getProjectFileContent(file);
                if (content) {
                    totalChars += content.length;
                }
            }
            const userConfirmed = await window.confirmFullProjectScan(allFiles.length, totalChars);
            if (userConfirmed) {
                await executeCommand();
            } else {
                const submitButton = document.getElementById('submitBtn');
                submitButton.disabled = false;
                submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
                showToast("Operation cancelled by user.");
            }
        } else {
            await executeCommand();
        }
    }
}

window.handleCommand = async (prompt, apiKey, model, webBrowsingEnabled = false) => {
    if (prompt.startsWith('/table')) {
        await handleTableCommand(prompt, apiKey, model);
    } else if (prompt.startsWith('/code_modification') || prompt.startsWith('/code_question') || prompt.startsWith('/create')) {
        await handleCodeCommand(prompt, apiKey, model, webBrowsingEnabled);
    } else if (prompt.startsWith('/lint')) {
        await handleLintCommand(apiKey, model);
    } else if (prompt.startsWith('/doc')) {
        await handleDocCommand(prompt, apiKey, model);
    } else if (prompt.startsWith('/agent')) {
        const goal = prompt.replace('/agent', '').trim();
        const agent = new window.AIAgent(apiKey, model, webBrowsingEnabled);
        const plan = await agent.plan(goal);
        await agent.execute(plan);
        showToast('Agent has completed the task.');
    }
    saveConversationHistory();
};

async function handleDocCommand(prompt, apiKey, model) {
    const userRequest = prompt.replace('/doc', '').trim();
    if (!userRequest) {
        showToast("Please provide a description for the document you want to create. e.g., /doc A formal business letter");
        return;
    }

    // Switch to the DOC Agent tab
    const docAgentTab = document.getElementById('docAgentTab');
    if (docAgentTab) {
        docAgentTab.click();
    }

    // Call the generation function directly
    // This function will be exposed from doc_writer.js
    if (window.generateDocumentFromPrompt) {
        window.generateDocumentFromPrompt(userRequest);
    } else {
        showToast("DOC Agent is not ready. Please try again in a moment.");
    }
}

window.commands = {
    handleTableCommand,
    handleCodeCommand,
    handleLintCommand,
    handleDocCommand,
};