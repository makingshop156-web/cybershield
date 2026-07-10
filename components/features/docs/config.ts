// Modular docs layout — easy to toggle via feature flags
export const DOCS_ENABLED = true;

export interface DocSection {
  id: string;
  label: string;
}

export const DOCS_SECTIONS: DocSection[] = [
  { id: "overview", label: "Tổng quan" },
  { id: "architecture", label: "Kiến trúc hệ thống" },
  { id: "terminal", label: "Terminal ảo" },
  { id: "arena", label: "Cyber Arena 1v1" },
  { id: "ctf-roadmap", label: "CTF & Lộ trình" },
  { id: "modules", label: "Cấu trúc module" },
];
