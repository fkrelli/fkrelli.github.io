/* Francesco Capparelli — sito personale
 * Lingua (IT/EN) automatica con scelta manuale, tema chiaro/scuro, animazioni e modulo contatti.
 * Nessuna libreria esterna, nessun cookie: solo localStorage per lingua e tema. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* modalità privata */ } }
  };

  /* ------------------------------------------------------------------ testi */

  var EN = {
    'skip': 'Skip to content',
    'nav.services': 'Services', 'nav.skills': 'Skills', 'nav.experience': 'Experience', 'nav.education': 'Education', 'nav.contact': 'Contact',
    'theme.toggle': 'Toggle light/dark theme', 'menu': 'Open menu',
    'hero.available': 'Available for consulting and training',
    'hero.lead': 'I help companies and professionals protect their systems and data, comply with ISO/IEC 27001, NIS2, GDPR and the EU AI Act, and adopt Artificial Intelligence safely. 10+ years across software engineering, security governance and training, in English and Italian.',
    'cta.talk': "Let's talk about your project", 'cta.services': 'Explore services', 'cta.float': 'Get in touch',
    'stat.years': 'years of experience across software, security and AI',
    'stat.academy': 'agentic AI reskilling programme led',
    'stat.people': 'employees per organisation trained in security awareness',
    'stat.langs': 'teaching languages: English and Italian',
    'services.kicker': 'Services',
    'services.title': 'Security, compliance and AI, from strategy to practice',
    'services.lead': 'One point of contact combining governance, hands-on expertise and the ability to pass it on to people.',
    's1.title': 'Cybersecurity &amp; Compliance', 's1.text': 'Compliance programmes that are concrete, measurable and sustainable over time.',
    's1.l1': 'ISO/IEC 27001 gap analysis and implementation', 's1.l2': 'NIS2 Directive and GDPR alignment',
    's1.l3': 'Business impact analysis, business continuity and disaster recovery', 's1.l4': 'Internal audits according to ISO 19011',
    's2.title': 'Security Operations', 's2.text': 'Finding vulnerabilities before others do, and knowing how to respond.',
    's2.l1': 'Vulnerability assessment and penetration testing', 's2.l2': 'Red teaming and threat intelligence',
    's2.l3': 'SOC design and management, incident response and playbooks', 's2.l4': 'Hardening of servers, networks, identities and email',
    's3.title': 'Artificial Intelligence', 's3.text': 'AI that serves the business, designed to be secure and compliant.',
    's3.l1': 'Agentic AI, Model Context Protocol (MCP) and RAG', 's3.l2': 'LLM integration into business processes',
    's3.l3': 'AI security: adversarial attacks, data poisoning, model inversion', 's3.l4': 'EU AI Act, NIST AI RMF and ISO/IEC 42001',
    's4.title': 'Training', 's4.text': 'Executive, corporate and university courses, in English and Italian.',
    's4.l1': 'Cybersecurity, NIS2 and awareness for management and staff', 's4.l2': 'Agentic AI, data science and deep learning with Python',
    's4.l3': 'Software development methodologies: Agile, Scrum, design patterns', 's4.l4': 'Simulated phishing campaigns with improvement plans',
    's5.title': 'Technology &amp; Product', 's5.text': 'Technology strategy and software products built to scale.',
    's5.l1': 'IT strategy, enterprise architecture and governance', 's5.l2': 'Product ownership of B2B SaaS platforms',
    's5.l3': 'Full-stack development with Java/Spring, Vaadin, Vue.js', 's5.l4': 'Migrations to Microsoft 365 and Azure',
    's6.title': 'Data &amp; Business Intelligence', 's6.text': 'From raw data to informed decisions.',
    's6.l1': 'Dashboards and reports with Tableau and Power BI', 's6.l2': 'Data warehousing, OLAP and data integration',
    's6.l3': 'Big data with Hadoop, Spark and Hive', 's6.l4': 'Data analysis and machine learning with Python',
    'skills.kicker': 'Skills', 'skills.title': 'A hybrid profile: governance, engineering and teaching',
    'k.sec': 'Cybersecurity &amp; Governance', 'k.tools': 'Tools &amp; Infrastructure', 'k.ai': 'AI &amp; Data Science',
    'k.sw': 'Software Engineering', 'k.data': 'Data &amp; Cloud', 'k.lead': 'Leadership &amp; Methods',
    'k.sec.d': 'Security management systems, regulatory compliance and risk management.',
    'k.tools.d': 'Offensive and defensive tooling, infrastructure and cloud.',
    'k.ai.d': 'From generative and agentic AI to model security.',
    'k.sw.d': 'Design and development of enterprise and SaaS applications.',
    'k.data.d': 'Data analytics, big data, DevOps and cloud platforms.',
    'k.lead.d': 'Leading teams, products and budgets with method.',
    'k.lead.1': 'IT strategy &amp; governance', 'k.lead.2': 'Enterprise architecture', 'k.lead.3': 'IT budgeting',
    'k.lead.4': 'Risk management', 'k.lead.5': 'Technical training &amp; executive coaching',
    'exp.kicker': 'Experience', 'exp.title': 'Ten years across code, security and people', 'tag.current': 'Current',
    'e1.date': '2024 — present', 'e1.role': 'Corporate Trainer &amp; University Lecturer', 'e1.org': 'Self-employed · remote and on-site',
    'e1.text': 'I design and deliver executive, corporate and academic programmes in English and Italian on cybersecurity, AI and software engineering, for training providers, multinationals and international agencies. Lecturer of a 30-ECTS undergraduate course on software development methodologies, lead of a 440-hour programme on agentic AI, MCP, RAG and AI security, lecturer in Cybersecurity &amp; Ethical Hacking master’s programmes and in courses for IT managers and CISOs.',
    'e2.date': '2023 — present', 'e2.role': 'Head of Technology Development',
    'e2.text': 'I set the medium- and long-term technology strategy, lead R&amp;D and digital transformation projects with cross-functional teams and budgets, and own corporate cybersecurity governance.',
    'e3.date': '2023 — present', 'e3.role': 'Co-Founder &amp; Product Owner', 'e3.org': 'Smick SRL · innovative startup · Cosenza',
    'e3.text': 'B2B SaaS platform for digital process management in SMEs: shift planning, HR, attendance, health &amp; safety and logistics. I own the full product lifecycle and coordinate full-stack development with Spring Boot, Vaadin and Vue.js.',
    'e4.date': '2023 — present', 'e4.role': 'Founder &amp; CEO', 'e4.org': 'Synedrio SRLS · Cosenza',
    'e4.text': 'Flexible workspaces and hybrid-work services for businesses: strategy, P&amp;L, B2B sales and operations.',
    'e5.date': '2022 — present', 'e5.role': 'Cybersecurity &amp; AI Consultant', 'e5.org': 'Self-employed · Rende',
    'e5.text': 'Strategic and hands-on consulting for companies: gap analysis, BIA and roadmaps towards ISO/IEC 27001 and NIS2; VA/PT, SOC workflows, business continuity and disaster recovery plans; training and simulated phishing for up to 200 employees per organisation; migrations to Microsoft 365 and Azure.',
    'e6.role': 'IT Manager &amp; Cybersecurity Consultant',
    'e6.text': 'Strategic and operational IT initiatives, infrastructure upgrades for continuity and security, budget management and authoring of policies, protocols and standard operating procedures.',
    'e7.role': 'Cybersecurity Analyst',
    'e7.text': 'Consulting for large international telecommunications operators: ISO/IEC 27001 and NIST CSF gap analyses, vulnerability management, incident response support and cloud migrations to Microsoft Azure.',
    'e8.role': 'Full-Stack Web Developer', 'e8.org': 'Self-employed',
    'e8.text': 'Design and development of custom ERPs, e-commerce and web management systems for quoting, workforce scheduling, access control, attendance and warehouse logistics.',
    'edu.kicker': 'Education', 'edu.title': 'Studies, languages and commitment',
    'edu1.title': "Master's Degree in Computer Science — Network &amp; Security", 'edu1.org': 'University of Calabria · taught in English',
    'edu1.thesis': 'Thesis: “Adapting the Corporate Perimeter to Security Standards in an Industrial Context”, developed with a cybersecurity centre of excellence.',
    'edu2.title': "Bachelor's Degree in Computer Science",
    'edu2.text': 'Solid foundations in programming, algorithms, networks, databases, software engineering and artificial intelligence.',
    'lang.title': 'Languages', 'lang.text': 'Italian native. Professional English (B2): university teaching and international corporate training delivered in English.',
    'vol1.title': 'Cultural associations', 'vol1.text': 'President of a non-profit social association: people management, planning, budgeting and institutional relations.',
    'vol2.title': 'Education and scouting', 'vol2.text': 'National General Council member and educator at AGESCI (Italian Catholic Guides and Scouts): coordinating educator teams and youth training programmes.',
    'how.kicker': 'How I work', 'how.title': 'Four steps, no needless jargon',
    'how1.t': 'Listen and assess', 'how1.d': 'I understand goals, constraints and starting point through a focused gap analysis.',
    'how2.t': 'Plan', 'how2.d': 'A roadmap with priorities, costs and realistic timelines that management can follow.',
    'how3.t': 'Deliver', 'how3.d': 'I implement solutions with your team and train the people who will run them.',
    'how4.t': 'Improve', 'how4.d': 'I measure results, keep compliance on track and update defences over time.',
    'c.kicker': 'Contact', 'c.title': "Let's talk about your project",
    'c.lead': 'Pick a topic, tell me in a couple of lines what you need and I will reply personally.',
    't1.t': 'Cybersecurity consulting', 't1.d': 'ISO 27001, NIS2, GDPR, VA/PT',
    't2.t': 'Artificial Intelligence project', 't2.d': 'Agentic AI, MCP, RAG, EU AI Act',
    't3.t': 'Course or lecturing', 't3.d': 'Companies, academies, universities, in EN or IT',
    't4.t': 'Something else', 't4.d': 'Speaking, partnerships, product',
    'f.name': 'Full name', 'f.company': 'Company (optional)', 'f.topic': 'Topic', 'f.msg': 'What do you need?',
    'f.msg.ph': 'E.g. we need to comply with NIS2 by year end and do not know where to start.',
    'f.send': 'Send message', 'f.linkedin': 'Message me on LinkedIn',
    'f.note': 'The message opens in your email app: this site does not store or send any data.',
    'ft.role': 'Cybersecurity and Artificial Intelligence consulting and training', 'ft.type': 'Sole proprietorship',
    'ft.privacy': 'No cookies or tracking: the site only remembers your language and theme, in your browser.'
  };

  var EXTRA = {
    it: {
      title: 'Francesco Capparelli · Cybersecurity & AI',
      roles: ['Consulente Cybersecurity & AI', 'Head of Technology', 'Formatore aziendale e docente universitario', 'Product Owner di piattaforme SaaS', 'Esperto di conformità ISO 27001 e NIS2'],
      terminal: [
        ['k', '$ ', 'audit --standard iso27001 --scope azienda'],
        ['ok', '✔ ', 'controlli Annex A mappati, gap individuati'],
        ['k', '$ ', 'nis2 --roadmap --priorità alta'],
        ['ok', '✔ ', 'piano di adeguamento pronto per il management'],
        ['k', '$ ', 'agent.run(mcp=true, rag=true)'],
        ['ok', '✔ ', 'agente AI verificato secondo EU AI Act'],
        ['k', '$ ', 'formazione --awareness --phishing-sim'],
        ['ok', '✔ ', 'persone più consapevoli, rischio ridotto']
      ],
      langBtn: 'EN', langLabel: 'Switch to English',
      sent: 'Si sta aprendo il tuo programma di posta con il messaggio pronto.',
      missing: 'Inserisci nome e messaggio per continuare.',
      subject: 'Richiesta dal sito', themeLight: 'Tema chiaro', themeDark: 'Tema scuro',
      topics: { security: 'Consulenza cybersecurity', ai: 'Progetto di Intelligenza Artificiale', training: 'Corso o docenza', other: 'Altro' },
      greeting: 'Ciao Francesco,', from: 'Nome', company: 'Azienda'
    },
    en: {
      title: 'Francesco Capparelli · Cybersecurity & AI',
      roles: ['Cybersecurity & AI Consultant', 'Head of Technology', 'Corporate Trainer & University Lecturer', 'SaaS Product Owner', 'ISO 27001 & NIS2 compliance expert'],
      terminal: [
        ['k', '$ ', 'audit --standard iso27001 --scope company'],
        ['ok', '✔ ', 'Annex A controls mapped, gaps identified'],
        ['k', '$ ', 'nis2 --roadmap --priority high'],
        ['ok', '✔ ', 'compliance plan ready for management'],
        ['k', '$ ', 'agent.run(mcp=true, rag=true)'],
        ['ok', '✔ ', 'AI agent assessed against the EU AI Act'],
        ['k', '$ ', 'training --awareness --phishing-sim'],
        ['ok', '✔ ', 'more aware people, lower risk']
      ],
      langBtn: 'IT', langLabel: 'Passa all’italiano',
      sent: 'Your email app is opening with the message ready to send.',
      missing: 'Please enter your name and a message to continue.',
      subject: 'Website enquiry', themeLight: 'Light theme', themeDark: 'Dark theme',
      topics: { security: 'Cybersecurity consulting', ai: 'Artificial Intelligence project', training: 'Course or lecturing', other: 'Something else' },
      greeting: 'Hi Francesco,', from: 'Name', company: 'Company'
    }
  };

  // I testi italiani sono quelli scritti nella pagina: si leggono una volta all'avvio.
  var IT = {};
  var i18nNodes = document.querySelectorAll('[data-i18n]');
  i18nNodes.forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (!(key in IT)) IT[key] = el.innerHTML;
  });
  var IT_ATTR = {};
  document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
    el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
      var p = pair.split(':');
      IT_ATTR[p[1]] = el.getAttribute(p[0]);
    });
  });

  var lang = root.getAttribute('lang') === 'en' ? 'en' : 'it';

  function applyLang(next, persist) {
    lang = next;
    var dict = lang === 'en' ? EN : IT;
    i18nNodes.forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n')];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':');
        var v = lang === 'en' ? EN[p[1]] : IT_ATTR[p[1]];
        if (v != null) el.setAttribute(p[0], v.replace(/&amp;/g, '&'));
      });
    });
    var x = EXTRA[lang];
    root.setAttribute('lang', lang);
    document.title = x.title;
    var btn = document.getElementById('lang-toggle');
    btn.textContent = x.langBtn;
    btn.setAttribute('aria-label', x.langLabel);
    if (persist) store.set('fc-lang', lang);
    restartTyping();
    restartTerminal();
  }

  /* ------------------------------------------------------------------ tema */

  var themeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function resolvedTheme() {
    var t = root.getAttribute('data-theme');
    return t ? t : (themeQuery.matches ? 'dark' : 'light');
  }

  function syncTheme() {
    root.setAttribute('data-theme-resolved', resolvedTheme());
  }

  function toggleTheme() {
    var next = resolvedTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store.set('fc-theme', next);
    syncTheme();
    toast(next === 'dark' ? EXTRA[lang].themeDark : EXTRA[lang].themeLight);
  }

  themeQuery.addEventListener('change', function () {
    if (!store.get('fc-theme')) syncTheme();
  });

  /* ------------------------------------------------------------------ ruoli che si scrivono */

  var typedEl = document.getElementById('typed-text');
  var typingTimer = null;

  function restartTyping() {
    clearTimeout(typingTimer);
    var roles = EXTRA[lang].roles;
    if (reduceMotion) { typedEl.textContent = roles[0]; return; }
    var r = 0, i = 0, deleting = false;
    (function tick() {
      var word = roles[r];
      i += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, i);
      var delay = deleting ? 28 : 55;
      if (!deleting && i === word.length) { deleting = true; delay = 2200; }
      else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
      typingTimer = setTimeout(tick, delay);
    })();
  }

  /* ------------------------------------------------------------------ terminale */

  var term = document.getElementById('terminal');
  var termTimers = [];

  function restartTerminal() {
    termTimers.forEach(clearTimeout);
    termTimers = [];
    term.innerHTML = '';
    var lines = EXTRA[lang].terminal;
    function render(loop) {
      term.innerHTML = '';
      lines.forEach(function (l, idx) {
        var div = document.createElement('div');
        div.className = 'line';
        var mark = document.createElement('span');
        mark.className = l[0];
        mark.textContent = l[1];
        div.appendChild(mark);
        div.appendChild(document.createTextNode(l[2]));
        term.appendChild(div);
        if (reduceMotion) { div.classList.add('show'); return; }
        termTimers.push(setTimeout(function () { div.classList.add('show'); }, 500 + idx * 650));
      });
      if (!reduceMotion && loop) {
        termTimers.push(setTimeout(function () { render(true); }, 500 + lines.length * 650 + 4500));
      }
    }
    render(true);
  }

  /* ------------------------------------------------------------------ rete animata (hero) */

  function startNetwork() {
    var canvas = document.getElementById('net');
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var pts = [], w = 0, h = 0, running = true, mouse = { x: -9999, y: -9999 };

    function resize() {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(90, Math.round(w * h / 16000));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.6 + .8 });
      }
    }

    function frame() {
      if (!running) return;
      var cs = getComputedStyle(root);
      var dot = cs.getPropertyValue('--net-dot').trim();
      var line = cs.getPropertyValue('--net-line').trim();
      ctx.clearRect(0, 0, w, h);
      var max = 130;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        var dxm = p.x - mouse.x, dym = p.y - mouse.y, dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < 140) { p.x += dxm / dm * .6; p.y += dym / dm * .6; }
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < max) {
            ctx.strokeStyle = 'rgba(' + line + ',' + (0.18 * (1 - d / max)).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = dot;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    canvas.parentElement.addEventListener('pointermove', function (e) {
      var r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    canvas.parentElement.addEventListener('pointerleave', function () { mouse.x = mouse.y = -9999; });
    new IntersectionObserver(function (entries) {
      var vis = entries[0].isIntersecting;
      if (vis && !running) { running = true; requestAnimationFrame(frame); }
      running = vis;
    }).observe(canvas);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) running = false;
      else { running = true; requestAnimationFrame(frame); }
    });
    requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------------ comparsa allo scroll e contatori */

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduceMotion) { el.textContent = target; return; }
    var start = performance.now(), dur = 1600;
    (function step(now) {
      var t = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }

  function startReveal() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        e.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) {
      // la prima schermata compare subito, senza aspettare l'osservatore
      if (el.closest('.hero')) {
        requestAnimationFrame(function () { el.classList.add('visible'); });
        setTimeout(function () { el.classList.add('visible'); }, 60);
      } else {
        io.observe(el);
      }
    });
  }

  /* ------------------------------------------------------------------ navigazione */

  function startNav() {
    var nav = document.getElementById('nav');
    var floatCta = document.getElementById('float-cta');
    var contact = document.getElementById('contatti');
    var progress = document.getElementById('timeline-progress');
    var timeline = document.getElementById('timeline');

    function onScroll() {
      var y = window.scrollY;
      nav.classList.toggle('scrolled', y > 20);
      var contactTop = contact.getBoundingClientRect().top;
      floatCta.classList.toggle('show', y > window.innerHeight * 0.9 && contactTop > window.innerHeight * 0.6);
      var r = timeline.getBoundingClientRect();
      var seen = Math.min(Math.max(window.innerHeight * 0.7 - r.top, 0), r.height - 12);
      progress.style.height = seen + 'px';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var links = document.querySelectorAll('.nav-links a');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });

    var menuBtn = document.getElementById('menu-toggle');
    var menu = document.getElementById('mobile-menu');
    function setMenu(open) {
      menu.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    }
    menuBtn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ------------------------------------------------------------------ competenze (schede) */

  function startTabs() {
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function (tab, idx) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var next = tabs[(idx + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        next.focus(); select(next);
      });
      if (idx > 0) tab.setAttribute('tabindex', '-1');
    });
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.setAttribute('tabindex', on ? '0' : '-1');
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        panel.classList.toggle('active', on);
      });
      var chips = document.getElementById(tab.getAttribute('aria-controls')).querySelectorAll('.chip');
      chips.forEach(function (c, i) { c.style.transitionDelay = (reduceMotion ? 0 : i * 30) + 'ms'; });
    }
    var first = document.querySelector('.skill-panel.active');
    if (first) first.querySelectorAll('.chip').forEach(function (c, i) { c.style.transitionDelay = i * 30 + 'ms'; });
  }

  /* ------------------------------------------------------------------ effetto luce sulle schede servizi */

  function startCardGlow() {
    if (reduceMotion) return;
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = e.clientX - r.left, y = e.clientY - r.top;
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
        var rx = ((y / r.height) - .5) * -4, ry = ((x / r.width) - .5) * 4;
        card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }

  /* ------------------------------------------------------------------ contatti */

  function startContact() {
    var form = document.getElementById('contact-form');
    var select = form.querySelector('select[name="topic"]');
    var feedback = document.getElementById('form-feedback');
    var topics = document.querySelectorAll('.topic');

    function markTopic(value) {
      topics.forEach(function (t) { t.setAttribute('aria-pressed', String(t.getAttribute('data-topic') === value)); });
    }
    topics.forEach(function (t) {
      t.addEventListener('click', function () {
        select.value = t.getAttribute('data-topic');
        markTopic(select.value);
        form.querySelector('textarea').focus({ preventScroll: true });
        form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      });
    });
    select.addEventListener('change', function () { markTopic(select.value); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var x = EXTRA[lang];
      // form.elements: "form.name" restituirebbe il nome del form, non il campo
      var name = form.elements.namedItem('name').value.trim();
      var company = form.elements.namedItem('company').value.trim();
      var msg = form.elements.namedItem('message').value.trim();
      if (!name || !msg) { feedback.textContent = x.missing; return; }
      var topic = x.topics[select.value] || select.value;
      var subject = x.subject + ' — ' + topic;
      var body = x.greeting + '\n\n' + msg + '\n\n— ' + x.from + ': ' + name + (company ? '\n— ' + x.company + ': ' + company : '');
      // l'indirizzo non compare come testo nella pagina: si compone solo qui
      var addr = ['capparelli', 'fnc'].join('.') + '@' + ['gmail', 'com'].join('.');
      window.location.href = 'mailto:' + addr + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      feedback.textContent = x.sent;
    });
  }

  /* ------------------------------------------------------------------ avvisi */

  var toastTimer = null;
  function toast(text) {
    var el = document.getElementById('toast');
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 1800);
  }

  /* ------------------------------------------------------------------ avvio */

  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('lang-toggle').addEventListener('click', function () {
    applyLang(lang === 'it' ? 'en' : 'it', true);
    toast(lang === 'en' ? 'English' : 'Italiano');
  });

  syncTheme();
  applyLang(lang, false);
  startNetwork();
  startReveal();
  startNav();
  startTabs();
  startCardGlow();
  startContact();
})();
