const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');

const replacements = [
    [/Necessrio/g, "Necessário"],
    [/necessrio/g, "necessário"],
    [/No/g, "Não"],
    [/NO/g, "NÃO"],
    [/no/g, "não"],
    [/ rpido/g, " rápido"],
    [/rpida/g, "rápida"],
    [/retfica/g, "retífica"],
    [/Retfica/g, "Retífica"],
    [/tambm/g, "também"],
    [/atuao/g, "atuação"],
    [/diferena/g, "diferença"],
    [/desperdiar/g, "desperdiçar"],
    [/servio/g, "serviço"],
    [/vivel/g, "viável"],
    [/til/g, "útil"],
    [/fbrica/g, "fábrica"],
    [/insero/g, "inserção"],
    [/ ao/g, " aço"],
    [/Ateno/g, "Atenção"],
    [/avaliao/g, "avaliação"],
    [/Avaliao/g, "Avaliação"],
    [/medio/g, "medição"],
    [/micrmetro/g, "micrômetro"],
    [/mximo/g, "máximo"],
    [/oxidao/g, "oxidação"],
    [/gua/g, "água"],
    [/obrigatrio/g, "obrigatório"],
    [/pisto/g, "pistão"],
    [/pistes/g, "pistões"],
    [/catastrfica/g, "catastrófica"],
    [/lubrificao/g, "lubrificação"],
    [/calo/g, "calço"],
    [/hidrulico/g, "hidráulico"],
    [/slida/g, "sólida"],
    [/substituio/g, "substituição"],
    [/situaes/g, "situações"],
    [/proprietrio/g, "proprietário"],
    [/srie/g, "série"],
    [/ovalizao/g, "ovalização"],
    [/ trs/g, " três"],
    [/interferncia/g, "interferência"],
    [/Seleo/g, "Seleção"],
    [/preparao/g, "preparação"],
    [/tolerncias/g, "tolerâncias"],
    [/anis/g, "anéis"],
    [/leo/g, "óleo"],
    [/reteno/g, "retenção"],
    [/oramento/g, "orçamento"],
    [/horrio/g, "horário"],
    [/bsicos/g, "básicos"],
    [/INCIO/g, "INÍCIO"],
    [/Incio/g, "Início"],
    [/veculo/g, "veículo"],
    [/tcnica/g, "técnica"],
    [/ rea/g, " área"],
    [/nica/g, "única"],
    [/alm/g, "além"],
    [/soluo/g, "solução"],
    [/perodos/g, "períodos"],
    [/dimetro/g, "diâmetro"],
    [/padro/g, "padrão"],
    [/ps-encamisamento/g, "pós-encamisamento"],
    [/Ps-venda/g, "Pós-venda"],
    [/ps-venda/g, "pós-venda"],
    [/prximos/g, "próximos"],
    [/Regio/g, "Região"],
    [/Horrio/g, "Horário"],
    [/automotivos  Guarulhos/g, "automotivos - Guarulhos"],
    [/\?\? Guarulhos\/SP/g, "📍 Guarulhos/SP"],
    [/\?\? contato@/g, "✉️ contato@"],
    [/\?\? \(11\)/g, "📞 (11)"],
    [/cilindro  medida/g, "cilindro à medida"],
    [/Retorno  medida/g, "Retorno à medida"],
    [/retorno  medida/g, "retorno à medida"],
    [/08h s 18h/g, "08h às 18h"],
    [/08h s 17h/g, "08h às 17h"],
    [/completa  mas/g, "completa - mas"],
    [/\?\? Neste Artigo/g, "📖 Neste Artigo"],
    [/atravs/g, "através"],
    [/voc/g, "você"],
    [/manuteno/g, "manutenção"],
    [/condio/g, "condição"],
    [/aps/g, "após"],
    [/peas/g, "peças"],
    [/pea/g, "peça"],
    [/preo/g, "preço"],
    [/direo/g, "direção"],
    [/fsico/g, "físico"],
    [/metlicas/g, "metálicas"],
    [/trmica/g, "térmica"],
    [/mecnica/g, "mecânica"],
    [/mecnico/g, "mecânico"],
    [/eltrica/g, "elétrica"],
    [/alumnio/g, "alumínio"],
    [/mnima/g, "mínima"],
    [/fcil/g, "fácil"],
    [/difcil/g, "difícil"],
    [/padrǜo/g, "padrão"],
    [/ INICIO /g, " INÍCIO "],
    [/Incio/g, "Início"],
    [/Inco/g, "Início"],
    [/  /g, " é "],
    [/\uFFFD/g, "é"] 
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
