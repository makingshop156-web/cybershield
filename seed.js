// Run: npm run seed
// Seeds localStorage data into browser via console commands.
// Copy-paste the output into your browser DevTools console on the Cybershield site.

const base = {
  users: [
    {
      id: "u_demo_student",
      email: "hocvien@demo.local",
      displayName: "Học viên Demo",
      password: "demo123",
      role: "USER",
    },
    {
      id: "u_demo_admin",
      email: "admin@demo.local",
      displayName: "Admin Demo",
      password: "demo123",
      role: "ADMIN",
    },
  ],
  progress: {
    completedLessons: [
      "lesson-1-1","lesson-1-2","lesson-1-3","lesson-1-4","lesson-1-5",
      "lesson-2-1","lesson-2-2","lesson-2-3","lesson-2-4","lesson-2-5","lesson-2-6",
      "lesson-3-1","lesson-3-2","lesson-3-3","lesson-3-4","lesson-3-5","lesson-3-6",
      "lesson-4-1","lesson-4-2","lesson-4-3","lesson-4-4",
    ],
    streak: 12,
    lastStudyDate: new Date().toISOString().slice(0, 10),
    badges: ["first_lesson", "speedrun", "week_streak", "module_1", "module_2"],
  },
  elo: 1420,
  social: {
    facebookUrl: "https://facebook.com/cybershield",
    tiktokUrl: "https://tiktok.com/@cybershield",
  },
  portfolioPublic: true,
  certs: [
    { recipientName: "Học viên Demo", courseName: "Khóa học Cơ bản về Bảo mật CyberShield", issueDate: new Date(Date.now() - 30*86400000).toISOString(), hashId: "CYB-DEMO-1", score: 9, total: 10 },
    { recipientName: "Học viên Demo", courseName: "SQL Injection Chuyên sâu Thực Chiến", issueDate: new Date(Date.now() - 60*86400000).toISOString(), hashId: "CYB-DEMO-2", score: 8, total: 10 },
    { recipientName: "Học viên Demo", courseName: "Penetration Testing Web Application", issueDate: new Date(Date.now() - 90*86400000).toISOString(), hashId: "CYB-DEMO-3", score: 10, total: 10 },
  ],
  heatmap: {},
};

for (let i = 0; i < 30; i++) {
  const d = new Date();
  d.setDate(d.getDate() - i);
  base.heatmap[d.toISOString().slice(0, 10)] = Math.floor(Math.random() * 5) + 1;
}

console.log("// === Cybershield Seed Data ===");
console.log("// Paste each line into browser DevTools console on the Cybershield site");
console.log("");
console.log(`localStorage.setItem('cybershield-users', ${JSON.stringify(JSON.stringify(base.users))});`);
console.log(`localStorage.setItem('cybershield_progress_v2', ${JSON.stringify(JSON.stringify(base.progress))});`);
console.log(`localStorage.setItem('cybershield-elo', ${JSON.stringify(JSON.stringify(base.elo))});`);
console.log(`localStorage.setItem('cybershield-social-links', ${JSON.stringify(JSON.stringify(base.social))});`);
console.log(`localStorage.setItem('cybershield-portfolio-public', ${JSON.stringify(JSON.stringify(base.portfolioPublic))});`);
console.log(`localStorage.setItem('cybershield-heatmap', ${JSON.stringify(JSON.stringify(base.heatmap))});`);
base.certs.forEach((c, i) => {
  console.log(`localStorage.setItem('cybershield-cert-${i + 1}', ${JSON.stringify(JSON.stringify(c))});`);
});
console.log("");
console.log("// Then login:");
console.log("// Email: hocvien@demo.local / Password: demo123");
console.log("// or Email: admin@demo.local / Password: demo123");
