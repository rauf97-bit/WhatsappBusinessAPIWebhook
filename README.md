# WhatsappBusinessAPIWebhook

# WhatsappBusinessAPIWebhook

This project implements a webhook server for the **WhatsApp Business Cloud API**.  
It handles **incoming messages** and **status updates** from WhatsApp, processes them, and can respond with automated or custom replies.

## Features
- **Webhook verification** for WhatsApp API
- **Message reception** for text, media, and interactive messages
- **Status updates** for delivery and read receipts
- Easily extensible for integrating with databases, CRMs, or analytics tools

## Tech Stack
- **Node.js** (Express.js) for server handling
- **WhatsApp Business Cloud API** for messaging
- **dotenv** for environment configuration

## Usage
1. Clone the repository.
2. Install dependencies:
   npm install
3. Create a .env file with your:
  VERIFY_TOKEN
  ACCESS_TOKEN
4. Run locally:
  npm start
