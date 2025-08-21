document.addEventListener('DOMContentLoaded', () => {
    Split(['#split-0', '#split-1'], {
        sizes: [80, 20],
        minSize: [200, 300],
        gutterSize: 8,
        cursor: 'col-resize'
    });

    console.log('DOMContentLoaded event fired.');
    const apiKeyInput = document.getElementById('apiKey');
    const apiProvider = document.getElementById('apiProvider');
    console.log('Got apiKeyInput element:', apiKeyInput);
    const modelSelect = document.getElementById('modelSelect');
    console.log('Got modelSelect element:', modelSelect);
    const promptTextarea = document.getElementById('prompt');
    const commandSuggestion = document.getElementById('commandSuggestion');
    const fileSuggestion = document.getElementById('fileSuggestion');
    const tableCommandSuggestion = document.getElementById('tableCommandSuggestion');
    const codeCommandSuggestion = document.createElement('div');
    codeCommandSuggestion.className = 'p-2 text-sm text-gray-300 hover:bg-gray-600 cursor-pointer';
    codeCommandSuggestion.id = 'codeCommandSuggestion';
    codeCommandSuggestion.innerHTML = '<span class="font-bold">/code</span> - Modify code in the AI IDE';
    commandSuggestion.appendChild(codeCommandSuggestion);

    const docCommandSuggestion = document.createElement('div');
    docCommandSuggestion.className = 'p-2 text-sm text-gray-300 hover:bg-gray-600 cursor-pointer';
    docCommandSuggestion.id = 'docCommandSuggestion';
    docCommandSuggestion.innerHTML = '<span class="font-bold">/doc</span> - Create a Word document';
    commandSuggestion.appendChild(docCommandSuggestion);

    const createCommandSuggestion = document.createElement('div');
    createCommandSuggestion.className = 'p-2 text-sm text-gray-300 hover:bg-gray-600 cursor-pointer';
    createCommandSuggestion.id = 'createCommandSuggestion';
    createCommandSuggestion.innerHTML = '<span class="font-bold">/create</span> - Create new files with AI';
    commandSuggestion.appendChild(createCommandSuggestion);

    const lintCommandSuggestion = document.createElement('div');
    lintCommandSuggestion.className = 'p-2 text-sm text-gray-300 hover:bg-gray-600 cursor-pointer';
    lintCommandSuggestion.id = 'lintCommandSuggestion';
    lintCommandSuggestion.innerHTML = '<span class="font-bold">/lint</span> - Analyze the current file for issues';
    commandSuggestion.appendChild(lintCommandSuggestion);

    console.log('Got promptTextarea element:', promptTextarea);
    const submitButton = document.getElementById('submitBtn');
    console.log('Got submitButton element:', submitButton);
    const aiResponseDiv = document.getElementById('aiResponse');
    window.aiResponseDiv = aiResponseDiv;
    console.log('Got aiResponseDiv element:', aiResponseDiv);
    const webBrowsingCheckbox = document.getElementById('webBrowsing');
    console.log('Got webBrowsingCheckbox element:', webBrowsingCheckbox);
    const pdfFileInput = document.getElementById('pdfFile');
    console.log('Got pdfFileInput element:', pdfFileInput);
    const chatHistory = document.getElementById('chatHistory');
    const chatPlaceholder = document.getElementById('chatPlaceholder');
    const clearButton = document.getElementById('clearBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsDropdown = document.getElementById('settingsDropdown');
    const systemInstructionBtn = document.getElementById('systemInstructionBtn');
    const systemInstructionModal = document.getElementById('systemInstructionModal');
    const systemInstructionText = document.getElementById('systemInstructionText');
    const saveSystemInstruction = document.getElementById('saveSystemInstruction');
    const closeModal = document.getElementById('closeModal');
    const saveBtn = document.getElementById('saveBtn');
    const loadBtn = document.getElementById('loadBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const viewResponseModal = document.getElementById('viewResponseModal');
    const viewResponseContent = document.getElementById('viewResponseContent');
    const closeViewModal = document.getElementById('closeViewModal');
    const loadedConvoIndicator = document.getElementById('loadedConvoIndicator');
    const highlightColorPicker = document.getElementById('highlightColorPicker');
    const highlightBtn = document.getElementById('highlightBtn');
    const clearHighlightsBtn = document.getElementById('clearHighlightsBtn');
    const saveModal = document.getElementById('saveModal');
    const closeSaveModal = document.getElementById('closeSaveModal');
    const saveConvoBtn = document.getElementById('saveConvoBtn');
    const convoNameInput = document.getElementById('convoNameInput');
    const loadModal = document.getElementById('loadModal');
    const closeLoadModal = document.getElementById('closeLoadModal');
    const convoList = document.getElementById('convoList');
    const chatTab = document.getElementById('chatTab');
    const honoetionTab = document.getElementById('honoetionTab');
    const developerTab = document.getElementById('developerTab');
    const docAgentTab = document.getElementById('docAgentTab');
    const chatContent = document.getElementById('chatContent');
    const honoetionContent = document.getElementById('honoetionContent');
    const developerContent = document.getElementById('developerContent');
    const docAgentContent = document.getElementById('docAgentContent');
    const addTableBtn = document.getElementById('addTableBtn');
    const tablesContainer = document.getElementById('tablesContainer');
    const addTableModal = document.getElementById('addTableModal');
    const tableNameInput = document.getElementById('tableNameInput');
    const tableColumnsInput = document.getElementById('tableColumnsInput');
    const saveTableBtn = document.getElementById('saveTableBtn');
    const closeAddTableModal = document.getElementById('closeAddTableModal');
    const addColumnModal = document.getElementById('addColumnModal');
    const columnNameInput = document.getElementById('columnNameInput');
    const tableNameForNewColumn = document.getElementById('tableNameForNewColumn');
    const saveColumnBtn = document.getElementById('saveColumnBtn');
    const closeAddColumnModal = document.getElementById('closeAddColumnModal');
    const deleteTableModal = document.getElementById('deleteTableModal');
    const tableNameToDelete = document.getElementById('tableNameToDelete');
    const confirmDeleteTableBtn = document.getElementById('confirmDeleteTableBtn');
    const cancelDeleteTableBtn = document.getElementById('cancelDeleteTableBtn');
    const exportModal = document.getElementById('exportModal');
    const closeExportModal = document.getElementById('closeExportModal');
    const exportFileNameInput = document.getElementById('exportFileNameInput');
    const exportConvoBtn = document.getElementById('exportConvoBtn');
    const importModal = document.getElementById('importModal');
    const closeImportModal = document.getElementById('closeImportModal');
    const importFileInput = document.getElementById('importFileInput');
    const importConvoBtn = document.getElementById('importConvoBtn');
    const shareSessionBtn = document.getElementById('shareSessionBtn');
    const toggleSettingsBtn = document.getElementById('toggleSettingsBtn');
    const settingsContainer = document.getElementById('settingsContainer');
    const converter = new showdown.Converter({ tables: true, simpleLineBreaks: true });
    window.converter = converter;
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    let conversationHistory = [];
    window.conversationHistory = conversationHistory;
    let loadedConvoName = '';
    let systemInstruction = '';
    const aiProcessingModal = document.getElementById('aiProcessingModal');
   const aiThinkingProcess = document.getElementById('aiThinkingProcess');
   const aiResponseTimer = document.getElementById('aiResponseTimer');
   const apiErrorModal = document.getElementById('apiErrorModal');
   const apiErrorMessage = document.getElementById('apiErrorMessage');
   const closeApiErrorModal = document.getElementById('closeApiErrorModal');
   let responseTimerInterval;

    window.showToast = function(message) {
       toastMessage.textContent = message;
       toast.classList.remove('hidden');
       setTimeout(() => {
           toast.classList.add('hidden');
       }, 3000);
    }

   function showApiErrorModal(message) {
       apiErrorMessage.textContent = message;
       apiErrorModal.classList.remove('hidden');
   }

   closeApiErrorModal.addEventListener('click', () => {
       apiErrorModal.classList.add('hidden');
   });
    // Load system instruction from local storage
    const savedInstruction = localStorage.getItem('systemInstruction');
    if (savedInstruction) {
        systemInstruction = savedInstruction;
        systemInstructionText.value = savedInstruction;
    }

    settingsBtn.addEventListener('click', () => settingsDropdown.classList.toggle('hidden'));
    systemInstructionBtn.addEventListener('click', () => systemInstructionModal.classList.remove('hidden'));
    closeModal.addEventListener('click', () => systemInstructionModal.classList.add('hidden'));
    saveSystemInstruction.addEventListener('click', () => {
        systemInstruction = systemInstructionText.value;
        localStorage.setItem('systemInstruction', systemInstruction);
        systemInstructionModal.classList.add('hidden');
        console.log('System instruction saved.');
    });

    chatTab.addEventListener('click', () => {
       chatContent.classList.remove('hidden');
       honoetionContent.classList.add('hidden');
       developerContent.classList.add('hidden');
       if (docAgentContent) docAgentContent.classList.add('hidden');
       chatTab.classList.add('bg-gray-700', 'text-white');
       chatTab.classList.remove('text-gray-400', 'hover:bg-gray-700');
       honoetionTab.classList.add('text-gray-400', 'hover:bg-gray-700');
       honoetionTab.classList.remove('bg-gray-700', 'text-white');
       developerTab.classList.add('text-gray-400', 'hover:bg-gray-700');
       developerTab.classList.remove('bg-gray-700', 'text-white');
       if (docAgentTab) {
           docAgentTab.classList.add('text-gray-400', 'hover:bg-gray-700');
           docAgentTab.classList.remove('bg-gray-700', 'text-white');
       }
    });

    honoetionTab.addEventListener('click', () => {
       honoetionContent.classList.remove('hidden');
       chatContent.classList.add('hidden');
       developerContent.classList.add('hidden');
       if (docAgentContent) docAgentContent.classList.add('hidden');
       honoetionTab.classList.add('bg-gray-700', 'text-white');
       honoetionTab.classList.remove('text-gray-400', 'hover:bg-gray-700');
       chatTab.classList.add('text-gray-400', 'hover:bg-gray-700');
       chatTab.classList.remove('bg-gray-700', 'text-white');
       developerTab.classList.add('text-gray-400', 'hover:bg-gray-700');
       developerTab.classList.remove('bg-gray-700', 'text-white');
       if (docAgentTab) {
           docAgentTab.classList.add('text-gray-400', 'hover:bg-gray-700');
           docAgentTab.classList.remove('bg-gray-700', 'text-white');
       }
    });

    developerTab.addEventListener('click', () => {
       developerContent.classList.remove('hidden');
       chatContent.classList.add('hidden');
       honoetionContent.classList.add('hidden');
       if (docAgentContent) docAgentContent.classList.add('hidden');
       developerTab.classList.add('bg-gray-700', 'text-white');
       developerTab.classList.remove('text-gray-400', 'hover:bg-gray-700');
       chatTab.classList.add('text-gray-400', 'hover:bg-gray-700');
       chatTab.classList.remove('bg-gray-700', 'text-white');
       honoetionTab.classList.add('text-gray-400', 'hover:bg-gray-700');
       honoetionTab.classList.remove('bg-gray-700', 'text-white');
       if (docAgentTab) {
           docAgentTab.classList.add('text-gray-400', 'hover:bg-gray-700');
           docAgentTab.classList.remove('bg-gray-700', 'text-white');
       }
       
       // Manually trigger the AI IDE tab's click handler to ensure it loads correctly
       if (document.getElementById('devAiIdeTab')) {
           document.getElementById('devAiIdeTab').click();
       }
    });

   if (docAgentTab) {
       docAgentTab.addEventListener('click', () => {
           if (docAgentContent) docAgentContent.classList.remove('hidden');
           chatContent.classList.add('hidden');
           honoetionContent.classList.add('hidden');
           developerContent.classList.add('hidden');

           docAgentTab.classList.add('bg-gray-700', 'text-white');
           docAgentTab.classList.remove('text-gray-400', 'hover:bg-gray-700');

           chatTab.classList.add('text-gray-400', 'hover:bg-gray-700');
           chatTab.classList.remove('bg-gray-700', 'text-white');
           honoetionTab.classList.add('text-gray-400', 'hover:bg-gray-700');
           honoetionTab.classList.remove('bg-gray-700', 'text-white');
           developerTab.classList.add('text-gray-400', 'hover:bg-gray-700');
           developerTab.classList.remove('bg-gray-700', 'text-white');
       });
   }

   let tables = JSON.parse(localStorage.getItem('honoetionTables')) || {};
   window.tables = tables;

   function saveTables() {
       localStorage.setItem('honoetionTables', JSON.stringify(tables));
   }

   function renderTables() {
       tablesContainer.innerHTML = '';
       for (const tableName in tables) {
           renderTable(tableName, tables[tableName]);
       }
   }

   function renderTable(name, tableData) {
       const tableWrapper = document.createElement('div');
       tableWrapper.className = 'bg-gray-900 p-4 rounded-lg border border-gray-700';

       const tableHeader = document.createElement('div');
       tableHeader.className = 'flex justify-between items-center mb-2';
       tableHeader.innerHTML = `<h3 class="text-lg text-white">${name}</h3>`;
       const buttonsWrapper = document.createElement('div');
       const addColumnBtn = document.createElement('button');
       addColumnBtn.className = 'addColumnBtn text-indigo-400 hover:text-indigo-300 text-sm mr-4';
       addColumnBtn.textContent = 'Add Column';
       addColumnBtn.dataset.name = name;
       buttonsWrapper.appendChild(addColumnBtn);
       const deleteTableBtn = document.createElement('button');
       deleteTableBtn.className = 'deleteTableBtn text-red-400 hover:text-red-300 text-sm';
       deleteTableBtn.dataset.name = name;
       deleteTableBtn.textContent = 'Delete Table';
       buttonsWrapper.appendChild(deleteTableBtn);
       tableHeader.appendChild(buttonsWrapper);
       tableWrapper.appendChild(tableHeader);

       const table = document.createElement('table');
       table.className = 'w-full text-sm text-left text-gray-400';
       const thead = document.createElement('thead');
       thead.className = 'text-xs text-gray-300 uppercase bg-gray-700';
       let tr = document.createElement('tr');
       tableData.columns.forEach((col, colIndex) => {
           tr.innerHTML += `<th scope="col" class="px-6 py-3" contenteditable="true" onblur="updateColumnName('${name}', ${colIndex}, this.innerText)">${col}</th>`;
       });
       thead.appendChild(tr);

       const tbody = document.createElement('tbody');
       tableData.rows.forEach((row, rowIndex) => {
           tr = document.createElement('tr');
           tr.className = 'bg-gray-800 border-b border-gray-700';
           tableData.columns.forEach(col => {
               tr.innerHTML += `<td class="px-6 py-4" contenteditable="true" onblur="updateCell('${name}', ${rowIndex}, '${col}', this.innerText)">${row[col] || ''}</td>`;
           });
           tbody.appendChild(tr);
       });

       table.appendChild(thead);
       table.appendChild(tbody);
       
       const tableContainer = document.createElement('div');
       tableContainer.className = 'overflow-x-auto';
       tableContainer.appendChild(table);
       tableWrapper.appendChild(tableContainer);

       const addRowBtn = document.createElement('button');
       addRowBtn.className = 'addRowBtn mt-2 px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700';
       addRowBtn.textContent = 'Add Row';
       addRowBtn.dataset.name = name;
       tableWrapper.appendChild(addRowBtn);

       tablesContainer.appendChild(tableWrapper);
   }

   window.updateCell = (tableName, rowIndex, colName, value) => {
       tables[tableName].rows[rowIndex][colName] = value;
       saveTables();
   };

   window.updateColumnName = (tableName, colIndex, newName) => {
       const oldName = tables[tableName].columns[colIndex];
       newName = newName.trim();

       if (newName && oldName !== newName && !tables[tableName].columns.includes(newName)) {
           tables[tableName].columns[colIndex] = newName;
           tables[tableName].rows.forEach(row => {
               if (row.hasOwnProperty(oldName)) {
                   row[newName] = row[oldName];
                   delete row[oldName];
               }
           });
           saveTables();
           showToast(`Column "${oldName}" renamed to "${newName}".`);
           // We need to re-render to update the onblur events with the new column name
           renderTables();
       } else if (!newName) {
           showToast("Column name cannot be empty.");
           renderTables();
       } else if (tables[tableName].columns.includes(newName) && oldName !== newName) {
           showToast("A column with this name already exists.");
           renderTables();
       }
   };

   addTableBtn.addEventListener('click', () => {
       addTableModal.classList.remove('hidden');
   });

   closeAddTableModal.addEventListener('click', () => {
       addTableModal.classList.add('hidden');
   });

   saveTableBtn.addEventListener('click', () => {
       const name = tableNameInput.value.trim();
       const columnsStr = tableColumnsInput.value.trim();

       if (name && columnsStr && !tables[name]) {
           const columns = columnsStr.split(',').map(s => s.trim());
           tables[name] = {
               columns: columns,
               rows: [{}] // Start with one empty row
           };
           saveTables();
           renderTables(); // Re-render all tables to include the new one

           // Hide modal and clear inputs
           addTableModal.classList.add('hidden');
           tableNameInput.value = '';
           tableColumnsInput.value = '';
       } else if (!name || !columnsStr) {
           showToast("Table name and column names cannot be empty.");
       } else if (tables[name]) {
           showToast("A table with this name already exists.");
       }
   });

   tablesContainer.addEventListener('click', e => {
       if (e.target.classList.contains('deleteTableBtn')) {
           const name = e.target.dataset.name;
           tableNameToDelete.value = name;
           deleteTableModal.classList.remove('hidden');
       }
       if (e.target.classList.contains('addRowBtn')) {
           const name = e.target.dataset.name;
           tables[name].rows.push({});
           saveTables();
           renderTables();
       }
       if (e.target.classList.contains('addColumnBtn')) {
           const name = e.target.dataset.name;
           tableNameForNewColumn.value = name;
           addColumnModal.classList.remove('hidden');
       }
   });

   closeAddColumnModal.addEventListener('click', () => {
       addColumnModal.classList.add('hidden');
   });

   saveColumnBtn.addEventListener('click', () => {
       const tableName = tableNameForNewColumn.value;
       const newColName = columnNameInput.value.trim();

       if (newColName && tables[tableName] && !tables[tableName].columns.includes(newColName)) {
           tables[tableName].columns.push(newColName);
           saveTables();
           renderTables();
           addColumnModal.classList.add('hidden');
           columnNameInput.value = '';
       } else if (!newColName) {
           showToast("Column name cannot be empty.");
       } else if (tables[tableName] && tables[tableName].columns.includes(newColName)) {
           showToast("A column with this name already exists.");
       }
   });

   cancelDeleteTableBtn.addEventListener('click', () => {
       deleteTableModal.classList.add('hidden');
   });

   confirmDeleteTableBtn.addEventListener('click', () => {
       const name = tableNameToDelete.value;
       delete tables[name];
       saveTables();
       renderTables();
       deleteTableModal.classList.add('hidden');
   });

   renderTables();

    window.appendChatBubble = function(message, sender, fullResponse = null) {
        if (chatPlaceholder) {
            chatPlaceholder.classList.add('hidden');
        }
        const bubbleWrapper = document.createElement('div');
        bubbleWrapper.className = `flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'}`;

        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender}-bubble`;
        bubble.textContent = message;

        bubbleWrapper.appendChild(bubble);

        if (sender === 'ai' && fullResponse) {
            const viewButton = document.createElement('button');
            viewButton.textContent = 'View Full Response';
            viewButton.className = 'text-xs text-indigo-400 hover:text-indigo-300 mt-1';
            viewButton.onclick = () => {
                const html = converter.makeHtml(fullResponse);
                viewResponseContent.innerHTML = html;
                // Ensure the modal is brought to the front if it's already open or add it
                // CodeMirror instances are not embedded, only their value is used.
                viewResponseModal.classList.remove('hidden');
                viewResponseModal.style.zIndex = '1000'; // Set a high z-index
                document.getElementById('viewResponseContent').style.zIndex = '1001'; // Ensure content is also high
                // The modal itself and its backdrop are expected to have z-index stacking context established
                // by CSS to ensure they appear above other page elements.
            };
            bubbleWrapper.appendChild(viewButton);
        }

        chatHistory.appendChild(bubbleWrapper);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to bottom
    }

    closeViewModal.addEventListener('click', () => viewResponseModal.classList.add('hidden'));

    highlightBtn.addEventListener('click', () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        if (selectedText) {
            const span = document.createElement('span');
            span.style.backgroundColor = highlightColorPicker.value;
            span.textContent = selectedText;
            
            range.deleteContents();
            range.insertNode(span);
        }
        selection.removeAllRanges();
    });

    clearHighlightsBtn.addEventListener('click', () => {
        const highlights = viewResponseContent.querySelectorAll('span[style*="background-color"]');
        highlights.forEach(span => {
            const parent = span.parentNode;
            parent.replaceChild(document.createTextNode(span.textContent), span);
            parent.normalize(); // Merges adjacent text nodes
        });
    });

    clearButton.addEventListener('click', () => {
        conversationHistory = [];
        chatHistory.innerHTML = '';
        if (chatPlaceholder) {
            chatHistory.appendChild(chatPlaceholder);
            chatPlaceholder.classList.remove('hidden');
        }
        aiResponseDiv.innerHTML = 'Your AI-generated response will appear here.';
        loadedConvoIndicator.classList.add('hidden');
        deleteBtn.classList.add('hidden');
        loadedConvoName = '';
        console.log('Chat history cleared.');
    });

    saveBtn.addEventListener('click', () => saveModal.classList.remove('hidden'));
    closeSaveModal.addEventListener('click', () => saveModal.classList.add('hidden'));
    saveConvoBtn.addEventListener('click', () => {
        const convoName = convoNameInput.value.trim();
        if (convoName) {
            localStorage.setItem(`convo_${convoName}`, JSON.stringify(conversationHistory));
            saveModal.classList.add('hidden');
            convoNameInput.value = '';
        }
    });

    loadBtn.addEventListener('click', () => {
        convoList.innerHTML = '';
        let convoCount = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('convo_')) {
                convoCount++;
                const convoName = key.replace('convo_', '');
                const convoItem = document.createElement('a');
                convoItem.href = '#';
                convoItem.className = 'block p-2 text-gray-300 hover:bg-gray-700 rounded border border-gray-600 shadow-sm';
                convoItem.textContent = convoName;
                convoItem.onclick = () => {
                    const savedConvo = localStorage.getItem(key);
                    conversationHistory = JSON.parse(savedConvo);
                    chatHistory.innerHTML = '';
                    aiResponseDiv.innerHTML = 'Your AI-generated response will appear here.';
                    if (conversationHistory.length > 0) {
                        if (chatPlaceholder) chatPlaceholder.classList.add('hidden');
                    } else {
                        if (chatPlaceholder) chatPlaceholder.classList.remove('hidden');
                    }
                    conversationHistory.forEach(turn => {
                        if (turn.role === 'user') {
                            appendChatBubble(turn.parts[0].text, 'user');
                        } else if (turn.role === 'model') {
                            try {
                                const response = JSON.parse(turn.parts[0].text);
                                appendChatBubble(response.statusMessage, 'ai', response.mainResponse);
                            } catch (e) {
                                appendChatBubble(turn.parts[0].text, 'ai', turn.parts[0].text);
                            }
                        }
                    });
                    loadedConvoName = convoName;
                    loadedConvoIndicator.textContent = `Loaded: ${convoName}`;
                    loadedConvoIndicator.classList.remove('hidden');
                    deleteBtn.classList.remove('hidden');
                    loadModal.classList.add('hidden');
                };
                convoList.appendChild(convoItem);
            }
        }
        if (convoCount === 0) {
            const noConvoMessage = document.createElement('p');
            noConvoMessage.className = 'text-gray-400 text-center';
            noConvoMessage.textContent = 'No saved conversations found.';
            convoList.appendChild(noConvoMessage);
        }
        loadModal.classList.remove('hidden');
    });
    closeLoadModal.addEventListener('click', () => loadModal.classList.add('hidden'));

    deleteBtn.addEventListener('click', () => {
        if (loadedConvoName) {
            localStorage.removeItem(`convo_${loadedConvoName}`);
            showToast(`Conversation "${loadedConvoName}" deleted!`);
            clearButton.click(); // Reset the UI
        } else {
           const convoName = prompt("Enter the name of the conversation to delete:");
           if (convoName) {
               const savedConvo = localStorage.getItem(`convo_${convoName}`);
               if (savedConvo) {
                   localStorage.removeItem(`convo_${convoName}`);
                   showToast("Conversation deleted!");
               } else {
                   showToast("No conversation found with that name.");
               }
           }
        }
    });

    exportBtn.addEventListener('click', () => exportModal.classList.remove('hidden'));
    closeExportModal.addEventListener('click', () => exportModal.classList.add('hidden'));
    exportConvoBtn.addEventListener('click', () => {
        const convoName = exportFileNameInput.value.trim();
        if (convoName) {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(conversationHistory));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", convoName + ".json");
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
            exportModal.classList.add('hidden');
            exportFileNameInput.value = '';
        }
    });

    importBtn.addEventListener('click', () => importModal.classList.remove('hidden'));
    closeImportModal.addEventListener('click', () => importModal.classList.add('hidden'));
    importConvoBtn.addEventListener('click', () => {
        const file = importFileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = readerEvent => {
                const content = readerEvent.target.result;
                conversationHistory = JSON.parse(content);
                chatHistory.innerHTML = '';
                if (conversationHistory.length > 0) {
                    if (chatPlaceholder) chatPlaceholder.classList.add('hidden');
                } else {
                    if (chatPlaceholder) chatPlaceholder.classList.remove('hidden');
                }
                aiResponseDiv.innerHTML = 'Your AI-generated response will appear here.';
                conversationHistory.forEach(turn => {
                    if (turn.role === 'user') {
                        appendChatBubble(turn.parts[0].text, 'user');
                    } else if (turn.role === 'model') {
                        try {
                            const response = JSON.parse(turn.parts[0].text);
                            appendChatBubble(response.statusMessage, 'ai', response.mainResponse);
                        } catch (e) {
                            // Handle cases where the model response is not a JSON string
                            appendChatBubble(turn.parts[0].text, 'ai', turn.parts[0].text);
                        }
                    }
                });
                importModal.classList.add('hidden');
                importFileInput.value = '';
                showToast("Conversation imported!");
            }
        }
    });

    if (shareSessionBtn) {
        shareSessionBtn.addEventListener('click', () => {
            const sessionId = Date.now().toString();
            const shareUrl = `${window.location.href}?session=${sessionId}`;
            navigator.clipboard.writeText(shareUrl).then(() => {
                showToast('Session URL copied to clipboard!');
            });
        });
    }

    toggleSettingsBtn.addEventListener('click', (event) => {
        settingsContainer.classList.toggle('hidden');
        event.stopPropagation();
    });

    document.addEventListener('click', (event) => {
        if (!settingsContainer.classList.contains('hidden') && !settingsContainer.contains(event.target)) {
            settingsContainer.classList.add('hidden');
        }
    });

    let thinkingInterval;
    window.startAIProcessing = (steps) => {
        aiThinkingProcess.innerHTML = '';
        aiProcessingModal.classList.remove('hidden');
        let seconds = 0;
        aiResponseTimer.textContent = `0s`;
        responseTimerInterval = setInterval(() => {
            seconds++;
            aiResponseTimer.textContent = `${seconds}s`;
        }, 1000);

        let stepIndex = 0;
        const displayNextStep = () => {
            if (stepIndex < steps.length) {
                const p = document.createElement('p');
                p.textContent = steps[stepIndex];
                aiThinkingProcess.appendChild(p);
                aiThinkingProcess.scrollTop = aiThinkingProcess.scrollHeight;
                stepIndex++;
            } else {
                clearInterval(thinkingInterval);
            }
        };

        thinkingInterval = setInterval(displayNextStep, 1200);
        displayNextStep();
    }

    window.stopAIProcessing = () => {
        clearInterval(responseTimerInterval);
        clearInterval(thinkingInterval);
        aiProcessingModal.classList.add('hidden');
    }
 
     window.appendThoughtToModal = function(thought) {
         const p = document.createElement('p');
         p.textContent = thought;
         aiThinkingProcess.appendChild(p);
         aiThinkingProcess.scrollTop = aiThinkingProcess.scrollHeight;
     }
 
     submitButton.addEventListener('click', async () => {
        const apiKey = apiKeyInput.value.trim();
        const model = modelSelect.value;
        const prompt = promptTextarea.value.trim();

        if (!apiKey) {
            showToast('Please enter your API key.');
            return;
        }
        if (!prompt) {
            showToast('Please enter your prompt.');
            return;
        }

        submitButton.disabled = true;
        submitButton.classList.add('opacity-50', 'cursor-not-allowed');
        appendChatBubble(prompt, 'user');
        promptTextarea.value = '';

        // Command-specific routing before general intent detection
        if (prompt.startsWith('/doc')) {
            window.commands.handleDocCommand(prompt, apiKey, model).finally(() => {
                submitButton.disabled = false;
                submitButton.classList.remove('opacity-50', 'cursor-not-allowed');

    // --- New: Call getUserData and display a message --- 
    // In a real scenario, you would have a more sophisticated way to trigger this, 
    // perhaps based on a specific user command or UI interaction.
    // For demonstration, we'll just call it directly after an initial prompt is processed.
    if (window.getUserData) {
        window.getUserData().then(userData => {
            console.log('Received user data:', userData);
            // Display a placeholder or actual data if available
            const aiResponseDiv = document.getElementById('aiResponse');
            if (aiResponseDiv) {
                const message = userData ? `User data fetched successfully. Displaying first name: ${userData.name ? userData.name.split(' ')[0] : 'N/A'}` : 'User data fetched, but no data was returned.'
                const html = converter.makeHtml(message);
                aiResponseDiv.innerHTML = html;
                appendChatBubble(message, 'ai', message);
            }
        }).catch(error => {
            console.error('Failed to display user data:', error);
            const aiResponseDiv = document.getElementById('aiResponse');
            if (aiResponseDiv) {
                aiResponseDiv.innerHTML = '<p>Error fetching or displaying user data.</p>';
                appendChatBubble('Error fetching or displaying user data.', 'ai');
            }
        });
    } else {
        console.warn('getUserData function not found globally.');
    }
    // --- End New --- 
            });
            return;
        }


       const isModificationCommand = prompt.toLowerCase().includes('create') ||
                                     prompt.toLowerCase().includes('modify') ||
                                     prompt.toLowerCase().includes('edit');

        // New Intent Detection Logic
        const intentPrompt = `
            You are an expert at classifying user intent. Analyze the user's prompt and the conversation history to determine the primary intent.
            Respond with a single, valid JSON object with one key, "intent", and one of the following values: "code_modification", "code_question", "table_interaction", "general_chat".

            - "code_modification": Use for requests that explicitly ask to CREATE, MODIFY, EDIT, UPDATE, or DELETE files/code. This also includes contextual follow-ups like "on that file, change the title".
              Examples: "create a new file named index.php", "refactor the login function in auth.js", "add a button to the homepage".
            - "code_question": Use for questions ABOUT the code or project that DO NOT request changes.
              Examples: "how does the build process work?", "what is this function for?", "what files did you just create?".
            - "table_interaction": Use for requests to create, modify, or query the structured tables.
              Examples: "add a new table for users", "update the price in the products table".
            - "general_chat": Use for all other requests, like greetings or conversations not about the project's code/tables.
              Examples: "hello", "what are your capabilities?".

            **IMPORTANT**: If the user's prompt is a follow-up that refers to a file from the previous turn (e.g., "in that file...", "now change this..."), you MUST classify it as "code_modification" or "code_question" as appropriate.

            Conversation History (last 2 turns):
            ${window.conversationHistory.slice(-2).map(turn => `${turn.role}: ${turn.parts[0].text}`).join('\n')}

            User prompt: "${prompt}"
        `;

        const intentApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const intentRequestBody = {
            contents: [{ role: 'user', parts: [{ text: intentPrompt }] }]
        };

        let intent = 'general_chat'; // Default intent
        try {
            const response = await fetch(intentApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(intentRequestBody)
            });
            const data = await response.json();
            if (data.error) {
                showApiErrorModal(data.error.message);
                console.error('Intent detection API error:', data.error);
            } else if (data && data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
                const rawText = data.candidates[0].content.parts[0].text;
                const jsonMatch = rawText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    try {
                        const responseObject = JSON.parse(jsonMatch[0]);
                        if (responseObject.intent) {
                            intent = responseObject.intent;
                        }
                    } catch (e) {
                        console.error('Failed to parse intent JSON:', e);
                    }
                }
            } else {
                console.error('Intent detection response was malformed:', JSON.stringify(data, null, 2));
            }
        } catch (error) {
            console.error('Intent detection failed, falling back to general chat:', error);
        }

        if (intent === 'code_modification' || intent === 'code_question') {
            const webBrowsingEnabled = webBrowsingCheckbox.checked;
            window.commands.handleCodeCommand(`/${intent} ${prompt}`, apiKey, model, webBrowsingEnabled).finally(() => {
                submitButton.disabled = false;
                submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
            });
            return;
        } else if (intent === 'table_interaction') {
            window.commands.handleTableCommand(`/table ${prompt}`, apiKey, model).finally(() => {
                submitButton.disabled = false;
                submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
            });
            return;
        }

        // Fallback to general_chat
        console.log('Submit button clicked for normal chat.');
        const webBrowsingEnabled = webBrowsingCheckbox.checked;
        console.log('Web browsing enabled:', webBrowsingEnabled);

        promptTextarea.value = ''; // Clear prompt after sending

        // Disable the button and provide feedback
        submitButton.disabled = true;
        submitButton.classList.add('opacity-50', 'cursor-not-allowed');
        console.log('Submit button disabled and text changed.');
        aiResponseDiv.textContent = 'Thinking...'; // Clear previous response and show loading
       
       if (isModificationCommand) {
           const steps = generateThinkingSteps(prompt, ""); // No file context for general chat
           window.startAIProcessing(steps);
       }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}`;

        const engineeredPrompt = `
            You are a helpful and conversational AI assistant. Your task is to respond to the user's request in a natural, friendly way while adhering to a specific JSON output format.

            The user's request is: "${prompt}"

            **Crucially, you must use the provided conversation history to inform your response and maintain context.** Do not refer to files or events that are not mentioned in the history.

            You MUST provide a response in a single, valid JSON object. This object must have two keys:
            1. "mainResponse": A detailed, comprehensive, and conversational answer to the user's query, formatted in Markdown.
            2. "statusMessage": A brief, single-sentence summary of the action taken (e.g., "I have answered your question about my capabilities.", "I have greeted you and offered assistance."). This should be plain text.

            **Example 1: Simple Greeting**
            User request: "hello"
            Your response:
            {
              "mainResponse": "Hello there! How can I help you today?",
              "statusMessage": "I have greeted the user and offered assistance."
            }

            **Example 2: Question about capabilities**
            User request: "what are your capabilities?"
            Your response:
            {
              "mainResponse": "I can do a few things! I can answer your questions, help you with coding tasks, and even generate diagrams or color palettes. What would you like to explore?",
              "statusMessage": "I have explained my main capabilities to the user."
            }
        `;

        const userParts = [{
            text: prompt
        }];

        if (pdfFileInput.files.length > 0) {
            const file = pdfFileInput.files[0];
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = error => reject(error);
            });
            userParts.push({
                inlineData: {
                    mimeType: 'application/pdf',
                    data: base64
                }
            });
        }

        const requestParts = [{
            text: engineeredPrompt
        }];

        if (pdfFileInput.files.length > 0) {
            requestParts.push(userParts.find(p => p.inlineData));
        }

        const requestBody = {
            contents: [...window.conversationHistory, {
                role: 'user',
                parts: requestParts
            }],
            systemInstruction: {
                parts: [{ text: systemInstruction }]
            },
           generationConfig: {
               candidateCount: 1,
               stopSequences: [],
               maxOutputTokens: 8192,
               temperature: 1,
               topP: 0.95,
           },
           safetySettings: [
               { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
               { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
               { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
               { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
           ],
        };

       if (webBrowsingEnabled) {
            requestBody.tools = [{
                googleSearch: {}
            }];
        } else if (isModificationCommand) {
           requestBody.tools = [{
               code_execution: {}
           }];
       }

        fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
           .then(response => {
               if (!response.ok) {
                   return response.json().then(errorData => {
                       const errorMessage = errorData.error?.message || `HTTP error! status: ${response.status}`;
                       throw new Error(errorMessage);
                   }).catch(() => {
                       throw new Error(`HTTP error! status: ${response.status}`);
                   });
               }
               const reader = response.body.getReader();
               let buffer = '';
               let fullText = '';
               let lastCandidateWithMetadata = null;

               function processBuffer() {
                   let startIndex = buffer.indexOf('[');
                   if (startIndex === -1) return;

                   let braceCount = 0;
                   let inString = false;
                   let endIndex = -1;

                   for (let i = startIndex; i < buffer.length; i++) {
                       const char = buffer[i];
                       if (char === '"' && (i === 0 || buffer[i - 1] !== '\\')) {
                           inString = !inString;
                       }
                       if (inString) continue;

                       if (char === '[') braceCount++;
                       else if (char === ']') braceCount--;
                       
                       if (braceCount === 0) {
                           endIndex = i;
                           break;
                       }
                   }

                   if (endIndex !== -1) {
                       const jsonString = buffer.substring(startIndex, endIndex + 1);
                       buffer = buffer.substring(endIndex + 1);

                       try {
                           const jsonObjectArray = JSON.parse(jsonString);
                           for (const jsonObject of jsonObjectArray) {
                               if (jsonObject.candidates && jsonObject.candidates[0].content.parts) {
                                   jsonObject.candidates[0].content.parts.forEach(part => {
                                       if (part.functionCall && part.functionCall.name === 'code_execution') {
                                           const thought = `Tool Call: ${part.functionCall.name}\n` +
                                                           `Arguments:\n` +
                                                           `${JSON.stringify(part.functionCall.args, null, 2)}`;
                                           appendThoughtToModal(thought);
                                       } else if (part.text) {
                                           fullText += part.text;
                                       }
                                   });
                               }
                               if (jsonObject.candidates && jsonObject.candidates[0].groundingMetadata) {
                                   lastCandidateWithMetadata = jsonObject.candidates[0];
                               }
                           }
                       } catch (e) {
                           console.error("Error parsing stream JSON:", e, "JSON String:", jsonString);
                       }
                       
                       processBuffer(); // Process the rest of the buffer
                   }
               }

               function read() {
                   reader.read().then(({ done, value }) => {
                       if (done) {
                           if (isModificationCommand) {
                               window.stopAIProcessing();
                           }
                           submitButton.disabled = false;
                           submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
                           console.log('Stream complete');
                           
                           // Final processing of accumulated fullText
                           try {
                               const responseObject = extractAndCleanJson(fullText);
                               if (responseObject) {
                                   if (responseObject.mainResponse && responseObject.statusMessage) {
                                       let responseText = responseObject.mainResponse;
                                       if (webBrowsingCheckbox.checked && lastCandidateWithMetadata) {
                                           responseText = addCitations(responseText, lastCandidateWithMetadata);
                                       }
                                       const html = converter.makeHtml(responseText);
                                       aiResponseDiv.innerHTML = html;
                                       appendChatBubble(responseObject.statusMessage, 'ai', responseText);
                                       conversationHistory.push({ role: 'user', parts: userParts });
                                       conversationHistory.push({ role: 'model', parts: [{ text: JSON.stringify(responseObject) }] });
                                   } else {
                                       throw new Error("Invalid JSON structure from AI.");
                                   }
                               } else {
                                    // Fallback if final response is not JSON
                                   const html = converter.makeHtml(fullText);
                                   aiResponseDiv.innerHTML = html;
                                   appendChatBubble("Here is the generated content.", 'ai', fullText);
                               }
                           } catch (e) {
                               console.error("Failed to parse JSON from AI response:", e);
                               const html = converter.makeHtml("I apologize, but I encountered an issue with formatting my response. Here is the raw data:\n\n" + fullText);
                               aiResponseDiv.innerHTML = html;
                               appendChatBubble("I've processed your request, but there was a formatting error. The raw response is on the left.", 'ai');
                           }
                           return;
                       }

                       buffer += new TextDecoder().decode(value);
                       processBuffer();
                       read();
                   });
               }
               read();
           })
            .catch(error => {
                console.error('Error fetching AI response:', error);
                showApiErrorModal(error.message);
               if (isModificationCommand) {
                   window.stopAIProcessing();
               }
               submitButton.disabled = false;
               submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
            });
    });

   window.getAllProjectFiles = () => {
        const projectData = JSON.parse(localStorage.getItem('aiIdeProject'));
        if (!projectData) {
            return [];
        }
        // This function recursively gets all file paths from the projectFiles object
        const fileList = [];
        function recurse(node, path) {
            for (const key in node) {
                const newPath = path ? `${path}/${key}` : key;
                if (typeof node[key] === 'object' && node[key] !== null) {
                    recurse(node[key], newPath);
                } else {
                    fileList.push(newPath);
                }
            }
        }
        recurse(projectData, '');
        return fileList;
    };

   promptTextarea.addEventListener('input', async () => {
        const text = promptTextarea.value;
        const cursorPos = promptTextarea.selectionStart;

        // Command suggestion
        if (text === '/') {
            commandSuggestion.classList.remove('hidden');
            fileSuggestion.classList.add('hidden');
        } else {
            commandSuggestion.classList.add('hidden');
        }

        // File suggestion
        const atMatch = text.substring(0, cursorPos).match(/@(\S*)$/);
        if (atMatch) {
            const searchTerm = atMatch[1];
            const allFiles = window.getAllProjectFiles ? await window.getAllProjectFiles() : [];
            const filteredFiles = allFiles.filter(file => file.toLowerCase().includes(searchTerm.toLowerCase()));
            
            if (filteredFiles.length > 0) {
                fileSuggestion.innerHTML = '';
                filteredFiles.forEach(file => {
                    const div = document.createElement('div');
                    div.className = 'p-2 text-sm text-gray-300 hover:bg-gray-600 cursor-pointer';
                    div.textContent = file;
                    div.onclick = () => {
                        const textBefore = text.substring(0, cursorPos - searchTerm.length - 1);
                        const textAfter = text.substring(cursorPos);
                        promptTextarea.value = `${textBefore}@'${file}' ${textAfter}`;
                        fileSuggestion.classList.add('hidden');
                        promptTextarea.focus();
                    };
                    fileSuggestion.appendChild(div);
                });
                fileSuggestion.classList.remove('hidden');
            } else {
                fileSuggestion.classList.add('hidden');
            }
        } else {
            fileSuggestion.classList.add('hidden');
        }
    });

   tableCommandSuggestion.addEventListener('click', () => {
       promptTextarea.value = '/table ';
       commandSuggestion.classList.add('hidden');
       promptTextarea.focus();
   });

   codeCommandSuggestion.addEventListener('click', () => {
       promptTextarea.value = '/code ';
       commandSuggestion.classList.add('hidden');
       promptTextarea.focus();
   });

   createCommandSuggestion.addEventListener('click', () => {
       promptTextarea.value = '/create ';
       commandSuggestion.classList.add('hidden');
       promptTextarea.focus();
   });

   lintCommandSuggestion.addEventListener('click', () => {
       promptTextarea.value = '/lint';
       commandSuggestion.classList.add('hidden');
       promptTextarea.focus();
       // Automatically submit the command
       submitButton.click();
   });

   docCommandSuggestion.addEventListener('click', () => {
       promptTextarea.value = '/doc ';
       commandSuggestion.classList.add('hidden');
       promptTextarea.focus();
   });

   window.executeTableCommand = function(command) {
       const executeSingleAction = (action) => {
           switch (action.command) {
               case 'createTable':
                   if (action.tableName && action.columns && !tables[action.tableName]) {
                       tables[action.tableName] = { columns: action.columns, rows: [] };
                   }
                   break;
               case 'deleteTable':
                   if (action.tableName && tables[action.tableName]) {
                       delete tables[action.tableName];
                   }
                   break;
               case 'addRow':
                   if (action.tableName && tables[action.tableName] && action.data) {
                       tables[action.tableName].rows.push(action.data);
                   }
                   break;
               case 'addColumn':
                    if (action.tableName && tables[action.tableName] && action.columnName && !tables[action.tableName].columns.includes(action.columnName)) {
                       tables[action.tableName].columns.push(action.columnName);
                   }
                   break;
               case 'renameColumn':
                   if (action.tableName && tables[action.tableName] && action.oldName && action.newName && !tables[action.tableName].columns.includes(action.newName)) {
                       const colIndex = tables[action.tableName].columns.indexOf(action.oldName);
                       if (colIndex > -1) {
                           tables[action.tableName].columns[colIndex] = action.newName;
                           tables[action.tableName].rows.forEach(row => {
                               if (row.hasOwnProperty(action.oldName)) {
                                   row[action.newName] = row[action.oldName];
                                   delete row[action.oldName];
                               }
                           });
                       }
                   }
                   break;
               case 'updateCell':
                   if (action.tableName && tables[action.tableName] && action.rowIndex !== undefined && action.columnName && action.newValue !== undefined) {
                       tables[action.tableName].rows[action.rowIndex][action.columnName] = action.newValue;
                   }
                   break;
               case 'deleteRow':
                   if (action.tableName && tables[action.tableName] && action.rowIndex !== undefined) {
                       tables[action.tableName].rows.splice(action.rowIndex, 1);
                   }
                   break;
               case 'clearRow':
                   if (action.tableName && tables[action.tableName] && action.rowIndex !== undefined) {
                       tables[action.tableName].rows[action.rowIndex] = {};
                   }
                   break;
           }
       };

       if (command.command === 'batch') {
           command.actions.forEach(executeSingleAction);
       } else {
           executeSingleAction(command);
       }

       saveTables();
       renderTables();
       honoetionTab.click(); // Switch to the Honoetion tab
   }
});

    // New helper function to apply diffs
    window.applyDiffToFileContent = (originalContent, searchString, replaceString) => {
        // Escape special characters in the search string for regex
        const escapedSearchString = searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedSearchString, 's'); // 's' flag for dotall (matches newlines)

        // Only replace the first occurrence
        const newContent = originalContent.replace(regex, replaceString);
        
        if (newContent === originalContent) {
            console.warn("Diff application: No match found for search string, or content is identical.");
        }
        return newContent;
    };

    // --- Plan Approval Modal ---
    window.showPlanApprovalModal = (plan, onApproveCallback) => {
        const planApprovalModal = document.getElementById('planApprovalModal');
        const planContainer = document.getElementById('planContainer');
        const approvePlanBtn = document.getElementById('approvePlanBtn_unique');
        const cancelPlanBtn = document.getElementById('cancelPlanBtn_unique');

        if (!planApprovalModal || !planContainer || !approvePlanBtn || !cancelPlanBtn) {
            console.error('Plan approval modal elements not found!');
            return;
        }

        planContainer.innerHTML = '';
        if (plan && plan.plan && Array.isArray(plan.plan)) {
            plan.plan.forEach(step => {
                const p = document.createElement('p');
                p.textContent = step;
                planContainer.appendChild(p);
            });
        }

        planApprovalModal.classList.remove('hidden');

        const approveHandler = () => {
            planApprovalModal.classList.add('hidden');
            if (typeof onApproveCallback === 'function') {
                onApproveCallback(true);
            }
            cleanup();
        };

        const cancelHandler = () => {
            planApprovalModal.classList.add('hidden');
            if (typeof onApproveCallback === 'function') {
                onApproveCallback(false);
            }
            cleanup();
        };

        const cleanup = () => {
            approvePlanBtn.removeEventListener('click', approveHandler);
            cancelPlanBtn.removeEventListener('click', cancelHandler);
        };

        approvePlanBtn.addEventListener('click', approveHandler, { once: true });
        cancelPlanBtn.addEventListener('click', cancelHandler, { once: true });
    };

   function extractAndCleanJson(text) {
       // Find the full JSON string by locating the first '{' and the last '}'
       const startIndex = text.indexOf('{');
       const endIndex = text.lastIndexOf('}');
       if (startIndex === -1 || endIndex === -1) {
           console.error("Could not find JSON object in the response.");
           return null;
       }
       const jsonString = text.substring(startIndex, endIndex + 1);

       try {
           // First, try to parse the JSON directly. If it works, we're done.
           return JSON.parse(jsonString);
       } catch (e) {
           // If direct parsing fails, proceed with the surgical fix.
           console.warn("Direct JSON parsing failed, attempting surgical fix...");
           try {
               // Define the keys we'll use as anchors
               const mainResponseKey = '"mainResponse"';
               const statusMessageKey = '"statusMessage"';

               // Find the start of the mainResponse value
               let mainResponseValueStart = jsonString.indexOf(mainResponseKey);
               if (mainResponseValueStart === -1) throw new Error('mainResponse key not found');
               mainResponseValueStart = jsonString.indexOf(':', mainResponseValueStart) + 1;
               mainResponseValueStart = jsonString.indexOf('"', mainResponseValueStart) + 1;

               // Find the end of the mainResponse value
               let mainResponseValueEnd = jsonString.lastIndexOf(statusMessageKey);
               if (mainResponseValueEnd === -1) throw new Error('statusMessage key not found');
               mainResponseValueEnd = jsonString.lastIndexOf('"', mainResponseValueEnd);
               // Backtrack to the comma before the statusMessage key
               mainResponseValueEnd = jsonString.lastIndexOf('"', mainResponseValueEnd -1) + 1;


               if (mainResponseValueStart >= mainResponseValueEnd) {
                   throw new Error('Could not determine mainResponse content boundaries.');
               }

               // Extract the three parts of the JSON string
               const prefix = jsonString.substring(0, mainResponseValueStart);
               const content = jsonString.substring(mainResponseValueStart, mainResponseValueEnd -1);
               const suffix = jsonString.substring(mainResponseValueEnd -1);

               // Escape only the unescaped double quotes within the content
               const escapedContent = content.replace(/(?<!\\)"/g, '\\"');

               // Reconstruct the JSON string
               const reconstructedJson = prefix + escapedContent + suffix;
               
               console.log("Successfully reconstructed JSON, attempting to parse again.");
               return JSON.parse(reconstructedJson);

           } catch (fixError) {
               console.error("Surgical JSON fix failed:", fixError);
               console.error("Original text:", text);
               console.error("Initial JSON string:", jsonString);
               return null; // Return null if all attempts fail
           }
       }
   }
    function addCitations(text, candidate) {
        const supports = candidate.groundingMetadata?.groundingSupports;
        const chunks = candidate.groundingMetadata?.groundingChunks;

        if (!supports || !chunks) {
            return text;
        }

        // Sort supports by end_index in descending order to avoid shifting issues when inserting.
        const sortedSupports = [...supports].sort(
            (a, b) => (b.segment?.endIndex ?? 0) - (a.segment?.endIndex ?? 0),
        );

        for (const support of sortedSupports) {
            const endIndex = support.segment?.endIndex;
            if (endIndex === undefined || !support.groundingChunkIndices?.length) {
            continue;
            }

            const citationLinks = support.groundingChunkIndices
            .map(i => {
                const uri = chunks[i]?.web?.uri;
                if (uri) {
                return `[${i + 1}](${uri})`;
                }
                return null;
            })
            .filter(Boolean);

            if (citationLinks.length > 0) {
            const citationString = ` ${citationLinks.join(" ")}`;
            text = text.slice(0, endIndex) + citationString + text.slice(endIndex);
            }
        }

        return text;
    }

    // --- Full Project Scan Warning Modal ---
    window.confirmFullProjectScan = (fileCount, charCount) => {
        return new Promise((resolve) => {
            const modal = document.getElementById('fullProjectWarningModal');
            const fileCountSpan = document.getElementById('fullProjectFileCount');
            const proceedBtn = document.getElementById('proceedWithFullProjectScanBtn');
            const cancelBtn = document.getElementById('cancelFullProjectScanBtn');

            if (!modal || !fileCountSpan || !proceedBtn || !cancelBtn) {
                console.error('Full project scan modal elements not found!');
                resolve(true); // Failsafe to proceed
                return;
            }

            fileCountSpan.textContent = `This will read all ${fileCount} files in your project (approximately ${Math.round(charCount / 1000)}k characters).`;
            modal.classList.remove('hidden');

            const proceedHandler = () => {
                modal.classList.add('hidden');
                cleanup();
                resolve(true);
            };

            const cancelHandler = () => {
                modal.classList.add('hidden');
                cleanup();
                resolve(false);
            };

            const cleanup = () => {
                proceedBtn.removeEventListener('click', proceedHandler);
                cancelBtn.removeEventListener('click', cancelHandler);
            };

            proceedBtn.addEventListener('click', proceedHandler, { once: true });
            cancelBtn.addEventListener('click', cancelHandler, { once: true });
        });
    };
