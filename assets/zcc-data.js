/* ============================================================
   Zoneware Control Center (ZCC) v1.0 — SHARED DATA LAYER
   Single source of truth for every page (Command Center + Staff
   Workspace). Loaded on every page before zcc-app.js.
   In production this is replaced by Google Sheets / AppSheet.
   ============================================================ */
'use strict';

const DOCUMENTS = [{"documentId": "DOC-ZW-001-001", "projectId": "ZW-001", "projectName": "School for the Blind, Festac", "client": "Lagos State Ministry / Education", "type": "Award Letter", "stage": "Award / Contract", "title": "Award Letter - School for the Blind", "date": "12-Jun-2026", "owner": "Toyin Adeyemi", "status": "Available", "file": "sample_documents/DOC-ZW-001-001_Award_Letter_Sample.pdf"}, {"documentId": "DOC-ZW-001-002", "projectId": "ZW-001", "projectName": "School for the Blind, Festac", "client": "Lagos State Ministry / Education", "type": "BOQ / Scope", "stage": "Contract Documentation", "title": "BOQ and Scope Summary", "date": "14-Jun-2026", "owner": "Engr. Ayodele Ogunnaike", "status": "Available", "file": "sample_documents/DOC-ZW-001-002_BOQ_Scope_Summary_Sample.pdf"}, {"documentId": "DOC-ZW-001-003", "projectId": "ZW-001", "projectName": "School for the Blind, Festac", "client": "Lagos State Ministry / Education", "type": "Progress Report", "stage": "Execution", "title": "Site Progress Report", "date": "28-Jul-2026", "owner": "Chinedu Okafor", "status": "Available", "file": "sample_documents/DOC-ZW-001-003_Site_Progress_Report_Sample.pdf"}, {"documentId": "DOC-ZW-002-001", "projectId": "ZW-002", "projectName": "Shagamu Construction Project", "client": "Ogun State Works Programme", "type": "Recovery Plan", "stage": "Execution", "title": "Vendor Recovery Programme", "date": "27-Jul-2026", "owner": "Femi Adebayo", "status": "Available", "file": "sample_documents/DOC-ZW-002-001_Vendor_Recovery_Programme_Sample.pdf"}, {"documentId": "DOC-ZW-003-001", "projectId": "ZW-003", "projectName": "Public School Rehabilitation - 18 Classrooms", "client": "SCRPS", "type": "Progress Report", "stage": "Execution", "title": "Classroom Progress Report", "date": "24-Jul-2026", "owner": "Aisha Balogun", "status": "Available", "file": "sample_documents/DOC-ZW-003-001_Classroom_Progress_Report_Sample.pdf"}, {"documentId": "DOC-ZW-004-001", "projectId": "ZW-004", "projectName": "Ojodu Bus Terminal Facility Management", "client": "LAMATA", "type": "FM Report", "stage": "Monthly Sign-Off", "title": "Weekly Facility Management Report", "date": "28-Jul-2026", "owner": "Ifeanyi Nwachukwu", "status": "Available", "file": "sample_documents/DOC-ZW-004-001_Weekly_FM_Report_Sample.pdf"}, {"documentId": "DOC-ZW-005-001", "projectId": "ZW-005", "projectName": "Traffic Light Installation Programme", "client": "Ministry of Transportation", "type": "Inspection Request", "stage": "Inspection", "title": "Inspection Request Letter", "date": "26-Jul-2026", "owner": "Toyin Adeyemi", "status": "Available", "file": "sample_documents/DOC-ZW-005-001_Inspection_Request_Sample.pdf"}, {"documentId": "DOC-ZW-005-002", "projectId": "ZW-005", "projectName": "Traffic Light Installation Programme", "client": "Ministry of Transportation", "type": "Testing Checklist", "stage": "Testing", "title": "Junction Testing Checklist", "date": "27-Jul-2026", "owner": "Adewale Johnson", "status": "Available", "file": "sample_documents/DOC-ZW-005-002_Junction_Testing_Checklist_Sample.pdf"}, {"documentId": "DOC-ZW-006-001", "projectId": "ZW-006", "projectName": "Road Marking and Lane Signage Works", "client": "Ministry of Transportation", "type": "Execution Register", "stage": "Execution", "title": "Executed Sections Register", "date": "28-Jul-2026", "owner": "Kemi Salami", "status": "Available", "file": "sample_documents/DOC-ZW-006-001_Executed_Sections_Register_Sample.pdf"}, {"documentId": "DOC-ZW-007-001", "projectId": "ZW-007", "projectName": "Median Kerb and Signage Installation", "client": "Ministry of Works / Transportation", "type": "Vendor Update", "stage": "Execution", "title": "Vendor Progress Update Request", "date": "21-Jul-2026", "owner": "Musa Bello", "status": "Available", "file": "sample_documents/DOC-ZW-007-001_Vendor_Progress_Update_Request_Sample.pdf"}];

