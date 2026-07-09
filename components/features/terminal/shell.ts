import { VfsTree, VfsNode, resolvePath, getNode, dirname, basename, cloneFs, VIRTUAL_FS } from "./virtual-fs";
import { sanitizeTerminalInput } from "@/lib/security/sanitize";
import { checkRateLimit } from "@/lib/security/rate-limit";

export interface ShellState {
  cwd: string;
  user: string;
  hostname: string;
  fs: VfsTree;
  isRoot: boolean;
  history: string[];
}

export function createShellState(): ShellState {
  return {
    cwd: "/home/learner",
    user: "learner",
    hostname: "cybershield",
    fs: cloneFs(VIRTUAL_FS),
    isRoot: false,
    history: [],
  };
}

export interface CommandResult {
  output: string[];
  state: ShellState;
  error?: string;
}

const MOCK_COMMANDS: Record<string, (args: string[], state: ShellState) => string[]> = {
  ping: () => [
    "PING google.com (142.250.1.1) 56(84) bytes of data.",
    "64 bytes from 142.250.1.1: icmp_seq=1 ttl=117 time=14.2 ms",
    "64 bytes from 142.250.1.1: icmp_seq=2 ttl=117 time=13.8 ms",
    "64 bytes from 142.250.1.1: icmp_seq=3 ttl=117 time=15.1 ms",
    "64 bytes from 142.250.1.1: icmp_seq=4 ttl=117 time=13.5 ms",
    "",
    "--- google.com ping statistics ---",
    "4 packets transmitted, 4 received, 0% packet loss",
    "rtt min/avg/max/mdev = 13.500/14.150/15.100/0.653 ms",
  ],

  netstat: () => [
    "Active Internet connections (servers and established)",
    "Proto Recv-Q Send-Q Local Address           Foreign Address         State",
    "tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN",
    "tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN",
    "tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN",
    "tcp        0      0 10.0.0.2:22             10.0.0.5:54321          ESTABLISHED",
    "tcp        0      0 10.0.0.2:80             10.0.0.3:49201          TIME_WAIT",
    "tcp6       0      0 :::22                   :::*                    LISTEN",
    "tcp6       0      0 :::80                   :::*                    LISTEN",
  ],

  ifconfig: () => [
    "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500",
    "        inet 10.0.0.2  netmask 255.255.255.0  broadcast 10.0.0.255",
    "        inet6 fe80::216:3eff:fe00:1  prefixlen 64  scopeid 0x20<link>",
    "        ether 00:16:3e:00:00:01  txqueuelen 1000  (Ethernet)",
    "        RX packets 12347  bytes 15823901 (15.0 MB)",
    "        TX packets 8932  bytes 1042381 (1.0 MB)",
    "",
    "lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536",
    "        inet 127.0.0.1  netmask 255.0.0.0",
    "        inet6 ::1  prefixlen 128  scopeid 0x10<host>",
    "        loop  txqueuelen 1000  (Local Loopback)",
    "        RX packets 234  bytes 18763 (18.3 KB)",
    "        TX packets 234  bytes 18763 (18.3 KB)",
  ],

  nmap: () => [
    "Starting Nmap 7.94 (https://nmap.org)",
    "Nmap scan report for 10.0.0.1",
    "Host is up (0.0012s latency).",
    "",
    "PORT     STATE    SERVICE",
    "22/tcp   open     SSH",
    "80/tcp   open     HTTP",
    "443/tcp  open     HTTPS",
    "3306/tcp filtered MySQL",
    "8080/tcp open     HTTP-Proxy",
    "",
    "Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds",
  ],

  tcpdump: () => [
    "tcpdump: verbose output suppressed, use -v[v]... for full protocol decode",
    "listening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes",
    "",
    "07:15:23.123456 IP 10.0.0.5.54321 > 10.0.0.2.22: Flags [S], seq 123456789, win 64240",
    "07:15:23.123789 IP 10.0.0.2.22 > 10.0.0.5.54321: Flags [S.], seq 987654321, ack 123456790, win 65160",
    "07:15:23.124012 IP 10.0.0.5.54321 > 10.0.0.2.22: Flags [.], ack 1, win 64240",
    "07:15:23.124256 IP 10.0.0.5.54321 > 10.0.0.2.22: Flags [P.], seq 1:20, ack 1, win 64240",
    "07:15:23.124512 IP 10.0.0.2.22 > 10.0.0.5.54321: Flags [.], ack 20, win 65160",
    "",
    "5 packets captured",
    "5 packets received by filter",
    "0 packets dropped by kernel",
  ],

  curl: (args) => {
    const url = args.find((a) => !a.startsWith("-")) ?? "http://localhost";
    return [
      `Connecting to ${url}...`,
      `HTTP/1.1 200 OK`,
      `Server: nginx/1.24.0`,
      `Content-Type: text/html`,
      `Content-Length: 3124`,
      ``,
      `<!DOCTYPE html>`,
      `<html><head><title>CyberShield Lab</title></head>`,
      `<body><h1>Welcome to CyberShield Security Lab</h1></body></html>`,
    ];
  },

  wget: (args) => {
    const url = args.find((a) => !a.startsWith("-")) ?? "http://localhost";
    const file = url.split("/").pop() || "index.html";
    return [
      `--2026-07-09 07:20:00--  ${url}`,
      `Resolving ${new URL(url).hostname}... 142.250.1.1`,
      `Connecting to ${new URL(url).hostname}:80... connected.`,
      `HTTP request sent, awaiting response... 200 OK`,
      `Length: 3124 (3.0K) [text/html]`,
      `Saving to: '${file}'`,
      ``,
      `     0K ... 100% 12.3M=0s`,
      ``,
      `2026-07-09 07:20:00 (12.3 MB/s) - '${file}' saved [3124/3124]`,
    ];
  },

  ssh: (args) => {
    const target = args.find((a) => !a.startsWith("-")) ?? "localhost";
    return [
      `Connecting to ${target}...`,
      `The authenticity of host '${target}' can't be established.`,
      `ED25519 key fingerprint is SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.`,
      `Are you sure you want to continue connecting (yes/no/[fingerprint])? yes`,
      `Warning: Permanently added '${target}' (ED25519) to the list of known hosts.`,
      `learner@${target}'s password:`,
      ``,
      `Linux cybershield-lab 6.1.0 #1 SMP PREEMPT_DYNAMIC x86_64`,
      ``,
      `Welcome to CyberShield Lab Environment!`,
      `Last login: Thu Jul  9 07:15:00 2026 from 10.0.0.2`,
    ];
  },

  python3: (args) => {
    if (args.length === 0) {
      return [
        "Python 3.11.5 (main, Sep 11 2025, 14:32:33) [GCC 12.2.0] on linux",
        'Type "help", "copyright", "credits" or "license" for more information.',
        ">>> ",
      ];
    }
    if (args[0] === "--version" || args[0] === "-V") {
      return ["Python 3.11.5"];
    }
    if (args[0] === "-c" && args.length > 1) {
      const code = args.slice(1).join(" ");
      try {
        const result = evalPython(code);
        return [result];
      } catch {
        return [`Traceback (most recent call last):`, `  File "<string>", line 1`, `Error during evaluation`];
      }
    }
    return [`python3: can't open file '${args[0]}': [Errno 2] No such file or directory`];
  },

  gcc: (args) => {
    if (args.length === 0) return ["gcc: fatal error: no input files"];
    const src = args.find((a) => !a.startsWith("-")) ?? "source.c";
    return [`gcc: ${src}: No such file or directory`];
  },

  help: () => [
    "CyberShield Lab — Available commands:",
    "  File ops:     ls, cat, cd, pwd, mkdir, touch, rm, cp, mv, find",
    "  View:         head, tail, wc, sort, grep, echo",
    "  System:       uname, whoami, id, date, clear, ps",
    "  Network:      ping, netstat, ifconfig, nmap, tcpdump, curl, wget, ssh",
    "  Programming:  python3, gcc",
    "  Permissions:  sudo, chmod, chown",
    "",
    "  Type any command and press Enter to execute.",
    "  Use 'sudo -i' to become root. Find the flags!",
  ],
};

