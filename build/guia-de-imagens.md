# Guia de Imagens - Retífica Severo

Este documento lista todas as imagens (placeholders) que foram utilizadas na construção do site e que precisam ser substituídas pelas fotos reais da Retífica Severo antes da publicação oficial.

Todas as imagens devem ser otimizadas (preferencialmente no formato `.webp` ou `.jpg` comprimido) para garantir o carregamento rápido e uma boa pontuação de SEO.

## 1. Imagens Globais (Site Todo)
- **Favicon:** `/assets/img/favicon.svg` (Já gerado, ícone da aba do navegador)
- *Nota:* O Logo no header e footer foi construído com tipografia e CSS conforme as cores da marca para máxima velocidade, mas pode ser substituído por uma tag `<img>` apontando para `/assets/img/logo.png` se desejado.

## 2. Página Inicial (`index.html`)
- **Hero Image (Topo):** Recomendado `600x400px` a `800x600px`. Atualmente usando placeholder azul/amarelo. (Sugestão: Foto da fachada da retífica ou do maquinário principal em ação).
- **Seção "Sobre" na Home:** Recomendado `500x400px`. (Sugestão: Foto interna da oficina limpa e organizada).

## 3. Página Sobre (`sobre.html`)
- **Hero Image (Topo):** Recomendado `600x400px`. (Sugestão: Foto da equipe em frente à empresa ou foto histórica se houver).
- **Seção Secundária (Estrutura):** Recomendado `500x350px`. (Sugestão: Detalhe de algum equipamento de precisão).

## 4. Página de Contato (`contato.html`) e FAQ (`faq.html`)
- **Hero Contato:** Recomendado `600x400px`. (Sugestão: Foto do balcão de atendimento ou de um mecânico atendendo cliente).
- **Hero FAQ:** Recomendado `600x400px`. (Sugestão: Peças limpas prontas para entrega).

## 5. Páginas de Serviços (em `/servicos/`)
- **Retífica de Cabeçote:** Recomendado `520x320px`. (Sugestão: Cabeçote na plaina ou sendo testado).
- **Retífica do Bloco:** Recomendado `520x320px`. (Sugestão: Bloco no mandrilhamento ou brunimento).
- **Retífica de Virabrequim:** Recomendado `520x320px`. (Sugestão: Virabrequim na máquina de retífica cilíndrica).
- **Retífica de Bielas:** Recomendado `520x320px`. (Sugestão: Biela no equipamento de alinhamento).

## 6. Cases - Capas dos Artigos (em `/blog/`)
- **Cabeçote Empenado:** Recomendado `820x360px`. (Sugestão: Cabeçote com régua de medição de empeno ou com fumaça branca simulada).
- **Brunimento dos Cilindros:** Recomendado `820x360px`. (Sugestão: Detalhe interno do cilindro mostrando o padrão "crosshatch" cruzado).
- **Bate Biela:** Recomendado `820x360px`. (Sugestão: Bronzina destruída ou virabrequim danificado).

## 7. Cases - Thumbnails (Cards de listagem em `cases.html`)
- Os 3 artigos publicados usam thumbnails de `420x220px`. Para facilitar, você pode usar a mesma imagem de capa do artigo redimensionada para a listagem na página principal do blog.
- As outras 6 imagens de "Em breve" podem ser mantidas como placeholders até que os respectivos artigos sejam escritos.

### Dica de Substituição
Para substituir, basta salvar a foto real no formato correto, enviar para a pasta respectiva do seu servidor (ex: `/assets/img/`) e atualizar o caminho do atributo `src` na tag `<img>` dentro do arquivo HTML.
