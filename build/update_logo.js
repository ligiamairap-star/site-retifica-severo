const fs = require('fs');
const path = require('path');

const newLogo = `<a href="/" aria-label="Retífica Severo" style="display:flex;flex-direction:column;align-items:center;gap:.15rem;text-decoration:none;flex-shrink:0">
      <div style="width:52px;height:52px;background:#050505;display:flex;align-items:center;justify-content:center;font-family:'Times New Roman', Times, serif;font-weight:bold;font-size:1.8rem;color:var(--color-accent);line-height:1;box-shadow:0 4px 6px rgba(0,0,0,0.3)">RS</div>
      <span style="color:var(--color-accent);font-family:'Times New Roman', Times, serif;font-weight:bold;font-size:0.85rem;line-height:1;letter-spacing:.05em">RETÍFICA SEVERO</span>
    </a>`;

function walkDir(dir) {
    let files = fs.readdirSync(dir);
    files.forEach(f => {
        let fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (f.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Regex to find the old logo block regardless of aria-label
            // It matches <a href="/" followed by the div containing RS and the span containing RETÍFICA
            const regex = /<a href="\/"[^>]*>[\s\S]*?<div[^>]*>RS<\/div>[\s\S]*?<span[^>]*>RETÍFICA[\s\S]*?<\/span>[\s\S]*?<\/a>/;
            
            if (regex.test(content)) {
                content = content.replace(regex, newLogo);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated: ' + fullPath);
            }
        }
    });
}

walkDir(__dirname);
console.log('Done!');
