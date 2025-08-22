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
    const webBrowsingToggle = document.getElementById('webBrowsingToggle');
    const webBrowsingIcon = document.getElementById('webBrowsingIcon');
    const webBrowsingTooltip = document.getElementById('webBrowsingTooltip');
    const pdfFileInput = document.getElementById('pdfFile');
    console.log('Got pdfFileInput element:', pdfFileInput);
   const fileAttachmentContainer = document.getElementById('file-attachment-container');
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
    const rulesetSelect = document.getElementById('rulesetSelect');
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
    const converter = new showdown.Converter({ tables: true, simpleLineBreaks: true, tasklists: true });
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
    const savedRuleset = localStorage.getItem('selectedRuleset');

    if (savedRuleset) {
       rulesetSelect.value = savedRuleset;
    }

    if (savedInstruction) {
        systemInstruction = savedInstruction;
        systemInstructionText.value = savedInstruction;
    }

    settingsBtn.addEventListener('click', () => settingsDropdown.classList.toggle('hidden'));
    systemInstructionBtn.addEventListener('click', () => systemInstructionModal.classList.remove('hidden'));
    closeModal.addEventListener('click', () => systemInstructionModal.classList.add('hidden'));
    rulesetSelect.addEventListener('change', async () => {
       const selectedUrl = rulesetSelect.value;
       if (selectedUrl) {
           try {
               const response = await fetch(selectedUrl);
               if (!response.ok) {
                   throw new Error(`HTTP error! status: ${response.status}`);
               }
               const text = await response.text();
               systemInstructionText.value = text;
           } catch (error) {
               console.error('Error fetching ruleset:', error);
               systemInstructionText.value = `Failed to load ruleset. Please check the URL or your network connection.`;
           }
       } else {
           // "Custom" is selected, so clear the textarea
           systemInstructionText.value = '';
       }
    });

    saveSystemInstruction.addEventListener('click', () => {
        systemInstruction = systemInstructionText.value;
        localStorage.setItem('systemInstruction', systemInstruction);
        // Also save the selected URL to re-select it when the modal is opened next time
        localStorage.setItem('selectedRuleset', rulesetSelect.value);
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

   webBrowsingToggle.addEventListener('mouseenter', () => {
       webBrowsingTooltip.classList.remove('opacity-0');
   });

   webBrowsingToggle.addEventListener('mouseleave', () => {
       webBrowsingTooltip.classList.add('opacity-0');
   });

   webBrowsingToggle.addEventListener('click', () => {
       const enabled = webBrowsingCheckbox.checked;
       webBrowsingCheckbox.checked = !enabled;
       if (!enabled) {
           webBrowsingIcon.classList.add('text-indigo-400');
           webBrowsingTooltip.textContent = 'Web Browsing Enabled';
       } else {
           webBrowsingIcon.classList.remove('text-indigo-400');
           webBrowsingTooltip.textContent = 'Enable Web Browsing';
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
            showToast('Please enter a prompt.');
            return;
        }

        submitButton.disabled = true;
        submitButton.classList.add('opacity-50', 'cursor-not-allowed');
        appendChatBubble(prompt, 'user');
        promptTextarea.value = '';

        const isModificationCommand = prompt.toLowerCase().includes('create') ||
                                      prompt.toLowerCase().includes('modify') ||
                                      prompt.toLowerCase().includes('edit');

        if (isModificationCommand) {
            const steps = generateThinkingSteps(prompt, ""); // No file context for general chat
            window.startAIProcessing(steps);
        }
        
        aiResponseDiv.textContent = 'Thinking...';

        try {
            // This is the unified user input object, including text and potentially a file.
            const userParts = [{ text: prompt }];
            if (pdfFileInput.files.length > 0) {
                const file = pdfFileInput.files[0];
                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result.split(',')[1]);
                    reader.onerror = error => reject(error);
                });
                userParts.push({
                    inlineData: { mimeType: file.type, data: base64 }
                });
                pdfFileInput.value = ''; // Clear the file input
            }

            // Always use the 'general_chat' logic as the single, reliable pipeline.
            // All command routing should happen server-side or be handled by the AI's tool use.
            const webBrowsingEnabled = webBrowsingCheckbox.checked;

            const engineeredPrompt = `
                You are Honoedc, a helpful and conversational AI assistant. Your task is to respond to the user's request in a natural, friendly way while adhering to a specific JSON output format.
                The user's request is: "${prompt}"
                **Crucially, you must use the provided conversation history to inform your response and maintain context.**
                You MUST provide a response in a single, valid JSON object. This object must have two keys:
                1. "mainResponse": A detailed, comprehensive, and conversational answer to the user's query, formatted in Markdown.
                2. "statusMessage": A brief, single-sentence summary of the action taken (e.g., "I have answered your question about my capabilities."). This should be plain text.
            `;

            const requestBody = {
                contents: [...window.conversationHistory, { role: 'user', parts: [{ text: engineeredPrompt }, ...userParts.slice(1)] }],
                systemInstruction: { parts: [{ text: systemInstruction }] },
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
                requestBody.tools = [{ googleSearch: {} }];
            }

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            let buffer = '';
            let fullText = '';
            let lastCandidateWithMetadata = null;

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    console.log('Stream complete');
                    break;
                }
                buffer += new TextDecoder().decode(value);
                
                // Process all complete JSON chunks in the buffer
                while (true) {
                    const start = buffer.indexOf('[');
                    if (start === -1) break;
                    
                    let braceCount = 0;
                    let end = -1;
                    for (let i = start; i < buffer.length; i++) {
                        if (buffer[i] === '[') braceCount++;
                        else if (buffer[i] === ']') braceCount--;
                        if (braceCount === 0) {
                            end = i;
                            break;
                        }
                    }

                    if (end !== -1) {
                        const chunk = buffer.substring(start, end + 1);
                        buffer = buffer.substring(end + 1);
                        try {
                            const jsonArray = JSON.parse(chunk);
                            for (const jsonObj of jsonArray) {
                                if (jsonObj.candidates && jsonObj.candidates[0].content.parts) {
                                    jsonObj.candidates[0].content.parts.forEach(part => {
                                        if (part.text) fullText += part.text;
                                    });
                                }
                                if (jsonObj.candidates && jsonObj.candidates[0].groundingMetadata) {
                                    lastCandidateWithMetadata = jsonObj.candidates[0];
                                }
                            }
                        } catch (e) {
                            console.error("Error parsing stream JSON chunk:", e, "Chunk:", chunk);
                        }
                    } else {
                        break; // Wait for more data
                    }
                }
            }

            // Final processing of the fully accumulated text
            const lastJsonMatch = fullText.lastIndexOf('{"mainResponse"');
            const textToParse = lastJsonMatch !== -1 ? fullText.substring(lastJsonMatch) : fullText;
            const responseObject = extractAndCleanJson(textToParse);

            if (responseObject && responseObject.mainResponse && responseObject.statusMessage) {
                let responseText = responseObject.mainResponse;
                if (webBrowsingCheckbox.checked && lastCandidateWithMetadata) {
                    responseText = addCitations(responseText, lastCandidateWithMetadata);
                }
                const html = converter.makeHtml(responseText);
                aiResponseDiv.innerHTML = html;
                if (window.hljs) {
                    aiResponseDiv.querySelectorAll('pre code').forEach(hljs.highlightElement);
                }
                appendChatBubble(responseObject.statusMessage, 'ai', responseText);
                conversationHistory.push({ role: 'user', parts: userParts });
                conversationHistory.push({ role: 'model', parts: [{ text: JSON.stringify(responseObject) }] });
            } else {
                console.error("Final JSON parsing failed. Displaying raw text.");
                const html = converter.makeHtml(fullText);
                aiResponseDiv.innerHTML = html;
                appendChatBubble("Here is the generated content (raw).", 'ai', fullText);
                conversationHistory.push({ role: 'user', parts: userParts });
                conversationHistory.push({ role: 'model', parts: [{ text: fullText }] });
            }

        } catch (error) {
            console.error('Error fetching AI response:', error);
            showApiErrorModal(error.message);
        } finally {
            if (isModificationCommand) {
                window.stopAIProcessing();
            }
            submitButton.disabled = false;
            submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
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
   pdfFileInput.addEventListener('change', () => {
       if (pdfFileInput.files.length > 0) {
           const file = pdfFileInput.files[0];
           const fileType = file.type.split('/')[1].toUpperCase();
           
           fileAttachmentContainer.innerHTML = `
               <div class="bg-gray-700 rounded-lg p-2 flex items-center justify-between">
                   <div class="flex items-center">
                       <svg class="w-6 h-6 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                       <div>
                           <p class="text-sm font-medium text-white truncate" style="max-width: 200px;">${file.name}</p>
                           <p class="text-xs text-gray-400">${fileType}</p>
                       </div>
                   </div>
                   <button id="clearFileBtn" class="ml-2 text-gray-500 hover:text-white">
                       <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                   </button>
               </div>
           `;
           fileAttachmentContainer.classList.remove('hidden');

           document.getElementById('clearFileBtn').addEventListener('click', () => {
               pdfFileInput.value = '';
               fileAttachmentContainer.innerHTML = '';
               fileAttachmentContainer.classList.add('hidden');
           });
       }
   });
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
       // This regex is designed to find JSON objects that start with `{"mainResponse"`
       // and accounts for nested structures. It's non-greedy to find the shortest match.
       const regex = /{\s*"mainResponse"\s*:\s*".*?"\s*,\s*"statusMessage"\s*:\s*".*?"\s*}/gs;
       const matches = text.match(regex);

       if (!matches) {
           console.error("No valid JSON objects found in the response text.");
           // Fallback for cases where the AI might not return the expected JSON structure at all
           const simpleJsonMatch = text.match(/\{[\s\S]*\}/);
           if (simpleJsonMatch) {
               try {
                   return JSON.parse(simpleJsonMatch[0]);
               } catch (e) {
                    console.error("Could not even parse a simple JSON object from the text.");
                    return null;
               }
           }
           return null;
       }

       // The last match is the most likely to be the complete and final one.
       const lastMatch = matches[matches.length - 1];

       try {
           return JSON.parse(lastMatch);
       } catch (e) {
           console.error("Failed to parse the best-matched JSON object:", e);
           console.error("Original text causing failure:", text);
           console.error("Matched JSON string:", lastMatch);
           return null;
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