function evalPython(code: string): string {
  const trimmed = code.trim();
  if (trimmed.startsWith("print(") && trimmed.endsWith(")")) {
    const inner = trimmed.slice(6, -1);
    const val = evalPythonExpr(inner);
    return String(val);
  }
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) return trimmed.slice(1, -1);
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) return trimmed.slice(1, -1);
  if (/^\d+$/.test(trimmed)) return trimmed;
  if (trimmed === "1+1") return "2";
  if (trimmed === "2+2") return "4";
  if (trimmed === "10*10") return "100";
  if (trimmed === "len('hello')") return "5";
  if (trimmed === "'hello'.upper()") return "HELLO";
  if (trimmed === "'SECURITY'.lower()") return "security";
  return trimmed;
}

function evalPythonExpr(expr: string): unknown {
  const t = expr.trim();
  if (/^\d+$/.test(t)) return parseInt(t, 10);
  if (t.startsWith('"') && t.endsWith('"')) return t.slice(1, -1);
  if (t.startsWith("'") && t.endsWith("'")) return t.slice(1, -1);
  return t;
}

export function executeCommand(input: string, state: ShellState): CommandResult {
  // Irony Guard: Sanitize input
  const sanitized = sanitizeTerminalInput(input);
  if (!sanitized.clean) {
    return { output: [`⛔ Irony Guard: ${sanitized.reason ?? "Từ chối"}`], state };
  }
  const safeInput = sanitized.sanitized || input;

  // Irony Guard: Rate limiting
  const rateCheck = checkRateLimit("terminal");
  if (!rateCheck.allowed) {
    return {
      output: [`⛔ Irony Guard: Quá nhiều yêu cầu. Vui lòng đợi ${Math.ceil(rateCheck.resetMs / 1000)}s`],
      state,
    };
  }

  const trimmed = safeInput.trim();
  if (!trimmed) return { output: [], state };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0]?.toLowerCase() ?? "";
  const args = parts.slice(1);

  const newState: ShellState = {
    ...state,
    history: [...state.history, input],
  };

  // Handle sudo
  if (cmd === "sudo") {
    if (args[0] === "-i" || args[0] === "-s") {
      newState.isRoot = true;
      newState.user = "root";
      newState.cwd = "/root";
      return { output: ["root@cybershield:~# "], state: newState };
    }
    if (args[0] === "-u" && args[1]) {
      newState.user = args[1];
      newState.cwd = `/home/${args[1]}`;
      return { output: [`Switched to user ${args[1]}`], state: newState };
    }
    // Run the rest as root
    if (args.length > 0) {
      return executeCommand(args.join(" "), { ...newState, isRoot: true });
    }
    return { output: ["usage: sudo -i (become root), sudo -u <user> <cmd>"], state: newState };
  }

  // Built-in commands
  if (cmd === "ls") return cmdLs(args, newState);
  if (cmd === "cat") return cmdCat(args, newState);
  if (cmd === "cd") return cmdCd(args, newState);
  if (cmd === "pwd") return { output: [newState.cwd], state: newState };
  if (cmd === "echo") return { output: [args.join(" ") || ""], state: newState };
  if (cmd === "clear") return { output: ["__CLEAR__"], state: newState };
  if (cmd === "whoami") return { output: [newState.user], state: newState };
  if (cmd === "id") return { output: [`uid=${newState.isRoot ? 0 : 1000}(${newState.user}) gid=${newState.isRoot ? 0 : 1000}(${newState.user}) groups=${newState.isRoot ? 0 : 1000}(${newState.user})`], state: newState };
  if (cmd === "uname") return { output: [args.includes("-a") ? "Linux cybershield-lab 6.1.0 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" : "Linux"], state: newState };
  if (cmd === "date") return { output: [new Date().toString()], state: newState };
  if (cmd === "mkdir") return cmdMkdir(args, newState);
  if (cmd === "touch") return cmdTouch(args, newState);
  if (cmd === "rm") return cmdRm(args, newState);
  if (cmd === "cp") return cmdCp(args, newState);
  if (cmd === "mv") return cmdMv(args, newState);
  if (cmd === "chmod") return { output: ["Permissions updated (simulated)"], state: newState };
  if (cmd === "chown") return { output: ["Owner changed (simulated)"], state: newState };
  if (cmd === "head") return cmdHead(args, newState);
  if (cmd === "tail") return cmdTail(args, newState);
  if (cmd === "wc") return cmdWc(args, newState);
  if (cmd === "grep") return cmdGrep(args, newState);
  if (cmd === "ps") return cmdPs(args, newState);
  if (cmd === "find") return cmdFind(args, newState);
  if (cmd === "sort") return cmdSort(args, newState);

  // Mock commands
  if (MOCK_COMMANDS[cmd]) {
    return { output: MOCK_COMMANDS[cmd](args, newState), state: newState };
  }

  return { output: [`bash: ${cmd}: command not found`], state: newState, error: `command not found: ${cmd}` };
}

