const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { WebSocketServer } = require("ws");
const http = require("http");
const mongoose = require("mongoose");

const app = express();
const jwtSecret = "Echan@12";
const PORT = 3000;

// ✅ Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/chatApp")
  .then(() => console.log("🗄️ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Chat schema
const chatSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatSchema);

app.use(express.json());

// ✅ Zod validation
const userSchema = zod.object({
  username: zod.string().min(3),
  age: zod.number().min(3),
});

// ✅ POST: Create token
app.post("/data", async (req, res) => {
  const data = req.body;
  const parsed = userSchema.safeParse(data);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors });
  }

  const token = jwt.sign(parsed.data, jwtSecret);
  console.log("🪪 Token created:", token);
  res.json({ token });
});

// ✅ GET: Verify token
app.get("/data", (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.json({ decoded });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

// ✅ Create HTTP + WebSocket Server
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// ✅ WebSocket logic
wss.on("connection", async (ws) => {
  console.log("🟢 User connected");

  // Send existing chat history
  const history = await Chat.find().sort({ timestamp: 1 });
  ws.send(JSON.stringify({ type: "history", data: history }));

  ws.on("message", async (data) => {
    try {
      const { username, message } = JSON.parse(data);
      console.log(`💬 ${username}: ${message}`);

      // Save to MongoDB
      const newChat = await Chat.create({ username, message });

      // Broadcast message to all clients
      const chatMsg = JSON.stringify({ type: "chat", data: newChat });
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) client.send(chatMsg);
      });
    } catch (err) {
      console.error("⚠️ Invalid message format:", err);
    }
  });

  ws.on("close", () => console.log("🔴 User disconnected"));
});

// ✅ Start server
server.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
