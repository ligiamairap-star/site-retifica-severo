const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '.');
const files = fs.readdirSync(buildDir).filter(f => f.endsWith('.html'));

const newDesktopNav = `<nav id="desktop-nav" style="display:none">
      <div style="display:flex;align-items:center;gap:1.5rem;color:#fff;font-weight:500;">
        <a href="/" style="color:#fff;text-decoration:none;">Home</a> <span style="opacity:0.5">•</span>
        <a href="/sobre" style="color:#fff;text-decoration:none;">Sobre Nós</a> <span style="opacity:0.5">•</span>
        <a href="/servicos" style="color:#fff;text-decoration:none;">Serviços</a> <span style="opacity:0.5">•</span>
        <a href="/cases" style="color:#fff;text-decoration:none;">Cases</a> <span style="opacity:0.5">•</span>
        <a href="/faq" style="color:#fff;text-decoration:none;">FAQ</a> <span style="opacity:0.5">•</span>
        <a href="/contato" style="color:#fff;text-decoration:none;">Contato</a>
      </div>
    </nav>`;

const newMobileNav = `<nav id="mobile-menu" class="mobile-menu">
    <a href="/">HOME</a>
    <a href="/sobre">SOBRE NÓS</a>
    <a href="/servicos">SERVIÇOS</a>
    <a href="/cases">CASES</a>
    <a href="/faq">FAQ</a>
    <a href="/contato">CONTATO</a>
    <a href="https://wa.me/5511974624100" target="_blank" rel="noopener" style="color:#25d366;font-weight:700">📲 WhatsApp</a>
  </nav>`;

for (const file of files) {
    const filePath = path.join(buildDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Replace desktop nav
    html = html.replace(/<nav id="desktop-nav"[\s\S]*?<\/nav>/, newDesktopNav);
    
    // Replace mobile nav
    html = html.replace(/<nav id="mobile-menu"[\s\S]*?<\/nav>/, newMobileNav);

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated navs in ${file}`);
}
console.log('Done!');
