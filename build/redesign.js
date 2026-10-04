const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '.');
const cssFile = path.join(buildDir, 'assets/css/style.css');
const indexFile = path.join(buildDir, 'index.html');

// 1. Update style.css
let cssContent = fs.readFileSync(cssFile, 'utf8');
cssContent = cssContent.replace(/--color-primary:\s*#1256B5;/g, '--color-primary:   #0a1c3a; /* Azul Marinho */');
cssContent = cssContent.replace(/--color-header:\s*#050505;/g, '--color-header:    #0a1c3a; /* Azul Marinho Header */');
cssContent = cssContent.replace(/--color-accent:\s*#D4A220;/g, '--color-accent:    #c59b27; /* Dourado */');
cssContent = cssContent.replace(/--color-footer-dk:\s*#000000;/g, '--color-footer-dk: #051024; /* Azul Super Escuro */');

// Add specific classes for redesign if not present
if (!cssContent.includes('.bg-gray-light')) {
    cssContent += `\n
/* Redesign Classes */
.bg-gray-light { background-color: #f5f5f5; }
.btn-whatsapp-green { background-color: #25d366; color: #fff; font-weight: 700; padding: .6rem 1.2rem; border-radius: 50px; display: inline-flex; align-items: center; gap: .5rem; text-decoration: none; transition: opacity .2s; }
.btn-whatsapp-green:hover { opacity: .9; }
.badge-gold { background-color: #c59b27; color: #fff; padding: 0.5rem 1rem; border-radius: 50px; font-weight: 700; display: inline-block; }
.badge-red { background-color: #d32f2f; color: #fff; padding: 0.5rem 1rem; border-radius: 4px; font-weight: 700; display: inline-block; font-size: 0.85rem; }
.badge-gold-sq { background-color: #c59b27; color: #fff; padding: 0.5rem 1rem; border-radius: 4px; font-weight: 700; display: inline-block; font-size: 0.85rem; }
.process-card { background: #fff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden; text-align: center; padding-bottom: 1.5rem; }
.process-card img { width: 100%; height: 200px; object-fit: contain; padding: 1rem; background: #fafafa; }
.process-card h3 { font-size: 1.2rem; color: #0a1c3a; margin-top: 1rem; font-weight: 800; }
.process-card p { font-size: 0.9rem; color: #555; padding: 0 1rem; }
.hero-checks { display: flex; gap: 1.5rem; margin-top: 1.5rem; flex-wrap: wrap; font-size: 0.9rem; font-weight: 600; color: #333; }
.hero-checks span { display: inline-flex; align-items: center; gap: 0.4rem; }
`;
}
fs.writeFileSync(cssFile, cssContent, 'utf8');

// 2. New Header & Footer HTML
const newHeader = `<header class="site-header" role="banner">
  <div class="container-site" style="display:flex;align-items:center;justify-content:space-between;padding-block:.9rem;gap:1rem">
    <a href="/" aria-label="Retífica Severo" style="display:flex;align-items:center;gap:.75rem;text-decoration:none;flex-shrink:0">
      <div style="width:52px;height:52px;background:#050505;border:2px solid var(--color-accent);display:flex;align-items:center;justify-content:center;font-family:'Times New Roman', Times, serif;font-weight:bold;font-size:1.8rem;color:var(--color-accent);line-height:1;">RS</div>
      <div style="display:flex;flex-direction:column;">
        <span style="color:#fff;font-family:var(--font-base);font-weight:800;font-size:1.2rem;line-height:1;">RS RETÍFICA SEVERO</span>
        <span style="color:var(--color-accent);font-family:var(--font-base);font-weight:600;font-size:0.75rem;line-height:1;letter-spacing:.05em;margin-top:2px;">RETÍFICA AUTOMOTIVA</span>
      </div>
    </a>
    <nav id="desktop-nav" style="display:none">
      <div style="display:flex;align-items:center;gap:1.5rem;color:#fff;font-weight:500;">
        <a href="/servicos" style="color:#fff;text-decoration:none;">Serviços</a> <span style="opacity:0.5">•</span>
        <a href="/sobre" style="color:#fff;text-decoration:none;">Sobre Nós</a> <span style="opacity:0.5">•</span>
        <a href="/cases" style="color:#fff;text-decoration:none;">Nosso Processo</a> <span style="opacity:0.5">•</span>
        <a href="/contato" style="color:#fff;text-decoration:none;">Contato</a>
      </div>
    </nav>
    <div style="display:flex;align-items:center;gap:.75rem">
      <a href="https://wa.me/5511974624100" class="btn-whatsapp-green" target="_blank" rel="noopener">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.118 1.528 5.849L0 24l6.337-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.727.888.914-3.638-.235-.374A9.78 9.78 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818zm5.472-7.436c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
        WhatsApp
      </a>
      <button id="mobile-menu-btn" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menu" style="background:none;border:none;color:#fff;cursor:pointer;padding:.5rem;display:flex;align-items:center;min-height:44px;min-width:44px"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
    </div>
  </div>
  <nav id="mobile-menu" class="mobile-menu"><a href="/">INÍCIO</a><a href="/servicos">SERVIÇOS</a><a href="/sobre">SOBRE</a><a href="/contato">CONTATO</a><a href="/cases">NOSSO PROCESSO</a><a href="https://wa.me/5511974624100" target="_blank" rel="noopener" style="color:#25d366;font-weight:700">📲 WhatsApp</a></nav>
</header>`;

const newFooter = `<footer>
  <div class="footer-cta" style="background-color:var(--color-primary); color:#fff; padding: 3rem 1.25rem; text-align:center;">
    <h2 style="font-size:1.8rem; font-weight:800; margin-bottom:0.5rem;">Pronto para devolver a vida ao seu motor?</h2>
    <p style="margin-bottom:2rem; font-size:1rem; opacity:0.9;">Entre em contato agora e solicite seu orçamento gratuito via WhatsApp</p>
    <a href="https://wa.me/5511974624100" class="btn-whatsapp-green" style="font-size:1.1rem; padding: 0.8rem 2rem;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.118 1.528 5.849L0 24l6.337-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.727.888.914-3.638-.235-.374A9.78 9.78 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818zm5.472-7.436c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
      Chamar no WhatsApp (11) 97462-4100
    </a>
  </div>
  <div class="footer-dark" style="background-color:var(--color-footer-dk); padding: 3rem 0;">
    <div class="container-site" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;color:#fff;">
      
      <div style="display:flex;align-items:flex-start;gap:1rem;">
        <div style="width:40px;height:40px;background:#050505;border:2px solid var(--color-accent);display:flex;align-items:center;justify-content:center;font-family:'Times New Roman', Times, serif;font-weight:bold;font-size:1.2rem;color:var(--color-accent);flex-shrink:0;">RS</div>
        <div>
          <h3 style="font-size:1.1rem;font-weight:800;margin-bottom:0.25rem;">RS Retífica Severo</h3>
          <p style="font-size:0.85rem;color:#aaa;">Especialistas em retífica de motores desde 2015</p>
        </div>
      </div>

      <div>
        <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:1rem;color:#fff;">Contato</h3>
        <p style="font-size:0.9rem;color:#bbb;margin-bottom:0.5rem;display:flex;align-items:center;gap:0.5rem;">📍 Guarulhos/SP (Jardim Angélica, Pimentas e Centro)</p>
        <p style="font-size:0.9rem;color:#bbb;margin-bottom:0.5rem;display:flex;align-items:center;gap:0.5rem;">✉️ contato@retificasevero.com.br</p>
        <p style="font-size:0.9rem;color:#bbb;display:flex;align-items:center;gap:0.5rem;">📞 (11) 97462-4100</p>
      </div>

      <div>
        <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:1rem;color:#fff;">Horário</h3>
        <p style="font-size:0.9rem;color:#bbb;margin-bottom:0.5rem;">Segunda a Quinta: 08h às 18h</p>
        <p style="font-size:0.9rem;color:#bbb;">Sexta: 08h às 17h</p>
      </div>

    </div>
  </div>
</footer>`;

// Replace in all HTML files
const files = fs.readdirSync(buildDir).filter(f => f.endsWith('.html'));
for (const file of files) {
    const filePath = path.join(buildDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Replace header
    html = html.replace(/<header class="site-header" role="banner">[\s\S]*?<\/header>/, newHeader);
    
    // Replace footer
    html = html.replace(/<footer>[\s\S]*?<\/footer>/, newFooter);
    
    // Also inject styles block inside head if necessary, but we already updated style.css
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated header/footer in ${file}`);
}

// 3. Rewrite index.html Main Content
const indexHtmlContent = fs.readFileSync(indexFile, 'utf8');
const newMainContent = `<main id="main-content">
  <!-- Hero Section -->
  <section style="display:flex;flex-wrap:wrap;min-height:70vh;background-color:#fff;">
    <div style="flex:1;min-width:300px;display:flex;flex-direction:column;justify-content:center;padding:4rem 2rem;max-width:600px;margin:auto;">
      <h1 style="color:var(--color-primary);font-size:clamp(2.5rem, 5vw, 4rem);font-weight:900;line-height:1.1;margin-bottom:0.5rem;">RETÍFICA SEVERO</h1>
      <p style="color:#555;font-size:1.25rem;font-weight:500;margin-bottom:1.5rem;">Qualidade e Precisão que seu motor precisa</p>
      
      <div class="badge-gold" style="margin-bottom:1.5rem;display:inline-flex;align-items:center;gap:0.5rem;">
        <span style="font-size:1.2rem;">★</span> 
        <div style="text-align:left;line-height:1.2;">
          <div style="font-size:1.1rem;">GARANTIA 90 DIAS</div>
          <div style="font-size:0.75rem;font-weight:500;">Garantia de 90 dias em todos os serviços</div>
        </div>
      </div>

      <div>
        <a href="https://wa.me/5511974624100" class="btn-whatsapp-green" style="font-size:1.1rem;padding:0.8rem 2rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.118 1.528 5.849L0 24l6.337-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.727.888.914-3.638-.235-.374A9.78 9.78 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818zm5.472-7.436c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
          Fale no WhatsApp ➔
        </a>
      </div>

      <div class="hero-checks">
        <span style="color:#25d366;">✓ <span style="color:#333;">Orçamento sem custo</span></span>
        <span style="color:#25d366;">✓ <span style="color:#333;">Técnicos especializados</span></span>
        <span style="color:#25d366;">✓ <span style="color:#333;">Peças de qualidade</span></span>
      </div>
    </div>
    <div style="flex:1;min-width:300px;background:url('/assets/img/galeria/abertura-de-cilindro.jpg') center/cover no-repeat;">
      <!-- Using an existing image as hero background since mechanic is not provided -->
    </div>
  </section>

  <!-- Process Section -->
  <section class="bg-gray-light" style="padding:5rem 0;">
    <div class="container-site">
      <div style="text-align:center;margin-bottom:3rem;">
        <h2 style="font-size:2.2rem;font-weight:800;color:var(--color-primary);margin-bottom:0.5rem;">Como os motores chegam até nós</h2>
        <p style="font-size:1.1rem;color:#555;">Recebemos, avaliamos e recuperamos motores com o mais alto padrão técnico</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;">
        <div class="process-card">
          <img src="/assets/img/galeria/bloco-4-cilindros-oxidado.jpg" alt="Motor no recebimento" loading="lazy">
          <h3>1. Recebimento</h3>
          <p>Motor chega para Inspeção Inicial</p>
        </div>
        <div class="process-card">
          <img src="/assets/img/galeria/biela-empenada-calco-hidraulico.jpg" alt="Motor no diagnóstico" loading="lazy">
          <h3>2. Diagnóstico</h3>
          <p>Desmontagem e análise técnica completa</p>
        </div>
        <div class="process-card">
          <img src="/assets/img/galeria/encamisamento-de-cilindro.jpg" alt="Motor em avaliação" loading="lazy">
          <h3>3. Avaliação</h3>
          <p>Relatório com diagnóstico e orçamento</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Before & After Section -->
  <section style="padding:5rem 0;background:#fff;">
    <div class="container-site">
      <div style="text-align:center;margin-bottom:4rem;">
        <h2 style="font-size:2.2rem;font-weight:800;color:var(--color-primary);margin-bottom:0.5rem;">Antes e Depois da Retífica</h2>
        <p style="font-size:1.1rem;color:#555;">Veja a transformação real dos motores que passaram pela nossa retífica</p>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:2rem;justify-content:center;">
        
        <div style="flex:1;min-width:300px;max-width:500px;text-align:center;">
          <div style="text-align:left;margin-bottom:-1rem;position:relative;z-index:2;margin-left:1rem;">
            <span class="badge-red">ANTES</span>
          </div>
          <img src="/assets/img/galeria/cabecote-empenado-antes.jpg" alt="Motor Carbonizado" style="width:100%;height:300px;object-fit:cover;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);margin-bottom:1.5rem;" loading="lazy">
          <p style="font-weight:600;color:#555;font-size:1rem;">Carbonizado, desgaste excessivo, perda de compressão</p>
        </div>

        <div style="flex:1;min-width:300px;max-width:500px;text-align:center;">
          <div style="text-align:left;margin-bottom:-1rem;position:relative;z-index:2;margin-left:1rem;">
            <span class="badge-gold-sq">DEPOIS</span>
          </div>
          <img src="/assets/img/galeria/cabecote-zerado-depois.jpg" alt="Motor Retificado" style="width:100%;height:300px;object-fit:cover;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);margin-bottom:1.5rem;" loading="lazy">
          <p style="font-weight:600;color:#555;font-size:1rem;">Retificado, limpo, testado e pronto para rodar</p>
        </div>

      </div>
    </div>
  </section>

</main>`;

const finalIndexContent = indexHtmlContent.replace(/<main id="main-content">[\s\S]*?<\/main>/, newMainContent);
fs.writeFileSync(indexFile, finalIndexContent, 'utf8');
console.log('Index.html rewritten.');
