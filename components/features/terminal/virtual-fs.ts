/**
 * Virtual filesystem for the Real Terminal.
 * Simulates a Linux environment with security-relevant files.
 */

export interface VfsNode {
  type: "file" | "dir";
  content?: string;
  children?: Record<string, VfsNode>;
  permissions?: string;
  owner?: string;
}

export type VfsTree = Record<string, VfsNode>;

const DEFAULT_PERMS = "rw-r--r--";
const EXEC_PERMS = "rwxr-xr-x";
const ROOT = "root";

export const VIRTUAL_FS: VfsTree = {
  home: {
    type: "dir",
    permissions: EXEC_PERMS,
    owner: ROOT,
    children: {
      learner: {
        type: "dir",
        permissions: EXEC_PERMS,
        owner: "learner",
        children: {
          projects: {
            type: "dir",
            permissions: EXEC_PERMS,
            owner: "learner",
            children: {
              "scan-targets.txt": {
                type: "file",
                content: "# Scan targets for practice\n# Use only on authorized systems\n\ntestphp.vulnweb.com\nscanme.nmap.org\ntryhackme.com",
                permissions: DEFAULT_PERMS,
                owner: "learner",
              },
              "notes.md": {
                type: "file",
                content: "# CyberShield Learning Notes\n## Commands learned today\n- ping: check connectivity\n- nmap: port scanning\n- netstat: network status\n- wireshark/tcpdump: packet capture",
                permissions: DEFAULT_PERMS,
                owner: "learner",
              },
            },
          },
          ".bashrc": {
            type: "file",
            content: 'export PS1="\\[\\033[01;32m\\]learner@cybershield\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ "\nexport PATH=$PATH:/usr/local/bin\n\nalias ll="ls -la"\nalias la="ls -A"\nalias ..="cd .."',
            permissions: DEFAULT_PERMS,
            owner: "learner",
          },
          "secret.txt": {
            type: "file",
            content: "FLAG{learn_the_basics_first}",
            permissions: "rw-------",
            owner: "learner",
          },
        },
      },
    },
  },
  etc: {
    type: "dir",
    permissions: EXEC_PERMS,
    owner: ROOT,
    children: {
      passwd: {
        type: "file",
        content: "root:x:0:0:root:/root:/bin/bash\ndeamon:x:1:1:deamon:/usr/sbin:/usr/sbin/nologin\nlearner:x:1000:1000:learner:/home/learner:/bin/bash",
        permissions: DEFAULT_PERMS,
        owner: ROOT,
      },
      hostname: {
        type: "file",
        content: "cybershield-lab\n",
        permissions: DEFAULT_PERMS,
        owner: ROOT,
      },
      "issue.net": {
        type: "file",
        content: "CyberShield Security Lab v2.0\n",
        permissions: DEFAULT_PERMS,
        owner: ROOT,
      },
    },
  },
  var: {
    type: "dir",
    permissions: EXEC_PERMS,
    owner: ROOT,
    children: {
      log: {
        type: "dir",
        permissions: EXEC_PERMS,
        owner: ROOT,
        children: {
          "auth.log": {
            type: "file",
            content: "Jul  9 07:15:23 cybershield sshd[1234]: Failed password for root from 10.0.0.5 port 54321 ssh2\nJul  9 07:15:25 cybershield sshd[1234]: Failed password for root from 10.0.0.5 port 54322 ssh2\nJul  9 07:15:27 cybershield sshd[1234]: Failed password for root from 10.0.0.5 port 54323 ssh2\nJul  9 07:15:29 cybershield sshd[1234]: Connection closed by authenticating user root 10.0.0.5 port 54324 [preauth]\nJul  9 07:16:01 cybershield CRON[1235]: pam_unix(cron:session): session opened for user learner\n--- Brute-force attack detected from 10.0.0.5 ---",
            permissions: "rw-r-----",
            owner: ROOT,
          },
          "syslog": {
            type: "file",
            content: "Jul  9 07:10:00 cybershield kernel: [    0.000000] Linux version 6.1.0-cybershield\nJul  9 07:10:01 cybershield systemd[1]: Starting CyberShield Lab Environment...\nJul  9 07:10:05 cybershield systemd[1]: Ready.\nJul  9 07:14:30 cybershield nmap[1233]: Scan from 10.0.0.3: ports 22,80,443 detected",
            permissions: "rw-r-----",
            owner: ROOT,
          },
        },
      },
    },
  },
  tmp: {
    type: "dir",
    permissions: "rwxrwxrwt",
    owner: ROOT,
    children: {},
  },
  root: {
    type: "dir",
    permissions: "rwx------",
    owner: ROOT,
    children: {
      "flag.txt": {
        type: "file",
        content: "╔══════════════════════════════════╗\n║  FLAG{you_found_the_root_flag}    ║\n║  Congratz! You are a true hacker! ║\n╚══════════════════════════════════╝\n",
        permissions: "rw-------",
        owner: ROOT,
      },
    },
  },
  usr: {
    type: "dir",
    permissions: EXEC_PERMS,
    owner: ROOT,
    children: {
      bin: {
        type: "dir",
        permissions: EXEC_PERMS,
        owner: ROOT,
        children: {},
      },
      local: {
        type: "dir",
        permissions: EXEC_PERMS,
        owner: ROOT,
        children: {
          bin: {
            type: "dir",
            permissions: EXEC_PERMS,
            owner: ROOT,
            children: {},
          },
        },
      },
    },
  },
  bin: {
    type: "dir",
    permissions: EXEC_PERMS,
    owner: ROOT,
    children: {
      ls: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      cat: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      cd: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      pwd: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      echo: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      grep: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      head: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      tail: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      wc: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      sort: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      uname: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      whoami: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      id: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      date: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      clear: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      ping: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      netstat: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      ifconfig: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      ps: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      nmap: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      tcpdump: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      curl: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      wget: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      ssh: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      python3: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      gcc: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      sudo: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      chmod: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      chown: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      mkdir: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      touch: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      rm: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      cp: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      mv: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      find: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
      help: { type: "file", content: "", permissions: EXEC_PERMS, owner: ROOT },
    },
  },
};

export function cloneFs(tree: VfsTree): VfsTree {
  return JSON.parse(JSON.stringify(tree));
}

export function resolvePath(cwd: string, raw: string, fs: VfsTree): string {
  if (raw.startsWith("/")) return normalizePath(raw);
  return normalizePath(cwd + "/" + raw);
}

function normalizePath(p: string): string {
  const parts = p.split("/").filter(Boolean);
  const resolved: string[] = [];
  for (const part of parts) {
    if (part === ".") continue;
    if (part === "..") { resolved.pop(); continue; }
    resolved.push(part);
  }
  return "/" + resolved.join("/");
}

export function getNode(fs: VfsTree, path: string): VfsNode | null {
  if (path === "/") return { type: "dir", children: fs, permissions: "rwxr-xr-x", owner: "root" };
  const parts = path.split("/").filter(Boolean);
  let current: VfsNode | undefined = { type: "dir", children: fs };
  for (const part of parts) {
    if (!current || current.type !== "dir" || !current.children) return null;
    current = current.children[part];
  }
  return current ?? null;
}

export function dirname(path: string): string {
  const parts = path.split("/").filter(Boolean);
  parts.pop();
  return "/" + parts.join("/") || "/";
}

export function basename(path: string): string {
  return path.split("/").filter(Boolean).pop() ?? "";
}
