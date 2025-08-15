
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Set port and verify_token
const port = process.env.PORT;
const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;


// Route for GET requests
app.get('/webhooks', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log("Webhook verified");
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// Route for POST requests
// app.post('/', (req, res) => {
//   const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
//   console.log(`\n\nWebhook received ${timestamp}\n`);
//   console.log(JSON.stringify(req.body, null, 2));
//   res.status(200).end();
// });

app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === "whatsapp_business_account") {
    body.entry.forEach(entry => {
      entry.changes.forEach(change => {
        const value = change.value;

        // 1. Incoming Messages
        if (value.messages) {
          value.messages.forEach(message => {
            console.log("Incoming message from:", message.from);
            console.log("Message ID:", message.id);
            console.log("Type:", message.type);
            if (message.text) {
              console.log("Text:", message.text.body);
            }
          });
        }

        // 2. Status Updates
        if (value.statuses) {
          value.statuses.forEach(statusObj => {
            const status = statusObj.status;
            console.log(`📡 Status update: ${status} for ${statusObj.recipient_id}`);

            if (status === "delivered") {
              console.log("Message delivered");
            } else if (status === "read") {
              console.log("Message read");
            } else if (status === "failed") {
              console.log("Message failed", statusObj.errors || "");
            }

            // 3. Template Message Detection
            if (statusObj.conversation?.origin?.type === "template") {
              console.log("📜 This is a template message status update");
            }
          });
        }
      });
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});


// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});




































// // require('dotenv').config();
// const express = require("express");
// const PORT = process.env.PORT || 3000;
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.json());

// // Your verify token (set this in Meta dashboard too)
// const VERIFY_TOKEN = "my_custom_verify_token";

// // 1. Verification endpoint
// app.get('/webhooks', (req, res) => {
//     const mode = req.query['hub.mode'];
//     const token = req.query['hub.verify_token'];
//     const challenge = req.query['hub.challenge'];

//     if (mode && token) {
//         if (mode === 'subscribe' && token === VERIFY_TOKEN) {
//             console.log("✅ Webhook verified");
//             res.status(200).send(challenge);
//         } else {
//             res.sendStatus(403);
//         }
//     }
// });

// // 2. Event Notification endpoint
// app.post('/webhooks', (req, res) => {
//     console.log("📩 Webhook Event Received:", JSON.stringify(req.body, null, 2));
//     res.sendStatus(200); // Respond quickly so Meta knows we received it
// });

// app.listen(3000, () => console.log("🚀 Server running on port 3000"));

