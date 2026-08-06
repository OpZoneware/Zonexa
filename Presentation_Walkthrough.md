# Zonexa v1.0 — Presentation Walkthrough Script

**Goal:** A 5–7 minute guided demo that shows Zoneware's project portal as a
working system, mapped to the management meeting on 28 July 2026.

**Before you start:** open the site, use **Reset Demo Data** (sidebar footer) so
the demo starts clean.

---

## Slide 1 — Sign in (30s)
- Open `index.html` → sign-in page.
- Enter **`ZW-0001`** (MD) → lands on the **Command Center**.
- Say: *"This is the single dashboard the MD asked for — everything at the touch of one button."*

## Slide 2 — Executive Summary & Dashboard (60s)
- Point to the **Executive Summary** (portfolio health bars, file bottlenecks, spend authority, compliance countdown).
- Say: *"A one-touch view of the whole portfolio — which projects are Green/Amber/Red, where files are stuck, and what compliance is expiring."*
- Then the **KPI row** (project count, portfolio value, avg progress, delays, stale updates).

## Slide 3 — Open a Project (60s)
- Click any **project card**, e.g. a Red/Amber one → detail drawer opens.
- Walk the tabs: **Overview → Progress (trend) → Document Control (file location) → Cost Control → Risks → Issues & Actions → Documents**.
- Highlight: *"Statuses are rule-based — never typed. Progress % drives Green/Amber/Red automatically."*
- Click **🖨 Print Report** to show the clean one-pager (print/PDF).

## Slide 4 — File & Approval Workflow ("FedEx-style") (60s)
- Use **⇄ Portals** → **Contract Portal** (or sidebar → File & Approvals).
- Show the **approval chain** (Procurement → Audit → User Dept → Engineering → Accounts → STO → CIA → Governor) and the **File Journey** table — where each file is, and its progress bar.
- Say: *"This is the MD's exact ask — knowing a file is stuck on one Permanent Secretary's table, in real time."*

## Slide 5 — Payment Requisitions & Spend Authority (45s)
- Switch to **Accounts Portal → Payment Requisitions**.
- Show a **Pending MD** requisition, the **Escalate** flag for above-limit amounts, and the **Spend Authority** table.
- Say: *"This is the 'trust + controls' ask — the MD can delegate approval up to a limit, and anything above escalates to him."*

## Slide 6 — Admin Console (governance) (45s)
- Switch to **Admin Console** (login as `ZW-9999` or via portal).
- Briefly show **Revoke** (and Restore) and **Rotate Code**.
- Say: *"Super Admin controls access — revoke, restore, and issue fresh codes. Every action is audited."*

## Slide 7 — Optional live update + reset (30s)
- On Accounts, **Record a Payment** → outstanding recomputes; or on Staff, **Update Progress** → status changes.
- Say: *"It's a live system — updates persist and recalculate. And we can reset it any time."*
- End with **Reset Demo Data** to leave a clean state.

---

## Demo codes
| Code | Identity | Portal |
|---|---|---|
| `ZW-0001` | MD | Command Center (all portals) |
| `ZW-7293` | Contract Lead | Contract Portal |
| `ZW-6000` | Accounts | Accounts Portal |
| `ZW-3387` | Project Manager | Staff Workspace |
| `ZW-9999` | Super Admin | Admin Console |

## Audience Q&A cheat sheet
- **"Is it live / multi-user?"** → *This is the working prototype. Data persists per browser. Production (shared DB + Google sign-in) is the next phase — see the architecture blueprint.*
- **"Who sees what?"** → *Role-based portals — MD sees all; each role only sees their own projects, files and requisitions.*
- **"How do statuses get decided?"** → *Rule-based. Progress, file SLA, and compliance all recompute from the data — nothing is hand-typed.*
- **"Is the data real?"** → *It's modeled on Zoneware's real project set but anonymized for this demo.*

---

*Zonexa v1.0 · Zoneware Limited · Contractors | Facility Management | Advisory*
