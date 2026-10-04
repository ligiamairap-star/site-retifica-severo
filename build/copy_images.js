const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../06-imagens');
const targetDir = path.join(__dirname, 'assets/img/galeria');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const mapping = [
    { src: 'Capa de biela.jpg', dest: 'biela-danificada.jpg' },
    { src: 'BIELA COM CALÇO HIDRALICO.jpeg', dest: 'biela-empenada-calco-hidraulico.jpg' },
    { src: 'BLOCO 1.jpg', dest: 'bloco-4-cilindros-oxidado.jpg' },
    { src: 'BLOCO 2.jpg', dest: 'encamisamento-de-cilindro.jpg' },
    { src: 'SOLDAS NO BLOCO.jpeg', dest: 'bloco-soldas-especiais.jpg' },
    { src: 'CABEÇOTE IMPENADO.jpeg', dest: 'cabecote-empenado-antes.jpg' },
    { src: 'CABEÇOTE JUNTA QUEIMANDA.jpeg', dest: 'cabecote-zerado-depois.jpg' },
    { src: 'Abertura de cilindro.jpeg', dest: 'abertura-de-cilindro.jpg' },
    { src: 'PISTÃO QUEBRADO APOS CALÇO HIDRALLICO.jpeg', dest: 'pistao-falha-catastrofica.jpg' },
    { src: 'BLOCO 3.jpg', dest: 'brunimento-de-cilindro.jpg' },
    { src: 'ANTES E DEPOIS DO MOTOR.jpeg', dest: 'virabrequim-retificado.jpg' }
];

mapping.forEach(item => {
    const srcPath = path.join(sourceDir, item.src);
    const destPath = path.join(targetDir, item.dest);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${item.src} to ${item.dest}`);
    } else {
        console.error(`Source file not found: ${srcPath}`);
    }
});

console.log('Done mapping images.');
