import os
import re

build_dir = r"C:\Users\ligia\OneDrive\Documentos\sites\site-retifica-severo\build"
cases_dir = os.path.join(build_dir, "cases")
cases_html_path = os.path.join(build_dir, "cases.html")

with open(cases_html_path, "r", encoding="utf-8") as f:
    cases_content = f.read()

# Extract header from cases.html
header_match = re.search(r'(<header class="site-header" role="banner">.*?</header>)', cases_content, re.DOTALL)
if not header_match:
    print("Could not find header in cases.html")
    exit(1)
new_header = header_match.group(1)

# Extract footer from cases.html
footer_match = re.search(r'(<footer>.*?</footer>)', cases_content, re.DOTALL)
if not footer_match:
    print("Could not find footer in cases.html")
    exit(1)
new_footer = footer_match.group(1)

# Adapt links for /cases/ subfolder
new_header = new_header.replace('href="/#', 'href="../index.html#')
new_header = new_header.replace('href="/"', 'href="../index.html"')
new_footer = new_footer.replace('href="/#', 'href="../index.html#')
new_footer = new_footer.replace('href="/"', 'href="../index.html"')

for filename in os.listdir(cases_dir):
    if not filename.endswith(".html"):
        continue
    filepath = os.path.join(cases_dir, filename)
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace header
    content = re.sub(r'<header class="site-header" role="banner">.*?</header>', new_header, content, flags=re.DOTALL)
    
    # Replace footer
    content = re.sub(r'<footer>.*?</footer>', new_footer, content, flags=re.DOTALL)
    
    # Fix assets paths in head
    content = content.replace('href="/assets/', 'href="../assets/')
    content = content.replace('src="/assets/', 'src="../assets/')
    
    # Fix breadcrumbs
    # E.g. <nav class="breadcrumb"><a href="/">Início</a> › <a href="/cases">Blog</a>
    content = content.replace('href="/cases"', 'href="../cases.html"')
    # If the breadcrumb home link wasn't caught by the general replace:
    content = content.replace('<nav class="breadcrumb"><a href="/">', '<nav class="breadcrumb"><a href="../index.html">')
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Updated {filename}")