function cmdLs(args: string[], state: ShellState): CommandResult {
  const target = args.find((a) => !a.startsWith("-")) ?? ".";
  const long = args.includes("-l") || args.includes("-la") || args.includes("-al");
  const all = args.includes("-a") || args.includes("-la") || args.includes("-al");
  const path = resolvePath(state.cwd, target, state.fs);
  const node = getNode(state.fs, path);

  if (!node || node.type !== "dir") {
    return { output: [`ls: cannot access '${target}': No such file or directory`], state };
  }

  const entries = node.children ? Object.entries(node.children) : [];
  const filtered = all ? entries : entries.filter(([name]) => !name.startsWith("."));

  if (filtered.length === 0) {
    return { output: long ? ["total 0"] : [""], state };
  }

  const result: string[] = [];
  if (long) {
    result.push(`total ${filtered.length}`);
    for (const [name, child] of filtered) {
      const perms = child.permissions ?? "rw-r--r--";
      const owner = child.owner ?? "learner";
      const size = child.type === "dir" ? 4096 : (child.content?.length ?? 0);
      const type = child.type === "dir" ? "d" : "-";
      result.push(`${type}${perms} 1 ${owner} ${owner} ${String(size).padStart(8)} Jul  9 07:15 ${name}`);
    }
  } else {
    result.push(filtered.map(([name]) => name).join("  "));
  }

  return { output: result, state };
}

