/* ============================================================
   ZCC — GOOGLE SHEET DATA SOURCE (Trev-style)
   The Google Sheet is the controllable database. The portal reads
   it via the published gviz JSON feed, so you input rows in the
   sheet and the dashboard reflects them automatically — no code
   edits, no redeploy.
   ------------------------------------------------------------
   TO ENABLE:
   1. Create/publish your Zonexa Google Sheet ("anyone with the
      link can view" OR use the File → Share → Publish to web
      option) so the gviz feed is readable.
   2. Set SHEET_ID below to your sheet's id (the long code in the
      URL between /d/ and /edit).
   3. The tabs (Companies, Projects, Documents, Payments) hold the
      rows you control.
   ============================================================ */
const SHEET_ID = '1ed7wUQXne4iUKu0M7dO1X9CpjPMJzwUIm47vGLg_S8I';   // Zonexa sheet, e.g. '1cDi8Vf3OEwc6Mmh2pWixr12Gz1_1RuNkG93uF7fjbyA'
const SHEET_ACTIVE = !!SHEET_ID; // becomes true once an id is set

/* Web app endpoint (AppScript) — enables portal buttons to write back
   to the sheet. Paste the deployed Web app URL here, e.g.
   'https://script.google.com/macros/s/AKfy.../exec' */
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwCymNtoRu_gjw48cRn0WETjbP8-cB4YmRmzf7X6a3OugdtHAvRICxa4Ywhc3DDZNh2/exec';   // <-- deployed Web app URL
const WRITE_BACK = !!WEB_APP_URL;

/* Call the Apps Script web app to update the sheet. Returns a promise. */
async function sheetWrite(payload) {
  if (!WRITE_BACK) throw new Error('Web app not configured (WEB_APP_URL empty).');
  const res = await fetch(WEB_APP_URL, {
    method: 'POST',
    mode: 'no-cors',   // Apps Script doesn't return CORS headers; we can't read the body
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload)
  });
  return true; // no-cors: success = request didn't throw
}

/* Best-effort write-back to the sheet. Never throws / never blocks the UI.
   Because the web app uses no-cors we can't read its response, so we only
   know the request was sent — not whether the sheet actually changed. */
async function sheetWriteSafe(payload, label){
  if (!WRITE_BACK) return;
  try {
    await sheetWrite(payload);
  } catch (e) {
    if (typeof toast === 'function') toast('Sheet write failed (' + (label || '') + '): ' + (e && e.message ? e.message : e), 'error');
  }
}

/* Convert a Drive link to a clean file id (for the Documents tab DriveLink col). */
function driveLinkId(link){
  if (!link) return '';
  const m = String(link).match(/[-\w]{25,}/);
  return m ? m[0] : String(link).trim();
}

