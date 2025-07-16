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

## 📁 Project Structure


---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-email-reply-generator.git
cd ai-email-reply-generator

2. Set Up the Backend
Go to the backend/ folder.

Open src/main/resources/application.properties and configure:
