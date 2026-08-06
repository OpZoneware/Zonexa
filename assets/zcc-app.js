/* ============================================================
   Zoneware Control Center (ZCC) v1.0 — SHARED APP LAYER
   Builds the shared shell (sidebar / topbar / drawer) on every
   page and renders each page from the shared data layer
   (zcc-data.js). Navigation between pages is plain <a href>
   links to separate HTML files; the current page's sidebar
   link is highlighted.
   ============================================================ */
'use strict';

const LOGO = 'assets/Zoneware_Logo_Transparent.png';

/* ============================================================
   FX — motion & micro-interaction engine (guarded; reduced-
   motion aware; no-ops safely when APIs are missing)
   ============================================================ */
const RM = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)').matches : false;
let ANIMATE_INIT = true; /* entrances run only for the initial render, not filter re-renders */
const raf = cb => (typeof requestAnimationFrame === 'function' ? requestAnimationFrame(cb) : setTimeout(() => cb(performance.now()), 16));

function staggerChildren(container, step = 45, cap = 12) {
  if (RM || !ANIMATE_INIT || !container || !container.children) return;
  const kids = container.children;
  for (let i = 0; i < kids.length; i++) {
    kids[i].classList.add('anim-in');
    kids[i].style.animationDelay = Math.min(i, cap) * step + 'ms';
  }
}
function staggerRows(el, step = 24, cap = 14) {
  const tb = el && el.querySelector ? el.querySelector('tbody') : null;
  if (tb) staggerChildren(tb, step, cap);
}
function countUp(el, target, fmt, dur = 780) {
  if (!el) return;
  if (RM) { el.textContent = fmt(target); return; }
  const t0 = performance.now();
  const ease = t => 1 - Math.pow(1 - t, 3);
  raf(function tick(now) {
    const t = Math.min(1, (now - t0) / dur);
    el.textContent = fmt(target * ease(t));
    if (t < 1) raf(tick); else el.textContent = fmt(target);
  });
}
function runCounter(b) {
  const t = Number(b.dataset.target) || 0, kind = b.dataset.kind || 'int';
  countUp(b, t, kind === 'money' ? money : kind === 'pct' ? pct : kind === 'float2' ? v => v.toFixed(2) : kind === 'days1' ? v => v.toFixed(1) + ' days' : v => Math.round(v).toLocaleString());
}

/* Reset all browser-persisted demo data back to the original seed.
   Used to make the demo safely re-runnable after revokes/upload/approvals. */
function resetDemoData(){
  if (!confirm('Reset all demo data back to the original seed?\n\nThis clears your sign-in session, all recorded uploads, approvals, admin changes and live updates in this browser.')) return;
  const keys = ['zcc.live.v1','zcc.admin.users.v1','zcc.audit.v1','zcc.tasks.v1','zcc.myphotos.v1','zcc.epoch.v1','zcc.admin.config.v1','zcc.session.v1'];
  keys.forEach(k => { try { localStorage.removeItem(k); } catch(e){} });
  toast('Demo data reset. Reloading…', 'info');
  setTimeout(() => location.href = '00_Login.html', 400);
}
function animateFills(grid) {
  if (RM || !ANIMATE_INIT || !grid) return;
  grid.querySelectorAll('.fill').forEach(f => {
    const w = f.style.width; f.style.width = '0%';
    raf(() => raf(() => { f.style.width = w; }));
  });
}
function animateBars(el) {
  if (RM || !el) return;
  el.querySelectorAll('.an-fill').forEach(f => {
    const w = f.style.width; f.style.width = '0%';
    raf(() => raf(() => { f.style.width = w; }));
  });
}

/* Scroll-reveal: fade+rise elements as they enter the viewport.
   Lightweight IntersectionObserver; ignores reduced-motion. */
let zxObs = null;
function initScrollReveal(){
  if (RM || typeof IntersectionObserver !== 'function') return;
  if (zxObs) return;
  zxObs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('zx-reveal-in');
        zxObs.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.zx-reveal:not(.zx-reveal-in)').forEach(el => zxObs.observe(el));
}

/* toasts */
let toastWrap = null;
function toast(msg, type = 'success') {  try {
    if (!toastWrap) { toastWrap = document.createElement('div'); toastWrap.className = 'toast-wrap'; document.body.appendChild(toastWrap); }
    const t = document.createElement('div');
    t.className = 'toast' + (type === 'error' ? ' toast-error' : type === 'info' ? ' toast-info' : '');
    t.textContent = msg;
    t.onclick = () => dismiss(t);
    toastWrap.appendChild(t);
    setTimeout(() => dismiss(t), 3400);
    function dismiss(el) { if (!el.parentNode) return; el.classList.add('out'); setTimeout(() => el.remove(), 260); }
  } catch (e) {}
}

/* ---------- SVG icon set (stroke, Lucide-style) ---------- */
const ICONS = {
  home: '<path d="M3.5 10.8 12 3.6l8.5 7.2"/><path d="M5.5 9.8V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.8"/><path d="M9.5 21v-6h5v6"/>',
  folder: '<path d="M3.5 7.5a2 2 0 0 1 2-2h4.2l2 2.2h6.8a2 2 0 0 1 2 2v7.8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>',
  file: '<path d="M13.5 3.5h-6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-10z"/><path d="M13.5 3.5v5h5"/><path d="M9 13h6M9 17h6"/>',
  chart: '<path d="M4 20h16"/><path d="M6.5 20v-5.5M11.5 20V5.5M16.5 20v-8.5"/>',
  trend: '<path d="M4 4v16h16"/><path d="M7 14l4-4 3 3 5-6"/>',
  warn: '<path d="M12 3.8 2.8 20h18.4z"/><path d="M12 10v4.5M12 17.6v.01"/>',
  cash: '<rect x="3" y="6.5" width="18" height="11" rx="2"/><circle cx="12" cy="12" r="2.8"/><path d="M6.5 9.5h.01M17.5 14.5h.01"/>',
  camera: '<path d="M4.5 8.5h2.8l1.8-2h5.8l1.8 2h2.8a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.2"/>',
  sliders: '<path d="M4 8h9M17.5 8H20M4 16h4.5M13 16h7"/><circle cx="15" cy="8" r="2"/><circle cx="10.5" cy="16" r="2"/>',
  clip: '<rect x="5.5" y="4.5" width="13" height="16" rx="2"/><path d="M9 4.5a3 3 0 0 1 6 0"/><path d="M9 11h6M9 15h6"/>',
  user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.5c1.6-3.7 4.6-5 7.5-5s5.9 1.3 7.5 5"/>'
};
function icon(n, size) {
  return `<svg viewBox="0 0 24 24" width="${size || 17}" height="${size || 17}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[n] || ''}</svg>`;
}

/* ---------- explicit 24-hour (HH:MM) time helpers ----------
   Guarantees a non-ambiguous 24-hour time, avoiding any locale
   quirks (e.g. "24:00" for midnight, AM/PM, or missing zero). */
const p2 = n => String(n).padStart(2, '0');
function time24(d){ d = d || new Date(); return p2(d.getHours()) + ':' + p2(d.getMinutes()); }
function dateGB(d){ d = d || new Date();
  return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }).replace(/ /g,'-'); }
function stamp24(d){ d = d || new Date(); return dateGB(d) + ' ' + time24(d); }

/* ---------- navigation model ---------- */
const NAV = {
  cc: {
    title: 'Command Center',
    links: [
      ['dashboard',  'Dashboard',   '01_Dashboard.html', 'home'],
      ['projects',   'Projects',    '02_Projects.html', 'folder'],
      ['documents',  'Documents',   '03_Documents.html', 'file'],
      ['progress',   'Progress',    '04_Progress.html', 'chart'],
      ['risks',      'Risks',       '05_Risks.html', 'warn'],
      ['payments',   'Payments',    '06_Payments.html', 'cash'],
      ['sitephotos', 'Site Photos', '07_Site_Photos.html', 'camera'],
      ['analytics',  'Analytics',   '08_Analytics.html', 'trend'],
      ['admin',      'System Admin', '09_Admin.html', 'sliders'],
      ['sop',        'SOP & Compliance', '16_SOP_Compliance.html', 'clip'],
      ['approval-workflow','File & Approvals', '21_Approval_Workflow.html', 'trend'],
      ['bidding',    'Bidding Pipeline', '22_Bidding_Pipeline.html', 'chart'],
      ['inspections','Inspections', '23_Inspections.html', 'warn'],
      ['integrations','Integrations', '25_Integrations.html', 'file'],
      ['vendors',    'Vendor Register', '27_Vendor_Register.html', 'user'],
      ['archive',    'Project Archive', '28_Project_Archive.html', 'folder'],
    ]
  },
  staff: {
    title: 'Staff Workspace',
    links: [
      ['staff-dash',    'Dashboard',   '10_Staff_Dashboard.html', 'home'],
      ['staff-tasks',   'My Tasks',    '11_My_Tasks.html', 'clip'],
      ['staff-photos',  'Site Photos', '12_Site_Photos.html', 'camera'],
      ['staff-profile', 'Profile',     '13_My_Profile.html', 'user'],
    ]
  },
  contract: {
    title: 'Contract Portal',
    links: [
      ['contract-dash', 'Dashboard',     '14_Contract_Dashboard.html', 'home'],
      ['contract-files','File Tracking', '15_File_Tracking.html', 'trend'],
    ]
  },
  accounts: {
    title: 'Accounts Portal',
    links: [
      ['accounts-dash', 'Dashboard',          '17_Accounts_Dashboard.html', 'home'],
      ['accounts-ret',  'Retention Register', '18_Retention_Register.html', 'cash'],
      ['requisitions',  'Payment Requisitions', '24_Payment_Requisitions.html', 'cash'],
    ]
  },
  admin: {
    title: 'Admin Console',
    links: [
      ['admin-console', 'Console', '20_Admin_Console.html', 'sliders'],
    ]
  }
};

/* ---------- shared shell ---------- */
/* Which detail-drawer tabs (and therefore parameters) each portal may see.
   Command Center is the full executive view; other portals are scoped to the
   parameters relevant to their function. */
const PORTAL_TABS = {
  cc:       ['overview', 'progress', 'file', 'cost', 'risk', 'actions', 'docs'],
  contract: ['overview', 'file', 'actions', 'docs'],
  accounts: ['overview', 'cost', 'docs'],
  staff:    ['overview'],
  admin:    ['overview']
};
const TAB_LABEL = {
  overview: 'Overview',
  progress: 'Progress',
  file:     'Document Control',
  cost:     'Cost Control',
  risk:     'Risks',
  actions:  'Issues & Actions',
  docs:     'Documents'
};
let currentApp = 'cc';
let activeProjectId = null;

/* Horizontal portals dropdown for the top bar (every page).
   Shows the current portal; opens a horizontal row of portal pills. */
function portalDropdown(user, app) {
  if (!user) return '';
  const portals = ZCC.portalsFor(user);
  if (!portals || portals.length < 2) return '';
  const cur = PORTALS[app] ? PORTALS[app].title : app;
  const label = p => PORTALS[p] ? PORTALS[p].title : p;
  const options = portals.map(p =>
    `<a class="pd-opt${p === app ? ' active' : ''}" href="${PORTALS[p].home}">${esc(label(p))}</a>`
  ).join('');
  return `<div class="portal-dd" id="portalDD">
      <button class="portal-dd-btn" onclick="togglePortalDD(event)" aria-label="Portals">
        <span class="pd-current">${esc(cur)}</span><span class="pd-caret">▾</span>
      </button>
      <div class="portal-dd-menu" id="portalDDMenu">${options}</div>
    </div>`;
}
function togglePortalDD(e){
  if (e && e.stopPropagation) e.stopPropagation();
  const m = document.getElementById('portalDDMenu');
  if (m) m.classList.toggle('open');
}
document.addEventListener('click', () => {
  const m = document.getElementById('portalDDMenu');
  if (m) m.classList.remove('open');
});

function portalSwitcher(user, app) {
  if (!user) return '';
  const portals = ZCC.portalsFor(user);
  if (!portals || portals.length < 2) return '';
  const label = p => PORTALS[p] ? PORTALS[p].title : p;
  const rows = portals.map(p =>
    `<a class="sidebar-portal${p === app ? ' active' : ''}" href="${PORTALS[p].home}">${esc(label(p))}</a>`
  ).join('');
  return `<div class="sidebar-portals"><div class="sidebar-portals-label">⇄ Portals</div><div class="sidebar-portals-grid">${rows}</div></div>`;
}

function buildShell(user, app, page) {
  currentApp = app;
  const nav = NAV[app];

  const aside = document.createElement('aside');
  aside.className = 'sidebar';
  aside.id = 'sidebar';
  aside.innerHTML =
    `<div class="sidebar-brand"><img class="sidebar-logo" src="${LOGO}" alt="Zoneware"></div>` +
    `<nav class="sidebar-nav"><span class="sidebar-glider" id="sbGlider"></span>` +
      nav.links.map(([key, label, href, ic]) =>
        `<a href="${href}" class="sidebar-link${key === page ? ' active' : ''}" data-page="${key}">${icon(ic)}<span>${label}</span></a>`).join('') +
    `</nav>` +
    (user ? `<div class="sidebar-user">
        <div class="sidebar-user-avatar">${esc(initials(user.name))}</div>
        <div class="sidebar-user-meta"><div class="sidebar-user-name">${esc(user.name)}</div><div class="sidebar-user-role">${esc(user.role)}</div></div>
        <button class="sidebar-signout" onclick="ZCC.signOut()">Sign Out</button>
      </div>` : '') +
    `<div class="sidebar-footer"><span class="sidebar-version">Zonexa v1.0</span>` +
      `<button class="sidebar-print" onclick="window.print()">Export PDF</button>` +
      `<button class="sidebar-print" onclick="resetDemoData()" style="margin-top:6px;color:#fda4af;border-color:rgba(253,164,175,.3)">Reset Demo Data</button>` +
    `</div>`;

  const topbar = document.createElement('header');
  topbar.className = 'topbar';
  topbar.id = 'topbar';
  topbar.innerHTML =
    `<img class="topbar-logo" src="${LOGO}" alt="Zoneware">` +
    `<span class="topbar-title">${nav.title}</span>` +
    `<button class="topbar-hamburger" id="hamburgerBtn" onclick="toggleSidebar()" aria-label="Menu">☰</button>`;

  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebarOverlay';
  overlay.setAttribute('onclick', 'toggleSidebar()');

  document.body.prepend(overlay);
  document.body.prepend(topbar);
  document.body.prepend(aside);
  initGlider();

  /* inject horizontal portals dropdown into the page header (every page) */
  const ph = document.querySelector('.zcc-page-head');
  if (ph) {
    const dd = portalDropdown(user, app);
    if (dd) {
      const wrap = document.createElement('div');
      wrap.className = 'ph-actions';
      wrap.innerHTML = dd;
      ph.appendChild(wrap);
    }
  }

  /* Project detail drawer — Command Center, Contract & Accounts portals */
  if (app === 'cc' || app === 'contract' || app === 'accounts') {
    const wrap = document.createElement('div');
    wrap.innerHTML =
      `<div class="drawer-overlay" id="overlay"></div>` +
      `<aside class="drawer" id="drawer">
        <div class="drawer-head"><button class="close" onclick="closeDrawer()">×</button>
          <div id="drawerBadges"></div><h2 id="drawerTitle"></h2><div id="drawerSub" style="color:#dbeafe"></div>
          <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap"><a id="drawerPrint" class="download-btn primary" target="_blank" href="#">🖨 Print Report</a><button id="drawerArchive" class="download-btn" style="background:rgba(220,38,38,.15);border-color:rgba(220,38,38,.4);color:#fecaca" onclick="archiveProject(activeProjectId)">Archive Project</button></div>
        </div>
        <div class="drawer-content">
          <div class="tabs" id="drawerTabs"></div>
          <div id="panels"></div>
        </div>
      </aside>`;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
  }
}

