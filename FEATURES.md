# L'Oréal Chatbot Features

## ✅ Conversation History Tracking (10 pts)

### Implementation:

The chatbot maintains full conversation context through the `messages` array, which stores:

- System prompt with instructions
- All user messages
- All assistant responses

### Features:

1. **Context Persistence**: Every message is stored and sent with each API request
2. **User Information Memory**: The AI remembers:
   - User's name if mentioned
   - Skin type, hair concerns, product preferences
   - Previous questions and recommendations
3. **Natural Follow-ups**: Users can ask follow-up questions like:
   - "What else would you recommend?" (refers to previous topic)
   - "Tell me more about that product" (refers to last mentioned product)
   - "What about for oily skin instead?" (builds on previous conversation)

### Example Conversation Flow:

```
User: "Hi, I'm Sarah and I have dry skin"
Bot: "Hello Sarah! For dry skin, I recommend..."

User: "What else?"
Bot: "Based on your dry skin concerns, Sarah, you might also like..."
```

### Visual Indicator:

- Message counter shows: "💬 X messages in history"
- Updates in real-time as conversation progresses

---

## ✅ User Question Display (5 pts)

### Implementation:

Each user message is displayed in a distinct bubble format that appears above the bot's response.

### Features:

1. **Clear User Messages**: Dark bubble (black background, white text)
2. **Aligned Right**: User messages appear on the right side
3. **Timestamp**: Each message shows when it was sent
4. **Persistent**: All previous Q&A pairs remain visible in the chat

### Visual Design:

- User messages: Black bubble, right-aligned
- Bot messages: Light gray bubble, left-aligned
- Each message has a rounded bubble shape
- Timestamps appear below each message

---

## ✅ Chat Conversation UI (10 pts)

### Implementation:

Modern chat interface that mimics popular messaging apps.

### Features:

#### 1. **Message Bubbles**

- Distinct styling for user vs. bot messages
- Rounded corners with tail effect (bottom-right for user, bottom-left for bot)
- Maximum width of 70% to maintain readability
- Word wrap for long messages

#### 2. **Visual Hierarchy**

- User messages: Black background (#000), white text
- Bot messages: Light gray background (#f0f0f0), dark text
- Clear separation between speakers

#### 3. **Animations**

- Fade-in animation when messages appear
- Smooth scroll to bottom for new messages
- Typing indicator with pulse animation
- Button hover and click effects

#### 4. **Enhanced Chat Window**

- Height: 500px for comfortable reading
- Custom scrollbar styling
- Clean white background
- Subtle shadow for depth
- Rounded corners

#### 5. **Modern Input Area**

- Rounded input field (pill-shaped)
- Circular send button
- Smooth focus effects
- Scale animation on button interactions

#### 6. **Timestamps**

- Small gray text under each message
- Shows time in 12-hour format (e.g., "2:45 PM")
- Helps track conversation flow

#### 7. **Loading State**

- "Typing..." indicator appears while waiting
- Styled as a bot message
- Pulsing animation for engagement
- Auto-removes when response arrives

---

## 📊 Technical Implementation

### Conversation History

```javascript
const messages = [
  { role: "system", content: "..." }, // AI instructions
  { role: "user", content: "..." }, // User messages
  { role: "assistant", content: "..." }, // Bot responses
];
```

### Message Display

```javascript
function addMessage(content, isUser) {
  // Creates message container
  // Adds message bubble with styling
  // Includes timestamp
  // Auto-scrolls to bottom
}
```

### Context Tracking

- System prompt instructs AI to remember user details
- Full message array sent with each API request
- AI naturally references previous context in responses

---

## 🎨 Design Features

### Color Scheme

- **User**: Black (#000) with white text
- **Bot**: Light gray (#f0f0f0) with dark text
- **Accents**: Subtle shadows and hover effects

### Typography

- Font: Montserrat (clean, modern)
- Message text: 16px
- Timestamp: 11px
- Line height: 1.5 for readability

### Spacing

- Message margin: 20px between exchanges
- Bubble padding: 12px vertical, 16px horizontal
- Max width: 70% of chat window

---

## 🔍 User Experience Highlights

1. **Natural Conversations**: AI remembers context across multiple turns
2. **Visual Clarity**: Clear distinction between user and bot messages
3. **Temporal Context**: Timestamps help track conversation timeline
4. **Engagement**: Smooth animations and loading indicators
5. **Accessibility**: Proper labels and semantic HTML
6. **Mobile-Ready**: Responsive design adapts to screen sizes

---

## 🧪 Testing the Features

### Test Conversation History:

1. Tell the bot your name: "Hi, I'm Alex"
2. Mention skin type: "I have oily skin"
3. Later ask: "What products would you recommend?"
4. Bot should reference your name and skin type

### Test Message Display:

1. Ask several questions
2. Notice user messages (right, black) vs bot messages (left, gray)
3. See timestamps under each message
4. All previous messages remain visible

### Test Chat UI:

1. Send multiple messages and observe the bubble layout
2. Notice the smooth fade-in animations
3. Watch the "Typing..." indicator while waiting
4. Try the send button hover effects
5. Check the message counter updates
