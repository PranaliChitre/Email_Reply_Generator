console.log("Email Writer Extension - Content Script Loaded");

function createAIButton() {
    const button = document.createElement('button');
    button.className = 'ai-reply-btn';
    button.style.cssText = `
        margin-right: 8px;
        padding: 0 16px;
        height: 36px;
        background: #1a73e8;
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        font-family: 'Google Sans', Roboto, sans-serif;
    `;
    button.innerHTML = 'AI Reply';
    button.setAttribute('aria-label', 'Generate AI Reply');
    button.setAttribute('type', 'button');
    return button;
}

// ✅ Robust email content extraction with fallbacks
function getEmailContent() {
    const selectors = [
        '.ii.gt', // Gmail's email body container
        '.a3s.aiL', // Alternative body class
        '[role="article"]', // Email content area
        '.msg-body', // Fallback selector
        '.adn.ads' // Additional fallback
    ];

    for (const selector of selectors) {
        try {
            const element = document.querySelector(selector);
            if (element) {
                const text = element.innerText.trim();
                if (text.length > 0) return text;
            }
        } catch (e) {
            console.warn(`Selector failed: ${selector}`, e);
        }
    }
    console.warn("No email content found using selectors");
    return '';
}

function findComposeToolbar(retryCount = 0) {
    const selectors = [
        '.dC', // New Gmail compose toolbar
        '.gU.Up', // Alternative toolbar
        '[role="toolbar"]', // Generic toolbar
        '[aria-label="Formatting options"]', // Formatting toolbar
        '[gh="cm"]' // Gmail internal compose marker
    ];

    for (const selector of selectors) {
        try {
            const toolbar = document.querySelector(selector);
            if (toolbar) {
                console.log("Found toolbar with selector:", selector);
                return toolbar;
            }
        } catch (e) {
            console.warn(`Invalid selector: ${selector}`, e);
        }
    }

    // Retry logic for dynamic loading
    if (retryCount < 3) {
        console.log(`Retrying toolbar detection (attempt ${retryCount + 1})`);
        return new Promise(resolve => {
            setTimeout(() => resolve(findComposeToolbar(retryCount + 1)), 500);
        });
    }

    console.warn("Toolbar not found after retries");
    return null;
}

async function injectButton() {
    try {
        // Remove existing buttons
        document.querySelectorAll('.ai-reply-btn').forEach(btn => btn.remove());

        const toolbar = await findComposeToolbar();
        if (!toolbar) {
            console.warn("Gmail compose toolbar not found");
            return;
        }

        const button = createAIButton();
        
        button.addEventListener('click', async () => {
            try {
                button.disabled = true;
                button.textContent = "Generating...";
                button.style.opacity = "0.8";

                const emailContent = getEmailContent();
                if (!emailContent) throw new Error("No email content found");

                const response = await fetch('http://localhost:8080/api/email/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        emailContent: emailContent,
                        tone: "professional"
                    })
                });

                if (!response.ok) {
                    throw new Error(`API request failed: ${response.status}`);
                }

                const reply = await response.text();
                const composeBox = document.querySelector('[aria-label="Message Body"]') || 
                                 document.querySelector('[contenteditable="true"]') ||
                                 document.querySelector('.editable');

                if (composeBox) {
                    composeBox.focus();
                    // Modern way to insert text (works in Gmail)
                    const range = document.createRange();
                    range.selectNodeContents(composeBox);
                    range.deleteContents();
                    composeBox.appendChild(document.createTextNode(reply));
                } else {
                    throw new Error("Could not find compose box");
                }
            } catch (error) {
                console.error("AI Reply Error:", error);
                button.textContent = "Error - Try Again";
                setTimeout(() => { 
                    button.textContent = 'AI Reply';
                    button.style.opacity = "1";
                }, 2000);
            } finally {
                button.disabled = false;
                button.style.opacity = "1";
            }
        });

        toolbar.prepend(button);
        console.log("AI Reply button injected successfully");
    } catch (error) {
        console.error("Button injection failed:", error);
    }
}

let injectionTimeout;
const observer = new MutationObserver((mutations) => {
    // Check for compose window elements
    const composeElements = [
        '.compose-button',
        '[role="dialog"]',
        '.aDh',
        '.btC'
    ].some(selector => document.querySelector(selector));

    if (composeElements) {
        clearTimeout(injectionTimeout);
        injectionTimeout = setTimeout(() => {
            console.log("Compose window detected - injecting button");
            injectButton();
        }, 1000);
    }
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'role']
});

// Initial injection attempts
const MAX_INITIAL_ATTEMPTS = 5;
let attempts = 0;

const initialInjection = setInterval(() => {
    injectButton();
    attempts++;
    if (attempts >= MAX_INITIAL_ATTEMPTS) {
        clearInterval(initialInjection);
    }
}, 1000);