function toggleSidebar() {
  const sb = $('sidebar'), ov = $('sidebarOverlay');
  if (sb) sb.classList.toggle('open');
  if (ov) ov.classList.toggle('show');
}

/* sliding highlight that glides under the active/hovered sidebar link */
function initGlider() {
  const g = $('sbGlider'), nav = g && g.parentElement;
  if (!g || !nav) return;
  const move = to => {
    if (!to) { g.style.opacity = 0; return; }
    g.style.opacity = 1;
    g.style.top = to.offsetTop + 'px';
    g.style.height = to.offsetHeight + 'px';
  };
  move(nav.querySelector('.sidebar-link.active'));
  nav.querySelectorAll('.sidebar-link').forEach(l => l.addEventListener('mouseenter', () => move(l)));
  nav.addEventListener('mouseleave', () => move(nav.querySelector('.sidebar-link.active')));
}

/* ============================================================
   COMMAND CENTER — rendering
   ============================================================ */
let state = { search: '', sector: '', client: '', pm: '', status: '', fresh: '', sort: 'priority' };

function kpiData() {
  const value = PROJECTS.reduce((a, p) => a + p.contractValue, 0),
    delayed = PROJECTS.filter(p => p.status !== 'Green').length,
    red = PROJECTS.filter(p => p.status === 'Red').length,
    stuck = PROJECTS.filter(p => p.daysInStage > 14).length,
    stale = PROJECTS.filter(p => p.freshness === 'Stale').length,
    avg = PROJECTS.reduce((a, p) => a + p.actual, 0) / PROJECTS.length;
  return { count: PROJECTS.length, value, delayed, red, stuck, stale, avg };
}

function renderKpis() {
  const el = $('kpis'); if (!el) return;
  const k = kpiData();
  el.innerHTML = [
    ['Active Projects', k.count, 'int', 'Current sample portfolio'],
    ['Portfolio Value', k.value, 'money', 'Total active project value'],
    ['Avg Progress', k.avg, 'pct', 'Latest actual progress'],
    ['Delayed / Watchlist', k.delayed, 'int', 'Amber or Red projects'],
    ['Stages >14 Days', k.stuck, 'int', 'Potential bottlenecks'],
    ['Stale Updates', k.stale, 'int', 'No update within 6 days']
  ].map(x => `<div class="kpi"><span>${x[0]}</span><b data-target="${x[1]}" data-kind="${x[2]}">0</b><p style="margin:5px 0 0;color:#64748b;font-size:12px">${x[3]}</p></div>`).join('');
  el.querySelectorAll('b').forEach(runCounter);
  staggerChildren(el, 55, 8);
}

function populate() {
  const uniq = a => [...new Set(a)].sort();
  [['sector', uniq(PROJECTS.map(p => p.sector))], ['client', uniq(PROJECTS.map(p => p.client))], ['pm', uniq(PROJECTS.map(p => p.pm))]]
    .forEach(([id, vals]) => {
      const sel = $(id); if (!sel) return;
      vals.forEach(v => { const o = document.createElement('option'); o.value = v; o.textContent = v; sel.appendChild(o); });
    });
}

function filtered() {
  let arr = [...PROJECTS];
  if (state.search) { const q = state.search.toLowerCase(); arr = arr.filter(p => Object.values(p).join(' ').toLowerCase().includes(q)); }
  if (state.sector) arr = arr.filter(p => p.sector === state.sector);
  if (state.client) arr = arr.filter(p => p.client === state.client);
  if (state.pm) arr = arr.filter(p => p.pm === state.pm);
  if (state.status) arr = arr.filter(p => p.status === state.status);
  if (state.fresh) arr = arr.filter(p => p.freshness === state.fresh);
  arr.sort((a, b) => {
    if (state.sort === 'delay') return b.delayDays - a.delayDays;
    if (state.sort === 'progress') return b.actual - a.actual;
    if (state.sort === 'file') return b.daysInStage - a.daysInStage;
    return orderPriority(b.priority) - orderPriority(a.priority) || orderStatus(b.status) - orderStatus(a.status) || b.delayDays - a.delayDays;
  });
  return arr;
}

function card(p) {
  return `<article class="project-card" onclick="openProject('${p.id}')"><div class="card-top"><span class="sector">${esc(p.sector)}</span><span class="pill status-pill ${cls(p.status)}">${p.status}</span></div><div class="card-body"><div class="title">${esc(p.name)}</div><div class="meta">${esc(p.id)} · ${esc(p.client)}<br>${esc(p.location)} · PM: ${esc(p.pm)}</div><div class="mini-stats"><div class="stat"><span>Value</span><b>${money(p.contractValue)}</b></div><div class="stat"><span>Delay</span><b>${p.delayDays}d</b></div><div class="stat"><span>File Stage</span><b>${p.daysInStage}d</b></div></div><div class="progress-meta"><span>Actual ${pct(p.actual)}</span><span>Plan ${pct(p.planned)}</span></div><div class="track"><div class="fill ${cls(p.status)}" style="width:${Math.min(100, p.actual)}%"></div><span class="mark" style="left:${Math.min(100, p.planned)}%"></span></div><div class="card-foot"><span class="pill ${cls(p.freshness)}">${p.freshness}</span><span class="open-link">Open details →</span></div></div></article>`;
}

function renderProjects() {
  const grid = $('projectGrid'); if (!grid) return;
  const arr = filtered();
  grid.innerHTML = arr.map(card).join('');
  staggerChildren(grid, 55, 9);
  animateFills(grid);
  const empty = $('empty'); if (empty) empty.style.display = arr.length ? 'none' : 'block';
  const sum = $('projectSummary');
  if (sum) {
    const g = arr.filter(p => p.status === 'Green').length,
      a = arr.filter(p => p.status === 'Amber').length,
      r = arr.filter(p => p.status === 'Red').length;
    sum.innerHTML = `Showing <b>${arr.length}</b> of ${PROJECTS.length} projects &nbsp;·&nbsp; <span class="pill green">${g} Green</span> <span class="pill amber">${a} Amber</span> <span class="pill red">${r} Red</span>`;
  }
}

function renderAttention() {
  const el = $('attentionList'); if (!el) return;
  const arr = PROJECTS.filter(p => p.status !== 'Green' || p.escalate === 'Yes' || p.freshness === 'Stale' || p.daysInStage > 14)
    .sort((a, b) => orderStatus(b.status) - orderStatus(a.status) || b.delayDays - a.delayDays);
  el.innerHTML = arr.map(p => `<div class="att-item" onclick="openProject('${p.id}')"><span class="dot ${cls(p.status)}"></span><div><h4>${esc(p.name)}</h4><p>${esc(p.issue)}<br><b>Action:</b> ${esc(p.action)}</p></div><div style="text-align:right"><span class="pill ${cls(p.status)}">${p.status}</span><br><span style="color:#64748b;font-size:12px">${p.delayDays} days</span></div></div>`).join('');
  staggerChildren(el, 60, 8);
}

/* Document Control — file movement table (03_Documents) */
function renderFileTable() {
  const el = $('fileTable'); if (!el) return;
  const rows = [...PROJECTS].sort((a, b) => b.daysInStage - a.daysInStage).map(p =>
    `<tr onclick="openProject('${p.id}')"><td><b>${esc(p.name)}</b><br><span style="color:#64748b">${esc(p.client)}</span></td><td>${esc(p.fileStage)}</td><td>${esc(p.currentOffice)}</td><td>${p.daysInStage}</td><td>${esc(p.fileOwner)}</td><td>${esc(p.nextAction)}</td><td><span class="pill ${p.daysInStage > 14 ? 'red' : p.daysInStage > 7 ? 'amber' : 'green'}">${p.daysInStage > 14 ? 'Escalate' : p.daysInStage > 7 ? 'Monitor' : 'OK'}</span></td></tr>`).join('');
  el.innerHTML = `<thead><tr><th>Project</th><th>Current Stage</th><th>Current Office</th><th>Days</th><th>Owner</th><th>Next Action</th><th>Status</th></tr></thead><tbody>${rows}</tbody>`;
  staggerRows(el);
}

/* Document Control — document register table (03_Documents) */
function renderDocRegister() {
  const el = $('docRegister'); if (!el) return;
  const rows = DOCUMENTS.map(d =>
    `<tr onclick="openProject('${d.projectId}')"><td><b>${esc(d.documentId)}</b><br><span style="color:#64748b">${esc(d.title)}</span></td><td><b>${esc(d.projectName)}</b><br><span style="color:#64748b">${esc(d.projectId)}</span></td><td>${esc(d.type)}<br><span style="color:#64748b">${esc(d.stage)}</span></td><td>${esc(d.owner)}</td><td>${esc(d.date)}</td><td><span class="pill green">${esc(d.status)}</span></td><td><div style="display:flex;gap:8px;flex-wrap:wrap" onclick="event.stopPropagation()"><a class="download-btn" href="${esc(d.file)}" target="_blank">Open</a><a class="download-btn primary" href="${esc(d.file)}" download>Download</a></div></td></tr>`).join('');
  el.innerHTML = `<table class="file-table"><thead><tr><th>Document</th><th>Project</th><th>Type / Stage</th><th>Owner</th><th>Date</th><th>Status</th><th>File</th></tr></thead><tbody>${rows}</tbody></table>`;
  staggerRows(el);
}

function documentCards(p) {
  const docs = DOCUMENTS.filter(d => d.projectId === p.id);
  if (!docs.length) return '<div class="empty">No documents linked to this project yet.</div>';
  return `<div class="doc-grid">${docs.map(d => `<div class="doc"><b>${esc(d.title)}</b><span>${esc(d.type)} · ${esc(d.stage)}<br>Owner: ${esc(d.owner)} · Date: ${esc(d.date)}</span><div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><a class="download-btn" href="${esc(d.file)}" target="_blank">Open</a><a class="download-btn primary" href="${esc(d.file)}" download>Download</a></div></div>`).join('')}</div>`;
}

function costCards(p) {
  const c = costInfo(p);
  return `<div class="detail-kpis"><div class="dk"><span>Contract Value</span><b>${money(p.contractValue)}</b></div><div class="dk"><span>Certified</span><b>${money(c.certified)}</b></div><div class="dk"><span>Paid</span><b>${money(c.paid)}</b></div><div class="dk"><span>Outstanding</span><b>${money(c.outstanding)}</b></div></div><div class="info-grid" style="margin-top:12px"><div class="info"><b>Retention</b>${money(c.retention)} <span style="color:#64748b">(5% held for 6 months)</span></div><div class="info"><b>Variation Orders</b>${c.variation ? money(c.variation) + ' pending review' : 'None recorded'}</div><div class="info"><b>Payment Note</b>Retention of 5% is held for 6 months after completion, per contract terms.</div><div class="info"><b>Cost Status</b>${p.status === 'Red' ? 'Cost exposure requires review' : p.status === 'Amber' ? 'Monitor certification/payment movement' : 'Within current control'}</div></div>`;
}

function riskCards(p) {
  const prob = p.status === 'Red' ? 'High' : p.status === 'Amber' ? 'Medium' : 'Low';
  const impact = p.delayDays > 20 ? 'High' : p.delayDays > 0 ? 'Medium' : 'Low';
  const clsName = prob === 'High' ? 'risk-high' : prob === 'Medium' ? 'risk-medium' : 'risk-low';
  return `<div class="panel" style="padding:0;overflow:hidden"><table class="file-table"><thead><tr><th>Risk</th><th>Probability</th><th>Impact</th><th>Owner</th><th>Mitigation</th><th>Status</th></tr></thead><tbody><tr><td>${esc(p.issue)}</td><td>${prob}</td><td>${impact}</td><td>${esc(p.owner)}</td><td>${esc(p.action)}</td><td><span class="pill ${clsName}">${prob}</span></td></tr></tbody></table></div>`;
}

function trendSvg(p) {
  const w = 760, h = 250, m = 36;
  let trendData = (p.history || []).map(r => [r[0], Number(r[1]) || 0, Number(r[2]) || 0]);
  if (trendData.length && (trendData[0][1] !== 0 || trendData[0][2] !== 0)) trendData.unshift(['Start', 0, 0]);
  if (trendData.length < 2) trendData = [['Start', 0, 0], ['Current', p.planned || 0, p.actual || 0]];
  const xs = trendData.map((_, i) => m + i * ((w - 2 * m) / (trendData.length - 1)));
  const line = idx => trendData.map((r, i) => `${xs[i]},${m + (100 - r[idx]) / 100 * (h - 2 * m)}`).join(' ');
  let grid = '';
  for (let v = 0; v <= 100; v += 25) { const y = m + (100 - v) / 100 * (h - 2 * m); grid += `<line x1="${m}" y1="${y}" x2="${w - m}" y2="${y}" stroke="#e5e7eb"/><text x="5" y="${y + 4}" font-size="10" fill="#64748b">${v}%</text>`; }
  return `<div class="trend"><svg viewBox="0 0 ${w} ${h}">${grid}<polyline points="${line(1)}" fill="none" stroke="#2563eb" stroke-width="3"/><polyline points="${line(2)}" fill="none" stroke="#dc2626" stroke-width="3"/>${trendData.map((r, i) => `<circle cx="${xs[i]}" cy="${m + (100 - r[2]) / 100 * (h - 2 * m)}" r="4" fill="#dc2626"><title>${r[0]} actual ${r[2]}%</title></circle>`).join('')}<text x="${m}" y="${h - 8}" font-size="11" fill="#64748b">${trendData[0][0]}</text><text x="${w - m - 50}" y="${h - 8}" font-size="11" fill="#64748b">${trendData[trendData.length - 1][0]}</text></svg><div style="display:flex;gap:18px;color:#64748b;font-size:12px"><span style="color:#2563eb">● Planned</span><span style="color:#dc2626">● Actual</span></div></div>`;
}

function timeline(p) {
  return `<div class="timeline"><b>File / approval movement</b><div class="steps" style="margin-top:12px">${p.timeline.map((s, i) => `<div class="step ${i < p.timelineIndex ? 'done' : i === p.timelineIndex ? 'current' : 'pending'}"><div class="num">${i}</div><b style="font-size:12px">${esc(s)}</b><div style="color:#64748b;font-size:11px;margin-top:5px">${i < p.timelineIndex ? 'Completed' : i === p.timelineIndex ? 'Current stage' : 'Pending'}</div></div>`).join('')}</div></div>`;
}

function historyTable(p) {
  return `<div class="hist"><table><thead><tr><th>Date</th><th>Planned</th><th>Actual</th><th>Variance</th></tr></thead><tbody>${p.history.slice().reverse().map(r => `<tr><td>${r[0]}</td><td>${r[1]}%</td><td>${r[2]}%</td><td>${r[2] - r[1]}%</td></tr>`).join('')}</tbody></table></div>`;
}

