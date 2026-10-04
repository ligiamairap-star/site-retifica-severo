const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '.');
const files = fs.readdirSync(buildDir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(buildDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    const targetString = 'Guarulhos/SP (Jardim Angélica, Pimentas e Centro)';
    const replacementString = 'Guarulhos/SP (Guarulhos e Região)';
    
    if (html.includes(targetString)) {
        html = html.replace(new RegExp(targetString.replace(/[.*+?^$\{}()|[\]\\]/g, '\\$&'), 'g'), replacementString);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated location in ${file}`);
    }
}
console.log('Done!');
