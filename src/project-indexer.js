// src/project-indexer.js

class ProjectIndexer {
    constructor(apiKey, model) {
        this.apiKey = apiKey;
        this.model = model;
        this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    }

    async _callApi(prompt) {
        const requestBody = {
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
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
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        }
        throw new Error("No valid response content from AI.");
    }

    async generateSummary(files) {
        let fileContents = '';
        for (const file of files) {
            const content = await window.getProjectFileContent(file);
            if (content) {
                fileContents += `\n\n--- START OF FILE: ${file} ---\n\`\`\`\n${content}\n\`\`\`\n--- END OF FILE: ${file} ---`;
            }
        }

        const summaryPrompt = `
            You are an expert software architect. Analyze the following project files and generate a concise, high-level summary of the project's architecture, key components, and purpose.
            This summary will be used as long-term memory for an AI assistant, so it should be informative and easy to parse.
            The summary should be a JSON object with the following keys: "architecture", "components", and "purpose".

            ${fileContents}
        `;

        const rawResponse = await this._callApi(summaryPrompt);
        const jsonMatch = rawResponse.match(/```json\s*(\{[\s\S]*\})\s*```|(\{[\s\S]*\})/);
        if (jsonMatch) {
            const jsonString = jsonMatch[1] || jsonMatch[2];
            return JSON.parse(jsonString);
        }
        throw new Error("Failed to parse summary from AI response.");
    }

    async indexProject() {
        showToast("Starting project indexing...");
        const allFiles = await window.getAllProjectFiles();
        if (allFiles.length === 0) {
            showToast("No files found to index.");
            return;
        }

        try {
            const summary = await this.generateSummary(allFiles);
            await window.idb.set('projectSummary', summary);
            showToast("Project indexing complete. AI now has long-term memory of this project.");
        } catch (error) {
            console.error("Error indexing project:", error);
            showToast(`Project indexing failed: ${error.message}`);
        }
    }

    async getSummary() {
        return await window.idb.get('projectSummary');
    }
}

window.ProjectIndexer = ProjectIndexer;