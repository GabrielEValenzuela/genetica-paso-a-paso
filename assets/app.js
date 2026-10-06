(function () {
  'use strict';

  /* ---------------- Utilidades ---------------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('bioweb:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('bioweb:' + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, attrs = {}, html = '') => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    if (html) n.innerHTML = html;
    return n;
  };
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const LETTERS = ['A', 'B', 'C', 'D'];

  /* ---------------- Tema ---------------- */
  const root = document.documentElement;
  const savedTheme = store.get('theme', null);
  if (savedTheme) root.dataset.theme = savedTheme;
  $('#themeBtn').addEventListener('click', () => {
    const isDark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = isDark ? 'light' : 'dark';
    store.set('theme', root.dataset.theme);
  });

  /* ---------------- Navegación ---------------- */
  const pages = Array.from(document.querySelectorAll('.page'));
  const navLinks = Array.from(document.querySelectorAll('#nav a'));
  const doneSet = new Set(store.get('done', []));

  function refreshDone() {
    navLinks.forEach(a => a.classList.toggle('done', doneSet.has(a.getAttribute('href').slice(1))));
  }

  pages.forEach((p, i) => {
    if (['ciclo', 'cromosoma', 'vocabulario', 'mendel', 'extension', 'metodo', 'resueltos'].includes(p.id)) {
      const b = el('button', { class: 'btn ghost done-btn', type: 'button' });
      const paint = () => { b.textContent = doneSet.has(p.id) ? '✓ Sección estudiada (tocá para desmarcar)' : 'Marcar esta sección como estudiada'; };
      paint();
      b.addEventListener('click', () => {
        doneSet.has(p.id) ? doneSet.delete(p.id) : doneSet.add(p.id);
        store.set('done', [...doneSet]); paint(); refreshDone();
      });
      p.appendChild(b);
    }
    const pager = el('nav', { class: 'pager', 'aria-label': 'Navegación entre secciones' });
    const prev = pages[i - 1], next = pages[i + 1];
    pager.appendChild(prev ? el('a', { class: 'btn ghost', href: '#' + prev.id }, '← ' + prev.dataset.title) : el('span'));
    if (next) pager.appendChild(el('a', { class: 'btn', href: '#' + next.id }, next.dataset.title + ' →'));
    p.appendChild(pager);
  });

  function show() {
    const id = location.hash.slice(1) || 'inicio';
    const target = pages.find(p => p.id === id) || pages[0];
    pages.forEach(p => { p.hidden = p !== target; });
    navLinks.forEach(a => {
      const on = a.getAttribute('href') === '#' + target.id;
      if (on) { a.setAttribute('aria-current', 'page'); a.scrollIntoView({ block: 'nearest', inline: 'center' }); }
      else a.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
    if (target.id === 'repaso') renderSemaforo($('#semDespues'), 'despues');
  }
  window.addEventListener('hashchange', show);
  refreshDone();

  /* ---------------- Semáforo ---------------- */
  const TOPICS = [
    'Ciclo celular: interfase (G1, S, G2) y fase M',
    'Mitosis vs meiosis (cuadro comparativo)',
    'Estructura del cromosoma',
    'ADN, replicación y código genético',
    'Homólogos y heterólogos',
    'Locus, alelo, genotipo y fenotipo',
    'Dominancia, recesividad, homo y heterocigosis',
    'Leyes de Mendel (y en qué momento de la meiosis se cumplen)',
    'Cuadro de Punnett y probabilidades',
    'Dominancia incompleta y codominancia',
    'Grupos sanguíneos ABO y paternidad',
    'Herencia ligada al X e influida por el sexo',
    'Alteraciones cromosómicas'
  ];
  const SEM = [['r', '🔴'], ['y', '🟡'], ['v', '🟢']];
  const SEM_LABEL = { r: '🔴', y: '🟡', v: '🟢' };

  function renderSemaforo(container, key) {
    const data = store.get('sem-' + key, {});
    const before = key === 'despues' ? store.get('sem-antes', {}) : null;
    container.innerHTML = '';
    TOPICS.forEach((t, i) => {
      const row = el('div', { class: 'sem-row' });
      row.appendChild(el('div', { class: 'sem-name' }, t));
      const btns = el('div', { class: 'sem-btns', role: 'group', 'aria-label': t });
      SEM.forEach(([cls, icon]) => {
        const b = el('button', { type: 'button', class: cls, 'aria-pressed': String(data[i] === cls) }, icon);
        b.addEventListener('click', () => {
          data[i] = cls; store.set('sem-' + key, data);
          btns.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        });
        btns.appendChild(b);
      });
      row.appendChild(btns);
      if (before) row.appendChild(el('div', { class: 'sem-before' }, 'Al empezar: ' + (before[i] ? SEM_LABEL[before[i]] : 'sin marcar')));
      container.appendChild(row);
    });
  }
  renderSemaforo($('#semAntes'), 'antes');

  /* ---------------- Cuadro de Punnett (render) ---------------- */
  function punnettHTML(g) {
    let h = '<div class="punnett-wrap"><table class="punnett"><tr><th class="corner">gametos</th>';
    g.top.forEach(x => { h += `<th>${x}</th>`; });
    h += '</tr>';
    g.left.forEach((l, r) => {
      h += `<tr><th>${l}</th>`;
      g.cells[r].forEach((c, k) => { h += `<td>${c}${g.ph ? `<small>${g.ph[r][k]}</small>` : ''}</td>`; });
      h += '</tr>';
    });
    return h + '</table></div>';
  }

  /* ---------------- Problemas resueltos ---------------- */
  const probIndex = $('#probIndex'), probList = $('#probList');
  PROBLEMS.forEach((p, n) => {
    probIndex.appendChild(el('a', { href: '#resueltos', onclick: (e) => { e.preventDefault(); document.getElementById('prob-' + p.id).scrollIntoView({ behavior: 'smooth' }); } },
      `<span class="n">${n + 1}</span><span>${p.title} <span class="badge lv-${p.level}">${p.level}</span></span>`));

    const card = el('article', { class: 'card', id: 'prob-' + p.id });
    card.innerHTML = `
      <div><span class="badge lv-${p.level}">${p.level}</span><span class="badge">${p.tema}</span></div>
      <h3 style="margin-top:.5rem">${n + 1}. ${p.title}</h3>
      <p>${p.enunciado}</p>
      <div class="box think"><span class="box-title">🧭 Antes de mirar</span>${p.antes}</div>
      <div class="steps"></div>
      <div class="btn-row"></div>`;
    const stepsBox = card.querySelector('.steps');
    const row = card.querySelector('.btn-row');
    let shown = 0;
    const nextBtn = el('button', { class: 'btn', type: 'button' });
    const resetBtn = el('button', { class: 'btn ghost', type: 'button' }, 'Reiniciar');
    const paint = () => {
      if (shown < p.steps.length) nextBtn.textContent = `Mostrar paso ${shown + 1} de ${p.steps.length}`;
      else if (shown === p.steps.length) nextBtn.textContent = 'Ver respuesta final';
      nextBtn.hidden = shown > p.steps.length;
      resetBtn.hidden = shown === 0;
    };
    nextBtn.addEventListener('click', () => {
      if (shown < p.steps.length) {
        const s = p.steps[shown];
        const d = el('div', { class: 'step' });
        let h = `<h4>Paso ${shown + 1} · ${s.t}</h4>`;
        if (s.p) h += `<div class="row"><span class="tag p">🧠 Lo que pienso:</span> ${s.p}</div>`;
        if (s.grid) h += punnettHTML(s.grid);
        if (s.w) h += `<div class="row"><span class="tag w">💡 Por qué:</span> ${s.w}</div>`;
        if (s.c) h += `<div class="row"><span class="tag c">🔍 Cómo me controlo:</span> ${s.c}</div>`;
        d.innerHTML = h;
        stepsBox.appendChild(d);
      } else {
        stepsBox.appendChild(el('div', { class: 'final' }, `<b>✅ Respuesta</b><br>${p.respuesta}`));
      }
      shown++; paint();
    });
    resetBtn.addEventListener('click', () => { shown = 0; stepsBox.innerHTML = ''; paint(); card.scrollIntoView({ behavior: 'smooth' }); });
    row.append(nextBtn, resetBtn);
    paint();
    probList.appendChild(card);
  });

  /* ---------------- Retroalimentación metacognitiva ---------------- */
  const CONF = [['guess', 'Adivino'], ['unsure', 'Tengo dudas'], ['sure', 'Lo sé']];
  function metaMsg(ok, conf) {
    if (ok && conf === 'sure') return '🎯 <b>Bien calibrado:</b> sabías que sabías. Es un concepto firme.';
    if (ok && conf === 'unsure') return '🙂 <b>Acertaste con dudas.</b> Leé la explicación para convertir esa duda en certeza.';
    if (ok && conf === 'guess') return '🍀 <b>Acertaste, pero adivinando.</b> La suerte no es confiable: repasá este tema.';
    if (!ok && conf === 'sure') return '🚨 <b>Alarma: error con seguridad.</b> Es la señal de una idea mal aprendida. Anotala en tu hoja y releé la explicación con calma.';
    if (!ok && conf === 'unsure') return '🔎 <b>Tu duda tenía razón.</b> Tu radar funcionó: ahora aprendé el porqué.';
    return '👍 <b>Sabías que no sabías.</b> Eso es buena metacognición. Ahora aprendelo con la explicación.';
  }

  /* Prepara una pregunta con opciones mezcladas */
  function prepQ(q) {
    const order = shuffle(q.opts.map((_, i) => i));
    return { ...q, shuffled: order.map(i => q.opts[i]), correct: order.indexOf(q.a) };
  }

  /* ---------------- Práctica ---------------- */
  const QMAP = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
  const quiz = { filter: 'todo', list: [], i: 0, ok: 0, done: 0, cal: { 'sure-ok': 0, 'sure-bad': 0, 'unsure-ok': 0, 'unsure-bad': 0, 'guess-ok': 0, 'guess-bad': 0 } };
  const FILTERS = [['todo', 'Todo'], ['teoria', 'Teoría'], ['ejercicio', 'Ejercicios'], ['errores', 'Mis errores']];

  function wrongSet() { return new Set(store.get('wrong', [])); }

  function renderTabs() {
    const tabs = $('#quizTabs'); tabs.innerHTML = '';
    FILTERS.forEach(([k, label]) => {
      const extra = k === 'errores' ? ` (${wrongSet().size})` : '';
      const b = el('button', { type: 'button', 'aria-pressed': String(quiz.filter === k) }, label + extra);
      b.addEventListener('click', () => { quiz.filter = k; startQuiz(); });
      tabs.appendChild(b);
    });
  }

  function startQuiz() {
    let pool = QUESTIONS;
    if (quiz.filter === 'teoria' || quiz.filter === 'ejercicio') pool = QUESTIONS.filter(q => q.tipo === quiz.filter);
    if (quiz.filter === 'errores') { const w = wrongSet(); pool = QUESTIONS.filter(q => w.has(q.id)); }
    quiz.list = shuffle(pool).map(prepQ);
    quiz.i = 0; quiz.ok = 0; quiz.done = 0;
    Object.keys(quiz.cal).forEach(k => { quiz.cal[k] = 0; });
    renderTabs(); renderQuiz();
  }

  function renderStats() {
    const s = $('#quizStats');
    if (!quiz.done) { s.innerHTML = ''; return; }
    const alarms = quiz.cal['sure-bad'];
    s.innerHTML = `<div class="stats">
      <div class="stat"><div class="v">${quiz.ok}/${quiz.done}</div><div class="k">aciertos en esta ronda</div></div>
      <div class="stat"><div class="v">${quiz.cal['sure-ok']}</div><div class="k">🎯 bien calibradas</div></div>
      <div class="stat"><div class="v">${alarms}</div><div class="k">🚨 errores con seguridad</div></div>
      <div class="stat"><div class="v">${wrongSet().size}</div><div class="k">para repasar (Mis errores)</div></div>
    </div>`;
  }

  function renderQuiz() {
    renderStats();
    const card = $('#quizCard');
    if (!quiz.list.length) {
      card.innerHTML = quiz.filter === 'errores'
        ? '<p>🎉 No tenés errores pendientes. Cuando te equivoques en una pregunta, aparece acá hasta que la respondas bien.</p>'
        : '<p>No hay preguntas en este filtro.</p>';
      return;
    }
    if (quiz.i >= quiz.list.length) {
      const pct = Math.round(100 * quiz.ok / quiz.done);
      card.innerHTML = `<h3 style="margin-top:0">Terminaste la ronda: ${quiz.ok}/${quiz.done} (${pct}%)</h3>
        <p>${quiz.cal['sure-bad'] ? `Tuviste <b>${quiz.cal['sure-bad']}</b> error(es) con seguridad 🚨. Son tu prioridad: andá a "Mis errores".` : 'No tuviste errores con seguridad: tu radar está bien calibrado. 👏'}</p>
        <div class="btn-row"><button class="btn" type="button" id="qAgain">Otra ronda</button><button class="btn ghost" type="button" id="qErr">Repasar mis errores</button></div>`;
      $('#qAgain').addEventListener('click', startQuiz);
      $('#qErr').addEventListener('click', () => { quiz.filter = 'errores'; startQuiz(); });
      return;
    }
    const q = quiz.list[quiz.i];
    let pick = null, conf = null;
    card.innerHTML = `<div class="q-meta"><span>Pregunta ${quiz.i + 1} de ${quiz.list.length}</span><span>${q.tipo === 'teoria' ? 'Teoría' : 'Ejercicio'} · ${q.tema}</span></div>
      <div class="q-text">${q.q}</div>
      <div class="opts"></div>
      <div class="conf"><span class="conf-label">¿Qué tan seguro/a estás? (elegilo antes de corregir)</span><div class="seg" role="group"></div></div>
      <div class="btn-row"><button class="btn" type="button" disabled>Corregir</button></div>
      <div class="fb"></div>`;
    const opts = card.querySelector('.opts'), seg = card.querySelector('.seg');
    const check = card.querySelector('.btn-row .btn'), fb = card.querySelector('.fb');
    const upd = () => { check.disabled = pick === null || conf === null; };
    q.shuffled.forEach((o, i) => {
      const b = el('button', { class: 'opt', type: 'button', 'aria-pressed': 'false' }, `<span class="l">${LETTERS[i]}</span><span>${o}</span>`);
      b.addEventListener('click', () => { pick = i; opts.querySelectorAll('.opt').forEach(x => x.setAttribute('aria-pressed', String(x === b))); upd(); });
      opts.appendChild(b);
    });
    CONF.forEach(([k, label]) => {
      const b = el('button', { type: 'button', 'aria-pressed': 'false' }, label);
      b.addEventListener('click', () => { conf = k; seg.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); upd(); });
      seg.appendChild(b);
    });
    check.addEventListener('click', () => {
      const ok = pick === q.correct;
      const btns = opts.querySelectorAll('.opt');
      btns.forEach((b, i) => { b.disabled = true; if (i === q.correct) b.classList.add('correct'); else if (i === pick) b.classList.add('wrong'); });
      seg.querySelectorAll('button').forEach(b => { b.disabled = true; });
      quiz.done++; if (ok) quiz.ok++;
      quiz.cal[conf + '-' + (ok ? 'ok' : 'bad')]++;
      const w = wrongSet(); ok ? w.delete(q.id) : w.add(q.id); store.set('wrong', [...w]);
      fb.innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}"><b>${ok ? '✔ Correcto.' : '✘ No es esa.'}</b> ${q.exp}<div class="meta">${metaMsg(ok, conf)}</div></div>`;
      check.textContent = quiz.i + 1 < quiz.list.length ? 'Siguiente →' : 'Ver resultado';
      check.disabled = false;
      check.onclick = () => { quiz.i++; renderTabs(); renderQuiz(); card.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
      renderStats();
    }, { once: true });
  }
  startQuiz();

  /* ---------------- Entrenador de Punnett ---------------- */
  const TRAITS = [
    { gen: 'Capacidad de enrollar la lengua', L: 'L', dom: 'puede enrollarla', rec: 'no puede' },
    { gen: 'Forma del pulgar', L: 'D', dom: 'pulgar recto', rec: 'pulgar extensible' },
    { gen: 'Lóbulo de la oreja', L: 'E', dom: 'lóbulo colgante', rec: 'lóbulo pegado' },
    { gen: 'Hoyuelos en las mejillas', L: 'H', dom: 'con hoyuelos', rec: 'sin hoyuelos' },
    { gen: 'Color de la semilla (Mendel)', L: 'A', dom: 'amarilla', rec: 'verde' },
    { gen: 'Color del cuerpo en Drosophila', L: 'N', dom: 'bronce', rec: 'negro' }
  ];
  const MODES = {
    dom: {
      label: 'Dominancia completa',
      make() {
        const t = TRAITS[Math.floor(Math.random() * TRAITS.length)];
        const U = t.L, u = t.L.toLowerCase();
        const gts = [U + U, U + u, u + u];
        return {
          desc: `<b>${t.gen}</b>: <code>${U}</code> = ${t.dom} (dominante) · <code>${u}</code> = ${t.rec} (recesivo)`,
          rank: (c) => (c === U ? 0 : 1), alleles: [U, u], genotypes: gts,
          phen: (g) => (g.includes(U) ? t.dom : t.rec),
          upper: false
        };
      }
    },
    abo: {
      label: 'Grupos ABO',
      make() {
        return {
          desc: '<b>Grupo sanguíneo</b>: A y B codominantes, ambos dominan sobre 0. Notación: A, B, 0.',
          rank: (c) => ({ A: 0, B: 1, '0': 2 }[c]), alleles: ['A', 'B', '0'],
          genotypes: ['AA', 'A0', 'BB', 'B0', 'AB', '00'],
          phen: (g) => (g === '00' ? 'grupo 0' : g.includes('A') && g.includes('B') ? 'grupo AB' : g.includes('A') ? 'grupo A' : 'grupo B'),
          upper: true
        };
      }
    },
    inc: {
      label: 'Dominancia incompleta',
      make() {
        return {
          desc: '<b>Color de flor</b> (dondiego de noche): <code>R</code> = rojo, <code>B</code> = blanco. Ninguno domina: RB es rosado.',
          rank: (c) => ({ R: 0, B: 1 }[c]), alleles: ['R', 'B'],
          genotypes: ['RR', 'RB', 'BB'],
          phen: (g) => (g === 'RR' ? 'rojo' : g === 'BB' ? 'blanco' : 'rosado'),
          upper: true
        };
      }
    }
  };
  const pun = { mode: 'dom' };

  function canon(g, m) { return g.split('').sort((a, b) => m.rank(a) - m.rank(b)).join(''); }
  function norm(v, m) { let s = v.trim().replace(/\s/g, ''); if (m.upper) s = s.toUpperCase().replace(/O/g, '0'); return s; }
  function validAllele(c, m) { return m.alleles.includes(c); }

  const FR = { 1: '1/4', 2: '1/2', 3: '3/4', 4: '100%' };
  function distString(keys, m, kind) {
    const counts = {};
    keys.forEach(k => { counts[k] = (counts[k] || 0) + 1; });
    const order = kind === 'gen' ? m.genotypes : m.genotypes.map(m.phen).filter((x, i, a) => a.indexOf(x) === i);
    return order.filter(k => counts[k]).map(k => `${FR[counts[k]]} ${kind === 'gen' ? k : k}`).join(' · ');
  }
  function crossCells(p1, p2, m) {
    const cells = [];
    for (const a of p2) for (const b of p1) cells.push(canon(b + a, m));
    return cells;
  }
  function distractors(correct, m, kind) {
    const set = new Set();
    m.genotypes.forEach(x => m.genotypes.forEach(y => {
      const cells = crossCells(x, y, m);
      set.add(distString(kind === 'gen' ? cells : cells.map(m.phen), m, kind));
    }));
    set.delete(correct);
    return shuffle([...set]).slice(0, 3);
  }

  function renderPunTabs() {
    const tabs = $('#punTabs'); tabs.innerHTML = '';
    Object.entries(MODES).forEach(([k, v]) => {
      const b = el('button', { type: 'button', 'aria-pressed': String(pun.mode === k) }, v.label);
      b.addEventListener('click', () => { pun.mode = k; renderPunTabs(); newCross(); });
      tabs.appendChild(b);
    });
  }

  function newCross() {
    const m = MODES[pun.mode].make();
    const p1 = m.genotypes[Math.floor(Math.random() * m.genotypes.length)];
    const p2 = m.genotypes[Math.floor(Math.random() * m.genotypes.length)];
    const card = $('#punCard');
    const inp = (cls, label) => `<input class="${cls}" maxlength="2" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" aria-label="${label}">`;
    card.innerHTML = `<p class="small" style="margin-top:0">${m.desc}</p>
      <div class="parents">
        <div class="parent">Progenitor 1 (arriba)<br><b>${p1}</b><br><span class="muted small">${m.phen(p1)}</span></div>
        <div class="parent">Progenitor 2 (izquierda)<br><b>${p2}</b><br><span class="muted small">${m.phen(p2)}</span></div>
      </div>
      <div class="box think small"><span class="box-title">🧭 Antes de completar</span>¿Qué gametos puede formar cada progenitor? ¿Esperás que aparezca algún hijo con el fenotipo "raro"?</div>
      <table class="trainer-grid">
        <tr><th></th><th>${inp('gam t0', 'gameto 1 del progenitor 1')}</th><th>${inp('gam t1', 'gameto 2 del progenitor 1')}</th></tr>
        <tr><th>${inp('gam l0', 'gameto 1 del progenitor 2')}</th><td>${inp('c c00', 'casilla fila 1 columna 1')}</td><td>${inp('c c01', 'casilla fila 1 columna 2')}</td></tr>
        <tr><th>${inp('gam l1', 'gameto 2 del progenitor 2')}</th><td>${inp('c c10', 'casilla fila 2 columna 1')}</td><td>${inp('c c11', 'casilla fila 2 columna 2')}</td></tr>
      </table>
      <p class="small muted" style="text-align:center">Cada gameto: <b>una</b> letra. Cada casilla: <b>dos</b> letras.</p>
      <div class="btn-row"><button class="btn" type="button" id="punCheck">Corregir cuadro</button><button class="btn ghost" type="button" id="punNew">Otro cruce</button></div>
      <div id="punFb"></div>`;
    $('#punNew').addEventListener('click', newCross);
    // Los gametos se limitan a 1 carácter
    card.querySelectorAll('input.gam').forEach(i => i.setAttribute('maxlength', '1'));

    $('#punCheck').addEventListener('click', () => {
      const get = (c) => card.querySelector('input.' + c);
      const val = (c) => norm(get(c).value, m);
      const mark = (c, ok) => { get(c).classList.toggle('ok', ok); get(c).classList.toggle('bad', !ok); };
      const sameMulti = (arr, gt) => canon(arr.join(''), m) === canon(gt, m);
      const top = [val('t0'), val('t1')], left = [val('l0'), val('l1')];
      const topOk = top.every(x => x.length === 1 && validAllele(x, m)) && sameMulti(top, p1);
      const leftOk = left.every(x => x.length === 1 && validAllele(x, m)) && sameMulti(left, p2);
      ['t0', 't1'].forEach(c => mark(c, topOk));
      ['l0', 'l1'].forEach(c => mark(c, leftOk));
      let cellsOk = true;
      [[0, 0], [0, 1], [1, 0], [1, 1]].forEach(([r, k]) => {
        const v = val('c' + r + k);
        const ok = v.length === 2 && v.split('').every(x => validAllele(x, m)) && canon(v, m) === canon(left[r] + top[k], m);
        mark('c' + r + k, ok && topOk && leftOk);
        if (!ok) cellsOk = false;
      });
      const fb = $('#punFb');
      if (!topOk || !leftOk) {
        fb.innerHTML = `<div class="feedback bad"><b>Revisá los gametos.</b> Cada progenitor reparte sus <b>dos</b> alelos, uno en cada gameto (1ª ley). Por ejemplo, ${p1} forma <code>${p1[0]}</code> y <code>${p1[1]}</code>.${m.upper ? '' : ' Ojo con las mayúsculas y minúsculas.'}</div>`;
        return;
      }
      if (!cellsOk) {
        fb.innerHTML = '<div class="feedback bad"><b>Los gametos están bien ✔, pero hay casillas para revisar.</b> Cada casilla = la letra de su fila + la letra de su columna.</div>';
        return;
      }
      // Cuadro correcto → preguntas de proporciones
      const cells = crossCells(p1, p2, m);
      const genOk = distString(cells, m, 'gen');
      const phOk = distString(cells.map(m.phen), m, 'ph');
      fb.innerHTML = `<div class="feedback ok"><b>✔ ¡Cuadro perfecto!</b> Ahora contá, como en el paso 6 del método.</div>
        <div class="card"><p style="margin-top:0"><b>Proporción genotípica:</b></p><div class="opts" id="pGen"></div>
        <p><b>Proporción fenotípica:</b></p><div class="opts" id="pPh"></div><div id="pFb"></div></div>`;
      const results = {};
      const mk = (box, correct, kind) => {
        const opts = shuffle([correct, ...distractors(correct, m, kind)]);
        opts.forEach((o, i) => {
          const b = el('button', { class: 'opt', type: 'button' }, `<span class="l">${LETTERS[i]}</span><span>${o}</span>`);
          b.addEventListener('click', () => {
            box.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (x === b && o !== correct) x.classList.add('wrong'); });
            box.querySelectorAll('.opt')[opts.indexOf(correct)].classList.add('correct');
            results[kind] = o === correct;
            if (Object.keys(results).length === 2) {
              const allOk = results.gen && results.ph;
              $('#pFb').innerHTML = `<div class="feedback ${allOk ? 'ok' : 'bad'}">${allOk ? '🎯 Todo bien. Probá otro cruce u otro tipo de herencia.' : '🔎 Mirá el cuadro y contá de nuevo las casillas iguales: <b>genotipo</b> = las letras, <b>fenotipo</b> = cómo se ve. Cada casilla vale 1/4.'}</div>`;
            }
          });
          box.appendChild(b);
        });
      };
      mk($('#pGen'), genOk, 'gen');
      mk($('#pPh'), phOk, 'ph');
    });
  }
  renderPunTabs();
  newCross();

  /* ---------------- Simulacro ---------------- */
  const SIM_SECONDS = 15 * 60;
  let simTimer = null;

  function simIntro() {
    clearInterval(simTimer);
    const hist = store.get('simHist', []);
    $('#simRoot').innerHTML = `
      <p class="lead">Es el ensayo general: <b>6 preguntas</b> (2 teóricas y 4 ejercicios), <b>15 minutos</b>, sin corrección hasta el final.</p>
      <div class="box key"><span class="box-title">Antes de empezar</span>
        <ul><li>Tené una <b>hoja y lapicera</b> al lado.</li>
        <li>Marcá tu <b>confianza</b> en cada respuesta: al final vas a ver qué tan bien calibrada está tu confianza.</li>
        <li>Podés moverte entre preguntas y cambiar respuestas antes de entregar.</li>
        <li>Si te trabás, saltala y volvé después.</li></ul></div>
      <div class="btn-row"><button class="btn" type="button" id="simStart">Empezar simulacro ⏱</button></div>
      ${hist.length ? `<h3>Tus intentos anteriores</h3><ul>${hist.slice(-5).reverse().map(h => `<li>${h.date}: <b>${h.score}/6</b>${h.alarms ? ` · 🚨 ${h.alarms} error(es) con seguridad` : ''}</li>`).join('')}</ul>` : ''}`;
    $('#simStart').addEventListener('click', simStart);
  }

  function simStart() {
    const ids = [...shuffle(SIM_THEORY).slice(0, 2), ...shuffle(SIM_EXERCISE).slice(0, 4)];
    const st = { qs: ids.map(id => prepQ(QMAP[id])), ans: Array(6).fill(null), conf: Array(6).fill(null), i: 0, left: SIM_SECONDS };
    const r = $('#simRoot');
    r.innerHTML = `<div class="timer" id="simTimer"><span>⏱ <span class="clock" id="simClock">15:00</span></span><div class="dots" id="simDots"></div></div>
      <div class="card" id="simCard"></div>`;
    const tick = () => {
      st.left--;
      const m = Math.floor(st.left / 60), s = st.left % 60;
      $('#simClock').textContent = `${m}:${String(s).padStart(2, '0')}`;
      $('#simTimer').classList.toggle('low', st.left <= 120);
      if (st.left <= 0) simFinish(st, true);
    };
    clearInterval(simTimer);
    simTimer = setInterval(tick, 1000);
    simRenderQ(st);
  }

  function simRenderQ(st) {
    const dots = $('#simDots'); dots.innerHTML = '';
    st.qs.forEach((_, i) => {
      const b = el('button', { type: 'button', class: (st.ans[i] !== null ? 'ans ' : '') + (i === st.i ? 'cur' : ''), 'aria-label': 'Ir a la pregunta ' + (i + 1) }, String(i + 1));
      b.addEventListener('click', () => { st.i = i; simRenderQ(st); });
      dots.appendChild(b);
    });
    const q = st.qs[st.i], card = $('#simCard');
    card.innerHTML = `<div class="q-meta"><span>Pregunta ${st.i + 1} de 6</span><span>${q.tipo === 'teoria' ? 'Teoría' : 'Ejercicio'}</span></div>
      <div class="q-text">${q.q}</div><div class="opts"></div>
      <div class="conf"><span class="conf-label">Confianza</span><div class="seg" role="group"></div></div>
      <div class="btn-row"></div>`;
    const opts = card.querySelector('.opts'), seg = card.querySelector('.seg'), row = card.querySelector('.btn-row');
    q.shuffled.forEach((o, i) => {
      const b = el('button', { class: 'opt', type: 'button', 'aria-pressed': String(st.ans[st.i] === i) }, `<span class="l">${LETTERS[i]}</span><span>${o}</span>`);
      b.addEventListener('click', () => { st.ans[st.i] = i; simRenderQ(st); });
      opts.appendChild(b);
    });
    CONF.forEach(([k, label]) => {
      const b = el('button', { type: 'button', 'aria-pressed': String(st.conf[st.i] === k) }, label);
      b.addEventListener('click', () => { st.conf[st.i] = k; simRenderQ(st); });
      seg.appendChild(b);
    });
    if (st.i > 0) row.appendChild(el('button', { class: 'btn ghost', type: 'button', onclick: () => { st.i--; simRenderQ(st); } }, '← Anterior'));
    if (st.i < 5) row.appendChild(el('button', { class: 'btn', type: 'button', onclick: () => { st.i++; simRenderQ(st); } }, 'Siguiente →'));
    const pending = st.ans.filter(a => a === null).length;
    row.appendChild(el('button', {
      class: st.i === 5 ? 'btn' : 'btn ghost', type: 'button',
      onclick: () => {
        if (pending && !card.querySelector('.warn')) {
          card.appendChild(el('p', { class: 'warn small', style: 'color:var(--bad)' }, `Te quedan ${pending} sin responder. Tocá "Entregar" de nuevo para entregar igual.`));
          return;
        }
        simFinish(st, false);
      }
    }, 'Entregar'));
  }

  function simFinish(st, timeout) {
    clearInterval(simTimer);
    let score = 0, alarms = 0;
    const items = st.qs.map((q, i) => {
      const ok = st.ans[i] === q.correct;
      if (ok) score++;
      if (!ok && st.conf[i] === 'sure') alarms++;
      if (!ok) { const w = wrongSet(); w.add(q.id); store.set('wrong', [...w]); }
      const yours = st.ans[i] === null ? '<i>sin responder</i>' : q.shuffled[st.ans[i]];
      return `<div class="review-item"><b>${i + 1}. ${ok ? '✔' : '✘'}</b> ${q.q}
        <p class="small"><b>Tu respuesta:</b> ${yours}${st.conf[i] ? ` <span class="muted">(${CONF.find(c => c[0] === st.conf[i])[1].toLowerCase()})</span>` : ''}<br><b>Correcta:</b> ${q.shuffled[q.correct]}</p>
        <div class="feedback ${ok ? 'ok' : 'bad'} small">${q.exp}${st.conf[i] && st.ans[i] !== null ? `<div class="meta">${metaMsg(ok, st.conf[i])}</div>` : ''}</div></div>`;
    }).join('');
    const hist = store.get('simHist', []);
    const d = new Date();
    hist.push({ date: d.toLocaleDateString('es-AR') + ' ' + d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }), score, alarms });
    store.set('simHist', hist);
    const used = SIM_SECONDS - Math.max(st.left, 0);
    const msg = score >= 5 ? '¡Excelente! Repasá igual los errores para que no te sorprendan.'
      : score >= 4 ? 'Muy bien. Mirá con atención las que fallaste: suelen ser un solo concepto.'
      : 'Todavía hay huecos, y está perfecto descubrirlos ahora. Volvé a los resueltos del tema que falló y hacé otro simulacro.';
    $('#simRoot').innerHTML = `<div class="card">
      <h2 style="margin-top:0">${timeout ? '⏰ ¡Tiempo! ' : ''}Resultado: ${score}/6</h2>
      <p>${msg}</p>
      <p class="small muted">Tiempo usado: ${Math.floor(used / 60)} min ${used % 60} s.${alarms ? ` · 🚨 ${alarms} error(es) con seguridad: son tu prioridad.` : ''}</p>
      <div class="btn-row"><button class="btn" type="button" id="simAgain">Otro simulacro</button><a class="btn ghost" href="#practica">Ir a practicar</a></div>
      ${items}</div>`;
    $('#simAgain').addEventListener('click', simStart);
    window.scrollTo(0, 0);
  }
  simIntro();

  show();
})();
