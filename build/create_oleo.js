const fs = require('fs');

const baseHtml = fs.readFileSync('c:/Users/ligia/OneDrive/Documentos/sites/site-retifica-severo/build/cases/abertura-de-cilindro.html', 'utf8');

const mainStart = baseHtml.indexOf('<main id="main-content" style="background:#fff">');
const mainEnd = baseHtml.indexOf('</main>') + '</main>'.length;

const header = baseHtml.substring(0, mainStart);
const footer = baseHtml.substring(mainEnd);

const newMain = `<main id="main-content" style="background:#fff">
  <div class="container-site" style="max-width:820px;padding-block:2rem 4rem">
    <nav class="breadcrumb"><a href="../index.html">Início</a> é <a href="../index.html#cases">Cases</a> é Luz do Óleo</nav>

    <div style="width:100%; height:460px; background-color:#2a2a2a; border-radius:12px; margin-bottom:2rem; display:flex; align-items:center; justify-content:center; color:#fff; font-size:1.5rem; font-weight:bold; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <span style="color:#e74c3c; font-size:2rem; margin-right:10px;">⚠️</span> Painel: Luz de Pressão do Óleo
    </div>

    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;flex-wrap:wrap">
      <span style="background:#e8edf8;color:var(--color-primary);font-size:.8rem;font-weight:600;padding:.3rem .7rem;border-radius:20px">Lubrificação</span>
      <span style="color:#888;font-size:.85rem">Setembro de 2024</span>
      <span style="color:#888;font-size:.85rem">é 6 min de leitura</span>
    </div>

    <h1 style="color:var(--color-primary);font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;line-height:1.25;margin-bottom:1rem">Luz do Óleo Acendendo: Causas, Sintomas e Quando a Retífica é Necessária</h1>
    <p style="font-size:1.05rem;color:#555;margin-bottom:2rem;line-height:1.8">Uma das luzes mais críticas do painel do seu carro é a luz do óleo (a famosa "almotolia" vermelha). Se ela acendeu, não significa necessariamente que o óleo está baixo, mas sim que o motor está trabalhando com <strong>baixa pressão de lubrificação</strong>. Ignorar esse aviso pode levar à perda total do motor por falta de lubrificação em questão de minutos.</p>

    <nav class="toc" aria-label="Sumário do artigo">
      <strong style="color:var(--color-primary);font-size:.95rem;display:block;margin-bottom:.75rem">📑 Neste Artigo</strong>
      <ol>
        <li><a href="#pressao">Por que a luz do óleo acende?</a></li>
        <li><a href="#causas">Principais causas da baixa pressão</a></li>
        <li><a href="#folga">Folga de mancal: quando o problema é mecânico</a></li>
        <li><a href="#borra">Borra de óleo e o entupimento do pescador</a></li>
        <li><a href="#o-que-fazer">O que fazer se a luz acender?</a></li>
        <li><a href="#faq-post">Perguntas frequentes</a></li>
      </ol>
    </nav>

    <article style="line-height:1.85;color:#444;margin-top:2rem">

      <h2 id="pressao" style="color:var(--color-primary);font-size:1.35rem;font-weight:700;margin:2rem 0 .75rem">Por que a luz do óleo acende?</h2>
      <p>A luz no painel é conectada a um interruptor (cebolinha de óleo) instalado no bloco do motor. Sua função não é medir o volume de óleo no cárter, mas sim a <strong>pressão gerada pela bomba</strong> no sistema. Quando a pressão cai abaixo do limite de segurança (geralmente abaixo de 0,5 a 1,0 bar em marcha lenta), a cebolinha fecha o contato e acende a luz no painel.</p>

      <h2 id="causas" style="color:var(--color-primary);font-size:1.35rem;font-weight:700;margin:2rem 0 .75rem">Principais causas da baixa pressão</h2>
      <ul class="check-list" style="margin:.75rem 0 1rem">
        <li><strong>Nível de óleo criticamente baixo:</strong> A bomba suga ar junto com o óleo, fazendo a pressão despencar.</li>
        <li><strong>Óleo vencido ou com viscosidade errada:</strong> Óleos muito finos em motores gastos não geram pressão suficiente; óleos muito grossos podem não circular adequadamente.</li>
        <li><strong>Filtro de óleo entupido ou de má qualidade:</strong> Restringe o fluxo principal de lubrificação.</li>
        <li><strong>Defeito no sensor (cebolinha):</strong> Às vezes, a pressão está normal, mas o sensor está com defeito, sujo ou com mau contato.</li>
        <li><strong>Bomba de óleo desgastada:</strong> As engrenagens ou rotores da bomba sofrem desgaste e perdem a capacidade de pressurizar o óleo.</li>
      </ul>

      <h2 id="folga" style="color:var(--color-primary);font-size:1.35rem;font-weight:700;margin:2rem 0 .75rem">Folga de mancal: quando o problema é mecânico grave</h2>
      <p>Se as causas simples (nível, sensor e filtro) foram descartadas e a bomba está boa, o problema geralmente está no <strong>desgaste das peças móveis do motor</strong>, especialmente nos mancais do virabrequim e bielas.</p>
      <p style="margin-top:.75rem">A pressão do óleo só existe porque o óleo é forçado a passar por espaços extremamente justos (folgas de 0,03 a 0,06 mm) entre o virabrequim e as bronzinas. Quando essas peças sofrem desgaste (devido a alta quilometragem, sujeira ou superaquecimento), o espaço aumenta. É como um cano furado: a bomba manda o óleo, mas ele "vaza" pelos espaços grandes dos mancais desgastados, fazendo a pressão despencar no sistema como um todo.</p>
      
      <div style="background:#f0f4ff;border-left:4px solid var(--color-primary);border-radius:0 8px 8px 0;padding:1.25rem;margin-bottom:1.5rem">
        <strong style="color:var(--color-primary)">✅ O papel da Retífica:</strong> Nesses casos de folga excessiva nos mancais, a única solução definitiva é <strong>retificar o virabrequim</strong> e utilizar bronzinas de sobremedida. Trocar a bomba de óleo ou engrossar o lubrificante em um motor com folga mecânica é apenas jogar dinheiro fora, pois não resolve o problema raiz.
      </div>

      <h2 id="borra" style="color:var(--color-primary);font-size:1.35rem;font-weight:700;margin:2rem 0 .75rem">Borra de óleo e o entupimento do pescador</h2>
      <p>Outra causa extremamente comum é a formação de borra (sludge) no fundo do cárter. A borra se forma pela mistura de óleo oxidado, combustível adulterado e trocas prolongadas. Essa sujeira entope a tela do "pescador" da bomba de óleo, impedindo que o óleo seja sugado.</p>
      <p style="margin-top:.75rem">Sintoma clássico de pescador entupido: a luz do óleo acende quando você acelera (quando o motor demanda mais fluxo e a sujeira é sugada contra a tela) e pode apagar em marcha lenta (quando a sujeira se desprende levemente do pescador).</p>

      <h2 id="o-que-fazer" style="color:var(--color-primary);font-size:1.35rem;font-weight:700;margin:2rem 0 .75rem">O que fazer se a luz acender?</h2>
      <ol style="padding-left:1.5rem;margin-top:.75rem;display:flex;flex-direction:column;gap:.6rem">
        <li><strong>Pare o carro imediatamente:</strong> Vá para um local seguro, desligue o motor e não tente forçar.</li>
        <li><strong>Verifique o nível de óleo:</strong> Puxe a vareta e verifique se há óleo. Se estiver seco, completar pode salvar o motor até a oficina.</li>
        <li><strong>Chame um reboque:</strong> Não corra o risco de fundir ou travar o motor rodando sem pressão de lubrificação.</li>
        <li><strong>Teste de pressão na oficina:</strong> O mecânico irá instalar um manômetro analógico para ler a pressão real do motor e confirmar se o defeito é na cebolinha ou interno.</li>
      </ol>

    </article>

    <section style="margin-top:3rem" aria-labelledby="faq-post-oleo">
      <h2 id="faq-post-oleo" style="color:var(--color-primary);font-size:1.2rem;font-weight:700;margin-bottom:1.25rem">Perguntas Frequentes</h2>
      <div class="faq-item"><button class="faq-btn">A luz do óleo pisca em marcha lenta e apaga quando acelero. O que é?<span class="faq-icon">+</span></button><div class="faq-answer">É um sintoma clássico de folga excessiva nos mancais (virabrequim) ou bomba de óleo fraca. Em baixa rotação, a bomba gira devagar e não consegue vencer a folga mecânica. Ao acelerar, a vazão aumenta e a pressão "engana" o sensor, mas o desgaste continua lá.</div></div>
      <div class="faq-item"><button class="faq-btn">Trocar por um óleo mais grosso (ex: 20W50) resolve o problema?<span class="faq-icon">+</span></button><div class="faq-answer">Mudar a viscosidade para uma mais grossa pode apagar a luz momentaneamente, mascarando a folga nos mancais. Porém, o óleo mais grosso terá dificuldade em lubrificar as partes altas do motor (cabeçote), podendo causar desgastes no comando de válvulas a médio prazo.</div></div>
      <div class="faq-item"><button class="faq-btn">Qual a pressão normal de uma bomba de óleo?<span class="faq-icon">+</span></button><div class="faq-answer">Varia conforme o motor, mas geralmente entre 0,8 a 1,5 bar na marcha lenta (motor quente) e entre 3,0 a 4,5 bar a 3000 RPM. Sempre consulte o manual técnico do seu veículo para os valores de aferição.</div></div>
    </section>

    <div class="author-box" style="margin-top:3rem">
      <img src="https://placehold.co/72x72/1743AC/FFD036?text=RS" alt="Avatar da Equipe Técnica da Retífica Severo" class="author-avatar" width="72" height="72" loading="lazy"/>
      <div>
        <strong style="color:var(--color-primary)">Equipe Técnica é Retífica Severo</strong>
        <p style="font-size:.8rem;color:#888;margin-bottom:.4rem">Especialistas em usinagem de motores automotivos é Guarulhos, SP</p>
        <p style="font-size:.875rem;color:#555">Dedicados a levar informações técnicas de qualidade para motoristas e mecânicos.</p>
      </div>
    </div>

    <div style="text-align:center;margin-top:3rem;background:var(--color-primary);border-radius:12px;padding:2.5rem 1.5rem">
      <h2 style="color:#D4A220;font-weight:800;font-size:1.3rem;margin-bottom:.75rem">Motor sofreu por falta de óleo?</h2>
      <p style="color:rgba(255,255,255,.85);margin-bottom:1.5rem">Se a luz acendeu e o motor começou a bater metálico, nós podemos recuperar o virabrequim e bloco.</p>
      <a href="https://wa.me/5511974624100?text=Ol%C3%A1%2C%20meu%20carro%20teve%20problema%20com%20press%C3%A3o%20de%20%C3%B3leo%20e%20quero%20um%20or%C3%A7amento." class="btn-whatsapp" target="_blank" rel="noopener">📲 Solicitar Diagnóstico</a>
    </div>

    <section style="margin-top:3rem" aria-labelledby="relacionados-heading">
      <h2 id="relacionados-heading" style="color:var(--color-primary);font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Artigos Relacionados</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem">
        <a href="../cases/o-que-e-motor-bater-biela.html" style="text-decoration:none;display:flex;align-items:center;gap:1rem;background:var(--color-bg);border-radius:10px;padding:.9rem;transition:box-shadow .2s" onmouseover="this.style.boxShadow='0 4px 16px rgba(0,0,0,.12)'" onmouseout="this.style.boxShadow='none'">
          <img src="../assets/img/bielas.webp" alt="Motor bate biela" width="80" height="60" loading="lazy" style="border-radius:6px;flex-shrink:0;object-fit:cover"/>
          <span style="color:var(--color-primary);font-size:.875rem;font-weight:600">O que Fazer Quando o Motor &ldquo;Bate Biela&rdquo;?</span>
        </a>
        <a href="../cases/retifica-de-virabrequim.html" style="text-decoration:none;display:flex;align-items:center;gap:1rem;background:var(--color-bg);border-radius:10px;padding:.9rem;transition:box-shadow .2s" onmouseover="this.style.boxShadow='0 4px 16px rgba(0,0,0,.12)'" onmouseout="this.style.boxShadow='none'">
          <img src="../assets/img/galeria/virabrequim-retificado-colos.jpg" alt="Virabrequim" width="80" height="60" loading="lazy" style="border-radius:6px;flex-shrink:0;object-fit:cover"/>
          <span style="color:var(--color-primary);font-size:.875rem;font-weight:600">Retífica de Virabrequim: Medidas e Limites</span>
        </a>
      </div>
    </section>
  </div>
</main>`;

// Change page title and meta description
let newHeader = header.replace(
  /<title>.*?<\/title>/, 
  '<title>Luz do Óleo Acendendo: Causas e o que Fazer | Retífica Severo</title>'
);
newHeader = newHeader.replace(
  /<meta name="description" content=".*?"\/>/,
  '<meta name="description" content="Luz do óleo acendendo no painel? Entenda as principais causas: borra, bomba de óleo fraca, folga de mancal e quando a retífica é necessária."/>'
);

// We should also replace the JSON-LD info, but it's okay for now or we can do a regex replace
newHeader = newHeader.replace(/"name": "Abertura de Cilindro[^"]*"/g, '"name": "Luz do Óleo Acendendo"');
newHeader = newHeader.replace(/"headline": "Abertura de Cilindro[^"]*"/, '"headline": "Luz do Óleo Acendendo"');

const finalHtml = newHeader + newMain + footer;

fs.writeFileSync('c:/Users/ligia/OneDrive/Documentos/sites/site-retifica-severo/build/cases/luz-do-oleo-acendendo.html', finalHtml, 'utf8');

console.log('Criado caso luz do oleo');
