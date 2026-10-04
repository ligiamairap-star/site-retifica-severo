const fs = require('fs');
const path = require('path');

const casesFile = path.join(__dirname, 'cases.html');

const galleryHtml = `
      <!-- Galeria Técnica -->
      <h2 style="color:var(--color-primary);font-size:1.5rem;font-weight:800;margin-top:4rem;margin-bottom:1.25rem;text-transform:uppercase;letter-spacing:.05em;padding-bottom:.5rem;border-bottom:2px solid var(--color-accent)">📸 Galeria Técnica (Antes e Depois)</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-bottom:3rem">
        
        <!-- Imagem 1 -->
        <article class="service-card" style="box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:12px; overflow:hidden;">
          <img src="/assets/img/galeria/biela-danificada.jpg" alt="biela danificada retifica guarulhos RS Retifica Severo" loading="lazy" style="width:100%;height:220px;object-fit:cover;"/>
          <div style="padding:1.25rem; background:#fff;">
            <p style="font-size:.875rem;color:#555;margin:0"><strong>Biela Danificada:</strong> Biela com desgaste severo analizada na RS Retífica Severo em Guarulhos. Análise completa de bielas linha leve</p>
          </div>
        </article>

        <!-- Imagem 2 -->
        <article class="service-card" style="box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:12px; overflow:hidden;">
          <img src="/assets/img/galeria/biela-empenada-calco-hidraulico.jpg" alt="biela empenada calco hidraulico retifica motor guarulhos" loading="lazy" style="width:100%;height:220px;object-fit:cover;"/>
          <div style="padding:1.25rem; background:#fff;">
            <p style="font-size:.875rem;color:#555;margin:0"><strong>Biela Empenada:</strong> Diagnóstico de biela empenada por calço hidráulico. Serviço especializado RS Retífica em Guarulhos SP.</p>
          </div>
        </article>

        <!-- Imagem 3 -->
        <article class="service-card" style="box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:12px; overflow:hidden;">
          <img src="/assets/img/galeria/bloco-4-cilindros-oxidado.jpg" alt="bloco motor 4 cilindros oxidado retifica guarulhos" loading="lazy" style="width:100%;height:220px;object-fit:cover;"/>
          <div style="padding:1.25rem; background:#fff;">
            <p style="font-size:.875rem;color:#555;margin:0"><strong>Bloco 4 Cilindros Oxidado:</strong> Recuperação de bloco 4 cilindros com oxidação. Retífica de blocos linha leve em Guarulhos com garantia RS Severo.</p>
          </div>
        </article>

        <!-- Imagem 4 -->
        <article class="service-card" style="box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:12px; overflow:hidden;">
          <img src="/assets/img/galeria/encamisamento-cilindro-v3.jpg" alt="encamisamento cilindro motor retifica guarulhos" loading="lazy" style="width:100%;height:220px;object-fit:cover;"/>
          <div style="padding:1.25rem; background:#fff;">
            <p style="font-size:.875rem;color:#555;margin:0"><strong>Encamisamento de Cilindro:</strong> Serviço de encamisamento de cilindro com alta precisão. Processo completo na RS Retífica Severo Guarulhos.</p>
          </div>
        </article>

        <!-- Imagem 5 -->
        <article class="service-card" style="box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:12px; overflow:hidden;">
          <img src="/assets/img/galeria/bloco-soldas-especiais.jpg" alt="bloco motor solda especial retifica linha leve guarulhos RS" loading="lazy" style="width:100%;height:220px;object-fit:cover;"/>
          <div style="padding:1.25rem; background:#fff;">
            <p style="font-size:.875rem;color:#555;margin:0"><strong>Bloco Soldas Especiais:</strong> ⭐ Bloco 4 cilindros com soldas especiais e plaina de topo. Recuperação de blocos trincados na RS Retífica Severo, referência em Guarulhos para linha leve.</p>
          </div>
        </article>



        <!-- Imagem 8: Bloco 3 Cilindros -->
        <article class="service-card" style="box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:12px; overflow:hidden;">
          <img src="/assets/img/galeria/bloco-3-cilindros-antes-depois.jpg" alt="Antes e Depois usinagem e limpeza química de bloco 3 cilindros" loading="lazy" style="width:100%;height:220px;object-fit:cover;"/>
          <div style="padding:1.25rem; background:#fff;">
            <p style="font-size:.875rem;color:#555;margin:0"><strong>Bloco 3 Cilindros:</strong> Comparativo do bloco em seu estado crítico de oxidação e carbonização, e o resultado final após lavagem química intensiva e usinagem de precisão.</p>
          </div>
        </article>

        <!-- Imagem 9 -->
        <article class="service-card" style="box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:12px; overflow:hidden;">
          <img src="/assets/img/galeria/pistao-falha-catastrofica.jpg" alt="pistao destruido falha motor retifica guarulhos" loading="lazy" style="width:100%;height:220px;object-fit:cover;"/>
          <div style="padding:1.25rem; background:#fff;">
            <p style="font-size:.875rem;color:#555;margin:0"><strong>Pistão Falha Catastrófica:</strong> Pistão com falha catastrófica analisado na RS. Evite prejuízos maiores com diagnóstico na retífica em Guarulhos.</p>
          </div>
        </article>

        <!-- Imagem 10 -->
        <article class="service-card" style="box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:12px; overflow:hidden;">
          <img src="/assets/img/galeria/brunimento-de-cilindro.jpg" alt="brunimento cilindro motor retifica guarulhos SP" loading="lazy" style="width:100%;height:220px;object-fit:cover;"/>
          <div style="padding:1.25rem; background:#fff;">
            <p style="font-size:.875rem;color:#555;margin:0"><strong>Brunimento de Cilindro:</strong> Brunimento de cilindro com acabamento cruzado perfeito para assentamento dos anéis. RS Retífica Severo Guarulhos.</p>
          </div>
        </article>

        <!-- Imagem 11 -->
        <article class="service-card" style="box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:12px; overflow:hidden;">
          <img src="/assets/img/galeria/virabrequim.webp" alt="virabrequim retificado retifica guarulhos RS Severo" loading="lazy" style="width:100%;height:220px;object-fit:cover;"/>
          <div style="padding:1.25rem; background:#fff;">
            <p style="font-size:.875rem;color:#555;margin:0"><strong>Virabrequim Retificado:</strong> Virabrequim retificado e balanceado. Retífica de virabrequim linha leve em Guarulhos na RS Severo.</p>
          </div>
        </article>

      <!-- Imagem 12: Cabeçote Antes e Depois -->
        <article class="service-card" style="box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:12px; overflow:hidden;">
          <img src="/assets/img/galeria/cabecote-antes-depois.jpg" alt="Antes e Depois limpeza e retífica de cabeçote de motor" loading="lazy" style="width:100%;height:220px;object-fit:cover;"/>
          <div style="padding:1.25rem; background:#fff;">
            <p style="font-size:.875rem;color:#555;margin:0"><strong>Cabeçote:</strong> Restauração completa de cabeçote, eliminando carbonização extrema das válvulas com lavagem profunda, assentamento e plaina.</p>
          </div>
        </article>

      </div>
`;

let content = fs.readFileSync(casesFile, 'utf8');
if (!content.includes('Galeria Técnica (Antes e Depois)')) {
    content = content.replace('    </div>\n  </section>\n</main>', `\n${galleryHtml}\n    </div>\n  </section>\n</main>`);
    fs.writeFileSync(casesFile, content, 'utf8');
    console.log('Gallery injected into cases.html');
} else {
    console.log('Gallery already exists in cases.html');
}
