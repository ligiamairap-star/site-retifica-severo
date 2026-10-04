const fs = require('fs');
const path = require('path');
const buildDir = path.join(__dirname, 'build');

const fixes = [
    [/técúnica/g, 'técnica'],
    [/mecâúnica/g, 'mecânica'],
    [/técǧnica/g, 'técnica'], 
    [/técnica/g, 'técnica'],
    [/éágua/g, 'água'],
    [/éárea/g, 'área'],
    [/éúnica/g, 'única'],
    [/éóleo/g, 'óleo'],
    [/éútil/g, 'útil'],
    [/éé+/g, '  '], 
    [/padrǜo/g, 'padrão'],
];

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processDir(filePath);
        } else if (file.endsWith('.html')) {
            let html = fs.readFileSync(filePath, 'utf8');
            let orig = html;
            
            // 1. Fix known broken words from the previous double-replace
            for (const [regex, replacement] of fixes) {
                html = html.replace(regex, replacement);
            }
            
            // 2. Protect valid ' é ' words (the verb 'is')
            // Using lookbehind and lookahead. We only protect ' é ' if it's between word characters or HTML tags.
            // We explicitly exclude quotes so alignment spaces like `': é 'denied'` aren't protected.
            html = html.replace(/(?<=[a-zA-ZÀ-ÿ0-9>\]\)\}]) é (?=[a-zA-ZÀ-ÿ0-9<\[\{\(])/g, ' __E_VERB__ ');

            // 3. Replace all 'é' at the START of a line (indentation)
            html = html.replace(/^[ \té]+/gm, match => match.replace(/é/g, ' '));

            // 4. Replace any 'é' that is surrounded by spaces or next to a space
            html = html.replace(/ é /g, '   ');
            html = html.replace(/é /g, '  ');
            html = html.replace(/ é/g, '  ');
            
            // 5. Replace 'é' next to punctuation which shouldn't have 'é'
            html = html.replace(/é</g, ' <');
            html = html.replace(/>é/g, '> ');
            html = html.replace(/é="/g, ' ="');
            html = html.replace(/é-/g, ' -');
            html = html.replace(/-é/g, '- ');

            // 6. Unprotect the verb
            html = html.replace(/__E_VERB__/g, 'é');

            if (html !== orig) {
                fs.writeFileSync(filePath, html, 'utf8');
                console.log(`Cleaned ${file}`);
            }
        }
    }
}
processDir(buildDir);
