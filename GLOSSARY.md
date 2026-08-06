# Zonexa v1.0 — Abbreviations & Glossary

All abbreviations used across the Zonexa system, with their full meanings,
grouped by category.

## Roles & Access Codes
| Abbreviation | Full Meaning |
|---|---|
| MD | Managing Director |
| PM | Project Manager |
| FM | Facility Manager |
| ZCC | Zoneware Control Center — the earlier name of the platform (the product is now **Zonexa**; ZCC still appears in internal keys and labels) |
| ZW-XXXX | Zoneware access code — a unique code per staff identity (e.g. `ZW-0001` = MD) |

## Document & Record ID Prefixes
| Abbreviation | Full Meaning |
|---|---|
| DOC-ZW-xxx-yyy | Document — Zoneware project document (project no. + document no.), e.g. `DOC-ZW-001-002` |
| UP-xxx | Upload task / record ID (upload & sign-off tasks) |
| PH-xxx | Photo / evidence record ID |
| FT-xxx | File Tracking record ID (government file pipeline) |
| RISK-xxx | Risk register ID |
| S-xxx | Session ID (a live sign-in session) |

## Document Types
| Abbreviation | Full Meaning |
|---|---|
| BOQ | Bill of Quantities (scope/cost breakdown for a contract) |
| M&E | Mechanical & Electrical (as in "Prime M&E Services") |
| FM Report | Facility Management report |

## System, Metrics & Finance
| Abbreviation | Full Meaning |
|---|---|
| RBAC | Role-Based Access Control (the permissions system) |
| SPI | Schedule Performance Index (planned vs actual progress ratio) |
| SLA | Service Level Agreement (expected days for a file to move through an office) |
| KPI | Key Performance Indicator |
| API | Application Programming Interface |
| SSO | Single Sign-On |
| OIDC | OpenID Connect (the Google sign-in standard) |
| JWT | JSON Web Token (session/auth token) |
| PWA | Progressive Web App |
| CRUD | Create, Read, Update, Delete (data operations) |
| UAT | User Acceptance Testing |
| BI | Business Intelligence |
| AI | Artificial Intelligence |
| JSON | JavaScript Object Notation (data format) |
| DB | Database |
| SQL | Structured Query Language |
| RDBMS | Relational Database Management System |

## Clients & Government Bodies (in the demo data)
| Abbreviation | Full Meaning |
|---|---|
| SCRPS | Lagos State Special Committee on Rehabilitation of Public Schools *(context: "Public School Rehabilitation — 18 Classrooms")* |
| LAMATA | Lagos Metropolitan Area Transport Authority |
| STO | State Treasury Office *(appears in a project timeline step "CIA / STO")* |
| CIA | Central Internal Audit — the audit stage a contract file must pass through for payment release |
| BPP | Bureau of Public Procurement — compliance registration, renewed yearly |
| QS | Quantity Surveyor |
| M&E | Mechanical & Electrical |

## Tech & Data-Layer Keys (internal)
| Abbreviation | Full Meaning |
|---|---|
| v1.0 | Version 1.0 |
| `zcc.live.v1` | Zoneware Control Center live data store (the shared data source) |
| `zcc.admin.users.v1` | ZCC admin users overrides store |
| `zcc.audit.v1` | ZCC audit log store |
| `zcc.tasks.v1` | ZCC tasks store |
| `zcc.myphotos.v1` | ZCC my photos store |
| `zcc.epoch.v1` | ZCC security epoch (force sign-out version) |

---

*Note: SCRPS and CIA/STO are inferred from context in the sample data; official
expansions can be confirmed and corrected as needed.*

*Zonexa v1.0 · Zoneware Limited · Contractors | Facility Management | Advisory*
