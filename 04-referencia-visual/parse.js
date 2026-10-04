const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'extracted', 'templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'global.json' && f !== 'form.json');

function extractWidgets(element) {
    let widgets = [];
    if (element.widgetType) {
        widgets.push(element.widgetType);
    }
    if (element.elements && Array.isArray(element.elements)) {
        for (let child of element.elements) {
            widgets.push(...extractWidgets(child));
        }
    }
    return widgets;
}

const report = [];

for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    const title = data.title || file;
    report.push(`### Página: ${title}`);
    
    if (data.content && Array.isArray(data.content)) {
        data.content.forEach((section, idx) => {
            const widgets = extractWidgets(section);
            const uniqueWidgets = [...new Set(widgets)];
            let type = "Seção Padrão";
            if (idx === 0) type = "Hero / Top Section";
            if (uniqueWidgets.includes('google_maps')) type = "Mapa";
            
            report.push(`#### ${idx + 1}. ${type}`);
            if (uniqueWidgets.length > 0) {
                report.push(`- **Estrutura/Elementos:** ${uniqueWidgets.join(', ')}`);
            } else {
                report.push(`- **Estrutura/Elementos:** Containers Vazios ou sem widgets específicos`);
            }
        });
    }
    report.push('');
}

console.log(report.join('\n'));
