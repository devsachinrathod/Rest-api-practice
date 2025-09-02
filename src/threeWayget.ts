import express from "express";
import type { Request, Response } from "express";
import * as fs from "fs";
import path from "path";

const app = express();
const port = 4000;

app.get("/create-file", (req: Request, res: Response) => {
  try {
    // Build absolute path to Desktop
    const desktopPath = path.join(
      process.env.HOMEPATH || "C:\\Users\\ADMIN\Desktop\sachin.txt"
    );

    fs.writeFileSync(desktopPath, "Hello from Express + TypeScript!");

    res.send(`✅ File created at: ${desktopPath}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error creating file.");
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
