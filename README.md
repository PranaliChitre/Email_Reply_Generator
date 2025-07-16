# 📧 AI Email Reply Generator Extension

A smart, context-aware **Gmail Chrome Extension** that uses **Google Gemini API** and a **Spring Boot backend** to generate professional email replies. This extension observes the Gmail DOM using **MutationObserver**, detects when the user is replying, and injects a **"Generate Reply"** button directly into the Gmail interface.

---

## ✨ Features

- 🧠 **AI-Powered Email Reply Suggestions**  
  Automatically generates intelligent replies using the Gemini API based on the email thread content.

- 📨 **Real-Time Gmail Monitoring**  
  Uses MutationObserver to detect when a reply box appears in Gmail.

- 🖱️ **Inline Reply Button**  
  Adds a custom "Generate Reply" button next to Gmail's native "Send" button.

- 🔧 **Spring Boot Backend**  
  Handles Gemini API communication, request routing, and response formatting.

- 🔗 **Seamless Gmail Integration**  
  Works directly inside Gmail via a Chrome Extension—no need to leave the inbox.

---

## 🛠 Tech Stack

- **Frontend**: Chrome Extension (JavaScript, HTML, CSS)
- **Backend**: Spring Boot (Java)
- **AI**: Gemini API (Google Generative AI)
- **Browser API**: MutationObserver, DOM Manipulation

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-email-reply-generator.git
cd ai-email-reply-generator
```

### 2. Set Up the Backend
Go to the backend/ folder.

Open src/main/resources/application.properties and configure:

```bash
gemini.api.key=YOUR_GEMINI_API_KEY
spring.cors.allowed-origins=http://localhost:PORT
```

Start the Spring Boot server:
```bash
./mvnw spring-boot:run
```

### 3. Load the Chrome Extension
Open Google Chrome and go to chrome://extensions/

Enable Developer Mode

Click Load Unpacked

Select the extension/ folder

Gmail will now have a “Generate Reply” button when replying to emails

### 🔄 How It Works
The Chrome Extension uses a MutationObserver to detect when a user clicks "Reply".

A "Generate Reply" button is dynamically added next to the "Send" button.

When clicked:

The extension extracts the email thread context.

Sends it to the Spring Boot backend.

The backend formats the prompt and queries Gemini API.

A response is returned and inserted into the Gmail reply box.

### 🔐 Privacy & Permissions
No data is stored or logged.

Gmail API is not accessed—extension interacts with Gmail's frontend only.

All AI processing is handled via a secure backend connection.

### 🚧 Future Enhancements
Multiple tone options (formal, friendly, concise)

Multi-language reply generation

Reply editing suggestions

Gmail thread history summarization

👩‍💻 Author
Pranali Chitre
AI Developer | Full-Stack Engineer | ML Enthusiast
🔗 [GitHub](https://github.com/PranaliChitre) | 🔗 [LinkedIn](https://www.linkedin.com/in/pranali-chitre/)
