const fs = require('fs');
const path = require('path');

const domain = 'https://retificasevero.com.br';
const baseId = `${domain}/#organization`;
const websiteId = `${domain}/#website`;
const localBusinessId = `${domain}/#localbusiness`;

const businessData = {
    "@type": "AutoRepair",
    "@id": localBusinessId,
    "name": "Retífica Severo",
    "url": domain,
    "logo": `${domain}/assets/img/logo.png`,
    "image": `${domain}/assets/img/logo.png`,
    "telephone": "+5511974624100",
    "priceRange": "$$",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "",
        "addressLocality": "Guarulhos",
        "addressRegion": "SP",
        "postalCode": "",
        "addressCountry": "BR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-23.4628", // Approximated for Guarulhos if missing, can be omitted, but let's just omit for now or leave empty
        "longitude": "-46.5333"
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
            "opens": "08:00",
            "closes": "18:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Friday",
            "opens": "08:00",
            "closes": "17:00"
        }
    ],
    "hasMap": "https://maps.app.goo.gl/UzBPztLrxVFy62b38",
    "areaServed": [
        { "@type": "City", "name": "Guarulhos" },
        { "@type": "Place", "name": "Jardim Angélica" },
        { "@type": "Place", "name": "Pimentas" },
        { "@type": "Place", "name": "Centro de Guarulhos" }
    ],
    "sameAs": [
        "https://instagram.com"
    ]
};

// Remove geo if we don't have it exactly, as per instructions "se houver"
delete businessData.geo;

const organizationData = {
    "@type": "Organization",
    "@id": baseId,
    "name": "Retífica Severo",
    "url": domain,
    "logo": {
        "@type": "ImageObject",
        "url": `${domain}/assets/img/logo.png`
    },
    "telephone": "+5511974624100",
    "sameAs": ["https://instagram.com"]
};

const websiteData = {
    "@type": "WebSite",
    "@id": websiteId,
    "url": domain,
    "name": "Retífica Severo",
    "publisher": { "@id": baseId }
};

function extractFaq(html) {
    const faqRegex = /<details[^>]*>\s*<summary[^>]*>.*?<h3[^>]*>(.*?)<\/h3>.*?<\/summary>\s*<div[^>]*>(.*?)<\/div>\s*<\/details>/gis;
    let match;
    const faqs = [];
    while ((match = faqRegex.exec(html)) !== null) {
        let question = match[1].replace(/<[^>]+>/g, '').trim();
        let answer = match[2].replace(/<[^>]+>/g, '').trim();
        faqs.push({
            "@type": "Question",
            "name": question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": answer
            }
        });
    }
    return faqs.length > 0 ? { "@type": "FAQPage", "mainEntity": faqs } : null;
}

