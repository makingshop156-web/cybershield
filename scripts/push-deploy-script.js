const https = require("https");
const fs = require("fs");
const path = require("path");

const TOKEN = process.env.GITHUB_TOKEN || "";
const FILE = path.resolve(__dirname, "..", "deploy-vercel.bat");
const CONTENT = fs.readFileSync(FILE, "utf-8");

const data = JSON.stringify({
  message: "Add Vercel one-click deploy script",
  content: Buffer.from(CONTENT, "utf-8").toString("base64"),
});

const req = https.request(
  {
    hostname: "api.github.com",
    path: "/repos/makingshop156-web/cybershield/contents/deploy-vercel.bat",
    method: "PUT",
    headers: {
      "User-Agent": "cybershield-deploy",
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  },
  (res) => {
    let body = "";
    res.on("data", (c) => (body += c));
    res.on("end", () => {
      if (res.statusCode === 201 || res.statusCode === 200) {
        console.log("✅ deploy-vercel.bat pushed to GitHub");
      } else {
        console.log(`⚠️  HTTP ${res.statusCode}: ${body}`);
      }
    });
  }
);

req.on("error", (err) => console.error("❌", err.message));
req.write(data);
req.end();
