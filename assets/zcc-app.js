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
      ['doc-manage', 'Document Mgmt', '32_Documents_Manage.html', 'file'],
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
      ['constr-analytics', 'Construction Analytics', '29_Construction_Analytics.html', 'chart'],
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

/* ---------- role-restricted pages ----------
   Pages that only the listed roles may open (or even see in the
   sidebar). buildShell hides the nav link and boot blocks direct
   navigation for everyone else. */
const PAGE_ACCESS = {
  archive: ['MD', 'Contract Lead']   /* archive viewable by MD + Contract Lead */
};

/* Is the signed-in user the Managing Director? MD-only capabilities
   (archive, controlled-document edit/delete) are gated on this. */
function isMD(){ const u = ZCC.user(); return !!(u && u.role === 'MD'); }

/* Live document-register search term (03_Documents) */
let docSearch = '';

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
  /* drop role-restricted links (e.g. the MD-only archive) for anyone
     without the required role */
  const links = nav.links.filter(([key]) => !PAGE_ACCESS[key] || (user && PAGE_ACCESS[key].includes(user.role)));

  const aside = document.createElement('aside');
  aside.className = 'sidebar';
  aside.id = 'sidebar';
  aside.innerHTML =
    `<div class="sidebar-brand"><img class="sidebar-logo" src="${LOGO}" alt="Zoneware"></div>` +
    `<nav class="sidebar-nav"><span class="sidebar-glider" id="sbGlider"></span>` +
      links.map(([key, label, href, ic]) =>
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
    `<div class="topbar-search">
       <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
       <input id="globalSearch" type="text" placeholder="Search projects, documents, companies…" autocomplete="off">
       <div class="gsearch-results" id="gsearchResults"></div>
     </div>` +
    `<span class="topbar-spacer"></span>` +
    `<div class="notif-wrap" id="notifWrap">
       <button class="notif-bell" onclick="toggleNotifications(event)" aria-label="Notifications">
         <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
         <span class="notif-badge" id="notifBadge" style="display:none">0</span>
       </button>
       <div class="notif-menu" id="notifMenu"></div>
     </div>` +
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

  /* Company folder strip — injected on every operational page that does NOT
     already have its own company section (login/report skipped). Gives
     folder-first navigation no matter which portal/page you're on. */
  const skipPages = ['login', 'report', 'company'];
  if (!skipPages.includes(page) && !document.body.dataset.public && !document.getElementById('companyGrid')) {
    const main = document.querySelector('main.main');
    if (main) {
      const cs = document.createElement('section');
      cs.className = 'section company-strip';
      cs.id = 'companyStrip';
      cs.innerHTML = `<div class="section-head" style="margin-bottom:10px"><div><h2 style="font-size:20px">Companies</h2><p>Select a company folder to open its projects.</p></div></div><div class="company-grid" id="companyGrid"></div>`;
      main.prepend(cs);
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
let state = { search: '', sector: '', client: '', pm: '', company: '', status: '', fresh: '', sort: 'priority' };

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
  [['sector', uniq(PROJECTS.map(p => p.sector))], ['client', uniq(PROJECTS.map(p => p.client))], ['pm', uniq(PROJECTS.map(p => p.pm))], ['company', uniq(PROJECTS.map(p => p.company).filter(Boolean))]]
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
  if (state.company) arr = arr.filter(p => p.company === state.company);
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
  return `<article class="project-card" onclick="openProject('${p.id}')"><div class="card-top"><span class="sector">${esc(p.sector)}</span><span class="pill status-pill ${cls(p.status)}">${p.status}</span></div><div class="card-body"><div class="title">${esc(p.name)}</div><div class="meta">${esc(p.id)} · ${esc(p.client)}<br>${esc(p.location)} · PM: ${esc(p.pm)}</div>${p.company?`<div style="font-size:11px;color:#555;margin-top:4px">🏢 <b>${esc(p.company)}</b></div>`:''}<div class="mini-stats"><div class="stat"><span>Value</span><b>${money(p.contractValue)}</b></div><div class="stat"><span>Delay</span><b>${p.delayDays}d</b></div><div class="stat"><span>File Stage</span><b>${p.daysInStage}d</b></div></div><div class="progress-meta"><span>Actual ${pct(p.actual)}</span><span>Plan ${pct(p.planned)}</span></div><div class="track"><div class="fill ${cls(p.status)}" style="width:${Math.min(100, p.actual)}%"></div><span class="mark" style="left:${Math.min(100, p.planned)}%"></span></div><div class="card-foot"><span class="pill ${cls(p.freshness)}">${p.freshness}</span><span class="open-link">Open details →</span></div></div></article>`;
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
    sum.innerHTML = state.company
      ? `Showing <b>${arr.length}</b> project${arr.length===1?'':'s'} for <b>${esc(state.company)}</b> &nbsp;·&nbsp; <span class="pill green">${g} Green</span> <span class="pill amber">${a} Amber</span> <span class="pill red">${r} Red</span>`
      : `Showing <b>${arr.length}</b> of ${PROJECTS.length} projects &nbsp;·&nbsp; <span class="pill green">${g} Green</span> <span class="pill amber">${a} Amber</span> <span class="pill red">${r} Red</span>`;
  }
  /* Company with no active jobs → show its completed work from the archive
     (year-grouped) instead of a bare empty grid. */
  if (state.company) {
    const archived = ARCHIVE.concat(ZCC.archive()).filter(x => (x.company || '') === state.company);
    if (!arr.length && archived.length && grid) {
      const docLinks = x => (x.docs || []).map(f => `<a class="download-btn" href="${esc(f)}" target="_blank">Doc</a>`).join(' ');
      const rows = archived.map(x => `<tr>
        <td><b>${esc(x.name)}</b><br><span style="color:#64748b">${esc(x.id)} · ${esc(x.sector)}</span></td>
        <td>${esc(x.client)}</td>
        <td>${money(x.contractValue)}</td>
        <td>${esc(x.year || '—')}</td>
        <td>${esc(x.completed)}</td>
        <td><span class="pill green">${esc(x.retentionReleased)}</span></td>
        <td style="color:#64748b;font-size:12px">${esc(x.summary)}</td>
        <td><div style="display:flex;gap:6px;flex-wrap:wrap">${docLinks(x)}</div></td>
      </tr>`).join('');
      grid.innerHTML = `<div class="empty" style="margin-bottom:14px;text-align:left"><b style="font-size:15px">${esc(state.company)} has no active projects.</b><br>All its jobs are completed and held in the archive below.</div>
        <table class="file-table"><thead><tr><th>Project</th><th>Client</th><th>Value</th><th>Year</th><th>Completed</th><th>Retention</th><th>Summary</th><th>Documents</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  }
  /* keep the company folder nav in sync with the active filter */
  syncCompanyFolders();
}

/* Company folder navigation — folder-first landing.
   Renders one folder per company (with project count, portfolio value
   and status mix). Clicking a folder narrows the project grid to that
   company; the folder highlights as active. */
function renderCompanyFolders() {
  const grid = $('companyGrid'); if (!grid) return;
  /* Group ACTIVE projects by company; completed jobs live in the archive
     (year-grouped). A company still appears if it has ANY active OR completed
     work — so a company with only completed jobs is shown
     with 0 active and its completed count. */
  const archived = ARCHIVE.concat(ZCC.archive());
  const activeByCompany = {};
  PROJECTS.forEach(p => { const c = p.company || 'Unassigned'; (activeByCompany[c] = activeByCompany[c] || []).push(p); });
  const archivedCompanies = new Set(archived.map(x => x.company || '').filter(Boolean));
  const all = new Set([...Object.keys(activeByCompany), ...archivedCompanies]);
  const sorted = [...all].sort();
  if (!sorted.length) { grid.innerHTML = '<div class="empty">No companies with projects yet.</div>'; return; }
  grid.innerHTML = sorted.map(c => {
    const projs = activeByCompany[c] || [];
    const g = projs.filter(p => p.status === 'Green').length,
      a = projs.filter(p => p.status === 'Amber').length,
      r = projs.filter(p => p.status === 'Red').length;
    const done = archived.filter(x => (x.company || '') === c).length;
    const activeCount = projs.length ? `<span>${projs.length} <b>active</b></span>` : '';
    const doneCount = done ? `<span class="done">${done} <b>completed</b></span>` : '';
    return `<div class="company-folder${state.company === c ? ' active' : ''}" onclick="selectCompany('${esc(c)}')" data-company="${esc(c)}">
      <div class="company-folder-icon">📁</div>
      <div class="company-folder-body">
        <div class="company-folder-name">${esc(c)}</div>
        <div class="company-folder-counts">${activeCount || '<span>No active</span>'}${doneCount}</div>
      </div>
    </div>`;
  }).join('');
}

function selectCompany(name) {
  state.company = name;
  /* navigate to the dedicated company page (not a scroll) */
  location.href = '31_Company.html?company=' + encodeURIComponent(name);
}

function clearCompany() {
  state.company = '';
  const sel = $('company'); if (sel) sel.value = '';
  renderProjects();
  const back = $('allCompaniesBtn'); if (back) back.style.display = 'none';
  const com = $('companies'); if (com) com.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* sync the active company folder highlight + back button with current state */
function syncCompanyFolders() {
  const folders = document.querySelectorAll('.company-folder');
  folders.forEach(f => f.classList.toggle('active', f.dataset.company === state.company));
  const back = $('allCompaniesBtn'); if (back) back.style.display = state.company ? 'inline-flex' : 'none';
}

function renderAttention() {
  const el = $('attentionList'); if (!el) return;
  const arr = PROJECTS.filter(p => p.status !== 'Green' || p.escalate === 'Yes' || p.freshness === 'Stale' || p.daysInStage > 14)
    .sort((a, b) => orderStatus(b.status) - orderStatus(a.status) || b.delayDays - a.delayDays);
  el.innerHTML = arr.length ? arr.map(p => `<div class="att-item" onclick="openProject('${p.id}')"><span class="dot ${cls(p.status)}"></span><div><h4>${esc(p.name)}</h4><p>${esc(p.issue)}<br><b>Action:</b> ${esc(p.action)}</p></div><div style="text-align:right"><span class="pill ${cls(p.status)}">${p.status}</span><br><span style="color:#64748b;font-size:12px">${p.delayDays} days</span></div></div>`).join('') : '<div class="empty">No projects need attention right now. ✅</div>';
  const cnt = $('escalationCount');
  if (cnt) cnt.textContent = arr.length ? arr.length + ' to review' : 'All clear';
  staggerChildren(el, 60, 8);
}

/* MD escalation counter — how many projects need review. */
function renderEscalationCount() {
  const cnt = $('escalationCount');
  if (!cnt) return;
  const n = PROJECTS.filter(p => p.status !== 'Green' || p.escalate === 'Yes' || p.freshness === 'Stale' || p.daysInStage > 14).length;
  cnt.textContent = n ? n + ' to review' : 'All clear';
}

/* -------- Notification bell (top bar) --------
   Surfaces everything that needs the MD's attention in one icon:
   escalations, overdue files, pending approvals, expired compliance,
   and stale updates. Badge shows the total; the dropdown lists them. */
function notificationItems() {
  const items = [];
  PROJECTS.filter(p => p.escalate === 'Yes' || p.status === 'Red' || p.freshness === 'Stale' || p.daysInStage > 14)
    .forEach(p => items.push({ sev: p.status === 'Red' ? 'red' : p.escalate === 'Yes' ? 'red' : 'amber', msg: `${p.name} — ${p.issue}`, act: () => openProject(p.id) }));
  FILE_TRACKING.filter(t => t.status === 'Red').forEach(t => items.push({ sev: 'red', msg: `File overdue: ${t.project} (${t.daysInStage}d > SLA ${t.expectedDays}d)`, act: () => openProject(t.projectId) }));
  COMPLIANCE.filter(c => c.expInDays < 0).forEach(c => items.push({ sev: 'red', msg: `Compliance expired: ${c.item}`, act: () => location.href = '16_SOP_Compliance.html' }));
  pendingReviews().forEach(t => items.push({ sev: 'amber', msg: `Awaiting your approval: ${t.required} (${t.project})`, act: () => { const a = $('approvals'); if (a) a.scrollIntoView({ behavior: 'smooth' }); } }));
  return items;
}

function renderNotificationBell() {
  const badge = $('notifBadge'); if (!badge) return;
  const items = notificationItems();
  badge.textContent = items.length;
  badge.style.display = items.length ? 'inline-flex' : 'none';
  const menu = $('notifMenu'); if (!menu) return;
  menu.innerHTML = items.length
    ? items.slice(0, 12).map(it =>
        `<div class="notif-item" onclick="it=${-1}; this.closest('#notifWrap').querySelector('#notifMenu').classList.remove('open'); (${it.act})">` +
        `<span class="dot ${it.sev}"></span><span>${esc(it.msg)}</span></div>`).join('')
    : '<div class="notif-item" style="cursor:default"><span style="color:#64748b">No pending notifications. ✅</span></div>';
}

function toggleNotifications(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const menu = $('notifMenu');
  if (menu) {
    menu.classList.toggle('open');
    // re-render so item actions are fresh
    const badge = $('notifBadge');
    const items = notificationItems();
    if (badge) { badge.textContent = items.length; badge.style.display = items.length ? 'inline-flex' : 'none'; }
    menu.innerHTML = items.length
      ? items.slice(0, 12).map((it, i) => `<div class="notif-item" data-i="${i}" onclick="event.stopPropagation();handleNotif(${i})"><span class="dot ${it.sev}"></span><span>${esc(it.msg)}</span></div>`).join('')
      : '<div class="notif-item" style="cursor:default"><span style="color:#64748b">No pending notifications. ✅</span></div>';
  }
}
function handleNotif(i) {
  const items = notificationItems();
  const it = items[i]; if (!it) return;
  const menu = $('notifMenu'); if (menu) menu.classList.remove('open');
  if (it.act) it.act();
}
document.addEventListener('click', (e) => {
  const menu = $('notifMenu'); if (menu) menu.classList.remove('open');
  const res = $('gsearchResults'); if (res) res.classList.remove('open');
});

/* -------- Global search (top bar) --------
   Finds any company, active/completed project, or document by keyword,
   so the user can locate something even if they forget which company
   handled it. Clicking a result opens the right place. */
function globalSearchResults(q) {
  q = (q || '').toLowerCase().trim();
  if (!q) return [];
  const out = [];
  // pages / sections — surface page titles, eyebrows, and key headings so
  // searching e.g. "Command Center" or "Live Operations View" finds the page
  const pageCatalog = [
    { title: 'Command Center', kw: 'Command Center Live Operations View Dashboard portfolio', href: '01_Dashboard.html', desc: 'Command Center — live operations view of the whole portfolio.' },
    { title: 'Project Portfolio', kw: 'Projects project portfolio active projects companies', href: '02_Projects.html', desc: 'All active projects across every company.' },
    { title: 'Document Control', kw: 'Documents document register file movement controlled', href: '03_Documents.html', desc: 'Document register and file movement.' },
    { title: 'Progress', kw: 'progress schedule planned actual variance', href: '04_Progress.html', desc: 'Project progress and schedule variance.' },
    { title: 'Risks', kw: 'risks risk register', href: '05_Risks.html', desc: 'Risk register and mitigations.' },
    { title: 'Payments', kw: 'payments certified paid outstanding retention', href: '06_Payments.html', desc: 'Cost and payment position.' },
    { title: 'Site Photos', kw: 'site photos evidence', href: '07_Site_Photos.html', desc: 'Site photo evidence.' },
    { title: 'Analytics', kw: 'analytics charts spi status freshness', href: '08_Analytics.html', desc: 'Portfolio analytics.' },
    { title: 'System Admin', kw: 'admin users stages documents types', href: '09_Admin.html', desc: 'Users, stages and document types.' },
    { title: 'SOP & Compliance', kw: 'SOP compliance BPP expiry renewal', href: '16_SOP_Compliance.html', desc: 'SOP library and compliance register.' },
    { title: 'File & Approvals', kw: 'approval workflow file journey tracker', href: '21_Approval_Workflow.html', desc: 'Approval workflow and file tracking.' },
    { title: 'Bidding Pipeline', kw: 'bidding pipeline bids tender opportunities', href: '22_Bidding_Pipeline.html', desc: 'Bidding opportunities and status.' },
    { title: 'Inspections', kw: 'inspections inspector request', href: '23_Inspections.html', desc: 'Inspection requests.' },
    { title: 'Integrations', kw: 'integrations email whatsapp captured', href: '25_Integrations.html', desc: 'Email/WhatsApp capture.' },
    { title: 'Vendor Register', kw: 'vendors vendor register supplier', href: '27_Vendor_Register.html', desc: 'Vendor register.' },
    { title: 'Project Archive', kw: 'archive completed close-out retention released', href: '28_Project_Archive.html', desc: 'Completed projects, grouped by company.' },
    { title: 'Construction Analytics', kw: 'construction analytics cost forecast cash flow gantt risk heat', href: '29_Construction_Analytics.html', desc: 'Cost forecast, cash flow, Gantt and risk heat map.' },
    { title: 'Accounts Portal', kw: 'accounts payments collection vendor payments', href: '17_Accounts_Dashboard.html', desc: 'Accounts dashboard and collections.' },
    { title: 'Retention Register', kw: 'retention register retention held', href: '18_Retention_Register.html', desc: 'Retention register.' },
    { title: 'Payment Requisitions', kw: 'requisitions payment request approval spend', href: '24_Payment_Requisitions.html', desc: 'Internal payment requisitions and spend authority.' },
    { title: 'Staff Workspace', kw: 'staff workspace tasks my tasks sign off', href: '10_Staff_Dashboard.html', desc: 'Staff workspace — tasks and sign-offs.' },
    { title: 'Contract Portal', kw: 'contract file tracking office stage', href: '14_Contract_Dashboard.html', desc: 'Contract portal and file tracking.' },
  ];
  pageCatalog.forEach(pg => {
    if ((pg.title + ' ' + pg.kw).toLowerCase().includes(q)) out.push({ kind: 'page', label: pg.title, desc: pg.desc, act: () => location.href = pg.href });
  });
  // companies
  const comps = new Set(PROJECTS.map(p => p.company).concat(ARCHIVE.concat(ZCC.archive()).map(x => x.company)).filter(Boolean));
  comps.forEach(c => { if (String(c).toLowerCase().includes(q)) out.push({ kind: 'company', label: c, desc: `${PROJECTS.filter(p=>p.company===c).length} active · ${ARCHIVE.concat(ZCC.archive()).filter(x=>x.company===c).length} completed`, act: () => location.href = '31_Company.html?company=' + encodeURIComponent(c) }); });
  // active projects — show real content (client, value, issue, status)
  PROJECTS.forEach(p => {
    const hay = [p.name, p.id, p.client, p.company, p.sector, p.location, p.pm, p.issue, p.stage, p.priority].join(' ');
    if (hay.toLowerCase().includes(q)) {
      const c = costInfo(p);
      out.push({ kind: 'project', label: p.name, desc: `${p.company} · ${p.client} · ${money(p.contractValue)} · ${pct(p.actual)} done · ${p.status} — ${p.issue}`.slice(0,140), act: () => location.href = `31_Company.html?company=${encodeURIComponent(p.company)}` });
    }
  });
  // completed projects
  ARCHIVE.concat(ZCC.archive()).forEach(x => {
    if ([x.name, x.id, x.client, x.company, x.sector, x.location, x.summary].join(' ').toLowerCase().includes(q))
      out.push({ kind: 'completed', label: `${x.name} (completed)`, desc: `${x.company} · ${x.client} · ${money(x.contractValue)} · ${x.year || ''} — ${(x.summary||'').slice(0,90)}`.slice(0,150), act: () => location.href = `31_Company.html?company=${encodeURIComponent(x.company)}` });
  });
  // documents
  DOCUMENTS.forEach(d => {
    if ([d.title, d.documentId, d.type, d.projectName, d.client, d.stage].join(' ').toLowerCase().includes(q))
      out.push({ kind: 'document', label: `${d.title}`, desc: `${d.projectName} · ${d.type} · ${d.stage}`, act: () => { const pid = d.projectId; const p = PROJECTS.find(x => x.id === pid); if (p) location.href = `31_Company.html?company=${encodeURIComponent(p.company)}`; } });
  });
  return out.slice(0, 12);
}

function bindGlobalSearch() {
  const input = $('globalSearch'); const res = $('gsearchResults');
  if (!input || !res) return;
  const K = { page: 'Page', company: 'Company', project: 'Project', completed: 'Completed', document: 'Document' };
  input.addEventListener('input', () => {
    const items = globalSearchResults(input.value);
    if (!input.value.trim()) { res.classList.remove('open'); return; }
    res.innerHTML = items.length
      ? items.map((it, i) => `<div class="gsearch-item" data-i="${i}" onclick="event.stopPropagation();goGlobalSearch(${i})"><span class="gsearch-kind">${K[it.kind]}</span><div class="gsearch-body"><div class="gsearch-title">${esc(it.label)}</div>${it.desc ? `<div class="gsearch-desc">${esc(it.desc)}</div>` : ''}</div></div>`).join('')
      : '<div class="gsearch-item" style="cursor:default"><span style="color:#64748b">No results</span></div>';
    res.classList.add('open');
    window.__gsearch = items;
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { const items = globalSearchResults(input.value); if (items[0]) items[0].act(); res.classList.remove('open'); input.value=''; }
    if (e.key === 'Escape') { res.classList.remove('open'); }
  });
}
function goGlobalSearch(i) {
  const items = window.__gsearch || [];
  const it = items[i]; if (!it) return;
  const res = $('gsearchResults'); if (res) res.classList.remove('open');
  const input = $('globalSearch'); if (input) input.value = '';
  if (it.act) it.act();
}

/* Document Control — file movement table (03_Documents).
   Also honours the document-register search box so one query
   filters both the file-movement table and the register. */
function renderFileTable() {
  const el = $('fileTable'); if (!el) return;
  const q = (docSearch || '').toLowerCase();
  const projs = q
    ? PROJECTS.filter(p => [p.name, p.id, p.client, p.fileStage, p.currentOffice, p.fileOwner, p.nextAction]
        .join(' ').toLowerCase().includes(q))
    : [...PROJECTS];
  const rows = projs.sort((a, b) => b.daysInStage - a.daysInStage).map(p =>
    `<tr onclick="openProject('${p.id}')"><td><b>${esc(p.name)}</b><br><span style="color:#64748b">${esc(p.client)}</span></td><td>${esc(p.fileStage)}</td><td>${esc(p.currentOffice)}</td><td>${p.daysInStage}</td><td>${esc(p.fileOwner)}</td><td>${esc(p.nextAction)}</td><td><span class="pill ${p.daysInStage > 14 ? 'red' : p.daysInStage > 7 ? 'amber' : 'green'}">${p.daysInStage > 14 ? 'Escalate' : p.daysInStage > 7 ? 'Monitor' : 'OK'}</span></td></tr>`).join('');
  el.innerHTML = `<thead><tr><th>Project</th><th>Current Stage</th><th>Current Office</th><th>Days</th><th>Owner</th><th>Next Action</th><th>Status</th></tr></thead><tbody>${rows}</tbody>`;
  staggerRows(el);
}

/* Document Control — document register table (03_Documents).
   Immutability: controlled documents are read-only for everyone
   except the MD, who gets inline Edit / Delete actions. A live
   search box (docSearch) filters every field. */
/* Return the real Drive file link for a document when available,
   otherwise the bundled sample file. Real links are used where we have
   them (award letters, BOQs, completion certs, expense sheets); the
   bundled sample PDF is the offline fallback. */
function docLink(d){
  const ov = (typeof docOverrides === 'function') ? docOverrides() : {};
  const c = ov && ov[d && d.documentId];
  if (c && c.hidden) return '#';
  if (c && c.driveFile) return c.driveFile;
  if (c && c.file) return c.file;
  if (d && d.driveFile) return d.driveFile;
  return d && d.file ? d.file : '#';
}
function docDownload(d){
  return d && d.driveFile ? d.driveFile : (d && d.file ? d.file : '#');
}

function renderDocRegister() {
  const el = $('docRegister'); if (!el) return;
  const q = (docSearch || '').toLowerCase();
  const docs = q
    ? DOCUMENTS.filter(d => [d.documentId, d.title, d.type, d.stage, d.owner, d.date, d.status,
        d.projectName, d.projectId, d.client].join(' ').toLowerCase().includes(q))
    : DOCUMENTS;
  const md = isMD();
  const count = $('docCount');
  if (count) count.textContent = docs.length + ' of ' + DOCUMENTS.length + ' documents';
  const rows = docs.map(d => {
    const fl = docLink(d);
    const fileCell = fl && fl !== '#'
      ? `<div style="display:flex;gap:8px;flex-wrap:wrap" onclick="event.stopPropagation()"><a class="download-btn" href="${esc(fl)}" target="_blank">Open</a><a class="download-btn primary" href="${esc(fl)}" download>Download</a></div>${d.driveFile?'<span style="color:#64748b;font-size:11px" title="Live file from Drive">● live</span>':''}`
      : `<span style="color:#64748b;font-size:12px">No file</span>`;
    const ctrl = md
      ? `<div style="display:flex;gap:8px;flex-wrap:wrap" onclick="event.stopPropagation()"><button class="upd-btn" onclick="editDocument('${esc(d.documentId)}')">Edit</button><button class="upd-btn upd-btn-danger" onclick="deleteDocument('${esc(d.documentId)}')">Delete</button></div>`
      : `<span style="color:#64748b;font-size:12px" title="Controlled documents are immutable — only the MD can edit or delete.">🔒 Immutable</span>`;
    return `<tr onclick="openProject('${d.projectId}')"><td><b>${esc(d.documentId)}</b><br><span style="color:#64748b">${esc(d.title)}</span></td><td><b>${esc(d.projectName)}</b><br><span style="color:#64748b">${esc(d.projectId)}</span></td><td>${esc(d.type)}<br><span style="color:#64748b">${esc(d.stage)}</span></td><td>${esc(d.owner)}</td><td>${esc(d.date)}</td><td><span class="pill green">${esc(d.status)}</span></td><td>${fileCell}</td><td>${ctrl}</td></tr>`;
  }).join('');
  el.innerHTML = `<table class="file-table"><thead><tr><th>Document</th><th>Project</th><th>Type / Stage</th><th>Owner</th><th>Date</th><th>Status</th><th>File</th><th>Control</th></tr></thead><tbody>${rows || '<tr><td colspan="8"><div class="empty">No documents match this search.</div></td></tr>'}</tbody></table>`;
  staggerRows(el);
}

/* --- MD: inline edit of a controlled document (immutability) --- */
let editingDocId = null;
function editDocument(id) {
  if (!isMD()) { toast('Only the MD can edit controlled documents.', 'error'); return; }
  const d = DOCUMENTS.find(x => x.documentId === id); if (!d) return;
  editingDocId = id;
  const e = $('docEditor'); if (!e) return;
  e.style.display = 'block';
  e.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px">
      <b>Edit controlled document — ${esc(d.documentId)}</b>
      <span style="color:#64748b;font-size:12px">MD authority only · changes are audited</span>
    </div>
    <div class="upd-grid">
      <div class="upd-field"><label>Document Title</label><input type="text" id="edTitle" value="${esc(d.title)}"></div>
      <div class="upd-field"><label>Type</label><input type="text" id="edType" value="${esc(d.type)}"></div>
      <div class="upd-field"><label>Stage</label><input type="text" id="edStage" value="${esc(d.stage)}"></div>
      <div class="upd-field"><label>Owner</label><input type="text" id="edOwner" value="${esc(d.owner)}"></div>
      <div class="upd-field"><label>Status</label><select id="edStatus"><option>Available</option><option>Signed Off</option><option>Under Review</option><option>Archived</option></select></div>
      <div class="upd-field"><label>Date</label><input type="text" id="edDate" value="${esc(d.date)}"></div>
    </div>
    <div class="upd-row">
      <button class="upd-btn" onclick="saveDocEdit()">Save Changes</button>
      <button class="upd-btn" style="background:transparent;color:#fda4af;border-color:rgba(253,164,175,.3)" onclick="cancelDocEdit()">Cancel</button>
      <span class="upd-note" id="edMsg"></span>
    </div>`;
  const st = $('edStatus'); if (st) st.value = d.status;
  e.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function saveDocEdit() {
  const d = DOCUMENTS.find(x => x.documentId === editingDocId); if (!d) return;
  const title = $('edTitle').value.trim(), type = $('edType').value.trim(),
    stage = $('edStage').value.trim(), owner = $('edOwner').value.trim(),
    status = $('edStatus').value, date = $('edDate').value.trim();
  const err = $('edMsg');
  if (!title || !type) { if (err) err.textContent = 'Title and type are required.'; return; }
  const before = JSON.stringify({ title: d.title, type: d.type, stage: d.stage, owner: d.owner, status: d.status, date: d.date });
  d.title = title; d.type = type; d.stage = stage; d.owner = owner; d.status = status; d.date = date;
  ZCC.snapshot(); ZCC.logAudit(whoami(), 'DOCUMENT_EDIT', `${d.documentId} changed ${before} → ${JSON.stringify({ title, type, stage, owner, status, date })}`);
  if (err) err.innerHTML = `<span style="color:#16a34a">✔ Changes saved and audited for ${esc(d.documentId)}.</span>`;
  toast('Document updated: ' + d.documentId);
  cancelDocEdit();
  renderDocRegister(); renderDocUploads(); renderFileTable();
}
function cancelDocEdit() {
  editingDocId = null;
  const e = $('docEditor'); if (e) { e.style.display = 'none'; e.innerHTML = ''; }
}
function deleteDocument(id) {
  if (!isMD()) { toast('Only the MD can delete controlled documents.', 'error'); return; }
  const d = DOCUMENTS.find(x => x.documentId === id); if (!d) return;
  if (!confirm(`Delete controlled document ${id} — "${d.title}"?\n\nOnly the Managing Director can delete controlled documents. This is irreversible and is recorded in the audit trail.`)) return;
  const i = DOCUMENTS.findIndex(x => x.documentId === id); if (i > -1) DOCUMENTS.splice(i, 1);
  ZCC.snapshot(); ZCC.logAudit(whoami(), 'DOCUMENT_DELETE', id + ' · ' + d.title);
  toast('Document deleted: ' + id, 'info');
  cancelDocEdit();
  renderDocRegister(); renderDocUploads(); renderFileTable();
}

/* Wire the document-register search box (03_Documents) */
function bindDocSearch() {
  const el = $('docSearch'); if (!el) return;
  el.addEventListener('input', e => { docSearch = e.target.value; renderFileTable(); renderDocRegister(); });
}

/* ============================================================
   DOCUMENT MANAGEMENT (32) — Trev-style link control.
   Lets the MD/Contract Lead/Admin add, edit or change the Drive
   link for any document, without editing code. Changes persist
   to localStorage (and would map to Google Sheets in production).
   ============================================================ */
const DOC_OVERRIDE_KEY = 'zcc.doclinks.v1';
function docOverrides(){ try { const o=JSON.parse(localStorage.getItem(DOC_OVERRIDE_KEY)||'null'); if(o&&typeof o==='object') return o; }catch(e){} return {}; }
function saveDocOverrides(o){ try { localStorage.setItem(DOC_OVERRIDE_KEY, JSON.stringify(o)); }catch(e){} }

let mdEditingId = null;

function mdProjectsOptions() {
  const sel = $('mdProject'); if (!sel) return;
  const all = PROJECTS.concat(ARCHIVE.concat(ZCC.archive()));
  sel.innerHTML = '<option value="">Select project…</option>' + all.map(p => `<option value="${esc(p.id)}">${esc(p.id)} · ${esc(p.name)}</option>`).join('');
}

/* effective list of documents = seed + overrides (adds/changes) */
function effectiveDocs() {
  const ov = docOverrides();
  const changed = {};
  const added = [];
  Object.keys(ov).forEach(k => {
    if (k.startsWith('+')) added.push(ov[k]);
    else changed[k] = ov[k];
  });
  let list = DOCUMENTS.map(d => {
    const c = changed[d.documentId] || {};
    return Object.assign({}, d, { title: c.title ?? d.title, type: c.type ?? d.type, stage: c.stage ?? d.stage, file: c.file ?? d.file, driveFile: c.driveFile ?? d.driveFile, date: c.date ?? d.date });
  });
  list = list.concat(added);
  return list;
}
function docLinkEff(d){
  const ov = docOverrides();
  const c = ov[d.documentId];
  if (c && c.driveFile) return c.driveFile;
  if (c && c.file) return c.file;
  return d.driveFile || d.file || '#';
}

function renderDocManage() {
  mdProjectsOptions();
  const list = effectiveDocs();
  const cnt = $('mdCount'); if (cnt) cnt.textContent = list.length + ' documents';
  const t = $('mdTable'); if (!t) return;
  t.innerHTML = list.length
    ? `<table class="file-table"><thead><tr><th>Document</th><th>Project</th><th>Type / Stage</th><th>Link</th><th>Actions</th></tr></thead><tbody>` +
      list.map(d => {
        const fl = docLinkEff(d);
        const linked = fl && fl.includes('drive.google.com') ? '<span style="color:#16a34a;font-size:11px">● linked</span>' : '<span style="color:#64748b;font-size:11px">no link</span>';
        return `<tr>
          <td><b>${esc(d.title)}</b><br><span style="color:#64748b">${esc(d.documentId)}</span></td>
          <td>${esc(d.projectName)}<br><span style="color:#64748b">${esc(d.projectId)}</span></td>
          <td>${esc(d.type)}<br><span style="color:#64748b">${esc(d.stage)}</span></td>
          <td>${linked}${fl && fl!=='#' ? `<div style="font-size:11px;color:#64748b;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(fl)}</div>` : ''}</td>
          <td><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="upd-btn" onclick="mdEdit('${esc(d.documentId)}')">Edit</button><button class="upd-btn upd-btn-danger" onclick="mdDelete('${esc(d.documentId)}')">Delete</button></div></td>
        </tr>`;
      }).join('') + `</tbody></table>`
    : '<div class="empty">No documents yet.</div>';
}
function mdEdit(id) {
  const list = effectiveDocs();
  const d = list.find(x => x.documentId === id); if (!d) return;
  mdEditingId = id;
  const ov = docOverrides();
  const c = ov[id] || {};
  set('mdProject', d.projectId); set('mdTitle', c.title ?? d.title); set('mdType', c.type ?? d.type); set('mdFile', c.driveFile ?? c.file ?? d.driveFile ?? d.file ?? '');
  const btn = document.querySelector('.panel.upd .upd-btn');
  if (btn) btn.textContent = 'Save Changes';
  const m = $('mdMsg'); if (m) m.textContent = 'Editing ' + id + ' — change the link/details and save.';
  const head = document.querySelector('.section-head h2');
  if (head) head.textContent = 'Edit Document';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function set(id, v){ const el=$(id); if(el) el.value = v; }
function mdSaveNew() {
  const pid = $('mdProject')?.value, title = $('mdTitle')?.value.trim(), type = $('mdType')?.value, file = $('mdFile')?.value.trim();
  const m = $('mdMsg');
  if (!pid || !title) { if (m) m.textContent = 'Choose a project and enter a title.'; return; }
  const p = PROJECTS.find(x=>x.id===pid) || ARCHIVE.concat(ZCC.archive()).find(x=>x.id===pid);
  const ov = docOverrides();
  const isDrive = /drive\.google\.com\/file\/d\//.test(file);
  if (mdEditingId) {
    ov[mdEditingId] = { projectId: pid, title, type, stage: p?.stage || '', file: isDrive ? '#' : file, driveFile: isDrive ? file : '', date: todayStr() };
    saveDocOverrides(ov);
    if (m) m.innerHTML = '<span style="color:#16a34a">✔ Updated — ' + esc(mdEditingId) + '.</span>';
    toast('Document updated: ' + mdEditingId);
  } else {
    const docId = 'DOC-' + pid + '-' + String(effectiveDocs().length + 1).padStart(3,'0');
    ov['+' + docId] = { documentId: docId, projectId: pid, projectName: p?.name || pid, client: p?.client || '', type, stage: p?.stage || '', title, date: todayStr(), file: isDrive ? '#' : file, driveFile: isDrive ? file : '', status: 'Available' };
    saveDocOverrides(ov);
    if (m) m.innerHTML = '<span style="color:#16a34a">✔ Added — ' + esc(docId) + '.</span>';
    toast('Document added: ' + docId);
  }
  mdEditingId = null;
  $('mdTitle').value=''; $('mdFile').value='';
  const btn = document.querySelector('.panel.upd .upd-btn'); if (btn) btn.textContent = '+ Add Document';
  const head = document.querySelector('.section-head h2'); if (head) head.textContent = 'Add / Edit Document';
  renderDocManage();
}
function mdDelete(id) {
  if (!confirm('Delete document ' + id + '?\n\nThis removes it from the document space (your override). The source seed document, if any, stays in the app data.')) return;
  const ov = docOverrides();
  // override with empty file to hide seed doc, or remove added doc
  if (ov['+'+id]) { delete ov['+'+id]; }
  else { ov[id] = { hidden: true }; }
  saveDocOverrides(ov);
  toast('Document removed: ' + id, 'info');
  renderDocManage();
}

function documentCards(p) {
  const docs = DOCUMENTS.filter(d => d.projectId === p.id);
  if (!docs.length) return '<div class="empty">No documents linked to this project yet.</div>';
  return `<div class="doc-grid">${docs.map(d => { const fl = docLink(d); return `<div class="doc"><b>${esc(d.title)}</b>${d.driveFile?'<span class="pill green" style="margin-left:6px">● live</span>':''}<span>${esc(d.type)} · ${esc(d.stage)}<br>Owner: ${esc(d.owner)} · Date: ${esc(d.date)}</span><div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><a class="download-btn" href="${esc(fl)}" target="_blank">Open</a><a class="download-btn primary" href="${esc(fl)}" download>Download</a></div></div>`; }).join('')}</div>`;
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
  if (da) { const u = ZCC.user(); da.style.display = (u && u.role === 'MD') ? 'inline-flex' : 'none'; }

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
      return `<div class="detail-kpis"><div class="dk"><span>Contract Value</span><b>${money(p.contractValue)}</b></div><div class="dk"><span>Actual Progress</span><b>${pct(p.actual)}</b></div><div class="dk"><span>Delay Days</span><b>${p.delayDays}</b></div><div class="dk"><span>Mobilization</span><b>${p.mobilization}</b></div></div>${gallery}<div class="info-grid"><div class="info"><b>Company / Entity</b>${esc(p.company || '—')}</div><div class="info"><b>Client / User Department</b>${esc(p.client)}<br><span style="color:#64748b">${esc(p.userDept)}</span></div><div class="info"><b>Project Manager</b>${esc(p.pm)}</div><div class="info"><b>Supervisor / Vendor</b>${esc(p.supervisor)}<br>${esc(p.vendor)}</div><div class="info"><b>Stage</b>${esc(p.stage)}</div><div class="info"><b>Planned End / Forecast</b>${esc(p.plannedEnd)} → ${esc(p.forecast)}</div><div class="info"><b>Delay Source</b>${esc(p.delaySource)}</div></div>`;
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

/* Open a completed (archived) project's detail in the drawer. Archived
   projects have no live progress/files/payments — they show the final
   record: value, dates, retention, summary, photos and documents. */
function openArchivedProject(id) {
  const x = ARCHIVE.concat(ZCC.archive()).find(a => a.id === id);
  if (!x || !$('drawer')) return;
  const ph = (PROJECT_PHOTO && PROJECT_PHOTO[id]) || [];
  const gallery = ph.length
    ? `<div class="overview-gallery">${ph.map(u => `<img class="overview-img" src="${esc(u)}" alt="${esc(x.name)}" onclick="window.open('${esc(u)}','_blank')">`).join('')}</div>`
    : '';
  const docLinks = (x.docs || []).map(f => `<a class="download-btn" href="${esc(f)}" target="_blank">Open</a><a class="download-btn primary" href="${esc(f)}" download>Download</a>`).join(' ');
  /* real documents from the register for this completed project */
  const regDocs = DOCUMENTS.filter(d => d.projectId === x.id);
  const regRows = regDocs.map(d => {
    const fl = docLink(d);
    return `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:9px 0;border-bottom:1px dashed var(--line)">
      <div style="min-width:0"><b style="font-size:13px">${esc(d.title)}</b><div style="color:#64748b;font-size:11.5px">${esc(d.type)} · ${esc(d.date)}</div></div>
      ${fl && fl!=='#' ? `<div style="display:flex;gap:8px;flex-wrap:wrap" onclick="event.stopPropagation()"><a class="download-btn" href="${esc(fl)}" target="_blank">Open</a></div>` : '<span style="color:#64748b;font-size:12px">No file</span>'}
    </div>`;
  }).join('');
  const regBlock = regRows ? `<div style="margin-top:12px"><h4 style="margin:0 0 6px;font-size:13px;color:#0a0a0a">Registered documents</h4>${regRows}</div>` : '';
  $('drawerBadges').innerHTML = `<span class="pill green">Completed</span>${x.year ? `<span class="pill grey">${x.year}</span>` : ''}`;
  $('drawerTitle').textContent = x.name;
  $('drawerSub').textContent = `${x.id} · ${x.client} · ${x.location || ''}`;
  activeProjectId = x.id;
  const da2 = $('drawerArchive'); if (da2) da2.style.display = 'none';  /* already archived */
  $('drawerTabs').innerHTML = `<button class="tab active" data-tab="overview">Overview</button><button class="tab" data-tab="docs">Documents</button>`;
  $('panels').innerHTML =
    `<section class="tab-panel active" data-panel="overview">
      <div class="detail-kpis">
        <div class="dk"><span>Contract Value</span><b>${money(x.contractValue)}</b></div>
        <div class="dk"><span>Completed</span><b>${esc(x.completed || '—')}</b></div>
        <div class="dk"><span>Retention</span><b style="color:#16a34a">${esc(x.retentionReleased || '—')}</b></div>
        <div class="dk"><span>Year</span><b>${esc(x.year || '—')}</b></div>
      </div>
      ${gallery}
      <div class="info-grid" style="margin-top:12px">
        <div class="info"><b>Client</b>${esc(x.client)}</div>
        <div class="info"><b>Sector</b>${esc(x.sector || '—')}</div>
        <div class="info"><b>Location</b>${esc(x.location || '—')}</div>
        <div class="info"><b>Company</b>${esc(x.company || '—')}</div>
        <div class="info"><b>Closed</b>${esc(x.closed || '—')}</div>
        <div class="info"><b>Status</b><span class="pill green">Completed</span></div>
      </div>
      <div class="callout" style="margin-top:12px"><b>Summary:</b> ${esc(x.summary || 'Completed project.')}</div>
    </section>
    <section class="tab-panel" data-panel="docs">
      <div class="empty" style="margin-bottom:10px">Completed project documents.</div>
      ${docLinks ? `<div style="display:flex;gap:8px;flex-wrap:wrap">${docLinks}</div>` : ''}
      ${regBlock}
    </section>`;
  document.querySelectorAll('#drawerTabs .tab').forEach(t => {
    t.onclick = () => {
      document.querySelectorAll('#drawerTabs .tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.drawer .tab-panel').forEach(pp => pp.classList.remove('active'));
      t.classList.add('active');
      const pnl = document.querySelector(`.drawer [data-panel="${t.dataset.tab}"]`);
      if (pnl) pnl.classList.add('active');
    };
  });
  $('overlay').classList.add('show');
  $('drawer').classList.add('show');
  document.body.classList.add('open');
}

function bindCC() {
  ['search', 'sector', 'client', 'pm', 'company', 'sort'].forEach(id => {
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

/* --- ACCOUNTS: register a document (invoice support, certification,
   retention release, etc.) against a project. Same shared register —
   so a document raised here appears in the Command Center, MD's
   dashboard and the document archive. --- */
function acctAddDoc(){
  const pid = $('acctDocProject')?.value, type = $('acctDocType')?.value,
    title = $('acctDocTitle')?.value, note = $('acctDocNote')?.value || '';
  const err = $('acctDocMsg');
  if (!pid || !title) { if (err) err.textContent = 'Choose a project and enter a title.'; return; }
  const p = PROJECTS.find(x => x.id === pid);
  const next = String(DOCUMENTS.length + 1).padStart(3, '0');
  const ts = dateGB(new Date()), tm = time24(new Date());
  DOCUMENTS.push({
    documentId: 'DOC-ZW-' + pid.slice(-3) + '-' + next, projectId: pid,
    projectName: p.name, client: p.client, type, stage: p.stage,
    title: title + (note ? ' — ' + note : ''),
    date: ts, time: tm, uploadedAt: ts + ' ' + tm,
    owner: whoami(), status: 'Available', file: '#'
  });
  ZCC.snapshot(); ZCC.logAudit(whoami(), 'ACCOUNTS_DOCUMENT_UPLOAD', `${pid} · ${type} · ${title} ${note}`.trim());
  if (err) err.innerHTML = `<span style="color:#16a34a">✔ Document registered — ${esc(title)} (${pid}) at ${ts} ${tm}.</span>`;
  toast('Document registered: ' + title);
  if ($('acctDocTitle')) $('acctDocTitle').value = '';
  if ($('acctDocNote')) $('acctDocNote').value = '';
  renderDocUploads();
}

/* Recent document uploads feed — with timestamps. Shown on the MD
   dashboard and the Admin Console so leadership can see who uploaded
   what, and when. */
function renderDocUploads(){
  const el = $('docUploads'); if (!el) return;
  const rows = DOCUMENTS.slice().sort((a, b) => String(b.uploadedAt || b.date).localeCompare(String(a.uploadedAt || a.date))).map(d => {
    const fl = docLink(d);
    const fileCell = fl && fl !== '#'
      ? `<div style="display:flex;gap:8px;flex-wrap:wrap" onclick="event.stopPropagation()"><a class="download-btn" href="${esc(fl)}" target="_blank">Open</a><a class="download-btn primary" href="${esc(fl)}" download>Download</a></div>${d.driveFile?'<span style="color:#64748b;font-size:11px">● live</span>':''}`
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
  /* the interactive file tracker — one card per project with a
     horizontal approval timeline (per-step status, current position,
     and clickable approval history). Mirrors the status-tracker pattern. */
  const tracker = $('awTracker');
  if (tracker) {
    tracker.innerHTML = FILE_JOURNEYS.map((j, fi) => {
      const p = PROJECTS.find(x => x.id === j.projectId);
      const total = APPROVAL_FLOW_FULL.length;
      const steps = APPROVAL_FLOW_FULL.map((st, i) => {
        let stCls = 'pending', icon = '·', label = 'Pending';
        if (i < j.stepIndex) { stCls='done'; icon='✓'; label='Approved'; }
        else if (i === j.stepIndex) {
          if (j.status === 'rejected') { stCls='rejected'; icon='✗'; label='Rejected'; }
          else { stCls='current'; icon='●'; label='In progress'; }
        }
        return `<div class="aw-node ${stCls}" title="${esc(st.step)}: ${label}">
          <span class="aw-node-icon">${icon}</span>
          <div class="aw-node-name">${esc(st.step)}</div>
        </div>`;
      }).join('');
      // approval history (video-style)
      const hist = (j.history||[]).map(h =>
        `<div class="aw-hist-row"><span class="aw-hist-step">${esc(h.step)}</span>
          <span class="pill ${h.action==='Approved'?'green':h.action==='Rejected'?'red':'amber'}">${esc(h.action)}</span>
          <span>${esc(h.by)}</span><span class="aw-hist-date">${esc(h.date)}</span>
          <span class="aw-hist-days">${h.days>0? h.days+'d':'now'}</span></div>`
      ).join('');
      const posPct = j.status==='rejected' ? 100 : Math.round(j.stepIndex/(total-1)*100);
      return `<div class="aw-card" style="border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:14px;background:var(--card)">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px">
          <b style="font-size:15px">${esc(p?p.name:j.projectId)}</b>
          <div style="display:flex;gap:8px;align-items:center">
            <span style="font-size:12px;color:#64748b">Currently with:</span>
            <b>${esc(APPROVAL_FLOW_FULL[j.stepIndex].step)}</b>
            <span class="pill ${j.status==='rejected'?'red':j.status==='pending'?'amber':'green'}">${j.status==='rejected'?'Rejected':'Pending'}</span>
          </div>
        </div>
        <div class="aw-track">
          <div class="aw-fill" style="width:${posPct}%;background:${j.status==='rejected'?'#dc2626':'#2563eb'}"></div>
        </div>
        <div class="aw-nodes" style="display:flex;gap:4px;margin-top:10px;overflow-x:auto">${steps}</div>
        <div class="aw-hist" style="margin-top:12px;border-top:1px solid var(--line);padding-top:10px">
          <div style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Approval History</div>
          ${hist}
        </div>
      </div>`;
    }).join('');
  }
  const table = $('awTable');
  if (table) {
    const rows = FILE_JOURNEYS.map(j => {
      const p = PROJECTS.find(x => x.id === j.projectId);
      const cur = APPROVAL_FLOW_FULL[j.stepIndex];
      const back = j.stepIndex > 0 ? APPROVAL_FLOW_FULL[j.stepIndex - 1].step : '—';
      const ahead = j.stepIndex < APPROVAL_FLOW_FULL.length - 1 ? APPROVAL_FLOW_FULL[j.stepIndex + 1].step : 'Complete';
      const pos = j.status==='rejected'?100:Math.round(j.stepIndex / (APPROVAL_FLOW_FULL.length - 1) * 100);
      return `<tr onclick="openProject('${j.projectId}')">
        <td><b>${esc(p ? p.name : j.projectId)}</b><br><span style="color:#64748b">${esc(j.projectId)}</span></td>
        <td>${back}</td>
        <td><b>${esc(cur.step)}</b><br><span style="color:#64748b">${esc(cur.role)}</span></td>
        <td>${ahead}</td>
        <td><div class="track" style="min-width:110px"><div class="fill ${j.status==='rejected'?'red':cls(p?p.status:'')}" style="width:${pos}%"></div></div></td>
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
  /* Payments & Collections — the third pillar of the one-touch view
     (progress + files + payments). Portfolio certified/paid/outstanding,
     retention, collection rate, and the biggest overdue balances so the
     MD sees exactly who owes what without opening the Accounts portal. */
  const pm = $('execPayments');
  if (pm) {
    const t = PROJECTS.reduce((a, p) => {
      const c = costInfo(p);
      a.value += p.contractValue; a.certified += c.certified; a.paid += c.paid; a.outstanding += c.outstanding; a.retention += c.retention;
      return a;
    }, { value: 0, certified: 0, paid: 0, outstanding: 0, retention: 0 });
    const collect = t.certified ? Math.round(t.paid / t.certified * 100) : 0;
    const kpis = [
      ['Certified', t.certified, '#0a0a0a'],
      ['Paid', t.paid, '#16a34a'],
      ['Outstanding', t.outstanding, t.outstanding ? '#dc2626' : '#0a0a0a'],
      ['Retention', t.retention, '#0a0a0a']
    ].map(([lab, v, col]) =>
      `<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px"><b style="color:${col}">${esc(lab)}</b><b>${money(v)}</b></div>`).join('');
    const rate = `<div style="margin:4px 0 10px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><b>Collection rate</b><span>${collect}%</span></div><div style="height:8px;border-radius:99px;background:#eef2f7;overflow:hidden"><div class="an-fill" style="height:8px;width:${collect}%;background:${collect >= 80 ? '#16a34a' : collect >= 50 ? '#f59e0b' : '#dc2626'};border-radius:99px"></div></div></div>`;
    const top = PROJECTS.filter(p => costInfo(p).outstanding > 0)
      .sort((a, b) => costInfo(b).outstanding - costInfo(a).outstanding).slice(0, 4)
      .map(p => {
        const c = costInfo(p);
        return `<div class="att-item" onclick="openProject('${p.id}')"><span class="dot ${c.outstanding > 100000000 ? 'red' : c.outstanding > 30000000 ? 'amber' : 'green'}"></span><div><h4 style="font-size:13px">${esc(p.name)}</h4><p style="color:#64748b">Outstanding <b>${money(c.outstanding)}</b></p></div><span class="pill ${cls(p.status)}">${p.status}</span></div>`;
      }).join('');
    pm.innerHTML = kpis + rate + (top ? `<div style="margin-top:6px;border-top:1px dashed var(--line);padding-top:6px">${top}</div>` : '<div class="empty" style="margin-top:6px">No outstanding balances. ✅</div>');
    animateBars(pm);
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
  // vendor selector
  const sel = $('vpVendor');
  if (sel) {
    sel.innerHTML = '<option value="">Select vendor…</option>' + VENDORS.map(v => `<option value="${esc(v.id)}">${esc(v.name)}</option>`).join('');
  }
  renderVendorHistory();
}
function renderVendorHistory(){
  const el = $('vendorHistory'); if (!el) return;
  const vid = $('vpVendor')?.value;
  if (!vid) { el.innerHTML = '<div class="empty">Select a vendor to see their payment history.</div>'; return; }
  const vps = VENDOR_PAYMENTS.filter(vp => vp.vendorId === vid);
  if (!vps.length) { el.innerHTML = '<div class="empty">No payment records for this vendor yet.</div>'; return; }
  let totalPaid=0, totalContract=0, totalRet=0;
  const rows = vps.map(vp => {
    const pr = vendorPaymentProgress(vp);
    totalPaid+=pr.paid; totalContract+=pr.total; totalRet+=vp.retention;
    const pname = PROJECTS.find(p=>p.id===vp.projectId)?.name || vp.projectId;
    return `<div style="border:1px solid var(--line);border-radius:12px;padding:14px;margin-bottom:12px;background:var(--card)">
      <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">
        <div><b style="font-size:15px">${esc(pname)}</b><div style="font-size:12px;color:#64748b">${esc(vp.projectId)} · ${esc(vp.terms)}</div></div>
        <span class="pill ${vp.status==='In progress'?'amber':vp.status==='Awaiting payment'?'red':'green'}">${esc(vp.status)}</span>
      </div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:6px">
        <div><span style="font-size:11px;color:#64748b;text-transform:uppercase">Contract</span><div style="font-weight:800">${money(pr.total)}</div></div>
        <div><span style="font-size:11px;color:#64748b;text-transform:uppercase">Paid</span><div style="font-weight:800;color:#15803d">${money(pr.paid)}</div></div>
        <div><span style="font-size:11px;color:#64748b;text-transform:uppercase">Progress</span><div style="font-weight:800">${pr.pct}%</div></div>
      </div>
      <div style="height:8px;background:#eee;border-radius:99px;overflow:hidden"><div style="height:8px;width:${pr.pct}%;background:${pr.pct>=100?'#16a34a':'#2563eb'};border-radius:99px"></div></div>
    </div>`;
  }).join('');
  el.innerHTML = `<div style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:14px">
      <div class="metric-card"><span>Total Contracts</span><b>${money(totalContract)}</b></div>
      <div class="metric-card"><span>Total Paid</span><b>${money(totalPaid)}</b></div>
      <div class="metric-card"><span>Overall Progress</span><b>${totalContract?Math.round(totalPaid/totalContract*100):0}%</b></div>
      <div class="metric-card"><span>Retention Held</span><b>${money(totalRet)}</b></div>
    </div>${rows}`;
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
    if (!items.length) { t.innerHTML = '<div class="empty">No completed projects yet. Archive a completed project to move it here.</div>'; return; }
    const docLinks = x => (x.docs || []).map(f => `<a class="download-btn" href="${esc(f)}" target="_blank">Doc</a>`).join(' ');
    /* Group completed projects by COMPANY folder, then by year inside each. */
    const byCompany = {};
    items.forEach(x => { const c = x.company || 'Unassigned'; (byCompany[c] = byCompany[c] || []).push(x); });
    const companies = Object.keys(byCompany).sort();
    const companyBlocks = companies.map(c => {
      const projs = byCompany[c];
      const byYear = {};
      projs.forEach(x => { const y = x.year || String(new Date(x.completed || Date.now()).getFullYear()); (byYear[y] = byYear[y] || []).push(x); });
      const years = Object.keys(byYear).sort((a, b) => b - a);
      const rows = years.map(y => byYear[y].map(x => `<tr onclick="openArchivedProject('${esc(x.id)}')">
        <td><b>${esc(x.name)}</b><br><span style="color:#64748b">${esc(x.id)} · ${esc(x.sector)}</span></td>
        <td>${esc(x.client)}</td>
        <td>${money(x.contractValue)}</td>
        <td>${esc(y)}</td>
        <td>${esc(x.completed)}</td>
        <td><span class="pill green">${esc(x.retentionReleased)}</span></td>
        <td style="color:#64748b;font-size:12px">${esc(x.summary)}</td>
        <td><div style="display:flex;gap:6px;flex-wrap:wrap" onclick="event.stopPropagation()">${docLinks(x)}</div></td>
      </tr>`).join('')).join('');
      return `<div class="archive-company" style="margin-bottom:22px">
        <div class="archive-company-head" style="display:flex;align-items:center;gap:12px;margin-bottom:10px;cursor:pointer" onclick="location.href='31_Company.html?company='+encodeURIComponent('${esc(c)}')" title="Open ${esc(c)} folder">
          <span class="company-folder-icon" style="width:36px;height:36px;font-size:17px">📁</span>
          <h3 style="margin:0;font-size:18px;color:#0a0a0a">${esc(c)}</h3>
          <span class="pill blue">${projs.length} completed</span>
          <span style="color:#0a0a0a;font-size:12px;font-weight:800">Open folder →</span>
        </div>
        <table class="file-table"><thead><tr><th>Project</th><th>Client</th><th>Value</th><th>Year</th><th>Completed</th><th>Retention</th><th>Summary</th><th>Documents</th></tr></thead><tbody>${rows || '<tr><td colspan="8" class="empty">No completed projects.</td></tr>'}</tbody></table>
      </div>`;
    }).join('');
    t.innerHTML = companyBlocks;
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
    company: p.company || '', pm: p.pm, contractValue: p.contractValue,
    completed: p.plannedEnd || p.forecast || todayStr(),
    year: p.year || String(new Date().getFullYear()),
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
   CONSTRUCTION ANALYTICS (29) — cost forecast, cash flow,
   risk heat map, Gantt schedule
   ============================================================ */
function renderConstrAnalytics(){
  // project selector
  const sel = $('caProject');
  if (sel) {
    sel.innerHTML = PROJECTS.map(p => `<option value="${esc(p.id)}">${esc(p.id)} · ${esc(p.name)}</option>`).join('');
    if (sel.options.length) sel.value = sel.options[0].value;
  }
  const pid = sel ? sel.value : (PROJECTS[0] && PROJECTS[0].id);
  renderCAProject(pid);
  if (sel) sel.onchange = () => renderCAProject(sel.value);
}
function renderCAProject(pid){
  const p = PROJECTS.find(x => x.id === pid); if (!p) return;
  renderCACost(p);
  renderCAScurve(p);
  renderCARisk(p);
  renderCAGantt(p);
}
/* 1. Budget vs Forecast cost */
function renderCACost(p){
  const cf = COST_FORECAST[p.id] || {};
  const kpi = $('caCostKpis');
  if (kpi) {
    const variance = (cf.forecast||0) - (cf.currentBudget||0);
    const over = variance > 0;
    kpi.innerHTML = [
      ['Current Budget', cf.currentBudget||0, 'money'],
      ['Committed', cf.committed||0, 'money'],
      ['Forecast to Complete', cf.forecast||0, 'money'],
      ['Variance', Math.abs(variance), 'money'],
    ].map(([lab, v, kd]) => `<div class="metric-card"><span>${lab}</span><b data-target="${v}" data-kind="${kd}">₦0</b><span style="color:${over?'#b91c1c':'#15803d'}">${over?'OVER BUDGET':'ON/UNDER BUDGET'}</span></div>`).join('');
    kpi.querySelectorAll('b').forEach(runCounter);
    staggerChildren(kpi, 60, 6);
  }
  // waterfall: budget -> committed -> forecast -> variance
  const w = $('caWaterfall');
  if (w) {
    const maxV = Math.max(cf.currentBudget||0, cf.forecast||0);
    const bar = (label, val, color) => {
      const pct = maxV ? (val/maxV*100) : 0;
      return `<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><b>${label}</b><span>${money(val)}</span></div><div style="height:22px;background:#eee;border-radius:6px;overflow:hidden"><div class="an-fill" style="height:22px;width:${pct}%;background:${color};border-radius:6px"></div></div></div>`;
    };
    w.innerHTML = bar('Original Budget', cf.originalBudget||0, '#1f2937') +
      bar('Adjustments + Contingency', ((cf.adjustments||0)+(cf.contingency||0)), '#6b7280') +
      bar('Current Budget', cf.currentBudget||0, '#0a0a0a') +
      bar('Committed (signed)', cf.committed||0, '#2563eb') +
      bar('Forecast to Complete', cf.forecast||0, (cf.forecast||0)>(cf.currentBudget||0)?'#dc2626':'#16a34a');
    animateBars(w);
  }
}
/* 2. Cash flow S-curve */
function renderCAScurve(p){
  const el = $('caScurve'); if (!el) return;
  const cf = CASH_FLOW[p.id]; if (!cf) { el.innerHTML = '<div class="empty">No cash-flow data.</div>'; return; }
  const labels = cf.labels, planned = cf.planned, actual = cf.actual;
  const w = 760, h = 260, m = 46;
  const maxV = Math.max(...planned, ...actual);
  const X = i => m + i*((w-2*m)/(labels.length-1));
  const Y = v => h-m - (v/maxV)*(h-2*m);
  const line = arr => arr.map((v,i)=>`${X(i)},${Y(v)}`).join(' ');
  let grid = '';
  for (let v=0; v<=maxV; v+=Math.ceil(maxV/4)){
    const y = Y(v);
    grid += `<line x1="${m}" y1="${y}" x2="${w-m}" y2="${y}" stroke="#e5e7eb"/><text x="4" y="${y+4}" font-size="9" fill="#64748b">${money(v).replace('₦','')}</text>`;
  }
  el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto">
    ${grid}
    <polyline points="${line(planned)}" fill="none" stroke="#0a0a0a" stroke-width="2.5"/>
    <polyline points="${line(actual)}" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    ${actual.map((v,i)=>`<circle cx="${X(i)}" cy="${Y(v)}" r="3.5" fill="#2563eb"><title>${labels[i]} ${money(v)}</title></circle>`).join('')}
    ${labels.map((l,i)=>`<text x="${X(i)-20}" y="${h-m+18}" font-size="10" fill="#64748b">${l}</text>`).join('')}
  </svg>
  <div style="display:flex;gap:18px;font-size:12px;color:#64748b;margin-top:8px"><span style="color:#0a0a0a">● Planned</span><span style="color:#2563eb">● Actual</span></div>`;
}
/* 4. Risk heat map */
function renderCARisk(p){
  const el = $('caRiskMap'); if (!el) return;
  const r = RISK_HEAT[p.id]; if (!r) return;
  const size = 5;
  const color = (x,y) => {
    const v = x*y;
    if (v >= 16) return '#dc2626';
    if (v >= 9) return '#f59e0b';
    return '#16a34a';
  };
  const label = x => x===1?'Very Low':x===2?'Low':x===3?'Medium':x===4?'High':'Very High';
  let cells = '';
  for (let row=size; row>=1; row--){
    for (let col=1; col<=size; col++){
      const isPre = (col===r.x && row===r.y);
      const bg = color(col,row);
      cells += `<div style="width:64px;height:64px;background:${isPre?bg:bg+'55'};border:${isPre?'2px solid #0a0a0a':'1px solid #e5e7eb'};display:flex;align-items:center;justify-content:center;border-radius:6px;position:relative">
        ${isPre?`<span style="position:absolute;top:2px;right:4px;font-size:9px;color:#fff">●</span>`:''}
      </div>`;
    }
  }
  el.innerHTML = `<div style="display:flex;gap:18px;align-items:flex-start">
    <div style="display:grid;grid-template-columns:repeat(${size},64px);gap:4px">${cells}</div>
    <div style="font-size:13px;line-height:1.8">
      <b>Pre-treatment:</b> Impact <b>${label(r.y)}</b> × Probability <b>${label(r.x)}</b> = <b>${r.pre}</b><br>
      <b>Post-treatment:</b> <b>${r.post}</b><br><br>
      <span style="color:#64748b;font-size:12px">High × High = severe risk (red). Low × Low = low risk (green).</span>
    </div>
  </div>`;
}
/* 6. Gantt schedule */
function renderCAGantt(p){
  const el = $('caGantt'); if (!el) return;
  const sd = SCHEDULE_DATA[p.id]; if (!sd) { el.innerHTML = '<div class="empty">No schedule data.</div>'; return; }
  const laneW = 760, topPad = 30;
  const x = v => (v/100)*laneW;
  let rows = '';
  sd.phases.forEach(ph => {
    const bStart = x(ph.bS), bW = x(ph.bE)-x(ph.bS);
    const aStart = ph.aS!==null?x(ph.aS):null, aW = ph.aS!==null&&ph.aE?x(ph.aE)-x(ph.aS):0;
    rows += `<div style="display:flex;align-items:center;margin-bottom:14px">
      <div style="width:200px;font-size:12px;color:#0a0a0a;font-weight:600">${esc(ph.name)}</div>
      <div style="flex:1;position:relative;height:22px">
        <div style="position:absolute;top:0;height:10px;background:#1f2937;border-radius:4px;left:${bStart}px;width:${bW}px;opacity:.85"></div>
        ${aStart!==null?`<div style="position:absolute;top:12px;height:10px;background:#2563eb;border-radius:4px;left:${aStart}px;width:${aW}px"></div>`:''}
      </div>
    </div>`;
  });
  // forecast line
  const fX = x(sd.forecastEnd), bX = x(sd.baselineEnd);
  el.innerHTML = `<div style="display:flex;align-items:center;margin-bottom:10px">
      <div style="width:200px;font-size:11px;color:#64748b">Baseline end · Forecast</div>
      <div style="flex:1;position:relative;height:14px">
        <div style="position:absolute;left:${bX}px;top:0;width:2px;height:14px;background:#0a0a0a"></div>
        <div style="position:absolute;left:${fX}px;top:0;width:2px;height:14px;background:#dc2626"></div>
        <div style="position:absolute;left:${bX-10}px;top:16px;font-size:9px;color:#0a0a0a">Baseline</div>
        <div style="position:absolute;left:${fX-12}px;top:16px;font-size:9px;color:#dc2626">Forecast</div>
      </div>
    </div>
    ${rows}
    <div style="display:flex;gap:18px;font-size:12px;color:#64748b;margin-top:8px"><span style="color:#1f2937">● Baseline</span><span style="color:#2563eb">● Actual</span></div>`;
}

/* ============================================================
   FIRST-RUN GUIDED TOUR (coach marks)
   A short per-portal tour on first visit — addresses the
   "WhatsApp habit" UX challenge with simple onboarding.
   ============================================================ */
const TOUR_KEY = 'zcc.tour.v1';
function tourSeen(){ try{ return localStorage.getItem(TOUR_KEY)==='1'; }catch(e){ return true; } }
function markTourSeen(){ try{ localStorage.setItem(TOUR_KEY,'1'); }catch(e){} }
const TOURS = {
  'cc': [
    { sel:'.zcc-page-head h1', tip:'Welcome to the Command Center — the executive view of every project.' },
    { sel:'.kpis', tip:'Portfolio KPIs at a glance: active projects, value, progress, delays.' },
    { sel:'.section-head h2', tip:'Projects, Documents, Progress, Risks, Payments and more live in the sidebar.' },
    { sel:'#closeArchivePanel', tip:'Close a completed project to move it to the archive.' }
  ],
  'staff': [
    { sel:'.staff-hero-card', tip:'This is your Staff Workspace — your tasks, photos and profile.' },
    { sel:'.stat-grid', tip:'Track your assigned, signed-off and pending tasks here.' },
    { sel:'.card', tip:'Upload and sign off your work here.' }
  ],
  'contract': [
    { sel:'.zcc-page-head h1', tip:'Welcome to the Contract Portal — track government files through every office.' },
    { sel:'#contractFlow', tip:'The approval chain from Procurement to the Governor.' }
  ],
  'accounts': [
    { sel:'.zcc-page-head h1', tip:'Welcome to the Accounts Portal — payments, retention and collections.' },
    { sel:'#acctKpis', tip:'Certified vs paid vs outstanding across the portfolio.' }
  ]
};
function startTour(app){
  const steps = TOURS[app] || TOURS['cc']; if (!steps.length) return;
  let i = 0;
  const overlay = document.createElement('div');
  overlay.className = 'tour-overlay';
  const card = document.createElement('div');
  card.className = 'tour-card';
  card.innerHTML = `<div class="tour-step">Step <span class="tour-i">1</span>/<span class="tour-n">${steps.length}</span></div><div class="tour-text"></div><div class="tour-actions"><button class="tour-skip">Skip</button><button class="tour-next">Next</button></div>`;
  document.body.appendChild(overlay);
  document.body.appendChild(card);
  const text = card.querySelector('.tour-text'), iEl = card.querySelector('.tour-i'),
    nEl = card.querySelector('.tour-n'), next = card.querySelector('.tour-next'),
    skip = card.querySelector('.tour-skip');
  function place(){
    const st = steps[i], target = document.querySelector(st.sel);
    if (target) {
      const r = target.getBoundingClientRect();
      overlay.className = 'tour-overlay show';
      // highlight target with a ring
      document.querySelectorAll('.tour-highlight').forEach(h=>h.remove());
      const hl = document.createElement('div'); hl.className='tour-highlight';
      hl.style.top = r.top+'px'; hl.style.left = r.left+'px';
      hl.style.width = r.width+'px'; hl.style.height = r.height+'px';
      document.body.appendChild(hl);
      // position card
      const below = r.bottom + 14;
      card.style.top = (below < window.innerHeight - 140 ? below : Math.max(10, r.top - 130)) + 'px';
      card.style.left = Math.min(Math.max(10, r.left), window.innerWidth - 340) + 'px';
      card.style.display='block';
    } else { card.style.display='none'; }
    text.textContent = st.tip;
    iEl.textContent = (i+1);
  }
  function step(n){
    i = n;
    if (i >= steps.length) { dismiss(); markTourSeen(); return; }
    place();
  }
  function dismiss(){ overlay.classList.remove('show'); card.remove(); overlay.remove(); document.querySelectorAll('.tour-highlight').forEach(h=>h.remove()); }
  next.onclick = ()=>step(i+1);
  skip.onclick = ()=>{ dismiss(); markTourSeen(); };
  place();
}
function maybeTour(app){
  if (tourSeen()) return;
  if (document.body.dataset.public === '1') return;
  setTimeout(()=>startTour(app), 900);
}

/* ============================================================
   VENDOR PAYMENTS — per-project vendor payment progress
   ============================================================ */
function vendorPaymentsFor(projectId){
  return VENDOR_PAYMENTS.filter(vp => vp.projectId === projectId);
}
function vendorPaymentProgress(vp){
  const total = vp.contractValue;
  const paid = vp.installments.reduce((a,i)=>a+(i.paid||0),0);
  const pct = total ? Math.round(paid/total*100) : 0;
  return { total, paid, pct };
}
function vendorPaymentsCards(vps){
  return vps.map(vp => {
    const { total, paid, pct } = vendorPaymentProgress(vp);
    const due = total - paid;
    const rows = vp.installments.map(i =>
      `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px dashed var(--line);font-size:13px">
        <span style="flex:1"><b>${i.no}.</b> ${esc(i.label)}</span>
        <span style="color:#555;min-width:90px;text-align:right">${money(i.amount)}</span>
        <span class="pill ${i.status==='Paid'?'green':i.status==='Awaiting'?'amber':'grey'}" style="min-width:70px;text-align:center;font-size:11px">${esc(i.status)}</span>
        <span style="color:#64748b;font-size:11px;min-width:70px;text-align:right">${esc(i.date)}</span>
      </div>`).join('');
    return `<div style="border:1px solid var(--line);border-radius:12px;padding:14px;margin-bottom:14px;background:var(--card)">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:8px">
        <div><b style="font-size:15px">${esc(vp.vendor)}</b><div style="font-size:12px;color:#64748b">${esc(vp.terms)}</div></div>
        <div style="text-align:right"><span class="pill ${vp.status==='In progress'?'amber':vp.status==='Awaiting payment'?'red':'green'}">${esc(vp.status)}</span></div>
      </div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px">
        <div><span style="font-size:11px;color:#64748b;text-transform:uppercase">Contract</span><div style="font-weight:800">${money(total)}</div></div>
        <div><span style="font-size:11px;color:#64748b;text-transform:uppercase">Paid</span><div style="font-weight:800;color:#15803d">${money(paid)}</div></div>
        <div><span style="font-size:11px;color:#64748b;text-transform:uppercase">Due</span><div style="font-weight:800;color:#b91c1c">${money(due)}</div></div>
        <div><span style="font-size:11px;color:#64748b;text-transform:uppercase">Retention</span><div style="font-weight:800">${money(vp.retention)}</div></div>
      </div>
      <div style="height:10px;background:#eee;border-radius:99px;overflow:hidden;margin-bottom:10px"><div class="an-fill" style="height:10px;width:${pct}%;background:${pct>=100?'#16a34a':'#2563eb'};border-radius:99px"></div></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#64748b;margin-bottom:6px"><span>Payment progress</span><b>${pct}%</b></div>
      ${rows}
      <div style="margin-top:8px;font-size:12px;color:#64748b"><b>Documents/evidence:</b> ${esc((vp.docs||[]).join(' · '))}</div>
    </div>`;
  }).join('');
}
function renderVendorPayments(){
  const el = $('vendorPayments'); if (!el) return;
  const pid = $('vpProject')?.value || (PROJECTS[0]&&PROJECTS[0].id);
  const vps = vendorPaymentsFor(pid);
  el.innerHTML = vps.length ? vendorPaymentsCards(vps) : '<div class="empty">No vendor payments recorded for this project.</div>';
  animateBars(el);
}
function fillVpProjects(){
  const sel = $('vpProject'); if (!sel) return;
  sel.innerHTML = PROJECTS.map(p=>`<option value="${esc(p.id)}">${esc(p.id)} · ${esc(p.name)}</option>`).join('');
  if (sel.options.length) sel.value = sel.options[0].value;
  if (sel.onchange) sel.onchange = renderVendorPayments;
}
/* init the record-vendor-payment form */
function initVendorPayForm(){
  const pSel = $('vpayProject'), vSel = $('vpayVendor');
  if (pSel) {
    pSel.innerHTML = PROJECTS.map(p=>`<option value="${esc(p.id)}">${esc(p.id)} · ${esc(p.name)}</option>`).join('');
    pSel.onchange = () => {
      const pid = pSel.value;
      if (vSel) {
        const vps = VENDOR_PAYMENTS.filter(vp=>vp.projectId===pid);
        const vids = [...new Set(vps.map(vp=>vp.vendorId))];
        vSel.innerHTML = '<option value="">Select vendor…</option>' +
          vids.map(vid => { const v=VENDORS.find(x=>x.id===vid); return `<option value="${esc(vid)}">${esc(v?v.name:vid)}</option>`; }).join('');
      }
    };
  }
}
function recordVendorPayment(){
  const pid=$('vpayProject')?.value, vid=$('vpayVendor')?.value,
    label=$('vpayLabel')?.value, amt=Number($('vpayAmount')?.value||0), note=$('vpayNote')?.value||'';
  const err=$('vpayMsg');
  if(!pid||!vid||!label||!(amt>0)){ if(err)err.innerHTML='<span class="err">Complete project, vendor, installment and amount.</span>'; return; }
  // find the vendor-payment record; if none, create one
  let vp = VENDOR_PAYMENTS.find(x=>x.projectId===pid && x.vendorId===vid);
  if(!vp){
    const v=VENDORS.find(x=>x.id===vid);
    vp={ id:'VP-'+String(VENDOR_PAYMENTS.length+1).padStart(3,'0'), projectId:pid, vendorId:vid, vendor:v?v.name:vid,
      contractValue:0, terms:'Custom', status:'In progress', installments:[], retention:0, docs:[] };
    VENDOR_PAYMENTS.push(vp);
  }
  const next=vp.installments.length+1;
  vp.installments.push({no:next,label:label,amount:amt,paid:amt,date:todayStr(),status:'Paid'});
  if(note) vp.docs.push(note);
  vp.status = vp.installments.reduce((a,i)=>a+i.paid,0) >= vp.contractValue && vp.contractValue>0 ? 'Complete' : 'In progress';
  ZCC.snapshot(); ZCC.logAudit(whoami(),'VENDOR_PAYMENT',`${vp.vendor} · ${pid} · ${label} ${money(amt)}`);
  if(err)err.innerHTML=`<span style="color:#16a34a">✔ Payment recorded — ${esc(label)} ${money(amt)} for ${esc(vp.vendor)}.</span>`;
  toast('Vendor payment recorded: '+vp.vendor);
  renderVendorPayments();
  const vSel=$('vpayVendor'); if(vSel) vSel.onchange && vSel.onchange();
  $('vpayLabel').value='';$('vpayAmount').value='';$('vpayNote').value='';
}

/* ============================================================
   COMPANY PAGE (31) — dedicated per-company view.
   Clicking a company folder navigates here (?company=…). Shows only
   that company's KPIs, overview, active projects, completed history,
   attention items and recent documents — minimal & concise.
   ============================================================ */
let currentCompany = '';

function companyProjects() {
  return PROJECTS.filter(p => (p.company || '') === currentCompany);
}
function companyArchived() {
  return ARCHIVE.concat(ZCC.archive()).filter(x => (x.company || '') === currentCompany);
}

function renderCompanyPage() {
  currentCompany = new URLSearchParams(location.search).get('company') || '';
  const projs = companyProjects();
  const archived = companyArchived();

  /* header */
  const t = $('companyTitle'); if (t) t.textContent = currentCompany || 'Company';
  const sub = $('companySub');
  if (sub) sub.textContent = projs.length
    ? `${projs.length} active project${projs.length===1?'':'s'} · ${archived.length} completed`
    : `${archived.length} completed project${archived.length===1?'':'s'}`;
  const pill = $('companyPill'); if (pill) pill.textContent = currentCompany || 'Company';
  const tag = $('companyScopeTag'); if (tag) tag.textContent = currentCompany;

  /* Sections that only make sense when there ARE active projects are hidden
     for an all-completed company (no meaningless 0s / empty health cards). */
  const hasActive = projs.length > 0;
  [['companyKpis', hasActive], ['companyExec', hasActive], ['companyProjects', hasActive],
   ['companyAttention', hasActive]].forEach(([id, show]) => {
    const el = $(id); if (el) el.style.display = show ? '' : 'none';
  });

  /* KPIs scoped to this company */
  const k = $('companyKpis');
  if (k && hasActive) {
    const value = projs.reduce((a, p) => a + (p.contractValue || 0), 0);
    const delayed = projs.filter(p => p.status !== 'Green').length;
    const stuck = projs.filter(p => p.daysInStage > 14).length;
    const stale = projs.filter(p => p.freshness === 'Stale').length;
    const avg = projs.length ? Math.round(projs.reduce((a, p) => a + (p.actual || 0), 0) / projs.length) : 0;
    k.innerHTML = [
      ['Active Projects', projs.length, 'int'],
      ['Portfolio Value', value, 'money'],
      ['Avg Progress', avg, 'pct'],
      ['Delayed / Watchlist', delayed, 'int'],
      ['Stages >14 Days', stuck, 'int'],
      ['Stale Updates', stale, 'int']
    ].map(x => `<div class="kpi"><span>${x[0]}</span><b data-target="${x[1]}" data-kind="${x[2]}">0</b></div>`).join('');
    k.querySelectorAll('b').forEach(runCounter);
    staggerChildren(k, 55, 8);
  }

  /* overview: health, files, payments, compliance — scoped (active only) */
  const st = $('execStatus');
  if (st && hasActive) {
    const count = s => projs.filter(p => p.status === s).length;
    const bar = (label, n, color) => `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px"><b>${label}</b><span style="color:#64748b">${n} of ${projs.length||1}</span></div><div style="height:10px;border-radius:99px;background:#eef2f7;overflow:hidden"><div class="an-fill" style="height:10px;width:${projs.length ? (n / projs.length * 100) : 0}%;background:${color};border-radius:99px"></div></div></div>`;
    st.innerHTML = projs.length
      ? bar('Green', count('Green'), '#16a34a') + bar('Amber', count('Amber'), '#f59e0b') + bar('Red', count('Red'), '#dc2626')
      : '<div class="empty">No active projects</div>';
    animateBars(st);
  }
  const fp = $('execFiles');
  if (fp && hasActive) {
    const rows = FILE_TRACKING.filter(t => t.status !== 'Green' && projs.some(p => p.id === t.projectId)).slice(0, 5)
      .map(t => `<div class="att-item" onclick="openProject('${t.projectId}')"><span class="dot ${cls(t.status)}"></span><div><h4 style="font-size:13px">${esc(t.project)}</h4><p>File at ${esc(t.office)} · ${t.daysInStage}d (SLA ${t.expectedDays}d)</p></div><span class="pill ${cls(t.status)}">${t.status}</span></div>`).join('');
    fp.innerHTML = rows || '<div class="empty">No file bottlenecks. ✅</div>';
  }
  const pm = $('execPayments');
  if (pm && hasActive) {
    const t = projs.reduce((a, p) => { const c = costInfo(p); a.certified+=c.certified; a.paid+=c.paid; a.outstanding+=c.outstanding; a.retention+=c.retention; return a; }, { certified:0, paid:0, outstanding:0, retention:0 });
    const collect = t.certified ? Math.round(t.paid / t.certified * 100) : 0;
    const kpis = [['Certified', t.certified, '#0a0a0a'], ['Paid', t.paid, '#16a34a'], ['Outstanding', t.outstanding, t.outstanding?'#dc2626':'#0a0a0a'], ['Retention', t.retention, '#0a0a0a']]
      .map(([lab, v, col]) => `<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px"><b style="color:${col}">${esc(lab)}</b><b>${money(v)}</b></div>`).join('');
    pm.innerHTML = kpis + `<div style="margin:4px 0 4px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><b>Collection rate</b><span>${collect}%</span></div></div>`;
  }
  const cd = $('execCompliance');
  if (cd && hasActive) {
    const mine = COMPLIANCE.filter(c => (c.applies || '').toUpperCase().includes(currentCompany.toUpperCase()) || !currentCompany);
    cd.innerHTML = (mine.length ? mine : COMPLIANCE).slice().sort((a,b)=>a.expInDays-b.expInDays).slice(0,5).map(c => {
      const b = expiryBand(c.expInDays);
      return `<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px dashed var(--line)"><span style="font-size:13px">${esc(c.item)}</span><span class="pill ${b.cls}">${c.expInDays < 0 ? 'Expired' : c.expInDays + 'd'}</span></div>`;
    }).join('') || '<div class="empty">No compliance items</div>';
  }

  /* active projects grid */
  const grid = $('companyProjectGrid');
  const psub = $('companyProjectsSub');
  if (grid && hasActive) {
    grid.innerHTML = projs.map(card).join('') || '<div class="empty" style="grid-column:1/-1">No active projects.</div>';
    staggerChildren(grid, 55, 9);
    animateFills(grid);
  }
  if (psub) psub.textContent = projs.length ? `${projs.length} active project${projs.length===1?'':'s'} currently running.` : '';

  /* completed history (year-grouped, minimal) */
  const comp = $('companyCompleted');
  if (comp) {
    if (!archived.length) { comp.innerHTML = ''; }
    else {
      const byYear = {};
      archived.forEach(x => { const y = x.year || String(new Date(x.completed||Date.now()).getFullYear()); (byYear[y]=byYear[y]||[]).push(x); });
      const years = Object.keys(byYear).sort((a,b)=>b-a);
      const docLinks = x => (x.docs||[]).map(f => `<a class="download-btn" href="${esc(f)}" target="_blank">Doc</a>`).join(' ');
      comp.innerHTML = `<div class="section-head"><div><h2>Completed</h2><p>${archived.length} completed projects, by year. Click any row to view full details.</p></div></div>` +
        years.map(y => `<div style="margin-bottom:16px"><h3 style="margin:0 0 8px;font-size:16px;color:#0a0a0a">${y} <span style="color:#64748b;font-size:12px">· ${byYear[y].length} completed</span></h3><table class="file-table"><thead><tr><th>Project</th><th>Photo</th><th>Client</th><th>Value</th><th>Retention</th><th>Docs</th></tr></thead><tbody>` +
          byYear[y].map(x => {
            const ph = (PROJECT_PHOTO && PROJECT_PHOTO[x.id]) || [];
            const thumbs = ph.length ? `<div class="thumb-row">${ph.slice(0,3).map(u => `<img class="photo-thumb" src="${esc(u)}" alt="${esc(x.name)}" onclick="event.stopPropagation();window.open('${esc(u)}','_blank')">`).join('')}</div>` : '<span style="color:#64748b;font-size:11px">—</span>';
            return `<tr onclick="openArchivedProject('${esc(x.id)}')"><td><b>${esc(x.name)}</b><br><span style="color:#64748b">${esc(x.id)} · ${esc(x.sector)}</span></td><td>${thumbs}</td><td>${esc(x.client)}</td><td>${money(x.contractValue)}</td><td><span class="pill green">${esc(x.retentionReleased)}</span></td><td><div style="display:flex;gap:6px;flex-wrap:wrap" onclick="event.stopPropagation()">${docLinks(x)}</div></td></tr>`;
          }).join('') +
          `</tbody></table></div>`).join('');
    }
  }

  /* management attention — scoped */
  const att = $('companyAttentionList');
  if (att) {
    const arr = projs.filter(p => p.status !== 'Green' || p.escalate === 'Yes' || p.freshness === 'Stale' || p.daysInStage > 14)
      .sort((a,b) => orderStatus(b.status)-orderStatus(a.status) || b.delayDays-a.delayDays);
    att.innerHTML = arr.length ? arr.map(p => `<div class="att-item" onclick="openProject('${p.id}')"><span class="dot ${cls(p.status)}"></span><div><h4>${esc(p.name)}</h4><p>${esc(p.issue)}<br><b>Action:</b> ${esc(p.action)}</p></div><div style="text-align:right"><span class="pill ${cls(p.status)}">${p.status}</span><br><span style="color:#64748b;font-size:12px">${p.delayDays} days</span></div></div>`).join('') : '<div class="empty">No attention items. ✅</div>';
    staggerChildren(att, 60, 8);
  }

  /* recent documents — scoped to this company's project ids */
  const ids = new Set(projs.map(p => p.id));
  const du = $('docUploads');
  if (du) {
    const rows = DOCUMENTS.filter(d => ids.has(d.projectId)).slice().sort((a,b) => String(b.uploadedAt||b.date).localeCompare(String(a.uploadedAt||a.date))).map(d => {
      const fileCell = d.file && d.file !== '#' && d.file !== ''
        ? `<div style="display:flex;gap:8px;flex-wrap:wrap" onclick="event.stopPropagation()"><a class="download-btn" href="${esc(d.file)}" target="_blank">Open</a><a class="download-btn primary" href="${esc(d.file)}" download>Download</a></div>`
        : '<span style="color:#64748b;font-size:12px">No file</span>';
      return `<tr><td><b>${esc(d.title)}</b><br><span style="color:#64748b">${esc(d.documentId)} · ${esc(d.type)}</span></td><td>${esc(d.projectName)}</td><td><b>${esc(d.owner)}</b></td><td><span style="color:#475569">${esc(d.uploadedAt||d.date)}</span></td><td>${fileCell}</td></tr>`;
    }).join('');
    du.innerHTML = rows.length ? `<table class="file-table"><thead><tr><th>Document</th><th>Project</th><th>Uploaded By</th><th>Timestamp</th><th>File</th></tr></thead><tbody>${rows}</tbody></table>` : '<div class="empty">No documents for this company yet.</div>';
  }
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

  /* role-restricted page guard — e.g. the MD-only document archive.
     Redirects anyone without the required role to their home portal. */
  if (PAGE_ACCESS[page] && !PAGE_ACCESS[page].includes(user.role)) {
    location.href = ZCC.homeFor(user); return;
  }

  buildShell(user, app, page);
  bindGlobalSearch();
  /* render the shared company-folder strip if present on this page */
  if ($('companyStrip')) renderCompanyFolders();

  /* Google Sheet data source (Trev-style). Loads pilot/sheet data then
     re-renders so sheet changes appear without redeploy. */
  if (typeof loadZonexaSheet === 'function') {
    loadZonexaSheet().then(() => {
      if ($('companyStrip') || document.getElementById('companyGrid')) renderCompanyFolders();
      if (page === 'dashboard') { renderKpis(); renderAttention(); renderExecutiveSummary(); renderEscalationCount(); renderNotificationBell(); }
      if (page === 'projects') renderProjects();
      if (page === 'archive') renderArchive();
      if (page === 'company') renderCompanyPage();
      if (page === 'documents') { renderFileTable(); renderDocRegister(); }
      if (page === 'doc-manage') renderDocManage();
    });
  }

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
      renderKpis(); populate(); renderCompanyFolders(); renderAttention(); bindCC();
      renderDocUploads();
      renderCloseArchive();
      renderExecutiveSummary();
      renderEscalationCount();
      renderNotificationBell();
      if (user.role === 'MD') { const a = $('approvals'); if (a) a.style.display = 'block'; renderApprovalsInbox(); }
      break;
    case 'projects':
      populate(); renderCompanyFolders(); renderProjects(); bindCC(); break;
    case 'documents':
      renderFileTable(); renderDocRegister(); bindDocSearch(); bindCC(); break;
    case 'doc-manage':
      renderDocManage(); bindCC(); break;
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
    case 'constr-analytics':
      renderConstrAnalytics(); bindCC(); break;
    case 'company':
      renderCompanyPage(); bindCC(); break;
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
      fillProjectOptions('payProject'); fillProjectOptions('acctDocProject');
      renderAccountsDash(); fillVpProjects(); renderVendorPayments(); initVendorPayForm();
      renderDocUploads(); bindCC(); break;
    case 'accounts-ret':
      renderRetentionRegister(); bindCC(); break;
    /* ---- Admin Console ---- */
    case 'admin-console':
      renderAdminConsole(); break;
  }

  /* entrances play only during the initial render window */
  setTimeout(() => { ANIMATE_INIT = false; }, 1600);
  setTimeout(initScrollReveal, 200);
  maybeTour(app);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
