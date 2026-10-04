const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '.');
const indexPath = path.join(buildDir, 'index.html');
const sobrePath = path.join(buildDir, 'sobre.html');
const servicosPath = path.join(buildDir, 'servicos.html');
const casesPath = path.join(buildDir, 'cases.html');
const faqPath = path.join(buildDir, 'faq.html');
const contatoPath = path.join(buildDir, 'contato.html');

// Helper to extract content inside <main id="main-content">
function extractMainContent(htmlPath) {
    if (!fs.existsSync(htmlPath)) return '';
    const content = fs.readFileSync(htmlPath, 'utf8');
    const match = content.match(/<main[^>]*>([\s\S]*?)<\/main>/);
    return match ? match[1] : '';
}

let indexHtml = fs.readFileSync(indexPath, 'utf8');

// 1. Extrair conteúdo
const sobreContent = extractMainContent(sobrePath).replace(/<section/g, '<section id="sobre"').replace(/<div class="page-header".*?<\/div>/s, '');
const servicosContent = extractMainContent(servicosPath).replace(/<section/g, '<section id="servicos"').replace(/<div class="page-header".*?<\/div>/s, '');
const faqContent = extractMainContent(faqPath).replace(/<section/g, '<section id="faq"').replace(/<div class="page-header".*?<\/div>/s, '');
const contatoContent = extractMainContent(contatoPath).replace(/<section/g, '<section id="contato"').replace(/<div class="page-header".*?<\/div>/s, '');

// Processar cases (extrair apenas a galeria técnica para não duplicar processo/antes-depois se já existir)
let casesContent = '';
const casesFull = extractMainContent(casesPath);
const galeriaMatch = casesFull.match(/<section[^>]*>(?:(?!<\/section>)[\s\S])*Galeria Técnica[\s\S]*?<\/section>/i);
if (galeriaMatch) {
    casesContent = galeriaMatch[0].replace(/<section/i, '<section id="galeria"');
}

// 2. Localizar onde inserir em index.html
// Atualmente o index tem: Hero, Processo, Antes/Depois. 
// A ordem: Home -> Sobre -> Serviços -> Cases (Processo + Antes/Depois + Galeria) -> FAQ -> Contato

// Let's replace the whole main-content of index.html
const indexMainMatch = indexHtml.match(/<main id="main-content">([\s\S]*?)<\/main>/);
if (indexMainMatch) {
    let homeSections = indexMainMatch[1];

    // O "Cases" já tem a parte de processos e antes-depois no index
    // Vou colocar ID nessas seções se não tiver
    // A seção hero pode ter id="home"
    homeSections = homeSections.replace(/<section/, '<section id="home"');
    homeSections = homeSections.replace(/<!-- Process Section -->\s*<section/, '<!-- Process Section -->\n  <section id="cases"');

    const newMainContent = `
${homeSections}
${galeriaMatch ? casesContent : ''}
${sobreContent}
${servicosContent}
${faqContent}
${contatoContent}
`;

    indexHtml = indexHtml.replace(/<main id="main-content">[\s\S]*?<\/main>/, `<main id="main-content">${newMainContent}\n</main>`);
}

// 3. Atualizar a Navegação
const desktopNavPattern = /<nav id="desktop-nav"[^>]*>([\s\S]*?)<\/nav>/;
const newDesktopNav = `<nav id="desktop-nav" style="display:none">
      <div style="display:flex;align-items:center;gap:1.5rem;color:#fff;font-weight:500;">
        <a href="#home" style="color:#fff;text-decoration:none;">Home</a> <span style="opacity:0.5">•</span>
        <a href="#sobre" style="color:#fff;text-decoration:none;">Sobre Nós</a> <span style="opacity:0.5">•</span>
        <a href="#servicos" style="color:#fff;text-decoration:none;">Serviços</a> <span style="opacity:0.5">•</span>
        <a href="#cases" style="color:#fff;text-decoration:none;">Cases</a> <span style="opacity:0.5">•</span>
        <a href="#faq" style="color:#fff;text-decoration:none;">FAQ</a> <span style="opacity:0.5">•</span>
        <a href="#contato" style="color:#fff;text-decoration:none;">Contato</a>
      </div>
    </nav>`;

const mobileNavPattern = /<nav id="mobile-menu"[\s\S]*?<\/nav>/;
const newMobileNav = `<nav id="mobile-menu" class="mobile-menu">
    <a href="#home">HOME</a>
    <a href="#sobre">SOBRE NÓS</a>
    <a href="#servicos">SERVIÇOS</a>
    <a href="#cases">CASES</a>
    <a href="#faq">FAQ</a>
    <a href="#contato">CONTATO</a>
    <a href="https://wa.me/5511974624100" target="_blank" rel="noopener" style="color:#25d366;font-weight:700">📲 WhatsApp</a>
  </nav>`;

indexHtml = indexHtml.replace(desktopNavPattern, newDesktopNav);
indexHtml = indexHtml.replace(mobileNavPattern, newMobileNav);

// 4. Adicionar smooth scrolling no CSS e Script para fechar menu mobile
const scriptInjection = `
<script>
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            const menu = document.getElementById('mobile-menu');
            if (menu.classList.contains('open')) {
                menu.classList.remove('open');
                document.getElementById('mobile-menu-btn').setAttribute('aria-expanded', 'false');
            }
          }
      });
  });
</script>
</body>`;

indexHtml = indexHtml.replace('</body>', scriptInjection);

fs.writeFileSync(indexPath, indexHtml, 'utf8');

// Aplicar nav atualizado em todas as páginas (mesmo não sendo mais usadas ativamente, não custa)
const files = fs.readdirSync(buildDir).filter(f => f.endsWith('.html') && f !== 'index.html');
for (const file of files) {
    let fHtml = fs.readFileSync(path.join(buildDir, file), 'utf8');
    fHtml = fHtml.replace(desktopNavPattern, newDesktopNav.replace(/href="#/g, 'href="/#'));
    fHtml = fHtml.replace(mobileNavPattern, newMobileNav.replace(/href="#/g, 'href="/#'));
    fs.writeFileSync(path.join(buildDir, file), fHtml, 'utf8');
}

console.log("One-page integration complete!");
