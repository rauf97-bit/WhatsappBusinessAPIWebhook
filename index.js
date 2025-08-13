// require('dotenv').config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Your verify token (set this in Meta dashboard too)
const VERIFY_TOKEN = "my_custom_verify_token";

// 1. Verification endpoint
app.get('/webhooks', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log("✅ Webhook verified");
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// 2. Event Notification endpoint
app.post('/webhooks', (req, res) => {
    console.log("📩 Webhook Event Received:", JSON.stringify(req.body, null, 2));
    res.sendStatus(200); // Respond quickly so Meta knows we received it
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));



// app.use(express.json());

// app.post("/webhook", (req, res) => {
//     //console.log("📩 Webhook received:", JSON.stringify(req.body, null, 2));

//     const entry = req.body.entry?.[0];
//     if (entry) {
//         const changes = entry.changes?.[0]?.value;
//         if (changes?.statuses) {
//             changes.statuses.forEach(status => {
//                 console.log(`📌 Message ID: ${status.id} - Status: ${status.status}`);
//             });
//         }
//     }

//     res.sendStatus(200);
// });

// app.listen(PORT, () => console.log("🚀 Webhook running on http://localhost:3000"));