function openProject(id) {
  const p = PROJECTS.find(x => x.id === id); if (!p || !$('drawer')) return;
  const allowed = PORTAL_TABS[currentApp] || PORTAL_TABS.cc;

  /* header badges — also scoped by portal (Accounts sees cost-relevant badges,
     Contract sees file/status, etc.) */
  let badges = [`<span class="pill ${cls(p.status)}">${p.status}</span>`];
  if (currentApp === 'accounts') badges.push(`<span class="pill blue">${money(costInfo(p).outstanding)} outstanding</span>`);
  else badges.push(`<span class="pill ${cls(p.freshness)}">${p.freshness}</span>`);
  badges.push(`<span class="pill ${cls(p.priority)}">${p.priority}</span>`);
  $('drawerBadges').innerHTML = badges.join(' ');
  $('drawerTitle').textContent = p.name;
  $('drawerSub').textContent = `${p.id} · ${p.client} · ${p.location}`;
  activeProjectId = p.id;
  const dp = $('drawerPrint'); if (dp) dp.href = `26_Project_Report.html?id=${encodeURIComponent(p.id)}`;
  const da = $('drawerArchive');
  if (da) { const u = ZCC.user(); da.style.display = (u && ['MD','Contract Lead','Super Admin','Accounts'].includes(u.role)) ? 'inline-flex' : 'none'; }

  /* tabs */
  $('drawerTabs').innerHTML = allowed.map(k =>
    `<button class="tab${k === 'overview' ? ' active' : ''}" data-tab="${k}">${esc(TAB_LABEL[k] || k)}</button>`
  ).join('');

  /* panels — only render what this portal may see */
  const panel = {
    overview: () => {
      const imgs = PROJECT_IMAGE[p.id] || [];
      const gallery = imgs.length
        ? `<div class="overview-gallery">${imgs.map(u => `<img class="overview-img" src="${esc(u)}" alt="${esc(p.name)}" onclick="window.open('${esc(u)}','_blank')">`).join('')}</div><div class="bid-detail-caption">Current site view</div>`
        : '';
      return `<div class="detail-kpis"><div class="dk"><span>Contract Value</span><b>${money(p.contractValue)}</b></div><div class="dk"><span>Actual Progress</span><b>${pct(p.actual)}</b></div><div class="dk"><span>Delay Days</span><b>${p.delayDays}</b></div><div class="dk"><span>Mobilization</span><b>${p.mobilization}</b></div></div>${gallery}<div class="info-grid"><div class="info"><b>Client / User Department</b>${esc(p.client)}<br><span style="color:#64748b">${esc(p.userDept)}</span></div><div class="info"><b>Project Manager</b>${esc(p.pm)}</div><div class="info"><b>Supervisor / Vendor</b>${esc(p.supervisor)}<br>${esc(p.vendor)}</div><div class="info"><b>Stage</b>${esc(p.stage)}</div><div class="info"><b>Planned End / Forecast</b>${esc(p.plannedEnd)} → ${esc(p.forecast)}</div><div class="info"><b>Delay Source</b>${esc(p.delaySource)}</div></div>`;
    },
    progress: () => `<div class="detail-kpis"><div class="dk"><span>Planned</span><b>${pct(p.planned)}</b></div><div class="dk"><span>Actual</span><b>${pct(p.actual)}</b></div><div class="dk"><span>Variance</span><b>${p.actual - p.planned}%</b></div><div class="dk"><span>Freshness</span><b>${p.daysOld}d</b></div></div><div style="margin-top:12px">${trendSvg(p)}</div><h3>Update History</h3>${historyTable(p)}`,
    file: () => `${timeline(p)}<div class="info-grid"><div class="info"><b>Current Stage</b>${esc(p.fileStage)}</div><div class="info"><b>Current Office</b>${esc(p.currentOffice)}</div><div class="info"><b>Days in Stage</b>${p.daysInStage}</div><div class="info"><b>Follow-up Owner</b>${esc(p.fileOwner)}</div></div><div class="callout" style="margin-top:12px"><b>Next action:</b> ${esc(p.nextAction)}</div>`,
    cost: () => costCards(p),
    risk: () => riskCards(p),
    actions: () => `<div class="callout"><b>Key issue:</b> ${esc(p.issue)}<br><br><b>Delay source:</b> ${esc(p.delaySource)}<br><br><b>Required action:</b> ${esc(p.action)}<br><b>Action owner:</b> ${esc(p.owner)} · <b>Due:</b> ${esc(p.due)} · <b>Escalation:</b> ${esc(p.escalate)}</div>`,
    docs: () => documentCards(p)
  };
  $('panels').innerHTML = allowed.map(k =>
    `<section class="tab-panel${k === 'overview' ? ' active' : ''}" data-panel="${k}">${panel[k]()}</section>`
  ).join('');

  document.querySelectorAll('#drawerTabs .tab').forEach(t => {
    t.onclick = () => {
      document.querySelectorAll('#drawerTabs .tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.drawer .tab-panel').forEach(pp => pp.classList.remove('active'));
      t.classList.add('active');
      document.querySelector(`.drawer [data-panel="${t.dataset.tab}"]`).classList.add('active');
    };
  });
  $('overlay').classList.add('show');
  $('drawer').classList.add('show');
  document.body.classList.add('open');
}

function closeDrawer() {
  if (!$('drawer')) return;
  $('overlay').classList.remove('show');
  $('drawer').classList.remove('show');
  document.body.classList.remove('open');
}

function bindCC() {
  ['search', 'sector', 'client', 'pm', 'sort'].forEach(id => {
    const el = $(id); if (!el) return;
    el.addEventListener(id === 'search' ? 'input' : 'change', e => { state[id] = e.target.value; renderProjects(); });
  });
  document.querySelectorAll('.chip').forEach(c => c.onclick = () => {
    if (c.dataset.status !== undefined) { state.status = c.dataset.status; state.fresh = ''; }
    if (c.dataset.fresh !== undefined) { state.fresh = c.dataset.fresh; state.status = ''; }
    document.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    renderProjects();
  });
  const ov = $('overlay'); if (ov) ov.onclick = closeDrawer;
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
}

/* ---------- module tables (Progress / Payments / Risks / Site Photos) ---------- */
function renderScheduleTable() {
  const el = $('scheduleTable'); if (!el) return;
  const rows = PROJECTS.map(p => {
    const variance = p.actual - p.planned;
    const spi = p.planned > 0 ? (p.actual / p.planned).toFixed(2) : '—';
    const statusCls = variance < -15 ? 'red' : variance < -5 ? 'amber' : 'green';
    const statusLabel = variance < -15 ? 'Red' : variance < -5 ? 'Amber' : 'Green';
    return `<tr onclick="openProject('${p.id}')"><td><b>${esc(p.name)}</b><br><span style="color:#64748b">${esc(p.id)}</span></td><td>${p.planned}%</td><td>${p.actual}%</td><td>${variance > 0 ? '+' : ''}${variance}%</td><td>${spi}</td><td>${esc(p.forecast)}</td><td><span class="pill ${statusCls}">${statusLabel}</span></td></tr>`;
  }).join('');
  el.innerHTML = `<table class="file-table"><thead><tr><th>Project</th><th>Planned %</th><th>Actual %</th><th>Variance</th><th>SPI</th><th>Forecast Completion</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
  staggerRows(el);
}

function renderCostMetrics() {
  const el = $('costMetrics'); if (!el) return;
  const t = PROJECTS.reduce((a, p) => {
    const c = costInfo(p);
    a.value += p.contractValue; a.certified += c.certified; a.paid += c.paid; a.outstanding += c.outstanding; a.retention += c.retention;
    return a;
  }, { value: 0, certified: 0, paid: 0, outstanding: 0, retention: 0 });
  el.innerHTML = [['Contract Value', t.value], ['Certified', t.certified], ['Paid', t.paid], ['Outstanding', t.outstanding], ['Retention Held', t.retention]]
    .map(([k, v]) => `<div class="metric-card"><span>${k}</span><b data-target="${v}" data-kind="money">₦0</b></div>`).join('');
  el.querySelectorAll('b').forEach(runCounter);
  staggerChildren(el, 60, 6);
}

function renderCostTable() {
  const el = $('costTable'); if (!el) return;
  const rows = PROJECTS.map(p => {
    const c = costInfo(p);
    return `<tr onclick="openProject('${p.id}')"><td><b>${esc(p.name)}</b><br><span style="color:#64748b">${esc(p.id)}</span></td><td>${money(p.contractValue)}</td><td>${money(c.certified)}</td><td>${money(c.paid)}</td><td>${money(c.outstanding)}</td><td>${money(c.retention)}</td><td>${c.variation ? money(c.variation) + ' pending' : '₦0'}</td></tr>`;
  }).join('');
  el.innerHTML = `<table class="file-table"><thead><tr><th>Project</th><th>Contract Value</th><th>Certified</th><th>Paid</th><th>Outstanding</th><th>Retention</th><th>Variations</th></tr></thead><tbody>${rows}</tbody></table>`;
  staggerRows(el);
}

function renderRiskTable() {
  const el = $('riskTable'); if (!el) return;
  const rows = RISKS.map(r => {
    const clsName = r.status === 'High' ? 'risk-high' : r.status === 'Medium' ? 'risk-medium' : 'risk-low';
    const pName = PROJECTS.find(p => p.id === r.projectId)?.name || r.projectId;
    return `<tr onclick="openProject('${r.projectId}')"><td>${esc(r.risk)}</td><td><b>${esc(pName)}</b><br><span style="color:#64748b">${esc(r.projectId)}</span></td><td>${esc(r.probability)}</td><td>${esc(r.impact)}</td><td>${esc(r.owner)}</td><td>${esc(r.mitigation)}</td><td><span class="pill ${clsName}">${esc(r.status)}</span></td></tr>`;
  }).join('');
  el.innerHTML = `<table class="file-table"><thead><tr><th>Risk</th><th>Project</th><th>Probability</th><th>Impact</th><th>Owner</th><th>Mitigation</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
  staggerRows(el);
}

/* Site Photos & Evidence — who uploaded what, when (07_Site_Photos) */
function renderSitePhotosTable() {
  const el = $('sitePhotosTable'); if (!el) return;
  const uploaded = ZCC.myPhotos();
  const all = SITE_PHOTOS.concat(uploaded);
  const rows = all.sort((a, b) => (b.date + (b.time || '')).localeCompare(a.date + (a.time || ''))).map(p => {
    const typeCls = p.type.includes('Photo') ? 'blue' : p.type.includes('Report') ? 'green' : p.type.includes('Inspection') ? 'amber' : 'grey';
    const fileCell = p.file
      ? `<a class="download-btn" href="${esc(p.file)}" target="_blank">Open</a><a class="download-btn primary" href="${esc(p.file)}" download>Download</a>`
      : `<span style="color:#64748b;font-size:12px">Recorded in Staff Workspace</span>`;
    const imgs = (p.imgs && p.imgs.length ? p.imgs : (p.img ? [p.img] : []));
    const img = imgs.length
      ? `<div class="thumb-row">${imgs.map(u => `<img class="photo-thumb" src="${esc(u)}" alt="${esc(p.description)}" onclick="event.stopPropagation();window.open('${esc(u)}','_blank')">`).join('')}</div>`
      : `<span style="color:#64748b;font-size:11px">No image</span>`;
    return `<tr onclick="openProject('${p.projectId}')"><td>${img}<br><b>${esc(p.description)}</b><br><span style="color:#64748b">${esc(p.id)} · ${esc(p.type)}</span></td><td><b>${esc(p.project)}</b><br><span style="color:#64748b">${esc(p.projectId)} · Stage: ${esc(p.stage)}</span></td><td><b>${esc(p.uploadedBy)}</b><br><span style="color:#64748b">${esc(p.role)}</span></td><td>${esc(p.date)}<br><span style="color:#64748b">${esc(p.time)}</span></td><td><span class="pill ${typeCls}">${esc(p.type)}</span></td><td><div style="display:flex;gap:8px;flex-wrap:wrap" onclick="event.stopPropagation()">${fileCell}</div></td></tr>`;
  }).join('');
  el.innerHTML = `<table class="file-table"><thead><tr><th>Description</th><th>Project</th><th>Uploaded By</th><th>Date / Time</th><th>Type</th><th>File</th></tr></thead><tbody>${rows}</tbody></table>`;
  staggerRows(el);
}

/* ---------- Analytics (08) ---------- */
function renderAnalytics() {
  const sumPlanned = PROJECTS.reduce((a, p) => a + p.planned, 0);
  const sumActual = PROJECTS.reduce((a, p) => a + p.actual, 0);
  const spi = sumPlanned > 0 ? (sumActual / sumPlanned) : 0;
  const avgDelay = PROJECTS.reduce((a, p) => a + p.delayDays, 0) / PROJECTS.length;
  const outstanding = PROJECTS.reduce((a, p) => a + costInfo(p).outstanding, 0);

  const m = $('anMetrics');
  if (m) {
    m.innerHTML = [
      ['Portfolio SPI', spi, 'float2'],
      ['Avg Delay', avgDelay, 'days1'],
      ['Open Risks', RISKS.length, 'int'],
      ['Outstanding', outstanding, 'money']
    ].map(([k, v, kd]) => `<div class="metric-card"><span>${k}</span><b data-target="${v}" data-kind="${kd}">0</b></div>`).join('');
    m.querySelectorAll('b').forEach(runCounter);
    staggerChildren(m, 60, 6);
  }

  const chart = $('anChart');
  if (chart) {
    const w = 760, rowH = 52, mL = 210, mR = 30, mT = 26, barH = 13, gap = 5;
    const h = mT + PROJECTS.length * rowH + 8;
    const scale = v => mL + (v / 100) * (w - mL - mR);
    let grid = '';
    for (let v = 0; v <= 100; v += 25) {
      const x = scale(v);
      grid += `<line x1="${x}" y1="${mT - 14}" x2="${x}" y2="${h}" stroke="#e5e7eb"/><text x="${x - 10}" y="${mT - 18}" font-size="10" fill="#64748b">${v}%</text>`;
    }
    const rows = PROJECTS.map((p, i) => {
      const y = mT + i * rowH;
      return `<text x="0" y="${y + 22}" font-size="11" fill="#334155"><title>${esc(p.name)}</title>${esc(p.name.length > 30 ? p.name.slice(0, 29) + '…' : p.name)}</text>` +
        `<rect x="${mL}" y="${y + 6}" width="${Math.max(1, scale(p.planned) - mL)}" height="${barH}" rx="3" fill="#2563eb"><title>${esc(p.name)} planned ${p.planned}%</title></rect>` +
        `<rect x="${mL}" y="${y + 6 + barH + gap}" width="${Math.max(1, scale(p.actual) - mL)}" height="${barH}" rx="3" fill="${p.status === 'Red' ? '#dc2626' : p.status === 'Amber' ? '#f59e0b' : '#16a34a'}"><title>${esc(p.name)} actual ${p.actual}%</title></rect>` +
        `<text x="${Math.min(w - mR + 8, scale(Math.max(p.planned, p.actual)) + 6)}" y="${y + 24}" font-size="10" fill="#64748b">${p.actual}% / ${p.planned}%</text>`;
    }).join('');
    chart.innerHTML = `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto">${grid}${rows}</svg><div class="chart-legend"><span style="color:#2563eb">● Planned</span><span style="color:#16a34a">● Actual (Green)</span><span style="color:#f59e0b">● Actual (Amber)</span><span style="color:#dc2626">● Actual (Red)</span></div>`;
    chart.querySelectorAll('rect').forEach((r, i) => { r.classList.add('bar-grow'); r.style.animationDelay = (70 * i) + 'ms'; });
  }

  const st = $('anStatus');
  if (st) {
    const count = s => PROJECTS.filter(p => p.status === s).length;
    const fresh = f => PROJECTS.filter(p => p.freshness === f).length;
    const bar = (label, n, color, total) =>
      `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px"><b>${label}</b><span style="color:#64748b">${n} of ${total}</span></div><div style="height:10px;border-radius:99px;background:#eef2f7;overflow:hidden"><div class="an-fill" style="height:10px;width:${total ? (n / total * 100) : 0}%;background:${color};border-radius:99px"></div></div></div>`;
    st.innerHTML = `<h3 style="margin-top:0">Schedule Status</h3>` +
      bar('Green', count('Green'), '#16a34a', PROJECTS.length) +
      bar('Amber', count('Amber'), '#f59e0b', PROJECTS.length) +
      bar('Red', count('Red'), '#dc2626', PROJECTS.length) +
      `<h3>Update Freshness</h3>` +
      bar('Fresh', fresh('Fresh'), '#16a34a', PROJECTS.length) +
      bar('Aging', fresh('Aging'), '#f59e0b', PROJECTS.length) +
      bar('Stale', fresh('Stale'), '#dc2626', PROJECTS.length);
    animateBars(st);
  }
}

/* ---------- Admin (09) ---------- */
const STAGES = [
  ['Stage 0', 'Project Setup', 'Contract Lead', 'Folder created from standard template; project registered in ZCC.'],
  ['Stage 1', 'Contract Documentation', 'Project Manager', 'Award letter, acceptance, insurance bond, BOQ / scope uploaded.'],
  ['Stage 2', 'Mobilization & Execution', 'PM / Site Supervisor', 'Mobilization confirmation, site reports, photo evidence.'],
  ['Stage 3', 'Inspection Request', 'Contract Lead', 'Inspection request letter, testing checklists, junction evidence.'],
  ['Stage 4', 'Completion Certificate', 'Contract Lead / PM', 'Completion and handover documentation signed.'],
  ['Stage 5', 'Payment Processing', 'Accounts', 'Invoice support, certification and payment tracking.'],
  ['Stage 6', 'Retention & Close-Out', 'Contract Lead', 'Retention release and project close-out archive.']
];

function renderAdmin() {
  const u = $('adminUsers');
  if (u) {
    const rows = Object.entries(ACCESS_CODES).map(([email, info]) =>
      `<tr><td><b>${esc(info.name)}</b></td><td>${esc(info.role)}</td><td>${esc(email)}</td><td>ZW-••••</td><td><span class="pill green">Active</span></td></tr>`).join('');
    u.innerHTML = `<table class="file-table"><thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Access Code</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
  }
  const s = $('adminStages');
  if (s) {
    const rows = STAGES.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('');
    s.innerHTML = `<table class="file-table"><thead><tr><th>Stage</th><th>Name</th><th>Responsible Role</th><th>What Happens</th></tr></thead><tbody>${rows}</tbody></table>`;
  }
  const d = $('adminDocTypes');
  if (d) {
    const types = unique(DOCUMENTS.map(x => x.type));
    const rows = types.map(t => {
      const docs = DOCUMENTS.filter(x => x.type === t);
      return `<tr><td><b>${esc(t)}</b></td><td>${docs.length}</td><td>${esc(docs[0].title)} · ${esc(docs[0].documentId)}</td></tr>`;
    }).join('');
    d.innerHTML = `<table class="file-table"><thead><tr><th>Document Type</th><th>Files</th><th>Example</th></tr></thead><tbody>${rows}</tbody></table>`;
  }
}

/* ============================================================
   STAFF WORKSPACE — rendering
   ============================================================ */
let currentUser = '';
let activeTab = 'all';

function myTasks() { return (TASKS || []).filter(t => t.assigned === currentUser); }

function renderStaffHero(user) {
  const el = $('staffHero'); if (!el) return;
  el.innerHTML = `<div class="staff-hero-inner">
    <div>
      <img class="staff-hero-logo" src="${LOGO}" alt="Zoneware Limited">
      <div class="cover-kicker">Staff Workspace</div>
      <div class="cover-subtitle">Every upload and sign-off is recorded against your identity.</div>
    </div>
    <div class="staff-identity-box">
      <div class="staff-identity-main" style="display:flex;gap:16px">
        <div class="avatar">${esc(initials(user.name))}</div>
        <div class="person">
          <h2>${esc(user.name)}</h2>
          <p style="color:rgba(255,255,255,.78)">${esc(user.role)}</p>
          <p style="color:rgba(255,255,255,.6);font-size:12px">${esc(user.email)}</p>
          <div style="margin-top:10px"><span class="status-badge">Signed in</span></div>
        </div>
      </div>
    </div>
  </div>`;
  el.classList.add('anim-in');
  el.querySelectorAll('.avatar').forEach(a => { a.classList.add('anim-in'); a.style.animationDelay = '120ms'; });
}

function renderStaffKpis() {
  const el = $('staffKpis'); if (!el) return;
  const tasks = myTasks(),
    assigned = tasks.length,
    signed = tasks.filter(t => t.status === 'Signed Off').length,
    pending = tasks.filter(t => t.status.includes('Pending')).length,
    review = tasks.filter(t => t.status.includes('Awaiting')).length;
  el.innerHTML = `<div class="stat assigned"><span>Assigned</span><b data-target="${assigned}" data-kind="int">0</b></div><div class="stat signed"><span>Signed Off</span><b data-target="${signed}" data-kind="int">0</b></div><div class="stat pending"><span>Pending</span><b data-target="${pending}" data-kind="int">0</b></div><div class="stat review"><span>Awaiting Review</span><b data-target="${review}" data-kind="int">0</b></div>`;
  el.querySelectorAll('b').forEach(runCounter);
  staggerChildren(el, 60, 6);
}

function staffTaskRow(t, compact) {
  return `<tr><td><div class="project-title">${esc(t.project)}</div><div class="muted">${esc(t.projectId)} · Upload ID: ${esc(t.id)}</div></td><td>Stage ${t.stageNo}<br><span class="muted">${esc(t.stage)}</span></td><td>${esc(t.required)}<br><span class="muted">Due: ${esc(t.due)}</span></td><td><span class="pill ${statusClass(t.status)}">${esc(t.status)}</span></td>${compact ? '' : `<td>${esc(t.uploadedBy)}<br><span class="muted">Signed: ${esc(t.signedBy)}</span></td><td>${esc(t.date)}</td><td><div class="file-actions">${t.file ? `<a class="file-btn" href="${esc(t.file)}" target="_blank">Open</a><a class="file-btn primary" href="${esc(t.file)}" download>Download</a>` : '<span class="file-btn">Awaiting Upload</span>'}</div></td>`}`;
}

function renderPriorityTasks() {
  const el = $('priorityTable'); if (!el) return;
  const open = myTasks().filter(t => t.status !== 'Signed Off')
    .sort((a, b) => String(a.due).localeCompare(String(b.due))).slice(0, 5);
  el.innerHTML = `<thead><tr><th>Project</th><th>Stage</th><th>Required File</th><th>Status</th></tr></thead><tbody>${open.map(t => staffTaskRow(t, true)).join('') || '<tr><td colspan="4"><div class="empty">No outstanding tasks. You are fully signed off. ✅</div></td></tr>'}</tbody>`;
  staggerRows(el, 40, 6);
}

function fillFilters() {
  const tasks = myTasks();
  const sf = $('statusFilter'), pf = $('projectFilter');
  if (sf) sf.innerHTML = '<option value="">All My Statuses</option>' + unique(tasks.map(t => t.status)).map(v => `<option>${esc(v)}</option>`).join('');
  if (pf) pf.innerHTML = '<option value="">All My Projects</option>' + unique(tasks.map(t => t.project)).map(v => `<option>${esc(v)}</option>`).join('');
}

function renderTaskOptions() {
  const sel = $('taskSelect'); if (!sel) return;
  const pending = myTasks().filter(t => t.status !== 'Signed Off');
  sel.innerHTML = pending.length
    ? pending.map(t => `<option value="${esc(t.id)}">${esc(t.projectId)} · Stage ${t.stageNo} · ${esc(t.required)}</option>`).join('')
    : '<option value="">No pending assigned task</option>';
}

function tabMatch(t) {
  if (activeTab === 'all') return true;
  if (activeTab === 'pending') return t.status.includes('Pending');
  if (activeTab === 'review') return t.status.includes('Awaiting');
  if (activeTab === 'signed') return t.status === 'Signed Off';
  return true;
}

function filteredTasks() {
  const q = ($('search')?.value || '').toLowerCase(),
    status = $('statusFilter')?.value || '',
    project = $('projectFilter')?.value || '';
  return myTasks().filter(t => {
    const hay = Object.values(t).join(' ').toLowerCase();
    return tabMatch(t) && (!q || hay.includes(q)) && (!status || t.status === status) && (!project || t.project === project);
  });
}

function renderTaskTable() {
  const el = $('taskTable'); if (!el) return;
  const rows = filteredTasks().map(t => staffTaskRow(t, false)).join('');
  el.innerHTML = `<thead><tr><th>Project</th><th>Stage</th><th>Required File</th><th>Status</th><th>Identity</th><th>Date</th><th>File</th></tr></thead><tbody>${rows || '<tr><td colspan="7"><div class="empty">No assigned tasks match this view.</div></td></tr>'}</tbody>`;
  staggerRows(el, 30, 8);
  renderStaffKpis();
}

function simulateUpload() {
  const id = $('taskSelect')?.value,
    file = $('fileInput')?.files[0],
    task = (TASKS || []).find(t => t.id === id && t.assigned === currentUser);
  if (!task) { $('uploadMsg').textContent = 'No pending task selected.'; return; }
  if (!file) { $('uploadMsg').textContent = 'Choose a file first.'; return; }
  task.status = 'Signed Off';
  task.uploadedBy = currentUser;
  task.signedBy = currentUser;
  task.date = todayStr();
  task.file = '#';
  ZCC.saveTasks(TASKS);
  $('uploadMsg').textContent = 'Recorded ✔ — ' + file.name;
  toast('Signed off: ' + task.required + ' (' + task.projectId + ')', 'success');
  fillFilters(); renderTaskOptions(); renderTaskTable(); renderPriorityTasks(); renderStaffKpis();
}

function bindStaffTasks() {
  ['search', 'statusFilter', 'projectFilter'].forEach(id => {
    const el = $(id); if (!el) return;
    el.addEventListener(id === 'search' ? 'input' : 'change', renderTaskTable);
  });
  document.querySelectorAll('.card .tab').forEach(btn => btn.onclick = () => {
    document.querySelectorAll('.card .tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTab = btn.dataset.tab;
    renderTaskTable();
  });
}

/* ---------- staff site photos (12) ---------- */
function populatePhotoProject() {
  const sel = $('photoProject'); if (!sel) return;
  const myProjs = unique(myTasks().map(t => t.project));
  sel.innerHTML = '<option value="">Select project...</option>' + myProjs.map(p => `<option>${esc(p)}</option>`).join('');
}

function renderPhotos() {
  const grid = $('photoGrid'); if (!grid) return;
  const mine = ALL_PHOTOS.filter(p => p.uploadedBy === currentUser)
    .concat(ZCC.myPhotos().filter(p => p.uploadedBy === currentUser))
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
  if (!mine.length) { grid.innerHTML = '<div style="grid-column:1/-1" class="empty">No site photos uploaded yet. Use the upload area above.</div>'; return; }
  grid.innerHTML = mine.map(p => {
    const imgs = (p.imgs && p.imgs.length ? p.imgs : (p.img ? [p.img] : []));
    const gallery = imgs.length
      ? `<div class="photo-gallery">${imgs.map(u => `<img class="photo-img" src="${esc(u)}" alt="${esc(p.description)}" onclick="window.open('${esc(u)}','_blank')">`).join('')}</div>`
      : '';
    return `<div class="photo-card">${gallery}<div class="photo-card-head"></div><div class="photo-card-body"><b>${esc(p.description)}</b><span>${esc(p.project)} · Stage: ${esc(p.stage)}<br>${esc(p.type)} · ${esc(p.id)}</span><div class="photo-card-meta"><div class="photo-card-avatar">${initials(p.uploadedBy)}</div><div><div class="photo-card-who">${esc(p.uploadedBy)}</div><div class="photo-card-when">${esc(p.date)} at ${esc(p.time)}</div></div></div></div></div>`;
  }).join('');
  staggerChildren(grid, 50, 10);
}

function handlePhotoUpload(input) {
  const file = input.files[0];
  const proj = $('photoProject')?.value || '';
  if (!file) return;
  const msg = $('uploadMsg');
  if (!proj) { if (msg) msg.textContent = 'Select a project first.'; toast('Select a project before uploading.', 'error'); input.value = ''; return; }
  const now = new Date();
  const photoCount = ZCC.myPhotos().length;
  const task = myTasks().find(t => t.project === proj);
  const newPhoto = {
    id: 'PH-' + String(photoCount + 100).padStart(3, '0'),
    projectId: task ? task.projectId : 'ZW-???',
    project: proj,
    stage: task ? task.stage : 'Execution',
    type: file.type.startsWith('image/') ? 'Site Photo' : 'Document',
    description: file.name.replace(/\.[^.]+$/, ''),
    uploadedBy: currentUser,
    role: task ? task.role : 'Staff',
    date: dateGB(now),
    time: time24(now)
  };
  const arr = ZCC.myPhotos(); arr.push(newPhoto); ZCC.saveMyPhotos(arr);
  if (msg) msg.textContent = 'Photo recorded ✔';
  toast('Evidence recorded — ' + newPhoto.project, 'success');
  renderPhotos();
  input.value = '';
}

/* ---------- staff profile (13) ---------- */
function renderProfile(user) {
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('pfName', user.name);
  set('pfRole', user.role);
  set('pfEmail', user.email);
  set('pfCode', user.code.slice(0, 3) + '••••');
  set('pfAvatar', initials(user.name));
  const tasks = myTasks();
  set('pfAssigned', tasks.length);
  set('pfSigned', tasks.filter(t => t.status === 'Signed Off').length);
  set('pfPending', tasks.filter(t => t.status !== 'Signed Off').length);
  const list = $('pfProjects');
  if (list) {
    list.innerHTML = tasks.length
      ? tasks.map(t => `<tr><td><b>${esc(t.project)}</b><br><span class="muted">${esc(t.projectId)}</span></td><td>Stage ${t.stageNo}<br><span class="muted">${esc(t.stage)}</span></td><td>${esc(t.required)}</td><td><span class="pill ${statusClass(t.status)}">${esc(t.status)}</span></td></tr>`).join('')
      : '<tr><td colspan="4"><div class="empty">No tasks are currently assigned to this identity.</div></td></tr>';
    staggerChildren(list, 35, 8);
  }
}

/* ============================================================
   CONTRACT PORTAL (14, 15)
   ============================================================ */
function renderContractDash() {
  const k = $('contractKpis'); if (k) {
    const total = FILE_TRACKING.length;
    const red = FILE_TRACKING.filter(t => t.status === 'Red').length;
    const amber = FILE_TRACKING.filter(t => t.status === 'Amber').length;
    const green = FILE_TRACKING.filter(t => t.status === 'Green').length;
    k.innerHTML = [
      ['Files in Pipeline', total, 'int'],
      ['Overdue (Red)', red, 'int'],
      ['Watch (Amber)', amber, 'int'],
      ['On Track (Green)', green, 'int'],
    ].map(([lab, v, kd]) => `<div class="metric-card"><span>${lab}</span><b data-target="${v}" data-kind="${kd}">0</b></div>`).join('');
    k.querySelectorAll('b').forEach(runCounter);
    staggerChildren(k, 60, 6);
  }
  const flow = $('contractFlow');
  if (flow) {
    flow.innerHTML = APPROVAL_FLOW.map((s, i) =>
      `<div class="step ${i === 3 ? 'current' : 'done'}"><div class="num">${i + 1}</div><b style="font-size:12px">${s}</b><div style="color:#64748b;font-size:11px;margin-top:5px">${i === 3 ? 'In progress' : 'Completed'}</div></div>`
    ).join('');
  }
  const board = $('contractBoard'); if (!board) return;
  const cols = ['Green', 'Amber', 'Red'];
  board.innerHTML = cols.map(st =>
    `<div class="pipeline-col"><div class="pipeline-col-head pill ${st === 'Green' ? 'green' : st === 'Amber' ? 'amber' : 'red'}">${st}</div>` +
    FILE_TRACKING.filter(t => t.status === st)
      .map(t => `<div class="pipeline-card" onclick="openProject('${t.projectId}')">
        <b>${esc(t.project)}</b>
        <span class="muted">${esc(t.projectId)} · ${esc(t.office)}</span>
        <div class="pipeline-meta"><span>In stage: <b>${t.daysInStage}d</b></span><span>SLA: ${t.expectedDays}d</span></div>
        <div class="pipeline-next">${esc(t.nextAction)}</div>
      </div>`).join('') +
    `</div>`).join('');
}

function renderFileTracking() {
  const el = $('fileTrackingTable'); if (!el) return;
  const rows = FILE_TRACKING.slice().sort((a, b) => b.daysInStage - a.daysInStage).map(t =>
    `<tr onclick="openProject('${t.projectId}')">
      <td><b>${esc(t.project)}</b><br><span style="color:#64748b">${esc(t.projectId)}</span></td>
      <td>${esc(t.client)}</td>
      <td>${esc(t.file)}</td>
      <td>${esc(t.office)}</td>
      <td>${esc(t.entered)}</td>
      <td><b>${t.daysInStage}d</b><br><span style="color:#64748b">SLA ${t.expectedDays}d</span></td>
      <td>${t.daysInStage > t.expectedDays ? `+${t.daysInStage - t.expectedDays}d over` : 'On track'}</td>
      <td><span class="pill ${cls(t.status)}">${esc(t.status)}</span></td>
    </tr>`).join('');
  el.innerHTML = `<table class="file-table"><thead><tr><th>Project</th><th>Client</th><th>File / Stage</th><th>Current Office</th><th>Entered</th><th>Days in Stage</th><th>vs SLA</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
  staggerRows(el);
}

/* ============================================================
   ACCOUNTS PORTAL (17, 18)
   ============================================================ */
function renderAccountsDash() {
  const t = PROJECTS.reduce((a, p) => {
    const c = costInfo(p);
    a.value += p.contractValue; a.certified += c.certified; a.paid += c.paid; a.outstanding += c.outstanding; a.retention += c.retention;
    return a;
  }, { value: 0, certified: 0, paid: 0, outstanding: 0, retention: 0 });
  const k = $('acctKpis');
  if (k) {
    k.innerHTML = [
      ['Portfolio Value', t.value, 'money'],
      ['Total Certified', t.certified, 'money'],
      ['Total Paid', t.paid, 'money'],
      ['Outstanding', t.outstanding, 'money'],
      ['Retention Held', t.retention, 'money'],
    ].map(([lab, v, kd]) => `<div class="metric-card"><span>${lab}</span><b data-target="${v}" data-kind="${kd}">₦0</b></div>`).join('');
    k.querySelectorAll('b').forEach(runCounter);
    staggerChildren(k, 60, 7);
  }
  const tab = $('acctTable'); if (!tab) return;
  const rows = PROJECTS.map(p => {
    const c = costInfo(p);
    const ratio = c.certified ? Math.round(c.paid / c.certified * 100) : 0;
    return `<tr onclick="openProject('${p.id}')">
      <td><b>${esc(p.name)}</b><br><span style="color:#64748b">${esc(p.id)}</span></td>
      <td>${money(p.contractValue)}</td>
      <td>${money(c.certified)}</td>
      <td>${money(c.paid)}</td>
      <td>${money(c.outstanding)}</td>
      <td>${money(c.retention)}</td>
      <td><div class="track" style="min-width:90px"><div class="fill ${p.status === 'Red' ? 'red' : p.status === 'Amber' ? 'amber' : 'green'}" style="width:${ratio}%"></div></div></td>
    </tr>`;
  }).join('');
  tab.innerHTML = `<table class="file-table"><thead><tr><th>Project</th><th>Contract Value</th><th>Certified</th><th>Paid</th><th>Outstanding</th><th>Retention</th><th>Collection %</th></tr></thead><tbody>${rows}</tbody></table>`;
  staggerRows(tab);
  animateFills(tab);
}

function renderRetentionRegister() {
  const el = $('retentionTable'); if (!el) return;
  const t = PROJECTS.reduce((a, p) => a + costInfo(p).retention, 0);
  const head = $('retentionHead');
  if (head) head.innerHTML = `<div class="metric-row"><div class="metric-card"><span>Total Retention Held</span><b data-target="${t}" data-kind="money">₦0</b></div><div class="metric-card"><span>Projects Retaining</span><b>${PROJECTS.length}</b></div><div class="metric-card"><span>Retention Rate</span><b>5%</b></div><div class="metric-card"><span>Retention Term</span><b>6 months</b></div></div>`;
  const b = head && head.querySelector('b'); if (b) runCounter(b);
  const rows = PROJECTS.map(p => {
    const c = costInfo(p);
    const release = p.status === 'Green' ? 'Eligible' : p.status === 'Amber' ? 'Pending completion' : 'On hold';
    const rcls = release === 'Eligible' ? 'green' : release === 'Pending completion' ? 'amber' : 'red';
    return `<tr><td><b>${esc(p.name)}</b><br><span style="color:#64748b">${esc(p.id)}</span></td><td>${money(p.contractValue)}</td><td>${money(c.certified)}</td><td>${money(c.retention)}</td><td>${money(c.outstanding)}</td><td>${esc(p.plannedEnd)}</td><td><span class="pill ${rcls}">${release}</span></td></tr>`;
  }).join('');
  el.innerHTML = `<table class="file-table"><thead><tr><th>Project</th><th>Contract Value</th><th>Certified</th><th>Retention Held</th><th>Outstanding</th><th>Planned End</th><th>Release Status</th></tr></thead><tbody>${rows}</tbody></table>`;
  staggerRows(el);
}

/* ============================================================
   ADMIN CONSOLE (20) — Super Admin
   ============================================================ */
/* ============================================================
   SOP & COMPLIANCE (16)
   Framework + expiry engine. Content is sample/placeholder until
   Blessing issues the authoritative SOP documentation.
   ============================================================ */
function renderSOPCompliance(){
  /* compliance KPI cards */
  const k = $('cmpKpis');
  if (k) {
    const bands = COMPLIANCE.reduce((a, c) => { const b = expiryBand(c.expInDays); a[b.label]= (a[b.label]||0)+1; return a; }, {});
    const expired = COMPLIANCE.filter(c => c.expInDays < 0).length;
    const alert30 = COMPLIANCE.filter(c => c.expInDays >= 0 && c.expInDays <= 30).length;
    k.innerHTML = [
      ['Compliance Items', COMPLIANCE.length, 'int'],
      ['Expired', expired, 'int'],
      ['Expiring ≤30d', alert30, 'int'],
      ['Fully Compliant', COMPLIANCE.filter(c => c.expInDays > 90).length, 'int'],
    ].map(([lab, v, kd]) => `<div class="metric-card"><span>${lab}</span><b data-target="${v}" data-kind="${kd}">0</b></div>`).join('');
    k.querySelectorAll('b').forEach(runCounter);
    staggerChildren(k, 60, 6);
  }
  /* compliance register table */
  const ct = $('cmpTable');
  if (ct) {
    const rows = COMPLIANCE.slice().sort((a,b)=>a.expInDays-b.expInDays).map(c => {
      const b = expiryBand(c.expInDays);
      return `<tr>
        <td><b>${esc(c.item)}</b><br><span style="color:#64748b">${esc(c.id)} · ${esc(c.type)}</span></td>
        <td>${esc(c.applies)}</td>
        <td>${esc(c.owner)}</td>
        <td>${expiryDate(c.expInDays)}</td>
        <td>${c.expInDays < 0 ? '<b style="color:#dc2626">' + Math.abs(c.expInDays) + 'd overdue</b>' : c.expInDays + ' days'}</td>
        <td><span class="pill ${b.cls}">${esc(b.label)}</span></td>
        <td style="color:#64748b;font-size:12px">${esc(c.note)}</td>
      </tr>`;
    }).join('');
    ct.innerHTML = `<table class="file-table"><thead><tr><th>Compliance Item</th><th>Applies To</th><th>Owner</th><th>Expiry Date</th><th>Days to Expiry</th><th>Status</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table>`;
    staggerRows(ct);
  }
  /* SOP library table */
  const st = $('sopTable');
  if (st) {
    const rows = SOP_REGISTRY.map(s =>
      `<tr><td><b>${esc(s.id)}</b></td><td><b>${esc(s.title)}</b><br><span style="color:#64748b">v${s.version}</span></td><td>${esc(s.owner)}</td><td>${esc(s.applies)}</td><td>${esc(s.review)}</td><td style="color:#64748b;font-size:12px">${esc(s.summary)}</td><td><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="download-btn" href="${esc(s.file)}" target="_blank">Open</a><a class="download-btn primary" href="${esc(s.file)}" download>Download</a></div></td></tr>`).join('');
    st.innerHTML = `<table class="file-table"><thead><tr><th>Ref</th><th>SOP Title</th><th>Owner</th><th>Applies To</th><th>Review</th><th>Summary</th><th>Document</th></tr></thead><tbody>${rows}</tbody></table>`;
    staggerRows(st);
  }
}

/* ============================================================
   ADMIN CONSOLE (20) — Super Admin POWERS
   Revoke/restore access, issue & rotate access codes, health check.
   ============================================================ */
function adminUsers(){ return ZCC.allUsers(); }
function getOverride(email){ const s = ZCC.usersStore(); s[email] = s[email] || {}; return s[email]; }
function revokeUser(email){
  const u = adminUsers()[email]; if (!u) return;
  getOverride(email).active = false;
  ZCC.saveUsers(ZCC.usersStore());
  // force-kill an active session for that person
  if (ZCC.user() && ZCC.user().email === email) { /* signed-in admin revoking self: keep admin session */ }
  ZCC.logAudit(whoami(), 'REVOKE_ACCESS', email + ' (' + u.name + ')');
  toast('Access revoked: ' + u.name, 'error');
  renderAdminConsole();
}
function restoreUser(email){
  const u = adminUsers()[email]; if (!u) return;
  getOverride(email).active = true;
  ZCC.saveUsers(ZCC.usersStore());
  ZCC.logAudit(whoami(), 'RESTORE_ACCESS', email + ' (' + u.name + ')');
  toast('Access restored: ' + u.name);
  renderAdminConsole();
}
function rotateCode(email){
  const u = adminUsers()[email]; if (!u) return;
  const ov = getOverride(email);
  const existing = new Set(Object.values(adminUsers()).map(x => x.code));
  let code = 'ZW-' + String(Math.floor(1000 + Math.random() * 9000));
  while (existing.has(code)) code = 'ZW-' + String(Math.floor(1000 + Math.random() * 9000));
  ov.code = code; ov.active = true;
  ZCC.saveUsers(ZCC.usersStore());
  ZCC.logAudit(whoami(), 'ROTATE_CODE', email + ' → new code issued');
  alert('New access code for ' + u.name + ':\n\n  ' + code + '\n\nShare this privately.');
  renderAdminConsole();
}
function issueUser(){
  const email = ($('nuEmail')?.value || '').trim(),
    name = ($('nuName')?.value || '').trim(),
    role = $('nuRole')?.value || 'Project Manager',
    err = $('nuMsg');
  if (!email || !name || !email.includes('@')) { if (err) err.innerHTML = '<span class="err">Enter a valid email and name.</span>'; return; }
  if (adminUsers()[email]) { if (err) err.innerHTML = '<span class="err">That email already exists.</span>'; return; }
  const existing = new Set(Object.values(adminUsers()).map(x => x.code));
  let code = 'ZW-' + String(Math.floor(1000 + Math.random() * 9000));
  while (existing.has(code)) code = 'ZW-' + String(Math.floor(1000 + Math.random() * 9000));
  const s = ZCC.usersStore();
  s[email] = { code, name, role, active: true };
  ZCC.saveUsers(s);
  ZCC.logAudit(whoami(), 'ISSUE_USER', email + ' (' + role + ')');
  if (err) err.innerHTML = `<span style="color:#16a34a">✔ ${name} created — code <b>${code}</b> issued privately.</span>`;
  alert('New user issued:\n\n  Name: ' + name + '\n  Role: ' + role + '\n  Email: ' + email + '\n  Code: ' + code + '\n\nShare the code privately.');
  $('nuEmail').value = ''; $('nuName').value = '';
  renderAdminConsole();
}

/* health / issues check — surfaces actionable problems from the data */
function renderHealthCheck(){
  const el = $('acHealth'); if (!el) return;
  const issues = [];
  PROJECTS.filter(p => p.freshness === 'Stale').forEach(p => issues.push({ sev:'red', msg: p.name + ' — update stale (' + p.daysOld + 'd old)' }));
  PROJECTS.filter(p => p.daysInStage > 14).forEach(p => issues.push({ sev:'red', msg: p.name + ' — file in stage ' + p.daysInStage + 'd (>14)' }));
  FILE_TRACKING.filter(t => t.status === 'Red').forEach(t => issues.push({ sev:'amber', msg: t.project + ' — file overdue (SLA ' + t.expectedDays + 'd)' }));
  (TASKS || []).filter(t => t.status !== 'Signed Off').forEach(t => issues.push({ sev:'amber', msg: t.project + ' — ' + t.required + ' pending' }));
  const revoked = Object.values(adminUsers()).filter(u => u.active === false).length;
  if (revoked) issues.push({ sev:'blue', msg: revoked + ' account(s) currently revoked' });
  if (!issues.length) { el.innerHTML = '<div class="empty">No outstanding issues. All clear. ✅</div>'; return; }
  el.innerHTML = issues.map(i =>
    `<div class="att-item"><span class="dot ${i.sev === 'red' ? 'red' : i.sev === 'amber' ? 'amber' : 'blue'}"></span><div><h4 style="font-size:13px">${esc(i.msg)}</h4></div></div>`
  ).join('');
}

function renderAdminConsole() {
  const pn = $('acUsers');
  if (pn) {
    const entries = Object.entries(adminUsers())
      .sort((a, b) => (Number(a[1].active === false) - Number(b[1].active === false)));
    const rows = entries.map(([email, info]) => {
      const isRevoked = info.active === false;
      const action = isRevoked
        ? `<button class="upd-btn upd-btn-soft" onclick="restoreUser('${esc(email)}')">Restore</button>`
        : `<button class="upd-btn" onclick="rotateCode('${esc(email)}')">Rotate Code</button> <button class="upd-btn upd-btn-danger" onclick="revokeUser('${esc(email)}')">Revoke</button>`;
      return `<tr>
        <td><b>${esc(info.name)}</b></td>
        <td><span class="pill ${info.role === 'Super Admin' ? 'purple' : 'blue'}">${esc(info.role)}</span></td>
        <td style="color:#64748b">${esc(email)}</td>
        <td>${esc(info.code)}</td>
        <td><span class="pill ${isRevoked ? 'red' : 'green'}">${isRevoked ? 'Revoked' : 'Active'}</span></td>
        <td><div style="display:flex;gap:8px;flex-wrap:wrap">${action}</div></td>
      </tr>`;
    }).join('');
    pn.innerHTML = `<table class="file-table"><thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Access Code</th><th>Status</th><th>Admin Action</th></tr></thead><tbody>${rows}</tbody></table>`;
    staggerRows(pn);
  }
  const sc = $('acSessions');
  if (sc) {
    sc.innerHTML = `<table class="file-table"><thead><tr><th>Session</th><th>Detail</th></tr></thead><tbody>` +
      `<tr><td>Security Epoch</td><td><b>v${ZCC.epoch()}</b> · <button class="upd-btn" onclick="ZCC.bumpEpoch();toast('Security epoch bumped — all sessions will be forced out on next load.','info');renderAdminConsole()">Bump epoch (force sign-out)</button></td></tr>` +
      `<tr><td>Idle Timeout</td><td><b>${ZCC.config().timeout} minutes</b> · configured via Admin settings</td></tr>` +
      `<tr><td>Auth Mode</td><td>Google Workspace SSO planned · access-code demo active</td></tr>` +
      `</tbody></table>`;
  }
  const au = $('acAudit');
  if (au) {
    const log = ZCC.auditLog().slice(0, 25);
    au.innerHTML = log.length
      ? `<table class="file-table"><thead><tr><th>When</th><th>Who</th><th>Action</th><th>Detail</th></tr></thead><tbody>` +
        log.map(e => `<tr><td style="white-space:nowrap">${stamp24(new Date(e.t))}</td><td><b>${esc(e.who)}</b></td><td>${esc(e.what)}</td><td style="color:#64748b">${esc(e.meta)}</td></tr>`).join('') +
        `</tbody></table>`
      : `<div class="empty">No audit events recorded yet in this browser. Sign in to generate events.</div>`;
  }
  const hc = $('acHealth'); if (hc) renderHealthCheck();
  const du = $('docUploads'); if (du) renderDocUploads();
}

/* ============================================================
   LIVE UPDATES — how every user updates the system
   Each portal has scoped entry forms that write to the shared
   data, persist to the browser, recompute statuses, and log to
   the audit trail. (Production: shared DB + server-side RBAC.)
   ============================================================ */
function whoami(){ const u = ZCC.user(); return u ? u.name : 'Unknown'; }

/* rule-based status recompute — statuses are NEVER hand-typed */
function recalcProject(p){
  const v = (p.actual || 0) - (p.planned || 0);
  p.status = v < -15 ? 'Red' : v < -5 ? 'Amber' : 'Green';
  return p;
}
function recalcCost(p){
  const c = COST_DATA[p.id] || (COST_DATA[p.id] = { certified:0, paid:0, retention:0, variation:0 });
  c.outstanding = Math.max(0, (c.certified||0) - (c.paid||0));
  return c;
}

function fillProjectOptions(selId){
  const sel = $(selId); if (!sel) return;
  sel.innerHTML = '<option value="">Select project…</option>' +
    PROJECTS.map(p => `<option value="${esc(p.id)}">${esc(p.id)} · ${esc(p.name)}</option>`).join('');
}

/* --- ACCOUNTS: record a payment / certification / retention release --- */
function updPayment(){
  const pid = $('payProject')?.value, amt = Number($('payAmount')?.value || 0),
    kind = $('payKind')?.value, note = $('payNote')?.value || '';
  const err = $('payMsg');
  if (!pid || !(amt > 0)) { if (err) err.textContent = 'Choose a project and enter an amount.'; return; }
  const c = recalcCost(PROJECTS.find(p => p.id === pid));
  const labels = { paid:'Paid', certified:'Certified', retention:'Retention Released' };
  c[kind] = (c[kind] || 0) + amt;
  recalcCost(PROJECTS.find(p => p.id === pid));
  ZCC.snapshot(); ZCC.logAudit(whoami(), 'PAYMENT_UPDATE', `${pid} ${labels[kind]} +${money(amt)} ${note}`.trim());
  if (err) err.innerHTML = `<span style="color:#16a34a">✔ Recorded — ${labels[kind]} +${money(amt)} for ${pid}. Outstanding recomputed.</span>`;
  toast('Payment recorded: ' + pid + ' ' + labels[kind] + ' +' + money(amt));
  renderAccountsDash();
}

/* --- CONTRACT: move a file to the next office (resets the clock) --- */
function updMoveFile(){
  const pid = $('mvProject')?.value, office = $('mvOffice')?.value, note = $('mvNote')?.value || '';
  const err = $('mvMsg');
  if (!pid || !office) { if (err) err.textContent = 'Choose a project and enter the new office.'; return; }
  const f = FILE_TRACKING.find(t => t.projectId === pid);
  if (!f) { if (err) err.textContent = 'No tracked file for that project.'; return; }
  const from = f.office;
  f.office = office;
  f.entered = todayStr();
  f.daysInStage = 0;
  f.status = 'Green';
  f.nextAction = 'Monitor at ' + office + ' — awaiting progress / decision.';
  ZCC.snapshot(); ZCC.logAudit(whoami(), 'FILE_MOVE', `${pid}: ${from} → ${office} ${note}`.trim());
  if (err) err.innerHTML = `<span style="color:#16a34a">✔ File moved — ${pid} now at ${office}. Clock reset.</span>`;
  toast('File moved: ' + pid + ' → ' + office);
  renderContractDash(); renderFileTracking();
}

/* --- CONTRACT: upload / register a document --- */
function updAddDoc(){
  const pid = $('docProject')?.value, type = $('docType')?.value, title = $('docTitle')?.value;
  const err = $('docMsg');
  if (!pid || !type || !title) { if (err) err.textContent = 'Complete project, type and title.'; return; }
  const p = PROJECTS.find(x => x.id === pid);
  const next = String(DOCUMENTS.length + 1).padStart(3, '0');
  const now = new Date();
  const ts = dateGB(now);
  const tm = time24(now);
  DOCUMENTS.push({
    documentId: 'DOC-ZW-' + pid.slice(-3) + '-' + next, projectId: pid,
    projectName: p.name, client: p.client, type, stage: p.stage, title,
    date: ts, time: tm, uploadedAt: ts + ' ' + tm,
    owner: whoami(), status: 'Available', file: '#'
  });
  ZCC.snapshot(); ZCC.logAudit(whoami(), 'DOCUMENT_UPLOAD', `${pid} · ${type} · ${title}`);
  if (err) err.innerHTML = `<span style="color:#16a34a">✔ Document registered — ${esc(title)} (${pid}) at ${ts} ${tm}.</span>`;
  toast('Document registered: ' + title);
  renderFileTable(); renderDocRegister(); renderDocUploads();
}

/* Recent document uploads feed — with timestamps. Shown on the MD
   dashboard and the Admin Console so leadership can see who uploaded
   what, and when. */
function renderDocUploads(){
  const el = $('docUploads'); if (!el) return;
  const rows = DOCUMENTS.slice().sort((a, b) => String(b.uploadedAt || b.date).localeCompare(String(a.uploadedAt || a.date))).map(d => {
    const fileCell = d.file && d.file !== '#' && d.file !== ''
      ? `<div style="display:flex;gap:8px;flex-wrap:wrap" onclick="event.stopPropagation()"><a class="download-btn" href="${esc(d.file)}" target="_blank">Open</a><a class="download-btn primary" href="${esc(d.file)}" download>Download</a></div>`
      : `<span style="color:#64748b;font-size:12px">No file</span>`;
    return `<tr>
      <td><b>${esc(d.title)}</b><br><span style="color:#64748b">${esc(d.documentId)} · ${esc(d.type)}</span></td>
      <td>${esc(d.projectName)}<br><span style="color:#64748b">${esc(d.projectId)}</span></td>
      <td><b>${esc(d.owner)}</b></td>
      <td><span style="color:#475569;white-space:nowrap">${esc(d.uploadedAt || d.date + ' ' + (d.time || ''))}</span></td>
      <td>${fileCell}</td>
    </tr>`;
  }).join('');
  el.innerHTML = rows.length
    ? `<table class="file-table"><thead><tr><th>Document</th><th>Project</th><th>Uploaded By</th><th>Timestamp</th><th>File</th></tr></thead><tbody>${rows}</tbody></table>`
    : '<div class="empty">No documents recorded.</div>';
}

/* --- PM / STAFF: update progress % (status recomputes) --- */
function updProgress(){
  const pid = $('projProject')?.value, val = Number($('projActual')?.value), note = $('projNote')?.value || '';
  const err = $('projMsg');
  if (!pid || isNaN(val) || val < 0 || val > 100) { if (err) err.textContent = 'Choose a project and enter progress 0–100%.'; return; }
  const p = PROJECTS.find(x => x.id === pid);
  p.actual = Math.round(val);
  recalcProject(p);
  ZCC.snapshot(); ZCC.logAudit(whoami(), 'PROGRESS_UPDATE', `${pid} actual → ${p.actual}% (${p.status}) ${note}`.trim());
  if (err) err.innerHTML = `<span style="color:#16a34a">✔ Progress updated — ${pid} at ${p.actual}%. Status recomputed: ${p.status}.</span>`;
  toast('Progress updated: ' + pid + ' → ' + p.actual + '% (' + p.status + ')');
  renderProjects();
}

/* --- MD: approve / reject items awaiting review --- */
function pendingReviews(){
  return (TASKS || []).filter(t => t.status.includes('Awaiting') || (t.status === 'Uploaded - Awaiting Review'));
}
function renderApprovalsInbox(){
  const el = $('approvalsInbox'); if (!el) return;
  const pending = pendingReviews();
  if (!pending.length) { el.innerHTML = '<div class="empty">No items awaiting your review. ✅</div>'; return; }
  el.innerHTML = `<table class="file-table"><thead><tr><th>Upload</th><th>Project</th><th>Uploaded By</th><th>Date</th><th>Status</th><th>Document</th><th>Action</th></tr></thead><tbody>` +
    pending.map(t => {
      const fileCell = t.file && t.file !== '#' && t.file !== ''
        ? `<div style="display:flex;gap:8px;flex-wrap:wrap" onclick="event.stopPropagation()"><a class="download-btn" href="${esc(t.file)}" target="_blank">View</a><a class="download-btn primary" href="${esc(t.file)}" download>Download</a></div>`
        : `<span style="color:#64748b;font-size:12px">No file attached</span>`;
      return `<tr>
      <td><b>${esc(t.required)}</b><br><span style="color:#64748b">${esc(t.id)} · Stage ${t.stageNo} · ${esc(t.stage)}</span></td>
      <td>${esc(t.project)}<br><span style="color:#64748b">${esc(t.projectId)}</span></td>
      <td>${esc(t.uploadedBy)}<br><span style="color:#64748b">${esc(t.role)}</span></td>
      <td>${esc(t.date)}</td>
      <td><span class="pill review">${esc(t.status)}</span></td>
      <td>${fileCell}</td>
      <td><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="upd-btn" onclick="approveTask('${esc(t.id)}')">Approve</button><button class="upd-btn upd-btn-soft" onclick="rejectTask('${esc(t.id)}')">Reject</button></div></td>
    </tr>`;
    }).join('') + `</tbody></table>`;
}
function approveTask(id){
  const t = (TASKS || []).find(x => x.id === id); if (!t) return;
  t.status = 'Signed Off'; t.signedBy = whoami();
  ZCC.saveTasks(TASKS); ZCC.snapshot(); ZCC.logAudit(whoami(), 'APPROVE', `${t.id} · ${t.required}`);
  toast('Approved: ' + t.required); renderApprovalsInbox(); renderStaffKpis && renderStaffKpis();
}
function rejectTask(id){
  const t = (TASKS || []).find(x => x.id === id); if (!t) return;
  t.status = 'Pending Upload'; t.signedBy = '—';
  ZCC.saveTasks(TASKS); ZCC.snapshot(); ZCC.logAudit(whoami(), 'REJECT', `${t.id} · ${t.required} (returned to uploader)`);
  toast('Rejected — returned to uploader.', 'error'); renderApprovalsInbox(); renderStaffKpis && renderStaffKpis();
}

function buildBidDrawer(){
  if (document.getElementById('bidDrawer')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `<div class="drawer-overlay" id="bidOverlay"></div>
    <aside class="drawer" id="bidDrawer">
      <div class="drawer-head"><button class="close" onclick="closeBidDrawer()">×</button>
        <div id="bidDrawerBadges"></div><h2 id="bidDrawerTitle"></h2><div id="bidDrawerSub" style="color:#dbeafe">Bid Opportunity</div>
      </div>
      <div class="drawer-content"><div id="bidDrawerBody"></div></div>
    </aside>`;
  while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
  document.getElementById('bidOverlay').onclick = closeBidDrawer;
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBidDrawer(); });
}

