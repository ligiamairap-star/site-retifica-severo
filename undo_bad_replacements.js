const fs = require('fs');
const path = require('path');
const buildDir = path.join(__dirname, 'build');

const undoMap = [
    // não -> no
    [/([\w\-])não/g, '$1no'],
    [/não([\w\-])/g, 'no$1'],
    
    // NÃO -> NO
    [/([\w\-])NÃO/g, '$1NO'],
    [/NÃO([\w\-])/g, 'NO$1'],
    
    // útil -> til
    [/([\w\-])útil/g, '$1til'],
    [/útil([\w\-])/g, 'til$1'],
    
    // óleo -> leo
    [/([\w\-])óleo/g, '$1leo'],
    [/óleo([\w\-])/g, 'leo$1'],
    
    // água -> gua
    [/([\w\-])água/g, '$1gua'],
    [/água([\w\-])/g, 'gua$1'],
    
    // além -> alm
    [/([\w\-])além/g, '$1alm'],
    [/além([\w\-])/g, 'alm$1'],
    
    // peça -> pea
    [/([\w\-])peça/g, '$1pea'],
    [/peça([\w\-])/g, 'pea$1'],
    
    // peças -> peas
    [/([\w\-])peças/g, '$1peas'],
    [/peças([\w\-])/g, 'peas$1'],
    
    // única -> nica
    [/([\w\-])única/g, '$1nica'],
    [/única([\w\-])/g, 'nica$1'],

    // área -> rea 
    [/ área([\w\-])/g, ' rea$1'],

    // aço -> ao
    [/ aço([\w\-])/g, ' ao$1'],

    // rápido -> rpido
    [/ rápido([\w\-])/g, ' rpido$1'],
    
    // Fix missing accents for the ones we just reverted
    [/mecnica/g, 'mecânica'],
    [/tcnica/g, 'técnica'],
    [/clinica/g, 'clínica']
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
            
            for (const [regex, replacement] of undoMap) {
                html = html.replace(regex, replacement);
            }

            if (html !== orig) {
                fs.writeFileSync(filePath, html, 'utf8');
                console.log(`Undid bad replacements in ${file}`);
            }
        }
    }
}
processDir(buildDir);