function cmdCat(args: string[], state: ShellState): CommandResult {
  if (args.length === 0) return { output: [""], state };

  const path = resolvePath(state.cwd, args[0]!, state.fs);
  const node = getNode(state.fs, path);

  if (!node) return { output: [`cat: ${args[0]}: No such file or directory`], state };
  if (node.type === "dir") return { output: [`cat: ${args[0]}: Is a directory`], state };

  return { output: [node.content ?? ""], state };
}

function cmdCd(args: string[], state: ShellState): CommandResult {
  const target = args[0] ?? "/home/learner";
  const path = resolvePath(state.cwd, target, state.fs);
  const node = getNode(state.fs, path);

  if (!node || node.type !== "dir") {
    return { output: [`cd: ${target}: No such file or directory`], state };
  }

  return { output: [], state: { ...state, cwd: path } };
}

function cmdMkdir(args: string[], state: ShellState): CommandResult {
  if (args.length === 0) return { output: ["mkdir: missing operand"], state };

  const path = resolvePath(state.cwd, args[0]!, state.fs);
  const parent = getNode(state.fs, dirname(path));

  if (!parent || parent.type !== "dir") {
    return { output: [`mkdir: cannot create directory '${args[0]}': No such file or directory`], state };
  }

  const name = basename(path);
  if (parent.children?.[name]) {
    return { output: [`mkdir: cannot create directory '${args[0]}': File exists`], state };
  }

  if (parent.children) {
    parent.children[name] = { type: "dir", children: {}, permissions: "rwxr-xr-x", owner: state.user };
  }

  return { output: [], state };
}

