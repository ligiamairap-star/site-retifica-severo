const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '.');

function processDir(dir, depth) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory() && file !== 'assets' && file !== 'css' && file !== 'img' && file !== 'js') {
            processDir(filePath, depth + 1);
        } else if (file.endsWith('.html')) {
            updateNav(filePath, depth, file);
        }
    }
}

function updateNav(filePath, depth, fileName) {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // For index.html itself we just use '#home', for others in root we use './index.html#home', for subdirs we use '../index.html#home'
    let prefix = '';
    if (depth > 0) {
        prefix = '../'.repeat(depth) + 'index.html';
    } else if (fileName !== 'index.html') {
        prefix = './index.html';
    }
    
    // Desktop Nav
    const newDesktopNav = `<nav id="desktop-nav" style="display:none">
      <div style="display:flex;align-items:center;gap:1.5rem;color:#fff;font-weight:500;">
        <a href="${prefix}#home" style="color:#fff;text-decoration:none;">Home</a> <span style="opacity:0.5">•</span>
        <a href="${prefix}#sobre" style="color:#fff;text-decoration:none;">Sobre Nós</a> <span style="opacity:0.5">•</span>
        <a href="${prefix}#servicos" style="color:#fff;text-decoration:none;">Serviços</a> <span style="opacity:0.5">•</span>
        <a href="${prefix}#cases" style="color:#fff;text-decoration:none;">Cases</a> <span style="opacity:0.5">•</span>
        <a href="${prefix}#faq" style="color:#fff;text-decoration:none;">FAQ</a> <span style="opacity:0.5">•</span>
        <a href="${prefix}#contato" style="color:#fff;text-decoration:none;">Contato</a>
      </div>
    </nav>`;

    // Mobile Nav
    const newMobileNav = `<nav id="mobile-menu" class="mobile-menu">
    <a href="${prefix}#home">HOME</a>
    <a href="${prefix}#sobre">SOBRE NÓS</a>
    <a href="${prefix}#servicos">SERVIÇOS</a>
    <a href="${prefix}#cases">CASES</a>
    <a href="${prefix}#faq">FAQ</a>
    <a href="${prefix}#contato">CONTATO</a>
    <a href="https://wa.me/5511974624100" target="_blank" rel="noopener" style="color:#25d366;font-weight:700">📲 WhatsApp</a>
  </nav>`;

    let htmlBefore = html;

    // Replace desktop nav
    html = html.replace(/<nav id="desktop-nav"[^>]*>[\s\S]*?<\/nav>/, newDesktopNav);
    
    // Replace mobile nav
    html = html.replace(/<nav id="mobile-menu"[^>]*>[\s\S]*?<\/nav>/, newMobileNav);

    // Replace yellow WhatsApp button with green one in the header
    const headerBtnsRegex = /<div style="display:flex;align-items:center;gap:\.75rem">[\s\S]*?<\/div>/;
    const newHeaderBtns = `<div style="display:flex;align-items:center;gap:.75rem">
      <a href="https://wa.me/5511974624100" class="btn-whatsapp-green" target="_blank" rel="noopener">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.118 1.528 5.849L0 24l6.337-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.727.888.914-3.638-.235-.374A9.78 9.78 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818zm5.472-7.436c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
        WhatsApp
      </a>
      <button id="mobile-menu-btn" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menu" style="background:none;border:none;color:#fff;cursor:pointer;padding:.5rem;display:flex;align-items:center;min-height:44px;min-width:44px"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
    </div>`;

    const headerRegex = /(<header[^>]*>)([\s\S]*?)(<\/header>)/;
    html = html.replace(headerRegex, (match, p1, p2, p3) => {
        let newHeaderInner = p2;
        newHeaderInner = newHeaderInner.replace(headerBtnsRegex, newHeaderBtns);
        return p1 + newHeaderInner + p3;
    });

    if (html !== htmlBefore) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

processDir(buildDir, 0);
