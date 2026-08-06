# Zonexa v1.0 — Zoneware Internal Project Portal (demo build)

A self-contained multi-portal dashboard prototype for Zoneware's internal
tracking of government contracts: projects, progress, documents, payments,
retention and staff sign-offs — all in one place.

## How to open (2 steps)
1. Copy / unzip the folder.
2. Double-click **`index.html`** — it opens the sign-in page in your browser.
   (Also served as a live preview via a static HTTP server.)

## Sign-in codes (demo identities)
| Code | Identity | Portal |
|---|---|---|
| `ZW-0001` | Managing Director | Command Center (sees everything) |
| `ZW-7293` | Contract Lead (Toyin) | Contract Portal |
| `ZW-6000` | Accounts | Accounts Portal |
| `ZW-3387` | Project Manager | Staff Workspace |
| `ZW-9999` | Super Admin | Admin Console (not listed publicly) |

## Pages
| # | File | Portal |
|---|---|---|
| 00 | Login | — |
| 01–09 | Dashboard, Projects, Documents, Progress, Risks, Payments, Site Photos, Analytics, System Admin | Command Center |
| 16 | SOP & Compliance | Command Center |
| 10–13 | Staff Dashboard, My Tasks, Site Photos, My Profile | Staff Workspace |
| 14–15 | Contract Dashboard, File Tracking | Contract Portal |
| 17–18 | Accounts Dashboard, Retention Register | Accounts Portal |
| 20 | Admin Console | Admin Console |

## What to look at (suggested tour)
1. Sign in as **MD (ZW-0001)** → Command Center. Use **"⇄ Portals"** in the
   sidebar to jump between Command Center, Contract, Accounts and Staff portals.
2. Sign in as **Contract Lead (ZW-7293)** → Contract Portal: approval sequence
   + the file pipeline board and the File Tracking register.
3. Sign in as **Accounts (ZW-6000)** → Accounts Portal: collection health and
   the Retention Register.
4. Sign in as **Super Admin (ZW-9999)** → Admin Console: identity register,
   security controls (epoch force sign-out), and the audit trail.
5. Click any project row/card → the project detail drawer (Overview, Progress,
   Document Control, Cost Control, Risks, Issues & Actions, Documents).

## Notes
- All data is demo data modeled on Zoneware's real project set.
- Sign-in and data changes are stored per browser for the demo only. Production
  replaces this with Google Workspace sign-in and a shared database (see the
  Solution Architect blueprint for the target architecture).
- Statuses are **rule-based** (calculated from data), never opinion — deliberate
  and documented (Command Center → Admin → Metric Definitions).
- The **SOP & Compliance** page (16) shows the **mechanism** — the registry and
  the 30/60/90-day expiry engine. The SOP *content* on it is sample/placeholder
  and will be replaced by Blessing's authoritative SOP documentation from the
  systems-audit engagement.

Zonexa v1.0 · Zoneware Limited · Contractors | Facility Management | Advisory
