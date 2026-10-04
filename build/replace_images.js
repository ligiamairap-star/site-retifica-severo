const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname);

function walkDir(d) {
    let files = fs.readdirSync(d);
    files.forEach(f => {
        let fullPath = path.join(d, f);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (f.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // 1. Bielas
            content = content.replace(/https:\/\/placehold\.co\/[^"]+text=Retífica\+de\+Bielas[^"]*/g, '/assets/img/bielas.webp');
            content = content.replace(/https:\/\/placehold\.co\/[^"]+text=Bielas[^"]*/g, '/assets/img/bielas.webp');
            content = content.replace(/https:\/\/placehold\.co\/[^"]+text=Biela[^"]*/g, '/assets/img/bielas.webp');
            content = content.replace(/https:\/\/placehold\.co\/[^"]+text=Bate\+Biela[^"]*/g, '/assets/img/bielas.webp');
            content = content.replace(/https:\/\/placehold\.co\/[^"]+text=Bate\+Biela\+Motor[^"]*/g, '/assets/img/bielas.webp');

            // 2. Virabrequim
            content = content.replace(/https:\/\/placehold\.co\/[^"]+text=Retífica\+Virabrequim[^"]*/g, '/assets/img/virabrequim.webp');
            content = content.replace(/https:\/\/placehold\.co\/[^"]+text=Virabrequim[^"]*/g, '/assets/img/virabrequim.webp');

            // 3. Peças de Motor / Bloco
            content = content.replace(/https:\/\/placehold\.co\/[^"]+text=Retífica\+do\+Bloco[^"]*/g, '/assets/img/pecas-de-motor.webp');
            content = content.replace(/https:\/\/placehold\.co\/[^"]+text=Bloco\+Motor[^"]*/g, '/assets/img/pecas-de-motor.webp');
            
            // 4. Balcão / Oficina
            content = content.replace(/https:\/\/placehold\.co\/[^"]+text=Nossa\+Oficina[^"]*/g, '/assets/img/retifica-balcao.webp');
            content = content.replace(/https:\/\/placehold\.co\/[^"]+text=Nossa\+História[^"]*/g, '/assets/img/retifica-balcao.webp');
            content = content.replace(/https:\/\/placehold\.co\/[^"]+text=Retífica\+Severo[^"]*/g, '/assets/img/retifica-balcao.webp'); // This hits the hero image

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Replaced images in ' + fullPath);
            }
        }
    });
}

walkDir(dir);
console.log('Done!');