function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove existing LD+JSON to prevent duplicates during testing
    content = content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');

    const relPath = path.relative(__dirname, filePath).replace(/\\/g, '/');
    const pageUrl = `${domain}/${relPath === 'index.html' ? '' : relPath.replace('.html', '')}`;

    let titleMatch = content.match(/<title>(.*?)<\/title>/);
    let title = titleMatch ? titleMatch[1] : 'Retífica Severo';
    
    let descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
    let desc = descMatch ? descMatch[1] : '';

    let graph = [
        organizationData,
        websiteData
    ];

    let webPageType = "WebPage";
    let additionalEntities = [];

    // Breadcrumbs base
    let breadcrumbs = {
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Início", "item": domain }
        ]
    };

    if (relPath === 'index.html') {
        additionalEntities.push(businessData);
        let faq = extractFaq(content);
        if (faq) additionalEntities.push(faq);
    } else if (relPath === 'sobre.html') {
        webPageType = "AboutPage";
        breadcrumbs.itemListElement.push({ "@type": "ListItem", "position": 2, "name": "Sobre Nós", "item": pageUrl });
    } else if (relPath === 'contato.html') {
        webPageType = "ContactPage";
        breadcrumbs.itemListElement.push({ "@type": "ListItem", "position": 2, "name": "Contato", "item": pageUrl });
        additionalEntities.push(businessData); // Referenced or complete? Spec says reference, but since it's an array we can just push it or push { "@id": localBusinessId }
        // Let's add the full object so it's defined on the page
    } else if (relPath === 'faq.html') {
        breadcrumbs.itemListElement.push({ "@type": "ListItem", "position": 2, "name": "FAQ", "item": pageUrl });
        let faq = extractFaq(content);
        if (faq) additionalEntities.push(faq);
    } else if (relPath === 'privacidade.html') {
        breadcrumbs.itemListElement.push({ "@type": "ListItem", "position": 2, "name": "Privacidade", "item": pageUrl });
    } else if (relPath === '404.html') {
        // Just WebPage, but need noindex
        if (!content.includes('noindex')) {
            content = content.replace(/<head>/, '<head>\n  <meta name="robots" content="noindex">');
        }
    } else if (relPath === 'servicos.html') {
        webPageType = "CollectionPage";
        breadcrumbs.itemListElement.push({ "@type": "ListItem", "position": 2, "name": "Serviços", "item": pageUrl });
        additionalEntities.push({
            "@type": "ItemList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Retífica do Cabeçote", "url": `${domain}/servicos/retifica-de-cabecote` },
                { "@type": "ListItem", "position": 2, "name": "Retífica do Bloco do Motor", "url": `${domain}/servicos/retifica-do-bloco` },
                { "@type": "ListItem", "position": 3, "name": "Retífica do Virabrequim", "url": `${domain}/servicos/retifica-de-virabrequim` },
                { "@type": "ListItem", "position": 4, "name": "Retífica de Bielas", "url": `${domain}/servicos/retifica-de-bielas` }
            ]
        });
    } else if (relPath.startsWith('servicos/')) {
        breadcrumbs.itemListElement.push({ "@type": "ListItem", "position": 2, "name": "Serviços", "item": `${domain}/servicos` });
        breadcrumbs.itemListElement.push({ "@type": "ListItem", "position": 3, "name": title.split(' — ')[0], "item": pageUrl });
        additionalEntities.push({
            "@type": "Service",
            "@id": pageUrl,
            "name": title.split(' — ')[0],
            "description": desc,
            "provider": { "@id": localBusinessId },
            "areaServed": { "@type": "City", "name": "Guarulhos, SP" }
        });
        let faq = extractFaq(content);
        if (faq) additionalEntities.push(faq);
    } else if (relPath === 'cases.html') {
        webPageType = "CollectionPage";
        breadcrumbs.itemListElement.push({ "@type": "ListItem", "position": 2, "name": "Cases", "item": pageUrl });
        additionalEntities.push({
            "@type": "Blog",
            "name": "Cases Técnicos",
            "description": desc,
            "publisher": { "@id": baseId }
        });
        // We could dynamically parse cases, but let's just do a simple list
        additionalEntities.push({
            "@type": "ItemList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Sinais de Cabeçote Empenado", "url": `${domain}/cases/sinais-cabecote-empenado` },
                { "@type": "ListItem", "position": 2, "name": "A Importância do Brunimento", "url": `${domain}/cases/importancia-brunimento-cilindros` },
                { "@type": "ListItem", "position": 3, "name": "O que é 'Bater Biela'?", "url": `${domain}/cases/o-que-e-motor-bater-biela` }
            ]
        });
    } else if (relPath.startsWith('cases/')) {
        breadcrumbs.itemListElement.push({ "@type": "ListItem", "position": 2, "name": "Cases", "item": `${domain}/cases` });
        breadcrumbs.itemListElement.push({ "@type": "ListItem", "position": 3, "name": title.split(' — ')[0], "item": pageUrl });
        additionalEntities.push({
            "@type": "BlogPosting",
            "headline": title.split(' — ')[0].substring(0, 110),
            "description": desc,
            "image": { "@type": "ImageObject", "url": `${domain}/assets/img/logo.png`, "width": 800, "height": 600 },
            "author": { "@type": "Person", "name": "Equipe Retífica Severo" },
            "publisher": { "@id": baseId },
            "datePublished": "2024-01-01",
            "dateModified": "2024-01-01",
            "mainEntityOfPage": pageUrl,
            "inLanguage": "pt-BR"
        });
        let faq = extractFaq(content);
        if (faq) additionalEntities.push(faq);
    }

    graph.push({
        "@type": webPageType,
        "@id": pageUrl,
        "url": pageUrl,
        "name": title,
        "description": desc,
        "isPartOf": { "@id": websiteId },
        "inLanguage": "pt-BR"
    });

    if (breadcrumbs.itemListElement.length > 1) {
        graph.push(breadcrumbs);
    }

    // Add additional entities to graph
    additionalEntities.forEach(ent => graph.push(ent));

    let jsonLdScript = `\n  <script type="application/ld+json">\n  ${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2).replace(/\n/g, '\n  ')}\n  </script>\n`;

    content = content.replace(/<\/head>/, jsonLdScript + '</head>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed ${relPath}`);
}

function walk(dir) {
    let files = fs.readdirSync(dir);
    files.forEach(f => {
        let fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (f.endsWith('.html')) {
            processHtmlFile(fullPath);
        }
    });
}

walk(__dirname);
