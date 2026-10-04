const fs = require('fs');
const path = require('path');

const buildDir = __dirname;
const keywordsHtml = `\n    <div style="font-size:0.75rem; color:#888; text-align:center; margin-top:1.5rem; border-top:1px solid #333; padding-top:1rem;">\n      Palavras-chave: retífica em Guarulhos, retífica de motores Guarulhos, RS Retífica Severo, retífica linha leve Guarulhos, retífica de cabeçote Guarulhos\n    </div>\n  `;

function walkDir(dir) {
    let files = fs.readdirSync(dir);
    files.forEach(f => {
        let fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (f.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            if (!content.includes('Palavras-chave: retífica em Guarulhos')) {
                // Find the closing div of footer-dark
                // Usually it's <div class="footer-dark">...</div>
                // Let's replace the last </div> before the end of the file that belongs to footer-dark
                // A safer way: find `<div class="footer-dark"` and inject it inside.
                
                content = content.replace(/(<div class="footer-dark"[^>]*>[\s\S]*?)<\/div>\s*<\/body>/, `$1${keywordsHtml}</div>\n</body>`);
                
                // For cases where footer-dark might not be right before </body>, 
                // we can just replace `<div class="footer-dark">` inner contents. But Regex is tricky.
                // Let's do a simple string split if the above doesn't work.
                
                if (content === originalContent) {
                   // Fallback: just put it before </footer> or before </body>
                   content = content.replace(/<\/body>/, `${keywordsHtml}\n</body>`);
                }

                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Added keywords to ${f}`);
            }
        }
    });
}

walkDir(buildDir);
console.log('Done');
