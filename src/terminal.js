document.addEventListener('DOMContentLoaded', () => {
    const devTerminalTab = document.getElementById('devTerminalTab');
    const devTerminalContent = document.getElementById('devTerminalContent');
    const terminalContainer = document.getElementById('terminal');
    let term;

    function initializeTerminal() {
        if (term) {
            term.dispose();
        }
        term = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#1f2937', // bg-gray-800
                foreground: '#d1d5db', // text-gray-300
                cursor: '#a5b4fc',     // text-indigo-300
            }
        });
        term.open(terminalContainer);
        term.writeln('Welcome to the Web Terminal!');
        term.writeln('This is a sandboxed environment. Commands run here do not affect your local system.');
        term.write('$ ');

        term.onData(e => {
            // For now, just echo the input.
            // In a real implementation, this would handle command execution.
            if (e === '\r') { // Enter key
                term.writeln('');
                // Mock command handling
                term.writeln(`Command executed (mock).`);
                term.write('$ ');
            } else if (e === '\u007F') { // Backspace
                term.write('\b \b');
            } else {
                term.write(e);
            }
        });
    }

    if (devTerminalTab) {
        devTerminalTab.addEventListener('click', () => {
            // The main handleTabSwitch is in developer.js, we just need to initialize
            if (!term) {
                initializeTerminal();
            }
        });
    }
});