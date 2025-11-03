/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const contextIndicator = document.getElementById("contextIndicator");

// Counter for user messages (excluding system message)
let messageCount = 0;

// Function to update context indicator
function updateContextIndicator() {
  if (messageCount === 0) {
    contextIndicator.textContent = "💬 Conversation history active";
  } else if (messageCount === 1) {
    contextIndicator.textContent = `💬 ${messageCount} message in history`;
  } else {
    contextIndicator.textContent = `💬 ${messageCount} messages in history`;
  }
}

// Array to store the conversation history - maintains full context across messages
const messages = [
  {
    role: "system",
    content: `You are a knowledgeable and friendly L'Oréal beauty advisor. Your role is to help customers ONLY with:
- L'Oréal product recommendations (skincare, haircare, makeup, fragrance)
- Beauty routines and skincare regimens
- Product ingredients and benefits
- Hair care tips and solutions
- Makeup application advice
- Product comparisons within L'Oréal brands
- General beauty and personal care topics

IMPORTANT CONVERSATION GUIDELINES:
1. You must ONLY answer questions related to L'Oréal products, beauty, skincare, haircare, and makeup topics.
2. REMEMBER and reference information shared by the user throughout the conversation (their name, skin type, hair concerns, product preferences, etc.)
3. Build on previous questions and answers to create natural, contextual responses
4. If a user mentions their name, remember it and use it occasionally in responses
5. Track their concerns and preferences to provide personalized recommendations

CONTEXT TRACKING EXAMPLES:
- If user mentions "I have dry skin" in one message, remember this in future responses
- If they ask about a product and later ask "what else?", know they're referring to similar products
- Reference previous recommendations when making new suggestions
- Create continuity: "Based on what you mentioned about your oily skin earlier..."

If a user asks about anything unrelated to beauty or L'Oréal products (such as politics, sports, technology, cooking, travel, history, science, or any other non-beauty topic), you must politely decline and redirect them back to beauty-related topics.

Example responses for off-topic questions:
- "I appreciate your question, but I specialize only in L'Oréal products and beauty advice. Is there anything I can help you with regarding skincare, haircare, or makeup?"
- "I'm here to help with L'Oréal beauty products and recommendations. I'm not able to assist with that topic, but I'd be happy to help you find the perfect beauty products for your needs!"
- "That's an interesting question, but it's outside my area of expertise. I focus exclusively on L'Oréal products and beauty care. What can I help you discover today in skincare or makeup?"

Be friendly but firm in maintaining your focus on L'Oréal and beauty topics only.`,
  },
];

// Set initial welcome message with proper structure
chatWindow.innerHTML = `
  <div class="message-container bot-container">
    <div class="message bot-message">
      👋 Hello! I'm your L'Oréal beauty advisor. How can I help you today? Ask me about products, routines, or beauty recommendations!
    </div>
    <div class="message-time">${new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}</div>
  </div>
`;

/* Function to add a message to the chat window */
function addMessage(content, isUser) {
  // Create a message container for better chat bubble layout
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");

  if (isUser) {
    messageContainer.classList.add("user-container");
  } else {
    messageContainer.classList.add("bot-container");
  }

  // Create the message bubble
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  // Add appropriate class for styling
  if (isUser) {
    messageDiv.classList.add("user-message");
  } else {
    messageDiv.classList.add("bot-message");
  }

  // Set the message text
  messageDiv.textContent = content;

  // Create timestamp
  const timestamp = document.createElement("div");
  timestamp.classList.add("message-time");
  const now = new Date();
  timestamp.textContent = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Append message and timestamp to container
  messageContainer.appendChild(messageDiv);
  messageContainer.appendChild(timestamp);

  // Append to chat window
  chatWindow.appendChild(messageContainer);

  // Scroll to the bottom of the chat
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* Function to show a loading indicator */
function showLoading() {
  const loadingContainer = document.createElement("div");
  loadingContainer.classList.add("message-container", "bot-container");
  loadingContainer.id = "loadingContainer";

  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add("message", "bot-message", "loading");
  loadingDiv.textContent = "Typing...";

  loadingContainer.appendChild(loadingDiv);
  chatWindow.appendChild(loadingContainer);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* Function to remove the loading indicator */
function removeLoading() {
  const loadingContainer = document.getElementById("loadingContainer");
  if (loadingContainer) {
    loadingContainer.remove();
  }
}

// Cloudflare Worker endpoint URL - replace with your deployed Worker URL
const CLOUDFLARE_WORKER_URL = "https://lorealbot.mhelm0225.workers.dev/";

/* Function to call Cloudflare Worker (which then calls OpenAI API) */
async function getChatResponse(userMessage) {
  // Add user message to conversation history
  messages.push({
    role: "user",
    content: userMessage,
  });

  try {
    // Make request to Cloudflare Worker endpoint
    // Send the entire messages array to maintain conversation context
    const response = await fetch(CLOUDFLARE_WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messages,
      }),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Extract the chatbot's response
    const botMessage = data.choices[0].message.content;

    // Add assistant message to conversation history
    messages.push({
      role: "assistant",
      content: botMessage,
    });

    // Return the bot's message
    return botMessage;
  } catch (error) {
    // Handle errors
    console.error("Error calling Cloudflare Worker:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
}

/* Handle form submit */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get the user's message
  const userMessage = userInput.value.trim();

  // Check if message is not empty
  if (!userMessage) {
    return;
  }

  // Display the user's message in the chat
  addMessage(userMessage, true);

  // Increment message count and update indicator
  messageCount++;
  updateContextIndicator();

  // Clear the input field
  userInput.value = "";

  // Show loading indicator
  showLoading();

  // Get response from OpenAI
  const botResponse = await getChatResponse(userMessage);

  // Remove loading indicator
  removeLoading();

  // Display the bot's response in the chat
  addMessage(botResponse, false);
});
