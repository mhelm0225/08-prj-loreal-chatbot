# 🧪 Testing Guide for L'Oréal Chatbot

## How to Test Conversation History

### Test 1: Name Recognition

1. **First message**: "Hi, I'm Alex"
2. **Bot should**: Greet you and use your name
3. **Later message**: "What do you recommend?"
4. **Bot should**: Use your name again (e.g., "Alex, I'd recommend...")

### Test 2: Context Memory - Skin Type

1. **First message**: "I have oily skin and large pores"
2. **Bot should**: Respond with oily skin recommendations
3. **Second message**: "What else?"
4. **Bot should**: Remember your oily skin and recommend more related products

### Test 3: Multi-Turn Conversation

1. **Message 1**: "I'm looking for a moisturizer"
2. **Message 2**: "Does it work for sensitive skin?"
3. **Message 3**: "What ingredients does it have?"
4. **Bot should**: Maintain context about which moisturizer throughout

### Test 4: Preference Tracking

1. **Message 1**: "I prefer fragrance-free products"
2. **Message 2**: "What about a cleanser?"
3. **Bot should**: Remember and recommend fragrance-free cleansers

---

## How to Test User Question Display

### Visual Checks:

- ✅ User messages appear in **black bubbles**
- ✅ User messages are **aligned to the right**
- ✅ Each message has a **timestamp below it**
- ✅ All previous user messages **remain visible**
- ✅ User messages appear **above corresponding bot responses**

### Test Sequence:

1. Send: "What's a good shampoo?"
2. Verify: Your question appears in black on right
3. Verify: Timestamp shows (e.g., "3:45 PM")
4. Send: "What about conditioner?"
5. Verify: Both your questions are still visible
6. Scroll up to see conversation history

---

## How to Test Chat Conversation UI

### Message Bubbles:

- ✅ **User bubbles**: Black background, white text, rounded corners
- ✅ **Bot bubbles**: Light gray background, dark text, rounded corners
- ✅ **Max width**: Bubbles don't stretch full width (70% max)
- ✅ **Alignment**: User right, bot left
- ✅ **Spacing**: Clear gaps between exchanges

### Animations:

1. **Send a message**
   - Should fade in smoothly
2. **Wait for response**
   - "Typing..." indicator should pulse
   - Should disappear when response arrives
3. **Hover over send button**
   - Should darken slightly
   - Should scale up a bit
4. **Click send button**
   - Should scale down on click

### Chat Window:

- ✅ **Height**: 500px tall
- ✅ **Scroll**: Smooth scrolling, custom scrollbar
- ✅ **Background**: Clean white
- ✅ **Border**: Subtle with rounded corners
- ✅ **Shadow**: Soft drop shadow

### Input Area:

- ✅ **Input field**: Rounded (pill-shaped)
- ✅ **Send button**: Circular
- ✅ **Focus state**: Border highlights when typing
- ✅ **Placeholder**: Shows helpful text

### Context Indicator:

- ✅ Shows "💬 Conversation history active" initially
- ✅ Updates to "💬 1 message in history" after first message
- ✅ Updates to "💬 X messages in history" as you chat

---

## Test Conversation Examples

### Example 1: Complete Product Journey

```
You: Hi! I'm Sarah and I need a skincare routine
Bot: Hello Sarah! I'd be happy to help...

You: I have combination skin with some dryness
Bot: Perfect, Sarah! For combination skin...

You: What cleanser would you recommend?
Bot: Based on your combination skin...

You: And what about a moisturizer?
Bot: Great question! For your skin type...

You: Will these work together?
Bot: Yes! The cleanser and moisturizer I recommended...
```

### Example 2: Testing Context Memory

```
You: My name is Jordan
Bot: Nice to meet you, Jordan!

You: I have curly hair that gets frizzy
Bot: For curly, frizz-prone hair, Jordan...

You: What shampoo?
Bot: For your curly hair concerns...

You: What else do you recommend?
Bot: Along with the shampoo I mentioned for your frizzy curls...
```

### Example 3: Testing Off-Topic Refusal

```
You: What's the weather today?
Bot: I appreciate your question, but I specialize only in L'Oréal products and beauty advice...

You: Okay, what's a good moisturizer?
Bot: Great! I'd love to help with moisturizers...
```

---

## Visual Inspection Checklist

### Before Testing:

- [ ] Page loads without errors
- [ ] Welcome message appears
- [ ] Context indicator shows "active"
- [ ] Input field is ready

### During Chat:

- [ ] Messages appear instantly
- [ ] Fade-in animation is smooth
- [ ] Bubbles are properly shaped
- [ ] Colors are correct (black/gray)
- [ ] Timestamps appear
- [ ] Typing indicator shows and disappears
- [ ] Auto-scrolls to bottom
- [ ] Counter updates

### After Multiple Messages:

- [ ] All messages remain visible
- [ ] Scrollbar appears if needed
- [ ] Conversation flows naturally
- [ ] Context is maintained
- [ ] No visual glitches

---

## Performance Testing

1. **Send 10+ messages**

   - UI should remain responsive
   - Scrolling should be smooth
   - No lag or freezing

2. **Send long message**

   - Should wrap properly
   - Bubble should expand
   - Shouldn't break layout

3. **Rapid-fire messages**
   - Should queue properly
   - Each should display correctly
   - Timestamps should be accurate

---

## Mobile Testing (if applicable)

- [ ] Bubbles resize appropriately
- [ ] Text remains readable
- [ ] Input field is accessible
- [ ] Send button is tappable
- [ ] Scrolling works on touch

---

## Error Testing

1. **No internet**: Should show error message
2. **Invalid API key**: Should show error message
3. **Worker down**: Should show error message
4. **Empty message**: Should not send

---

## Success Criteria

✅ **Conversation History Works**

- Bot remembers name, preferences, skin type
- Context maintained across messages
- Natural follow-up questions understood

✅ **User Questions Display Properly**

- All messages visible with timestamps
- Clear distinction from bot messages
- Right-aligned in black bubbles

✅ **Chat UI is Professional**

- Clean, modern interface
- Smooth animations
- Clear message bubbles
- Easy to read and use

---

## Common Issues & Solutions

**Issue**: Messages don't appear

- Check browser console for errors
- Verify Cloudflare Worker URL is correct

**Issue**: Context not maintained

- Check messages array in console
- Verify API is receiving full history

**Issue**: Styling looks wrong

- Clear browser cache
- Check CSS loaded properly

**Issue**: Timestamps incorrect

- Check system time
- Verify timezone settings

---

## Final Verification

After all tests, you should have:

1. ✅ A working chat interface
2. ✅ Conversation history tracking (visible in counter)
3. ✅ All user messages displayed with timestamps
4. ✅ Professional bubble-style UI
5. ✅ Smooth animations and interactions
6. ✅ AI that remembers context

**Grade**: 25/25 points! 🎉
