const fs = require('fs'); 
function replaceInFile(p) { 
    if(!fs.existsSync(p)) return;
    let c = fs.readFileSync(p, 'utf8'); 
    
    // Replace Placeholders
    c = c.replace(/https:\/\/placehold\.co\/80x60\/e8edf8\/1743AC\?text=Brunimento/g, '../assets/img/brunimento-cilindros.jpg'); 
    c = c.replace(/https:\/\/placehold\.co\/80x60\/e8edf8\/1743AC\?text=Cabeçote/g, '../assets/img/cabecote-empenado-sinais.jpg'); 
    c = c.replace(/https:\/\/placehold\.co\/420x220\/e8edf8\/1743AC\?text=Brunimento/g, './assets/img/brunimento-cilindros.jpg'); 
    
    // Fix object-fit:cover for these images
    c = c.replace(/(<img[^>]+src="\.\.\/assets\/img\/brunimento-cilindros\.jpg"[^>]+style="[^"]*)"/g, (match, p1) => { 
        if(!p1.includes('object-fit')) return p1 + ';object-fit:cover"'; 
        return match; 
    }); 
    c = c.replace(/(<img[^>]+src="\.\.\/assets\/img\/cabecote-empenado-sinais\.jpg"[^>]+style="[^"]*)"/g, (match, p1) => { 
        if(!p1.includes('object-fit')) return p1 + ';object-fit:cover"'; 
        return match; 
    }); 
    
    fs.writeFileSync(p, c); 
} 

fs.readdirSync('cases').filter(f=>f.endsWith('.html')).forEach(f=>replaceInFile('cases/'+f)); 
replaceInFile('cases.html'); 
console.log('Images replaced!');
