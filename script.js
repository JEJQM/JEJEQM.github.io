const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const typingIndicator = document.getElementById("typing-indicator");

// Enter key to send message
userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  const userText = userInput.value.trim();
  if (!userText) return;

  // Show user message with animation
  appendMessage("user", userText);
  userInput.value = "";
  
  // Show typing indicator
  showTypingIndicator();
  
  // Get bot response
  try {
    const botReply = await fetchDeepSeekResponse(userText);
    hideTypingIndicator();
    appendMessage("bot", botReply);
  } catch (error) {
    hideTypingIndicator();
    appendMessage("bot", "Fehler beim Abrufen der Antwort ❌");
    console.error("API Error:", error);
  }
}

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message");
  message.classList.add(sender + "-message");
  
  // Format links in the message
  const formattedText = formatLinks(text);
  
  message.innerHTML = `<strong>${sender === "user" ? "Du" : "ChatCucumber"}:</strong> ${formattedText}`;
  chatBox.appendChild(message);
  
  // Scroll to bottom with smooth behavior
  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior: "smooth"
  });
}

function formatLinks(text) {
  // Simple URL detection and formatting
  return text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #00ffcc; text-decoration: none;">$1</a>');
}

function showTypingIndicator() {
  typingIndicator.style.display = "flex";
  chatBox.appendChild(typingIndicator);
  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior: "smooth"
  });
}

function hideTypingIndicator() {
  typingIndicator.style.display = "none";
}

async function fetchDeepSeekResponse(message) {
  const apiKey = "sk-9531ade5f9824b139a451debe49d31f6";

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: message }],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Initial greeting
window.onload = function() {
  setTimeout(() => {
    appendMessage("bot", "Hallo! Ich bin ChatCucumber. 🥒 Wie kann ich dir helfen?");
  }, 1000);
};
