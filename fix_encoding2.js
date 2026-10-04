const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');

const replacements = [
    [/Necessério/g, "Necessário"],
    [/necessério/g, "necessário"],
    [/Néo/g, "Não"],
    [/NÉO/g, "NÃO"],
    [/néo/g, "não"],
    [/ répido/g, " rápido"],
    [/répida/g, "rápida"],
    [/retéfica/g, "retífica"],
    [/Retéfica/g, "Retífica"],
    [/também/g, "também"],
    [/também/g, "também"],
    [/atuaééo/g, "atuação"],
    [/diferenéa/g, "diferença"],
    [/desperdiéar/g, "desperdiçar"],
    [/serviéo/g, "serviço"],
    [/viével/g, "viável"],
    [/étil/g, "útil"],
    [/fébrica/g, "fábrica"],
    [/inserééo/g, "inserção"],
    [/ aéo/g, " aço"],
    [/Atenééo/g, "Atenção"],
    [/avaliaééo/g, "avaliação"],
    [/Avaliaééo/g, "Avaliação"],
    [/mediééo/g, "medição"],
    [/micrémetro/g, "micrômetro"],
    [/méximo/g, "máximo"],
    [/oxidaééo/g, "oxidação"],
    [/égua/g, "água"],
    [/obrigatério/g, "obrigatório"],
    [/pistéo/g, "pistão"],
    [/pistées/g, "pistões"],
    [/catastréfica/g, "catastrófica"],
    [/lubrificaééo/g, "lubrificação"],
    [/caléo/g, "calço"],
    [/hidréulico/g, "hidráulico"],
    [/sélida/g, "sólida"],
    [/substituiééo/g, "substituição"],
    [/situaéées/g, "situações"],
    [/proprietério/g, "proprietário"],
    [/série/g, "série"],
    [/ovalizaééo/g, "ovalização"],
    [/ trés/g, " três"],
    [/interferéncia/g, "interferência"],
    [/Seleééo/g, "Seleção"],
    [/preparaééo/g, "preparação"],
    [/toleréncias/g, "tolerâncias"],
    [/anéis/g, "anéis"],
    [/éleo/g, "óleo"],
    [/retenééo/g, "retenção"],
    [/oréamento/g, "orçamento"],
    [/horério/g, "horário"],
    [/bésicos/g, "básicos"],
    [/INéCIO/g, "INÍCIO"],
    [/Inécio/g, "Início"],
    [/veéculo/g, "veículo"],
    [/técnica/g, "técnica"],
    [/ érea/g, " área"],
    [/énica/g, "única"],
    [/além/g, "além"],
    [/soluééo/g, "solução"],
    [/peréodos/g, "períodos"],
    [/diémetro/g, "diâmetro"],
    [/padréo/g, "padrão"],
    [/padrǜo/g, "padrão"],
    [/pés-encamisamento/g, "pós-encamisamento"],
    [/Pés-venda/g, "Pós-venda"],
    [/pés-venda/g, "pós-venda"],
    [/préximos/g, "próximos"],
    [/Regiéo/g, "Região"],
    [/Horério/g, "Horário"],
    [/automotivos é Guarulhos/g, "automotivos - Guarulhos"],
    [/éé Guarulhos\/SP/g, "📍 Guarulhos/SP"],
    [/éé contato@/g, "✉️ contato@"],
    [/éé \(11\)/g, "📞 (11)"],
    [/cilindro é medida/g, "cilindro à medida"],
    [/Retorno é medida/g, "Retorno à medida"],
    [/retorno é medida/g, "retorno à medida"],
    [/08h és 18h/g, "08h às 18h"],
    [/08h és 17h/g, "08h às 17h"],
    [/completa é mas/g, "completa - mas"],
    [/éé Neste Artigo/g, "📖 Neste Artigo"],
    [/através/g, "através"],
    [/vocé/g, "você"],
    [/manutenééo/g, "manutenção"],
    [/condiééo/g, "condição"],
    [/apés/g, "após"],
    [/peéas/g, "peças"],
    [/peéa/g, "peça"],
    [/preéo/g, "preço"],
    [/direééo/g, "direção"],
    [/fésico/g, "físico"],
    [/metélicas/g, "metálicas"],
    [/térmica/g, "térmica"],
    [/mecénica/g, "mecânica"],
    [/mecénico/g, "mecânico"],
    [/elétrica/g, "elétrica"],
    [/aluménio/g, "alumínio"],
    [/ménima/g, "mínima"],
    [/fécil/g, "fácil"],
    [/difécil/g, "difícil"],
    [/INéCIO/g, "INÍCIO"],
    [/Inéco/g, "Início"],
    // Leftover spaces and special cases
    [/INéCIO/g, "INÍCIO"],
    [/INCIO/g, "INÍCIO"]
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
            for (const [regex, replacement] of replacements) {
                html = html.replace(regex, replacement);
            }
            if (html !== orig) {
                fs.writeFileSync(filePath, html, 'utf8');
                console.log(`Fixed ${file}`);
            }
        }
    }
}
processDir(buildDir);