function sheetFeedUrl(tab){
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tab)}`;
}

/* Parse the gviz JSONP response into an array of row objects. */
function parseGviz(json){
  // response is jsonp:  google.visualization.Query.setResponse({...});
  const m = json.match(/setResponse\(([\s\S]*)\)/);
  if (!m) return [];
  try {
    const data = JSON.parse(m[1]);
    const table = data.table;
    if (!table || !table.cols || !table.rows) return [];
    const headers = table.cols.map(c => (c.label || c.id || '').toLowerCase().replace(/\s+/g, '_'));
    return table.rows.map(row => {
      const obj = {};
      (row.c || []).forEach((cell, i) => {
        const v = cell && cell.v != null ? cell.v : '';
        obj[headers[i] || 'col' + i] = v;
      });
      return obj;
    });
  } catch (e) { return []; }
}

/* Fetch a tab from the sheet (async). */
async function fetchSheetTab(tab){
  try {
    const res = await fetch(sheetFeedUrl(tab), { method: 'GET' });
    const txt = await res.text();
    return parseGviz(txt);
  } catch (e) { return []; }
}

/* Map sheet rows into Zonexa's data model.
   Sheet columns (you type these): match the headers in the tab. */
function sheetToProject(row){
  if (!row.projectid) return null;
  const cv = Number(String(row.contract_value || '').replace(/[^\d.]/g, '') || 0);
  const done = String(row.status || '').toLowerCase() === 'completed';
  return {
    id: row.projectid, company: row.company || '', name: row.name || row.projectid,
    client: row.client || '', sector: row.sector || '', location: row.location || '',
    contractValue: cv, planned: Number(row.planned || 0), actual: Number(row.actual || 0),
    status: done ? 'Green' : (String(row.status || 'Active')),
    year: row.year ? Number(row.year) : undefined,
    completed: done ? (row.completed || '') : undefined,
    stage: row.stage || 'Execution', priority: 'Medium',
    delayDays: Number(row.delay_days || 0), daysInStage: Number(row.days_in_stage || 0),
    issue: row.issue || '', action: row.action || '', pm: row.pm || '', fileStage: row.file_stage || '',
    currentOffice: row.current_office || '', nextAction: row.next_action || ''
  };
}
function sheetToDoc(row){
  if (!row.docid) return null;
  return {
    documentId: row.docid, projectId: row.projectid || '', projectName: row.projectname || '',
    client: row.client || '', type: row.type || 'Document', stage: row.stage || '',
    title: row.title || row.docid, date: row.date || '', owner: row.owner || '',
    status: 'Available', file: '#',
    driveFile: row.drive_link || row.drivelink || ''
  };
}

/* Map a row from the SOP tab into the SOP library model.
   Columns you type in the sheet: id, title, version, owner, review,
   applies, summary, file (a Drive link or file path). */
function sheetToSop(row){
  if (!row.id && !row.title) return null;
  return {
    id: row.id || ('SOP-' + String(Math.abs(Date.now())).slice(-3)),
    title: row.title || row.id,
    version: Number(row.version) || 1,
    owner: row.owner || 'Contract Lead',
    review: row.review || 'Annually',
    applies: row.applies || 'All projects',
    summary: row.summary || '',
    file: row.file || row.drive_link || '#'
  };
}

/* The pilot seed (Eko Boys Fence) — used when the sheet isn't
   configured yet, so the mechanism is demonstrable offline.
   In production this mirrors exactly what you'd type in the sheet. */
const PILOT_SEED = {
  companies: [
    { companyid: 'BOXGROVE', name: 'BOXGROVE LIMITED', rc: '1592829',
      address: '33 Gabby Adeosun St, Lekki, Lagos', email: 'Boxgrovelimited@gmail.com',
      phone: '', services: 'Dredging & Construction', incorporated: 2019 }
  ],
  projects: [
    { projectid: 'BW-002', company: 'BOXGROVE LIMITED', name: 'Eko Boys Perimeter Fence (LOT 11)',
      client: 'SCRPS / Lagos State Government', sector: 'Fencing / Civil Works', location: 'Eko Boys High School, Idi-Oro, Mushin',
      contract_value: 27516346, status: 'Completed', year: 2024, completed: '2026',
      issue: 'SCRPS/W/DC/007/2024, awarded 26 Aug 2024. Fixed contract N27,516,346.73.', action: 'Retention released.' }
  ],
  documents: [
    { docid: 'DOC-BW-002-001', projectid: 'BW-002', title: 'Award Letter — Eko Boys Perimeter Fence', type: 'Award Letter', drive_link: 'https://drive.google.com/file/d/17z6O1M8kQrJOrkSI-P5jLJvijFrYyq7Z/view' },
    { docid: 'DOC-BW-002-002', projectid: 'BW-002', title: 'Notification of Award — Eko Boys Fence', type: 'Notification', drive_link: 'https://drive.google.com/file/d/1FSbUk0PtM3RVBrHhmuTOiZMIJfhzEkUr/view' },
    { docid: 'DOC-BW-002-003', projectid: 'BW-002', title: 'Letter of Acceptance', type: 'Acceptance', drive_link: 'https://drive.google.com/file/d/1d1zhkkf7ObamzA2unladydEUJPBmtkur/view' },
    { docid: 'DOC-BW-002-004', projectid: 'BW-002', title: 'Practical Completion Certificate', type: 'Completion Certificate', drive_link: 'https://drive.google.com/file/d/1POsBhWUB4H-kniP_WElQUT4l69M3zkF5/view' },
    { docid: 'DOC-BW-002-005', projectid: 'BW-002', title: 'Fence Completion Letter', type: 'Completion Letter', drive_link: 'https://drive.google.com/file/d/1U9EZAaeZJJarN0Z5nKXQnlk0e8KpTXx-/view' },
    { docid: 'DOC-BW-002-006', projectid: 'BW-002', title: 'Eko Boys Fence Expense Sheet', type: 'Expense Sheet', drive_link: 'https://drive.google.com/file/d/1NiPC4HI0TvAWZRZDi1O2Re30w-1hh14P/view' },
    { docid: 'DOC-BW-002-007', projectid: 'BW-002', title: 'Priced Bill — Eko Boys High School Fence', type: 'BOQ', drive_link: 'https://drive.google.com/file/d/1YkfeAb23wXqXw3p0-h0yEDt_teAXi3-w/view' }
  ]
};

/* Load sheet data (or the pilot seed) and merge into the global model.
   Returns a promise. If SHEET_ID is set, uses the sheet; else the seed. */
async function loadZonexaSheet(){
  let companies = [], projects = [], documents = [], sops = [], payments = [];
  if (SHEET_ACTIVE) {
    companies = await fetchSheetTab('Companies');
    projects = await fetchSheetTab('Projects');
    documents = await fetchSheetTab('Documents');
    sops = await fetchSheetTab('SOP');
    payments = await fetchSheetTab('Payments');
  } else {
    companies = PILOT_SEED.companies;
    projects = PILOT_SEED.projects;
    documents = PILOT_SEED.documents;
  }

  // Companies → populate a global COMPANIES array (for company info)
  if (typeof window !== 'undefined') window.__COMPANIES = companies;

  // Projects → add completed ones to ARCHIVE, active ones to PROJECTS
  projects.forEach(r => {
    const p = sheetToProject(r); if (!p) return;
    if (p.completed) {
      // ensure not duplicated
      if (!ARCHIVE.some(a => a.id === p.id)) {
        ARCHIVE.push({ id: p.id, name: p.name, client: p.client, sector: p.sector, location: p.location,
          company: p.company, year: p.year || Number(String(p.completed).slice(0,4)) || 0,
          contractValue: p.contractValue, completed: p.completed, closed: p.completed, retentionReleased: 'Yes',
          summary: p.issue || 'Completed.' , docs: [] });
      }
    } else {
      if (!PROJECTS.some(x => x.id === p.id)) PROJECTS.push(p);
    }
  });

  // Documents → ensure their driveFile link is attached
  documents.forEach(r => {
    const d = sheetToDoc(r); if (!d || !d.driveFile) return;
    const existing = DOCUMENTS.find(x => x.documentId === d.documentId);
    if (existing) { existing.driveFile = d.driveFile; existing.title = d.title; }
    else DOCUMENTS.push(d);
  });

  // SOP library → replace the registry with the sheet's rows (like the
  // award-letter drive links, the file column takes a Drive link/path).
  if (sops.length) {
    const mapped = sops.map(sheetToSop).filter(Boolean);
    if (mapped.length && typeof SOP_REGISTRY !== 'undefined') {
      SOP_REGISTRY.splice(0, SOP_REGISTRY.length, ...mapped);
    }
  }

  // Payments tab → feed certified/paid/retention/outstanding into COST_DATA
  // so every cost/payment view (Payments page, Accounts portal, project
  // cost tab, archived-project payment position) reflects the sheet.
  payments.forEach(r => {
    const pid = r.projectid; if (!pid) return;
    const d = COST_DATA[pid] || (COST_DATA[pid] = {});
    if (r.certified != null && r.certified !== '') d.certified = Number(String(r.certified).replace(/[^\d.]/g, '')) || 0;
    if (r.paid != null && r.paid !== '') d.paid = Number(String(r.paid).replace(/[^\d.]/g, '')) || 0;
    if (r.retention != null && r.retention !== '') d.retention = Number(String(r.retention).replace(/[^\d.]/g, '')) || 0;
  });

  return { companies, projects, documents, sops, payments };
}
