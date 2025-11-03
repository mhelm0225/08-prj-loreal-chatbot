# Cloudflare Worker Setup Instructions

## Step 1: Deploy Your Cloudflare Worker

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages**
3. Click **Create Application** → **Create Worker**
4. Give your worker a name (e.g., `loreal-chatbot-api`)
5. Copy the code from `RESOURCE_cloudflare-worker.js` into the worker editor
6. Click **Save and Deploy**

## Step 2: Add Your OpenAI API Key to Cloudflare

1. In your Worker's page, go to **Settings** → **Variables**
2. Under **Environment Variables**, click **Add variable**
3. Name: `OPENAI_API_KEY`
4. Value: Your OpenAI API key
5. Check **Encrypt** for security
6. Click **Save**

## Step 3: Update Your Frontend Code

1. Copy your deployed Worker URL (it will look like: `https://loreal-chatbot-api.your-subdomain.workers.dev`)
2. Open `script.js`
3. Find this line:
   ```javascript
   const CLOUDFLARE_WORKER_URL =
     "https://your-worker-name.your-subdomain.workers.dev";
   ```
4. Replace it with your actual Worker URL

## Step 4: Test Your Chatbot

1. Open `index.html` in your browser
2. Try asking a question like "What's the best L'Oréal moisturizer for dry skin?"
3. The chatbot should respond through your Cloudflare Worker

## Benefits of Using Cloudflare Worker

✅ **Security**: Your OpenAI API key is never exposed in the frontend code  
✅ **CORS Handling**: The Worker handles CORS automatically  
✅ **Rate Limiting**: You can add rate limiting at the Worker level  
✅ **Cost Control**: Monitor and control API usage server-side  
✅ **Free Tier**: Cloudflare offers 100,000 free requests per day

## Troubleshooting

- **CORS Errors**: Make sure your Worker includes the CORS headers (already included in RESOURCE_cloudflare-worker.js)
- **401 Errors**: Check that your OPENAI_API_KEY is correctly set in Cloudflare
- **Network Errors**: Verify your Worker URL is correct in script.js
