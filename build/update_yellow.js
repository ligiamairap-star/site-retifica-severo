const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname);
// Replacing the old bright yellows with a softer gold: #D4A220
const regex1 = /#FFD036/gi;
const regex2 = /#FFC933/gi;
const newColor = '#D4A220';

function walkDir(d) {
    let files = fs.readdirSync(d);
    files.forEach(f => {
        let fullPath = path.join(d, f);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (f.endsWith('.html') || f.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            content = content.replace(regex1, newColor);
            content = content.replace(regex2, newColor);

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated colors in ' + fullPath);
            }
        }
    });
}

walkDir(dir);
console.log('Done!');
