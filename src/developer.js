document.addEventListener('DOMContentLoaded', () => {
    console.log('Developer tools script loaded.');

    // Shared elements
    const apiKeyInput = document.getElementById('apiKey');

    // --- Developer Sub-Tabs ---
    const devAiIdeTab = document.getElementById('devAiIdeTab');
    const devUserFlowTab = document.getElementById('devUserFlowTab');
    const devSvgTab = document.getElementById('devSvgTab');
    const devColorPaletteTab = document.getElementById('devColorPaletteTab');
    const devBgRemoverTab = document.getElementById('devBgRemoverTab');
    const devMockupTab = document.getElementById('devMockupTab');
    const devTerminalTab = document.getElementById('devTerminalTab');
    const devGitTab = document.getElementById('devGitTab');

    const devAiIdeContent = document.getElementById('devAiIdeContent');
    const devUserFlowContent = document.getElementById('devUserFlowContent');
    const devSvgContent = document.getElementById('devSvgContent');
    const devColorPaletteContent = document.getElementById('devColorPaletteContent');
    const devBgRemoverContent = document.getElementById('devBgRemoverContent');
    const devMockupContent = document.getElementById('devMockupContent');
    const devTerminalContent = document.getElementById('devTerminalContent');
    const devGitContent = document.getElementById('devGitContent');

    function handleTabSwitch(activeTab, activeContent) {
        const allTabs = [devAiIdeTab, devUserFlowTab, devSvgTab, devColorPaletteTab, devBgRemoverTab, devMockupTab, devTerminalTab, devGitTab];
        const allContent = [devAiIdeContent, devUserFlowContent, devSvgContent, devColorPaletteContent, devBgRemoverContent, devMockupContent, devTerminalContent, devGitContent];
        
        allContent.forEach(content => content && content.classList.add('hidden'));
        allTabs.forEach(tab => {
            if (tab) {
                tab.classList.remove('bg-gray-700', 'text-white');
                tab.classList.add('text-gray-400', 'hover:bg-gray-700');
            }
        });

        if (activeContent) activeContent.classList.remove('hidden');
        if (activeTab) {
            activeTab.classList.add('bg-gray-700', 'text-white');
            activeTab.classList.remove('text-gray-400', 'hover:bg-gray-700');
        }

        if (activeContent === devAiIdeContent && codeEditor) {
            setTimeout(() => codeEditor.refresh(), 1);
        }
    }

    [devAiIdeTab, devUserFlowTab, devSvgTab, devColorPaletteTab, devBgRemoverTab, devMockupTab, devTerminalTab, devGitTab].forEach(tab => {
        if (tab) {
            tab.addEventListener('click', () => {
                const contentId = tab.id.replace('Tab', 'Content');
                const contentElement = document.getElementById(contentId);
                if (tab === devAiIdeTab) initializeEditor();
                handleTabSwitch(tab, contentElement);
            });
        }
    });

    // --- AI IDE with File System Access API ---
    const openProjectBtn = document.getElementById('openProjectBtn');
    const addFileBtn = document.getElementById('addFileBtn');
    const fileTreeContainer = document.getElementById('fileTree');
    const codeEditorContainer = document.getElementById('codeEditor');
    const editorFileName = document.getElementById('editorFileName');
    const addFileModal = document.getElementById('addFileModal');
    const newFileNameInput = document.getElementById('newFileNameInput');
    const saveNewFileBtn = document.getElementById('saveNewFileBtn');
    const closeAddFileModal = document.getElementById('closeAddFileModal');
    const runProjectBtn = document.getElementById('runProjectBtn');
    const fileSelectionModal = document.getElementById('fileSelectionModal');
    const fileListContainer = document.getElementById('fileListContainer');
    const closeFileSelectionModal = document.getElementById('closeFileSelectionModal');

    let codeEditor;
    let projectDirHandle = null;
    let currentFileHandle = null;
    let currentFilePath = null;

    function initializeEditor() {
        if (!codeEditor) {
            codeEditor = CodeMirror(codeEditorContainer, {
                lineNumbers: true,
                theme: 'material-darker',
                mode: 'javascript',
                readOnly: false
            });
            codeEditor.on('change', () => {
                saveCurrentFile();
            });
        }
    }

    if (openProjectBtn) {
        openProjectBtn.addEventListener('click', async () => {
            try {
                projectDirHandle = await window.showDirectoryPicker();
                if (projectDirHandle) {
                    await window.idb.set('projectDirHandle', projectDirHandle);
                    showToast('Project opened and saved for next session.');
                    await renderFileTree();
                }
            } catch (error) {
                console.error('Error opening directory:', error);
                showToast('Failed to open directory.');
            }
        });
    }

    async function renderFileTree() {
        if (!projectDirHandle) return;
        fileTreeContainer.innerHTML = '<p class="text-gray-400">Loading project...</p>';
        try {
            const tree = await buildTree(projectDirHandle, projectDirHandle.name);
            fileTreeContainer.innerHTML = '';
            fileTreeContainer.appendChild(tree);
        } catch (error) {
            console.error('Error building file tree:', error);
            fileTreeContainer.innerHTML = '<p class="text-red-400">Error loading project.</p>';
        }
    }

    async function buildTree(dirHandle, path) {
        const ul = document.createElement('ul');
        ul.className = 'space-y-1';

        const entries = [];
        for await (const entry of dirHandle.values()) {
            entries.push(entry);
        }
        entries.sort((a, b) => {
            if (a.kind === 'directory' && b.kind !== 'directory') return -1;
            if (a.kind !== 'directory' && b.kind === 'directory') return 1;
            return a.name.localeCompare(b.name);
        });

        for (const entry of entries) {
            const li = document.createElement('li');
            const fullPath = `${path}/${entry.name}`;
            if (entry.kind === 'directory') {
                li.innerHTML = `<span class="font-bold text-indigo-400 cursor-pointer">${entry.name}</span>`;
                li.querySelector('span').addEventListener('click', async (e) => {
                    e.stopPropagation();
                    let nestedUl = li.querySelector('ul');
                    if (nestedUl) {
                        nestedUl.remove();
                    } else {
                        nestedUl = await buildTree(entry, fullPath);
                        nestedUl.classList.add('pl-4');
                        li.appendChild(nestedUl);
                    }
                });
            } else {
                li.innerHTML = `<span class="text-gray-300 hover:text-white cursor-pointer">${entry.name}</span>`;
                li.querySelector('span').addEventListener('click', (e) => {
                    e.stopPropagation();
                    openFileInEditor(entry, fullPath);
                });
            }
            ul.appendChild(li);
        }
        return ul;
    }

    async function openFileInEditor(fileHandle, path) {
        try {
            currentFileHandle = fileHandle;
            currentFilePath = path;
            const file = await fileHandle.getFile();
            const content = await file.text();
            
            let mode = 'javascript';
            if (file.name.endsWith('.html')) mode = 'htmlmixed';
            else if (file.name.endsWith('.css')) mode = 'css';
            else if (file.name.endsWith('.js')) mode = 'javascript';
            else if (file.name.endsWith('.json')) mode = 'javascript';
            else if (file.name.endsWith('.xml')) mode = 'xml';

            editorFileName.textContent = path;
            codeEditor.setValue(content);
            codeEditor.setOption('mode', mode);
        } catch (error) {
            console.error('Error opening file:', error);
            showToast(`Error opening ${fileHandle.name}`);
        }
    }

    async function saveCurrentFile() {
        if (!currentFileHandle) return;
        try {
            const writable = await currentFileHandle.createWritable();
            await writable.write(codeEditor.getValue());
            await writable.close();
        } catch (error) {
            console.error('Error saving file:', error);
            showToast(`Error saving ${currentFileHandle.name}`);
        }
    }

    if (addFileBtn) {
        addFileBtn.addEventListener('click', () => {
            if (!projectDirHandle) {
                showToast("Please open a project folder first.");
                return;
            }
            addFileModal.classList.remove('hidden');
            newFileNameInput.focus();
        });
    }

    if (closeAddFileModal) {
        closeAddFileModal.addEventListener('click', () => {
            addFileModal.classList.add('hidden');
            newFileNameInput.value = '';
        });
    }

    if (saveNewFileBtn) {
        saveNewFileBtn.addEventListener('click', async () => {
            const filePath = newFileNameInput.value.trim();
            if (filePath) {
                try {
                    const pathParts = filePath.split('/');
                    const fileName = pathParts.pop();
                    let currentHandle = projectDirHandle;
                    for (const part of pathParts) {
                        currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
                    }
                    const newFileHandle = await currentHandle.getFileHandle(fileName, { create: true });
                    
                    await renderFileTree();
                    openFileInEditor(newFileHandle, filePath);
                    addFileModal.classList.add('hidden');
                    newFileNameInput.value = '';
                } catch (error) {
                    console.error('Error creating file:', error);
                    showToast('Error creating file.');
                }
            }
        });
    }

    window.getCurrentCode = () => codeEditor ? codeEditor.getValue() : null;
    window.getCurrentFilePath = () => currentFilePath;
    
    async function getHandleFromPath(path) {
        if (!projectDirHandle) return null;
        const pathParts = path.split('/');
        let currentHandle = projectDirHandle;
        for (const part of pathParts) {
            if (!part) continue;
            try {
                currentHandle = await currentHandle.getDirectoryHandle(part);
            } catch (e) {
                try {
                    return await currentHandle.getFileHandle(part);
                } catch (err) {
                    return null;
                }
            }
        }
        return currentHandle;
    }

    window.getProjectFileContent = async (filePath) => {
        if (!projectDirHandle) return null;
        try {
            const pathParts = filePath.split('/');
            const fileName = pathParts.pop();
            let currentHandle = projectDirHandle;
            for (const part of pathParts) {
                currentHandle = await currentHandle.getDirectoryHandle(part);
            }
            const fileHandle = await currentHandle.getFileHandle(fileName);
            const file = await fileHandle.getFile();
            return await file.text();
        } catch (e) {
            console.error(`Error getting file content for "${filePath}":`, e);
            return null;
        }
    };

    window.getAllProjectFiles = async () => {
        if (!projectDirHandle) return [];
        const fileList = [];
        async function recurse(directoryHandle, path) {
            for await (const entry of directoryHandle.values()) {
                const newPath = path ? `${path}/${entry.name}` : entry.name;
                if (entry.kind === 'file') {
                    fileList.push(newPath);
                } else if (entry.kind === 'directory') {
                    await recurse(entry, newPath);
                }
            }
        }
        await recurse(projectDirHandle, '');
        return fileList;
    };

    window.updateProjectFileContent = async (filePath, newContent) => {
        if (!projectDirHandle) return false;
        try {
            const pathParts = filePath.split('/');
            const fileName = pathParts.pop();
            let currentHandle = projectDirHandle;
            for (const part of pathParts) {
                currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
            }
            const fileHandle = await currentHandle.getFileHandle(fileName, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(newContent);
            await writable.close();
            
            if (currentFilePath === filePath) {
                openFileInEditor(fileHandle, filePath);
            }
            await renderFileTree();
            return true;
        } catch (e) {
            console.error("Error updating file content:", e);
            return false;
        }
    };
    
    if (devAiIdeTab) {
        devAiIdeTab.addEventListener('click', () => {
            handleTabSwitch(devAiIdeTab, devAiIdeContent);
            initializeEditor();
            renderFileTree();
        });
    }

    if (developerContent && !developerContent.classList.contains('hidden')) {
        handleTabSwitch(devAiIdeTab, devAiIdeContent);
        initializeEditor();
        renderFileTree();
    }

    if (runProjectBtn) {
        runProjectBtn.addEventListener('click', showFileSelectionModal);
    }
    if (closeFileSelectionModal) {
        closeFileSelectionModal.addEventListener('click', () => {
            fileSelectionModal.classList.add('hidden');
        });
    }

    async function showFileSelectionModal() {
        if (!projectDirHandle) {
            showToast('No project loaded. Please open a project first.');
            return;
        }
        const allFiles = await window.getAllProjectFiles();
        if (allFiles.length === 0) {
            showToast('No files found in the opened project.');
            return;
        }
        fileListContainer.innerHTML = '';
        allFiles.forEach(file => {
            const button = document.createElement('button');
            button.textContent = file;
            button.className = 'w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm';
            button.addEventListener('click', () => {
                runProject(file);
                fileSelectionModal.classList.add('hidden');
            });
            fileListContainer.appendChild(button);
        });
        fileSelectionModal.classList.remove('hidden');
    }

    async function runProject(selectedFilePath) {
        const mainHtmlContent = await window.getProjectFileContent(selectedFilePath);
        if (!mainHtmlContent) {
            showToast('Selected HTML file not found.');
            return;
        }
        const resolveAssetPaths = async (htmlString, currentFilePath) => {
            let resolvedHtml = htmlString;
            const baseUrl = currentFilePath.substring(0, currentFilePath.lastIndexOf('/') + 1);
            const regex = /(src|href)="([^"]*)"/g;
            const matches = [...htmlString.matchAll(regex)];
            for (const match of matches) {
                const [fullMatch, attr, url] = match;
                if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//') || url.startsWith('data:')) {
                    continue;
                }
                let absolutePath;
                if (url.startsWith('/')) {
                    absolutePath = url.substring(1);
                } else {
                    absolutePath = baseUrl + url;
                }
                const content = await window.getProjectFileContent(absolutePath);
                if (content) {
                    const mimeType = getMimeType(absolutePath);
                    const base64 = btoa(unescape(encodeURIComponent(content)));
                    const dataUri = `data:${mimeType};base64,${base64}`;
                    resolvedHtml = resolvedHtml.replace(fullMatch, `${attr}="${dataUri}"`);
                }
            }
            return resolvedHtml;
        };
        const getMimeType = (filePath) => {
            if (filePath.endsWith('.html')) return 'text/html';
            if (filePath.endsWith('.css')) return 'text/css';
            if (filePath.endsWith('.js')) return 'application/javascript';
            if (filePath.endsWith('.png')) return 'image/png';
            if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg';
            if (filePath.endsWith('.gif')) return 'image/gif';
            if (filePath.endsWith('.svg')) return 'image/svg+xml';
            if (filePath.endsWith('.json')) return 'application/json';
            return 'application/octet-stream';
        };
        const resolvedHtmlContent = await resolveAssetPaths(mainHtmlContent, selectedFilePath);
        const blob = new Blob([resolvedHtmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    }
    
    // --- Helper Functions for Generators ---
    async function callGenerativeApi(prompt, parts = []) {
        const apiKey = apiKeyInput.value;
        const model = modelSelect.value;
        if (!apiKey) {
            showToast("Please enter your Google AI Studio API key.");
            return null;
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        
        if (prompt && parts.length === 0) {
            parts.push({ text: prompt });
        }

        const requestBody = {
            contents: [{ role: 'user', parts: parts }]
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
                // Handle function calls for web browsing if necessary
                if (data.candidates[0].content.parts[0].functionCall) {
                    const functionCall = data.candidates[0].content.parts[0].functionCall;
                    console.log("AI requested a function call:", functionCall);
                    showToast("AI is attempting to browse the web...");

                    // This is a simplified tool-use implementation
                    switch (functionCall.name) {
                        case 'browse':
                            const { query } = functionCall.args;
                            const searchResults = await searchTheWeb(query);

                            // Send the results back to the model
                            const newParts = [
                                ...parts,
                                { function_call: functionCall },
                                { tool_response: { name: 'browse', response: { content: searchResults } } }
                            ];
                            return await callGenerativeApi(null, newParts);

                        default:
                            throw new Error(`Unsupported function call: ${functionCall.name}`);
                    }
                }
                throw new Error("No valid response content from AI.");
            }
        } catch (error) {
            console.error('Error calling generative API:', error);
            showToast(`API call failed: ${error.message}`);
            return null;
        }
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    }

    // --- User Flow Diagram ---
    const createUserFlowBtn = document.getElementById('createUserFlowBtn');
    const loadFlowExampleBtn = document.getElementById('loadFlowExampleBtn');
    const userFlowInput = document.getElementById('userFlowInput');
    const userFlowDiagram = document.getElementById('userFlowDiagram');

    if (createUserFlowBtn) {
        createUserFlowBtn.addEventListener('click', async () => {
            const definition = userFlowInput.value;
            if (definition) {
                showToast("Generating diagram...");
                userFlowDiagram.innerHTML = '<div class="text-white">Loading...</div>';
                try {
                    // Ensure mermaid is ready
                    if (window.mermaid) {
                         const { svg } = await mermaid.render('mermaid-graph-' + Date.now(), definition);
                         userFlowDiagram.innerHTML = svg;
                         showToast("Diagram generated.");
                    } else {
                        throw new Error("Mermaid library not available.");
                    }
                } catch (error) {
                    userFlowDiagram.innerHTML = `<p class="text-red-400">Error rendering diagram: ${error.message}</p>`;
                    console.error(error);
                    showToast("Failed to render diagram.");
                }
            }
        });
    }

    if (loadFlowExampleBtn) {
        loadFlowExampleBtn.addEventListener('click', () => {
            userFlowInput.value = `graph TD
    A[Start] --> B{Is it working?};
    B -- Yes --> C[Great!];
    B -- No --> D[Check Console];
    D --> E[Fix Bug];
    E --> A;
    C --> F[End];`;
            if(createUserFlowBtn) createUserFlowBtn.click();
        });
    }

    // --- SVG Generator ---
    const generateSvgBtn = document.getElementById('generateSvgBtn');
    const svgPromptInput = document.getElementById('svgPrompt');
    const svgResult = document.getElementById('svgResult');
    const svgCode = document.getElementById('svgCode');

    if (generateSvgBtn) {
        generateSvgBtn.addEventListener('click', async () => {
            const prompt = svgPromptInput.value;
            if (!prompt) {
                showToast("Please provide a prompt.");
                return;
            }
            showToast("Generating SVG...");
            svgResult.innerHTML = '<div class="text-black">Loading...</div>';
            svgCode.textContent = '';

            const aiPrompt = `You are an expert SVG designer. Based on the user's prompt, create a single, complete, and valid SVG code. The SVG should be modern, clean, and viewable in a 200x200 pixel frame. Do not include any XML declaration or comments. User prompt: "${prompt}". Respond with ONLY the SVG code, nothing else.`;
            
            const result = await callGenerativeApi(aiPrompt);
            if (result) {
                const cleanSvg = result.replace(/```svg|```/g, '').trim();
                svgResult.innerHTML = cleanSvg;
                svgCode.textContent = cleanSvg;
                showToast("SVG generated successfully.");
            } else {
                 svgResult.innerHTML = '';
            }
        });
    }

    // --- Color Palette Generator ---
    const generateColorPaletteBtn = document.getElementById('generateColorPaletteBtn');
    const colorPromptInput = document.getElementById('colorPrompt');
    const colorPaletteOutput = document.getElementById('colorPaletteOutput');

    if (generateColorPaletteBtn) {
        generateColorPaletteBtn.addEventListener('click', async () => {
            const prompt = colorPromptInput.value;
            if (!prompt) {
                showToast("Please provide a prompt.");
                return;
            }
            showToast("Generating color palette...");
            colorPaletteOutput.innerHTML = '<div class="text-white">Loading...</div>';

            const aiPrompt = `You are an expert color theorist. Based on the user's prompt, generate a color palette of 5 to 8 colors. User prompt: "${prompt}". Respond with a single, valid JSON object with a single key "palette" which is an array of hex color code strings. Example: {"palette": ["#FF5733", "#33FF57", "#3357FF", "#FFFF33", "#FF33FF"]}`;
            
            const result = await callGenerativeApi(aiPrompt);
            if (result) {
                try {
                    const jsonMatch = result.match(/\{[\s\S]*\}/);
                    if (!jsonMatch) throw new Error("No JSON found in response.");
                    const responseObject = JSON.parse(jsonMatch[0]);
                    
                    colorPaletteOutput.innerHTML = '';
                    responseObject.palette.forEach(color => {
                        const swatch = document.createElement('div');
                        swatch.className = 'w-20 h-20 rounded-lg shadow-md cursor-pointer flex items-center justify-center text-white text-xs font-mono p-1 text-center';
                        swatch.style.backgroundColor = color;
                        swatch.textContent = color;
                        swatch.title = `Click to copy ${color}`;
                        swatch.addEventListener('click', () => {
                            navigator.clipboard.writeText(color);
                            showToast(`Copied ${color} to clipboard!`);
                        });
                        colorPaletteOutput.appendChild(swatch);
                    });
                    showToast("Color palette generated.");
                } catch (e) {
                    console.error("Failed to parse color palette JSON:", e);
                    showToast("Failed to parse AI response.");
                    colorPaletteOutput.innerHTML = '<div class="text-red-400">Error parsing response.</div>';
                }
            } else {
                colorPaletteOutput.innerHTML = '';
            }
        });
    }

    // --- Background Remover ---
    const removeBgBtn = document.getElementById('removeBgBtn');
    const removeBgApiKeyInput = document.getElementById('removeBgApiKey');
    const bgRemoverImageInput = document.getElementById('bgRemoverImage');
    const originalImageContainer = document.getElementById('originalImageContainer');
    const resultImageContainer = document.getElementById('resultImageContainer');
    const downloadResultBtn = document.getElementById('downloadResultBtn');
    let resultImageBlob = null;

    if (removeBgBtn) {
        removeBgBtn.addEventListener('click', async () => {
            const apiKey = removeBgApiKeyInput.value;
            const imageFile = bgRemoverImageInput.files[0];

            if (!apiKey || !imageFile) {
                showToast("Please provide a remove.bg API key and an image.");
                return;
            }
            showToast("Removing background...");
            originalImageContainer.innerHTML = '<div class="text-white">Loading...</div>';
            resultImageContainer.innerHTML = '<div class="text-white">Loading...</div>';


            const formData = new FormData();
            formData.append('image_file', imageFile);
            formData.append('size', 'auto');

            try {
                const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                    method: 'POST',
                    headers: { 'X-Api-Key': apiKey },
                    body: formData,
                });

                if (!response.ok) {
                    let errorText = "Unknown error";
                    try {
                        const errorData = await response.json();
                        errorText = errorData.errors[0].title;
                    } catch (e) {
                        errorText = await response.text();
                    }
                    throw new Error(errorText);
                }

                resultImageBlob = await response.blob();
                const resultImageUrl = URL.createObjectURL(resultImageBlob);
                
                originalImageContainer.innerHTML = `<img src="${URL.createObjectURL(imageFile)}" alt="Original" class="max-h-full max-w-full rounded-lg">`;
                resultImageContainer.innerHTML = `<img src="${resultImageUrl}" alt="Result" class="max-h-full max-w-full rounded-lg">`;
                
                downloadResultBtn.classList.remove('hidden');
                downloadResultBtn.onclick = () => {
                    const a = document.createElement('a');
                    a.href = resultImageUrl;
                    a.download = 'background-removed.png';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                };

                showToast("Background removed successfully.");

            } catch (error) {
                console.error("Background removal failed:", error);
                showToast(`Error: ${error.message}`);
                originalImageContainer.innerHTML = '';
                resultImageContainer.innerHTML = '';
            }
        });
    }

    // --- Mockup Generator ---
    const generateMockupBtn = document.getElementById('generateMockupBtn');
    const mockupImageInput = document.getElementById('mockupImage');
    const mockupInstructionsInput = document.getElementById('mockupInstructions');
    const mockupResult = document.getElementById('mockupResult');
    const mockupCode = document.getElementById('mockupCode');

    if (generateMockupBtn) {
        generateMockupBtn.addEventListener('click', async () => {
            const imageFile = mockupImageInput.files[0];
            const instructions = mockupInstructionsInput.value;
            
            if (!imageFile) {
                showToast("Please provide a wireframe image.");
                return;
            }
            showToast("Generating mockup...");
            mockupResult.innerHTML = '<div class="text-white">Loading...</div>';
            mockupCode.textContent = '';

            const imageBase64 = await getBase64(imageFile);

            const aiPrompt = `You are an expert UI/UX designer and frontend developer specializing in Tailwind CSS. Analyze the provided wireframe image and follow the user's instructions to create a high-fidelity mockup. Generate a single HTML file using Tailwind CSS. The HTML should be self-contained and not require any external CSS or JS files other than the Tailwind CDN script (<script src="https://cdn.tailwindcss.com"></script>). User instructions: "${instructions}".

Respond with a single, valid JSON object with a single key "html". The value should be the complete HTML code as a string.

IMPORTANT: You MUST ensure the HTML content within the JSON string is properly escaped. Specifically, all double quotes (") inside the HTML code must be escaped with a backslash (\\").

Example of a correctly escaped response:
{
  "html": "<div class=\\"text-red-500\\">Hello World</div>"
}`;

            const parts = [
                { text: aiPrompt },
                { inline_data: { mime_type: imageFile.type, data: imageBase64 } }
            ];
            
            const result = await callGenerativeApi(null, parts);

            if (result) {
                try {
                    const jsonMatch = result.match(/```json\s*(\{[\s\S]*\})\s*```|(\{[\s\S]*\})/);
                    if (!jsonMatch) throw new Error("No JSON object found in the AI response.");

                    let jsonString = jsonMatch[1] || jsonMatch[2];
                    // Sanitize the JSON string to remove invalid control characters.
                    jsonString = jsonString.replace(/[\x00-\x1F\x7F-\x9F]/g, "");

                    const responseObject = JSON.parse(jsonString);

                    if (!responseObject.html) {
                        throw new Error("AI response is missing the 'html' field.");
                    }

                    const finalHtml = responseObject.html.includes('https://cdn.tailwindcss.com')
                        ? responseObject.html
                        : `<script src="https://cdn.tailwindcss.com"></script>${responseObject.html}`;

                    // Create a Blob from the HTML
                    const blob = new Blob([finalHtml], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);

                    // Create an iframe and set its src to the Blob URL
                    const iframe = document.createElement('iframe');
                    iframe.src = url;
                    iframe.className = "w-full h-[800px] border-none bg-white";
                    iframe.sandbox = "allow-scripts allow-same-origin";
                    
                    // Clear the previous result and append the new iframe
                    mockupResult.innerHTML = '';
                    mockupResult.appendChild(iframe);
                    
                    // Revoke the object URL after the iframe has loaded to free up memory
                    iframe.onload = () => {
                        URL.revokeObjectURL(url);
                    };

                    mockupCode.textContent = finalHtml;
                    showToast("Mockup generated successfully.");
                } catch (e) {
                    console.error("Failed to parse mockup JSON:", e);
                    showToast("Failed to parse AI response.");
                    mockupResult.innerHTML = `<div class="text-red-400">Error parsing response. The AI may have returned invalid HTML or JSON.</div>`;
                }
            } else {
                mockupResult.innerHTML = '';
            }
        });
    }

    async function verifyPermission(fileHandle, readWrite) {
        const options = {};
        if (readWrite) {
            options.mode = 'readwrite';
        }
        if ((await fileHandle.queryPermission(options)) === 'granted') {
            return true;
        }
        if ((await fileHandle.requestPermission(options)) === 'granted') {
            return true;
        }
        return false;
    }

    async function loadProjectFromIndexedDB() {
        try {
            const handle = await window.idb.get('projectDirHandle');
            if (handle) {
                if (await verifyPermission(handle, true)) {
                    projectDirHandle = handle;
                    await renderFileTree();
                    showToast('Restored project from last session.');
                } else {
                    showToast('Permission to access project folder was denied.');
                    await window.idb.del('projectDirHandle');
                }
            }
        } catch (error) {
            console.error('Could not load project from IndexedDB:', error);
            showToast('Could not restore project.');
        }
    }

    // Try to load the project when the developer tab becomes visible
    const developerTabObserver = new MutationObserver((mutationsList, observer) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (!developerContent.classList.contains('hidden') && !projectDirHandle) {
                    loadProjectFromIndexedDB();
                    // No need to observe anymore once we've tried to load
                    observer.disconnect();
                }
            }
        }
    });

    if (developerContent) {
        developerTabObserver.observe(developerContent, { attributes: true });
    }

    const lintFileBtn = document.getElementById('lintFileBtn');
    if (lintFileBtn) {
        lintFileBtn.addEventListener('click', async () => {
            if (!currentFileHandle) {
                showToast("Please open a file to lint.");
                return;
            }
            const fileContent = codeEditor.getValue();
            const prompt = `
                Please act as an expert code reviewer. Analyze the following code from the file "${currentFilePath}" for any issues, including bugs, style violations, performance concerns, and opportunities for improvement. Provide your feedback in a clear, concise, and actionable format using Markdown.

                \`\`\`${currentFileHandle.name.split('.').pop()}
                ${fileContent}
                \`\`\`
            `;
            
            // We can reuse the main chat window's submission logic
            const promptTextarea = document.getElementById('prompt');
            const submitButton = document.getElementById('submitBtn');
            
            promptTextarea.value = prompt;
            submitButton.click();
            
            // Switch to the chat tab to show the result
            document.getElementById('chatTab').click();
        });
    }

    const indexProjectBtn = document.getElementById('indexProjectBtn');
    if (indexProjectBtn) {
        indexProjectBtn.addEventListener('click', async () => {
            const apiKey = apiKeyInput.value;
            const model = modelSelect.value;
            if (!apiKey) {
                showToast("Please enter your Google AI Studio API key.");
                return;
            }
            if (!projectDirHandle) {
                showToast("Please open a project folder first.");
                return;
            }
            const indexer = new window.ProjectIndexer(apiKey, model);
            await indexer.indexProject();
        });
    }
});
