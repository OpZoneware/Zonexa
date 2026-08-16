/* ============================================================
   Zoneware Control Center (ZCC) v1.0 — SHARED DATA LAYER
   Single source of truth for every page (Command Center + Staff
   Workspace). Loaded on every page before zcc-app.js.
   In production this is replaced by Google Sheets / AppSheet.
   ============================================================ */
'use strict';

const DOCUMENTS = [{"documentId": "DOC-PL-001-001", "projectId": "PL-001", "projectName": "School for the Visually Impaired (Amuwo-Odofin)", "client": "SCRPS / Lagos State Government", "type": "Award Letter", "stage": "Award / Contract", "title": "Notification of Award — School for the Visually Impaired (SCRPS/W/DC/004/2025)", "date": "17-Jul-2025", "owner": "Contract Lead", "status": "Available", "file": "sample_documents/DOC-PL-001-001_Award_Letter_Sample.pdf", "driveFile": "https://drive.google.com/file/d/1-pLbVKY0pkYNvp4puXupIgnOqftN3M_A/view"}, {"documentId": "DOC-PL-001-002", "projectId": "PL-001", "projectName": "School for the Blind, Festac", "client": "Lagos State Ministry / Education", "type": "BOQ / Scope", "stage": "Contract Documentation", "title": "BOQ and Scope Summary", "date": "14-Jun-2026", "owner": "Engr. Ayodele Ogunnaike", "status": "Available", "file": "sample_documents/DOC-PL-001-002_BOQ_Scope_Summary_Sample.pdf"}, {"documentId": "DOC-PL-001-003", "projectId": "PL-001", "projectName": "School for the Blind, Festac", "client": "Lagos State Ministry / Education", "type": "Progress Report", "stage": "Execution", "title": "Site Progress Report", "date": "28-Jul-2026", "owner": "Chinedu Okafor", "status": "Available", "file": "sample_documents/DOC-PL-001-003_Site_Progress_Report_Sample.pdf"}, {"documentId": "DOC-ZW-002-001", "projectId": "ZW-002", "projectName": "Shagamu Construction Project", "client": "Ogun State Works Programme", "type": "Recovery Plan", "stage": "Execution", "title": "Vendor Recovery Programme", "date": "27-Jul-2026", "owner": "Femi Adebayo", "status": "Available", "file": "sample_documents/DOC-ZW-002-001_Vendor_Recovery_Programme_Sample.pdf"}, {"documentId": "DOC-ZW-003-001", "projectId": "ZW-003", "projectName": "Public School Rehabilitation - 18 Classrooms", "client": "SCRPS", "type": "Progress Report", "stage": "Execution", "title": "Classroom Progress Report", "date": "24-Jul-2026", "owner": "Aisha Balogun", "status": "Available", "file": "sample_documents/DOC-ZW-003-001_Classroom_Progress_Report_Sample.pdf"}, {"documentId": "DOC-ZW-004-001", "projectId": "ZW-004", "projectName": "Ojodu Bus Terminal Facility Management", "client": "LAMATA", "type": "FM Report", "stage": "Monthly Sign-Off", "title": "Weekly Facility Management Report", "date": "28-Jul-2026", "owner": "Ifeanyi Nwachukwu", "status": "Available", "file": "sample_documents/DOC-ZW-004-001_Weekly_FM_Report_Sample.pdf"}, {"documentId": "DOC-ZW-005-001", "projectId": "ZW-005", "projectName": "MOT-2 Intelligent Traffic Signal at 12 Locations", "client": "Ministry of Transportation (MOT)", "type": "Inspection Request", "stage": "Inspection", "title": "Inspection Request Letter", "date": "26-Jul-2026", "owner": "Toyin Adeyemi", "status": "Available", "file": "sample_documents/DOC-ZW-005-001_Inspection_Request_Sample.pdf"}, {"documentId": "DOC-ZW-005-002", "projectId": "ZW-005", "projectName": "MOT-2 Intelligent Traffic Signal at 12 Locations", "client": "Ministry of Transportation (MOT)", "type": "Testing Checklist", "stage": "Testing", "title": "Junction Testing Checklist", "date": "27-Jul-2026", "owner": "Adewale Johnson", "status": "Available", "file": "sample_documents/DOC-ZW-005-002_Junction_Testing_Checklist_Sample.pdf"}, {"documentId": "DOC-ZW-006-001", "projectId": "ZW-006", "projectName": "Road Marking and Lane Signage Works", "client": "Ministry of Transportation", "type": "Execution Register", "stage": "Execution", "title": "Executed Sections Register", "date": "28-Jul-2026", "owner": "Kemi Salami", "status": "Available", "file": "sample_documents/DOC-ZW-006-001_Executed_Sections_Register_Sample.pdf"}, {"documentId": "DOC-ZW-007-001", "projectId": "ZW-007", "projectName": "Median Kerb and Signage Installation", "client": "Ministry of Works / Transportation", "type": "Vendor Update", "stage": "Execution", "title": "Vendor Progress Update Request", "date": "21-Jul-2026", "owner": "Musa Bello", "status": "Available", "file": "sample_documents/DOC-ZW-007-001_Vendor_Progress_Update_Request_Sample.pdf"}  , {"documentId": "DOC-RW-003-001", "projectId": "ZW-005", "projectName": "MOT-2 Intelligent Traffic Signal at 12 Locations", "client": "Ministry of Transportation (MOT)", "type": "Award Letter", "stage": "Award / Contract", "title": "Letter of Award — MOT-2 Intelligent Traffic Signal (12 locations)", "date": "29-Sep-2020", "owner": "Contract Lead", "status": "Available", "file": "sample_documents/DOC-ZW-005-001_Inspection_Request_Sample.pdf", "driveFile": "https://drive.google.com/file/d/12WLsqDH3rA1STJUrL0UoziYyMPJ9B1vf/view"}
  , {"documentId": "DOC-RW-007-001", "projectId": "RW-007", "projectName": "Oke-Isagun — Repaint 7+1 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Award Letter", "stage": "Award / Contract", "title": "Letter of Award — Repainting 7+1 Classroom Block, Oke-Isagun (LOT 7)", "date": "2024", "owner": "Contract Lead", "status": "Available", "file": "sample_documents/DOC-ZW-003-001_Classroom_Progress_Report_Sample.pdf", "driveFile": "https://drive.google.com/file/d/1Vdil8G0vz2_5u58CDn36T7ICBpw-ja8s/view"}
  , {"documentId": "DOC-BW-001-001", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Award Letter", "stage": "Award / Contract", "title": "Letter of Award — Eko Boys 18 Classrooms", "date": "2023", "owner": "Contract Lead", "status": "Available", "file": "sample_documents/DOC-ZW-001-001_Award_Letter_Sample.pdf", "driveFile": "https://drive.google.com/file/d/1x1emyfACBBKI8vHFvBCt-WaxAPHvWx8v/view"}  , {"documentId": "DOC-BW-002-001", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Award Letter", "stage": "Award / Contract", "title": "Award Letter — Eko Boys Perimeter Fence (SCRPS/W/DC/007/2024)", "date": "26-Aug-2024", "owner": "Contract Lead", "status": "Available", "file": "sample_documents/DOC-ZW-001-001_Award_Letter_Sample.pdf", "driveFile": "https://drive.google.com/file/d/17z6O1M8kQrJOrkSI-P5jLJvijFrYyq7Z/view"}
  , {"documentId": "DOC-BW-002-002", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Notification", "stage": "Award / Contract", "title": "Notification of Award — Eko Boys Perimeter Fence", "date": "26-Aug-2024", "owner": "Contract Lead", "status": "Available", "file": "sample_documents/DOC-ZW-005-001_Inspection_Request_Sample.pdf", "driveFile": "https://drive.google.com/file/d/1FSbUk0PtM3RVBrHhmuTOiZMIJfhzEkUr/view"}
  , {"documentId": "DOC-BW-002-003", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Acceptance", "stage": "Award / Contract", "title": "Letter of Acceptance — Eko Boys Fence", "date": "2024", "owner": "Contract Lead", "status": "Available", "file": "sample_documents/DOC-ZW-003-001_Classroom_Progress_Report_Sample.pdf", "driveFile": "https://drive.google.com/file/d/1d1zhkkf7ObamzA2unladydEUJPBmtkur/view"}
  , {"documentId": "DOC-BW-002-004", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Completion Certificate", "stage": "Completion", "title": "Practical Completion Certificate — Eko Boys Fence", "date": "2025", "owner": "Contract Lead", "status": "Available", "file": "sample_documents/DOC-ZW-001-003_Site_Progress_Report_Sample.pdf", "driveFile": "https://drive.google.com/file/d/1POsBhWUB4H-kniP_WElQUT4l69M3zkF5/view"}
  , {"documentId": "DOC-BW-002-005", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Completion Letter", "stage": "Completion", "title": "Fence Completion Letter", "date": "2025", "owner": "Contract Lead", "status": "Available", "file": "sample_documents/DOC-ZW-006-001_Executed_Sections_Register_Sample.pdf", "driveFile": "https://drive.google.com/file/d/1U9EZAaeZJJarN0Z5nKXQnlk0e8KpTXx-/view"}
  , {"documentId": "DOC-BW-002-006", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Expense Sheet", "stage": "Financial", "title": "Eko Boys Fence Expense Sheet", "date": "2024-2026", "owner": "Accounts", "status": "Available", "file": "sample_documents/DOC-ZW-002-001_Vendor_Recovery_Programme_Sample.pdf", "driveFile": "https://drive.google.com/file/d/1NiPC4HI0TvAWZRZDi1O2Re30w-1hh14P/view"}
  , {"documentId": "DOC-BW-002-007", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "BOQ", "stage": "Bidding", "title": "Priced Bill — Eko Boys High School Fence", "date": "2024", "owner": "Contract Lead", "status": "Available", "file": "sample_documents/DOC-ZW-001-002_BOQ_Scope_Summary_Sample.pdf", "driveFile": "https://drive.google.com/file/d/1YkfeAb23wXqXw3p0-h0yEDt_teAXi3-w/view"}
  , {"documentId": "DOC-BW-002-F01", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "Receipts", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=16hiYRMsYbs2hEdxBL4QZFkV3hUEdmD8g"}
  , {"documentId": "DOC-BW-002-F02", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "Letters", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1mYlKdvuZT3-ksl8bcdB7hGE6Gdycd9Sa"}
  , {"documentId": "DOC-BW-002-F03", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "SCRPS Payment Requirement", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1Tv3bmL4SSETn4pNh0yCOP00ApbsYDGUi"}
  , {"documentId": "DOC-BW-002-F04", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "Bidding Process", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1WVNTLGwhV2gzzE4BnN6gZKD4iULsVOY6"}
  , {"documentId": "DOC-BW-002-F05", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "Certificates", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1KjRauZsrV9ek0kmp8bJVmTGZsi9gCDot"}
  , {"documentId": "DOC-BW-002-F06", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "Award Letter & Notification", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1IiMwlELhNoZy285dI8UtMLqqIKEbdKfR"}
  , {"documentId": "DOC-BW-002-F07", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "Expense Sheet", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1sZ5Ux3iA5vsuFnRnw1L9L8vSdWFyD0Xo"}
  , {"documentId": "DOC-BW-002-F08", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "Report", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1oXXEHjC0L3whCPf4xt6NXcOgLAlJwBRw"}
  , {"documentId": "DOC-BW-002-P01", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — Before", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1FZXiatZmPmFO4PPFlHIeYtTYf7xqOmH6"}
  , {"documentId": "DOC-BW-002-P02", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — After", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1ZLMavOW7A-3Zv6sNty8eCI_Ji9qGWlQj"}
  , {"documentId": "DOC-BW-002-P05", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 1 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/bw002-after-1.jpg", "driveFile": ""}
  , {"documentId": "DOC-BW-002-P06", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 2 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/bw002-after-2.jpg", "driveFile": ""}
  , {"documentId": "DOC-BW-002-P07", "projectId": "BW-002", "projectName": "Eko Boys Perimeter Fence (LOT 11)", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 3 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/bw002-after-3.jpg", "driveFile": ""}


  , {"documentId": "DOC-BW-001-F01", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "AWARD LETTER AND NOTIFICATION OF AWARD", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1avxoU0CWwmPBUZ_ugqcxnZW0skF1TrvY"}
  , {"documentId": "DOC-BW-001-F02", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "BILL", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1m-qomlcNZAiHc5tl7XpUFWBOIQ6QDPBA"}
  , {"documentId": "DOC-BW-001-F03", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "BOND - APG & PG", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1gnTn_8CG_rvJqM1WZSYl3r3j2kYzyyug"}
  , {"documentId": "DOC-BW-001-F04", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "COMPLETION CERTIFICATES", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1SaT_WTpQh9GFx1DwUo4R4xJ1mWfSwyla"}
  , {"documentId": "DOC-BW-001-F05", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "CONTRACT DEDUCTIONS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1PVymdwjN07vbOYo_lzWmHtz_4WvPL-Is"}
  , {"documentId": "DOC-BW-001-F06", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "DRAWINGS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1v5Y4y8CbVrPY7n636rmS0LgUjqZ4e6Ar"}
  , {"documentId": "DOC-BW-001-F07", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "EXPENSE SHEET", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1appNr6Uz3xb9UPDcufiChMVX2SWyvvTF"}
  , {"documentId": "DOC-BW-001-F08", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "LETTERS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=17ghu1f8PgXHgOaXbIRjgwduysuH2NuVM"}
  , {"documentId": "DOC-BW-001-F09", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "MOU AND MILESTONES", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1MS5dVBL_VJOzGDI8necIG3szuexRobaA"}
  , {"documentId": "DOC-BW-001-F10", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "PAYMENT REQUIREMENTS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1ejsqcdaiRYmSlV9EiR6I_3NYOomWnTti"}
  , {"documentId": "DOC-BW-001-F11", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "RECEIPTS & INVOICES", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1pYNFCl6QZGWLxUBY9M9OelNa9boLCVea"}
  , {"documentId": "DOC-BW-001-F12", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "REPORT", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1aEJjH3se4TOb8iSSyhSviQbnG2XearOF"}
  , {"documentId": "DOC-BW-001-F13", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "SOIL TEST RESULT", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1UKuIIAyIokQL_T5RWT_g677VTP-8hOMo"}
  , {"documentId": "DOC-BW-001-F14", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "STANDARDS & PROCEDURES", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1lL1u10P69uRwdpRZ43X3N0ZL3eL_GYdQ"}
  , {"documentId": "DOC-BW-001-F15", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "VARIATION", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1tM5euQbQBys9rw1eX0tYd1RQckg12oXs"}
  , {"documentId": "DOC-BW-001-P05", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 1 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/bw001-after-1.jpg", "driveFile": ""}
  , {"documentId": "DOC-BW-001-P06", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 2 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/bw001-after-2.jpg", "driveFile": ""}
  , {"documentId": "DOC-BW-001-P07", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 3 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/bw001-after-3.jpg", "driveFile": ""}

  , {"documentId": "DOC-BW-001-P01", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — Before", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1UihNz0im3aqMenziYtuGUANGMlIr8WtM"}
  , {"documentId": "DOC-BW-001-P02", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — During", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1aELu-v78lKhMZjP7K5W-5jhv8q1i-uQf"}
  , {"documentId": "DOC-BW-001-P03", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — After", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1qD6SEm44kyZItKTdtxsaTMmdWXfRk2eF"}
  , {"documentId": "DOC-BW-001-P04", "projectId": "BW-001", "projectName": "Eko Boys 18 Classrooms", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Project Document (Google Doc)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://docs.google.com/document/d/1KBm2p41j5Gp4BoCOMmaG0DA_SV65KkRs/edit"}

  , {"documentId": "DOC-BW-006-F01", "projectId": "BW-006", "projectName": "Fire Station Modern Workshop", "client": "Lagos State Fire & Rescue Service", "type": "Folder", "stage": "All", "title": "PAYMENT REQUIREMENTS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1dNOW8cW240GJ_XZUMDbZ1LUmM6CmSEyJ"}
  , {"documentId": "DOC-BW-006-F02", "projectId": "BW-006", "projectName": "Fire Station Modern Workshop", "client": "Lagos State Fire & Rescue Service", "type": "Folder", "stage": "All", "title": "CONTRACT AGREEMENT", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1fzNxlRkNCIJkyPDMEgV7jQRUCl9MpJ2m"}
  , {"documentId": "DOC-BW-006-F03", "projectId": "BW-006", "projectName": "Fire Station Modern Workshop", "client": "Lagos State Fire & Rescue Service", "type": "Folder", "stage": "All", "title": "AWARD LETTER", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1dNAzJj24KsVWEdZ0QSSWWGqmvG99SZCp"}
  , {"documentId": "DOC-BW-006-F04", "projectId": "BW-006", "projectName": "Fire Station Modern Workshop", "client": "Lagos State Fire & Rescue Service", "type": "Folder", "stage": "All", "title": "LETTERS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1M3bHwjQObQ7l4559GlqhZZijSteP1J9D"}
  , {"documentId": "DOC-BW-006-F05", "projectId": "BW-006", "projectName": "Fire Station Modern Workshop", "client": "Lagos State Fire & Rescue Service", "type": "Folder", "stage": "All", "title": "CONTRACT DEDUCTIONS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1WuOL3zhAkDRt9tuwdaFuNJiwzSq-TTdD"}
  , {"documentId": "DOC-HV-004-F01", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "BIDDING SUBMISSION", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1MBMgdKfwi76DBENdxIbxtWiqiLKzZqH2"}
  , {"documentId": "DOC-HV-004-F02", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "BILL", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1kjvw5D27xpPNOb704ZcOgnziImyS5RZL"}
  , {"documentId": "DOC-HV-004-F03", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "COMPLETION CERTIFICATE", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1GsEF3J0CTRHdrEygfM85AA0yTeCFHSBR"}
  , {"documentId": "DOC-HV-004-F04", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "EXPENSE SHEET", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1uE_o6uEK5G4cypSN5XLEtTKhHYkOpWeN"}
  , {"documentId": "DOC-HV-004-F05", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "FUNDS REQUISITION", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1lsE4mWyNgHsJP8ZeKaqIwpeFiUS5SuZN"}
  , {"documentId": "DOC-HV-004-F06", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "LETTERS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1Dcp0K3udZdTb2PcaLmcXqOGuJcqk79bN"}
  , {"documentId": "DOC-HV-004-F07", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "LOA AND NOTIFICATION", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=16FtsRCpTLQFMME9oqOvlHrDuSJ0OPkuy"}
  , {"documentId": "DOC-HV-004-F08", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "PICTURES", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1PXgsrOjSNEAVsH6kzXiQxI8Ka8jlKXi1"}
  , {"documentId": "DOC-HV-004-F09", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "SCRPS RECEIPTS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1RT4ukVx1Vh-nivNXvgrrTEjVrKY7dCIY"}
  , {"documentId": "DOC-HV-004-F10", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "File", "stage": "All", "title": "Funds Requisition (Installation & Painting 37pcs Burglary Proofs)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1iZmnxOnNfxQsjabmJnJNN7dpkfgh4r_m"}
  , {"documentId": "DOC-HV-004-P01", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — Before", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/site-hv004-before.jpg", "driveFile": "images/site-hv004-before.jpg"}
  , {"documentId": "DOC-HV-004-P02", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — During", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/site-hv004-during.jpg", "driveFile": "images/site-hv004-during.jpg"}
  , {"documentId": "DOC-HV-004-P03", "projectId": "HV-004", "projectName": "Surulere Under-10M — Burglary Proofs", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/site-hv004-after.jpg", "driveFile": "images/site-hv004-after.jpg"}

  , {"documentId": "DOC-HV-003-F01", "projectId": "HV-003", "projectName": "Alagbado-Surulere — 12 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "COMPLETION CERTIFICATE", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1Y7fQKDgwgPLJn1Lo5rWS1cSu4CaYCYUp"}
  , {"documentId": "DOC-HV-003-F02", "projectId": "HV-003", "projectName": "Alagbado-Surulere — 12 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "EXPENSE SHEET", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1e3j61TE26DXz1_g_F0dBQ-kHAuYm5SMO"}
  , {"documentId": "DOC-HV-003-F03", "projectId": "HV-003", "projectName": "Alagbado-Surulere — 12 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "LETTERS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1n4yl1Y4r0lmF736g1g7o-8qDZ2Iq7T9p"}
  , {"documentId": "DOC-HV-003-F04", "projectId": "HV-003", "projectName": "Alagbado-Surulere — 12 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "PAYMENT REQUIREMENTS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1eEU4ugjuoY4XUKu4iy-wuwhoJDLbEfLy"}
  , {"documentId": "DOC-HV-003-F05", "projectId": "HV-003", "projectName": "Alagbado-Surulere — 12 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "QUOTATIONS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1_-RF5m0sTHTKA2V4_UK7rVGnuddAfSoJ"}
  , {"documentId": "DOC-HV-003-F06", "projectId": "HV-003", "projectName": "Alagbado-Surulere — 12 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "REPORT", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1yryzOxwJt-uH07kBKLvd_blly2ei-2Pi"}
  , {"documentId": "DOC-HV-003-P01", "projectId": "HV-003", "projectName": "Alagbado-Surulere — 12 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — Before", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1hQySMwVy5GxS2nUHLj6I-LkPiEsBXI-v"}
  , {"documentId": "DOC-HV-003-P02", "projectId": "HV-003", "projectName": "Alagbado-Surulere — 12 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — During", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1Um-0dXVFcA9OhLda4hXFuSlrftU0RSk9"}
  , {"documentId": "DOC-HV-003-P03", "projectId": "HV-003", "projectName": "Alagbado-Surulere — 12 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — After", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1srWCZuFVDjBBZ1LuuVVAHn8d549w1Sqo"}
  , {"documentId": "DOC-HV-003-P05", "projectId": "HV-003", "projectName": "Alagbado-Surulere — 12 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 1 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/hv003-after-1.jpg", "driveFile": ""}
  , {"documentId": "DOC-HV-003-P06", "projectId": "HV-003", "projectName": "Alagbado-Surulere — 12 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 2 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/hv003-after-2.jpg", "driveFile": ""}
  , {"documentId": "DOC-HV-003-P07", "projectId": "HV-003", "projectName": "Alagbado-Surulere — 12 Classroom Block", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 3 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/hv003-after-3.jpg", "driveFile": ""}


  , {"documentId": "DOC-HV-002-F01", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "QUOTATIONS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1_FQQmsVEieos_e1aGJZ3JAOqEe_1f5pk"}
  , {"documentId": "DOC-HV-002-F02", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "PAYMENT REQUIREMENTS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1m46ntVLL2cDVDYgLQCuD0WjvEMQFt7i0"}
  , {"documentId": "DOC-HV-002-F03", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "REPORTS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1eaT5TCfQ8L6yPPIFlPExBxWlohz48eRA"}
  , {"documentId": "DOC-HV-002-F04", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "CONTRACT DEDUCTIONS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1GCDLwiKso2bG6RKaKqG24fF7Ibb8_EoK"}
  , {"documentId": "DOC-HV-002-F05", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "EXPENSE SHEET", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1qkgIMw0vMvwuZqt489Pvxg5cSwA7Rc2T"}
  , {"documentId": "DOC-HV-002-F06", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "AWARD/NOTIFICATION LETTER", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1cLFJ8iEHqrmY_LW276knfkq5owcEYCk0"}
  , {"documentId": "DOC-HV-002-F07", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "BIDDING SUBMISSION", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1rTkWphcyoslRKSCvKwbolfuPcf0GaOg4"}
  , {"documentId": "DOC-HV-002-F08", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "BILL", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=15iiZZt3JFBZiMGnbiPJ-FxG3zWPlvRUJ"}
  , {"documentId": "DOC-HV-002-F09", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "LETTERS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1xJ_Vmbk04jdl8wey80MJwW0OXNKWWRNu"}
  , {"documentId": "DOC-HV-002-F10", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "RECEIPTS/INVOICES", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1qijrbsExOTZR3kISbbove1-t3ppgtORA"}
  , {"documentId": "DOC-HV-002-P01", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — Before", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1CI8RRpWuXoxck1vtKDydVAVOMow7CjDV"}
  , {"documentId": "DOC-HV-002-P02", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — During", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/12toiHkSBvtULptSsGlXZzGt4HWqw1dNP"}
  , {"documentId": "DOC-HV-002-P03", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — After", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1W_RP10FmWtK0MQVEQegzJ0ydA2Oyt0io"}
  , {"documentId": "DOC-HV-002-P05", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 1 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/hv002-after-1.jpg", "driveFile": ""}
  , {"documentId": "DOC-HV-002-P06", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 2 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/hv002-after-2.jpg", "driveFile": ""}
  , {"documentId": "DOC-HV-002-P07", "projectId": "HV-002", "projectName": "Offin-Ikorodu — 6 Classrooms (LOT 4)", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 3 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/hv002-after-3.jpg", "driveFile": ""}


  , {"documentId": "DOC-HV-001-F01", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "WORK PLAN", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1pggIe5a5elaJ888rgiPjaEExgcsVm8Oe"}
  , {"documentId": "DOC-HV-001-F02", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "SNAG LIST", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1mL6sXKtYd1uLUqU-Pc6C4fU-2wQ-i55S"}
  , {"documentId": "DOC-HV-001-F03", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "SPECS/DRAWINGS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1lhnNitJARW-e5_IN9YEbZaNoOAzEmTQD"}
  , {"documentId": "DOC-HV-001-F04", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "EMPLOYEES", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1AjIauUyX6_RDfe1F15N-j4LBQYfWNxSl"}
  , {"documentId": "DOC-HV-001-F05", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "LETTERS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=11-5ekd9GRDu8RhBmtZFKpkwhwh_C1_Df"}
  , {"documentId": "DOC-HV-001-F06", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "3 COMPANIES SUBMISSION", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1gLkXEp6wQE03-iWfsHN98QPSwxVJK2Do"}
  , {"documentId": "DOC-HV-001-F07", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "REPORTS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1TqoQEh_JyQB4nofDijJGT6huY-kHFkQX"}
  , {"documentId": "DOC-HV-001-F08", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "TRAFFIC VOLUME AND NUMBERS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1FdhZmkAeKEjdk2mgyT1tHIcp0ZzG3mro"}
  , {"documentId": "DOC-HV-001-P05", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 1 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/hv001-after-1.jpg", "driveFile": ""}
  , {"documentId": "DOC-HV-001-P06", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 2 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/hv001-after-2.jpg", "driveFile": ""}
  , {"documentId": "DOC-HV-001-P07", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 3 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/hv001-after-3.jpg", "driveFile": ""}

  , {"documentId": "DOC-HV-001-P01", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — Before", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1_T3pvd03_idCuyfO9gzsW0k5h4xc73WD"}
  , {"documentId": "DOC-HV-001-P02", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — During", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/19ClhUJTYTzetXjGZ6e3WuzVgEckyZKOS"}
  , {"documentId": "DOC-HV-001-P03", "projectId": "HV-001", "projectName": "MOT — Intelligent Traffic Signal at 10 Locations", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — After", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1ilIGBeOJ9kwFhePRTRZEKgfTkWqKOHa_"}

  , {"documentId": "DOC-HV-005-F01", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "BID SUBMISSION", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1dc3iqiL4aX4ylhBuKeto3mQp3hJ1SBFY"}
  , {"documentId": "DOC-HV-005-F02", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "COMPLETION LETTER AND ADDITIONAL WORKS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1j-GiSRX3P4muaUM9GfJ3vd1GtJWGuYvO"}
  , {"documentId": "DOC-HV-005-F03", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "JOB PAYMENTS", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1hlAXE_WokFVL2HMIAOGs-dLUXOmsDK4R"}
  , {"documentId": "DOC-HV-005-F04", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "PAYMENT REQUIREMENT", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1Jh9J35ZJlRB46SaV6_rPypBIOX4o0NCR"}
  , {"documentId": "DOC-HV-005-F05", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "SCOPE OF WORK", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1VwNKJ_cUyzbP0fHm-LbJqUZ_4dUqo5-D"}
  , {"documentId": "DOC-HV-005-F06", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "AWARD LETTER/NOTIFICATION", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=13PyMBFyY-nWm4tUwaP3ZWm6iKgvouwix"}
  , {"documentId": "DOC-HV-005-F07", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "CONTRACT DEDUCTION", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1ixAVM3fiCQVyFMRMAFDjOOWfkxPDYiYc"}
  , {"documentId": "DOC-HV-005-F08", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "All", "title": "RECEIPTS/INVOICES", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/open?id=1K5f68pUasnSgKKEVaaGZeJBo_1FwxAxK"}
  , {"documentId": "DOC-HV-005-P01", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — Before", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1Azao9A_ZlwFm3lbd92bzRaDn7kuDih4j"}
  , {"documentId": "DOC-HV-005-P02", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — During", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/1WdPkGeOnKfk8hwKD-_apvgRJncIdaobb"}
  , {"documentId": "DOC-HV-005-P03", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Folder", "stage": "Site Photos", "title": "Site Photos — After", "date": "", "owner": "Digital Ops", "status": "Available", "file": "#", "driveFile": "https://drive.google.com/drive/folders/14L9a66yzmK2zAhLSeJ6mEPQe6puI-f90"}
  , {"documentId": "DOC-HV-005-P05", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 1 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/hv005-after-1.jpg", "driveFile": ""}
  , {"documentId": "DOC-HV-005-P06", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 2 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/hv005-after-2.jpg", "driveFile": ""}
  , {"documentId": "DOC-HV-005-P07", "projectId": "HV-005", "projectName": "Ifako Comprehensive Senior High School", "client": "SCRPS / Lagos State Government", "type": "Image", "stage": "Site Photos", "title": "Site Photo — After 3 (view)", "date": "", "owner": "Digital Ops", "status": "Available", "file": "images/hv005-after-3.jpg", "driveFile": ""}







];

const COMPANIES = ['ZONEWARE LIMITED','BLACKCENT LTD','BOXGROVE LIMITED','HEVELIUS LIMITED','REDWARE LIMITED','RITE FAWN LIMITED','WHIDTROX LTD','ZIXSHELL','ZYTREX LIMITED','DM APARTMENTS'];

const PROJECTS = [{"id": "PL-001", "company": "PLYCON LIMITED", "name": "School for the Visually Impaired (Amuwo-Odofin)", "client": "SCRPS / Lagos State Government", "userDept": "SCRPS / User Department", "sector": "Building Construction", "location": "Amuwo-Odofin, Lagos", "pm": "Engr. Ayodele Ogunnaike", "supervisor": "Chinedu Okafor", "vendor": "Landmark Civil Works Ltd + Prime M&E Services", "contractValue": 5043525532, "mobilization": "60%", "planned": 55, "actual": 38, "forecast": "15-Nov-2026", "plannedEnd": "30-Sep-2026", "delayDays": 46, "status": "Red", "freshness": "Fresh", "daysOld": 1, "stage": "Execution", "priority": "High", "issue": "Completion of classroom block, dormitory block, staff quarters and other works at School for the Visually Impaired.", "delaySource": "Client/Government Approval + Vendor Coordination", "action": "Active — awarded 17 Jul 2025. Progress and payments being tracked.", "owner": "Toyin Adeyemi / Engr. Ayodele Ogunnaike", "due": "31-Jul-2026", "escalate": "Yes", "fileStage": "Execution / Technical Review", "currentOffice": "Project Site + User Department", "daysInStage": 18, "fileOwner": "Engr. Ayodele Ogunnaike / Toyin Adeyemi", "nextAction": "Close technical review comments and update inspection readiness date.", "docs": ["Google Drive folder: Site photos", "BOQ / Scope document", "Latest weekly site report"], "history": [["19-Jul", 45, 30], ["22-Jul", 48, 33], ["25-Jul", 52, 35], ["28-Jul", 55, 38]], "timeline": ["Award Received", "Acceptance Letter", "Insurance Bond", "Mobilization Paid", "Execution / Technical Review", "Inspection Requested", "Completion Certificate", "Payment Processing"], "timelineIndex": 4}, {"id": "ZW-002", "company": "ZONEWARE LIMITED", "name": "Shagamu Construction Project", "client": "Ogun State Works Programme", "userDept": "Works Implementation Unit", "sector": "Construction", "location": "Shagamu", "pm": "Femi Adebayo", "supervisor": "Sola Martins", "vendor": "BuildRight Contractors Ltd", "contractValue": 420000000, "mobilization": "30%", "planned": 45, "actual": 40, "forecast": "30-Oct-2026", "plannedEnd": "15-Oct-2026", "delayDays": 15, "status": "Amber", "freshness": "Fresh", "daysOld": 2, "stage": "Execution", "priority": "High", "issue": "Execution is moving, but progress is slightly behind plan due to vendor resource availability.", "delaySource": "Vendor/Subcontractor", "action": "Agree catch-up programme and confirm manpower/material schedule.", "owner": "Femi Adebayo", "due": "30-Jul-2026", "escalate": "No", "fileStage": "Execution", "currentOffice": "Project Site", "daysInStage": 10, "fileOwner": "Femi Adebayo", "nextAction": "Submit updated progress and material delivery plan.", "docs": ["Site report folder", "Vendor work programme", "Photo evidence folder"], "history": [["19-Jul", 35, 30], ["22-Jul", 38, 34], ["25-Jul", 42, 37], ["28-Jul", 45, 40]], "timeline": ["Award Received", "Acceptance Letter", "Insurance Bond", "Mobilization Paid", "Execution", "Inspection Requested", "Completion Certificate", "Payment Processing"], "timelineIndex": 4}, {"id": "ZW-003", "company": "ZONEWARE LIMITED", "name": "Public School Rehabilitation \u2014 18 Classrooms", "client": "SCRPS", "userDept": "Public Schools Rehabilitation", "sector": "Rehabilitation", "location": "Lagos", "pm": "Aisha Balogun", "supervisor": "Kunle Lawal", "vendor": "MetroBuild Rehabilitation Services", "contractValue": 260000000, "mobilization": "75%", "planned": 68, "actual": 57, "forecast": "20-Sep-2026", "plannedEnd": "05-Sep-2026", "delayDays": 15, "status": "Amber", "freshness": "Aging", "daysOld": 4, "stage": "Execution", "priority": "Medium", "issue": "Finishing work is behind because some materials and vendor sign-offs are pending.", "delaySource": "Material + Vendor Coordination", "action": "Confirm delivery of finishing materials and update classroom-by-classroom completion list.", "owner": "Aisha Balogun / Mr. Deji Falana", "due": "01-Aug-2026", "escalate": "No", "fileStage": "Mobilization Paid / Execution", "currentOffice": "Project Site", "daysInStage": 21, "fileOwner": "Femi Adebayo", "nextAction": "Submit progress evidence for next inspection planning.", "docs": ["Classroom progress photos", "Materials delivery note", "Weekly progress report"], "history": [["16-Jul", 55, 44], ["19-Jul", 60, 49], ["22-Jul", 64, 53], ["24-Jul", 68, 57]], "timeline": ["Award Received", "Acceptance Letter", "Insurance Bond", "Mobilization Paid", "Execution", "Inspection Requested", "Completion Certificate", "Payment Processing"], "timelineIndex": 4}, {"id": "ZW-004", "company": "ZONEWARE LIMITED", "name": "Ojodu Bus Terminal Facility Management", "client": "LAMATA", "userDept": "Transport User Department", "sector": "Facility Management", "location": "Ojodu-Berger, Lagos", "pm": "Ifeanyi Nwachukwu", "supervisor": "Mariam Yusuf", "vendor": "Zonecare Facility Operations Team", "contractValue": 90000000, "mobilization": "Monthly", "planned": 75, "actual": 75, "forecast": "31-Dec-2026", "plannedEnd": "31-Dec-2026", "delayDays": 0, "status": "Green", "freshness": "Fresh", "daysOld": 1, "stage": "Ongoing FM", "priority": "Medium", "issue": "Routine facility management ongoing. No critical operational issue currently reported.", "delaySource": "No Delay", "action": "Maintain weekly FM report and monthly invoice documentation.", "owner": "Ifeanyi Nwachukwu", "due": "31-Jul-2026", "escalate": "No", "fileStage": "Monthly Invoice / User Dept Sign-off", "currentOffice": "LAMATA / User Department", "daysInStage": 6, "fileOwner": "Ifeanyi Nwachukwu", "nextAction": "Obtain monthly sign-off and submit invoice support documents.", "docs": ["FM weekly report", "Maintenance request log", "Monthly invoice support"], "history": [["19-Jul", 70, 70], ["22-Jul", 72, 72], ["25-Jul", 74, 74], ["28-Jul", 75, 75]], "timeline": ["Contract Active", "Monthly Service Delivery", "User Dept Sign-off", "Invoice Submitted", "Payment Processing", "Payment Received"], "timelineIndex": 2}, {"id": "ZW-005", "company": "REDWARE LIMITED", "name": "MOT-2 Intelligent Traffic Signal at 12 Locations", "client": "Ministry of Transportation (MOT)", "userDept": "Traffic / Transport Unit", "sector": "Traffic Systems", "location": "Lagos — 12 junctions", "pm": "Tunde Ogunleye", "supervisor": "Adewale Johnson", "vendor": "SignalTech Systems Ltd", "contractValue": 353623148, "mobilization": "50%", "planned": 82, "actual": 70, "forecast": "25-Aug-2026", "plannedEnd": "10-Aug-2026", "delayDays": 15, "status": "Amber", "freshness": "Fresh", "daysOld": 1, "stage": "Installation / Testing", "priority": "High", "issue": "Supply & installation of standardized intelligent traffic signal light at 12 locations (MOT/W/DC/16/2020).", "delaySource": "Inspection + External Vendor", "action": "Completed — award 29 Sep 2020, contract N353,623,147.66.", "owner": "Tunde Ogunleye / Toyin Adeyemi", "due": "30-Jul-2026", "escalate": "Yes", "fileStage": "Inspection Requested", "currentOffice": "Ministry Inspector / User Department", "daysInStage": 12, "fileOwner": "Toyin Adeyemi", "nextAction": "Follow up inspection schedule and document completed junctions.", "docs": ["Junction photo evidence", "Testing checklist", "Inspection request letter"], "history": [["19-Jul", 70, 61], ["22-Jul", 74, 65], ["25-Jul", 78, 68], ["28-Jul", 82, 70]], "timeline": ["Award Received", "Mobilization Paid", "Installation", "Testing", "Inspection Requested", "Inspection Completed", "Completion Certificate", "Payment Processing"], "timelineIndex": 4}, {"id": "ZW-006", "company": "BLACKCENT LTD", "name": "Road Marking and Lane Signage Works", "client": "Ministry of Transportation", "userDept": "Road / Traffic Unit", "sector": "Road Marking", "location": "Lagos", "pm": "Kemi Salami", "supervisor": "Peter Udo", "vendor": "BrightLine Road Markings Ltd", "contractValue": 180000000, "mobilization": "70%", "planned": 62, "actual": 64, "forecast": "18-Aug-2026", "plannedEnd": "20-Aug-2026", "delayDays": 0, "status": "Green", "freshness": "Fresh", "daysOld": 1, "stage": "Execution", "priority": "Medium", "issue": "Work is slightly ahead of planned progress. Payment file movement should be monitored early.", "delaySource": "No Delay", "action": "Continue execution and prepare early documentation for inspection.", "owner": "Femi Adebayo", "due": "31-Jul-2026", "escalate": "No", "fileStage": "Execution", "currentOffice": "Project Site", "daysInStage": 8, "fileOwner": "Femi Adebayo", "nextAction": "Compile executed sections and photo evidence.", "docs": ["Road marking photos", "Executed sections register", "Material usage sheet"], "history": [["19-Jul", 50, 50], ["22-Jul", 54, 56], ["25-Jul", 58, 60], ["28-Jul", 62, 64]], "timeline": ["Award Received", "Mobilization Paid", "Execution", "Inspection Requested", "Completion Certificate", "CIA / STO", "Payment Released"], "timelineIndex": 2}, {"id": "ZW-007", "company": "ZONEWARE LIMITED", "name": "Median Kerb and Signage Installation", "client": "Ministry of Works / Transportation", "userDept": "Road Infrastructure Unit", "sector": "Road Infrastructure", "location": "Lagos", "pm": "Musa Bello", "supervisor": "Grace Eze", "vendor": "KerbWorks Infrastructure Ltd", "contractValue": 240000000, "mobilization": "50%", "planned": 44, "actual": 31, "forecast": "05-Oct-2026", "plannedEnd": "15-Sep-2026", "delayDays": 20, "status": "Amber", "freshness": "Stale", "daysOld": 7, "stage": "Execution", "priority": "High", "issue": "Latest structured update is overdue. Vendor progress needs verification and photo evidence update.", "delaySource": "Stale Update + Vendor/Subcontractor", "action": "Obtain fresh site update, verify vendor progress, and upload time-stamped photos.", "owner": "Musa Bello / Grace Eze", "due": "29-Jul-2026", "escalate": "Yes", "fileStage": "Execution", "currentOffice": "Project Site", "daysInStage": 14, "fileOwner": "Femi Adebayo", "nextAction": "Submit overdue update and confirm whether recovery plan is required.", "docs": ["Last site photo folder", "Vendor progress note", "Pending update required"], "history": [["13-Jul", 28, 20], ["16-Jul", 34, 24], ["19-Jul", 39, 28], ["21-Jul", 44, 31]], "timeline": ["Award Received", "Mobilization Paid", "Execution", "Inspection Requested", "Completion Certificate", "Payment Processing"], "timelineIndex": 2}, ];

const COST_DATA={
  'PL-001':{certified:323000000,paid:255000000,retention:42500000,variation:0},
  'ZW-002':{certified:168000000,paid:126000000,retention:21000000,variation:0},
  'ZW-003':{certified:148200000,paid:104000000,retention:13000000,variation:0},
  'ZW-004':{certified:67500000,paid:54000000,retention:4500000,variation:0},
  'ZW-005':{certified:266000000,paid:190000000,retention:19000000,variation:15000000},
  'ZW-006':{certified:115200000,paid:90000000,retention:9000000,variation:0},
  'ZW-007':{certified:74400000,paid:56000000,retention:12000000,variation:0}
};

const RISKS=[
  {id:'RISK-001',projectId:'ZW-005',risk:'Inspection delay may affect completion and payment processing.',probability:'High',impact:'High',owner:'Toyin Adeyemi',mitigation:'Request joint inspection schedule and escalate overdue dates.',status:'High'},
  {id:'RISK-002',projectId:'ZW-002',risk:'Vendor resource constraint slowing execution progress.',probability:'Medium',impact:'Medium',owner:'Femi Adebayo',mitigation:'Agree recovery programme and verify manpower plan.',status:'Medium'},
  {id:'RISK-003',projectId:'ZW-007',risk:'Stale site update — no structured progress report in over 6 days.',probability:'High',impact:'Medium',owner:'Musa Bello',mitigation:'Submit fresh update and time-stamped photos.',status:'High'},
  {id:'RISK-004',projectId:'PL-001',risk:'Work progress below planned level due to complex accessibility requirements and pending technical approvals.',probability:'High',impact:'High',owner:'Engr. Ayodele Ogunnaike',mitigation:'Confirm outstanding approvals and agree recovery plan with vendor.',status:'High'},
  {id:'RISK-005',projectId:'ZW-003',risk:'Finishing materials and vendor sign-offs pending.',probability:'Medium',impact:'Medium',owner:'Aisha Balogun',mitigation:'Confirm delivery of finishing materials and update completion list.',status:'Medium'},
  {id:'RISK-006',projectId:'ZW-005',risk:'Testing and government inspection pending for selected junctions.',probability:'Medium',impact:'High',owner:'Tunde Ogunleye',mitigation:'Prepare junction completion checklist and request joint inspection dates.',status:'Medium'}
];

const SITE_PHOTOS=[
  {id:'PH-001',projectId:'PL-001',project:'School for the Blind, Festac',stage:'Execution',type:'Site Photo',description:'Foundation and accessibility ramp progress',uploadedBy:'Chinedu Okafor',role:'Site Supervisor',date:'28-Jul-2026',time:'14:32',file:'sample_documents/DOC-PL-001-003_Site_Progress_Report_Sample.pdf'},
  {id:'PH-002',projectId:'ZW-002',project:'Shagamu Construction Project',stage:'Execution',type:'Weekly Report',description:'Week 8 progress report with photo evidence',uploadedBy:'Femi Adebayo',role:'Project Manager',date:'27-Jul-2026',time:'09:15',file:'sample_documents/DOC-ZW-002-001_Vendor_Recovery_Programme_Sample.pdf'},
  {id:'PH-003',projectId:'ZW-003',project:'Public School Rehabilitation — 18 Classrooms',stage:'Execution',type:'Site Photo',description:'Classroom 12 finishing work — interior',uploadedBy:'Aisha Balogun',role:'Project Manager',date:'24-Jul-2026',time:'16:45',file:'sample_documents/DOC-ZW-003-001_Classroom_Progress_Report_Sample.pdf'},
  {id:'PH-004',projectId:'ZW-004',project:'Ojodu Bus Terminal Facility Management',stage:'Monthly Sign-Off',type:'FM Report',description:'Weekly facility condition and maintenance log',uploadedBy:'Ifeanyi Nwachukwu',role:'Facility Manager',date:'28-Jul-2026',time:'11:20',file:'sample_documents/DOC-ZW-004-001_Weekly_FM_Report_Sample.pdf'},
  {id:'PH-005',projectId:'ZW-005',project:'Traffic Light Installation Programme',stage:'Testing',type:'Inspection Photo',description:'Junction 3 controller testing evidence',uploadedBy:'Adewale Johnson',role:'Traffic Systems Supervisor',date:'27-Jul-2026',time:'13:05',file:'sample_documents/DOC-ZW-005-002_Junction_Testing_Checklist_Sample.pdf'},
  {id:'PH-006',projectId:'ZW-005',project:'Traffic Light Installation Programme',stage:'Inspection Request',type:'Inspection Evidence',description:'Inspection request letter with junction photos',uploadedBy:'Toyin Adeyemi',role:'Contract Lead',date:'26-Jul-2026',time:'10:00',file:'sample_documents/DOC-ZW-005-001_Inspection_Request_Sample.pdf'},
  {id:'PH-007',projectId:'ZW-006',project:'Road Marking and Lane Signage Works',stage:'Execution',type:'Site Photo',description:'Completed section A-B road marking evidence',uploadedBy:'Kemi Salami',role:'Project Manager',date:'28-Jul-2026',time:'15:40',file:'sample_documents/DOC-ZW-006-001_Executed_Sections_Register_Sample.pdf'},
  {id:'PH-008',projectId:'PL-001',project:'School for the Blind, Festac',stage:'Execution',type:'Site Photo',description:'Accessibility railing installation close-up',uploadedBy:'Chinedu Okafor',role:'Site Supervisor',date:'25-Jul-2026',time:'08:50',file:'sample_documents/DOC-PL-001-003_Site_Progress_Report_Sample.pdf'},
  {id:'PH-009',projectId:'ZW-007',project:'Median Kerb and Signage Installation',stage:'Execution',type:'Site Photo',description:'Median kerb progress — Section 2',uploadedBy:'Grace Eze',role:'Site Supervisor',date:'21-Jul-2026',time:'17:10',file:'sample_documents/DOC-ZW-007-001_Vendor_Progress_Update_Request_Sample.pdf'},
];

const ACCESS_CODES={
  'ayodele.ogunnaike@zonewareltd.com': {code:'ZW-4801', name:'Engr. Ayodele Ogunnaike', role:'Project Manager'},
  'toyin.adeyemi@zonewareltd.com': {code:'ZW-7293', name:'Toyin Adeyemi', role:'Contract Lead'},
  'femi.adebayo@zonewareltd.com': {code:'ZW-1056', name:'Femi Adebayo', role:'Project Manager'},
  'aisha.balogun@zonewareltd.com': {code:'ZW-3387', name:'Aisha Balogun', role:'Project Manager'},
  'chinedu.okafor@zonewareltd.com': {code:'ZW-6614', name:'Chinedu Okafor', role:'Site Supervisor'},
  'adewale.johnson@zonewareltd.com': {code:'ZW-8429', name:'Adewale Johnson', role:'Traffic Systems Supervisor'},
  'kemi.salami@zonewareltd.com': {code:'ZW-2150', name:'Kemi Salami', role:'Project Manager'},
  'musa.bello@zonewareltd.com': {code:'ZW-5578', name:'Musa Bello', role:'Project Manager'},
  'grace.eze@zonewareltd.com': {code:'ZW-9063', name:'Grace Eze', role:'Site Supervisor'},
  'ifeanyi.nwachukwu@zonewareltd.com': {code:'ZW-1742', name:'Ifeanyi Nwachukwu', role:'Facility Manager'},
  'tunde.ogunleye@zonewareltd.com': {code:'ZW-3895', name:'Tunde Ogunleye', role:'Project Manager'},
  'md@zonewareltd.com': {code:'ZW-0001', name:'Managing Director', role:'MD'},
  'accounts@zonewareltd.com': {code:'ZW-6000', name:'Accounts', role:'Accounts'},
};

const TASKS_SEED=[{"id": "UP-001", "project": "School for the Blind, Festac", "projectId": "PL-001", "stageNo": 0, "stage": "Contract Documentation", "required": "BOQ / Scope Summary", "assigned": "Engr. Ayodele Ogunnaike", "role": "Project Manager", "status": "Signed Off", "uploadedBy": "Engr. Ayodele Ogunnaike", "signedBy": "Engr. Ayodele Ogunnaike", "date": "14-Jun-2026", "file": "sample_documents/DOC-PL-001-002_BOQ_Scope_Summary_Sample.pdf", "due": "14-Jun-2026"}, {"id": "UP-007", "project": "School for the Blind, Festac", "projectId": "PL-001", "stageNo": 2, "stage": "Execution", "required": "Site Progress Report", "assigned": "Chinedu Okafor", "role": "Site Supervisor", "status": "Signed Off", "uploadedBy": "Chinedu Okafor", "signedBy": "Chinedu Okafor", "date": "28-Jul-2026", "file": "sample_documents/DOC-PL-001-003_Site_Progress_Report_Sample.pdf", "due": "28-Jul-2026"}, {"id": "UP-002", "project": "Traffic Light Installation Programme", "projectId": "ZW-005", "stageNo": 4, "stage": "Inspection Request", "required": "Inspection Request Letter", "assigned": "Toyin Adeyemi", "role": "Contract Lead", "status": "Signed Off", "uploadedBy": "Toyin Adeyemi", "signedBy": "Toyin Adeyemi", "date": "26-Jul-2026", "file": "sample_documents/DOC-ZW-005-001_Inspection_Request_Sample.pdf", "due": "26-Jul-2026"}, {"id": "UP-008", "project": "Traffic Light Installation Programme", "projectId": "ZW-005", "stageNo": 3, "stage": "Testing", "required": "Junction Testing Checklist", "assigned": "Adewale Johnson", "role": "Traffic Systems Supervisor", "status": "Signed Off", "uploadedBy": "Adewale Johnson", "signedBy": "Adewale Johnson", "date": "27-Jul-2026", "file": "sample_documents/DOC-ZW-005-002_Junction_Testing_Checklist_Sample.pdf", "due": "27-Jul-2026"}, {"id": "UP-003", "project": "Median Kerb and Signage Installation", "projectId": "ZW-007", "stageNo": 2, "stage": "Execution", "required": "Vendor Progress Update", "assigned": "Musa Bello", "role": "Project Manager", "status": "Pending Upload", "uploadedBy": "\u2014", "signedBy": "\u2014", "date": "\u2014", "file": "", "due": "29-Jul-2026"}, {"id": "UP-004", "project": "Median Kerb and Signage Installation", "projectId": "ZW-007", "stageNo": 2, "stage": "Execution", "required": "Site Photo Evidence", "assigned": "Grace Eze", "role": "Site Supervisor", "status": "Pending Upload", "uploadedBy": "\u2014", "signedBy": "\u2014", "date": "\u2014", "file": "", "due": "29-Jul-2026"}, {"id": "UP-005", "project": "Ojodu Bus Terminal Facility Management", "projectId": "ZW-004", "stageNo": 2, "stage": "Monthly Sign-Off", "required": "Weekly FM Report", "assigned": "Ifeanyi Nwachukwu", "role": "Facility Manager", "status": "Signed Off", "uploadedBy": "Ifeanyi Nwachukwu", "signedBy": "Ifeanyi Nwachukwu", "date": "28-Jul-2026", "file": "sample_documents/DOC-ZW-004-001_Weekly_FM_Report_Sample.pdf", "due": "28-Jul-2026"}, {"id": "UP-006", "project": "Road Marking and Lane Signage Works", "projectId": "ZW-006", "stageNo": 2, "stage": "Execution", "required": "Executed Sections Register", "assigned": "Kemi Salami", "role": "Project Manager", "status": "Uploaded - Awaiting Review", "uploadedBy": "Kemi Salami", "signedBy": "Kemi Salami", "date": "28-Jul-2026", "file": "sample_documents/DOC-ZW-006-001_Executed_Sections_Register_Sample.pdf", "due": "28-Jul-2026"}, {"id": "UP-009", "project": "Traffic Light Installation Programme", "projectId": "ZW-005", "stageNo": 3, "stage": "Testing", "required": "Controller Calibration Evidence", "assigned": "Adewale Johnson", "role": "Traffic Systems Supervisor", "status": "Pending Upload", "uploadedBy": "\u2014", "signedBy": "\u2014", "date": "\u2014", "file": "", "due": "31-Jul-2026"}, {"id": "UP-010", "project": "School for the Blind, Festac", "projectId": "PL-001", "stageNo": 2, "stage": "Execution", "required": "Updated Site Photo Evidence", "assigned": "Chinedu Okafor", "role": "Site Supervisor", "status": "Pending Upload", "uploadedBy": "\u2014", "signedBy": "\u2014", "date": "\u2014", "file": "", "due": "31-Jul-2026"}, {"id": "UP-011", "project": "Traffic Light Installation Programme", "projectId": "ZW-005", "stageNo": 4, "stage": "Inspection Follow-Up", "required": "Inspector Visit Confirmation Note", "assigned": "Toyin Adeyemi", "role": "Contract Lead", "status": "Uploaded - Awaiting Review", "uploadedBy": "Toyin Adeyemi", "signedBy": "Pending MD/Reviewer", "date": "30-Jul-2026", "file": "sample_documents/DOC-ZW-005-001_Inspection_Request_Sample.pdf", "due": "31-Jul-2026"}, {"id": "UP-012", "project": "Public School Rehabilitation — 18 Classrooms", "projectId": "ZW-003", "stageNo": 2, "stage": "Execution", "required": "Classroom-by-Classroom Completion List", "assigned": "Aisha Balogun", "role": "Project Manager", "status": "Pending Upload", "uploadedBy": "—", "signedBy": "—", "date": "—", "file": "", "due": "01-Aug-2026"}, {"id": "UP-013", "project": "Shagamu Construction Project", "projectId": "ZW-002", "stageNo": 2, "stage": "Execution", "required": "Vendor Recovery Programme", "assigned": "Femi Adebayo", "role": "Project Manager", "status": "Signed Off", "uploadedBy": "Femi Adebayo", "signedBy": "Femi Adebayo", "date": "27-Jul-2026", "file": "sample_documents/DOC-ZW-002-001_Vendor_Recovery_Programme_Sample.pdf", "due": "27-Jul-2026"}];

const ALL_PHOTOS=[
  {id:'PH-001',projectId:'PL-001',project:'School for the Blind, Festac',stage:'Execution',type:'Site Photo',description:'Foundation and accessibility ramp progress',uploadedBy:'Chinedu Okafor',role:'Site Supervisor',date:'28-Jul-2026',time:'14:32'},
  {id:'PH-002',projectId:'ZW-002',project:'Shagamu Construction Project',stage:'Execution',type:'Weekly Report',description:'Week 8 progress report with photo evidence',uploadedBy:'Femi Adebayo',role:'Project Manager',date:'27-Jul-2026',time:'09:15'},
  {id:'PH-003',projectId:'ZW-005',project:'Traffic Light Installation Programme',stage:'Testing',type:'Inspection Photo',description:'Junction 3 controller testing evidence',uploadedBy:'Adewale Johnson',role:'Traffic Systems Supervisor',date:'27-Jul-2026',time:'13:05'},
  {id:'PH-004',projectId:'ZW-006',project:'Road Marking and Lane Signage Works',stage:'Execution',type:'Site Photo',description:'Completed section A-B road marking evidence',uploadedBy:'Kemi Salami',role:'Project Manager',date:'28-Jul-2026',time:'15:40'},
  {id:'PH-005',projectId:'PL-001',project:'School for the Blind, Festac',stage:'Execution',type:'Site Photo',description:'Accessibility railing installation close-up',uploadedBy:'Chinedu Okafor',role:'Site Supervisor',date:'25-Jul-2026',time:'08:50'},
  {id:'PH-006',projectId:'ZW-007',project:'Median Kerb and Signage Installation',stage:'Execution',type:'Site Photo',description:'Median kerb progress — Section 2',uploadedBy:'Grace Eze',role:'Site Supervisor',date:'21-Jul-2026',time:'17:10'},
];


/* ---------- shared helpers ---------- */
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const money=n=>{n=Number(n)||0; if(n>=1000000000) return '₦'+(n/1000000000).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})+'bn'; if(n>=1000000) return '₦'+(n/1000000).toLocaleString(undefined,{maximumFractionDigits:0})+'m'; if(n>=1000) return '₦'+(n/1000).toLocaleString(undefined,{maximumFractionDigits:0})+'k'; return '₦'+n.toLocaleString();};
const pct=n=>Number(n).toFixed(0)+'%';
const cls=s=>({Green:'green',Amber:'amber',Red:'red',Fresh:'green',Aging:'amber',Stale:'red',High:'red',Medium:'amber',Low:'green',Yes:'red',No:'green'}[s]||'grey');
const orderStatus=s=>({Red:3,Amber:2,Green:1}[s]||0);
const orderPriority=s=>({High:3,Medium:2,Low:1}[s]||0);
const unique=a=>[...new Set(a)].filter(Boolean).sort();
const initials=n=>String(n||'').split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();
const statusClass=s=>s==='Signed Off'?'signed':String(s).includes('Awaiting')?'review':String(s).includes('Pending')?'pending':'review';
const todayStr=()=>new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).replace(/ /g,'-');
function costInfo(p){const d=COST_DATA[p.id]||{};const certified=d.certified||0;const paid=d.paid||0;const retention=d.retention||0;const variation=d.variation||0;const outstanding=Math.max(0,certified-paid);return {certified,paid,retention,outstanding,variation};}

/* ---------- session / storage ---------- */
const ZCC={
  SESSION_KEY:'zcc.session.v1',
  user(){
    try{
      const email=localStorage.getItem(this.SESSION_KEY);
      if(email && ACCESS_CODES[email]) return Object.assign({email},ACCESS_CODES[email]);
    }catch(e){}
    return null;
  },
  signIn(email){ try{localStorage.setItem(this.SESSION_KEY,email);}catch(e){} },
  signOut(){ try{localStorage.removeItem(this.SESSION_KEY);}catch(e){} location.href='00_Login.html'; },
  homeFor(u){ return (u.role==='MD'||u.role==='Accounts') ? '01_Dashboard.html' : '10_Staff_Dashboard.html'; },
  requireAuth(){
    if(document.body.dataset.public==='1') return null;
    const u=this.user();
    if(!u){ location.replace('00_Login.html'); return null; }
    return u;
  },

  /* tasks: seeded above, persisted per browser so a sign-off on one
     page is visible on every other page */
  TASKS_KEY:'zcc.tasks.v1',
  tasks(){
    try{
      const raw=localStorage.getItem(this.TASKS_KEY);
      if(raw){const arr=JSON.parse(raw); if(Array.isArray(arr)&&arr.length) return arr;}
    }catch(e){}
    return TASKS_SEED.map(t=>Object.assign({},t));
  },
  saveTasks(arr){ try{localStorage.setItem(this.TASKS_KEY,JSON.stringify(arr));}catch(e){} },

  /* staff-uploaded photo metadata */
  PHOTOS_KEY:'zcc.myphotos.v1',
  myPhotos(){
    try{const raw=localStorage.getItem(this.PHOTOS_KEY); if(raw){const a=JSON.parse(raw); if(Array.isArray(a)) return a;}}catch(e){}
    return [];
  },
  saveMyPhotos(a){ try{localStorage.setItem(this.PHOTOS_KEY,JSON.stringify(a));}catch(e){} }
};

/* Live task store — refreshed with TASKS=ZCC.tasks() after sign-off. */
let TASKS=null;

/* ============================================================
   Zonexa v1.0 — PORTAL REGISTRY & EXTENDED DATA LAYER
   Adds the multi-portal model, Super Admin role, government
   file-tracking data, and role-based portal routing. Keeps all
   ZCC v1.0 data above intact.
   ============================================================ */

/* ---- extra identities (Super Admin + alias roles) ---- */
ACCESS_CODES['admin@zonewareltd.com']       = {code:'ZW-9999', name:'Super Admin',       role:'Super Admin'};
ACCESS_CODES['digitalops@zonewareltd.com']  = {code:'ZW-7777', name:'Digital Ops / Admin', role:'Digital Ops'};
ACCESS_CODES['toyin.adeyemi@zonewareltd.com'].portal='contract';
ACCESS_CODES['accounts@zonewareltd.com'].portal='accounts';

/* ---- portal registry (landing = first portal for a role) ---- */
const PORTALS = {
  cc:      { title:'Command Center',  home:'01_Dashboard.html'            },
  staff:   { title:'Staff Workspace', home:'10_Staff_Dashboard.html'      },
  contract:{ title:'Contract Portal', home:'14_Contract_Dashboard.html'   },
  accounts:{ title:'Accounts Portal', home:'17_Accounts_Dashboard.html'   },
  admin:   { title:'Admin Console',   home:'20_Admin_Console.html'        }
};

/* ---- government file-tracking (Contract Portal) ----
   daysInStage shown as demo snapshot values; in production it is
   derived = today() - entered_at (see blueprint §7.2). */
const FILE_TRACKING = [
  { id:'FT-001', projectId:'PL-001', project:'School for the Blind, Festac', client:'Lagos State Ministry / Education',
    file:'Execution / Technical Review file', office:'User Dept + Project Site', entered:'17-Jul-2026',
    expectedDays:10, daysInStage:18, status:'Red', nextAction:'Close technical review comments; update inspection readiness date.' },
  { id:'FT-002', projectId:'ZW-002', project:'Shagamu Construction Project', client:'Ogun State Works Programme',
    file:'Execution file', office:'Works Implementation Unit', entered:'24-Jul-2026',
    expectedDays:7, daysInStage:10, status:'Amber', nextAction:'Agree catch-up programme; confirm manpower/material schedule.' },
  { id:'FT-003', projectId:'ZW-003', project:'Public School Rehabilitation — 18 Classrooms', client:'SCRPS',
    file:'Mobilization / Execution file', office:'Public Schools Rehabilitation', entered:'14-Jul-2026',
    expectedDays:14, daysInStage:21, status:'Amber', nextAction:'Confirm finishing-material delivery; update classroom completion list.' },
  { id:'FT-004', projectId:'ZW-004', project:'Ojodu Bus Terminal Facility Management', client:'LAMATA',
    file:'Monthly invoice / sign-off file', office:'LAMATA / User Department', entered:'30-Jul-2026',
    expectedDays:7, daysInStage:6, status:'Green', nextAction:'Obtain monthly sign-off; submit invoice support documents.' },
  { id:'FT-005', projectId:'ZW-005', project:'Traffic Light Installation Programme', client:'Ministry of Transportation',
    file:'Inspection file', office:'Ministry Inspector / User Department', entered:'23-Jul-2026',
    expectedDays:7, daysInStage:12, status:'Red', nextAction:'Follow up inspection schedule; document completed junctions.' },
  { id:'FT-006', projectId:'ZW-006', project:'Road Marking and Lane Signage Works', client:'Ministry of Transportation',
    file:'Execution file', office:'Road / Traffic Unit', entered:'28-Jul-2026',
    expectedDays:10, daysInStage:8, status:'Green', nextAction:'Compile executed sections and photo evidence for inspection.' },
  { id:'FT-007', projectId:'ZW-007', project:'Median Kerb and Signage Installation', client:'Ministry of Works / Transportation',
    file:'Execution file', office:'Road Infrastructure Unit', entered:'21-Jul-2026',
    expectedDays:7, daysInStage:14, status:'Red', nextAction:'Submit overdue update; verify vendor progress with time-stamped photos.' }
];

/* ---- approval sequence (Department → Finance → Operations → MD) ---- */
const APPROVAL_FLOW = ['Department', 'Finance', 'Operations', 'MD'];

/* ---- role → portal routing (Zonexa) ----
   The first portal in the list is the role's landing portal. */
Object.assign(ZCC, {
  portalsFor(u){
    if (!u) return [];
    switch (u.role) {
      case 'MD':            return ['cc', 'staff', 'contract', 'accounts'];
      case 'Accounts':      return ['accounts', 'cc'];
      case 'Contract Lead': return ['contract', 'staff'];
      case 'Super Admin':   return ['admin'];
      case 'Digital Ops':   return ['admin', 'cc'];
      default:              return ['staff'];
    }
  },
  canAccess(u, portal){ return this.portalsFor(u).indexOf(portal) !== -1; },
  homeFor(u){ const k = this.portalsFor(u)[0] || 'staff'; return PORTALS[k] ? PORTALS[k].home : '10_Staff_Dashboard.html'; },
  requireAuth(){
    if (document.body.dataset.public === '1') return null;
    const email = this.user();
    if (!email) { location.replace('00_Login.html'); return null; }
    return email;
  }
});

/* session security epoch / idle timeout / audit / live session registry
   (lightweight browser version of the production server-side controls) */
Object.assign(ZCC, {
  EPOCH_KEY: 'zcc.epoch.v1',
  epoch(){ try { return Number(localStorage.getItem(this.EPOCH_KEY)) || 1; } catch(e){ return 1; } },
  bumpEpoch(){ try { localStorage.setItem(this.EPOCH_KEY, String(this.epoch()+1)); } catch(e){} },
  CONFIG_KEY: 'zcc.admin.config.v1',
  config(){ try { const o=JSON.parse(localStorage.getItem(this.CONFIG_KEY)||'null'); if(o&&o.timeout) return o; } catch(e){} return { timeout: 30 }; },
  saveConfig(c){ try { localStorage.setItem(this.CONFIG_KEY, JSON.stringify(c)); } catch(e){} },
  AUDIT_KEY: 'zcc.audit.v1',
  auditLog(){ try { const a=JSON.parse(localStorage.getItem(this.AUDIT_KEY)||'null'); if(Array.isArray(a)) return a; } catch(e){} return []; },
  logAudit(who, what, meta){
    try {
      const a=this.auditLog();
      a.unshift({ t:new Date().toISOString(), who:String(who||'').slice(0,60), what:String(what||'').slice(0,140), meta:meta?String(meta).slice(0,140):'' });
      localStorage.setItem(this.AUDIT_KEY, JSON.stringify(a.slice(0,200)));
    } catch(e){}
  },
  usersStore(){ try { const o=JSON.parse(localStorage.getItem('zcc.admin.users.v1')||'null'); if(o&&typeof o==='object') return o; } catch(e){} return {}; },
  saveUsers(o){ try { localStorage.setItem('zcc.admin.users.v1', JSON.stringify(o)); } catch(e){} },
  allUsers(){
    const merged = {};
    Object.entries(ACCESS_CODES).forEach(([email, info]) => { merged[email] = Object.assign({ active: true }, info); });
    Object.entries(this.usersStore()).forEach(([email, info]) => { merged[email] = Object.assign({ active: info.active !== false }, info); });
    return merged;
  },
  /* Is this access code currently usable? A user is blocked if their
     stored override carries active:false (revoked) — revocation must win
     over the seed. */
  isUsable(code){
    for (const [email, info] of Object.entries(this.allUsers())) {
      if (info.code === code) {
        const ov = this.usersStore()[email];
        return ov ? !(ov.active === false) : true;
      }
    }
    return false;
  },
  signIn(email){
    const info = this.allUsers()[email];
    if (!info) return;
    this.logAudit(info.name, 'SIGN_IN', 'portal:' + (info.portal || 'staff'));
    localStorage.setItem(this.SESSION_KEY, email);
  },
  signOut(){
    const u = this.user();
    if (u) this.logAudit(u.name, 'SIGN_OUT', '');
    localStorage.removeItem(this.SESSION_KEY);
    location.href = '00_Login.html';
  }
});

/* ============================================================
   Zonexa v1.0 — LIVE UPDATE LAYER
   Lets every portal write to the shared data and persist to the
   browser (single source of truth for the demo; a shared DB in
   production). Statuses recompute automatically from the data —
   never hand-typed. Every write is snapshotted and audited.
   ============================================================ */
const LIVE_KEY = 'zcc.live.v1';
function loadLive(){
  try { const o = JSON.parse(localStorage.getItem(LIVE_KEY) || 'null'); if (o && typeof o === 'object') return o; } catch(e){}
  return {};
}
function saveLive(o){ try { localStorage.setItem(LIVE_KEY, JSON.stringify(o)); } catch(e){} }
/* company per project from the seed — used to back-fill live snapshots
   saved before the multi-company field existed, so a stale browser cache
   always still shows the right company (no manual reset needed). */
const SEED_COMPANY = {}; PROJECTS.forEach(p => { if (p.company) SEED_COMPANY[p.id] = p.company; });
(function applyLive(){
  const live = loadLive();
  if (live.projects && Array.isArray(live.projects) && live.projects.length){
    PROJECTS.length = 0;
    live.projects.forEach(x => { if (!x.company) x.company = SEED_COMPANY[x.id] || ''; PROJECTS.push(x); });
  }
  if (live.files && Array.isArray(live.files) && live.files.length){ FILE_TRACKING.length = 0; live.files.forEach(x => FILE_TRACKING.push(x)); }
  if (live.costs && typeof live.costs === 'object'){ Object.keys(live.costs).forEach(k => { COST_DATA[k] = live.costs[k]; }); }
  if (live.documents && Array.isArray(live.documents) && live.documents.length){ DOCUMENTS.length = 0; live.documents.forEach(x => DOCUMENTS.push(x)); }
})();
ZCC.snapshot = function(){
  saveLive({ projects: PROJECTS, files: FILE_TRACKING, costs: COST_DATA, documents: DOCUMENTS });
};

/* ============================================================
   Zonexa v1.0 — DOCUMENT UPLOAD TIMESTAMPS
   Every document carries an uploader + full timestamp
   (date + time). Seed docs get a deterministic time so the
   register is complete; new uploads stamp the real date/time.
   ============================================================ */
const SEED_TIMES = ['10:24','14:05','09:47','11:30','16:12','08:58','13:19','15:44','12:03','17:21'];
DOCUMENTS.forEach((d, i) => {
  if (!d.time) d.time = SEED_TIMES[i % SEED_TIMES.length] || '09:00';
  d.uploadedAt = d.uploadedAt || (d.date + ' ' + d.time);
});

/* ============================================================
   Zonexa v1.0 — SOP & COMPLIANCE MODULE (framework)
   ─────────────────────────────────────────────────────────────
   NOTE ON OWNERSHIP: The CONTENT here is SAMPLE/PLACEHOLDER
   only — the authoritative SOPs and compliance requirements come
   from Blessing's systems-audit / SOP documentation (the "what").
   This module provides the MECHANISM (the "how"): the registry,
   the 30/60/90-day expiry engine, and the compliance dashboard.
   Replace sample items with the real SOPs when they are issued.
   ─────────────────────────────────────────────────────────────
   Expiry is computed live (days to expiry from today), so the
   module always reflects current status. expInDays = days from
   today until expiry; negative = already expired.
   ============================================================ */
const SOP_REGISTRY = [
  { id:'SOP-001', title:'Contract Bidding & Tendering', version:2, owner:'Contract Lead', review:'Annually', applies:'All new bids',
    summary:'End-to-end procedure from budget mapping to bid submission, including BPP compliance. [SAMPLE — replace with Blessing SOP.]' , file:'sop_documents/SOP-001_Contract_Bidding_and_Tendering.pdf' },
  { id:'SOP-002', title:'Government File Tracking', version:1, owner:'Contract Lead / PM', review:'Annually', applies:'All projects',
    summary:'Process for moving files through offices (User Dept, Engineering, Accounts, STO, CIA) and recording days in stage. [SAMPLE — replace with Blessing SOP.]' , file:'sop_documents/SOP-002_Government_File_Tracking.pdf' },
  { id:'SOP-003', title:'Site Progress Reporting', version:3, owner:'Site Supervisor', review:'Semi-annually', applies:'Construction sites',
    summary:'Daily time-stamped photo and status report requirement for all sites. [SAMPLE — replace with Blessing SOP.]' , file:'sop_documents/SOP-003_Site_Progress_Reporting.pdf' },
  { id:'SOP-004', title:'Payment Requisition & Retention', version:2, owner:'Accounts', review:'Annually', applies:'All projects',
    summary:'Invoice support, certification, payment tracking and 5% retention for 6 months. [SAMPLE — replace with Blessing SOP.]' , file:'sop_documents/SOP-004_Payment_Requisition_and_Retention.pdf' },
  { id:'SOP-005', title:'Inspection & Approval', version:1, owner:'Contract Lead', review:'Annually', applies:'Completion stage',
    summary:'Coordination of government inspection, approval and completion certificate. [SAMPLE — replace with Blessing SOP.]' , file:'sop_documents/SOP-005_Inspection_and_Approval.pdf' },
  { id:'SOP-006', title:'MOT — Selective Tendering Process', version:1, owner:'Contract Lead', review:'Annually', applies:'MOT / Traffic bids',
    summary:'3-company submission (PPA + CAC), online bid via MOT portal, Notification of Award, Letter of Award after Governor approval, 70% advance + 30% balance, APG via LASACO, payment via Accounts→Auditor→Director→CIA.', file:'sop_documents/SOP-001_Contract_Bidding_and_Tendering.pdf' },
  { id:'SOP-007', title:'SCRPS — Bidding Process & Submission', version:1, owner:'Contract Lead', review:'Annually', applies:'SCRPS / School bids',
    summary:'3-company bid set incl. bid bond (LASACO), 70% advance + 30% balance, APG & PG requirements, contract deductions (0.5% agreement, 0.25% admin, 7.5% VAT, 5% WHT, 1% stamp, 1% levy).', file:'sop_documents/SOP-001_Contract_Bidding_and_Tendering.pdf' },
  { id:'SOP-008', title:'Payments Pre, During & Post Project', version:1, owner:'Accounts', review:'Annually', applies:'All projects',
    summary:'Pre-commencement (bidding receipt, agreement/admin fees, APG, VAT/WHT/levy), during execution (preliminaries, mobilization), post execution (final inspection PR, balance, budget officials).', file:'sop_documents/SOP-004_Payment_Requisition_and_Retention.pdf' },
  { id:'SOP-009', title:'PPA Registration Procedures', version:1, owner:'Contract Lead', review:'Annually', applies:'Bid readiness',
    summary:'Documents required + step-by-step registration: gather docs, confirm email, verify authenticity, get Payer ID via etax.lirs.net (corporate), pay taxes/levies/registration fee.', file:'sop_documents/SOP-001_Contract_Bidding_and_Tendering.pdf' },
  { id:'SOP-010', title:'Advance Payment Guarantee (APG) — LASACO', version:1, owner:'Accounts', review:'Annually', applies:'Payment readiness',
    summary:'APG requirements: 2 directors passport & ID, company tax clearance, COI, counter guarantee, filled proposal, LOA/Notification, MEMART, utility bill.', file:'sop_documents/SOP-004_Payment_Requisition_and_Retention.pdf' }
];

/* Compliance register — sample items, expInDays relative to today.
   Negative = expired; small = approaching expiry (triggers 30/60/90 alerts). */
const COMPLIANCE = [
  { id:'CMP-001', item:'BPP Registration Renewal', type:'Statutory Renewal', owner:'Accounts', applies:'Zoneware (org-wide)',
    expInDays: 18,  note:'Renewed yearly at the start of every year. [SAMPLE date — confirm with Blessing.]' },
  { id:'CMP-002', item:'Tax Clearance Certificate (TCC)', type:'Statutory Renewal', owner:'Accounts', applies:'Zoneware (org-wide)',
    expInDays: 9,   note:'Required for bid submissions. [SAMPLE]' },
  { id:'CMP-003', item:'Company Incorporation Certificate', type:'Permanent Record', owner:'Admin', applies:'Zoneware (org-wide)',
    expInDays: 400, note:'Permanent statutory record. [SAMPLE]' },
  { id:'CMP-004', item:'Insurance Bond — School for the Blind', type:'Project Insurance', owner:'Contract Lead', applies:'PL-001',
    expInDays: 47,  note:'Advance-payment bond per contract. [SAMPLE]' },
  { id:'CMP-005', item:'Advance Payment Guarantee — Shagamu', type:'Project Insurance', owner:'Contract Lead', applies:'ZW-002',
    expInDays: 120, note:'[SAMPLE]' },
  { id:'CMP-006', item:'Site Supervisor Induction & Safety', type:'Internal Compliance', owner:'Site Supervisor', applies:'All sites',
    expInDays: 55,  note:'[SAMPLE]' },
  { id:'CMP-007', item:'LAMATA FM Service Licence', type:'Client Compliance', owner:'Facility Manager', applies:'ZW-004',
    expInDays: -5,  note:'[SAMPLE — expired to demo the expired state.]' }
];

/* expiry classification */
function expiryBand(days){
  if (days < 0) return { label:'Expired', cls:'red' };
  if (days <= 30) return { label:'Expiring ≤30d', cls:'red' };
  if (days <= 60) return { label:'Expiring 31–60d', cls:'amber' };
  if (days <= 90) return { label:'Expiring 61–90d', cls:'amber' };
  return { label:'Compliant', cls:'green' };
}
function expiryDate(days){ const d = new Date(); d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).replace(/ /g,'-'); }

/* ============================================================
   Zonexa v1.0 — ADVANCED MODULES (brainstorm build)
   Approval workflow · Bidding pipeline · Inspections ·
   Payment requisitions · Integrations · Spend authority
   ============================================================ */

/* 1. Full government file / approval chain
   MD's "FedEx-style" tracking — each step a role can act on. */
const APPROVAL_FLOW_FULL = [
  { step:'Procurement',       role:'Contract Lead',   slaDays:5 },
  { step:'Audit',             role:'Accounts',        slaDays:3 },
  { step:'User Department',   role:'Contract Lead',   slaDays:7 },
  { step:'Engineering',       role:'Project Manager', slaDays:5 },
  { step:'Accounts',          role:'Accounts',        slaDays:4 },
  { step:'STO',               role:'Contract Lead',   slaDays:7 },
  { step:'CIA',               role:'Contract Lead',   slaDays:5 },
  { step:'Governor',          role:'MD',              slaDays:10 }
];

/* current position of each project's file along that chain */
const FILE_JOURNEYS = [
  { projectId:'PL-001', stepIndex:2, status:'pending', note:'With User Department — awaiting technical approval',
    history:[{step:'Procurement',action:'Approved',by:'Contract Lead',date:'17-Jul',days:2},{step:'Audit',action:'Approved',by:'Accounts',date:'20-Jul',days:3},{step:'User Department',action:'Pending',by:'—',date:'—',days:0}] },
  { projectId:'ZW-002', stepIndex:1, status:'pending', note:'At Audit — vendor resource review',
    history:[{step:'Procurement',action:'Approved',by:'Contract Lead',date:'22-Jul',days:2},{step:'Audit',action:'Pending',by:'—',date:'—',days:0}] },
  { projectId:'ZW-003', stepIndex:1, status:'pending', note:'At Audit — finishing materials sign-off',
    history:[{step:'Procurement',action:'Approved',by:'Contract Lead',date:'15-Jul',days:3},{step:'Audit',action:'Pending',by:'—',date:'—',days:0}] },
  { projectId:'ZW-004', stepIndex:4, status:'pending', note:'At Accounts — monthly invoice certification',
    history:[{step:'Procurement',action:'Approved',by:'Contract Lead',date:'10-Jul',days:1},{step:'Audit',action:'Approved',by:'Accounts',date:'12-Jul',days:2},{step:'User Dept',action:'Approved',by:'Contract Lead',date:'18-Jul',days:6},{step:'Engineering',action:'Approved',by:'PM',date:'22-Jul',days:4},{step:'Accounts',action:'Pending',by:'—',date:'—',days:0}] },
  { projectId:'ZW-005', stepIndex:3, status:'pending', note:'At Engineering — junction testing evidence',
    history:[{step:'Procurement',action:'Approved',by:'Contract Lead',date:'14-Jul',days:2},{step:'Audit',action:'Approved',by:'Accounts',date:'17-Jul',days:3},{step:'User Dept',action:'Approved',by:'Contract Lead',date:'21-Jul',days:4},{step:'Engineering',action:'Pending',by:'—',date:'—',days:0}] },
  { projectId:'ZW-006', stepIndex:4, status:'pending', note:'At Accounts — early payment documentation',
    history:[{step:'Procurement',action:'Approved',by:'Contract Lead',date:'20-Jul',days:1},{step:'Audit',action:'Approved',by:'Accounts',date:'23-Jul',days:3},{step:'User Dept',action:'Approved',by:'Contract Lead',date:'26-Jul',days:3},{step:'Engineering',action:'Approved',by:'PM',date:'28-Jul',days:2},{step:'Accounts',action:'Pending',by:'—',date:'—',days:0}] },
  { projectId:'ZW-007', stepIndex:1, status:'rejected', note:'At Audit — awaiting fresh site update (previously rejected on docs)',
    history:[{step:'Procurement',action:'Approved',by:'Contract Lead',date:'19-Jul',days:2},{step:'Audit',action:'Rejected',by:'Accounts',date:'23-Jul',days:4}] }
];

/* 15. Spend-authority limits per role (MD's "trust + controls")
   null = unlimited. Requisitions above a role's limit escalate up. */
const SPEND_LIMITS = {
  'Site Supervisor': 500000,
  'Facility Manager': 1000000,
  'Project Manager': 2000000,
  'Accounts': 5000000,
  'Contract Lead': 10000000,
  'MD': null
};

/* 3. Bidding pipeline (MD's core job — winning contracts) */
const BIDDING_PIPELINE = [
  { id:'BID-001', opportunity:'Street Traffic Light Installation \u2014 Phase 2', ministry:'Ministry of Transportation', sector:'Traffic Systems', procurement:'Selective', stage:'Awarded', value:480000000, bidDeadline:'12-Jul-2026', submitted:'10-Jul-2026', awarded:'20-Jul-2026', winProb:90, compliance:'BPP current', pm:'Tunde Ogunleye', owner:'Toyin Adeyemi', status:'Won', img:'images/bid-traffic-light.jpg', note:'Won \u2014 moving to contract documentation.' },
  { id:'BID-002', opportunity:'School Rehabilitation \u2014 Lekki Cluster', ministry:'State Schools Commission', sector:'Rehabilitation', procurement:'Selective', stage:'Bid Submitted', value:320000000, bidDeadline:'02-Aug-2026', submitted:'29-Jul-2026', awarded:'\u2014', winProb:55, compliance:'BPP current', pm:'Aisha Balogun', owner:'Toyin Adeyemi', status:'In Bidding', img:'images/bid-school-rehab.jpg', note:'Bid in; awaiting award decision.' },
  { id:'BID-003', opportunity:'Road Marking & Lane Signage \u2014 Ikeja', ministry:'Ministry of Transportation', sector:'Road Marking', procurement:'Competitive', stage:'Budget Mapping', value:95000000, bidDeadline:'20-Aug-2026', submitted:'\u2014', awarded:'\u2014', winProb:30, compliance:'BPP due for renewal', pm:'Kemi Salami', owner:'Kemi Salami', status:'Pipeline', img:'images/bid-road-marking.jpg', note:'Opportunity identified; preparing to bid.' },
  { id:'BID-004', opportunity:'BRT Terminal Facility Management', ministry:'State Transit Authority', sector:'Facility Management', procurement:'Selective', stage:'Bid Submitted', value:150000000, bidDeadline:'28-Jul-2026', submitted:'26-Jul-2026', awarded:'\u2014', winProb:65, compliance:'BPP current', pm:'Ifeanyi Nwachukwu', owner:'Ifeanyi Nwachukwu', status:'In Bidding', img:'images/bid-brt-terminal.jpg', note:'Strong chance \u2014 existing FM relationship.' },
  { id:'BID-005', opportunity:'Median Kerb \u2014 Victoria Island', ministry:'Ministry of Works', sector:'Road Infrastructure', procurement:'Competitive', stage:'Lost', value:120000000, bidDeadline:'15-Jun-2026', submitted:'13-Jun-2026', awarded:'\u2014', winProb:20, compliance:'BPP current', pm:'Musa Bello', owner:'Musa Bello', status:'Lost', img:'images/bid-median-kerb.jpg', note:'Lost on price; review and re-bid next cycle.' },
  { id:'BID-006', opportunity:'Solar Street Lighting \u2014 Phase 3', ministry:'Ministry of Works', sector:'Transportation', procurement:'Competitive', stage:'Budget Mapping', value:210000000, bidDeadline:'05-Sep-2026', submitted:'\u2014', awarded:'\u2014', winProb:25, compliance:'BPP current', pm:'Kemi Salami', owner:'Kemi Salami', status:'Pipeline', img:'images/bid-solar-lights.jpg', note:'Earmarked budget; tracking announcement.' },
  { id:'BID-007', opportunity:'Health Centre Construction \u2014 Phase 2', ministry:'Ministry of Health', sector:'Building Construction', procurement:'Selective', stage:'Invited', value:380000000, bidDeadline:'12-Sep-2026', submitted:'\u2014', awarded:'\u2014', winProb:40, compliance:'BPP current', pm:'Engr. David Okonkwo', owner:'Toyin Adeyemi', status:'In Bidding', img:'images/bid-health-centre.jpg', note:'Invitation received; preparing bid.' }
];
const BID_STAGES = ['Pipeline', 'In Bidding', 'Won', 'Lost'];

/* 4. Inspection tracking (Toyin's "chasing inspectors" pain) */
const INSPECTIONS = [
  { id:'INS-001', projectId:'PL-001', project:'School for the Blind, Festac', type:'Technical Inspection', requested:'20-Jul-2026', daysWaiting:16, inspector:'Ministry Inspector', status:'Awaiting', nextAction:'Chase inspector; confirm inspection date' },
  { id:'INS-002', projectId:'ZW-005', project:'Traffic Light Installation Programme', type:'Junction Testing', requested:'26-Jul-2026', daysWaiting:10, inspector:'Ministry Inspector', status:'Awaiting', nextAction:'Request joint inspection dates' },
  { id:'INS-003', projectId:'ZW-006', project:'Road Marking and Lane Signage Works', type:'Final Inspection', requested:'30-Jul-2026', daysWaiting:6, inspector:'Ministry Inspector', status:'Scheduled', nextAction:'Prepare executed sections register' },
  { id:'INS-004', projectId:'ZW-004', project:'Ojodu Bus Terminal Facility Management', type:'Monthly FM Review', requested:'01-Aug-2026', daysWaiting:4, inspector:'LAMATA / User Dept', status:'Completed', nextAction:'Obtain sign-off' }
];

/* 6. Internal payment requisitions (currently over email/WhatsApp) */
const REQUISITIONS = [
  { id:'REQ-001', projectId:'ZW-002', project:'Shagamu Construction Project', item:'Sand & Cement Delivery', amount:3400000, requestedBy:'Femi Adebayo', status:'Pending MD', date:'01-Aug-2026', note:'Vendor invoice #2214' },
  { id:'REQ-002', projectId:'ZW-003', project:'Public School Rehabilitation — 18 Classrooms', item:'Finishing Materials (paint)', amount:1850000, requestedBy:'Aisha Balogun', status:'Approved', date:'29-Jul-2026', note:'Approved by Contract Lead' },
  { id:'REQ-003', projectId:'PL-001', project:'School for the Blind, Festac', item:'Railing Fabrication', amount:5200000, requestedBy:'Engr. Ayodele Ogunnaike', status:'Pending MD', date:'31-Jul-2026', note:'Requires MD approval (>PM limit)' },
  { id:'REQ-004', projectId:'ZW-007', project:'Median Kerb and Signage Installation', item:'Road marking paint', amount:780000, requestedBy:'Musa Bello', status:'Approved', date:'28-Jul-2026', note:'Within PM limit' }
];

/* 10. Email/WhatsApp → structured record bridge (conceptual hooks) */
const INTEGRATIONS = [
  { id:'CAP-001', source:'WhatsApp', project:'School for the Blind', from:'Chinedu Okafor', type:'Site Photo', captured:'03-Aug-2026 15:22', status:'Structured' },
  { id:'CAP-002', source:'Email', project:'Ojodu Bus Terminal FM', from:'Ifeanyi Nwachukwu', type:'Weekly FM Report', captured:'01-Aug-2026 09:40', status:'Structured' },
  { id:'CAP-003', source:'WhatsApp', project:'Shagamu Construction Project', from:'Femi Adebayo', type:'Progress Update', captured:'31-Jul-2026 18:05', status:'Structured' }
];

/* ============================================================
   Zonexa v1.0 — VENDOR REGISTER
   Trusted vendors MD relies on (roofer, M&E, line marking, etc.)
   ============================================================ */
const VENDORS = [
  { id:'VND-001', name:'Landmark Civil Works Ltd', category:'Civil Construction', phone:'0802 111 2233', trusted:true, rating:4, projects:['PL-001'], note:'Core civil works partner; from Ministry list.' },
  { id:'VND-002', name:'Prime M&E Services', category:'Mechanical & Electrical', phone:'0803 222 3344', trusted:true, rating:4, projects:['PL-001'], note:'M&E partner for School for the Blind.' },
  { id:'VND-003', name:'BuildRight Contractors Ltd', category:'Construction', phone:'0804 333 4455', trusted:false, rating:3, projects:['ZW-002'], note:'Shagamu vendor.' },
  { id:'VND-004', name:'SignalTech Systems Ltd', category:'Traffic Systems', phone:'0805 444 5566', trusted:true, rating:5, projects:['ZW-005'], note:'Traffic light partner; strong reliability.' },
  { id:'VND-005', name:'BrightLine Road Markings Ltd', category:'Road Marking', phone:'0806 555 6677', trusted:false, rating:3, projects:['ZW-006'], note:'Line marking vendor.' },
  { id:'VND-006', name:'KerbWorks Infrastructure Ltd', category:'Road Infrastructure', phone:'0807 666 7788', trusted:false, rating:3, projects:['ZW-007'], note:'Median kerb vendor.' },
  { id:'VND-007', name:'MetroBuild Rehabilitation Services', category:'Rehabilitation', phone:'0808 777 8899', trusted:false, rating:3, projects:['ZW-003'], note:'Classroom rehabilitation partner.' },
  { id:'VND-008', name:'Zonecare Facility Operations Team', category:'Facility Management', phone:'0809 888 9900', trusted:true, rating:4, projects:['ZW-004'], note:'In-house FM team for the bus terminal.' },
  { id:'VND-009', name:'Apex Steel & Reinforcement', category:'Steel & Concrete', phone:'0810 999 0011', trusted:false, rating:3, projects:['PL-001'], note:'Steel and rebar supplier.' },
  { id:'VND-010', name:'City Electrical Contractors', category:'Electrical', phone:'0811 101 1122', trusted:false, rating:4, projects:['ZW-002','ZW-005'], note:'Electrical installation subcontractor.' },
  { id:'VND-011', name:'Hydro Plumbing & Drainage', category:'Plumbing', phone:'0812 202 2233', trusted:false, rating:3, projects:['ZW-003'], note:'Plumbing and drainage works.' },
  { id:'VND-012', name:'SecureFM Security Services', category:'Security', phone:'0813 303 3344', trusted:true, rating:4, projects:['ZW-004'], note:'Site security for the terminal.' },
  { id:'VND-013', name:'GridWorks Solar & Lighting', category:'Solar & Lighting', phone:'0814 404 4455', trusted:false, rating:3, projects:['ZW-005'], note:'Solar and lighting subcontractor.' },
  { id:'VND-014', name:'AsphaltPlus Road Solutions', category:'Asphalt', phone:'0815 505 5566', trusted:false, rating:3, projects:['ZW-006'], note:'Asphalt and surface works.' },
  { id:'VND-015', name:'CastMasters Precast', category:'Precast Concrete', phone:'0816 606 6677', trusted:false, rating:3, projects:['ZW-007'], note:'Precast kerb units supplier.' },
  { id:'VND-016', name:'OnPoint Survey & Geotech', category:'Survey', phone:'0817 707 7788', trusted:false, rating:3, projects:['ZW-002'], note:'Site survey and geotechnical.' },
  { id:'VND-017', name:'RoofRight Contracting', category:'Roofing', phone:'0818 808 8899', trusted:false, rating:3, projects:['PL-001','ZW-003'], note:'Roofing subcontractor.' },
  { id:'VND-018', name:'Terminal Care Cleaning Services', category:'Cleaning / Janitorial', phone:'0819 909 9900', trusted:false, rating:3, projects:['ZW-004'], note:'Cleaning and janitorial for the terminal.' },
  { id:'VND-019', name:'LineMark Paint & Materials Supply', category:'Materials Supply', phone:'0820 010 0011', trusted:false, rating:3, projects:['ZW-006'], note:'Road-marking paint and materials.' },
  { id:'VND-020', name:'SignWorks Fabrication', category:'Signage Fabrication', phone:'0821 111 1122', trusted:false, rating:3, projects:['ZW-007'], note:'Signage fabrication and installation.' }
];

/* ============================================================
   Zonexa v1.0 — DEMO SITE PHOTO IMAGES
   Maps each project to a demo site photo, and attaches an image
   to every SITE_PHOTOS / ALL_PHOTOS record so the Site Photos
   pages show a real picture per project.
   ============================================================ */
/* Each project has a gallery of demo photos (two angles). */
const PROJECT_IMAGE = {
  'PL-001':['images/site-school-blind.jpg','images/site-school-blind-2.jpg'],
  'ZW-002':['images/site-shagamu.jpg','images/site-shagamu-2.jpg'],
  'ZW-003':['images/site-classroom.jpg','images/site-classroom-2.jpg'],
  'ZW-004':['images/site-bus-terminal.jpg','images/site-bus-terminal-2.jpg'],
  'ZW-005':['images/site-traffic-light.jpg','images/site-traffic-light-2.jpg'],
  'ZW-006':['images/site-road-marking.jpg','images/site-road-marking-2.jpg'],
  'ZW-007':['images/site-median-kerb.jpg','images/site-median-kerb-2.jpg']
};
SITE_PHOTOS.forEach(p => { p.imgs = PROJECT_IMAGE[p.projectId] || []; p.img = p.imgs[0] || null; });
ALL_PHOTOS.forEach(p => { p.imgs = PROJECT_IMAGE[p.projectId] || []; p.img = p.imgs[0] || null; });

/* ============================================================
   Zonexa v1.0 — PROJECT ARCHIVE / CLOSE-OUT
   Completed projects (all due process done) are moved here out of
   the active portfolio. Their documents remain fully retrievable.
   ============================================================ */
/* Real project site photos (from project Drive folders + representative stock).
   Keyed by project id; used in company pages / project galleries. */

/* Real site-photo FOLDERS per completed project, grouped by phase
   (Before / During / After). These are private Drive folder links —
   the portal links to them so the real photos can be opened. */
const SITE_PHOTO_FOLDERS = {
  'BW-001': {
    'Before': 'https://drive.google.com/drive/folders/1UihNz0im3aqMenziYtuGUANGMlIr8WtM',
    'During': 'https://drive.google.com/drive/folders/1aELu-v78lKhMZjP7K5W-5jhv8q1i-uQf',
    'After':  'https://drive.google.com/drive/folders/1qD6SEm44kyZItKTdtxsaTMmdWXfRk2eF'
  },
  'HV-005': {
    'Before': 'https://drive.google.com/drive/folders/1Azao9A_ZlwFm3lbd92bzRaDn7kuDih4j',
    'During': 'https://drive.google.com/drive/folders/1WdPkGeOnKfk8hwKD-_apvgRJncIdaobb',
    'After':  'https://drive.google.com/drive/folders/14L9a66yzmK2zAhLSeJ6mEPQe6puI-f90'
  },
  'BW-002': {
    'Before': 'https://drive.google.com/drive/folders/1FZXiatZmPmFO4PPFlHIeYtTYf7xqOmH6',
    'After':  'https://drive.google.com/drive/folders/1ZLMavOW7A-3Zv6sNty8eCI_Ji9qGWlQj'
  },
  'HV-001': {
    'Before': 'https://drive.google.com/drive/folders/1_T3pvd03_idCuyfO9gzsW0k5h4xc73WD',
    'During': 'https://drive.google.com/drive/folders/19ClhUJTYTzetXjGZ6e3WuzVgEckyZKOS',
    'After':  'https://drive.google.com/drive/folders/1ilIGBeOJ9kwFhePRTRZEKgfTkWqKOHa_'
  },
  'HV-002': {
    'Before': 'https://drive.google.com/drive/folders/1CI8RRpWuXoxck1vtKDydVAVOMow7CjDV',
    'During': 'https://drive.google.com/drive/folders/12toiHkSBvtULptSsGlXZzGt4HWqw1dNP',
    'After':  'https://drive.google.com/drive/folders/1W_RP10FmWtK0MQVEQegzJ0ydA2Oyt0io'
  },
  'HV-003': {
    'Before': 'https://drive.google.com/drive/folders/1hQySMwVy5GxS2nUHLj6I-LkPiEsBXI-v',
    'During': 'https://drive.google.com/drive/folders/1Um-0dXVFcA9OhLda4hXFuSlrftU0RSk9',
    'After':  'https://drive.google.com/drive/folders/1srWCZuFVDjBBZ1LuuVVAHn8d549w1Sqo'
  },
  'HV-004': {
    'Before': 'images/site-hv004-before.jpg',
    'During': 'images/site-hv004-during.jpg',
    'After':  'images/site-hv004-after.jpg'
  }
};

const PROJECT_PHOTO = {
  'HV-001': ['images/hv001-after-1.jpg','images/hv001-after-2.jpg','images/hv001-after-3.jpg'],
  'HV-002': ['images/hv002-after-1.jpg','images/hv002-after-2.jpg','images/hv002-after-3.jpg'],
  'HV-003': ['images/hv003-after-1.jpg','images/hv003-after-2.jpg','images/hv003-after-3.jpg'],
  'HV-004': ['images/site-hv004-before.jpg','images/site-hv004-during.jpg','images/site-hv004-after.jpg'],
  'BW-001': ['images/bw001-after-1.jpg','images/bw001-after-2.jpg','images/bw001-after-3.jpg'],
  'BW-002': ['images/bw002-after-1.jpg','images/bw002-after-2.jpg','images/bw002-after-3.jpg'],
  'HV-005': ['images/hv005-after-1.jpg','images/hv005-after-2.jpg','images/hv005-after-3.jpg'],
  'BW-003': ['images/site-abesan-1.jpg','images/site-abesan-2.jpg','images/site-abesan-3.jpg'],
  'BW-004': ['images/site-school-classroom-1.jpg'],
  'BW-005': ['images/site-drain-1.jpg','images/site-drain-2.jpg'],
  'BW-006': ['images/site-firestation-1.jpg'],
  'BW-007': ['images/site-boulders-1.jpg'],
  'BW-008': [],
  'PL-001': ['images/site-plycon-sfb-1.jpg','images/site-plycon-sfb-2.jpg','images/site-plycon-sfb-3.jpg','images/site-plycon-sfb-4.jpg'],
  'PL-002': ['images/site-school-classroom-1.jpg'],
  'PL-003': ['images/site-school-classroom-1.jpg'],
  'RW-001': ['images/site-traffic-signal-1.jpg'],
  'RW-002': ['images/site-traffic-signal-1.jpg'],
  'RW-003': ['images/site-traffic-signal-1.jpg'],
  'RW-004': ['images/site-traffic-signal-1.jpg'],
  'RW-005': ['images/site-traffic-signal-1.jpg'],
  'RW-006': ['images/site-drain-1.jpg'],
  'RW-007': ['images/site-school-classroom-1.jpg'],
  'RW-008': ['images/site-firestation-1.jpg']
};

const ARCHIVE = [
  { id:'ZW-100', name:'Loop Detector & Geo-sensor Installation — Ikeja Bridge', client:'Ministry of Transportation', sector:'Traffic Systems',
    location:'Ikeja, Lagos', company:'ZONEWARE LIMITED', year:2025, pm:'Tunde Ogunleye', contractValue:145000000, completed:'18-Mar-2025', closed:'02-Apr-2025',
    retentionReleased:'Yes', summary:'Completed and handed over; 5% retention released after 6 months.', docs:['sample_documents/DOC-ZW-005-001_Inspection_Request_Sample.pdf','sample_documents/DOC-ZW-005-002_Junction_Testing_Checklist_Sample.pdf'] },
  { id:'ZW-101', name:'Street Light Installation — Phase 1', client:'Lagos State Ministry / Works', sector:'Transportation',
    location:'Lagos', company:'ZONEWARE LIMITED', year:2024, pm:'Kemi Salami', contractValue:96000000, completed:'12-Dec-2024', closed:'20-Jan-2025',
    retentionReleased:'Yes', summary:'Completed and close-out archived after final certification.', docs:['sample_documents/DOC-ZW-006-001_Executed_Sections_Register_Sample.pdf'] },
  { id:'ZW-102', name:'Bridging & Roadworks — Ikeja Flyover Support', client:'Lagos State Ministry / Works', sector:'Road Infrastructure',
    location:'Ikeja, Lagos', company:'ZONEWARE LIMITED', year:2024, pm:'Musa Bello', contractValue:210000000, completed:'05-Nov-2024', closed:'28-Nov-2024',
    retentionReleased:'Yes', summary:'Closed out; retention released on completion certificate.', docs:['sample_documents/DOC-PL-001-002_BOQ_Scope_Summary_Sample.pdf'] },
    { id:'BW-001', name:'Eko Boys 18 Classrooms', client:'SCRPS / Lagos State Government', sector:'School Construction',
    location:'Eko Boys Senior Secondary School, Mushin', company:'BOXGROVE LIMITED', year:2023, pm:'(placeholder)',
    contractValue:450708204, completed:'2023', closed:'2023',
    retentionReleased:'Yes', summary:'I-Shape 18-Classroom block (raft foundation). SCRPS project awarded 2023. Completed and archived.', docs:[] },
    { id:'BW-002', name:'Eko Boys Perimeter Fence (LOT 11)', client:'SCRPS / Lagos State Government', sector:'Fencing / Civil Works',
    location:'Eko Boys Senior High School, Idi-Oro, Mushin', company:'BOXGROVE LIMITED', year:2024, pm:'(placeholder)',
    contractValue:27516346, completed:'2026', closed:'2026',
    retentionReleased:'Yes', summary:'SCRPS/W/DC/007/2024, awarded 26 Aug 2024. Fixed contract N27,516,346.73. Received N23,424,962.66 (95% Nov 2025 + 5% retention Jun 2026). Practical completion cert on file.', docs:[] },
  { id:'BW-003', name:'Abesan 18 Classrooms (LOT 4)', client:'SCRPS / Lagos State Government', sector:'School Construction',
    location:'Abesan (Education District 1)', company:'BOXGROVE LIMITED', year:2021, pm:'(placeholder)',
    contractValue:291918231, completed:'2023', closed:'2023',
    retentionReleased:'Yes', summary:'SCRPS/W/DC/01-12/2021, awarded Jul 2021. Contract N291,918,231.00; paid N291,440,889.86. Final completion cert June 2023.', docs:[] },
  { id:'BW-004', name:'Maryland (Wasimi) School Renovation (Lot 13)', client:'SCRPS / Lagos State Government', sector:'School Renovation',
    location:'Community Senior High School, Maryland, Ikeja', company:'BOXGROVE LIMITED', year:2020, pm:'(placeholder)',
    contractValue:57164835, completed:'2021', closed:'2021',
    retentionReleased:'Yes', summary:'SCRPS/W/NS/03/2020, awarded 11 Sep 2020. Renovation of L-Shape 6 classrooms + offices. Contract N57,164,835.20; paid N54,566,433.60. Final completion cert Sept 2021.', docs:[] },
  { id:'BW-005', name:'Oyindamola / System 6c Collector Drain', client:'Lagos State Government', sector:'Drainage / Civil Works',
    location:'Ago Palace Way, Okota, Oshodi-Isolo', company:'BOXGROVE LIMITED', year:2021, pm:'(placeholder)',
    contractValue:323943200, completed:'2021', closed:'—',
    retentionReleased:'Yes', summary:'MOE/ODS&WRIW-DC/47/2021, upward review 25 Apr 2022. Contract N323,943,200.69.', docs:[] },
  { id:'BW-006', name:'Fire Station Modern Workshop', client:'Lagos State Fire & Rescue Service', sector:'Construction',
    location:'Lagos State Fire & Rescue Service HQ', company:'BOXGROVE LIMITED', year:2022, pm:'(placeholder)',
    contractValue:247990910, completed:'2022', closed:'—',
    retentionReleased:'Yes', summary:'FS/W/DC/001/Vol.1/47, 12 Dec 2022. Construct modern workshop. Contract N247,990,910.29 (70% advance, 12-month completion).', docs:[] },
  { id:'BW-007', name:'Procurement of Boulders', client:'Lagos State Public Works Corporation', sector:'Procurement / Materials',
    location:'Ojodu Berger Asphalt Plant', company:'BOXGROVE LIMITED', year:2022, pm:'(placeholder)',
    contractValue:3990000, completed:'2022', closed:'2022',
    retentionReleased:'Yes', summary:'PWC/LPO-Boulders/2022/078, 14 Dec 2022. Supply 300 tons @ N13,300/ton = N3,990,000 incl 7.5% VAT.', docs:[] },
  { id:'BW-008', name:'LASIMRA Enforcement — Monitoring Engagement', client:'LASIMRA (Lagos State)', sector:'Monitoring / Service',
    location:'Kosofe / Lagos', company:'BOXGROVE LIMITED', year:2020, pm:'(placeholder)',
    contractValue:600000, completed:'2020', closed:'2020',
    retentionReleased:'Yes', summary:'Service engagement — management & monitoring of Kosofe (Oworonshoki, Ojota/Ogudu, Anthony/Ajao, Mende/Maryland, Ikosi/Ketu etc). Invoice N600,000. Logged as a service engagement, not construction.', docs:[] },
  { id:'HV-001', name:'MOT — Intelligent Traffic Signal at 10 Locations', client:'Lagos State Government / MOT', sector:'Traffic Systems',
    location:'Lagos (10 locations)', company:'HEVELIUS LIMITED', year:2021, pm:'(placeholder)',
    contractValue:522399321, completed:'2023', closed:'2023',
    retentionReleased:'Yes', summary:'Installation of Intelligent Traffic Signal Light at 10 locations (Y2021). Contract N522,399,321.20. Completion cert Nov 2023 (MOT/TED/882/11). Maintenance Mar–Aug 2023.', docs:[] },
  { id:'HV-002', name:'Offin-Ikorodu — 6 Classrooms (LOT 4)', client:'SCRPS / Lagos State Government', sector:'School Renovation',
    location:'Anglican Primary School, Offin, Ikorodu', company:'HEVELIUS LIMITED', year:2024, pm:'(placeholder)',
    contractValue:91666009, completed:'2026', closed:'2026',
    retentionReleased:'Yes', summary:'SCRPS/W/NS/012/2024, awarded 12 Nov 2024. Renovation of 6 classrooms. Contract N91,666,009.38; received N78,901,027.70 (70% Dec 2024 + 25% Jul 2025 + 5% Mar 2026).', docs:[] },
  { id:'HV-003', name:'Alagbado-Surulere — 12 Classroom Block', client:'SCRPS / Lagos State Government', sector:'School Renovation',
    location:'Surulere Community Junior Secondary School, Alagbado, Alimosho', company:'HEVELIUS LIMITED', year:2024, pm:'(placeholder)',
    contractValue:106099799, completed:'2025', closed:'2025',
    retentionReleased:'Yes', summary:'SCRPS/W/NS/ETF/PHASE 1/2024. Renovation of 12 classroom block. Contract N106,099,799.20; received N90,911,140.86. Final completion April 2025.', docs:[] },
  { id:'HV-004', name:'Surulere Under-10M — Burglary Proofs', client:'SCRPS / Lagos State Government', sector:'School Renovation',
    location:'Surulere Community Senior Secondary School, Alagbado, Alimosho', company:'HEVELIUS LIMITED', year:2025, pm:'(placeholder)',
    contractValue:9679261, completed:'2025', closed:'2025',
    retentionReleased:'Yes', summary:'Lot 1, March 2024. Supply & install 37 pcs burglary proofs + painting. Contract N9,679,260.80; received N7,578,267.76 (95%).', docs:[] },
  { id:'PL-002', name:'School for the Blind — Amuwo Phase (2019)', client:'SUBEB / SCRPS', sector:'School Construction',
    location:'Amuwo-Odofin, Lagos', company:'PLYCON LIMITED', year:2019, pm:'(placeholder)',
    contractValue:0, completed:'2019', closed:'2019',
    retentionReleased:'Yes', summary:'Prior phase — School for the Blind / Model Primary School, Amuwo-Odofin. Main building, external works, staff quarters. Completed prior phase.', docs:[] },
  { id:'PL-003', name:'School for the Blind — Reconstruction (2021)', client:'SUBEB / SCRPS', sector:'School Construction',
    location:'Amuwo-Odofin, Lagos', company:'PLYCON LIMITED', year:2021, pm:'(placeholder)',
    contractValue:0, completed:'2021', closed:'2021',
    retentionReleased:'Yes', summary:'Prior phase — reconstruction works at the School for the Blind, Amuwo-Odofin. Completed prior phase.', docs:[] },
  { id:'PL-004', name:'School for the Blind — Completion BOQ (2022)', client:'SUBEB / SCRPS', sector:'School Construction',
    location:'Amuwo-Odofin, Lagos', company:'PLYCON LIMITED', year:2022, pm:'(placeholder)',
    contractValue:0, completed:'2022', closed:'2022',
    retentionReleased:'Yes', summary:'Prior phase — completion bill of quantities at School for the Blind, Amuwo-Odofin. Completed prior phase.', docs:[] },
  { id:'RW-001', name:'MOT-1 — Cables & Street Light Equipment', client:'Gold Board / MOT', sector:'Traffic Systems',
    location:'Lagos', company:'REDWARE LIMITED', year:2017, pm:'(placeholder)',
    contractValue:24600000, completed:'2017', closed:'2017',
    retentionReleased:'Yes', summary:'Supply of electrical cables & street light equipment (Gold Board Construction). Contract N24,600,000, awarded 27 Jan 2017.', docs:[] },
  { id:'RW-002', name:'MOT-1 — Spare Parts for Traffic Signal Light', client:'Ministry of Transportation (MOT)', sector:'Traffic Systems',
    location:'Lagos', company:'REDWARE LIMITED', year:2020, pm:'(placeholder)',
    contractValue:49860000, completed:'2020', closed:'2020',
    retentionReleased:'Yes', summary:'Procurement of spare part components for traffic signal light, bid 3 Jul 2020, awarded 13 Jul 2020. Contract N49,860,000.', docs:[] },
  { id:'RW-004', name:'MOT-3 — Steel Cage Construction at 32 Junctions', client:'Ministry of Transportation (MOT)', sector:'Traffic Systems',
    location:'Lagos — 32 junctions', company:'REDWARE LIMITED', year:2021, pm:'(placeholder)',
    contractValue:111458688, completed:'2021', closed:'2021',
    retentionReleased:'Yes', summary:'Steel cage construction at 32 junctions (2021 procurement). Contract N111,458,687.50. Completion cert Oct 2021.', docs:[] },
  { id:'RW-005', name:'MOT — TSL Maintenance (Zone A-E)', client:'Ministry of Transportation (MOT)', sector:'Traffic Systems',
    location:'Lagos — Zones A-E', company:'REDWARE LIMITED', year:2021, pm:'(placeholder)',
    contractValue:0, completed:'2021', closed:'2021',
    retentionReleased:'Yes', summary:'Maintenance of traffic signal lights, zones A-E. Completed.', docs:[] },
  { id:'RW-006', name:'LASPARK — Horticulturist Engagement', client:'Lagos State Parks & Gardens Agency (LASPARK)', sector:'Parks / Landscaping',
    location:'Lagos', company:'REDWARE LIMITED', year:2023, pm:'(placeholder)',
    contractValue:0, completed:'2023', closed:'2023',
    retentionReleased:'Yes', summary:'Letter of engagement as horticulturist (LASPARK/HORT/046/VOL.1/2023, 28 Sep 2023). Park + 3 roundabouts management. Retainer engagement.', docs:[] },
  { id:'RW-007', name:'Oke-Isagun — Repaint 7+1 Classroom Block', client:'SCRPS / Lagos State Government', sector:'School Renovation',
    location:'LG Primary School, Oke-Isagun, Alimosho', company:'REDWARE LIMITED', year:2024, pm:'(placeholder)',
    contractValue:69115407, completed:'2025', closed:'2025',
    retentionReleased:'Yes', summary:'SCRPS/W/NS/ETF/PHASE/2024, LOT 7, bid 12 Mar 2024. Repainting of 7+1 classroom block. Contract N69,115,407.42. Completion Jul 2025.', docs:[] },
  { id:'HV-005', name:'Ifako Comprehensive Senior High School', client:'SCRPS / Lagos State Government', sector:'School Construction',
    location:'Ifako, Lagos', company:'HEVELIUS LIMITED', year:2021, pm:'(placeholder)',
    contractValue:0, completed:'2021', closed:'2021',
    retentionReleased:'Yes', summary:'SCRPS project awarded 2021 at Ifako Comprehensive Senior High School. Completed and archived.', docs:[] },
  { id:'RW-008', name:'Ministry of Health — IP Camera Installation', client:'Ministry of Health', sector:'Security / Installations',
    location:'Lagos', company:'REDWARE LIMITED', year:2020, pm:'(placeholder)',
    contractValue:0, completed:'2021', closed:'2021',
    retentionReleased:'Yes', summary:'IP camera installation at the Ministry of Health. Completed.', docs:[] }
];


/* live-archived projects (moved from the active portfolio via the UI) */
const ARCHIVE_KEY = 'zcc.archive.v1';
ZCC.archive = function(){
  try { const a = JSON.parse(localStorage.getItem(ARCHIVE_KEY) || 'null'); if (Array.isArray(a)) return a; } catch(e){}
  return [];
};
ZCC.saveArchive = function(a){ try { localStorage.setItem(ARCHIVE_KEY, JSON.stringify(a)); } catch(e){} };

/* remove archived projects from the active portfolio on load */
(function pruneArchived(){
  const archived = ZCC.archive();
  const archivedIds = archived.map(x => x.id);
  for (let i = PROJECTS.length - 1; i >= 0; i--) {
    if (archivedIds.includes(PROJECTS[i].id)) PROJECTS.splice(i, 1);
  }
})();

/* ============================================================
   Zonexa v1.0 — ADVANCED CONSTRUCTION DASHBOARD DATA
   Added per the construction-dashboard reference:
   1. Budget vs Forecast Cost to Complete (+ variance)
   2. Cash flow S-curve (planned vs actual monthly)
   4. Risk probability × impact heat map
   6. Gantt-style schedule (baseline vs actual vs forecast)
   ============================================================ */

/* 1. Cost forecasting — budget, commitments, forecast cost to complete */
const COST_FORECAST = {
  'PL-001':{ originalBudget:850000000, adjustments:0, contingency:50000000, currentBudget:900000000, committed:720000000, forecast:940000000, spent:255000000 },
  'ZW-002':{ originalBudget:420000000, adjustments:0, contingency:20000000, currentBudget:440000000, committed:380000000, forecast:435000000, spent:126000000 },
  'ZW-003':{ originalBudget:260000000, adjustments:0, contingency:15000000, currentBudget:275000000, committed:230000000, forecast:268000000, spent:104000000 },
  'ZW-004':{ originalBudget:90000000,  adjustments:0, contingency:5000000,  currentBudget:95000000,  committed:75000000,  forecast:92000000,  spent:54000000 },
  'ZW-005':{ originalBudget:380000000, adjustments:15000000, contingency:25000000, currentBudget:420000000, committed:360000000, forecast:430000000, spent:190000000 },
  'ZW-006':{ originalBudget:180000000, adjustments:0, contingency:10000000, currentBudget:190000000, committed:165000000, forecast:185000000, spent:90000000 },
  'ZW-007':{ originalBudget:240000000, adjustments:0, contingency:12000000, currentBudget:252000000, committed:205000000, forecast:248000000, spent:56000000 }
};

/* 2. Cash flow S-curve — cumulative planned vs actual spend per project (monthly) */
const CASH_FLOW = {
  'PL-001': { labels:['Jun','Jul','Aug','Sep','Oct','Nov'], planned:[0,90000000,210000000,390000000,560000000,700000000], actual:[0,110000000,255000000] },
  'ZW-002': { labels:['Jun','Jul','Aug','Sep','Oct'], planned:[0,80000000,180000000,300000000,390000000], actual:[0,90000000,126000000] },
  'ZW-003': { labels:['Jun','Jul','Aug','Sep'], planned:[0,70000000,150000000,230000000], actual:[0,80000000,104000000] },
  'ZW-005': { labels:['Jun','Jul','Aug'], planned:[0,130000000,250000000], actual:[0,150000000,190000000] },
  'ZW-006': { labels:['Jun','Jul','Aug'], planned:[0,50000000,110000000], actual:[0,60000000,90000000] },
  'ZW-007': { labels:['Jun','Jul','Aug','Sep'], planned:[0,40000000,90000000,160000000], actual:[0,40000000,56000000] }
};

/* 4. Risk heat-map data — probability & impact on a 5×5 scale (1-5) */
const RISK_HEAT = {
  'PL-001': { x:5, y:5, pre:'High', post:'High' },
  'ZW-002': { x:3, y:3, pre:'Medium', post:'Low' },
  'ZW-003': { x:3, y:3, pre:'Medium', post:'Medium' },
  'ZW-004': { x:1, y:2, pre:'Low', post:'Low' },
  'ZW-005': { x:4, y:4, pre:'High', post:'Medium' },
  'ZW-006': { x:2, y:2, pre:'Low', post:'Low' },
  'ZW-007': { x:4, y:3, pre:'High', post:'Medium' }
};

/* 6. Gantt-style schedule — baseline vs actual vs forecast per project.
   Each phase: name, baselineStart(0-100), baselineEnd, actualStart(actual or null), actualEnd */
const SCHEDULE_DATA = {
  'PL-001': {
    forecastEnd:92, baselineEnd:70,
    phases:[
      { name:'Contract & Mobilization', bS:0, bE:15, aS:0, aE:15 },
      { name:'Foundation & Access',     bS:15,bE:40, aS:15,aE:50 },
      { name:'Structure',               bS:40,bE:60, aS:50,aE:70 },
      { name:'Finishing & Systems',     bS:60,bE:80, aS:70,aE:90 },
      { name:'Inspection & Handover',   bS:80,bE:95, aS:90,aE:100 }
    ]
  },
  'ZW-002': { forecastEnd:80, baselineEnd:70, phases:[
      { name:'Mobilization', bS:0,bE:10, aS:0,aE:10 },
      { name:'Civil Works',  bS:10,bE:55, aS:10,aE:55 },
      { name:'Installation', bS:55,bE:75, aS:55,aE:78 },
      { name:'Handover',     bS:75,bE:90, aS:78,aE:100 }
  ]}
};

/* ============================================================
   Zonexa v1.0 — VENDOR PAYMENTS PER PROJECT
   Each project can have up to ~5 vendors, each with their own
   payment terms. Some paid once, some in installments (depending
   on relationship / milestone / claim). Tracks payment progress,
   retention, and documents/evidence.
   ============================================================ */
const VENDOR_PAYMENTS = [
  // PL-001 School for the Blind — 2 vendors
  { id:'VP-001', projectId:'PL-001', vendorId:'VND-001', vendor:'Landmark Civil Works Ltd', contractValue:520000000,
    terms:'Installments — milestone based (foundation, structure, finishing)',
    status:'In progress',
    installments:[
      { no:1, label:'Mobilization advance', amount:156000000, paid:156000000, date:'18-Jun-2026', status:'Paid' },
      { no:2, label:'Foundation complete', amount:130000000, paid:130000000, date:'15-Jul-2026', status:'Paid' },
      { no:3, label:'Structure complete', amount:150000000, paid:0, date:'—', status:'Awaiting' },
      { no:4, label:'Final + retention (5%)', amount:84000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:26000000, docs:['Vendor invoice #2214','Payment receipt'] },
  { id:'VP-002', projectId:'PL-001', vendorId:'VND-002', vendor:'Prime M&E Services', contractValue:180000000,
    terms:'Installments — M&E progress claims',
    status:'In progress',
    installments:[
      { no:1, label:'Mobilization', amount:54000000, paid:54000000, date:'20-Jun-2026', status:'Paid' },
      { no:2, label:'M&E first claim', amount:70000000, paid:70000000, date:'24-Jul-2026', status:'Paid' },
      { no:3, label:'Completion + retention', amount:56000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:9000000, docs:['M&E claim form'] },

  // ZW-002 Shagamu — 1 vendor
  { id:'VP-003', projectId:'ZW-002', vendorId:'VND-003', vendor:'BuildRight Contractors Ltd', contractValue:380000000,
    terms:'Paid once on completion (single payment)',
    status:'Awaiting payment',
    installments:[
      { no:1, label:'Full contract on completion', amount:380000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:19000000, docs:['Shagamu completion claim'] },

  // ZW-005 Traffic Lights — 1 vendor, paid in installments
  { id:'VP-004', projectId:'ZW-005', vendorId:'VND-004', vendor:'SignalTech Systems Ltd', contractValue:340000000,
    terms:'Installments — per junction completion',
    status:'In progress',
    installments:[
      { no:1, label:'Mobilization', amount:102000000, paid:102000000, date:'12-Jul-2026', status:'Paid' },
      { no:2, label:'Junctions 1-3 installed', amount:120000000, paid:120000000, date:'27-Jul-2026', status:'Paid' },
      { no:3, label:'Junctions 4-6 + testing', amount:118000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:17000000, docs:['Testing checklist','Junction 3 evidence'] },

  // ZW-006 Road Marking — 1 vendor, paid once
  { id:'VP-005', projectId:'ZW-006', vendorId:'VND-005', vendor:'BrightLine Road Markings Ltd', contractValue:160000000,
    terms:'Paid once on completion',
    status:'Awaiting payment',
    installments:[
      { no:1, label:'Full contract on completion', amount:160000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:8000000, docs:['Executed sections register'] },
  { id:'VP-006', projectId:'ZW-003', vendorId:'VND-007', vendor:'MetroBuild Rehabilitation Services', contractValue:220000000,
    terms:'Installments — per classroom block completion',
    status:'In progress',
    installments:[
      { no:1, label:'Mobilization', amount:66000000, paid:66000000, date:'12-Jul-2026', status:'Paid' },
      { no:2, label:'Classrooms 1-6 complete', amount:80000000, paid:80000000, date:'28-Jul-2026', status:'Paid' },
      { no:3, label:'Remaining blocks + finishing', amount:74000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:11000000, docs:['Classroom completion list'] },
  { id:'VP-007', projectId:'ZW-004', vendorId:'VND-008', vendor:'Zonecare Facility Operations Team', contractValue:80000000,
    terms:'Monthly — facility management retainer',
    status:'In progress',
    installments:[
      { no:1, label:'July FM retainer', amount:4000000, paid:4000000, date:'28-Jul-2026', status:'Paid' },
      { no:2, label:'August FM retainer', amount:4000000, paid:4000000, date:'—', status:'Awaiting' }
    ], retention:4000000, docs:['FM weekly report','Monthly invoice'] },
  { id:'VP-008', projectId:'ZW-007', vendorId:'VND-006', vendor:'KerbWorks Infrastructure Ltd', contractValue:200000000,
    terms:'Installments — per section delivered',
    status:'In progress',
    installments:[
      { no:1, label:'Mobilization', amount:60000000, paid:60000000, date:'14-Jul-2026', status:'Paid' },
      { no:2, label:'Section 1-2 kerb work', amount:90000000, paid:0, date:'—', status:'Awaiting' },
      { no:3, label:'Completion + retention', amount:50000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:10000000, docs:['Executed sections register'] },
  { id:'VP-009', projectId:'PL-001', vendorId:'VND-009', vendor:'Apex Steel & Reinforcement', contractValue:90000000,
    terms:'Paid once on delivery',
    status:'Paid',
    installments:[ { no:1, label:'Full steel supply on delivery', amount:90000000, paid:90000000, date:'20-Jul-2026', status:'Paid' } ],
    retention:4500000, docs:['Steel delivery note'] },
  { id:'VP-010', projectId:'PL-001', vendorId:'VND-017', vendor:'RoofRight Contracting', contractValue:70000000,
    terms:'Installments — per roof bay',
    status:'In progress',
    installments:[
      { no:1, label:'Materials mobilization', amount:21000000, paid:21000000, date:'18-Jul-2026', status:'Paid' },
      { no:2, label:'Roof bays 1-2', amount:30000000, paid:0, date:'—', status:'Awaiting' },
      { no:3, label:'Completion', amount:19000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:3500000, docs:['Roofing invoice'] },
  { id:'VP-011', projectId:'ZW-002', vendorId:'VND-010', vendor:'City Electrical Contractors', contractValue:65000000,
    terms:'Installments — electrical works',
    status:'In progress',
    installments:[
      { no:1, label:'Mobilization', amount:20000000, paid:20000000, date:'16-Jul-2026', status:'Paid' },
      { no:2, label:'Wiring + panels', amount:45000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:3250000, docs:['Electrical claim'] },
  { id:'VP-012', projectId:'ZW-002', vendorId:'VND-016', vendor:'OnPoint Survey & Geotech', contractValue:25000000,
    terms:'Paid once on completion',
    status:'Paid',
    installments:[ { no:1, label:'Full survey on completion', amount:25000000, paid:25000000, date:'12-Jul-2026', status:'Paid' } ],
    retention:1250000, docs:['Geotech report'] },
  { id:'VP-013', projectId:'ZW-003', vendorId:'VND-011', vendor:'Hydro Plumbing & Drainage', contractValue:55000000,
    terms:'Installments — plumbing works',
    status:'In progress',
    installments:[
      { no:1, label:'Mobilization', amount:16500000, paid:16500000, date:'15-Jul-2026', status:'Paid' },
      { no:2, label:'Plumbing fit-out', amount:38500000, paid:0, date:'—', status:'Awaiting' }
    ], retention:2750000, docs:['Plumbing claim'] },
  { id:'VP-014', projectId:'ZW-003', vendorId:'VND-017', vendor:'RoofRight Contracting', contractValue:60000000,
    terms:'Paid once on completion',
    status:'Awaiting payment',
    installments:[ { no:1, label:'Full roofing on completion', amount:60000000, paid:0, date:'—', status:'Awaiting' } ],
    retention:3000000, docs:['Roofing completion'] },
  { id:'VP-015', projectId:'ZW-004', vendorId:'VND-012', vendor:'SecureFM Security Services', contractValue:36000000,
    terms:'Monthly — security retainer',
    status:'In progress',
    installments:[
      { no:1, label:'July security', amount:3000000, paid:3000000, date:'30-Jul-2026', status:'Paid' },
      { no:2, label:'August security', amount:3000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:0, docs:['Security roster'] },
  { id:'VP-016', projectId:'ZW-004', vendorId:'VND-008', vendor:'Zonecare Facility Operations Team', contractValue:40000000,
    terms:'Paid once on completion of phase',
    status:'In progress',
    installments:[
      { no:1, label:'Phase 1 FM services', amount:20000000, paid:20000000, date:'28-Jul-2026', status:'Paid' },
      { no:2, label:'Phase 2 FM services', amount:20000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:2000000, docs:['FM report'] },
  { id:'VP-017', projectId:'ZW-005', vendorId:'VND-010', vendor:'City Electrical Contractors', contractValue:70000000,
    terms:'Installments — signal power works',
    status:'In progress',
    installments:[
      { no:1, label:'Mobilization', amount:21000000, paid:21000000, date:'17-Jul-2026', status:'Paid' },
      { no:2, label:'Power supply install', amount:49000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:3500000, docs:['Power install claim'] },
  { id:'VP-018', projectId:'ZW-005', vendorId:'VND-013', vendor:'GridWorks Solar & Lighting', contractValue:55000000,
    terms:'Installments — solar lighting',
    status:'In progress',
    installments:[
      { no:1, label:'Mobilization', amount:16500000, paid:16500000, date:'19-Jul-2026', status:'Paid' },
      { no:2, label:'Solar install', amount:38500000, paid:0, date:'—', status:'Awaiting' }
    ], retention:2750000, docs:['Solar claim'] },
  { id:'VP-019', projectId:'ZW-006', vendorId:'VND-014', vendor:'AsphaltPlus Road Solutions', contractValue:60000000,
    terms:'Installments — per road section',
    status:'In progress',
    installments:[
      { no:1, label:'Mobilization', amount:18000000, paid:18000000, date:'16-Jul-2026', status:'Paid' },
      { no:2, label:'Section A asphalt', amount:42000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:3000000, docs:['Asphalt claim'] },
  { id:'VP-020', projectId:'ZW-007', vendorId:'VND-015', vendor:'CastMasters Precast', contractValue:45000000,
    terms:'Installments — per kerb unit batch',
    status:'In progress',
    installments:[
      { no:1, label:'First batch', amount:20000000, paid:20000000, date:'15-Jul-2026', status:'Paid' },
      { no:2, label:'Second batch', amount:25000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:2250000, docs:['Precast delivery'] },
  { id:'VP-021', projectId:'ZW-004', vendorId:'VND-008', vendor:'Zonecare Facility Operations Team', contractValue:50000000,
    terms:'Installments — terminal works',
    status:'In progress',
    installments:[
      { no:1, label:'Mobilization', amount:15000000, paid:15000000, date:'20-Jul-2026', status:'Paid' },
      { no:2, label:'Works completion', amount:35000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:2500000, docs:['Terminal works invoice'] },
  { id:'VP-022', projectId:'ZW-006', vendorId:'VND-014', vendor:'AsphaltPlus Road Solutions', contractValue:70000000,
    terms:'Paid once on completion',
    status:'Awaiting payment',
    installments:[ { no:1, label:'Full asphalt works', amount:70000000, paid:0, date:'—', status:'Awaiting' } ],
    retention:3500000, docs:['Asphalt completion'] },
  { id:'VP-023', projectId:'ZW-007', vendorId:'VND-006', vendor:'KerbWorks Infrastructure Ltd', contractValue:60000000,
    terms:'Paid once on completion',
    status:'Awaiting payment',
    installments:[ { no:1, label:'Full kerb completion', amount:60000000, paid:0, date:'—', status:'Awaiting' } ],
    retention:3000000, docs:['Kerb completion'] },
  { id:'VP-024', projectId:'ZW-004', vendorId:'VND-018', vendor:'Terminal Care Cleaning Services', contractValue:20000000,
    terms:'Monthly — cleaning retainer',
    status:'In progress',
    installments:[
      { no:1, label:'July cleaning', amount:2000000, paid:2000000, date:'29-Jul-2026', status:'Paid' },
      { no:2, label:'August cleaning', amount:2000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:0, docs:['Cleaning roster'] },
  { id:'VP-025', projectId:'ZW-006', vendorId:'VND-019', vendor:'LineMark Paint & Materials Supply', contractValue:30000000,
    terms:'Paid once on delivery',
    status:'Paid',
    installments:[ { no:1, label:'Full paint supply', amount:30000000, paid:30000000, date:'22-Jul-2026', status:'Paid' } ],
    retention:0, docs:['Paint delivery note'] },
  { id:'VP-026', projectId:'ZW-007', vendorId:'VND-020', vendor:'SignWorks Fabrication', contractValue:28000000,
    terms:'Installments — per signage batch',
    status:'In progress',
    installments:[
      { no:1, label:'First signage batch', amount:12000000, paid:12000000, date:'18-Jul-2026', status:'Paid' },
      { no:2, label:'Second signage batch', amount:16000000, paid:0, date:'—', status:'Awaiting' }
    ], retention:1400000, docs:['Signage invoice'] }
];