const PROJECTS = [{"id": "ZW-001", "name": "School for the Blind, Festac", "client": "Lagos State Ministry / Education", "userDept": "SCRPS / User Department", "sector": "Building Construction", "location": "Festac, Lagos", "pm": "Engr. Ayodele Ogunnaike", "supervisor": "Chinedu Okafor", "vendor": "Landmark Civil Works Ltd + Prime M&E Services", "contractValue": 850000000, "mobilization": "60%", "planned": 55, "actual": 38, "forecast": "15-Nov-2026", "plannedEnd": "30-Sep-2026", "delayDays": 46, "status": "Red", "freshness": "Fresh", "daysOld": 1, "stage": "Execution", "priority": "High", "issue": "Work progress below planned level due to complex accessibility requirements and pending technical approvals.", "delaySource": "Client/Government Approval + Vendor Coordination", "action": "Confirm outstanding approvals, agree recovery plan with vendor, and escalate technical bottlenecks.", "owner": "Toyin Adeyemi / Engr. Ayodele Ogunnaike", "due": "31-Jul-2026", "escalate": "Yes", "fileStage": "Execution / Technical Review", "currentOffice": "Project Site + User Department", "daysInStage": 18, "fileOwner": "Engr. Ayodele Ogunnaike / Toyin Adeyemi", "nextAction": "Close technical review comments and update inspection readiness date.", "docs": ["Google Drive folder: Site photos", "BOQ / Scope document", "Latest weekly site report"], "history": [["19-Jul", 45, 30], ["22-Jul", 48, 33], ["25-Jul", 52, 35], ["28-Jul", 55, 38]], "timeline": ["Award Received", "Acceptance Letter", "Insurance Bond", "Mobilization Paid", "Execution / Technical Review", "Inspection Requested", "Completion Certificate", "Payment Processing"], "timelineIndex": 4}, {"id": "ZW-002", "name": "Shagamu Construction Project", "client": "Ogun State Works Programme", "userDept": "Works Implementation Unit", "sector": "Construction", "location": "Shagamu", "pm": "Femi Adebayo", "supervisor": "Sola Martins", "vendor": "BuildRight Contractors Ltd", "contractValue": 420000000, "mobilization": "30%", "planned": 45, "actual": 40, "forecast": "30-Oct-2026", "plannedEnd": "15-Oct-2026", "delayDays": 15, "status": "Amber", "freshness": "Fresh", "daysOld": 2, "stage": "Execution", "priority": "High", "issue": "Execution is moving, but progress is slightly behind plan due to vendor resource availability.", "delaySource": "Vendor/Subcontractor", "action": "Agree catch-up programme and confirm manpower/material schedule.", "owner": "Femi Adebayo", "due": "30-Jul-2026", "escalate": "No", "fileStage": "Execution", "currentOffice": "Project Site", "daysInStage": 10, "fileOwner": "Femi Adebayo", "nextAction": "Submit updated progress and material delivery plan.", "docs": ["Site report folder", "Vendor work programme", "Photo evidence folder"], "history": [["19-Jul", 35, 30], ["22-Jul", 38, 34], ["25-Jul", 42, 37], ["28-Jul", 45, 40]], "timeline": ["Award Received", "Acceptance Letter", "Insurance Bond", "Mobilization Paid", "Execution", "Inspection Requested", "Completion Certificate", "Payment Processing"], "timelineIndex": 4}, {"id": "ZW-003", "name": "Public School Rehabilitation \u2014 18 Classrooms", "client": "SCRPS", "userDept": "Public Schools Rehabilitation", "sector": "Rehabilitation", "location": "Lagos", "pm": "Aisha Balogun", "supervisor": "Kunle Lawal", "vendor": "MetroBuild Rehabilitation Services", "contractValue": 260000000, "mobilization": "75%", "planned": 68, "actual": 57, "forecast": "20-Sep-2026", "plannedEnd": "05-Sep-2026", "delayDays": 15, "status": "Amber", "freshness": "Aging", "daysOld": 4, "stage": "Execution", "priority": "Medium", "issue": "Finishing work is behind because some materials and vendor sign-offs are pending.", "delaySource": "Material + Vendor Coordination", "action": "Confirm delivery of finishing materials and update classroom-by-classroom completion list.", "owner": "Aisha Balogun / Mr. Deji Falana", "due": "01-Aug-2026", "escalate": "No", "fileStage": "Mobilization Paid / Execution", "currentOffice": "Project Site", "daysInStage": 21, "fileOwner": "Femi Adebayo", "nextAction": "Submit progress evidence for next inspection planning.", "docs": ["Classroom progress photos", "Materials delivery note", "Weekly progress report"], "history": [["16-Jul", 55, 44], ["19-Jul", 60, 49], ["22-Jul", 64, 53], ["24-Jul", 68, 57]], "timeline": ["Award Received", "Acceptance Letter", "Insurance Bond", "Mobilization Paid", "Execution", "Inspection Requested", "Completion Certificate", "Payment Processing"], "timelineIndex": 4}, {"id": "ZW-004", "name": "Ojodu Bus Terminal Facility Management", "client": "LAMATA", "userDept": "Transport User Department", "sector": "Facility Management", "location": "Ojodu-Berger, Lagos", "pm": "Ifeanyi Nwachukwu", "supervisor": "Mariam Yusuf", "vendor": "Zonecare Facility Operations Team", "contractValue": 90000000, "mobilization": "Monthly", "planned": 75, "actual": 75, "forecast": "31-Dec-2026", "plannedEnd": "31-Dec-2026", "delayDays": 0, "status": "Green", "freshness": "Fresh", "daysOld": 1, "stage": "Ongoing FM", "priority": "Medium", "issue": "Routine facility management ongoing. No critical operational issue currently reported.", "delaySource": "No Delay", "action": "Maintain weekly FM report and monthly invoice documentation.", "owner": "Ifeanyi Nwachukwu", "due": "31-Jul-2026", "escalate": "No", "fileStage": "Monthly Invoice / User Dept Sign-off", "currentOffice": "LAMATA / User Department", "daysInStage": 6, "fileOwner": "Ifeanyi Nwachukwu", "nextAction": "Obtain monthly sign-off and submit invoice support documents.", "docs": ["FM weekly report", "Maintenance request log", "Monthly invoice support"], "history": [["19-Jul", 70, 70], ["22-Jul", 72, 72], ["25-Jul", 74, 74], ["28-Jul", 75, 75]], "timeline": ["Contract Active", "Monthly Service Delivery", "User Dept Sign-off", "Invoice Submitted", "Payment Processing", "Payment Received"], "timelineIndex": 2}, {"id": "ZW-005", "name": "Traffic Light Installation Programme", "client": "Ministry of Transportation", "userDept": "Traffic / Transport Unit", "sector": "Traffic Systems", "location": "Multiple Lagos Junctions", "pm": "Tunde Ogunleye", "supervisor": "Adewale Johnson", "vendor": "SignalTech Systems Ltd", "contractValue": 380000000, "mobilization": "50%", "planned": 82, "actual": 70, "forecast": "25-Aug-2026", "plannedEnd": "10-Aug-2026", "delayDays": 15, "status": "Amber", "freshness": "Fresh", "daysOld": 1, "stage": "Installation / Testing", "priority": "High", "issue": "Some junctions completed, but final testing and government inspection are pending for selected locations.", "delaySource": "Inspection + External Vendor", "action": "Prepare junction completion checklist and request joint inspection dates.", "owner": "Tunde Ogunleye / Toyin Adeyemi", "due": "30-Jul-2026", "escalate": "Yes", "fileStage": "Inspection Requested", "currentOffice": "Ministry Inspector / User Department", "daysInStage": 12, "fileOwner": "Toyin Adeyemi", "nextAction": "Follow up inspection schedule and document completed junctions.", "docs": ["Junction photo evidence", "Testing checklist", "Inspection request letter"], "history": [["19-Jul", 70, 61], ["22-Jul", 74, 65], ["25-Jul", 78, 68], ["28-Jul", 82, 70]], "timeline": ["Award Received", "Mobilization Paid", "Installation", "Testing", "Inspection Requested", "Inspection Completed", "Completion Certificate", "Payment Processing"], "timelineIndex": 4}, {"id": "ZW-006", "name": "Road Marking and Lane Signage Works", "client": "Ministry of Transportation", "userDept": "Road / Traffic Unit", "sector": "Road Marking", "location": "Lagos", "pm": "Kemi Salami", "supervisor": "Peter Udo", "vendor": "BrightLine Road Markings Ltd", "contractValue": 180000000, "mobilization": "70%", "planned": 62, "actual": 64, "forecast": "18-Aug-2026", "plannedEnd": "20-Aug-2026", "delayDays": 0, "status": "Green", "freshness": "Fresh", "daysOld": 1, "stage": "Execution", "priority": "Medium", "issue": "Work is slightly ahead of planned progress. Payment file movement should be monitored early.", "delaySource": "No Delay", "action": "Continue execution and prepare early documentation for inspection.", "owner": "Femi Adebayo", "due": "31-Jul-2026", "escalate": "No", "fileStage": "Execution", "currentOffice": "Project Site", "daysInStage": 8, "fileOwner": "Femi Adebayo", "nextAction": "Compile executed sections and photo evidence.", "docs": ["Road marking photos", "Executed sections register", "Material usage sheet"], "history": [["19-Jul", 50, 50], ["22-Jul", 54, 56], ["25-Jul", 58, 60], ["28-Jul", 62, 64]], "timeline": ["Award Received", "Mobilization Paid", "Execution", "Inspection Requested", "Completion Certificate", "CIA / STO", "Payment Released"], "timelineIndex": 2}, {"id": "ZW-007", "name": "Median Kerb and Signage Installation", "client": "Ministry of Works / Transportation", "userDept": "Road Infrastructure Unit", "sector": "Road Infrastructure", "location": "Lagos", "pm": "Musa Bello", "supervisor": "Grace Eze", "vendor": "KerbWorks Infrastructure Ltd", "contractValue": 240000000, "mobilization": "50%", "planned": 44, "actual": 31, "forecast": "05-Oct-2026", "plannedEnd": "15-Sep-2026", "delayDays": 20, "status": "Amber", "freshness": "Stale", "daysOld": 7, "stage": "Execution", "priority": "High", "issue": "Latest structured update is overdue. Vendor progress needs verification and photo evidence update.", "delaySource": "Stale Update + Vendor/Subcontractor", "action": "Obtain fresh site update, verify vendor progress, and upload time-stamped photos.", "owner": "Musa Bello / Grace Eze", "due": "29-Jul-2026", "escalate": "Yes", "fileStage": "Execution", "currentOffice": "Project Site", "daysInStage": 14, "fileOwner": "Femi Adebayo", "nextAction": "Submit overdue update and confirm whether recovery plan is required.", "docs": ["Last site photo folder", "Vendor progress note", "Pending update required"], "history": [["13-Jul", 28, 20], ["16-Jul", 34, 24], ["19-Jul", 39, 28], ["21-Jul", 44, 31]], "timeline": ["Award Received", "Mobilization Paid", "Execution", "Inspection Requested", "Completion Certificate", "Payment Processing"], "timelineIndex": 2}];

