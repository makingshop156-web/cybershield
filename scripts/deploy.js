/**
 * CyberShield — Deploy to GitHub + Vercel
 * 
 * Usage: node scripts/deploy.js
 * 
 * Prerequisites:
 *   1. Set GITHUB_TOKEN env var with your GitHub personal access token
 *   2. Or pass as argument: node scripts/deploy.js YOUR_GITHUB_TOKEN
 * 
 * This script will:
 *   - Create a GitHub repo (cybershield)
 *   - Push all local files to the repo using GitHub API
 *   - Print instructions for connecting to Vercel
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const GITHUB_TOKEN = process.argv[2] || process.env.GITHUB_TOKEN || "";
const REPO_NAME = "cybershield";
const REPO_DESC = "CyberShield — Nền tảng học Cybersecurity Zero to Hero";

const ROOT = path.resolve(__dirname, "..");

// Files to exclude from deployment
const EXCLUDE = new Set([
  "node_modules",
  ".next",
  ".vercel",
  ".git",
  "scripts",
  "package-lock.json",
]);

async function api(method, endpoint, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path: endpoint,
      method,
      headers: {
        "User-Agent": "cybershield-deploy",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function createRepo() {
  console.log(`\n📦 Creating GitHub repository: ${REPO_NAME}...`);
  
  const result = await api("POST", "/user/repos", {
    name: REPO_NAME,
    description: REPO_DESC,
    private: false,
    auto_init: false,
  });

  if (result.status === 201) {
    console.log(`✅ Repo created: ${result.data.html_url}`);
    return result.data;
  }
  
  if (result.status === 422 && result.data?.errors?.[0]?.message?.includes("already exists")) {
    console.log(`ℹ️  Repo already exists, fetching info...`);
    const getResult = await api("GET", `/repos/${result.data?.owner?.login || (await api("GET", "/user")).data?.login}/${REPO_NAME}`);
    return getResult.data;
  }

  console.error(`❌ Failed to create repo:`, result.data);
  process.exit(1);
}

async function getFileList(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT, fullPath).replace(/\\/g, "/");
    const topDir = relPath.split("/")[0];

    if (EXCLUDE.has(topDir) || EXCLUDE.has(entry.name)) continue;
    if (entry.name.startsWith(".")) continue;

    if (entry.isDirectory()) {
      files.push(...(await getFileList(fullPath)));
    } else {
      const content = fs.readFileSync(fullPath, "utf-8");
      files.push({ path: relPath, content });
    }
  }

  return files;
}

async function fileExists(owner, repo, filePath) {
  const result = await api("GET", `/repos/${owner}/${repo}/contents/${filePath}`);
  return result.status === 200 ? result.data : null;
}

async function pushFiles(owner, repo) {
  console.log(`\n📤 Uploading files to GitHub...`);
  
  const files = await getFileList(ROOT);
  console.log(`   Found ${files.length} files to upload`);

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    try {
      const base64Content = Buffer.from(file.content, "utf-8").toString("base64");
      
      const result = await api("PUT", `/repos/${owner}/${repo}/contents/${file.path}`, {
        message: `Add ${file.path}`,
        content: base64Content,
      });

      if (result.status === 201) {
        success++;
      } else if (result.status === 422) {
        // File already exists - skip
        skipped++;
      } else {
        console.warn(`   ⚠️  ${file.path}: HTTP ${result.status}`);
        failed++;
      }
    } catch (err) {
      console.warn(`   ⚠️  ${file.path}: ${err.message}`);
      failed++;
    }

    // Rate limiting: small delay between files
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n📊 Results: ${success} uploaded, ${skipped} skipped, ${failed} failed`);
  return { success, skipped, failed };
}

async function main() {
  console.log("╔══════════════════════════════════════╗");
  console.log("║  CyberShield — Auto Deploy Script    ║");
  console.log("╚══════════════════════════════════════╝");

  const user = (await api("GET", "/user")).data;
  if (!user?.login) {
    console.error("❌ Invalid GitHub token or API error");
    process.exit(1);
  }
  console.log(`\n👤 Authenticated as: ${user.login}`);

  // Step 1: Create repo
  const repo = await createRepo();
  const owner = repo.owner?.login || user.login;
  const repoFull = repo.full_name || `${owner}/${REPO_NAME}`;

  // Step 2: Push files
  await pushFiles(owner, REPO_NAME);

  // Step 3: Print next steps
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║  ✅ DEPLOYMENT COMPLETE                                ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log(`\n📎 GitHub: https://github.com/${repoFull}`);
  console.log(`\n🚀 To deploy on Vercel:`);
  console.log(`   1. Go to https://vercel.com/import`);
  console.log(`   2. Import the repo: ${repoFull}`);
  console.log(`   3. Add Environment Variables:`);
  console.log(`      - NEXT_PUBLIC_SUPABASE_URL (from Supabase)`);
  console.log(`      - NEXT_PUBLIC_SUPABASE_ANON_KEY (from Supabase)`);
  console.log(`   4. Click "Deploy"`);
  console.log(`\n🎯 Or use Vercel CLI:`);
  console.log(`   npx vercel --cwd "${ROOT}" --prod`);

  // Try Vercel deploy automatically
  console.log(`\n🔄 Attempting automatic Vercel deploy...`);
  const { execSync } = require("child_process");
  try {
    execSync(`npx vercel --cwd "${ROOT}" --prod --non-interactive --yes`, {
      stdio: "inherit",
      timeout: 120000,
    });
  } catch (err) {
    console.log(`\nℹ️  Automatic Vercel deploy requires interactive login.`);
    console.log(`   Run the following command manually:`);
    console.log(`   cd "${ROOT}" && npx vercel`);
  }
}

main().catch(console.error);
