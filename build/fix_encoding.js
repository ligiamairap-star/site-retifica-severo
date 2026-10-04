const fs = require('fs');
const path = require('path');

function fixFile(p) {
    if (!fs.existsSync(p)) return;
    let c = fs.readFileSync(p, 'utf8');
    
    // Fix navigation bullets
    c = c.replace(/<span style="opacity:0\.5">é<\/span>/g, '<span style="opacity:0.5">•</span>');
    // Fix breadcrumbs
    c = c.replace(/<\/a> é <a/g, '</a> • <a');
    // Fix general weird ' é ' instances
    c = c.replace(/ é Guarulhos/g, ' — Guarulhos');
    c = c.replace(/ é (\d+ min de leitura)/g, ' • $1');
    c = c.replace(/Equipe Técnica é Retífica Severo/g, 'Equipe Técnica — Retífica Severo');
    c = c.replace(/abertura é desgaste/g, 'abertura — desgaste');
    c = c.replace(/abertura é disponível/g, 'abertura — disponível');
    c = c.replace(/abertura é limite/g, 'abertura — limite');
    c = c.replace(/complementares e sequenciais é nunca/g, 'complementares e sequenciais — nunca');
    c = c.replace(/Medição inicial do cilindro é micrômetro/g, 'Medição inicial do cilindro — micrômetro');
    c = c.replace(/Definição da sobremedida é com base/g, 'Definição da sobremedida — com base');
    c = c.replace(/Mandrilagem de desbaste é abertura/g, 'Mandrilagem de desbaste — abertura');
    c = c.replace(/Brunimento de acabamento é pedras/g, 'Brunimento de acabamento — pedras');
    c = c.replace(/Medição final e verificação é cada/g, 'Medição final e verificação — cada');
    c = c.replace(/Lavagem completa do bloco é remoção/g, 'Lavagem completa do bloco — remoção');
    c = c.replace(/estrutural é inserção/g, 'estrutural — inserção');
    c = c.replace(/Bloco é Quando/g, 'Bloco — Quando');
    c = c.replace(/1,00 mm é limite/g, '1,00 mm — limite');
    c = c.replace(/0,75 mm é disponível/g, '0,75 mm — disponível');
    c = c.replace(/0,50 mm é desgaste/g, '0,50 mm — desgaste');
    c = c.replace(/0,25 mm é desgaste/g, '0,25 mm — desgaste');
    c = c.replace(/Abertura de Cilindro: Mandrilagem e Sobremedidas é Retífica Severo/g, 'Abertura de Cilindro: Mandrilagem e Sobremedidas — Retífica Severo');
    c = c.replace(/Cabeçote Retificado: O Que É e Como Funciona é Cases/g, 'Cabeçote Retificado: O Que É e Como Funciona — Cases');
    
    fs.writeFileSync(p, c, 'utf8');
}

fs.readdirSync('.').filter(f => f.endsWith('.html')).forEach(f => fixFile(f));
if (fs.existsSync('cases')) {
    fs.readdirSync('cases').filter(f => f.endsWith('.html')).forEach(f => fixFile('cases/' + f));
}
console.log('Done fixing HTML files.');
