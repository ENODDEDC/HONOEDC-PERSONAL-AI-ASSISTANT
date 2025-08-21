window.addEventListener('load', () => {
    console.log('Doc Writer script loaded.');

    const docAgentContent = document.getElementById('docAgentContent');
    let generatedHtmlContent = ''; // Variable to store the generated HTML

    // --- Helper to call the Generative API ---
    async function callGenerativeApi(prompt) {
        const apiKey = document.getElementById('apiKey').value;
        const model = document.getElementById('modelSelect').value;
        if (!apiKey) {
            window.showToast("Please enter your Google AI Studio API key.");
            return null;
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const requestBody = {
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        };

        try {
            const response = await fetch(apiUrl, {
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
            } else {
                throw new Error("No valid response content from AI.");
            }
        } catch (error) {
            console.error('Error calling generative API:', error);
            window.showToast(`API call failed: ${error.message}`);
            return null;
        }
    }

    function initializeDocAgentUI() {
        if (!docAgentContent) return;

        docAgentContent.innerHTML = ''; // Clear existing content

        const container = document.createElement('div');
        container.className = 'space-y-8';

        const header = document.createElement('div');
        header.innerHTML = `
            <h3 class="text-xl text-white mb-3">DOC Agent</h3>
            <p class="text-sm text-gray-400 mb-2">Use the main prompt on the right to generate a document with the <code class="text-indigo-400 bg-gray-700 px-1 rounded">/doc</code> command.</p>
        `;

        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'flex items-center space-x-4';
        controlsContainer.innerHTML = `
            <div>
                <label for="fontSelect" class="block text-sm font-medium text-gray-400 mb-1">Font:</label>
                <select id="fontSelect" class="bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm p-2">
                    <option>Arial</option>
                    <option>Verdana</option>
                    <option selected>Times New Roman</option>
                    <option>Courier New</option>
                    <option>Georgia</option>
                    <option>Calibri</option>
                </select>
            </div>
            <div>
                <label for="templateSelect" class="block text-sm font-medium text-gray-400 mb-1">Template:</label>
                <select id="templateSelect" class="bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm p-2">
                    <option value="">None</option>
                    <option value="formal_letter">Formal Letter</option>
                    <option value="resume">Resume</option>
                    <option value="meeting_agenda">Meeting Agenda</option>
                </select>
            </div>
            <button id="copyDocBtn" class="self-end p-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 hidden" title="Copy content">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </button>
            <button id="downloadDocBtn" class="self-end px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-500 hidden">Download .doc</button>
        `;

        const outputContainer = document.createElement('div');
        outputContainer.id = 'docOutput';
        outputContainer.className = 'mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 min-h-[200px]';
        outputContainer.innerHTML = `
            <h4 class="text-lg text-white mb-2">Document Preview</h4>
            <div class="doc-preview-container">
                <div id="docPreviewPage" class="doc-preview-page">
                    <p>Your generated document will be previewed here.</p>
                </div>
            </div>
        `;

        container.appendChild(header);
        container.appendChild(controlsContainer);
        container.appendChild(outputContainer);
        docAgentContent.appendChild(container);

        document.getElementById('downloadDocBtn').addEventListener('click', handleDownloadDocument);
        document.getElementById('copyDocBtn').addEventListener('click', handleCopyDocument);
        document.getElementById('fontSelect').addEventListener('change', updatePreviewFont);
    }

    function updatePreviewFont() {
        const selectedFont = document.getElementById('fontSelect').value;
        const previewPage = document.getElementById('docPreviewPage');
        previewPage.style.fontFamily = selectedFont;
    }

    window.generateDocumentFromPrompt = async function(prompt) {
        const previewPage = document.getElementById('docPreviewPage');
        const downloadBtn = document.getElementById('downloadDocBtn');
        const copyBtn = document.getElementById('copyDocBtn');
        const fontSelect = document.getElementById('fontSelect');
        const templateSelect = document.getElementById('templateSelect');

        window.showToast("Generating document...");
        previewPage.innerHTML = '<p>AI is writing your document...</p>';
        downloadBtn.classList.add('hidden');
        copyBtn.classList.add('hidden');

        const selectedFont = fontSelect.value;
        const selectedTemplate = templateSelect.value;
        const existingHtml = generatedHtmlContent;
        let aiPrompt;

        if (existingHtml && !selectedTemplate) {
            aiPrompt = `You are an expert document writer. A user wants to modify an existing document.
The current document HTML is:
\`\`\`html
${existingHtml}
\`\`\`

The user's modification request is: "${prompt}"
The user wants the document to use the font "${selectedFont}".

Based on the request, modify the HTML and provide the complete, updated HTML.
The HTML should be well-structured, use inline styles for layout, positioning, and font sizes as requested, and be suitable for conversion to a Word document.
Do not include <html>, <head>, or <body> tags. Just provide the inner content.`;
        } else {
            const templateContent = selectedTemplate ? window.docTemplates[selectedTemplate] : '';
            aiPrompt = `You are an expert document writer. Based on the user's request, generate the complete HTML content for a document.
The user wants the document to use the font "${selectedFont}".
${templateContent ? `The user has selected a template to start with:\n\`\`\`html\n${templateContent}\n\`\`\`` : ''}
The user's request is to fill out or modify this template with the following information: "${prompt}".
The HTML should be well-structured, use inline styles for layout, positioning, and font sizes as requested, and be suitable for conversion to a Word document.
Pay close attention to user instructions about text alignment (e.g., "center the title"), margins, spacing, font sizes (e.g., "make the title 24pt"), and table creation/modification.
Do not include <html>, <head>, or <body> tags. Just provide the inner content.`;
        }

        const result = await callGenerativeApi(aiPrompt);

        if (result) {
            generatedHtmlContent = result.replace(/```html|```/g, '').trim();
            previewPage.innerHTML = generatedHtmlContent;
            updatePreviewFont(); // Apply the selected font to the new content
            window.showToast("Document generated successfully.");
            downloadBtn.classList.remove('hidden');
            copyBtn.classList.remove('hidden');
        } else {
            previewPage.innerHTML = '<p class="text-red-500">Failed to generate document. Please check the console for errors.</p>';
            window.showToast("Document generation failed.");
        }
    }

    async function handleDownloadDocument() {
        if (!generatedHtmlContent) {
            window.showToast("No document content to download.");
            return;
        }

        window.showToast("Preparing document for download...");

        try {
            const blob = await htmlToDocx.asBlob(generatedHtmlContent, {
                font: document.getElementById('fontSelect').value,
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'generated-document.docx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating DOCX:', error);
            window.showToast('Failed to generate .docx file.');
        }
    }

    function handleCopyDocument() {
        if (!generatedHtmlContent) {
            window.showToast("No document content to copy.");
            return;
        }
        try {
            const blob = new Blob([generatedHtmlContent], { type: 'text/html' });
            const clipboardItem = new ClipboardItem({ 'text/html': blob });
            navigator.clipboard.write([clipboardItem]).then(() => {
                window.showToast("Document content copied to clipboard!");
            }, (err) => {
                console.error('Failed to copy content:', err);
                window.showToast("Failed to copy content.");
            });
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            window.showToast("Copy feature not supported in this browser.");
        }
    }

    // Initialize the UI
    initializeDocAgentUI();
});