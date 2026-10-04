const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname);

// 1. Rename files and folders
const oldBlogHtml = path.join(buildDir, 'blog.html');
const newCasesHtml = path.join(buildDir, 'cases.html');
if (fs.existsSync(oldBlogHtml)) {
    fs.renameSync(oldBlogHtml, newCasesHtml);
    console.log('Renamed blog.html to cases.html');
}

const oldBlogDir = path.join(buildDir, 'blog');
const newCasesDir = path.join(buildDir, 'cases');
if (fs.existsSync(oldBlogDir)) {
    fs.renameSync(oldBlogDir, newCasesDir);
    console.log('Renamed blog/ folder to cases/');
}

// 2. String replacements across all relevant files
function walkDir(dir) {
    let files = fs.readdirSync(dir);
    files.forEach(f => {
        let fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (f.endsWith('.html') || f.endsWith('.xml') || f.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // Replace exact links
            content = content.replace(/href="\/blog"/g, 'href="/cases"');
            content = content.replace(/href="\/blog\//g, 'href="/cases/');
            content = content.replace(/https:\/\/retificasevero.com.br\/blog/g, 'https://retificasevero.com.br/cases');
            
            // Replace Nav text
            content = content.replace(/>BLOG</g, '>CASES<');
            
            // Replace titles and H1s
            content = content.replace(/Blog Retífica Severo/g, 'Cases Retífica Severo');
            content = content.replace(/Blog da Retífica Severo/g, 'Cases da Retífica Severo');
            content = content.replace(/Nosso Blog/g, 'Nossos Cases');
            content = content.replace(/Artigos do Blog/g, 'Nossos Cases');
            content = content.replace(/Blog \—/g, 'Cases —');
            content = content.replace(/Blog -/g, 'Cases -');
            content = content.replace(/no blog/g, 'nos cases');
            
            // For guia-de-imagens.md
            content = content.replace(/Blog - Capas/g, 'Cases - Capas');
            content = content.replace(/Blog - Thumbnails/g, 'Cases - Thumbnails');
            content = content.replace(/blog\.html/g, 'cases.html');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated strings in: ' + fullPath);
            }
        }
    });
}

walkDir(buildDir);
console.log('All done!');