/* Open bid detail drawer with image, price, and controller */
function openBid(id){
  const b = BIDDING_PIPELINE.find(x => x.id === id); if (!b) return;
  const imgHtml = b.img ? `<img class="bid-detail-img" src="${esc(b.img)}" alt="${esc(b.opportunity)}"><div class="bid-detail-caption">Concept mockup — intended completed look</div>` : '<div class="empty">No image</div>';
  const stCls = b.status==='Won'?'green':b.status==='Lost'?'red':b.status==='In Bidding'?'amber':'blue';
  const body = `
    <div class="bid-detail-hero">${imgHtml}</div>
    <div class="detail-kpis" style="margin-top:14px">
      <div class="dk"><span>Expected Value</span><b>${money(b.value)}</b></div>
      <div class="dk"><span>Win Probability</span><b>${b.winProb}%</b></div>
      <div class="dk"><span>Bid Deadline</span><b>${esc(b.bidDeadline)}</b></div>
      <div class="dk"><span>Status</span><b style="color:${b.status==='Won'?'#16a34a':b.status==='Lost'?'#dc2626':'#f59e0b'}">${esc(b.status)}</b></div>
    </div>
    <div class="info-grid" style="margin-top:12px">
      <div class="info"><b>Opportunity</b>${esc(b.opportunity)}</div>
      <div class="info"><b>Ministry</b>${esc(b.ministry)}</div>
      <div class="info"><b>Sector</b>${esc(b.sector)}</div>
      <div class="info"><b>Procurement</b>${esc(b.procurement)}</div>
      <div class="info"><b>Project Manager</b>${esc(b.pm)}</div>
      <div class="info"><b>Bid Controlled By</b>${esc(b.owner)}</div>
      <div class="info"><b>Submitted</b>${esc(b.submitted)}</div>
      <div class="info"><b>Compliance</b>${esc(b.compliance)}</div>
    </div>
    <div class="callout" style="margin-top:12px"><b>Note:</b> ${esc(b.note)}</div>`;
  const dTitle = $('bidDrawerTitle'); if (dTitle) dTitle.textContent = b.opportunity;
  const dBadges = $('bidDrawerBadges'); if (dBadges) dBadges.innerHTML = `<span class="pill ${stCls}">${esc(b.status)}</span> <span class="pill blue">${esc(b.id)}</span>`;
  const dBody = $('bidDrawerBody'); if (dBody) dBody.innerHTML = body;
  const ov = $('bidOverlay'); if (ov) ov.classList.add('show');
  const dr = $('bidDrawer'); if (dr) dr.classList.add('show');
  document.body.classList.add('open');
}
function closeBidDrawer(){
  const ov = $('bidOverlay'); if (ov) ov.classList.remove('show');
  const dr = $('bidDrawer'); if (dr) dr.classList.remove('show');
  document.body.classList.remove('open');
}

