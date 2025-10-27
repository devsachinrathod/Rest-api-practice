const express = require("express");
const http = require("http");
const path = require("path");
const { WebSocketServer } = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static(path.join(__dirname, "public")));

const players = new Map(); // id -> {x, y, color, score, isTagger, lastSeen}

// Broadcast to all
function broadcast(data) {
    const msg = JSON.stringify(data);
    for (const client of wss.clients) {
        if (client.readyState === 1) client.send(msg);
    }
}

function broadcastWorld() {
    const payload = {
        type: "world",
        players: Array.from(players.entries()).map(([id, p]) => ({
            id,
            x: p.x,
            y: p.y,
            color: p.color,
            score: p.score,
            isTagger: p.isTagger
        })),
    };
    broadcast(payload);
}

// Handle connections
wss.on("connection", (ws) => {
    const id = Math.random().toString(36).slice(2, 9);
    const spawn = { x: Math.random() * 900 + 50, y: Math.random() * 400 + 50 };
    const color = `hsl(${Math.random() * 360}, 70%, 55%)`;
    const isTagger = players.size === 0; // first player = tagger
    players.set(id, { ...spawn, color, score: 0, isTagger, lastSeen: Date.now() });

    ws.send(JSON.stringify({ type: "welcome", id }));

    ws.on("message", (data) => {
        let msg;
        try { msg = JSON.parse(data); } catch { return; }

        const p = players.get(id);
        if (!p) return;

        if (msg.type === "move") {
            p.x += msg.dx || 0;
            p.y += msg.dy || 0;
            p.x = Math.max(0, Math.min(1000, p.x));
            p.y = Math.max(0, Math.min(1000, p.y));
            p.lastSeen = Date.now();

            // check collisions
            for (const [oid, other] of players.entries()) {
                if (oid === id) continue;
                const dx = p.x - other.x;
                const dy = p.y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 30) {
                    // Tag mode logic
                    if (p.isTagger && !other.isTagger) {
                        p.score += 1;
                        p.isTagger = false;
                        other.isTagger = true;
                        broadcast({ type: "tag", tagger: oid });
                    }
                }
            }
        }

        if (msg.type === "chat") {
            broadcast({ type: "chat", from: id, text: msg.text });
        }
    });

    ws.on("close", () => {
        players.delete(id);
        broadcastWorld();
    });

    broadcastWorld();
});

// periodic updates
setInterval(broadcastWorld, 1000 / 10);

const PORT = 3000;
server.listen(PORT, () => console.log(`🟢 Server running on http://localhost:${PORT}`));
