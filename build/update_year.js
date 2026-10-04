const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '.');
const files = fs.readdirSync(buildDir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(buildDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Replace the year in the footer text
    if (html.includes('desde 2015')) {
        html = html.replace(/desde 2015/g, 'desde 2001');
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated year in ${file}`);
    }
}
console.log('Done!');
