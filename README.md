📧 AI Email Reply Generator Extension
A smart, context-aware Gmail Chrome Extension that uses Google Gemini API and a Spring Boot backend to generate professional email replies. This extension observes the Gmail DOM using MutationObserver, detects when the user is replying, and injects a "Generate Reply" button directly into the Gmail interface.

✨ Key Features
🧠 AI-Powered Email Response Generation
Automatically generates email replies using Google's Gemini API based on email context.

📨 Real-Time DOM Detection
Uses MutationObserver to detect when a reply box is opened in Gmail.

🖱️ One-Click Reply Generation
Adds a "Generate Reply" button next to Gmail's Send button for seamless interaction.

🔗 Spring Boot Backend
Handles API requests, Gemini prompt formatting, and securely bridges the extension with Gemini AI.

🧩 Chrome Extension Integration
Fully embedded within Gmail—no need to switch tabs or copy content.

🛠 Tech Stack
Backend: Spring Boot (Java)

AI Integration: Google Gemini API

Frontend: Chrome Extension (JavaScript, HTML, CSS)

Gmail Interaction: Gmail DOM, MutationObserver

⚙️ Setup Instructions
1. Clone the Repository
   ```git clone https://github.com/yourusername/ai-email-reply-generator.git
cd ai-email-reply-generator
```