/* Full bidding pipeline table — bid-specific detail */
function renderBidTable(){
  const el = $('bidTable'); if (!el) return;
  const rows = BIDDING_PIPELINE.slice().sort((a,b)=>String(b.bidDeadline).localeCompare(String(a.bidDeadline))).map(b => {
    const stCls = b.status==='Won'?'green':b.status==='Lost'?'red':b.status==='In Bidding'?'amber':'blue';
    const comp = b.compliance.includes('due') ? '<span class="pill red">' + esc(b.compliance) + '</span>' : '<span class="pill green">' + esc(b.compliance) + '</span>';
    return `<tr onclick="openBid('${b.id}')"><td><b>${esc(b.opportunity)}</b><br><span style="color:#64748b">${esc(b.id)} · ${esc(b.sector)}</span></td><td>${esc(b.ministry)}</td><td>${esc(b.procurement)}</td><td>${money(b.value)}</td><td>${esc(b.submitted) === '—' ? '<span style="color:#64748b">Not yet</span>' : esc(b.submitted)}</td><td>${esc(b.bidDeadline)}</td><td>${b.winProb}%</td><td>${comp}</td><td><span class="pill ${stCls}">${esc(b.status)}</span></td><td style="color:#64748b;font-size:12px">${esc(b.note)}</td></tr>`;
  }).join('');
  el.innerHTML = `<table class="file-table"><thead><tr><th>Opportunity</th><th>Ministry</th><th>Procurement</th><th>Expected Value</th><th>Submitted</th><th>Bid Deadline</th><th>Win %</th><th>Compliance</th><th>Status</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table>`;
  staggerRows(el);
}