function cmdTouch(args: string[], state: ShellState): CommandResult {
  if (args.length === 0) return { output: [], state };

  const path = resolvePath(state.cwd, args[0]!, state.fs);
  const parent = getNode(state.fs, dirname(path));

  if (!parent || parent.type !== "dir" || !parent.children) return { output: [], state };

  const name = basename(path);
  if (!parent.children[name]) {
    parent.children[name] = { type: "file", content: "", permissions: "rw-r--r--", owner: state.user };
  }

  return { output: [], state };
}

function cmdRm(args: string[], state: ShellState): CommandResult {
  if (args.length === 0) return { output: ["rm: missing operand"], state };

  const recursive = args.includes("-r") || args.includes("-rf");
  const force = args.includes("-f") || args.includes("-rf");
  const target = args.find((a) => !a.startsWith("-")) ?? "";

  const path = resolvePath(state.cwd, target, state.fs);
  const parent = getNode(state.fs, dirname(path));

  if (!parent || parent.type !== "dir" || !parent.children) {
    if (!force) return { output: [`rm: cannot remove '${target}': No such file or directory`], state };
    return { output: [], state };
  }

  const name = basename(path);
  const node = parent.children[name];

  if (!node) {
    if (!force) return { output: [`rm: cannot remove '${target}': No such file or directory`], state };
    return { output: [], state };
  }

  if (node.type === "dir" && !recursive) {
    return { output: [`rm: cannot remove '${target}': Is a directory`], state };
  }

  delete parent.children[name];
  return { output: [], state };
}

function cmdCp(args: string[], state: ShellState): CommandResult {
  if (args.length < 2) return { output: ["cp: missing file operand"], state };
  const srcPath = resolvePath(state.cwd, args[0]!, state.fs);
  const dstPath = resolvePath(state.cwd, args[1]!, state.fs);
  const src = getNode(state.fs, srcPath);
  if (!src) return { output: [`cp: cannot stat '${args[0]}': No such file or directory`], state };

  const dstParent = getNode(state.fs, dirname(dstPath));
  if (!dstParent || dstParent.type !== "dir" || !dstParent.children) {
    return { output: [`cp: cannot create regular file '${args[1]}': No such file or directory`], state };
  }
  dstParent.children[basename(dstPath)] = JSON.parse(JSON.stringify(src));
  return { output: [], state };
}

function cmdMv(args: string[], state: ShellState): CommandResult {
  if (args.length < 2) return { output: ["mv: missing file operand"], state };
  const srcPath = resolvePath(state.cwd, args[0]!, state.fs);
  const dstPath = resolvePath(state.cwd, args[1]!, state.fs);

  const srcParent = getNode(state.fs, dirname(srcPath));
  if (!srcParent || srcParent.type !== "dir" || !srcParent.children) {
    return { output: [`mv: cannot stat '${args[0]}': No such file or directory`], state };
  }
  const srcName = basename(srcPath);
  const srcNode = srcParent.children[srcName];
  if (!srcNode) return { output: [`mv: cannot stat '${args[0]}': No such file or directory`], state };

  const dstParent = getNode(state.fs, dirname(dstPath));
  if (!dstParent || dstParent.type !== "dir" || !dstParent.children) {
    return { output: [`mv: cannot move '${args[0]}' to '${args[1]}': No such file or directory`], state };
  }
  dstParent.children[basename(dstPath)] = srcNode;
  delete srcParent.children[srcName];
  return { output: [], state };
}

function cmdHead(args: string[], state: ShellState): CommandResult {
  const n = args.includes("-n") ? parseInt(args[args.indexOf("-n") + 1] ?? "10", 10) : 10;
  const target = args.find((a) => !a.startsWith("-")) ?? "";
  if (!target) return { output: [""], state };

  const path = resolvePath(state.cwd, target, state.fs);
  const node = getNode(state.fs, path);
  if (!node || node.type === "dir") return { output: [`head: ${target}: No such file or directory`], state };

  const lines = (node.content ?? "").split("\n").slice(0, n);
  return { output: lines.length ? lines : [""], state };
}

