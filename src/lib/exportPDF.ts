import jsPDF from "jspdf";
import type { GenerateResponse } from "../types";

// ── Design tokens ────────────────────────────────────────────
type RGB = [number, number, number];
const BG:     RGB = [255,255,255];
const INK:    RGB = [15, 15, 15];
const MUTED:  RGB = [100,100,110];
const ACCENT: RGB = [109, 40,217];
const LIGHT:  RGB = [237,233,254];
const RULE:   RGB = [226,226,232];
const STRIPE: RGB = [249,249,251];
const HDR_BG: RGB = [30, 15, 60];

export async function exportToPDF(result: GenerateResponse): Promise<void> {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const M = 18;
  const CW = W - M * 2;
  let y = 0;

  // ── Helpers ──────────────────────────────────────────────
  const fill = (x: number, yy: number, w: number, h: number, c: RGB) => {
    doc.setFillColor(c[0], c[1], c[2]); doc.rect(x, yy, w, h, "F");
  };
  const ink = (c: RGB) => doc.setTextColor(c[0], c[1], c[2]);
  const rule = (yy: number) => { doc.setDrawColor(RULE[0], RULE[1], RULE[2]); doc.setLineWidth(0.2); doc.line(M, yy, M + CW, yy); };

  function newPage(header?: string) {
    doc.addPage();
    fill(0, 0, W, 297, BG);
    // top accent bar
    fill(0, 0, W, 1.5, ACCENT);
    y = 12;
    if (header) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      ink(INK);
      doc.text(header, M, y);
      y += 2;
      rule(y); y += 7;
    }
  }

  function checkSpace(n: number) { if (y + n > 278) newPage(); }

  function sectionBadge(num: string, title: string) {
    checkSpace(12);
    fill(M, y, CW, 9, LIGHT);
    ink(ACCENT);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(num, M + 4, y + 6);
    doc.setFontSize(9);
    ink(INK);
    doc.text(title, M + 14, y + 6);
    y += 13;
  }

  function heading(text: string, size = 11) {
    checkSpace(size + 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    ink(INK);
    doc.text(text, M, y);
    y += size * 0.45 + 3;
  }

  function mutedText(text: string, indent = 0, maxW = CW) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    ink(MUTED);
    const lines = doc.splitTextToSize(text, maxW - indent) as string[];
    doc.text(lines, M + indent, y);
    y += lines.length * 4.5;
  }

  function gap(n = 5) { y += n; }

  // ── PAGE 1: Cover ────────────────────────────────────────
  fill(0, 0, W, 297, BG);
  fill(0, 0, W, 1.5, ACCENT);

  // Top logo area
  fill(0, 0, W, 72, HDR_BG);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  ink([255,255,255]);
  doc.text("HackPilot", M, 32);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  ink([180,160,220]);
  doc.text("AI-Generated Project Blueprint", M, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  ink([140,120,180]);
  doc.text("hackpilot.ai  ·  Powered by 0G Storage", M, 54);

  // Accent line at bottom of header
  fill(0, 72, W, 2, ACCENT);

  y = 86;

  // Project idea block
  fill(M, y, CW, 26, LIGHT);
  ink(ACCENT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("PROJECT IDEA", M + 5, y + 7);
  ink(INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  const ideaLines = doc.splitTextToSize(result.projectIdea, CW - 10) as string[];
  doc.text(ideaLines, M + 5, y + 14);
  y += 32;

  // Meta row
  gap(6);
  rule(y); gap(4);
  const meta: [string, string][] = [
    ["Session ID", result.sessionId],
    ["Generated", new Date(result.generatedAt).toLocaleString()],
  ];
  if (result.storageHash) meta.push(["0G Hash", result.storageHash.slice(0, 48) + "…"]);
  meta.forEach(([k, v]) => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(8.5); ink(MUTED);
    doc.text(k + ":", M, y);
    doc.setFont("helvetica", "normal"); ink(INK);
    doc.text(v, M + 28, y);
    y += 5.5;
  });
  gap(4); rule(y); gap(10);

  // Table of contents
  doc.setFont("helvetica", "bold"); doc.setFontSize(10); ink(INK);
  doc.text("Contents", M, y); y += 8;
  const toc = ["01  User Stories","02  MVP Scope","03  Architecture","04  Database Schema","05  Sprint Board"];
  toc.forEach((item, i) => {
    fill(M, y - 3.5, CW, 7, i % 2 === 0 ? STRIPE : BG);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); ink(INK);
    doc.text(item, M + 5, y);
    y += 7.5;
  });

  // ── PAGE 2: User Stories ─────────────────────────────────
  newPage();
  sectionBadge("01", "User Stories");

  result.userStories.forEach((s) => {
    const goalLines = (doc.splitTextToSize(s.goal, CW - 8) as string[]).length;
    const acLines   = s.acceptanceCriteria.reduce((a, ac) => a + (doc.splitTextToSize("✓  " + ac, CW - 14) as string[]).length, 0);
    const cardH = 8 + goalLines * 5 + 5 + acLines * 4.5 + 6;
    checkSpace(cardH + 4);

    // Card outline
    doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
    doc.setLineWidth(0.25);
    doc.roundedRect(M, y, CW, cardH, 2, 2, "S");

    // Priority badge colours
    const bp = s.priority === "must-have"    ? { bg:[254,226,226] as RGB, t:[185,28,28]  as RGB }
             : s.priority === "should-have"  ? { bg:[255,237,213] as RGB, t:[180,83,9]   as RGB }
             :                                 { bg:[220,252,231] as RGB, t:[21,128,61]  as RGB };
    fill(M + CW - 32, y + 3, 29, 5, bp.bg);
    doc.setFont("helvetica", "bold"); doc.setFontSize(6.5); ink(bp.t);
    doc.text(s.priority.toUpperCase(), M + CW - 17.5, y + 6.8, { align: "center" });

    y += 5;
    doc.setFont("helvetica", "bold"); doc.setFontSize(7); ink(MUTED);
    doc.text(s.id, M + 4, y); y += 5;

    doc.setFont("helvetica", "bold"); doc.setFontSize(10); ink(INK);
    const gl = doc.splitTextToSize(`As a ${s.role}, I want to ${s.goal}`, CW - 40) as string[];
    doc.text(gl, M + 4, y); y += gl.length * 5;

    mutedText(`So that ${s.benefit}`, 4, CW - 8); gap(2);

    s.acceptanceCriteria.forEach((ac) => {
      doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); ink(ACCENT);
      doc.text("✓", M + 4, y);
      ink(MUTED);
      const al = doc.splitTextToSize(ac, CW - 14) as string[];
      doc.text(al, M + 9, y); y += al.length * 4.5;
    });
    gap(6);
  });

  // ── PAGE 3: MVP Scope ────────────────────────────────────
  newPage();
  sectionBadge("02", "MVP Scope");

  heading("In Scope");
  result.mvpScope.included.forEach((f) => {
    checkSpace(16);
    doc.setFont("helvetica", "bold"); doc.setFontSize(10); ink(INK);
    const fLines = doc.splitTextToSize(f.feature, CW - 8) as string[];
    doc.text("·  " + fLines[0], M + 2, y); y += 5;
    mutedText(f.reason, 6, CW - 6); gap(3);
  });

  gap(5); rule(y); gap(8);
  heading("Out of Scope");
  result.mvpScope.excluded.forEach((f) => {
    checkSpace(14);
    doc.setFont("helvetica", "bold"); doc.setFontSize(10); ink(MUTED);
    doc.text("–  " + f.feature, M + 2, y); y += 5;
    mutedText(f.reason, 6, CW - 6); gap(3);
  });

  // ── PAGE 4: Architecture ─────────────────────────────────
  newPage();
  sectionBadge("03", "Architecture");

  // Pattern + overview card
  const ovLines = doc.splitTextToSize(result.architecture.overview, CW - 10) as string[];
  const ovCardH = 8 + 6 + ovLines.length * 4.5 + 8;
  fill(M, y, CW, ovCardH, LIGHT);
  ink(ACCENT); doc.setFont("helvetica", "bold"); doc.setFontSize(7.5);
  doc.text("PATTERN", M + 5, y + 6);
  ink(INK); doc.setFont("helvetica", "bold"); doc.setFontSize(10);
  doc.text(result.architecture.pattern, M + 5, y + 13);
  ink(MUTED); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
  doc.text(ovLines, M + 5, y + 20);
  y += ovCardH + 6;

  heading("Components");
  result.architecture.components.forEach((c) => {
    const dLines = (doc.splitTextToSize(c.description, CW - 8) as string[]).length;
    const cardH = 6 + dLines * 4.5 + 10;
    checkSpace(cardH + 4);
    doc.setDrawColor(RULE[0], RULE[1], RULE[2]); doc.setLineWidth(0.2);
    doc.roundedRect(M, y, CW, cardH, 2, 2, "S");
    y += 5;
    doc.setFont("helvetica", "bold"); doc.setFontSize(10); ink(INK);
    doc.text(c.name, M + 4, y);
    fill(M + CW - 38, y - 4, 35, 6, LIGHT);
    doc.setFont("helvetica", "bold"); doc.setFontSize(7); ink(ACCENT);
    doc.text(c.type, M + CW - 20.5, y, { align: "center" }); y += 5;
    mutedText(c.description, 4);
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); ink(MUTED);
    doc.text("Tech: " + c.techChoice, M + 4, y); y += 4.5;
    gap(4);
  });

  // 0G note
  checkSpace(20);
  fill(M, y, CW, 20, [243,240,255] as RGB);
  fill(M, y, 3, 20, ACCENT);
  ink(ACCENT); doc.setFont("helvetica", "bold"); doc.setFontSize(7.5);
  doc.text("0G STORAGE ROLE", M + 6, y + 5);
  ink(MUTED); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
  const sgLines = doc.splitTextToSize(result.architecture.storageNote, CW - 12) as string[];
  doc.text(sgLines, M + 6, y + 11); y += Math.max(20, sgLines.length * 4.5 + 12) + 6;

  // ── PAGE 5: Database Schema ──────────────────────────────
  newPage();
  sectionBadge("04", "Database Schema");

  result.dbSchema.tables.forEach((table) => {
    const rowH = table.fields.length * 7 + 22;
    checkSpace(rowH + 6);

    // Table title bar
    fill(M, y, CW, 10, HDR_BG);
    ink([255,255,255]); doc.setFont("helvetica", "bold"); doc.setFontSize(10);
    doc.text(table.name, M + 5, y + 7);
    ink([180,160,220]); doc.setFont("helvetica", "normal"); doc.setFontSize(7.5);
    const descW = CW - doc.getTextWidth(table.name) - 14;
    const descTrunc = doc.splitTextToSize(table.description, descW) as string[];
    doc.text(descTrunc[0] ?? "", M + CW - 4, y + 7, { align: "right" });
    y += 10;

    // Column header row
    fill(M, y, CW, 7, STRIPE);
    ink(MUTED); doc.setFont("helvetica", "bold"); doc.setFontSize(7.5);
    doc.text("COLUMN",      M + 5,  y + 5);
    doc.text("TYPE",        M + 58, y + 5);
    doc.text("CONSTRAINTS", M + 110, y + 5);
    y += 7;

    // Field rows
    table.fields.forEach((field, fi) => {
      fill(M, y, CW, 7, fi % 2 === 0 ? BG : STRIPE);
      // PK highlight
      if (field.primaryKey) fill(M, y, 2, 7, ACCENT);

      ink(field.primaryKey ? ACCENT : INK);
      doc.setFont("helvetica", field.primaryKey ? "bold" : "normal");
      doc.setFontSize(8.5);
      doc.text(field.name, M + 5, y + 5);

      ink(MUTED); doc.setFont("helvetica", "normal"); doc.setFontSize(8);
      doc.text(field.type, M + 58, y + 5, { maxWidth: 48 });

      const badges: string[] = [];
      if (field.primaryKey) badges.push("PK");
      if (field.unique)     badges.push("UNIQUE");
      if (!field.nullable)  badges.push("NOT NULL");
      if (field.foreignKey) badges.push("FK→" + field.foreignKey);

      ink(ACCENT); doc.setFont("helvetica", "bold"); doc.setFontSize(7.5);
      doc.text(badges.join("  "), M + 110, y + 5, { maxWidth: CW - 114 });
      y += 7;
    });

    // Indexes — one per line, wrapped
    if (table.indexes && table.indexes.length > 0) {
      const idxLines = table.indexes.flatMap(idx =>
        doc.splitTextToSize(idx, CW - 10) as string[]
      );
      const idxH = idxLines.length * 4.5 + 8;
      checkSpace(idxH);
      fill(M, y, CW, idxH, LIGHT);
      ink(MUTED); doc.setFont("helvetica", "normal"); doc.setFontSize(7.5);
      doc.text("Indexes:", M + 5, y + 5);
      ink(INK); doc.setFont("helvetica", "normal"); doc.setFontSize(7.5);
      idxLines.forEach((line, li) => {
        doc.text(line, M + 5, y + 5 + (li + 1) * 4.5);
      });
      y += idxH;
    }

    gap(8);
  });

  // Relationships
  checkSpace(16);
  heading("Relationships");
  result.dbSchema.relationships.forEach((r) => {
    checkSpace(7);
    ink(ACCENT); doc.setFont("helvetica", "normal"); doc.setFontSize(9);
    doc.text("→", M + 2, y);
    ink(MUTED);
    const rLines = doc.splitTextToSize(r, CW - 10) as string[];
    doc.text(rLines, M + 8, y);
    y += rLines.length * 4.8;
  });

  // ── PAGE 6+: Sprint Board ────────────────────────────────
  newPage();
  sectionBadge("05", "Sprint Board");

  result.sprintBoard.sprints.forEach((sprint) => {
    checkSpace(14);
    // Sprint header
    fill(M, y, CW, 11, HDR_BG);
    fill(M, y, 3, 11, ACCENT);
    ink([255,255,255]); doc.setFont("helvetica", "bold"); doc.setFontSize(10);
    doc.text(`Sprint ${sprint.sprintNumber}`, M + 7, y + 7.5);
    ink([180,160,220]); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
    const goalLines = doc.splitTextToSize(sprint.goal, CW - 40) as string[];
    doc.text(goalLines[0], M + 38, y + 7.5);
    y += 15;

    sprint.epics.forEach((epic) => {
      checkSpace(12);
      // Epic bar
      fill(M, y, CW, 8, LIGHT);
      ink(ACCENT); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
      doc.text(epic.epic, M + 4, y + 5.5);
      y += 10;

      // Task rows
      epic.tasks.forEach((task, ti) => {
        checkSpace(8);
        fill(M, y, CW, 7.5, ti % 2 === 0 ? BG : STRIPE);

        // Task type pill
        fill(M + 3, y + 1.5, 16, 4.5, LIGHT);
        ink(ACCENT); doc.setFont("helvetica", "bold"); doc.setFontSize(6.5);
        doc.text(task.type.toUpperCase().slice(0, 7), M + 11, y + 5, { align: "center" });

        // Title
        ink(INK); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
        const tl = doc.splitTextToSize(task.title, CW - 55) as string[];
        doc.text(tl[0], M + 22, y + 5);

        // Assigned to
        ink(MUTED); doc.setFont("helvetica", "normal"); doc.setFontSize(7.5);
        doc.text(task.assignedTo, M + CW - 22, y + 5, { align: "right" });

        // Story points badge
        fill(M + CW - 10, y + 1, 8, 5.5, ACCENT);
        ink([255,255,255]); doc.setFont("helvetica", "bold"); doc.setFontSize(7);
        doc.text(String(task.storyPoints), M + CW - 6, y + 5, { align: "center" });

        y += 7.5;
      });
      gap(5);
    });
    gap(5);
  });

  // ── Footer on every page ─────────────────────────────────
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    fill(0, 287, W, 10, HDR_BG);
    fill(0, 287, W, 1, ACCENT);
    ink([140,120,180]); doc.setFont("helvetica", "normal"); doc.setFontSize(7);
    doc.text("HackPilot  ·  AI Hackathon Teammate  ·  Powered by 0G Storage", M, 293);
    doc.text(`${i} / ${pages}`, W - M, 293, { align: "right" });
  }

  // ── Save ─────────────────────────────────────────────────
  const slug = result.projectIdea.slice(0, 30).replace(/\s+/g, "-").toLowerCase();
  doc.save(`hackpilot-${slug}.pdf`);
}