/* ============================================================
   ADVANCED MODULES (brainstorm build)
   ============================================================ */

/* 1. Full approval / file-journey workflow */
function renderApprovalWorkflow(){
  const chain = $('awChain');
  if (chain) {
    chain.innerHTML = APPROVAL_FLOW_FULL.map((s, i) =>
      `<div class="step"><div class="num">${i + 1}</div><b style="font-size:12px">${esc(s.step)}</b><div style="color:#64748b;font-size:11px;margin-top:5px">${esc(s.role)} · SLA ${s.slaDays}d</div></div>`
    ).join('');
  }
  const table = $('awTable');
  if (table) {
    const rows = FILE_JOURNEYS.map(j => {
      const p = PROJECTS.find(x => x.id === j.projectId);
      const cur = APPROVAL_FLOW_FULL[j.stepIndex];
      const back = j.stepIndex > 0 ? APPROVAL_FLOW_FULL[j.stepIndex - 1].step : '—';
      const ahead = j.stepIndex < APPROVAL_FLOW_FULL.length - 1 ? APPROVAL_FLOW_FULL[j.stepIndex + 1].step : 'Complete';
      const pos = Math.round(j.stepIndex / (APPROVAL_FLOW_FULL.length - 1) * 100);
      return `<tr onclick="openProject('${j.projectId}')">
        <td><b>${esc(p ? p.name : j.projectId)}</b><br><span style="color:#64748b">${esc(j.projectId)}</span></td>
        <td>${back}</td>
        <td><b>${esc(cur.step)}</b><br><span style="color:#64748b">${esc(cur.role)}</span></td>
        <td>${ahead}</td>
        <td><div class="track" style="min-width:110px"><div class="fill ${cls(p ? p.status : '')}" style="width:${pos}%"></div></div></td>
        <td style="color:#64748b;font-size:12px">${esc(j.note)}</td>
      </tr>`;
    }).join('');
    table.innerHTML = `<table class="file-table"><thead><tr><th>Project</th><th>From</th><th>Current Step</th><th>Next</th><th>Progress</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table>`;
    staggerRows(table);
  }
  const limits = $('awLimits');
  if (limits) {
    const rows = Object.entries(SPEND_LIMITS).map(([role, amt]) =>
      `<tr><td><b>${esc(role)}</b></td><td>${amt === null ? 'Unlimited (MD)' : money(amt)}</td></tr>`).join('');
    limits.innerHTML = `<table class="file-table"><thead><tr><th>Role</th><th>Spend Authority</th></tr></thead><tbody>${rows}</tbody></table>`;
  }
}

/* 3. Bidding pipeline */
function renderBiddingPipeline(){
  const k = $('bidKpis');
  if (k) {
    const total = BIDDING_PIPELINE.reduce((a, b) => a + (b.value || 0), 0);
    const won = BIDDING_PIPELINE.filter(b => b.status === 'Won').reduce((a, b) => a + b.value, 0);
    const live = BIDDING_PIPELINE.filter(b => b.status === 'In Bidding').length;
    const pipe = BIDDING_PIPELINE.filter(b => b.status === 'Pipeline').length;
    k.innerHTML = [
      ['Active Bids', BIDDING_PIPELINE.length, 'int'],
      ['Pipeline Value', total, 'money'],
      ['Won Value', won, 'money'],
      ['In Bidding', live, 'int'],
      ['Early Pipeline', pipe, 'int'],
    ].map(([lab, v, kd]) => `<div class="metric-card"><span>${lab}</span><b data-target="${v}" data-kind="${kd}">0</b></div>`).join('');
    k.querySelectorAll('b').forEach(runCounter);
    staggerChildren(k, 60, 7);
  }
  const board = $('bidBoard');
  if (board) {
    board.innerHTML = BID_STAGES.map(st => {
      const items = BIDDING_PIPELINE.filter(b => b.status === st);
      const color = st === 'Won' ? 'green' : st === 'Lost' ? 'red' : st === 'In Bidding' ? 'amber' : 'blue';
      return `<div class="pipeline-col"><div class="pipeline-col-head pill ${color}">${st} (${items.length})</div>` +
        items.map(b => `<div class="pipeline-card" onclick="openBid('${b.id}')" style="cursor:pointer">
          <b>${esc(b.opportunity)}</b>
          <span class="muted">${esc(b.id)} · ${esc(b.ministry)} · ${esc(b.sector)}</span>
          <div class="pipeline-meta"><span>Value: <b>${money(b.value)}</b></span><span>Win: <b>${b.winProb}%</b></span></div>
          <div class="pipeline-meta"><span>${esc(b.procurement)}</span><span>Due: ${esc(b.bidDeadline)}</span></div>
          <div class="pipeline-next">PM: ${esc(b.pm)}<br>${esc(b.note)}</div>
        </div>`).join('') + `</div>`;
    }).join('');
  }
}

/* 4. Inspections */
function renderInspections(){
  const k = $('inspKpis');
  if (k) {
    k.innerHTML = [
      ['Total Requests', INSPECTIONS.length, 'int'],
      ['Awaiting', INSPECTIONS.filter(i => i.status === 'Awaiting').length, 'int'],
      ['Scheduled', INSPECTIONS.filter(i => i.status === 'Scheduled').length, 'int'],
      ['Completed', INSPECTIONS.filter(i => i.status === 'Completed').length, 'int'],
    ].map(([lab, v, kd]) => `<div class="metric-card"><span>${lab}</span><b data-target="${v}" data-kind="${kd}">0</b></div>`).join('');
    k.querySelectorAll('b').forEach(runCounter);
    staggerChildren(k, 60, 6);
  }
  const t = $('inspTable');
  if (t) {
    const rows = INSPECTIONS.slice().sort((a, b) => b.daysWaiting - a.daysWaiting).map(i => {
      const stCls = i.status === 'Completed' ? 'green' : i.status === 'Scheduled' ? 'amber' : 'red';
      const waitCls = i.daysWaiting > 12 ? 'red' : i.daysWaiting > 7 ? 'amber' : 'green';
      return `<tr onclick="openProject('${i.projectId}')">
        <td><b>${esc(i.project)}</b><br><span style="color:#64748b">${esc(i.id)} · ${esc(i.type)}</span></td>
        <td>${esc(i.inspector)}</td>
        <td>${esc(i.requested)}</td>
        <td><span class="pill ${waitCls}">${i.daysWaiting}d waiting</span></td>
        <td><span class="pill ${stCls}">${esc(i.status)}</span></td>
        <td style="color:#64748b;font-size:12px">${esc(i.nextAction)}</td>
      </tr>`;
    }).join('');
    t.innerHTML = `<table class="file-table"><thead><tr><th>Project</th><th>Inspector</th><th>Requested</th><th>Days Waiting</th><th>Status</th><th>Next Action</th></tr></thead><tbody>${rows}</tbody></table>`;
    staggerRows(t);
  }
}

/* 6. Payment requisitions (internal approvals + spend authority) */
function renderRequisitions(){
  const k = $('reqKpis');
  if (k) {
    const pending = REQUISITIONS.filter(r => r.status === 'Pending MD').reduce((a, r) => a + r.amount, 0);
    const total = REQUISITIONS.reduce((a, r) => a + r.amount, 0);
    k.innerHTML = [
      ['Requisitions', REQUISITIONS.length, 'int'],
      ['Total Value', total, 'money'],
      ['Pending MD', pending, 'money'],
      ['Awaiting Decision', REQUISITIONS.filter(r => r.status === 'Pending MD').length, 'int'],
    ].map(([lab, v, kd]) => `<div class="metric-card"><span>${lab}</span><b data-target="${v}" data-kind="${kd}">0</b></div>`).join('');
    k.querySelectorAll('b').forEach(runCounter);
    staggerChildren(k, 60, 6);
  }
  const t = $('reqTable');
  if (t) {
    const me = ZCC.user();
    const rows = REQUISITIONS.slice().sort((a, b) => String(b.date).localeCompare(a.date)).map(r => {
      const stCls = r.status === 'Approved' ? 'green' : r.status === 'Pending MD' ? 'red' : 'amber';
      const limit = SPEND_LIMITS[r.role || 'Project Manager'];
      const overLimit = limit !== null && r.amount > limit;
      let action = '';
      if (r.status === 'Pending MD' && me && me.role === 'MD') {
        action = `<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="upd-btn" onclick="reqApprove('${r.id}')">Approve</button><button class="upd-btn upd-btn-danger" onclick="reqReject('${r.id}')">Reject</button></div>`;
      }
      return `<tr>
        <td><b>${esc(r.item)}</b><br><span style="color:#64748b">${esc(r.id)} · ${esc(r.project)}</span></td>
        <td>${money(r.amount)} ${overLimit ? '<span class="pill red" title="Above requester limit — needs escalation">Escalate</span>' : ''}</td>
        <td>${esc(r.requestedBy)}<br><span style="color:#64748b">${esc(r.date)}</span></td>
        <td style="color:#64748b;font-size:12px">${esc(r.note)}</td>
        <td><span class="pill ${stCls}">${esc(r.status)}</span></td>
        <td>${action || '<span style="color:#64748b;font-size:12px">—</span>'}</td>
      </tr>`;
    }).join('');
    t.innerHTML = `<table class="file-table"><thead><tr><th>Item</th><th>Amount</th><th>Requested By</th><th>Note</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table>`;
    staggerRows(t);
  }
  const lim = $('reqLimits');
  if (lim) {
    const rows = Object.entries(SPEND_LIMITS).map(([role, amt]) =>
      `<tr><td><b>${esc(role)}</b></td><td>${amt === null ? 'Unlimited' : money(amt)}</td><td><span class="pill ${amt === null ? 'red' : amt >= 5000000 ? 'amber' : 'green'}">${amt === null ? 'MD final' : amt >= 10000000 ? 'High' : 'Standard'}</span></td></tr>`).join('');
    lim.innerHTML = `<table class="file-table"><thead><tr><th>Role</th><th>Limit</th><th>Level</th></tr></thead><tbody>${rows}</tbody></table>`;
  }
}
function reqApprove(id){
  const r = REQUISITIONS.find(x => x.id === id); if (!r) return;
  r.status = 'Approved'; r.approvedBy = whoami();
  ZCC.snapshot(); ZCC.logAudit(whoami(), 'REQ_APPROVE', `${r.id} · ${r.item} ${money(r.amount)}`);
  toast('Approved: ' + r.item); renderRequisitions();
}
function reqReject(id){
  const r = REQUISITIONS.find(x => x.id === id); if (!r) return;
  r.status = 'Rejected'; r.approvedBy = whoami();
  ZCC.snapshot(); ZCC.logAudit(whoami(), 'REQ_REJECT', `${r.id} · ${r.item}`);
  toast('Rejected: ' + r.item, 'error'); renderRequisitions();
}

/* 10. Email / WhatsApp integration hooks */
function renderIntegrations(){
  const t = $('intTable');
  if (!t) return;
  const rows = INTEGRATIONS.map(i =>
    `<tr><td><b>${esc(i.from)}</b><br><span style="color:#64748b">${esc(i.project)}</span></td><td>${esc(i.type)}</td><td><span class="pill blue">${esc(i.source)}</span></td><td style="white-space:nowrap">${esc(i.captured)}</td><td><span class="pill green">${esc(i.status)}</span></td></tr>`).join('');
  t.innerHTML = `<table class="file-table"><thead><tr><th>From</th><th>Type</th><th>Channel</th><th>Captured</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
  staggerRows(t);
}

/* 11. Printable project one-pager report */
function renderReport(){
  const id = new URLSearchParams(location.search).get('id');
  const p = PROJECTS.find(x => x.id === id);
  const title = $('rpTitle'); if (title) title.textContent = p ? p.name : 'Project Report';
  const meta = $('rpMeta'); if (meta) meta.textContent = p ? `${p.id} · ${p.client} · ${p.location} · Generated ${stamp24()}` : '';
  document.body.classList.add('report-mode');
  if (!p) { const c = $('rpContent'); if (c) c.innerHTML = '<div class="empty">No project selected.</div>'; return; }
  const c = costInfo(p);
  const j = FILE_JOURNEYS.find(x => x.projectId === p.id);
  const curStep = j ? APPROVAL_FLOW_FULL[j.stepIndex].step : p.stage;
  const rpContent = $('rpContent');
  if (rpContent) {
    rpContent.innerHTML = `
      <div class="metric-row">
        <div class="metric-card"><span>Status</span><b style="color:${p.status==='Red'?'#dc2626':p.status==='Amber'?'#f59e0b':'#16a34a'}">${p.status}</b></div>
        <div class="metric-card"><span>Progress</span><b>${pct(p.actual)} <small>vs ${pct(p.planned)} planned</small></b></div>
        <div class="metric-card"><span>Delay</span><b>${p.delayDays} days</b></div>
        <div class="metric-card"><span>Contract Value</span><b>${money(p.contractValue)}</b></div>
      </div>
      <div class="info-grid" style="margin-top:14px">
        <div class="info"><b>Client</b>${esc(p.client)}<br><span style="color:#64748b">${esc(p.userDept)}</span></div>
        <div class="info"><b>PM / Supervisor</b>${esc(p.pm)}<br><span style="color:#64748b">${esc(p.supervisor)}</span></div>
        <div class="info"><b>File Location</b>${esc(curStep)}</div>
        <div class="info"><b>Forecast End</b>${esc(p.forecast)} <span style="color:#64748b">(planned ${esc(p.plannedEnd)})</span></div>
      </div>
      <div class="callout" style="margin-top:14px"><b>Cost position:</b> Certified ${money(c.certified)} · Paid ${money(c.paid)} · Outstanding ${money(c.outstanding)} · Retention ${money(c.retention)}</div>
      <div class="callout" style="margin-top:10px"><b>Key issue:</b> ${esc(p.issue)}<br><b>Required action:</b> ${esc(p.action)} (${esc(p.owner)}, due ${esc(p.due)})</div>
    `;
  }
}

/* 12. Executive summary (one-touch view) on the Command Center dashboard */
function renderExecutiveSummary(){
  const st = $('execStatus');
  if (st) {
    const count = s => PROJECTS.filter(p => p.status === s).length;
    const bar = (label, n, color) => `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px"><b>${label}</b><span style="color:#64748b">${n} of ${PROJECTS.length}</span></div><div style="height:10px;border-radius:99px;background:#eef2f7;overflow:hidden"><div class="an-fill" style="height:10px;width:${PROJECTS.length ? (n / PROJECTS.length * 100) : 0}%;background:${color};border-radius:99px"></div></div></div>`;
    st.innerHTML = bar('Green', count('Green'), '#16a34a') + bar('Amber', count('Amber'), '#f59e0b') + bar('Red', count('Red'), '#dc2626');
    animateBars(st);
  }
  const fp = $('execFiles');
  if (fp) {
    const rows = FILE_TRACKING.filter(t => t.status !== 'Green').slice(0, 5).map(t =>
      `<div class="att-item" onclick="openProject('${t.projectId}')"><span class="dot ${cls(t.status)}"></span><div><h4 style="font-size:13px">${esc(t.project)}</h4><p>File at ${esc(t.office)} · ${t.daysInStage}d (SLA ${t.expectedDays}d)</p></div><span class="pill ${cls(t.status)}">${t.status}</span></div>`).join('');
    fp.innerHTML = rows || '<div class="empty">No file bottlenecks. ✅</div>';
  }
  const sa = $('execLimits');
  if (sa) {
    sa.innerHTML = Object.entries(SPEND_LIMITS).map(([role, amt]) =>
      `<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px dashed var(--line)"><span style="font-size:13px"><b>${esc(role)}</b></span><span style="font-size:13px;color:#475569">${amt === null ? 'Unlimited' : money(amt)}</span></div>`).join('');
  }
  const cd = $('execCompliance');
  if (cd) {
    cd.innerHTML = COMPLIANCE.slice().sort((a, b) => a.expInDays - b.expInDays).slice(0, 5).map(c => {
      const b = expiryBand(c.expInDays);
      return `<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px dashed var(--line)"><span style="font-size:13px">${esc(c.item)}</span><span class="pill ${b.cls}">${c.expInDays < 0 ? 'Expired' : c.expInDays + 'd'}</span></div>`;
    }).join('');
  }
}