const COST_DATA={
  'ZW-001':{certified:323000000,paid:255000000,retention:42500000,variation:0},
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
  {id:'RISK-004',projectId:'ZW-001',risk:'Work progress below planned level due to complex accessibility requirements and pending technical approvals.',probability:'High',impact:'High',owner:'Engr. Ayodele Ogunnaike',mitigation:'Confirm outstanding approvals and agree recovery plan with vendor.',status:'High'},
  {id:'RISK-005',projectId:'ZW-003',risk:'Finishing materials and vendor sign-offs pending.',probability:'Medium',impact:'Medium',owner:'Aisha Balogun',mitigation:'Confirm delivery of finishing materials and update completion list.',status:'Medium'},
  {id:'RISK-006',projectId:'ZW-005',risk:'Testing and government inspection pending for selected junctions.',probability:'Medium',impact:'High',owner:'Tunde Ogunleye',mitigation:'Prepare junction completion checklist and request joint inspection dates.',status:'Medium'}
];

const SITE_PHOTOS=[
  {id:'PH-001',projectId:'ZW-001',project:'School for the Blind, Festac',stage:'Execution',type:'Site Photo',description:'Foundation and accessibility ramp progress',uploadedBy:'Chinedu Okafor',role:'Site Supervisor',date:'28-Jul-2026',time:'14:32',file:'sample_documents/DOC-ZW-001-003_Site_Progress_Report_Sample.pdf'},
  {id:'PH-002',projectId:'ZW-002',project:'Shagamu Construction Project',stage:'Execution',type:'Weekly Report',description:'Week 8 progress report with photo evidence',uploadedBy:'Femi Adebayo',role:'Project Manager',date:'27-Jul-2026',time:'09:15',file:'sample_documents/DOC-ZW-002-001_Vendor_Recovery_Programme_Sample.pdf'},
  {id:'PH-003',projectId:'ZW-003',project:'Public School Rehabilitation — 18 Classrooms',stage:'Execution',type:'Site Photo',description:'Classroom 12 finishing work — interior',uploadedBy:'Aisha Balogun',role:'Project Manager',date:'24-Jul-2026',time:'16:45',file:'sample_documents/DOC-ZW-003-001_Classroom_Progress_Report_Sample.pdf'},
  {id:'PH-004',projectId:'ZW-004',project:'Ojodu Bus Terminal Facility Management',stage:'Monthly Sign-Off',type:'FM Report',description:'Weekly facility condition and maintenance log',uploadedBy:'Ifeanyi Nwachukwu',role:'Facility Manager',date:'28-Jul-2026',time:'11:20',file:'sample_documents/DOC-ZW-004-001_Weekly_FM_Report_Sample.pdf'},
  {id:'PH-005',projectId:'ZW-005',project:'Traffic Light Installation Programme',stage:'Testing',type:'Inspection Photo',description:'Junction 3 controller testing evidence',uploadedBy:'Adewale Johnson',role:'Traffic Systems Supervisor',date:'27-Jul-2026',time:'13:05',file:'sample_documents/DOC-ZW-005-002_Junction_Testing_Checklist_Sample.pdf'},
  {id:'PH-006',projectId:'ZW-005',project:'Traffic Light Installation Programme',stage:'Inspection Request',type:'Inspection Evidence',description:'Inspection request letter with junction photos',uploadedBy:'Toyin Adeyemi',role:'Contract Lead',date:'26-Jul-2026',time:'10:00',file:'sample_documents/DOC-ZW-005-001_Inspection_Request_Sample.pdf'},
  {id:'PH-007',projectId:'ZW-006',project:'Road Marking and Lane Signage Works',stage:'Execution',type:'Site Photo',description:'Completed section A-B road marking evidence',uploadedBy:'Kemi Salami',role:'Project Manager',date:'28-Jul-2026',time:'15:40',file:'sample_documents/DOC-ZW-006-001_Executed_Sections_Register_Sample.pdf'},
  {id:'PH-008',projectId:'ZW-001',project:'School for the Blind, Festac',stage:'Execution',type:'Site Photo',description:'Accessibility railing installation close-up',uploadedBy:'Chinedu Okafor',role:'Site Supervisor',date:'25-Jul-2026',time:'08:50',file:'sample_documents/DOC-ZW-001-003_Site_Progress_Report_Sample.pdf'},
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

const TASKS_SEED=[{"id": "UP-001", "project": "School for the Blind, Festac", "projectId": "ZW-001", "stageNo": 0, "stage": "Contract Documentation", "required": "BOQ / Scope Summary", "assigned": "Engr. Ayodele Ogunnaike", "role": "Project Manager", "status": "Signed Off", "uploadedBy": "Engr. Ayodele Ogunnaike", "signedBy": "Engr. Ayodele Ogunnaike", "date": "14-Jun-2026", "file": "sample_documents/DOC-ZW-001-002_BOQ_Scope_Summary_Sample.pdf", "due": "14-Jun-2026"}, {"id": "UP-007", "project": "School for the Blind, Festac", "projectId": "ZW-001", "stageNo": 2, "stage": "Execution", "required": "Site Progress Report", "assigned": "Chinedu Okafor", "role": "Site Supervisor", "status": "Signed Off", "uploadedBy": "Chinedu Okafor", "signedBy": "Chinedu Okafor", "date": "28-Jul-2026", "file": "sample_documents/DOC-ZW-001-003_Site_Progress_Report_Sample.pdf", "due": "28-Jul-2026"}, {"id": "UP-002", "project": "Traffic Light Installation Programme", "projectId": "ZW-005", "stageNo": 4, "stage": "Inspection Request", "required": "Inspection Request Letter", "assigned": "Toyin Adeyemi", "role": "Contract Lead", "status": "Signed Off", "uploadedBy": "Toyin Adeyemi", "signedBy": "Toyin Adeyemi", "date": "26-Jul-2026", "file": "sample_documents/DOC-ZW-005-001_Inspection_Request_Sample.pdf", "due": "26-Jul-2026"}, {"id": "UP-008", "project": "Traffic Light Installation Programme", "projectId": "ZW-005", "stageNo": 3, "stage": "Testing", "required": "Junction Testing Checklist", "assigned": "Adewale Johnson", "role": "Traffic Systems Supervisor", "status": "Signed Off", "uploadedBy": "Adewale Johnson", "signedBy": "Adewale Johnson", "date": "27-Jul-2026", "file": "sample_documents/DOC-ZW-005-002_Junction_Testing_Checklist_Sample.pdf", "due": "27-Jul-2026"}, {"id": "UP-003", "project": "Median Kerb and Signage Installation", "projectId": "ZW-007", "stageNo": 2, "stage": "Execution", "required": "Vendor Progress Update", "assigned": "Musa Bello", "role": "Project Manager", "status": "Pending Upload", "uploadedBy": "\u2014", "signedBy": "\u2014", "date": "\u2014", "file": "", "due": "29-Jul-2026"}, {"id": "UP-004", "project": "Median Kerb and Signage Installation", "projectId": "ZW-007", "stageNo": 2, "stage": "Execution", "required": "Site Photo Evidence", "assigned": "Grace Eze", "role": "Site Supervisor", "status": "Pending Upload", "uploadedBy": "\u2014", "signedBy": "\u2014", "date": "\u2014", "file": "", "due": "29-Jul-2026"}, {"id": "UP-005", "project": "Ojodu Bus Terminal Facility Management", "projectId": "ZW-004", "stageNo": 2, "stage": "Monthly Sign-Off", "required": "Weekly FM Report", "assigned": "Ifeanyi Nwachukwu", "role": "Facility Manager", "status": "Signed Off", "uploadedBy": "Ifeanyi Nwachukwu", "signedBy": "Ifeanyi Nwachukwu", "date": "28-Jul-2026", "file": "sample_documents/DOC-ZW-004-001_Weekly_FM_Report_Sample.pdf", "due": "28-Jul-2026"}, {"id": "UP-006", "project": "Road Marking and Lane Signage Works", "projectId": "ZW-006", "stageNo": 2, "stage": "Execution", "required": "Executed Sections Register", "assigned": "Kemi Salami", "role": "Project Manager", "status": "Uploaded - Awaiting Review", "uploadedBy": "Kemi Salami", "signedBy": "Kemi Salami", "date": "28-Jul-2026", "file": "sample_documents/DOC-ZW-006-001_Executed_Sections_Register_Sample.pdf", "due": "28-Jul-2026"}, {"id": "UP-009", "project": "Traffic Light Installation Programme", "projectId": "ZW-005", "stageNo": 3, "stage": "Testing", "required": "Controller Calibration Evidence", "assigned": "Adewale Johnson", "role": "Traffic Systems Supervisor", "status": "Pending Upload", "uploadedBy": "\u2014", "signedBy": "\u2014", "date": "\u2014", "file": "", "due": "31-Jul-2026"}, {"id": "UP-010", "project": "School for the Blind, Festac", "projectId": "ZW-001", "stageNo": 2, "stage": "Execution", "required": "Updated Site Photo Evidence", "assigned": "Chinedu Okafor", "role": "Site Supervisor", "status": "Pending Upload", "uploadedBy": "\u2014", "signedBy": "\u2014", "date": "\u2014", "file": "", "due": "31-Jul-2026"}, {"id": "UP-011", "project": "Traffic Light Installation Programme", "projectId": "ZW-005", "stageNo": 4, "stage": "Inspection Follow-Up", "required": "Inspector Visit Confirmation Note", "assigned": "Toyin Adeyemi", "role": "Contract Lead", "status": "Uploaded - Awaiting Review", "uploadedBy": "Toyin Adeyemi", "signedBy": "Pending MD/Reviewer", "date": "30-Jul-2026", "file": "sample_documents/DOC-ZW-005-001_Inspection_Request_Sample.pdf", "due": "31-Jul-2026"}, {"id": "UP-012", "project": "Public School Rehabilitation — 18 Classrooms", "projectId": "ZW-003", "stageNo": 2, "stage": "Execution", "required": "Classroom-by-Classroom Completion List", "assigned": "Aisha Balogun", "role": "Project Manager", "status": "Pending Upload", "uploadedBy": "—", "signedBy": "—", "date": "—", "file": "", "due": "01-Aug-2026"}, {"id": "UP-013", "project": "Shagamu Construction Project", "projectId": "ZW-002", "stageNo": 2, "stage": "Execution", "required": "Vendor Recovery Programme", "assigned": "Femi Adebayo", "role": "Project Manager", "status": "Signed Off", "uploadedBy": "Femi Adebayo", "signedBy": "Femi Adebayo", "date": "27-Jul-2026", "file": "sample_documents/DOC-ZW-002-001_Vendor_Recovery_Programme_Sample.pdf", "due": "27-Jul-2026"}];

const ALL_PHOTOS=[
  {id:'PH-001',projectId:'ZW-001',project:'School for the Blind, Festac',stage:'Execution',type:'Site Photo',description:'Foundation and accessibility ramp progress',uploadedBy:'Chinedu Okafor',role:'Site Supervisor',date:'28-Jul-2026',time:'14:32'},
  {id:'PH-002',projectId:'ZW-002',project:'Shagamu Construction Project',stage:'Execution',type:'Weekly Report',description:'Week 8 progress report with photo evidence',uploadedBy:'Femi Adebayo',role:'Project Manager',date:'27-Jul-2026',time:'09:15'},
  {id:'PH-003',projectId:'ZW-005',project:'Traffic Light Installation Programme',stage:'Testing',type:'Inspection Photo',description:'Junction 3 controller testing evidence',uploadedBy:'Adewale Johnson',role:'Traffic Systems Supervisor',date:'27-Jul-2026',time:'13:05'},
  {id:'PH-004',projectId:'ZW-006',project:'Road Marking and Lane Signage Works',stage:'Execution',type:'Site Photo',description:'Completed section A-B road marking evidence',uploadedBy:'Kemi Salami',role:'Project Manager',date:'28-Jul-2026',time:'15:40'},
  {id:'PH-005',projectId:'ZW-001',project:'School for the Blind, Festac',stage:'Execution',type:'Site Photo',description:'Accessibility railing installation close-up',uploadedBy:'Chinedu Okafor',role:'Site Supervisor',date:'25-Jul-2026',time:'08:50'},
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
  { id:'FT-001', projectId:'ZW-001', project:'School for the Blind, Festac', client:'Lagos State Ministry / Education',
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
(function applyLive(){
  const live = loadLive();
  if (live.projects && Array.isArray(live.projects) && live.projects.length){ PROJECTS.length = 0; live.projects.forEach(x => PROJECTS.push(x)); }
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
    summary:'Coordination of government inspection, approval and completion certificate. [SAMPLE — replace with Blessing SOP.]' , file:'sop_documents/SOP-005_Inspection_and_Approval.pdf' }
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
  { id:'CMP-004', item:'Insurance Bond — School for the Blind', type:'Project Insurance', owner:'Contract Lead', applies:'ZW-001',
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
  { projectId:'ZW-001', stepIndex:2, note:'With User Department — awaiting technical approval' },
  { projectId:'ZW-002', stepIndex:1, note:'At Audit — vendor resource review' },
  { projectId:'ZW-003', stepIndex:1, note:'At Audit — finishing materials sign-off' },
  { projectId:'ZW-004', stepIndex:4, note:'At Accounts — monthly invoice certification' },
  { projectId:'ZW-005', stepIndex:3, note:'At Engineering — junction testing evidence' },
  { projectId:'ZW-006', stepIndex:4, note:'At Accounts — early payment documentation' },
  { projectId:'ZW-007', stepIndex:1, note:'At Audit — awaiting fresh site update' }
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
  { id:'INS-001', projectId:'ZW-001', project:'School for the Blind, Festac', type:'Technical Inspection', requested:'20-Jul-2026', daysWaiting:16, inspector:'Ministry Inspector', status:'Awaiting', nextAction:'Chase inspector; confirm inspection date' },
  { id:'INS-002', projectId:'ZW-005', project:'Traffic Light Installation Programme', type:'Junction Testing', requested:'26-Jul-2026', daysWaiting:10, inspector:'Ministry Inspector', status:'Awaiting', nextAction:'Request joint inspection dates' },
  { id:'INS-003', projectId:'ZW-006', project:'Road Marking and Lane Signage Works', type:'Final Inspection', requested:'30-Jul-2026', daysWaiting:6, inspector:'Ministry Inspector', status:'Scheduled', nextAction:'Prepare executed sections register' },
  { id:'INS-004', projectId:'ZW-004', project:'Ojodu Bus Terminal Facility Management', type:'Monthly FM Review', requested:'01-Aug-2026', daysWaiting:4, inspector:'LAMATA / User Dept', status:'Completed', nextAction:'Obtain sign-off' }
];

/* 6. Internal payment requisitions (currently over email/WhatsApp) */
const REQUISITIONS = [
  { id:'REQ-001', projectId:'ZW-002', project:'Shagamu Construction Project', item:'Sand & Cement Delivery', amount:3400000, requestedBy:'Femi Adebayo', status:'Pending MD', date:'01-Aug-2026', note:'Vendor invoice #2214' },
  { id:'REQ-002', projectId:'ZW-003', project:'Public School Rehabilitation — 18 Classrooms', item:'Finishing Materials (paint)', amount:1850000, requestedBy:'Aisha Balogun', status:'Approved', date:'29-Jul-2026', note:'Approved by Contract Lead' },
  { id:'REQ-003', projectId:'ZW-001', project:'School for the Blind, Festac', item:'Railing Fabrication', amount:5200000, requestedBy:'Engr. Ayodele Ogunnaike', status:'Pending MD', date:'31-Jul-2026', note:'Requires MD approval (>PM limit)' },
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
  { id:'VND-001', name:'Landmark Civil Works Ltd', category:'Civil Construction', phone:'0802 111 2233', trusted:true, rating:4, projects:['ZW-001'], note:'Core civil works partner; from Ministry list.' },
  { id:'VND-002', name:'Prime M&E Services', category:'Mechanical & Electrical', phone:'0803 222 3344', trusted:true, rating:4, projects:['ZW-001'], note:'M&E partner for School for the Blind.' },
  { id:'VND-003', name:'BuildRight Contractors Ltd', category:'Construction', phone:'0804 333 4455', trusted:false, rating:3, projects:['ZW-002'], note:'Shagamu vendor.' },
  { id:'VND-004', name:'SignalTech Systems Ltd', category:'Traffic Systems', phone:'0805 444 5566', trusted:true, rating:5, projects:['ZW-005'], note:'Traffic light partner; strong reliability.' },
  { id:'VND-005', name:'BrightLine Road Markings Ltd', category:'Road Marking', phone:'0806 555 6677', trusted:false, rating:3, projects:['ZW-006'], note:'Line marking vendor.' },
  { id:'VND-006', name:'KerbWorks Infrastructure Ltd', category:'Road Infrastructure', phone:'0807 666 7788', trusted:false, rating:3, projects:['ZW-007'], note:'Median kerb vendor.' },
  { id:'VND-007', name:'MetroBuild Rehabilitation Services', category:'Rehabilitation', phone:'0808 777 8899', trusted:false, rating:3, projects:['ZW-003'], note:'Classroom rehabilitation partner.' }
];

/* ============================================================
   Zonexa v1.0 — DEMO SITE PHOTO IMAGES
   Maps each project to a demo site photo, and attaches an image
   to every SITE_PHOTOS / ALL_PHOTOS record so the Site Photos
   pages show a real picture per project.
   ============================================================ */
/* Each project has a gallery of demo photos (two angles). */
const PROJECT_IMAGE = {
  'ZW-001':['images/site-school-blind.jpg','images/site-school-blind-2.jpg'],
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
const ARCHIVE = [
  { id:'ZW-100', name:'Loop Detector & Geo-sensor Installation — Ikeja Bridge', client:'Ministry of Transportation', sector:'Traffic Systems',
    location:'Ikeja, Lagos', pm:'Tunde Ogunleye', contractValue:145000000, completed:'18-Mar-2025', closed:'02-Apr-2025',
    retentionReleased:'Yes', summary:'Completed and handed over; 5% retention released after 6 months.', docs:['sample_documents/DOC-ZW-005-001_Inspection_Request_Sample.pdf','sample_documents/DOC-ZW-005-002_Junction_Testing_Checklist_Sample.pdf'] },
  { id:'ZW-101', name:'Street Light Installation — Phase 1', client:'Lagos State Ministry / Works', sector:'Transportation',
    location:'Lagos', pm:'Kemi Salami', contractValue:96000000, completed:'12-Dec-2024', closed:'20-Jan-2025',
    retentionReleased:'Yes', summary:'Completed and close-out archived after final certification.', docs:['sample_documents/DOC-ZW-006-001_Executed_Sections_Register_Sample.pdf'] },
  { id:'ZW-102', name:'Bridging & Roadworks — Ikeja Flyover Support', client:'Lagos State Ministry / Works', sector:'Road Infrastructure',
    location:'Ikeja, Lagos', pm:'Musa Bello', contractValue:210000000, completed:'05-Nov-2024', closed:'28-Nov-2024',
    retentionReleased:'Yes', summary:'Closed out; retention released on completion certificate.', docs:['sample_documents/DOC-ZW-001-002_BOQ_Scope_Summary_Sample.pdf'] }
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
