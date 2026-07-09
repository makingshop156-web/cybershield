"use client";
import { useEffect, useRef, useCallback } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { SearchAddon } from "@xterm/addon-search";
import "@xterm/xterm/css/xterm.css";
import { createShellState, executeCommand, type ShellState } from "./shell";
import { cn } from "@/lib/utils";

export function RealTerminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const shellRef = useRef<ShellState>(createShellState());
  const inputBufferRef = useRef<string>("");
  const fitAddonRef = useRef<FitAddon | null>(null);

  const prompt = useCallback(() => {
    const term = terminalRef.current;
    if (!term) return;
    const s = shellRef.current;
    const who = s.isRoot ? "root" : s.user;
    const cwd = s.cwd === "/root" ? "~" : s.cwd.replace("/home/" + s.user, "~");
    term.write(`\r\n\x1b[1;32m${who}@${s.hostname}\x1b[0m:\x1b[1;34m${cwd}\x1b[0m${s.isRoot ? "# " : "$ "}`);
  }, []);

  const handleCommand = useCallback((input: string) => {
    const term = terminalRef.current;
    if (!term) return;

    const result = executeCommand(input, shellRef.current);
    shellRef.current = result.state;

    if (result.output.length === 0) {
      prompt();
      return;
    }

    if (result.output[0] === "__CLEAR__") {
      term.reset();
      prompt();
      return;
    }

    if (result.output.length === 1 && result.output[0] === "") {
      prompt();
      return;
    }

    let i = 0;
    const writeNext = () => {
      if (i >= result.output.length) {
        prompt();
        return;
      }
      const line = result.output[i] ?? "";
      term.writeln(line);
      i++;
      setTimeout(writeNext, 8);
    };
    writeNext();
  }, [prompt]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: "block",
      fontSize: 13,
      fontFamily: "'var(--font-fira-code)', 'JetBrains Mono', 'Fira Code', monospace",
      lineHeight: 1.5,
      letterSpacing: 0,
      theme: {
        background: "#050505",
        foreground: "#e2e8f0",
        cursor: "#22d3ee",
        cursorAccent: "#050505",
        selectionBackground: "rgba(34, 211, 238, 0.3)",
        black: "#1e293b",
        red: "#ef4444",
        green: "#22c55e",
        yellow: "#f59e0b",
        blue: "#3b82f6",
        magenta: "#a855f7",
        cyan: "#22d3ee",
        white: "#e2e8f0",
        brightBlack: "#475569",
        brightRed: "#f87171",
        brightGreen: "#4ade80",
        brightYellow: "#fbbf24",
        brightBlue: "#60a5fa",
        brightMagenta: "#c084fc",
        brightCyan: "#67e8f9",
        brightWhite: "#f8fafc",
      },
      allowTransparency: false,
      scrollback: 5000,
      allowProposedApi: true,
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();
    const searchAddon = new SearchAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    term.loadAddon(searchAddon);

    term.open(container);
    fitAddon.fit();

    fitAddonRef.current = fitAddon;
    terminalRef.current = term;

    // Welcome message
    const s = shellRef.current;
    term.writeln("\x1b[1;36m╔════════════════════════════════════════╗\x1b[0m");
    term.writeln("\x1b[1;36m║   CyberShield Interactive Terminal    ║\x1b[0m");
    term.writeln("\x1b[1;36m║     Type 'help' for available commands ║\x1b[0m");
    term.writeln("\x1b[1;36m╚════════════════════════════════════════╝\x1b[0m");
    term.writeln("");

    // Write initial prompt
    const who = s.isRoot ? "root" : s.user;
    const cwd = s.cwd === "/root" ? "~" : s.cwd.replace("/home/" + s.user, "~");
    term.write(`\x1b[1;32m${who}@${s.hostname}\x1b[0m:\x1b[1;34m${cwd}\x1b[0m${s.isRoot ? "# " : "$ "}`);

    let currentInput = "";

    term.onKey((e) => {
      const ev = e.domEvent;

      if (ev.key === "Enter") {
        term.write("\r\n");
        const cmd = currentInput.trim();
        currentInput = "";
        inputBufferRef.current = "";
        if (cmd) {
          handleCommand(cmd);
        } else {
          prompt();
        }
        return;
      }

      if (ev.key === "Backspace") {
        if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          term.write("\b \b");
        }
        return;
      }

      if (ev.ctrlKey && ev.key === "c") {
        term.write("^C\r\n");
        currentInput = "";
        inputBufferRef.current = "";
        prompt();
        return;
      }

      if (ev.ctrlKey && ev.key === "l") {
        term.reset();
        currentInput = "";
        inputBufferRef.current = "";
        prompt();
        return;
      }

      if (ev.key === "Tab") {
        // Simple tab completion
        const parts = currentInput.split(/\s+/);
        const lastPart = parts[parts.length - 1] ?? "";
        const allCmds = ["ls","cat","cd","pwd","echo","clear","whoami","id","uname","date","mkdir","touch","rm","cp","mv","chmod","chown","head","tail","wc","grep","ps","find","sort","ping","netstat","ifconfig","nmap","tcpdump","curl","wget","ssh","python3","gcc","sudo","help"];
        const matches = allCmds.filter((c) => c.startsWith(lastPart));
        if (matches.length === 1) {
          const rest = matches[0]!.slice(lastPart.length);
          currentInput += rest;
          term.write(rest);
        } else if (matches.length > 1) {
          term.write("\r\n");
          term.writeln(matches.join("  "));
          const s2 = shellRef.current;
          const w = s2.isRoot ? "root" : s2.user;
          const cd2 = s2.cwd === "/root" ? "~" : s2.cwd.replace("/home/" + s2.user, "~");
          term.write(`\x1b[1;32m${w}@${s2.hostname}\x1b[0m:\x1b[1;34m${cd2}\x1b[0m${s2.isRoot ? "# " : "$ "}`);
          term.write(currentInput);
        }
        return;
      }

      // Printable characters
      if (!ev.ctrlKey && !ev.altKey && !ev.metaKey && ev.key.length === 1) {
        currentInput += ev.key;
        term.write(ev.key);
      }
    });

    // Handle resize
    const handleResize = () => {
      try { fitAddon.fit(); } catch {}
    };
    window.addEventListener("resize", handleResize);

    // ResizeObserver for container resize
    const resizeObserver = new ResizeObserver(() => {
      try { fitAddon.fit(); } catch {}
    });
    resizeObserver.observe(container);

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      term.dispose();
    };
  }, [handleCommand, prompt]);

  return (
    <div className="w-full">
      <div className="bg-black/90 rounded-xl border border-glass-border overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 glass border-b border-glass-border">
          <span className="w-2.5 h-2.5 rounded-full bg-cyber-red" />
          <span className="w-2.5 h-2.5 rounded-full bg-cyber-gold" />
          <span className="w-2.5 h-2.5 rounded-full bg-cyber-green" />
          <span className="text-xs text-cyber-muted ml-2 font-mono">
            learner@cybershield: Interactive Terminal
          </span>
        </div>
        <div
          ref={containerRef}
          className={cn(
            "w-full h-[460px] overflow-hidden p-1",
            "[&_.xterm]:h-full [&_.xterm-viewport]:scrollbar-thin"
          )}
        />
      </div>
      <div className="mt-3 text-xs text-cyber-muted leading-relaxed glass rounded-lg p-3">
        <strong className="text-cyber-accent">💡 Terminal thật:</strong> Gõ <code className="text-cyber-green">help</code> để xem danh sách lệnh.
        Dùng <code className="text-cyber-green">sudo -i</code> để thành root. Tìm flag trong hệ thống!
        Có virtual filesystem với các file ẩn chứa flag để luyện tập.
      </div>
    </div>
  );
}