function cmdTail(args: string[], state: ShellState): CommandResult {
  const n = args.includes("-n") ? parseInt(args[args.indexOf("-n") + 1] ?? "10", 10) : 10;
  const target = args.find((a) => !a.startsWith("-")) ?? "";
  if (!target) return { output: [""], state };

  const path = resolvePath(state.cwd, target, state.fs);
  const node = getNode(state.fs, path);
  if (!node || node.type === "dir") return { output: [`tail: ${target}: No such file or directory`], state };

  const lines = (node.content ?? "").split("\n").slice(-n);
  return { output: lines.length ? lines : [""], state };
}

function cmdWc(args: string[], state: ShellState): CommandResult {
  const target = args.find((a) => !a.startsWith("-")) ?? "";
  if (!target) return { output: ["0 0 0"], state };

  const path = resolvePath(state.cwd, target, state.fs);
  const node = getNode(state.fs, path);
  if (!node || node.type === "dir") return { output: [`wc: ${target}: No such file or directory`], state };

  const content = node.content ?? "";
  const lines = content.split("\n").length;
  const words = content.split(/\s+/).filter(Boolean).length;
  const chars = content.length;
  return { output: [`${lines} ${words} ${chars} ${target}`], state };
}

function cmdGrep(args: string[], state: ShellState): CommandResult {
  const pattern = args.find((a) => !a.startsWith("-")) ?? "";
  const file = args.filter((a) => !a.startsWith("-") && a !== pattern).pop() ?? "";
  if (!file) return { output: [""], state };

  const path = resolvePath(state.cwd, file, state.fs);
  const node = getNode(state.fs, path);
  if (!node || node.type === "dir") return { output: [`grep: ${file}: No such file or directory`], state };

  const lines = (node.content ?? "").split("\n");
  const matching = lines.filter((l) => l.toLowerCase().includes(pattern.toLowerCase()));
  return { output: matching.length ? matching : [""], state };
}

function cmdPs(_args: string[], state: ShellState): CommandResult {
  return {
    output: [
      "  PID TTY          TIME CMD",
      "    1 ?        00:00:05 systemd",
      "  123 ?        00:00:01 sshd",
      "  456 ?        00:00:02 nginx",
      "  789 ?        00:00:00 bash",
      "  790 ?        00:00:00 ps",
    ],
    state,
  };
}

function cmdFind(args: string[], state: ShellState): CommandResult {
  const nameIdx = args.indexOf("-name");
  const pattern = nameIdx >= 0 ? args[nameIdx + 1] : null;
  const dir = args.find((a) => !a.startsWith("-") && a !== pattern) ?? ".";

  const path = resolvePath(state.cwd, dir, state.fs);
  const node = getNode(state.fs, path);
  if (!node || node.type !== "dir") return { output: [`find: '${dir}': No such file or directory`], state };

  const results: string[] = [];
  function walk(p: string, n: VfsNode) {
    if (!n.children) return;
    for (const [name, child] of Object.entries(n.children)) {
      const fullPath = p + "/" + name;
      if (!pattern || name.includes(pattern.replace(/\*/g, ""))) {
        results.push(fullPath);
      }
      if (child.type === "dir") walk(fullPath, child);
    }
  }
  walk(path, node);
  return { output: results.length ? results : [""], state };
}

function cmdSort(args: string[], state: ShellState): CommandResult {
  const target = args.find((a) => !a.startsWith("-")) ?? "";
  if (!target) return { output: [""], state };

  const path = resolvePath(state.cwd, target, state.fs);
  const node = getNode(state.fs, path);
  if (!node || node.type === "dir") return { output: [`sort: ${target}: No such file or directory`], state };

  const lines = (node.content ?? "").split("\n").filter(Boolean).sort();
  return { output: lines.length ? lines : [""], state };
}
