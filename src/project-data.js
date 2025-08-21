window.DEFAULT_PROJECT_FILES = {
  "README.md": `# Honoedc - Your Personal AI Assistant

Honoedc is a sophisticated, locally-run AI assistant designed for developers, researchers, and anyone in need of a powerful, customizable, and private AI companion. It leverages the power of Google's Gemini models through your own API key, ensuring your data remains secure and your interactions private.

## Key Features

- **Real-time AI Chat**: Engage in dynamic conversations with a powerful AI model.
- **Local First**: Your conversations and data are stored in your browser's local storage, not on any server.
- **Customizable Behavior**: Use the "Behavior Configuration" to set a system-wide instruction, tailoring the AI's personality and responses to your needs.
- **Conversation Management**: Save, load, delete, import, and export your conversations with ease.
- **Markdown & Code Support**: Responses are rendered in Markdown, with full support for code blocks and syntax highlighting.
- **Web Browsing**: Enable web browsing to allow the AI to access real-time information from the internet for up-to-date answers.
- **PDF Analysis**: Upload PDF documents to have the AI summarize or answer questions about their content.
- **Honoetion - Your Personal Database**: A unique feature that allows you to create, manage, and query structured data tables directly within the application. Use natural language commands to manipulate your data.
- **Developer Toolkit**: A suite of powerful tools designed to accelerate development workflows:
    - **AI IDE**: Upload your entire project folder, view the file tree, edit code in a full-featured editor, and use AI to modify your code across multiple files.
    - **User Flow Diagram Generator**: Create Mermaid.js user flow diagrams from simple text descriptions.
    - **SVG Generator**: Generate custom SVG icons and illustrations from text prompts or by converting raster images.
    - **Color Palette Generator**: Create beautiful color schemes from descriptive text (e.g., "a calming palette for a yoga app").
    - **Background Remover**: Upload an image and instantly remove the background using the remove.bg API.
    - **AI Background Replacement**: After removing a background, use AI to generate a new, context-aware background for your subject.
    - **Mockup Generator**: Transform wireframe images into high-fidelity mockups with Tailwind CSS, with optional AI instructions for styling.

## Getting Started

1.  **Clone or download the repository.**
2.  **Open \`index.html\` in your web browser.**
3.  **Enter your Google AI Studio API Key.** You can get one for free from [Google AI Studio](https://aistudio.google.com/).
4.  **Start chatting!**

## How to Use the Developer Tools

1.  Click on the "Developer" tab.
2.  Select the desired tool from the sub-tabs (AI IDE, User Flow, etc.).
3.  Follow the on-screen instructions for each tool.
4.  For tools requiring an API key (like the main chat or background remover), make sure you've entered it in the designated input field.

## Privacy

Your privacy is paramount. All your data, including API keys, conversations, and Honoetion tables, is stored exclusively in your browser's local storage. No data is ever sent to an external server, except for the necessary API calls to Google AI and remove.bg, which are proxied through your own browser.
`
};