/* ============================================================
   VENDOR REGISTER (27)
   ============================================================ */
function renderVendors(){
  const k = $('vndKpis');
  if (k) {
    const trusted = VENDORS.filter(v => v.trusted).length;
    const total = VENDORS.length;
    k.innerHTML = [
      ['Vendors', total, 'int'],
      ['Trusted', trusted, 'int'],
      ['Avg Rating', (VENDORS.reduce((a, v) => a + v.rating, 0) / total).toFixed(1), 'float2'],
    ].map(([lab, v, kd]) => `<div class="metric-card"><span>${lab}</span><b data-target="${v}" data-kind="${kd}">0</b></div>`).join('');
    k.querySelectorAll('b').forEach(runCounter);
    staggerChildren(k, 60, 6);
  }
  const t = $('vndTable');
  if (t) {
    const rows = VENDORS.map(v => {
      const projNames = (v.projects || []).map(id => PROJECTS.find(p => p.id === id)?.name || id).join(', ');
      return `<tr><td><b>${esc(v.name)}</b><br><span style="color:#64748b">${esc(v.id)}</span></td><td>${esc(v.category)}</td><td>${esc(v.phone)}</td><td>${v.trusted ? '<span class="pill green">Trusted</span>' : '<span class="pill amber">Approved</span>'}</td><td><span class="pill ${v.rating >= 4 ? 'green' : 'amber'}">${v.rating}/5</span></td><td style="color:#64748b;font-size:12px">${esc(projNames)}</td><td style="color:#64748b;font-size:12px">${esc(v.note)}</td></tr>`;
    }).join('');
    t.innerHTML = `<table class="file-table"><thead><tr><th>Vendor</th><th>Category</th><th>Contact</th><th>Status</th><th>Rating</th><th>Current Projects</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table>`;
    staggerRows(t);
  }
}

/* ============================================================
   STAFF (PM) — MY INSPECTIONS & MY REQUISITIONS
   Role-scoped views surfaced in the Staff Workspace so each PM
   sees only their own projects' data.
   ============================================================ */
function myProjectIds(){
  const projs = PROJECTS.filter(p => p.pm === currentUser).map(p => p.id);
  return projs.length ? projs : PROJECTS.map(p => p.id);
}
function renderMyInspections(){
  const el = $('myInspections'); if (!el) return;
  const ids = myProjectIds();
  const mine = INSPECTIONS.filter(i => ids.includes(i.projectId)).sort((a, b) => b.daysWaiting - a.daysWaiting);
  if (!mine.length) { el.innerHTML = '<div class="empty">No inspections for your projects.</div>'; return; }
  el.innerHTML = `<table class="table"><thead><tr><th>Project</th><th>Type</th><th>Waiting</th><th>Status</th></tr></thead><tbody>` +
    mine.map(i => `<tr><td><div class="project-title">${esc(i.project)}</div></td><td>${esc(i.type)}</td><td><span class="pill ${i.daysWaiting > 12 ? 'pending' : i.daysWaiting > 7 ? 'review' : 'signed'}">${i.daysWaiting}d</span></td><td><span class="pill ${i.status === 'Completed' ? 'signed' : i.status === 'Scheduled' ? 'review' : 'pending'}">${esc(i.status)}</span></td></tr>`).join('') +
    `</tbody></table>`;
}
function renderMyRequisitions(){
  const el = $('myRequisitions'); if (!el) return;
  const mine = REQUISITIONS.filter(r => r.requestedBy === currentUser);
  if (!mine.length) { el.innerHTML = '<div class="empty">No requisitions you have raised.</div>'; return; }
  el.innerHTML = `<table class="table"><thead><tr><th>Item</th><th>Amount</th><th>Status</th></tr></thead><tbody>` +
    mine.map(r => `<tr><td><div class="project-title">${esc(r.item)}</div><div class="muted">${esc(r.project)}</div></td><td>${money(r.amount)}</td><td><span class="pill ${r.status === 'Approved' ? 'signed' : r.status === 'Pending MD' ? 'pending' : 'review'}">${esc(r.status)}</span></td></tr>`).join('') +
    `</tbody></table>`;
}

/* ============================================================
   PROJECT ARCHIVE / CLOSE-OUT (28)
   ============================================================ */
function renderArchive(){
  const k = $('archKpis');
  const items = ARCHIVE.concat(ZCC.archive());
  if (k) {
    const total = items.length;
    const released = items.filter(x => x.retentionReleased === 'Yes').length;
    k.innerHTML = [
      ['Archived Projects', total, 'int'],
      ['Retention Released', released, 'int'],
      ['Total Archived Value', items.reduce((a, x) => a + (x.contractValue||0), 0), 'money'],
    ].map(([lab, v, kd]) => `<div class="metric-card"><span>${lab}</span><b data-target="${v}" data-kind="${kd}">0</b></div>`).join('');
    k.querySelectorAll('b').forEach(runCounter);
    staggerChildren(k, 60, 6);
  }
  const t = $('archTable');
  if (t) {
    if (!items.length) { t.innerHTML = '<div class="empty">No archived projects yet. Archive a completed project to move it here.</div>'; return; }
    const rows = items.map(x => {
      const docLinks = (x.docs || []).map(f => `<a class="download-btn" href="${esc(f)}" target="_blank">Doc</a>`).join(' ');
      return `<tr>
        <td><b>${esc(x.name)}</b><br><span style="color:#64748b">${esc(x.id)} · ${esc(x.sector)}</span></td>
        <td>${esc(x.client)}</td>
        <td>${money(x.contractValue)}</td>
        <td>${esc(x.completed)}</td>
        <td><span class="pill green">${esc(x.retentionReleased)}</span></td>
        <td style="color:#64748b;font-size:12px">${esc(x.summary)}</td>
        <td><div style="display:flex;gap:6px;flex-wrap:wrap">${docLinks}</div></td>
      </tr>`;
    }).join('');
    t.innerHTML = `<table class="file-table"><thead><tr><th>Project</th><th>Client</th><th>Value</th><th>Completed</th><th>Retention</th><th>Summary</th><th>Documents</th></tr></thead><tbody>${rows}</tbody></table>`;
    staggerRows(t);
  }
}

/* Close & Archive control (shown on Command Center + Contract portals).
   Lets MD/Contract Lead close a completed project and move it to the
   archive directly from the portal. */
function renderCloseArchive(){
  const wrap = $('closeArchivePanel'); if (!wrap) return;
  const u = ZCC.user();
  if (!u || !['MD','Contract Lead','Accounts','Super Admin'].includes(u.role)) { wrap.style.display='none'; return; }
  wrap.style.display='block';
  const sel = $('archiveProjectSelect');
  if (sel) {
    sel.innerHTML = '<option value="">Select a completed project…</option>' +
      PROJECTS.map(p => `<option value="${esc(p.id)}">${esc(p.id)} · ${esc(p.name)}</option>`).join('');
  }
}
function archiveFromPortal(){
  const id = $('archiveProjectSelect')?.value;
  if (!id) { toast('Select a project to close and archive.', 'error'); return; }
  archiveProject(id);
  // refresh the selector + re-render
  renderCloseArchive();
  renderProjects && renderProjects();
}

/* Move a completed project (and its documents) into the archive */
function archiveProject(id){
  const p = PROJECTS.find(x => x.id === id); if (!p) return;
  if (!confirm(`Archive "${p.name}"?\n\nThis moves the completed project out of the active portfolio into the Archive, where its documents remain retrievable.`)) return;
  const rec = {
    id: p.id, name: p.name, client: p.client, sector: p.sector, location: p.location,
    pm: p.pm, contractValue: p.contractValue, completed: p.plannedEnd || p.forecast || todayStr(),
    closed: todayStr(), retentionReleased:'Yes',
    summary:'Archived from active portfolio at close-out.',
    docs: DOCUMENTS.filter(d => d.projectId === p.id).map(d => d.file).filter(Boolean)
  };
  const a = ZCC.archive(); a.push(rec); ZCC.saveArchive(a);
  // remove from active projects
  const i = PROJECTS.findIndex(x => x.id === id); if (i > -1) PROJECTS.splice(i, 1);
  ZCC.snapshot(); ZCC.logAudit(whoami(), 'ARCHIVE_PROJECT', id + ' · ' + p.name);
  closeDrawer();
  toast('Archived: ' + p.name);
  renderArchive();
}

/* ============================================================
   LOGIN (00_Login.html)
   ============================================================ */
function attemptLogin() {
  const code = ($('accessCode').value || '').trim().toUpperCase();
  const errEl = $('loginError');
  if (!code) { errEl.textContent = 'Enter your access code.'; return; }
  for (const [email, info] of Object.entries(ACCESS_CODES)) {
    if (info.code === code) {
      if (ZCC.isUsable(code) === false) {
        errEl.textContent = 'Access revoked. Contact your Contract Lead or IT administrator.';
        const card = document.querySelector('.login-card');
        if (card) { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
        ZCC.logAudit('Unknown', 'FAILED_LOGIN', code + ' (revoked)');
        return;
      }
      const user = Object.assign({ email }, info);
      ZCC.signIn(email);
      location.href = ZCC.homeFor(user);
      return;
    }
  }
  errEl.textContent = 'Invalid access code. Contact your supervisor if you need access.';
  ZCC.logAudit('Unknown', 'FAILED_LOGIN', code);
  const card = document.querySelector('.login-card');
  if (card) { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
}

function initLogin() {
  const u = ZCC.user();
  if (u) {
    const box = $('alreadySigned');
    if (box) {
      box.style.display = 'block';
      $('signedAs').textContent = u.name + ' (' + u.role + ')';
      $('continueBtn').onclick = () => { location.href = ZCC.homeFor(u); };
    }
    $('loginForm').style.display = 'none';
  }
  const input = $('accessCode');
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') attemptLogin(); });
}

/* ============================================================
   BOOT
   ============================================================ */
function boot() {
  const body = document.body;
  const page = body.dataset.page || '';
  const app = body.dataset.app || 'cc';

  if (page === 'login') { initLogin(); return; }

  const user = ZCC.requireAuth();
  if (!user) return; /* redirecting to login */

  TASKS = ZCC.tasks();
  currentUser = user.name;

  buildShell(user, app, page);

  const mainEl = document.querySelector('main.main');
  staggerChildren(mainEl, 70, 5);
  /* mark page sections for scroll-reveal (except the very first) */
  if (mainEl && !RM) {
    const secs = mainEl.querySelectorAll('section, .metric-row, .stat-grid, .card.page-block');
    secs.forEach((s2, i) => { if (i > 0) { s2.classList.add('zx-reveal'); } });
  }

  switch (page) {
    /* ---- Command Center ---- */
    case 'dashboard':
      renderKpis(); populate(); renderProjects(); renderAttention(); bindCC();
      renderDocUploads();
      renderCloseArchive();
      renderExecutiveSummary();
      if (user.role === 'MD') { const a = $('approvals'); if (a) a.style.display = 'block'; renderApprovalsInbox(); }
      break;
    case 'projects':
      populate(); renderProjects(); bindCC(); break;
    case 'documents':
      renderFileTable(); renderDocRegister(); bindCC(); break;
    case 'progress':
      renderScheduleTable(); bindCC(); break;
    case 'risks':
      renderRiskTable(); bindCC(); break;
    case 'payments':
      renderCostMetrics(); renderCostTable(); bindCC(); break;
    case 'sitephotos':
      renderSitePhotosTable(); bindCC(); break;
    case 'analytics':
      renderAnalytics(); bindCC(); break;
    case 'admin':
      renderAdmin(); break;
    case 'sop':
      renderSOPCompliance(); break;
    case 'approval-workflow':
      renderApprovalWorkflow(); bindCC(); break;
    case 'bidding':
      buildBidDrawer();
      renderBiddingPipeline(); renderBidTable(); bindCC(); break;
    case 'inspections':
      renderInspections(); bindCC(); break;
    case 'requisitions':
      renderRequisitions(); bindCC(); break;
    case 'integrations':
      renderIntegrations(); bindCC(); break;
    case 'vendors':
      renderVendors(); bindCC(); break;
    case 'report':
      renderReport(); break;
    case 'archive':
      renderArchive(); bindCC(); break;
    /* ---- Staff Workspace ---- */
    case 'staff-dash':
      renderStaffHero(user); renderStaffKpis(); renderPriorityTasks(); renderTaskOptions();
      if (user.role === 'Project Manager') {
        fillProjectOptions('projProject'); const w = $('pmProgressWrap'); if (w) w.style.display = 'block';
        const mi = $('pmMySections'); if (mi) mi.style.display = 'block';
        renderMyInspections(); renderMyRequisitions();
      }
      break;
    case 'staff-tasks':
      fillFilters(); renderTaskOptions(); renderTaskTable(); renderStaffKpis(); bindStaffTasks(); break;
    case 'staff-photos':
      populatePhotoProject(); renderPhotos(); break;
    case 'staff-profile':
      renderProfile(user); break;
    /* ---- Contract Portal ---- */
    case 'contract-dash':
      fillProjectOptions('docProject'); renderContractDash(); renderCloseArchive(); bindCC(); break;
    case 'contract-files':
      fillProjectOptions('mvProject'); renderFileTracking(); bindCC(); break;
    /* ---- Accounts Portal ---- */
    case 'accounts-dash':
      fillProjectOptions('payProject'); renderAccountsDash(); bindCC(); break;
    case 'accounts-ret':
      renderRetentionRegister(); bindCC(); break;
    /* ---- Admin Console ---- */
    case 'admin-console':
      renderAdminConsole(); break;
  }

  /* entrances play only during the initial render window */
  setTimeout(() => { ANIMATE_INIT = false; }, 1600);
  setTimeout(initScrollReveal, 200);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
