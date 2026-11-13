// ==========  Dados das certificações  ==========
const CERTS = [
  {
    title: "Matemática para Machine Learning",
    issuer: "Sigmoidal",
    hours: "8h",
    date: "Nov 2026",
    category: "data",
    desc: "Fundamentos matemáticos por trás do Machine Learning: álgebra linear, cálculo e estatística aplicados a modelos.",
    file: "assets/certificados/sigmoidal-matematica-ml.png",
  },
  {
    title: "Introdução ao Scrum",
    issuer: "FGV Online",
    hours: "6h",
    date: "Nov 2026",
    category: "agile",
    desc: "Princípios do framework Scrum: papéis, eventos, artefatos e gestão ágil de projetos.",
    file: "assets/certificados/fgv-introducao-scrum.pdf",
  },
  {
    title: "XX Semana de Tecnologia 2026",
    issuer: "Fatec Ourinhos",
    hours: "40h",
    date: "Out 2026",
    category: "event",
    desc: "Semana de palestras, minicursos e workshops sobre tendências e práticas da área de tecnologia.",
    file: "assets/certificados/semana-tecnologia-2026.pdf",
  },
  {
    title: "Hashcat: Introdução e Prática",
    issuer: "Fatec Ourinhos",
    hours: "4h",
    date: "Out 2026",
    category: "security",
    desc: "Minicurso prático de auditoria de senhas com Hashcat: tipos de hash, ataques de dicionário e força bruta.",
    file: "assets/certificados/hashcat.pdf",
  },
  {
    title: "Java POO",
    issuer: "Curso em Vídeo",
    hours: "40h",
    date: "Fev 2026",
    category: "dev",
    desc: "Programação Orientada a Objetos com Java: classes, herança, polimorfismo e encapsulamento.",
    file: "assets/certificados/java-poo.jpg",
  },
  {
    title: "MySQL",
    issuer: "Curso em Vídeo",
    hours: "40h",
    date: "Out 2025",
    category: "data",
    desc: "Modelagem de bancos de dados, consultas, manipulação de dados e comandos SQL com MySQL.",
    file: "assets/certificados/mysql.pdf",
  },
  {
    title: "Capacita+: Construa com o Gemini",
    issuer: "Google Cloud",
    hours: "2h",
    date: "Set 2026",
    category: "dev",
    desc: "Construção de soluções com IA generativa usando o Gemini, em parceria com instituições de ensino.",
    file: "assets/certificados/google-capacita-gemini.png",
  },
  {
    title: "Semana de Tecnologia 2024",
    issuer: "Fatec Ourinhos",
    hours: "24h",
    date: "Out 2024",
    category: "event",
    desc: "Evento com palestras e workshops sobre tendências e práticas da área de tecnologia.",
    file: "assets/certificados/semana-tecnologia-2024.pdf",
  },
  {
    title: "Simplifica Excel Express",
    issuer: "Simplifica Treinamentos",
    hours: "10h",
    date: "Jun 2024",
    category: "data",
    desc: "Fórmulas, funções e organização de dados no Excel para análise e produtividade.",
    file: "assets/certificados/excel-express.pdf",
  },
  {
    title: "Bootcamps DIO: Educação Gratuita e Empregabilidade",
    issuer: "DIO",
    hours: "1h",
    date: "Abr 2024",
    category: "event",
    desc: "Introdução ao ecossistema de bootcamps da DIO e trilhas de carreira em tecnologia.",
    file: "assets/certificados/dio-bootcamp.pdf",
  },
];

// ==========  Render das certificações  ==========
const grid = document.getElementById("certsGrid");

grid.innerHTML = CERTS.map(
  (c, i) => `
  <button class="cert reveal" data-category="${c.category}" data-index="${i}">
    <div class="cert-top">
      <span class="cert-issuer">${c.issuer}</span>
      <span class="cert-hours">${c.hours}</span>
    </div>
    <h3>${c.title}</h3>
    <p>${c.desc}</p>
    <div class="cert-foot">
      <span class="cert-date">${c.date}</span>
      <span class="cert-view">ver certificado →</span>
    </div>
  </button>`
).join("");

// ==========  Filtros  ==========
document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  document.querySelectorAll(".filter").forEach((f) => f.classList.toggle("active", f === btn));
  const filter = btn.dataset.filter;
  grid.querySelectorAll(".cert").forEach((card) => {
    card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
  });
});

// ==========  Modal  ==========
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalTitle = document.getElementById("modalTitle");
const modalOpen = document.getElementById("modalOpen");

// Navegadores de celular (ex.: Chrome no Android) não exibem PDF dentro de iframe
function canEmbedPdf() {
  return navigator.pdfViewerEnabled !== false &&
    !window.matchMedia("(max-width: 720px), (pointer: coarse)").matches;
}

function openModal(cert) {
  modalTitle.textContent = `${cert.title} — ${cert.issuer}`;
  modalOpen.href = cert.file;
  if (!cert.file.endsWith(".pdf")) {
    modalBody.innerHTML = `<img src="${cert.file}" alt="Certificado ${cert.title}">`;
  } else if (canEmbedPdf()) {
    modalBody.innerHTML = `<iframe src="${cert.file}#view=FitH" title="${cert.title}"></iframe>`;
  } else {
    modalBody.innerHTML = `
      <div class="pdf-fallback">
        <p>Este certificado está em PDF. Toque no botão para visualizá-lo.</p>
        <a class="btn btn-primary" href="${cert.file}" target="_blank" rel="noopener">Abrir certificado (PDF)</a>
      </div>`;
  }
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalBody.innerHTML = "";
  document.body.style.overflow = "";
}

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".cert");
  if (card) openModal(CERTS[card.dataset.index]);
});
modal.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// ==========  Menu mobile  ==========
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  navLinks.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") closeMenu();
});
// Fecha o menu ao tocar fora dele ou apertar Esc
document.addEventListener("click", (e) => {
  if (navLinks.classList.contains("open") && !e.target.closest("#header")) closeMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ==========  Header ao rolar + link ativo  ==========
const header = document.getElementById("header");
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function onScroll() {
  header.classList.toggle("scrolled", window.scrollY > 20);

  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ==========  Efeito de digitação  ==========
const roles = [
  "Desenvolvedor de Software Júnior",
  "Suporte e Infraestrutura de TI",
  "Python · Java · SQL · Web",
];
const typed = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  typed.textContent = roles[0];
} else {
  let r = 0, c = 0, deleting = false;
  (function type() {
    const word = roles[r];
    typed.textContent = word.slice(0, c);
    if (!deleting && c < word.length) c++;
    else if (deleting && c > 0) c--;
    else if (!deleting) { deleting = true; return setTimeout(type, 1800); }
    else { deleting = false; r = (r + 1) % roles.length; }
    setTimeout(type, deleting ? 35 : 70);
  })();
}

// ==========  Revelar ao rolar + contadores  ==========
function animateCount(el) {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || "";
  const duration = 1200;
  const start = performance.now();
  (function step(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(start);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ==========  Copiar e-mail  ==========
const copyBtn = document.getElementById("copyEmail");
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.email);
    copyBtn.textContent = "copiado ✓";
    copyBtn.classList.add("copied");
    setTimeout(() => {
      copyBtn.textContent = "copiar";
      copyBtn.classList.remove("copied");
    }, 2000);
  } catch {
    window.location.href = `mailto:${copyBtn.dataset.email}`;
  }
});

// ==========  Ano no rodapé  ==========
document.getElementById("year").textContent = new Date().getFullYear();
