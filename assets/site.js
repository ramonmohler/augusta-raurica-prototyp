/* Augusta Raurica – Website-Prototyp.
   Navigation nach Sitemap „Sitemap final after Testing Meeting“ (Wireframes 6170:47886).
   Animationen aus den Prototypen Startseite + Römerhaus, ergänzt um Menü-Ebenen, Programm-Modul, Tickets, FAQ. */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 900px)');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const easeInOut = t => t < .5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2;
  const smooth = t => t * t * (3 - 2 * t);
  const page = document.body.dataset.page || '';
  const I = (n, cls = 'i') => `<svg class="${cls}"><use href="#i-${n}"/></svg>`;
  const ARROW = I('arrow');

  /* ---------- Seiten & Sitemap ---------- */
  const P = { home: 'index.html', programm: 'programm.html', roemerhaus: 'roemerhaus.html', tickets: 'tickets.html', schulen: 'schulen.html', angebot: 'angebot.html', event: 'event.html', suche: 'suche.html' };
  const NAV = [
    { t: 'Besuch planen', img: 'f-1a7abcf4', d: 'Hier finden Sie alles, was Sie für einen Besuch in unserem Archäologischen Park oder für unsere Aktivitäten benötigen.', c: [
      { t: 'Tickets und Öffnungszeiten', h: P.tickets }, { t: 'Lageplan' }, { t: 'Anreise', h: P.tickets + '#anreise' }, { t: 'Essen und Trinken' }, { t: 'Museumshop' },
      { t: 'Praktische Informationen', d: 'Filmen und Fotografieren, Buchungs- und Annullationsbedingungen, Toiletten, Gepäck und Hunde.', c: [{ t: 'Filmen, Fotografieren und Drohnenflüge' }, { t: 'Buchen und Annullationsbedingungen' }, { t: 'Toiletten, Gepäck und Hunde' }, { t: 'Metalldetektoren' }] },
      { t: 'Barrierefreier Besuch' }] },
    { t: 'Römerstadt und Museum', img: 'f-b57deaa0', d: 'Die grösste erhaltene Römerstadt nördlich der Alpen: Monumente, Tierpark, Römerhaus und Museum.', c: [
      { t: 'Die römische Stadt', d: 'Stadtgeschichte, Umland und die Monumente unter freiem Himmel.', c: [{ t: 'Stadt und Umland' }, { t: 'Monumente' }] },
      { t: 'Tierpark', d: 'Alte Haustierrassen, wie sie schon die Römer hielten.', c: [{ t: 'Wild- und Nutztiere' }] },
      { t: 'Landgut Castelen', d: 'Seminarräume für Universitäten und Firmen.', c: [{ t: 'Mieträume' }] },
      { t: 'Römerhaus', h: P.roemerhaus },
      { t: 'Museum', d: 'Aktuelle Ausstellungen, der Silberschatz und die Highlights der Sammlung.', c: [{ t: 'Aktuelle Ausstellungen' }, { t: 'Silberschatz' }, { t: 'Sammlung Highlights' }] }] },
    { t: 'Programm', h: P.programm, img: 'f-b9f14153', d: 'Führungen, Workshops, Ausstellungen und Feste: Das ganze Programm auf einen Blick.', c: [
      { t: 'Angebote und Kalender', h: P.programm + '#programm' }, { t: 'Aktuelle Ausstellung', h: P.programm + '#ausstellungen' },
      { t: 'Römisches Theater', h: P.programm + '#theater', d: 'Konzerte, Theater und Führungen im antiken Theater.', c: [{ t: 'Live in Concert', h: P.event }] },
      { t: 'Römerfest', d: 'Das grösste Römerfest der Schweiz, jedes Jahr Ende August.', c: [{ t: 'Besuch' }, { t: 'Über das Römerfest' }, { t: 'Kontakt und Medien' }] }] },
    { t: 'Archäologie und Sammlung', img: 'f-0d2a16e7', d: 'Hier finden Sie alles über Ausgrabungen, Sammlung und Forschung in Augusta Raurica.', c: [
      { t: 'Ausgrabung', d: 'Was der Boden in Augst und Kaiseraugst dieses Jahr freigibt.', c: [{ t: 'Ausgrabungen Augst' }, { t: 'Ausgrabungen Kaiseraugst' }] },
      { t: 'Sammlung', d: 'Über eine Million Fundstücke, online und im Sammlungszentrum.', c: [{ t: 'Sammlung online' }, { t: 'Leihgaben' }, { t: 'Archiv und Bibliothek' }] },
      { t: 'Konservierung und Restaurierung' },
      { t: 'Forschung', d: 'Hier finden Sie alles über aktuelle Projekte, Schwerpunkte und das Team der Forschung.', c: [{ t: 'Aktuelle Projekte' }, { t: 'Forschungsschwerpunkte' }, { t: 'Archäologischer Stadtplan' }, { t: 'Forschungsteam' }, { t: 'Publikationen' }, { t: 'Kooperationen und Partner' }] }] },
    { t: 'Wissenswertes', img: 'f-4b772745', d: 'Geschichten und Einblicke, nach Themen filterbar.', c: [
      { t: 'Geschichten und Einblicke' }, { t: 'Ausgrabungen' }, { t: 'Römer im Alltag' }, { t: 'Sammlungen' }, { t: 'Digitale Angebote' }, { t: 'Selbständig erleben' }, { t: 'Rezepte' }] },
    { t: 'Institution', img: 'f-c7d7de05', d: 'Auftrag, Geschichte und Team von Augusta Raurica – und wie Sie mitwirken können.', c: [
      { t: 'Über uns', d: 'Auftrag und Philosophie, Geschichte der Institution, Team und Governance.', c: [{ t: 'Auftrag und Philosophie' }, { t: 'Geschichte der Institution' }, { t: 'Team' }, { t: 'Der Römervertrag' }, { t: 'Geschäftsberichte' }, { t: 'Gesetzliches' }] },
      { t: 'Mitwirken', d: 'Mitglied werden, spenden oder die Stiftung unterstützen.', c: [{ t: 'Mitglied werden' }, { t: 'Spenden' }, { t: 'Stiftung Pro Augusta Raurica' }] },
      { t: 'Medien' }, { t: 'Kontakt' }] },
  ];
  const AUD = [{ t: 'Erwachsene' }, { t: 'Schulen', h: P.schulen }, { t: 'Familien' }, { t: 'Gruppen' }, { t: 'Forschende' }, { t: 'Förderer und Mitglieder' }];
  const href = n => n.h || '#';
  const miss = n => n.h ? '' : ` data-missing="${n.t}"`;
  const here = n => n.h && n.h.split('#')[0] === location.pathname.split('/').pop() && !n.h.includes('#') ? ' aria-current="page"' : '';

  /* ---------- Gemeinsame Bausteine: Header, Menü, Footer ---------- */
  const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <symbol id="i-arrow" viewBox="0 0 16 16"><path d="M2 8h12M9 3l5 5-5 5"/></symbol>
    <symbol id="i-search" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5"/><path d="m11 11 3.5 3.5"/></symbol>
    <symbol id="i-hand" viewBox="0 0 16 16"><path d="M5.5 8.5V3.2a1 1 0 0 1 2 0V7m0-4.8a1 1 0 0 1 2 0V7m0-4a1 1 0 0 1 2 0V8m0-2.5a1 1 0 0 1 2 0V10a4.5 4.5 0 0 1-4.5 4.5H8.3a4 4 0 0 1-3.2-1.6L2.6 9.6a1 1 0 0 1 1.5-1.3l1.4 1.4"/></symbol>
    <symbol id="i-book" viewBox="0 0 16 16"><path d="M8 4.2C6.6 3.2 4.6 2.8 2 3v9.4c2.6-.2 4.6.2 6 1.2 1.4-1 3.4-1.4 6-1.2V3c-2.6-.2-4.6.2-6 1.2Zm0 0v9.4"/></symbol>
    <symbol id="i-plus" viewBox="0 0 16 16"><path d="M8 2v12M2 8h12"/></symbol>
    <symbol id="i-minus" viewBox="0 0 16 16"><path d="M2 8h12"/></symbol>
    <symbol id="i-clock" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><path d="M8 4.5V8l2.5 1.5"/></symbol>
    <symbol id="i-close" viewBox="0 0 16 16"><path d="m3 3 10 10M13 3 3 13"/></symbol>
    <symbol id="i-access" viewBox="0 0 16 16"><circle cx="8" cy="2.5" r="1.2"/><path d="M3 5.5h10M8 5.5v4M8 9.5l-2.5 5M8 9.5l2.5 5"/></symbol>
    <symbol id="i-down" viewBox="0 0 16 16"><path d="m4 6 4 4 4-4"/></symbol>
    <symbol id="i-pin" viewBox="0 0 16 16"><path d="M8 14.5s4.5-4.2 4.5-8a4.5 4.5 0 0 0-9 0c0 3.8 4.5 8 4.5 8z"/><circle cx="8" cy="6.5" r="1.6"/></symbol>
    <symbol id="i-image" viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="m2.5 11.5 3.5-3.5 3 3 2-2 2.5 2.5"/></symbol>
    <symbol id="i-check" viewBox="0 0 16 16"><path d="m3 8.5 3 3 7-7"/></symbol>
    <symbol id="i-bank" viewBox="0 0 16 16"><path d="M2 6 8 2.5 14 6M3 6.5v6M6.3 6.5v6M9.7 6.5v6M13 6.5v6M2 13.5h12"/></symbol>
    <symbol id="i-eye" viewBox="0 0 16 16"><path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z"/><circle cx="8" cy="8" r="2"/><path d="m2.5 13.5 11-11"/></symbol>
    <symbol id="i-grid" viewBox="0 0 16 16"><path d="M3 2.5v11M8 2.5v11M13 2.5v11"/></symbol>
    <symbol id="i-list" viewBox="0 0 16 16"><path d="M5.5 4h8M5.5 8h8M5.5 12h8M2.5 4h.01M2.5 8h.01M2.5 12h.01"/></symbol>
    <symbol id="i-phone" viewBox="0 0 16 16"><path d="M5.5 2.5 3 3c-.4 4.9 5.1 10.4 10 10l.5-2.5-2.7-1.2-1.3 1.3C7.8 9.8 6.2 8.2 5.4 6.5l1.3-1.3z"/></symbol>
    <symbol id="i-mail" viewBox="0 0 16 16"><rect x="2" y="3.5" width="12" height="9" rx="1"/><path d="m2.5 4.5 5.5 4 5.5-4"/></symbol>
    <symbol id="i-route" viewBox="0 0 16 16"><circle cx="4" cy="12" r="1.8"/><circle cx="12" cy="4" r="1.8"/><path d="M5.8 12H10a2 2 0 0 0 0-4H6a2 2 0 0 1 0-4h4.2"/></symbol>
    <symbol id="i-ticket" viewBox="0 0 24 24"><path d="M2.6 5h18.8v4.5a2.5 2.5 0 0 0 0 5V19H2.6v-4.5a2.5 2.5 0 0 0 0-5z"/><path d="M15 5v1.6M15 11.2v1.6M15 17.4V19"/></symbol>
    <symbol id="i-s-instagram" viewBox="0 0 16 16"><rect x="2.5" y="2.5" width="11" height="11" rx="3.2"/><circle cx="8" cy="8" r="2.6"/><path d="M11.4 4.6h.01"/></symbol>
    <symbol id="i-s-facebook" viewBox="0 0 16 16"><path d="M9.5 14V8.5h2l.3-2.2H9.5V5c0-.6.2-1.1 1.1-1.1h1.2V2a14 14 0 0 0-1.8-.1C8.3 1.9 7.3 2.9 7.3 4.6v1.7h-2v2.2h2V14"/></symbol>
    <symbol id="i-s-youtube" viewBox="0 0 16 16"><rect x="1.5" y="3.5" width="13" height="9" rx="2.5"/><path d="m6.8 6 3 2-3 2z"/></symbol>
    <symbol id="i-s-tripadvisor" viewBox="0 0 16 16"><circle cx="4.8" cy="9" r="2.4"/><circle cx="11.2" cy="9" r="2.4"/><path d="M2.4 6.2C4 4.8 6 4.2 8 4.2s4 .6 5.6 2M8 4.2 8 6.5"/></symbol>
  </svg>`;
  function chrome() {
    document.body.insertAdjacentHTML('afterbegin', SPRITE);
    const isHome = !!document.getElementById('biglogo');
    const hdr = document.getElementById('hdr');
    const LANGS = [['DE', 'Deutsch'], ['FR', 'Français'], ['IT', 'Italiano'], ['EN', 'English']];
    const tools = `<a class="hbtn" href="${P.suche}" aria-label="Suche">${I('search')}</a><button class="hbtn js-a11y" type="button" aria-expanded="false" aria-controls="a11y" aria-label="Barrierefreiheit">${I('access')}</button><div class="lang" role="group" aria-label="Sprache">${LANGS.map(([k, l], i) => `<button class="hbtn lang__btn" type="button" lang="${k.toLowerCase()}" aria-label="${i === 0 ? `Sprache: ${l}. Sprache wählen` : l}" aria-pressed="${i === 0}"${i === 0 ? ' aria-expanded="false"' : ` style="--k:${i - 1}"`}>${k}</button>`).join('')}</div>`;
    hdr.querySelector('.hdr__in').innerHTML = `
      <div class="hdr__left">${tools}<button class="hbtn hdr__mobile-menu js-menu" type="button" aria-expanded="false" aria-controls="menu"><span class="hdr__label">Menü</span><span class="hdr__burger" aria-hidden="true"><span></span><span></span><span></span></span></button></div>
      ${isHome ? '<span class="hdr__logo"><span class="hdr__slot" id="logo-slot"></span><span class="hdr__ar" aria-hidden="true"></span></span>' : `<a class="hdr__logo" href="${P.home}" aria-label="Augusta Raurica – Startseite"><img class="logo" src="img/logo.png" alt="Augusta Raurica" width="463" height="39"><span class="hdr__ar" aria-hidden="true"></span></a>`}
      <div class="hdr__right"><button class="hbtn js-menu" type="button" aria-expanded="false" aria-controls="menu"><span class="hdr__label">Menü</span><span class="hdr__burger" aria-hidden="true"><span></span><span></span><span></span></span></button></div>`;

    const a11y = document.createElement('div'); a11y.className = 'a11y'; a11y.id = 'a11y'; a11y.hidden = true;
    a11y.setAttribute('role', 'dialog'); a11y.setAttribute('aria-label', 'Barrierefreiheit');
    a11y.innerHTML = `<div class="a11y__in wrap">
      <div class="a11y__intro"><h2>Barrierefreiheit</h2><p>Die Einstellungen werden in diesem Browser gespeichert.</p></div>
      <div class="a11y__opts">
        <div class="a11y__grp"><p id="a11y-fs">Schriftgrösse</p><div class="seg" role="group" aria-labelledby="a11y-fs"><button class="btn" type="button" data-a11y="fs" data-v="large">Gross</button><button class="btn" type="button" data-a11y="fs" data-v="normal">Klein</button></div></div>
        <div class="a11y__grp"><p id="a11y-ct">Kontrast</p><div class="seg" role="group" aria-labelledby="a11y-ct"><button class="btn" type="button" data-a11y="ct" data-v="high">Hoch</button><button class="btn" type="button" data-a11y="ct" data-v="normal">Normal</button></div></div>
      </div>
      <div class="a11y__links"><a class="btn btn--outline" href="#"${miss({ t: 'Gebärdensprache' })}>${I('hand')}<span>Gebärdensprache</span><svg class="i btn__out"><use href="#i-arrow"/></svg></a><a class="btn btn--outline" href="#"${miss({ t: 'Leichte Sprache' })}>${I('book')}<span>Leichte Sprache</span><svg class="i btn__out"><use href="#i-arrow"/></svg></a></div>
      <button class="a11y__close" type="button" aria-label="Barrierefreiheit schliessen">${I('close')}</button>
    </div>`;
    hdr.appendChild(a11y);
    const scrim = document.createElement('div'); scrim.className = 'a11y-scrim'; scrim.hidden = true; document.body.appendChild(scrim);

    const imgs = [{ img: 'f-fb56897e' }, ...NAV].map((n, i) => `<img src="img/${n.img}.jpg" alt="" loading="lazy" decoding="async" data-bg="${i}"${i === 0 ? ' class="is-on"' : ''}>`).join('');
    const l1 = NAV.map((n, i) => `<li><button class="m1" type="button" style="--i:${i}" aria-expanded="false" data-l1="${i}">${n.t}${ARROW}</button></li>`).join('');
    const item = (n, k, key) => n.c
      ? `<li class="stg" style="--i:${k + 2}"><button type="button" aria-expanded="false" data-l2="${key}"><span>${n.t}</span><svg class="i chev" aria-hidden="true"><use href="#i-down"/></svg></button></li>`
      : `<li class="stg" style="--i:${k + 2}"><a href="${href(n)}"${miss(n)}${here(n)}><span>${n.t}</span></a></li>`;
    const head = n => `<a class="mpanel__head stg" style="--i:0" href="${href(n)}"${miss(n)}>${n.t}${ARROW}</a><p class="mpanel__desc stg" style="--i:1">${n.d || ''}</p>`;
    const audPanel = `<div class="mpanel mpanel--aud is-on" data-panel="aud"><p class="mpanel__eyebrow stg" style="--i:0">Alle Infos für:</p><ul class="mpanel__list">${AUD.map((n, k) => `<li class="stg" style="--i:${k + 1}"><a href="${href(n)}"${miss(n)}><span>${n.t}</span>${ARROW}</a></li>`).join('')}</ul></div>`;
    const l2 = NAV.map((n, i) => `<div class="mpanel mpanel--l2" data-panel="${i}">${head(n)}<ul class="mpanel__list">${n.c.map((c, k) => item(c, k, `${i}-${k}`)).join('')}</ul></div>`).join('');
    const l3 = NAV.flatMap((n, i) => n.c.map((c, k) => c.c ? `<div class="mpanel mpanel--l3" data-panel="${i}-${k}">${head(c)}<ul class="mpanel__list">${c.c.map((x, j) => item(x, j)).join('')}</ul></div>` : '')).join('');
    const menu = document.getElementById('menu');
    menu.innerHTML = `
      <div class="menu__bg" aria-hidden="true">${imgs}</div>
      <div class="menu__in wrap">
        <div class="menu__top">
          <div class="menu__tools">${tools}</div>
          <img class="menu__logo" src="img/logo.png" alt="Augusta Raurica" width="463" height="39">
          <button class="hbtn js-menu-close" type="button" aria-label="Menü schliessen">Menü ${I('close')}</button>
        </div>
        <div class="menu__body">
          <div class="menu__view menu__view--l1 is-on" data-view="l1">
            <ul class="menu__main">${l1}</ul>
            <div class="menu__mobile-aud">${audPanel.replace('mpanel--aud is-on', 'mpanel--aud is-on mpanel--m')}</div>
          </div>
          <div class="menu__view menu__view--l2" data-view="l2"><button class="menu__back" type="button" data-back="l1">${ARROW}<span>Hauptmenü</span></button><div class="menu__mslot"></div></div>
          <div class="menu__view menu__view--l3" data-view="l3"><button class="menu__back" type="button" data-back="l2">${ARROW}<span></span></button><div class="menu__mslot"></div></div>
          <div class="menu__cols">${audPanel}${l2}${l3}</div>
        </div>
        <div class="menu__foot">
          <div class="menu__tickets stag" style="--i:6"><a class="btn btn--light" href="${P.tickets}"><span>Museum und Römerhaus Tickets</span><svg class="i btn__out"><use href="#i-arrow"/></svg></a></div>
          <div class="menu__hours stag" style="--i:7"><div><strong>Museum, Monumente und Tierpark</strong><p class="hrow"><span class="hdot" aria-hidden="true">${I('clock')}</span><span class="js-hours-l">Heute geöffnet: 10.00 – 17.00 Uhr</span></p></div><div><strong>Freilichtgelände</strong><p class="hrow"><span>Ganzer Tag offen</span></p></div></div>
        </div>
      </div>`;

    const ftr = document.getElementById('kontakt');
    const direkt = ['Besuch planen', 'Lageplan', 'Römerstadt und Museum', 'Programm', 'Archäologie und Sammlung', 'Wissenswertes', 'Institution'].map(t => { const n = NAV.find(x => x.t === t) || { t }; return `<li><a class="tlink tlink--s" href="${href(n)}"${miss(n)}><span>${t}</span></a></li>`; }).join('');
    const more = ['Offene Stellen', 'Fotobestellungen', 'Drehgenehmigungen', 'Medien', 'Kontakt'].map(t => `<li><a class="tlink tlink--s" href="#"${miss({ t })}><span>${t}</span></a></li>`).join('') + `<li><a class="tlink tlink--s" href="${P.tickets}"><span>Öffnungszeiten</span></a></li>`;
    ftr.innerHTML = `
      <a class="ftr__logo rv" href="${P.home}" aria-label="Augusta Raurica – Startseite"></a>
      <div class="ftr__cols">
        <div class="ftr__col rv" style="--i:0"><h3>Direkt zu</h3><ul>${direkt}</ul></div>
        <div class="ftr__col rv" style="--i:1"><h3>Direkt zu</h3><ul>${more}</ul></div>
        <div class="ftr__col rv" style="--i:2"><h3>Kontakt</h3><address>Augusta Raurica<br>Giebenacherstrasse 17<br>CH-4302 Augst<br><a href="mailto:mail@augusta-raurica.ch">mail@augusta-raurica.ch</a><br><a href="tel:+41615522222">0041 (0)61 552 22 22</a></address></div>
        <div class="ftr__lang rv" style="--i:3" role="group" aria-label="Sprache"><button type="button" aria-pressed="true">DE</button><button type="button" aria-pressed="false">FR</button><button type="button" aria-pressed="false">IT</button><button type="button" aria-pressed="false">EN</button></div>
      </div>
      <div class="ftr__social">${['Tripadvisor', 'YouTube', 'Facebook', 'Instagram'].map(s => `<a class="round" href="#" aria-label="${s}"${miss({ t: s })}>${I('s-' + s.toLowerCase())}</a>`).join('')}</div>
      <div class="ftr__logos"><img src="img/logo-bund.png" alt="Schweizerische Eidgenossenschaft, Bundesamt für Kultur BAK" width="715" height="80" loading="lazy"><img class="bl" src="img/logo-bl.png" alt="Kanton Basel-Landschaft" width="273" height="64" loading="lazy"></div>
      <div class="ftr__legal"><span>©Augusta Raurica, Bildungs-, Kultur- und Sportdirektion des Kanton Basel-Landschaft</span><nav aria-label="Rechtliches"><a href="#"${miss({ t: 'Cookie-Einstellungen' })}>Cookie-Einstellungen</a><a href="#"${miss({ t: 'Impressum' })}>Impressum</a><a href="#"${miss({ t: 'Datenschutzerklärung' })}>Datenschutzerklärung</a></nav></div>`;
    ftr.querySelectorAll('.ftr__lang button').forEach(b => b.addEventListener('click', () => { ftr.querySelectorAll('.ftr__lang button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); if (b.textContent !== 'DE') toast(`Die ${({ FR: 'französische', IT: 'italienische', EN: 'englische' })[b.textContent]} Version ist in diesem Prototyp noch nicht verfügbar.`); }));

    const t = document.createElement('div'); t.className = 'toast'; t.id = 'toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite');
    document.body.appendChild(t);
  }
  chrome();

  /* ---------- Fehlende Seiten: freundlicher Hinweis statt toter Link ---------- */
  let toastT = 0;
  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('is-on');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('is-on'), 2800);
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-missing]');
    if (!a) return;
    e.preventDefault();
    toast(`«${a.dataset.missing}» ist in diesem Prototyp noch nicht gestaltet.`);
  });

  /* ---------- Barrierefreiheit (Desktop/Accessibility-Panel 3510:39661) ---------- */
  (function a11yPanel() {
    const panel = document.getElementById('a11y'), scrim = document.querySelector('.a11y-scrim'), btn = document.querySelector('.js-a11y'), hdr = document.getElementById('hdr');
    if (!panel || !btn) return;
    const root = document.documentElement, KEY = 'ar-a11y';
    let prefs = { fs: 'normal', ct: 'normal' };
    try { prefs = { ...prefs, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch (e) {}
    function apply() {
      root.classList.toggle('fs-large', prefs.fs === 'large'); root.classList.toggle('ct-high', prefs.ct === 'high');
      panel.querySelectorAll('[data-a11y]').forEach(b => b.setAttribute('aria-pressed', String(prefs[b.dataset.a11y] === b.dataset.v)));
    }
    apply();
    panel.querySelectorAll('[data-a11y]').forEach(b => b.addEventListener('click', () => {
      prefs[b.dataset.a11y] = b.dataset.v; apply();
      try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) {}
    }));
    // Wie Demo «Navbar»: Panel öffnet von oben (Clip), Inhalt folgt gestaffelt, Navbar wird weiss,
    // der aktive Button bleibt Anthrazit, alle anderen werden grau, der Burger blendet aus und «Menü» rückt nach.
    // Schliessen: erneuter Klick, ein anderer Navbar-Button, Kreuz, Scrim oder Esc – schneller als das Öffnen.
    [...panel.querySelector('.a11y__in').children].forEach((el, k) => el.style.setProperty('--k', k));
    let open = false;
    function set(o, focus = true) {
      if (o === open) return;
      open = o; btn.setAttribute('aria-expanded', String(o)); document.body.classList.toggle('a11y-open', o);
      hdr.classList.remove('is-hidden');
      if (o) { panel.hidden = false; scrim.hidden = false; void panel.offsetWidth; panel.classList.add('is-on'); scrim.classList.add('is-on'); if (focus) panel.querySelector('[data-a11y][aria-pressed="true"]').focus({ preventScroll: true }); }
      else { panel.classList.remove('is-on'); scrim.classList.remove('is-on'); setTimeout(() => { if (!open) { panel.hidden = true; scrim.hidden = true; } }, reduce.matches ? 0 : 240); if (focus) btn.focus({ preventScroll: true }); }
    }
    window.arCloseA11y = () => set(false, false);
    btn.addEventListener('click', () => set(!open));
    document.querySelectorAll('.hdr .hbtn:not(.js-a11y)').forEach(b => b.addEventListener('click', () => set(false, false)));
    panel.querySelector('.a11y__close').addEventListener('click', () => set(false));
    scrim.addEventListener('click', () => set(false));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) set(false); });
  })();

  /* ---------- Sprache (wie Demo «Navbar»): Klick auf DE öffnet FR IT EN daneben, Auswahl oder Klick daneben schliesst ---------- */
  document.querySelectorAll('.hdr .lang').forEach(g => {
    const cur = g.querySelector('.lang__btn[aria-pressed="true"]');
    const setOpen = o => { g.classList.toggle('is-open', o); cur.setAttribute('aria-expanded', String(o)); };
    g.querySelectorAll('.lang__btn').forEach(b => b.addEventListener('click', () => {
      if (b === cur) { setOpen(!g.classList.contains('is-open')); return; }
      setOpen(false); cur.focus({ preventScroll: true });
      toast(`Die Version «${b.getAttribute('aria-label')}» ist in diesem Prototyp noch nicht verfügbar.`);
    }));
    document.addEventListener('click', e => { if (!g.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  });

  /* ---------- Lazy-Load (Blur-up) ---------- */
  function watchMedia(scope) {
    scope.querySelectorAll('.media img').forEach(img => {
      const done = () => img.closest('.media').classList.add('is-loaded');
      if (img.complete && img.naturalWidth) done();
      else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
    });
  }

  /* ---------- Öffnungszeiten heute ---------- */
  const todayHours = (() => {
    const d = new Date(), m = d.getMonth() + 1, day = d.getDate(), wd = d.getDay();
    if ((m === 12 && (day >= 24 && day <= 26 || day === 31)) || (m === 1 && day === 1)) return null;
    if (m >= 3 && m <= 10) return '10.00 – 17.00 Uhr';
    if (wd === 1) return null;
    return '10.00 – 15.00 Uhr';
  })();
  document.querySelectorAll('.js-hours').forEach(el => { el.textContent = todayHours || 'Heute geschlossen'; });
  document.querySelectorAll('.js-hours-l').forEach(el => { el.textContent = todayHours ? `Heute geöffnet: ${todayHours}` : 'Heute geschlossen'; });
  const openText = document.getElementById('open-text'), openDot = document.getElementById('open-dot');
  if (!todayHours) document.querySelectorAll('.hdot').forEach(d => d.classList.add('is-closed'));   // Puls nur, wenn geöffnet
  if (openText) { openText.textContent = todayHours ? `Heute geöffnet: ${todayHours}` : 'Heute geschlossen'; if (!todayHours) openDot.classList.add('is-closed'); }

  /* ---------- Hinweisleiste ---------- */
  const alertEl = document.getElementById('alert');
  if (alertEl) {
    try { if (sessionStorage.getItem('ar-alert-' + page) === '1') alertEl.classList.add('is-closed'); } catch (e) {}
    alertEl.querySelector('.alert__close').addEventListener('click', () => {
      alertEl.classList.add('is-closed');
      try { sessionStorage.setItem('ar-alert-' + page, '1'); } catch (e) {}
      const t0 = performance.now();
      const follow = now => { frame(); if (now - t0 < 450) requestAnimationFrame(follow); };
      requestAnimationFrame(follow);
    });
  }

  /* ---------- Header (+ wanderndes Logo auf der Startseite) ---------- */
  const hdr = document.getElementById('hdr'), hero = document.querySelector('.hero, .hero2');
  const logo = document.getElementById('biglogo'), slot = document.getElementById('logo-slot');
  const menu = document.getElementById('menu');
  const RATIO = 112.709 / 1344;
  let bigW = 0, lastY = scrollY, upTravel = 0, docked = !logo;
  const light = document.body.classList.contains('is-light');
  const wrapPad = () => parseFloat(getComputedStyle(document.querySelector('.wrap')).paddingLeft);
  function sizeLogo() { if (!logo) return; bigW = root.clientWidth - 2 * wrapPad(); logo.style.width = `${bigW}px`; }
  function placeLogo() {
    const top = alertEl && alertEl.classList.contains('alert--top') ? Math.max(0, alertEl.getBoundingClientRect().bottom) : 0;
    hdr.style.setProperty('--hdr-top', `${top}px`);
    if (!logo) return;
    const hr = hdr.getBoundingClientRect(), heroR = hero.getBoundingClientRect(), sr = slot.getBoundingClientRect();
    const m = wrapPad(), bottomGap = mobile.matches ? 28 : 48;
    const sx = m, sy = heroR.bottom - bottomGap - bigW * RATIO - hr.top;
    // Mobile: Logo wandert nicht in die Navbar (dort steht das AR-Kürzel), es blendet aus,
    // während seine Mitte von 75 % auf 50 % der Viewport-Höhe steigt.
    if (mobile.matches) {
      const h = bigW * RATIO, center = hr.top + sy + h / 2, vh = innerHeight;
      const q = clamp((vh * .75 - center) / (vh * .25), 0, 1), move = reduce.matches ? 0 : q;
      logo.style.transform = `translate3d(${(sx + bigW * .02 * move).toFixed(1)}px, ${(sy - 16 * move).toFixed(1)}px, 0) scale(${(1 - .04 * move).toFixed(4)})`;
      logo.style.opacity = (1 - q).toFixed(3);
      logo.style.pointerEvents = q >= 1 ? 'none' : '';
      logo.classList.add('is-placed');
      docked = q >= 1;
      return;
    }
    logo.style.opacity = ''; logo.style.pointerEvents = '';
    const ex = sr.left - hr.left, ey = sr.top - hr.top, ew = sr.width;
    let p = clamp(scrollY / Math.max(1, hero.offsetHeight * 0.55), 0, 1);
    if (reduce.matches) p = p < .5 ? 0 : 1;
    const e = smooth(p);
    logo.style.transform = `translate3d(${(sx + (ex - sx) * e).toFixed(1)}px, ${(sy + (ey - sy) * e).toFixed(1)}px, 0) scale(${((bigW + (ew - bigW) * e) / bigW).toFixed(4)})`;
    logo.classList.add('is-placed');
    docked = p >= 1;
  }
  function header() {
    const y = scrollY, dy = y - lastY;
    const limit = hero && !light ? hero.offsetTop + hero.offsetHeight - hdr.offsetHeight : 4;
    hdr.classList.toggle('is-solid', light || y > limit);
    if (y <= 10 || !docked) { hdr.classList.remove('is-hidden'); upTravel = 0; }
    else if (dy > 0) { upTravel = 0; if (!menu.classList.contains('is-open') && !document.body.classList.contains('a11y-open') && y > Math.max(120, limit)) hdr.classList.add('is-hidden'); }
    else if (dy < 0) { upTravel -= dy; if (upTravel > 48) hdr.classList.remove('is-hidden'); }
    lastY = y;
  }

  /* ---------- Parallax + Collage ---------- */
  const px = [...document.querySelectorAll('[data-parallax]')];
  function parallax() {
    if (reduce.matches) { px.forEach(el => el.style.transform = ''); return; }
    const vh = innerHeight;
    for (const el of px) {
      const box = el.parentElement.getBoundingClientRect();
      if (box.bottom < -200 || box.top > vh + 200) continue;
      const offset = box.top + box.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-offset * parseFloat(el.dataset.parallax)).toFixed(1)}px, 0)`;
    }
  }
  const reads = [...document.querySelectorAll('.read')].map(r => [r, [...r.querySelectorAll('.collage__col')]]);
  function collageMotion() {
    for (const [read, cols] of reads) {
      if (reduce.matches || mobile.matches) { cols.forEach(c => c.style.transform = ''); continue; }
      const box = read.getBoundingClientRect(), vh = innerHeight;
      if (box.bottom < -100 || box.top > vh + 100) continue;
      const travelled = vh * 0.5 - box.top;
      for (const c of cols) c.style.transform = `translate3d(0, ${(-travelled * parseFloat(c.dataset.y)).toFixed(1)}px, 0)`;
    }
  }
  // Wissenswertes-Teaser: Parallax im Gegenlauf – äussere Spalten laufen nach unten, die mittlere nach oben (data-dir)
  const wts = [...document.querySelectorAll('.wt')].map(w => [w, [...w.querySelectorAll('.wt__col')]]);
  function wtMotion() {
    for (const [w, cols] of wts) {
      if (reduce.matches) { cols.forEach(c => c.style.transform = ''); continue; }
      const box = w.getBoundingClientRect(), vh = innerHeight;
      if (box.bottom < -100 || box.top > vh + 100) continue;
      const p = clamp((vh - box.top) / (vh + box.height), 0, 1);   // 0 = Section unten im Bild, 1 = oben raus
      const amp = mobile.matches ? 56 : 120;
      for (const c of cols) c.style.transform = `translate3d(0, ${((2 * p - 1) * amp * parseFloat(c.dataset.dir)).toFixed(1)}px, 0)`;
    }
  }
  let ticking = false;
  function frame() { ticking = false; placeLogo(); parallax(); collageMotion(); wtMotion(); }
  addEventListener('scroll', () => { header(); if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener('resize', () => { sizeLogo(); requestAnimationFrame(frame); });
  mobile.addEventListener('change', () => { sizeLogo(); frame(); });
  sizeLogo(); header(); frame();
  requestAnimationFrame(() => requestAnimationFrame(() => { hdr.classList.add('is-ready'); document.querySelectorAll('.hero, .hero2').forEach(h => h.classList.add('is-ready')); }));

  /* ---------- Menü: drei Ebenen, Desktop nebeneinander, Mobile als Drill-down ---------- */
  (function menuNav() {
    let trigger = null, sel1 = null, sel2 = null;
    const main = menu.querySelector('.menu__main'), cols = menu.querySelector('.menu__cols');
    const panel = key => cols.querySelector(`[data-panel="${key}"]`);
    const bgs = [...menu.querySelectorAll('.menu__bg img')];
    const views = { l1: menu.querySelector('[data-view="l1"]'), l2: menu.querySelector('[data-view="l2"]'), l3: menu.querySelector('[data-view="l3"]') };
    function bg(i) { bgs.forEach((b, k) => b.classList.toggle('is-on', k === i)); }
    function showPanels() {
      cols.querySelectorAll('.mpanel').forEach(p => p.classList.remove('is-on', 'is-dim', 'is-narrow'));
      main.classList.toggle('has-sel', sel1 !== null);
      main.querySelectorAll('.m1').forEach(b => b.setAttribute('aria-expanded', String(+b.dataset.l1 === sel1)));
      if (sel1 === null) { panel('aud').classList.add('is-on'); bg(0); return; }
      const p2 = panel(sel1); p2.classList.add('is-on');
      bg(sel1 + 1);
      p2.querySelectorAll('[data-l2]').forEach(b => b.setAttribute('aria-expanded', String(b.dataset.l2 === sel2)));
      if (sel2) { p2.classList.add('is-dim', 'is-narrow'); panel(sel2).classList.add('is-on'); }
    }
    function view(name, dir) {
      Object.entries(views).forEach(([k, v]) => { v.classList.toggle('is-on', k === name); v.dataset.dir = dir || ''; });
      if (name !== 'l1') {
        const key = name === 'l2' ? String(sel1) : sel2;
        const slotEl = views[name].querySelector('.menu__mslot');
        slotEl.innerHTML = ''; const clone = panel(key).cloneNode(true); clone.classList.add('is-on'); clone.classList.remove('is-dim', 'is-narrow'); slotEl.appendChild(clone);
        if (name === 'l3') views.l3.querySelector('.menu__back span').textContent = NAV[sel1].t;
        bindPanel(clone);
        const f = views[name].querySelector('.menu__back'); f && f.focus({ preventScroll: true });
      }
      menu.scrollTo({ top: 0 });
    }
    function pick1(i) {
      if (sel1 === i && !mobile.matches) return;  // per Hover schon gewählt: Klick schaltet nicht wieder aus
      sel1 = i; sel2 = null; showPanels();
      if (mobile.matches) view('l2');
    }
    function pick2(key) {
      sel2 = sel2 === key && !mobile.matches ? null : key; showPanels();
      if (mobile.matches) view('l3');
    }
    function bindPanel(scope) {
      scope.querySelectorAll('[data-l2]').forEach(b => b.addEventListener('click', () => pick2(b.dataset.l2)));
      scope.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { if (!a.dataset.missing) setMenu(false); }));
    }
    main.querySelectorAll('.m1').forEach(b => b.addEventListener('click', () => pick1(+b.dataset.l1)));
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) main.querySelectorAll('.m1').forEach(b => b.addEventListener('pointerenter', () => { if (sel1 !== +b.dataset.l1) { sel1 = +b.dataset.l1; sel2 = null; showPanels(); } }));
    bindPanel(cols); bindPanel(views.l1);
    menu.querySelectorAll('[data-back]').forEach(b => b.addEventListener('click', () => { if (b.dataset.back === 'l1') { sel1 = null; sel2 = null; showPanels(); } else { sel2 = null; showPanels(); } view(b.dataset.back, 'back'); }));
    function setMenu(open, trig) {
      menu.classList.toggle('is-open', open);
      document.querySelectorAll('.js-menu[aria-expanded]').forEach(b => b.setAttribute('aria-expanded', open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        trigger = trig;
        // Startzustand wie Figma (Menu-open): keine Ebene gewählt, rechts «Alle Infos für»
        sel1 = null; sel2 = null;
        showPanels(); view('l1');
        setTimeout(() => menu.querySelector('.js-menu-close').focus(), 50);
      } else if (trigger) trigger.focus();
    }
    document.querySelectorAll('.js-menu').forEach(b => b.addEventListener('click', () => setMenu(true, b)));
    menu.querySelector('.js-menu-close').addEventListener('click', () => setMenu(false));
    menu.addEventListener('keydown', e => {
      if (e.key === 'Escape') { if (sel2 && !mobile.matches) { sel2 = null; showPanels(); } else if (sel1 !== null && !mobile.matches) { sel1 = null; showPanels(); } else setMenu(false); }
      if (e.key === 'Tab') {
        const f = [...menu.querySelectorAll('button, a')].filter(x => x.offsetParent !== null && getComputedStyle(x).visibility !== 'hidden');
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    mobile.addEventListener('change', () => { if (menu.classList.contains('is-open')) view('l1'); });
  })();
  document.querySelectorAll('.ftr__lang button').forEach(b => b.addEventListener('click', () => document.querySelectorAll('.ftr__lang button').forEach(x => x.setAttribute('aria-pressed', x === b))));

  /* ---------- Horizontale Spur ---------- */
  function track(rootEl, { trackEl, step = 'page', onScroll, onUser } = {}) {
    const tr = trackEl || rootEl.querySelector('.track');
    const bar = rootEl.querySelector('.progress span');
    const prev = rootEl.querySelector('.js-prev'), next = rootEl.querySelector('.js-next');
    let anim = 0, animating = false;
    const items = () => [...tr.children].filter(el => el.offsetParent !== null);
    const max = () => tr.scrollWidth - tr.clientWidth;
    const base = () => (items()[0] ? items()[0].offsetLeft : 0);
    const snaps = () => items().map(it => Math.min(max(), it.offsetLeft - base())).filter((v, i, a) => i === 0 || v > a[i - 1] + 1);
    const depth = rootEl.classList.contains('teasers') ? [...tr.children].map(it => [it, it.querySelector('.media')]) : [];
    function update() {
      const m = max(), p = m > 0 ? tr.scrollLeft / m : 0, vis = m > 0 ? tr.clientWidth / tr.scrollWidth : 1;
      if (bar) bar.style.transform = `translateX(${(p * (1 - vis) * 100).toFixed(2)}%) scaleX(${vis.toFixed(3)})`;
      if (prev) prev.setAttribute('aria-disabled', tr.scrollLeft <= 2);
      if (next) next.setAttribute('aria-disabled', tr.scrollLeft >= m - 2);
      for (const [card, media] of depth) {
        if (!media) continue;
        if (reduce.matches) { media.style.transform = ''; continue; }
        const off = clamp((card.offsetLeft - tr.scrollLeft + card.offsetWidth / 2 - tr.clientWidth / 2) / tr.clientWidth, -1, 1);
        media.style.transform = `translate3d(${(-off * card.offsetWidth * 0.08).toFixed(1)}px, 0, 0)`;
      }
      onScroll && onScroll(animating);
    }
    function scrollToX(x, done) {
      x = clamp(x, 0, max());
      cancelAnimationFrame(anim);
      if (reduce.matches) { tr.scrollLeft = x; animating = false; update(); done && done(); return; }
      const from = tr.scrollLeft, dist = x - from;
      if (Math.abs(dist) < 1) { done && done(); return; }
      const dur = clamp(Math.abs(dist) * 0.8, 600, 1100), t0 = performance.now();
      tr.classList.add('is-free'); animating = true;
      const stepFn = now => {
        const t = Math.min(1, (now - t0) / dur);
        tr.scrollLeft = from + dist * easeInOut(t);
        if (t < 1) anim = requestAnimationFrame(stepFn);
        else { tr.classList.remove('is-free'); animating = false; update(); done && done(); }
      };
      anim = requestAnimationFrame(stepFn);
    }
    function go(dir) {
      const s = snaps(), x = tr.scrollLeft;
      let target;
      if (step === 'one') target = dir > 0 ? (s.find(v => v > x + 4) ?? max()) : ([...s].reverse().find(v => v < x - 4) ?? 0);
      else {
        const pg = tr.clientWidth * 0.8;
        if (dir > 0) { const ahead = s.filter(v => v > x + 4); target = [...ahead].reverse().find(v => v <= x + pg) ?? ahead[0] ?? max(); }
        else { const behind = s.filter(v => v < x - 4); target = behind.find(v => v >= x - pg) ?? behind[behind.length - 1] ?? 0; }
      }
      onUser && onUser();
      scrollToX(target);
    }
    prev && prev.addEventListener('click', () => go(-1));
    next && next.addEventListener('click', () => go(1));
    tr.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    ['wheel', 'touchstart'].forEach(t => tr.addEventListener(t, () => onUser && onUser(), { passive: true }));
    dragScroll(tr, { onStart: () => { cancelAnimationFrame(anim); animating = false; onUser && onUser(); }, onEnd: projected => {
      const s = snaps();
      scrollToX(s.reduce((a, b) => Math.abs(b - projected) < Math.abs(a - projected) ? b : a, s[0]));
    } });
    update();
    return { tr, update, scrollToX, base, items, isAnimating: () => animating };
  }
  function dragScroll(el, { onStart, onEnd } = {}) {
    let down = false, moved = false, startX = 0, startL = 0, lastX = 0, lastT = 0, v = 0;
    el.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; startX = lastX = e.clientX; startL = el.scrollLeft; lastT = performance.now(); v = 0;
    });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) { moved = true; el.classList.add('is-dragging', 'is-free'); onStart && onStart(); }
      if (!moved) return;
      el.scrollLeft = startL - dx;
      const now = performance.now(), dt = now - lastT;
      if (dt > 0) v = 0.8 * ((lastX - e.clientX) / dt) + 0.2 * v;
      lastX = e.clientX; lastT = now;
    });
    addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      if (!moved) return;
      el.classList.remove('is-dragging');
      if (onEnd) onEnd(el.scrollLeft + v * 280); else glide(el, v);
      setTimeout(() => { moved = false; }, 0);
    });
    el.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  }
  function glide(el, v) {
    el.classList.remove('is-free');
    if (reduce.matches) return;
    let last = performance.now();
    const stepFn = now => { const dt = now - last; last = now; el.scrollLeft += v * dt; v *= Math.pow(0.94, dt / 16); if (Math.abs(v) > 0.02) requestAnimationFrame(stepFn); };
    requestAnimationFrame(stepFn);
  }
  document.querySelectorAll('.teasers, .gallery').forEach(s => track(s));

  /* ---------- Programm: Kalender/Angebote × Grid/Liste mit Filtern ---------- */
  const OFFERS = [
    { t: 'Gustatio romana – Römische Häppchen selbst gemacht', img: 'f-63bd90b1', w: 1920, h: 1281, cat: 'Workshop', who: ['Erwachsene', 'Gruppen'], tags: [['', 'Workshop'], ['pin', 'Co-Creation']], member: true, link: P.angebot },
    { t: 'Augusta Raurica exklusiv', img: 'f-d2e3d0c2', w: 1920, h: 1280, cat: 'Führung', who: ['Erwachsene', 'Gruppen'], tags: [['', 'Führung'], ['pin', 'Co-Creation']], member: true, link: P.angebot },
    { t: 'Brotbacken: Vom Korn zum Römerbrot', img: 'f-922f317f', w: 1200, h: 800, cat: 'Workshop', who: ['Familien', 'Schulen'], tags: [['', 'Workshop']], link: P.angebot },
    { t: 'Kult und Kräuter', img: 'f-56aefc39', w: 1920, h: 1280, cat: 'Workshop', who: ['Erwachsene'], tags: [['', 'Workshop'], ['pin', 'Co-Creation']], link: P.angebot },
    { t: 'Führung für Familien im Römerhaus', img: 'f-21af4782', w: 1920, h: 1335, cat: 'Führung', who: ['Familien'], tags: [['', 'Führung'], ['access', 'Rollstuhlgängig']], link: P.angebot },
    { t: 'Das namenlose Gespenst: Ein Rätselrundgang voller Düfte und Gerüche', img: 'f-9d6ba486', w: 1920, h: 1280, cat: 'Ausstellung', who: ['Familien', 'Schulen'], tags: [['', 'Ausstellung'], ['pin', 'Co-Creation']], member: true, link: P.angebot },
    { t: 'Römische Salben und Zahnpulver herstellen', img: 'f-56aefc39', w: 1920, h: 1280, cat: 'Workshop', who: ['Schulen', 'Gruppen'], tags: [['', 'Workshop']], link: P.angebot },
    { t: 'Ruinengeschichten digital', img: 'f-04bd0f75', w: 1920, h: 1920, cat: 'Selbständig', who: ['Erwachsene', 'Familien'], tags: [['', 'Selbständig'], ['pin', 'Co-Creation']], link: P.angebot },
  ];
  const EVENTS = [
    { t: 'Das perfekte Dinner. Römer, Macht und Müll. Teil II', img: 'f-9d6ba486', cat: 'Ausstellung', who: ['Erwachsene'], tags: [['', 'Ausstellung']], member: true, time: '10:00–15:00 Uhr', link: P.angebot },
    { t: 'Das namenlose Gespenst: Ein Rätselrundgang voller Düfte und Gerüche', img: 'f-36c0ccba', cat: 'Selbständig', who: ['Familien'], tags: [['', 'Selbständig']], time: '10:00–15:00 Uhr', link: P.angebot },
    { t: 'Römische Salben und Zahnpulver herstellen', img: 'f-56aefc39', cat: 'Workshop', who: ['Schulen', 'Erwachsene'], tags: [['', 'Workshop']], time: '10:00–12:30 Uhr', link: P.angebot },
    { t: 'Ruinengeschichten digital', img: 'f-04bd0f75', cat: 'Selbständig', who: ['Erwachsene'], tags: [['', 'Selbständig'], ['pin', 'Co-Creation']], time: '10:00–15:00 Uhr', link: P.angebot },
    { t: 'Führung für Familien im Römerhaus', img: 'f-21af4782', cat: 'Führung', who: ['Familien'], tags: [['', 'Führung']], time: '13:00–14:00 Uhr', link: P.angebot },
    { t: 'Live in Concert: Apocalyptica im römischen Theater', img: 'f-48400d13', cat: 'Konzert', who: ['Erwachsene'], tags: [['', 'Open-Air'], ['access', 'Rollstuhlzugänglich']], time: '19:00–22:30 Uhr', link: P.event },
    { t: 'Öl, Wein und Fischsauce: Eine Führung zu den Amphoren', img: 'amphoren', cat: 'Führung', who: ['Erwachsene', 'Gruppen'], tags: [['', 'Führung'], ['access', 'Barrierefrei']], time: '11:00–12:00 Uhr', link: P.angebot },
    { t: 'Morgenrunde im Tierpark: Römische Haustierrassen', img: 'tierpark', cat: 'Führung', who: ['Familien'], tags: [['pin', 'Tierpark']], time: '09:30–10:30 Uhr', link: P.angebot },
    { t: 'Maskenwerkstatt: Eine Theatermaske selbst gestalten', img: 'masken', cat: 'Workshop', who: ['Familien', 'Schulen'], tags: [['pin', 'Co-Creation'], ['', 'Workshop']], time: '13:00–16:00 Uhr', link: P.angebot },
  ];
  const WD = ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'], WDL = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const MON = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  const START = new Date(2026, 8, 20), DAYS = 36, iso = d => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  const PER_DAY = { 0: 6, 1: 3, 2: 4, 3: 3, 4: 5, 5: 4, 6: 6 };
  const DATED = []; (() => { let k = 0;
    for (let i = 0; i < DAYS; i++) { const d = new Date(START); d.setDate(START.getDate() + i); const dow = d.getDay();
      for (let j = 0; j < PER_DAY[dow]; j++, k++) { const e = EVENTS[(i * 2 + j) % EVENTS.length];
        const st = (i + j) % 7 === 0 ? 'booked' : (i + j) % 11 === 3 ? 'cancel' : (i + j) % 3 === 1 ? 'free' : 'open';
        DATED.push({ ...e, day: iso(d), date: d, dow, st, places: 2 + (i + j) % 18, size: k % 3 }); } } })();
  const icon = n => n ? I(n) : '';
  const imgSrc = n => `img/${n}.jpg`, lq = n => `img/${n}-lqip.jpg`;
  const stateLabel = e => e.st === 'booked' ? 'Ausgebucht' : e.st === 'cancel' ? 'Abgesagt' : `${e.places} freie Plätze`;
  const tagsHtml = (e, cls) => `<p class="${cls}">${e.member ? `<span>${I('bank')}Nur für Mitglieder</span>` : ''}${e.tags.map(([ic, l]) => `<span>${icon(ic)}${l}</span>`).join('')}<span aria-label="Mit Audiodeskription">${I('eye')}</span></p>`;
  function rowEvent(e, i) {
    const off = e.st === 'booked' || e.st === 'cancel';
    return `<li class="prow" style="--i:${i}"><a class="media" href="${e.link}" tabindex="-1" aria-hidden="true" style="--lqip:url(${lq(e.img)})"><img src="${imgSrc(e.img)}" alt="" loading="lazy" decoding="async"></a>
      <div><h3><a href="${e.link}">${e.t}</a></h3><p class="prow__time"><span class="sr-only">${WDL[e.dow]}, ${e.date.getDate()}. ${MON[e.date.getMonth()]}, </span>${e.time}</p><p class="prow__state">${I('clock')}${stateLabel(e)}</p></div>
      ${tagsHtml(e, 'prow__tags')}
      <div class="prow__cta">${off ? '<span class="btn btn--off" aria-disabled="true">Ticket kaufen</span>' : `<a class="btn" href="${P.tickets}">Ticket kaufen</a>`}<a class="tlink" href="${e.link}"><span>Mehr erfahren</span>${ARROW}</a></div></li>`;
  }
  function rowOffer(o, i) {
    return `<li class="prow" style="--i:${i}"><a class="media" href="${o.link}" tabindex="-1" aria-hidden="true" style="--lqip:url(${lq(o.img)})"><img src="${imgSrc(o.img)}" alt="" loading="lazy" decoding="async"></a>
      <div><h3><a href="${o.link}">${o.t}</a></h3></div>${tagsHtml(o, 'prow__tags')}<div class="prow__cta"><a class="btn" href="${o.link}">Mehr erfahren</a></div></li>`;
  }
  function cardEvent(e, i) {
    const off = e.st === 'booked' || e.st === 'cancel', size = '';
    const state = e.st === 'open' ? '' : `<span class="ev__state">${I('clock')}${stateLabel(e)}</span>`;
    return `<article class="ev${size}" style="--i:${i}" data-day="${e.day}"><a class="ev__media media" href="${e.link}" style="--lqip:url(${lq(e.img)})" tabindex="-1" aria-hidden="true"><img src="${imgSrc(e.img)}" alt="" loading="lazy" decoding="async">${state}</a>
      ${tagsHtml(e, 'ev__tags')}<h3>${e.t}</h3><p class="ev__time"><span class="sr-only">${WDL[e.dow]}, ${e.date.getDate()}. ${MON[e.date.getMonth()]}, </span>${e.time}</p>
      <div class="btns">${off ? '<span class="btn btn--off" aria-disabled="true">Ticket kaufen</span>' : `<a class="btn" href="${P.tickets}">Ticket kaufen</a>`}<a class="tlink" href="${e.link}"><span>Mehr erfahren</span>${ARROW}</a></div></article>`;
  }
  function cardOffer(o, i) {
    return `<article class="oc" style="--i:${i}"><a class="media" href="${o.link}" style="--lqip:url(${lq(o.img)})" tabindex="-1" aria-hidden="true"><img src="${imgSrc(o.img)}" alt="" loading="lazy" decoding="async"></a>
      ${o.member ? `<span class="ev__state">${I('bank')}Nur für Mitglieder</span>` : ''}${tagsHtml({ ...o, member: false }, 'ev__tags')}<h3>${o.t}</h3><div class="btns"><a class="btn" href="${o.link}">Mehr erfahren</a></div></article>`;
  }
  const FILTERS = { wer: ['Erwachsene', 'Familien', 'Schulen', 'Gruppen'], was: ['Führung', 'Workshop', 'Ausstellung', 'Selbständig', 'Konzert'], verf: ['Freie Plätze', 'Ausgebuchte ausblenden'] };
  document.querySelectorAll('[data-prog]').forEach(sec => {
    const state = { mode: sec.dataset.mode || 'kalender', layout: sec.dataset.layout || 'grid', wer: null, was: null, verf: null };
    const limit = +(sec.dataset.limit || 0);
    const out = sec.querySelector('.prog__out');
    sec.querySelector('.prog__bar').innerHTML = `
      <div class="seg" role="group" aria-label="Ansicht"><button class="btn" type="button" data-mode="kalender">Kalender</button><button class="btn" type="button" data-mode="angebote">Angebote</button></div>
      <div class="prog__tools"><button class="chip prog__ftoggle" type="button" aria-expanded="false"><span>Filter</span><svg class="i ic-off" aria-hidden="true"><use href="#i-plus"/></svg><svg class="i ic-on" aria-hidden="true"><use href="#i-close"/></svg></button><div class="filters">${Object.entries({ wer: 'Wer', was: 'Was', verf: 'Verfügbarkeit' }).map(([k, l]) => `<div class="dd"><button class="chip chip--sm" type="button" aria-expanded="false" data-dd="${k}"><span>${l}</span>${I('down')}</button><div class="dd__menu" role="menu">${FILTERS[k].map(o => `<button class="dd__opt" type="button" role="menuitemradio" aria-checked="false" data-f="${k}" data-v="${o}">${o}</button>`).join('')}</div></div>`).join('')}</div>
      <div class="lay" role="group" aria-label="Darstellung"><button class="chip" type="button" data-lay="grid">${I('grid')}<span>Grid</span></button><button class="chip" type="button" data-lay="list">${I('list')}<span>List</span></button></div></div>`;
    let cal = null, current = null, dayBtns = [];
    const ft = sec.querySelector('.prog__ftoggle'); ft.addEventListener('click', () => { const o = ft.getAttribute('aria-expanded') !== 'true'; ft.setAttribute('aria-expanded', String(o)); sec.querySelector('.prog__bar').classList.toggle('is-filters', o); });
    const daysWrap = sec.querySelector('.days');
    function filtered(list) {
      return list.filter(e => (!state.wer || e.who.includes(state.wer)) && (!state.was || e.cat === state.was) && (state.verf !== 'Freie Plätze' || e.st === 'free') && (state.verf !== 'Ausgebuchte ausblenden' || e.st !== 'booked'));
    }
    function buildDays() {
      const row = daysWrap.querySelector('.days__row'); row.innerHTML = '<span class="days__ind" aria-hidden="true"></span>'; dayBtns = [];
      for (let i = 0; i < DAYS; i++) { const d = new Date(START); d.setDate(START.getDate() + i); const dow = d.getDay();
        const b = document.createElement('button'); b.type = 'button'; b.className = 'day' + (dow === 0 || dow === 6 ? ' is-we' : ''); b.dataset.day = iso(d);
        b.setAttribute('aria-pressed', 'false'); b.setAttribute('aria-label', `${WDL[dow]}, ${d.getDate()}. ${MON[d.getMonth()]}`);
        b.innerHTML = `<span>${WD[dow]}</span><b>${d.getDate()}.${d.getMonth() + 1}</b>`; row.appendChild(b); dayBtns.push(b);
        b.addEventListener('click', () => pickDay(b.dataset.day)); }
      dragScroll(daysWrap);
    }
    const ind = () => daysWrap.querySelector('.days__ind');
    function setDay(id, center = true) {
      current = id; const b = dayBtns.find(x => x.dataset.day === id); if (!b) return;
      dayBtns.forEach(x => x.setAttribute('aria-pressed', x === b)); ind().style.transform = `translate3d(${b.offsetLeft}px,0,0)`;
      if (center && !daysWrap.classList.contains('is-dragging')) daysWrap.scrollTo({ left: clamp(b.offsetLeft - daysWrap.clientWidth / 2 + 32, 0, daysWrap.scrollWidth - daysWrap.clientWidth), behavior: reduce.matches ? 'auto' : 'smooth' });
    }
    function markEmpty(items) { const has = new Set(items.map(e => e.day)); dayBtns.forEach(b => b.classList.toggle('is-empty', !has.has(b.dataset.day))); }
    function pickDay(id) {
      if (id === current) return;
      setDay(id); render(true);
    }
    const cmp = (a, b) => { const [y1, m1, d1] = a.split('-').map(Number), [y2, m2, d2] = b.split('-').map(Number); return (y1 - y2) || (m1 - m2) || (d1 - d2); };
    function render(soft) {
      sec.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)));
      sec.querySelectorAll('[data-lay]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lay === state.layout)));
      sec.querySelectorAll('[data-dd]').forEach(b => { const v = state[b.dataset.dd]; b.classList.toggle('has-val', !!v); b.querySelector('span').textContent = v || { wer: 'Wer', was: 'Was', verf: 'Verfügbarkeit' }[b.dataset.dd]; });
      sec.querySelectorAll('.dd__opt').forEach(o => o.setAttribute('aria-checked', String(state[o.dataset.f] === o.dataset.v)));
      daysWrap.hidden = state.mode !== 'kalender';
      const draw = () => {
        cal = null;
        if (state.mode === 'kalender') {
          const items = filtered(DATED); markEmpty(items);
          if (!current) current = '2026-9-28';
          setDay(current, !soft);
          const day = items.filter(e => e.day === current), d = dayBtns.find(x => x.dataset.day === current);
          const empty = `<p class="prog__empty${state.layout === 'grid' ? ' wrap' : ''}">An diesem Tag gibt es${state.wer || state.was || state.verf ? ' für diese Auswahl' : ''} keine Veranstaltungen. Wähle einen anderen Tag.</p>`;
          if (state.layout === 'list') {
            out.innerHTML = day.length ? `<ul class="plist">${day.map(rowEvent).join('')}</ul>` : empty;
          } else {
            out.innerHTML = day.length ? `<div class="slider-cal"><div class="track" aria-label="Veranstaltungen am ${d ? d.getAttribute('aria-label') : ''}">${day.map(cardEvent).join('')}</div><div class="slider__bar wrap"><div class="progress" aria-hidden="true"><span></span></div><div class="slider__nav"><button class="round round--prev js-prev" type="button" aria-label="Vorherige Veranstaltung">${ARROW}</button><button class="round js-next" type="button" aria-label="Nächste Veranstaltung">${ARROW}</button></div></div></div>` : empty;
            if (day.length) cal = track(out.querySelector('.slider-cal'), { step: 'one' });
          }
        } else {
          const items = filtered(OFFERS.map(o => ({ ...o, st: 'open' }))), list = limit ? items.slice(0, limit) : items;
          if (state.layout === 'list') out.innerHTML = list.length ? `<ul class="plist">${list.map(rowOffer).join('')}</ul><div class="prog__more"><a class="btn btn--outline" href="${P.programm}#programm">Alle Angebote</a></div>` : '<p class="prog__empty">Für diese Auswahl gibt es keine Angebote.</p>';
          else {
            out.innerHTML = list.length ? `<div class="slider-cal"><div class="track">${list.map(cardOffer).join('')}</div><div class="slider__bar wrap"><div class="progress" aria-hidden="true"><span></span></div><div class="slider__nav"><button class="round round--prev js-prev" type="button" aria-label="Vorheriges Angebot">${ARROW}</button><button class="round js-next" type="button" aria-label="Nächstes Angebot">${ARROW}</button></div></div></div>` : '<p class="prog__empty wrap">Für diese Auswahl gibt es keine Angebote.</p>';
            if (list.length) cal = track(out.querySelector('.slider-cal'), { step: 'one' });
          }
        }
        out.classList.toggle('wrap', state.layout === 'list');
        watchMedia(out);
        out.classList.remove('is-swap');
      };
      if (soft === 'instant' || reduce.matches) draw();
      else { out.classList.add('is-swap'); setTimeout(draw, 180); }
    }
    sec.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => { if (state.mode !== b.dataset.mode) { state.mode = b.dataset.mode; render(); } }));
    sec.querySelectorAll('[data-lay]').forEach(b => b.addEventListener('click', () => { if (state.layout !== b.dataset.lay) { state.layout = b.dataset.lay; render(); } }));
    // Dropdowns
    const closeAll = except => sec.querySelectorAll('.dd__menu.is-open').forEach(m => { if (m !== except) { m.classList.remove('is-open'); m.previousElementSibling.setAttribute('aria-expanded', 'false'); } });
    sec.querySelectorAll('[data-dd]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); const m = b.nextElementSibling, open = !m.classList.contains('is-open'); closeAll(m); m.classList.toggle('is-open', open); b.setAttribute('aria-expanded', String(open)); if (open) m.querySelector('.dd__opt').focus({ preventScroll: true }); }));
    sec.querySelectorAll('.dd__opt').forEach(o => o.addEventListener('click', () => { state[o.dataset.f] = state[o.dataset.f] === o.dataset.v ? null : o.dataset.v; closeAll(); render(); }));
    document.addEventListener('click', () => closeAll());
    sec.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
    buildDays();
    render('instant');
    // Gewählten Tag beim Laden mittig in der Datumsleiste zeigen (wie Figma)
    requestAnimationFrame(() => { const b = dayBtns.find(x => x.dataset.day === current); if (b && !daysWrap.hidden) daysWrap.scrollLeft = clamp(b.offsetLeft + b.offsetWidth / 2 - daysWrap.clientWidth / 2, 0, daysWrap.scrollWidth); });
  });

  /* ---------- Allgemeine Dropdowns (Dropdown 3029:3466) ---------- */
  document.querySelectorAll('[data-dd-generic]').forEach(dd => {
    const b = dd.querySelector('button'), m = dd.querySelector('.dd__menu'), label = b.querySelector('span'), def = label.textContent;
    const set = open => { m.classList.toggle('is-open', open); b.setAttribute('aria-expanded', String(open)); };
    b.addEventListener('click', e => { e.stopPropagation(); const open = !m.classList.contains('is-open'); document.querySelectorAll('.dd__menu.is-open').forEach(x => { if (x !== m) { x.classList.remove('is-open'); x.previousElementSibling.setAttribute('aria-expanded', 'false'); } }); set(open); if (open) m.querySelector('.dd__opt').focus({ preventScroll: true }); });
    m.querySelectorAll('.dd__opt').forEach(o => o.addEventListener('click', () => { const on = o.getAttribute('aria-checked') !== 'true'; m.querySelectorAll('.dd__opt').forEach(x => x.setAttribute('aria-checked', 'false')); o.setAttribute('aria-checked', String(on)); label.textContent = on ? o.textContent : def; b.classList.toggle('has-val', on); set(false); b.focus(); dd.dispatchEvent(new CustomEvent('ddchange', { detail: on ? (o.dataset.v || o.textContent) : null })); }));
    m.addEventListener('keydown', e => { const os = [...m.querySelectorAll('.dd__opt')], i = os.indexOf(document.activeElement); if (e.key === 'ArrowDown') { e.preventDefault(); os[(i + 1) % os.length].focus(); } if (e.key === 'ArrowUp') { e.preventDefault(); os[(i - 1 + os.length) % os.length].focus(); } if (e.key === 'Escape') { set(false); b.focus(); } });
    document.addEventListener('click', e => { if (!dd.contains(e.target)) set(false); });
  });

  /* ---------- Suche (Desktop/Suchergebnisse 3348:30391) ---------- */
  document.querySelectorAll('.search').forEach(sec => {
    const form = sec.querySelector('.sbar'), input = form.querySelector('input'), list = sec.querySelector('.search__list'), count = sec.querySelector('.search__count'), more = sec.querySelector('.js-more');
    const chips = [...sec.querySelectorAll('[data-cat]')];
    const fmt = d => `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
    const IDX = [];
    NAV.forEach(n => { IDX.push({ t: n.t, d: n.d || '', cat: 'Seiten', tag: 'Seite', h: href(n), crumbs: [n.t] });
      (n.c || []).forEach(c => { IDX.push({ t: c.t, d: c.d || `${c.t}: Informationen aus dem Bereich «${n.t}».`, cat: 'Seiten', tag: 'Seite', h: href(c), miss: !c.h, crumbs: [n.t, c.t] });
        (c.c || []).forEach(x => IDX.push({ t: x.t, d: `${x.t}: Teil von «${c.t}» im Bereich «${n.t}».`, cat: 'Seiten', tag: 'Seite', h: href(x), miss: !x.h, crumbs: [n.t, c.t, x.t] })); }); });
    const seen = new Set();
    DATED.forEach(e => { if (seen.has(e.t)) return; seen.add(e.t);
      IDX.push({ t: e.t, d: `${e.cat} · ${e.time}. ${e.who.join(', ')}.`, cat: e.cat === 'Ausstellung' ? 'Ausstellungen' : 'Veranstaltungen', tag: e.cat, date: e.date, img: e.img, h: e.link, crumbs: ['Programm', e.t] }); });
    OFFERS.forEach(o => IDX.push({ t: o.t, d: `${o.cat} für ${o.who.join(', ')}.`, cat: o.who.includes('Schulen') ? 'Schulen' : o.cat === 'Führung' ? 'Führungen' : o.cat === 'Ausstellung' ? 'Ausstellungen' : 'Veranstaltungen', tag: o.cat, img: o.img, h: o.link, crumbs: ['Programm', 'Angebote', o.t] }));
    const params = new URLSearchParams(location.search);
    let q = params.get('q') || '', cat = 'Alle', sort = 'rel', shown = 3;
    input.value = q;
    const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    function results() {
      const words = norm(q).split(/\s+/).filter(Boolean);
      let r = IDX.map(it => { const T = norm(it.t), D = norm(it.d); let sc = words.length ? 0 : 1; words.forEach(w => { if (T.includes(w)) sc += 3; if (D.includes(w)) sc += 1; }); return { ...it, sc }; })
        .filter(it => it.sc > 0 && (cat === 'Alle' || it.cat === cat));
      if (sort === 'az') r.sort((a, b) => a.t.localeCompare(b.t, 'de'));
      else if (sort === 'date') r.sort((a, b) => (a.date ? a.date.getTime() : 9e15) - (b.date ? b.date.getTime() : 9e15));
      else r.sort((a, b) => b.sc - a.sc || (b.img ? 1 : 0) - (a.img ? 1 : 0));
      return r;
    }
    const mark = t => { const ws = norm(q).split(/\s+/).filter(w => w.length > 1); if (!ws.length) return t; const n = norm(t); let out = '', i = 0;
      while (i < t.length) { const w = ws.find(w => n.startsWith(w, i)); if (w) { out += `<mark>${t.slice(i, i + w.length)}</mark>`; i += w.length; } else { out += t[i]; i++; } } return out; };
    function row(it, i) {
      const crumbs = `<ol class="crumbs crumbs--s" aria-label="Pfad"><li><a href="${P.home}">Startseite</a>${ARROW}</li>${it.crumbs.map((c, k) => k === it.crumbs.length - 1 ? `<li aria-current="page">${c}</li>` : `<li><span>${c}</span>${ARROW}</li>`).join('')}</ol>`;
      return `<li class="sres" style="--i:${i}">${it.img ? `<a class="sres__pic media" href="${it.h}" tabindex="-1" aria-hidden="true" style="--lqip:url(img/${it.img}-lqip.jpg)"><img src="img/${it.img}.jpg" alt="" loading="lazy" decoding="async"></a>` : ''}
        <div class="sres__content"><div class="sres__text"><h2><a href="${it.h}"${it.miss ? ` data-missing="${it.t}"` : ''}>${mark(it.t)}</a></h2><p>${mark(it.d)}</p></div>${crumbs}</div>
        <div class="sres__tags"><span class="tagc">${it.tag}</span>${it.date ? `<span class="tagc">${fmt(it.date)}</span>` : ''}</div>
        <div class="sres__act"><a class="tlink" href="${it.h}"${it.miss ? ` data-missing="${it.t}"` : ''}><span>Mehr erfahren</span>${ARROW}</a></div></li>`;
    }
    function render() {
      const r = results(), vis = r.slice(0, shown);
      count.textContent = q ? `${r.length} ${r.length === 1 ? 'Ergebnis' : 'Ergebnisse'} für «${q}»` : `${r.length} Einträge`;
      list.innerHTML = vis.length ? vis.map(row).join('') : `<li class="sres sres--empty"><p>Keine Treffer für «${q}»${cat !== 'Alle' ? ` in «${cat}»` : ''}. Prüfe die Schreibweise oder wähle «Alle».</p></li>`;
      more.parentElement.hidden = shown >= r.length;
      watchMedia(list);
    }
    form.addEventListener('submit', e => { e.preventDefault(); q = input.value.trim(); shown = 3; history.replaceState(null, '', q ? `?q=${encodeURIComponent(q)}` : location.pathname); render(); });
    let t = 0; input.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { q = input.value.trim(); shown = 3; render(); }, 180); });
    chips.forEach(c => c.addEventListener('click', () => { cat = c.dataset.cat === cat && cat !== 'Alle' ? 'Alle' : c.dataset.cat; chips.forEach(x => x.setAttribute('aria-pressed', String(x.dataset.cat === cat))); shown = 3; render(); }));
    sec.querySelector('[data-sort]').addEventListener('ddchange', e => { sort = e.detail || 'rel'; render(); });
    more.addEventListener('click', () => { const first = shown; shown += 3; render(); const nx = list.children[first]; nx && nx.querySelector('a:not([tabindex])').focus({ preventScroll: true }); });
    if (!q) { q = 'Römer'; input.value = q; }
    render();
    if (params.has('q') || document.referrer) input.focus({ preventScroll: true });
  });

  /* ---------- Zielgruppen / Highlights ---------- */
  document.querySelectorAll('[data-aud]').forEach(sec => {
    const layers = [...sec.querySelectorAll('.aud__layer')], links = [...sec.querySelectorAll('.aud__list a')];
    const stack = document.createElement('div'); stack.className = 'aud__layers'; sec.prepend(stack); layers.forEach(l => stack.appendChild(l));
    let active = 0, z = 1; layers.forEach(l => { l.style.zIndex = 0; }); layers[0].style.zIndex = 1;
    function show(i) {
      if (i === active || !layers[i]) return;
      links.forEach((a, j) => a.classList.toggle('is-active', j === i));
      const l = layers[i], img = l.querySelector('img'); l.style.zIndex = ++z;
      if (reduce.matches || !l.animate) { l.style.transform = 'none'; active = i; return; }
      l.getAnimations().forEach(a => a.cancel()); img.getAnimations().forEach(a => a.cancel());
      l.animate([{ transform: 'translate3d(0,100%,0)' }, { transform: 'translate3d(0,0,0)' }], { duration: 900, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', fill: 'forwards' });
      img.animate([{ transform: 'translate3d(0,-28%,0) scale(1.08)' }, { transform: 'none' }], { duration: 900, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', fill: 'forwards' });
      active = i;
    }
    links.forEach((a, i) => { a.addEventListener('pointerenter', () => show(i)); a.addEventListener('focus', () => show(i)); });
    // Ohne Hover (Touch): beim Scrollen wird die Zeile in Bildschirmmitte aktiv
    if (!matchMedia('(hover: hover)').matches) {
      const io2 = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) show(links.indexOf(x.target)); }), { rootMargin: '-45% 0px -45% 0px' });
      links.forEach(a => io2.observe(a));
    }
    new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { sec.querySelectorAll('img').forEach(im => { im.loading = 'eager'; }); o.disconnect(); } }, { rootMargin: '800px 0px' }).observe(sec);
  });

  /* ---------- Ein Tag in Augusta Raurica ---------- */
  document.querySelectorAll('[data-dayplan]').forEach(wrapEl => {
    const STOPS = JSON.parse(wrapEl.querySelector('script[type="application/json"]').textContent);
    const dp = wrapEl.querySelector('.dp'), rail = wrapEl.querySelector('.dp__rail'), info = wrapEl.querySelector('.dp__info');
    const elTime = info.querySelector('.js-time'), elTag = info.querySelector('.js-tag'), elText = info.querySelector('.js-text');
    const bar = wrapEl.querySelector('.js-bar'), prev = wrapEl.querySelector('.js-dp-prev'), next = wrapEl.querySelector('.js-dp-next');
    const tiles = STOPS.map((s, i) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'dp__tile media';
      b.setAttribute('aria-label', `${s.time} Uhr: ${s.tag}`); b.style.setProperty('--lqip', `url(img/${s.img}-lqip.jpg)`);
      b.innerHTML = `<img src="img/${s.img}.jpg" alt="${s.alt}" loading="lazy" decoding="async">`;
      b.addEventListener('click', () => { if (i !== idx) goTo(i); }); rail.appendChild(b); return b;
    });
    watchMedia(rail);
    let idx = 0, busy = false;
    function layout() {
      const box = dp.closest('.dp__wrap') || dp.parentElement, W = dp.clientWidth, g = parseFloat(getComputedStyle(box).getPropertyValue('--gap')) || 24;
      // Desktop: drei Kacheln füllen die Breite mit Figma-Abstand 24 (1440 → 432 px). Mobile/Timeline: Kacheln 340 × 425, Abstand 16
      const tw = mobile.matches ? Math.min(340, W * 0.865) : (W - 2 * g) / 3;
      box.style.setProperty('--tw', `${tw}px`);
      const H = tw * 1.25, LAND = [0, .667, .8];
      tiles.forEach((t, i) => { const d = i - idx; t.style.setProperty('--x', `${d * (tw + g)}px`); t.style.setProperty('--cut', `${mobile.matches ? 0 : H - (d <= 0 ? H : tw * LAND[1 + ((d - 1) % 2)])}px`);
        t.classList.toggle('is-active', d === 0); t.classList.toggle('is-gone', d < 0); t.tabIndex = d === 0 || d === 1 ? 0 : -1; t.setAttribute('aria-current', d === 0 ? 'step' : 'false'); });
      bar.style.width = `${100 / STOPS.length}%`; bar.style.transform = `translateX(${idx * 100}%) scaleX(1)`;
      prev.setAttribute('aria-disabled', idx === 0); next.setAttribute('aria-disabled', idx === STOPS.length - 1);
    }
    function text(i, animate) {
      const s = STOPS[i], apply = () => { elTime.textContent = s.time; elTag.textContent = s.tag; elText.textContent = s.text; };
      if (!animate || reduce.matches) { apply(); return; }
      info.classList.add('is-out');
      setTimeout(() => { apply(); info.classList.remove('is-out'); info.classList.add('is-pre'); void info.offsetWidth; info.classList.remove('is-pre'); }, 200);
    }
    function nudge(dir) { if (reduce.matches || !dir || !rail.animate) return; rail.animate([{ transform: 'none' }, { transform: `translate3d(${-dir * 18}px,0,0)` }, { transform: 'none' }], { duration: 420, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }); }
    function goTo(i) { i = clamp(i, 0, STOPS.length - 1); if (i === idx) { nudge(0); return; } idx = i; busy = true; layout(); text(i, true); setTimeout(() => { busy = false; }, 850); }
    const step = dir => goTo(idx + dir);
    prev.addEventListener('click', () => step(-1)); next.addEventListener('click', () => step(1));
    dp.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } });
    let acc = 0, locked = false, quiet = 0;
    dp.parentElement.addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; e.preventDefault(); clearTimeout(quiet);
      quiet = setTimeout(() => { acc = 0; locked = busy; if (busy) setTimeout(() => { locked = false; }, 200); }, 180);
      if (locked) return; acc += e.deltaX;
      if (Math.abs(acc) > 28) { const dir = Math.sign(acc); acc = 0; locked = true; if ((dir > 0 && idx < STOPS.length - 1) || (dir < 0 && idx > 0)) step(dir); else nudge(dir); }
    }, { passive: false });
    let sx = 0, sy = 0, dx = 0, dragging = false, axis = null;
    dp.addEventListener('pointerdown', e => { if (e.button !== 0) return; sx = e.clientX; sy = e.clientY; dx = 0; dragging = true; axis = null; });
    addEventListener('pointermove', e => { if (!dragging) return; const mx = e.clientX - sx, my = e.clientY - sy;
      if (!axis && Math.hypot(mx, my) > 6) axis = Math.abs(mx) > Math.abs(my) ? 'x' : 'y'; if (axis !== 'x') return; dx = mx;
      const edge = (dx > 0 && idx === 0) || (dx < 0 && idx === STOPS.length - 1); rail.classList.add('is-dragging'); rail.style.transform = `translate3d(${(edge ? dx * .2 : dx * .45).toFixed(1)}px,0,0)`; });
    addEventListener('pointerup', () => { if (!dragging) return; dragging = false; rail.classList.remove('is-dragging'); rail.style.transform = ''; if (axis === 'x' && Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); });
    rail.addEventListener('click', e => { if (axis === 'x' && Math.abs(dx) > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
    addEventListener('resize', layout); mobile.addEventListener('change', layout);
    layout(); text(0, false);
  });

  /* ---------- Tickets: Reiter ---------- */
  const TIX = {
    museum: [
      { img: 'f-a007e88e', price: 'CHF 18.–', name: 'Einzelticket', info: 'Kinder & Jugendliche (6–17 Jahre): CHF 13.–', feat: [['check', 'Museum und Römerhaus'], ['check', 'Inklusive Audioguide in vier Sprachen'], ['clock', 'Gültig am Besuchstag']] },
      { img: 'f-eb0788d1', price: 'CHF 55.–', name: 'Familienkarte', info: '2 Erwachsene\nmax. 3 Kinder', feat: [['check', 'Museum und Römerhaus'], ['check', 'Inklusive Familienroute mit Rätselheft'], ['clock', 'Gültig am Besuchstag']] },
      { img: 'f-de321e7a', price: 'CHF 0.–', name: 'Freier Eintritt', info: 'IV-Bezüger\nKinder unter 6 Jahren', note: '*Nur gegen Vorlage eines gültigen Ausweises', feat: [['check', 'Museum und Römerhaus'], ['check', 'Begleitperson ebenfalls kostenlos'], ['clock', 'Gültig am Besuchstag']] }],
    fest: [
      { img: 'f-60db87f9', price: 'CHF 28.–', name: 'Tagesticket', info: 'Kinder & Jugendliche (6–17 Jahre): CHF 14.–', feat: [['check', 'Römerfest Ticketpreise'], ['check', 'Hin- und Rückfahrt im TNW-Gebiet (2. Klasse) am Veranstaltungstag.'], ['clock', 'Ticketpreis pro Festtag']] },
      { img: 'f-b9f14153', price: 'CHF 70.–', name: 'Familienkarte', info: '2 Erwachsene\nmax. 3 Kinder', feat: [['check', 'Römerfest Ticketpreise'], ['check', 'Hin- und Rückfahrt im TNW-Gebiet (2. Klasse) am Veranstaltungstag.'], ['clock', 'Ticketpreis pro Festtag']] },
      { img: 'f-08e06c8c', price: 'CHF 45.–', name: 'Zweitagespass', info: 'Samstag und Sonntag', feat: [['check', 'Römerfest Ticketpreise'], ['check', 'Hin- und Rückfahrt im TNW-Gebiet (2. Klasse) an beiden Tagen.'], ['clock', 'Gültig an beiden Festtagen']] }],
    theater: [
      { img: 'f-12155ad3', price: 'ab CHF 69.–', name: 'Live in Concert', info: 'Sitzplatz im römischen Theater', feat: [['check', 'Abendkasse ab 18.00 Uhr'], ['check', 'Rollstuhlplätze auf Anfrage'], ['clock', 'Einlass eine Stunde vor Beginn']], link: P.event },
      { img: 'f-48400d13', price: 'ab CHF 49.–', name: 'Stehplatz', info: 'Arena vor der Bühne', feat: [['check', 'Abendkasse ab 18.00 Uhr'], ['check', 'Garderobe vor Ort'], ['clock', 'Einlass eine Stunde vor Beginn']], link: P.event },
      { img: 'f-b57deaa0', price: 'CHF 15.–', name: 'Theaterführung', info: 'Kinder bis 16 Jahre gratis', feat: [['check', 'Treffpunkt beim Theater'], ['check', 'Dauer 60 Minuten'], ['clock', 'Jeden Sonntag 14.00 Uhr']] }],
  };
  document.querySelectorAll('.tixs').forEach(sec => {
    const grid = sec.querySelector('.tix__grid'), tabs = [...sec.querySelectorAll('[role="tab"]')];
    const draw = key => { grid.innerHTML = TIX[key].map((t, i) => `<article class="tix" style="--i:${i}"><div class="media" style="--lqip:url(${lq(t.img)})"><img src="${imgSrc(t.img)}" alt="" loading="lazy" decoding="async"></div>
      <div class="tix__top"><p class="tix__price">${t.price}</p><h3 class="tix__name">${t.name}</h3><p class="tix__info">${t.info}</p>${t.note ? `<p class="tix__note">${t.note}</p>` : ''}</div>
      <div><div class="tix__cut" aria-hidden="true"></div><div class="tix__bottom"><ul>${t.feat.map(([ic, l]) => `<li>${I(ic)}<span>${l}</span></li>`).join('')}</ul><a class="tlink" href="${t.link || '#'}"${t.link ? '' : ' data-missing="Ticketshop"'}><span>Jetzt buchen</span>${ARROW}</a></div></div></article>`).join(''); watchMedia(grid); };
    tabs.forEach(t => t.addEventListener('click', () => {
      if (t.getAttribute('aria-selected') === 'true') return;
      tabs.forEach(x => { x.setAttribute('aria-selected', String(x === t)); x.tabIndex = x === t ? 0 : -1; });
      if (reduce.matches) { draw(t.dataset.tab); return; }
      grid.classList.add('is-swap'); setTimeout(() => { draw(t.dataset.tab); requestAnimationFrame(() => requestAnimationFrame(() => grid.classList.remove('is-swap'))); }, 280);
    }));
    sec.querySelector('[role="tablist"]').addEventListener('keydown', e => { const i = tabs.indexOf(document.activeElement); if (i < 0) return; if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]; n.focus(); n.click(); } });
    draw('museum');
  });

  /* ---------- Akkordeon + „Mehr anzeigen“ ---------- */
  document.querySelectorAll('.acc').forEach((acc, i) => {
    const q = acc.querySelector('.acc__q'), a = acc.querySelector('.acc__a'); const ic = acc.querySelector('.acc__ic'); if (ic) ic.innerHTML = '<svg class="i ic-plus"><use href="#i-plus"/></svg><svg class="i ic-minus"><use href="#i-minus"/></svg>'; const id = `acc-${i}`; a.id = id; q.setAttribute('aria-controls', id);
    q.setAttribute('aria-expanded', String(acc.classList.contains('is-open')));
    q.addEventListener('click', () => { const open = !acc.classList.contains('is-open'); acc.classList.toggle('is-open', open); q.setAttribute('aria-expanded', String(open)); });
  });
  document.querySelectorAll('.faq__more').forEach(b => b.addEventListener('click', () => {
    const list = b.closest('.faq__list'), extra = [...list.querySelectorAll('.acc.is-extra')], open = b.getAttribute('aria-expanded') !== 'true';
    extra.forEach((x, k) => { x.hidden = !open; x.classList.toggle('is-new', open); x.style.animationDelay = `${k * 60}ms`; });
    b.setAttribute('aria-expanded', String(open)); b.querySelector('span').textContent = open ? 'Weniger anzeigen' : 'Mehr anzeigen';
  }));

  /* ---------- Newsletter-Formulare ---------- */
  document.querySelectorAll('.news__form').forEach(form => {
    const mail = form.querySelector('input[type="email"]'), err = form.querySelector('.field__err');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const v = mail.value.trim(), ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      mail.setAttribute('aria-invalid', !ok);
      if (!ok) { err.textContent = v ? 'Bitte prüfe die E-Mail-Adresse, zum Beispiel name@beispiel.ch.' : 'Bitte gib deine E-Mail-Adresse ein.'; mail.focus(); return; }
      err.textContent = '';
      const box = document.createElement('div'); box.className = 'news__ok'; box.setAttribute('role', 'status'); box.tabIndex = -1;
      box.innerHTML = '<strong>Fast geschafft.</strong>Wir haben dir eine E-Mail geschickt. Bitte bestätige darin deine Anmeldung.';
      form.replaceWith(box);
      if (!reduce.matches && box.animate) box.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
      box.focus();
    });
    mail.addEventListener('input', () => { if (mail.getAttribute('aria-invalid') === 'true') { mail.removeAttribute('aria-invalid'); err.textContent = ''; } });
  });

  /* ---------- Lightbox (Galerie + Einzelbild) ---------- */
  const shots = [...document.querySelectorAll('.g-item, .single__frame, .zoom')];
  if (shots.length) {
    const lb = document.createElement('dialog'); lb.className = 'lb'; lb.setAttribute('aria-label', 'Bildansicht');
    lb.innerHTML = `<div class="lb__stage"><div class="lb__top"><span class="js-lb-count" aria-live="polite"></span><button class="round js-lb-close" type="button" aria-label="Bildansicht schliessen">${I('close')}</button></div><figure class="lb__fig"><img class="js-lb-img" src="" alt=""></figure><div class="lb__bottom"><p class="lb__cap js-lb-cap"></p><div class="slider__nav"><button class="round round--prev js-lb-prev" type="button" aria-label="Vorheriges Bild">${ARROW}</button><button class="round js-lb-next" type="button" aria-label="Nächstes Bild">${ARROW}</button></div></div></div>`;
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('.js-lb-img'), lbCap = lb.querySelector('.js-lb-cap'), lbCount = lb.querySelector('.js-lb-count');
    // Blättern nur innerhalb des eigenen Abschnitts (Galerie, Text + Bild, Einzelbild)
    let idx = 0, trig = null, group = shots;
    const show = (i, dir = 0) => { if (dir && group.length < 2) return; idx = (i + group.length) % group.length; const s = group[idx]; lbImg.src = s.dataset.full; lbImg.alt = s.querySelector('img').alt; lbCap.textContent = s.dataset.cap || ''; lbCount.textContent = `${idx + 1} / ${group.length}`;
      if (dir && !reduce.matches && lbImg.animate) lbImg.animate([{ opacity: 0, transform: `translateX(${dir * 32}px)` }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }); };
    const open = (i, t) => { trig = t; group = shots.filter(x => x.closest('section') === t.closest('section')); lb.classList.toggle('is-single', group.length < 2); show(group.indexOf(t)); lb.showModal(); document.body.style.overflow = 'hidden'; requestAnimationFrame(() => lb.classList.add('is-shown')); };
    const close = () => { lb.classList.remove('is-shown'); setTimeout(() => { lb.close(); document.body.style.overflow = ''; trig && trig.focus(); }, reduce.matches ? 0 : 200); };
    shots.forEach((s, i) => s.addEventListener('click', () => open(i, s)));
    lb.querySelector('.js-lb-close').addEventListener('click', close);
    lb.querySelector('.js-lb-prev').addEventListener('click', () => show(idx - 1, -1));
    lb.querySelector('.js-lb-next').addEventListener('click', () => show(idx + 1, 1));
    lb.addEventListener('cancel', e => { e.preventDefault(); close(); });
    lb.addEventListener('keydown', e => { if (e.key === 'ArrowRight') show(idx + 1, 1); if (e.key === 'ArrowLeft') show(idx - 1, -1); });
    lb.addEventListener('click', e => { if (e.target.classList.contains('lb__fig') || e.target.classList.contains('lb__stage')) close(); });
    let sx = null;
    lb.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') sx = e.clientX; });
    lb.addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); });
  }

  /* ---------- Reveals + Lazy-Load ---------- */
  watchMedia(document);
  const io = new IntersectionObserver(entries => { for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  document.querySelectorAll('.rv, .teasers, .gallery, .hours, .read, .wt, .tq, .tq1, .split, .tl, .tixs, .cards, .single').forEach(el => io.observe(el));
})();
