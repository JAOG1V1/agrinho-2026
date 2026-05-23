# 📝 Changelog — Agro Forte | Agrinho 2026

Histórico de evolução do projeto desde sua concepção. Segue o formato [Keep a Changelog](https://keepachangelog.com/pt-BR/).

---

## [1.3.0] — 2026-05-20 — Auditoria Lighthouse 100/100/100 🏆

### 🎯 Objetivo

Lapidação técnica final guiada por auditoria rigorosa com Google Lighthouse, atingindo **396/400** com **3 categorias perfeitas** (Accessibility, Best Practices e SEO).

### 🚀 Melhorado

- ♿ **Acessibilidade 91 → 100** — 5 correções cirúrgicas:
  - **Hierarquia de headings** corrigida em todas as 9 páginas HTML
    - Footer: `<h4>Navegação</h4>` e `<h4>Concurso</h4>` → `<h3>` (8 páginas afetadas)
    - `contato.html`: `<h3>Informações</h3>` e `<h3>Envie sua mensagem</h3>` → `<h2>`
    - `glossario.html` e `jogo.html`: adicionado `<h2 class="apenas-leitor-tela">` invisível para estabelecer hierarquia
  - **ARIA roles inválidos** corrigidos em 3 lugares:
    - `<div class="carrossel-pontos" role="tablist">` → `role="group"` (carousel de histórias)
    - `<div class="filtro-alfabeto" role="tablist">` → `role="group"` (filtro do glossário)
    - `<div class="fazenda-grade" role="grid">` → `role="group"` (grade do simulador)
  - **Contraste do hero** corrigido: criada variável `--dourado-texto` (#8b6914 claro / #f0d878 escuro) substituindo `--dourado` puro em `.destaque-texto`, com `font-weight: 700`
  - **Contraste do rodapé** corrigido cirurgicamente:
    - `.rodape-coluna p, li, a`: `rgba(255,255,255,0.8)` → `#e5ebe6` (contraste 9.0:1)
    - `.rodape-creditos` + `.rodape-creditos p` + `.rodape-creditos strong`: `rgba(255,255,255,0.7)` → `#d4dcd5` (contraste 7.5:1)
    - **Bug raiz identificado:** regra global `p { color: var(--texto-suave) }` sobrescrevia o `<p>` interno via cor explícita; solução com seletores aninhados
  - **`--texto-suave`** escurecido de `#5a6e5b` → `#4a5d4b` (contraste +30% no hero)

- 🔍 **SEO 91 → 100** — `robots.txt` corrigido:
  - Removida `Sitemap: ./sitemap.xml` (URL relativa inválida segundo spec do robots.txt)
  - Substituído por comentário com instrução para adicionar URL absoluta após publicação no GitHub Pages

- ⚡ **Performance** — Cache-buster `?v=2` adicionado em todos os 9 HTMLs (`<link rel="stylesheet" href="css/style.css?v=2">`) para garantir carregamento da versão mais recente do CSS após atualizações

### ✨ Adicionado

- 🎨 **Classe utilitária `.apenas-leitor-tela`** no CSS — padrão WCAG para elementos visualmente ocultos mas acessíveis a leitores de tela (`position: absolute; clip: rect(0,0,0,0)`)
- 🎨 **Variável CSS `--dourado-texto`** — versão acessível do dourado com override para tema escuro
- 🔍 **`<meta name="keywords">`** adicionada em 8 páginas HTML (faltava em todas exceto index)
  - Cada página com keywords contextuais ao seu próprio conteúdo (não-genéricas)
- 📜 **Arquivo `LICENSE`** (MIT) — licença explícita para o repositório
- 📑 Nova seção **"🔦 Auditoria Lighthouse"** no README com resultados, métricas Core Web Vitals e comparação com sites comerciais
- 🏷️ **Badges Lighthouse** no topo do README (Performance / Accessibility / Best Practices / SEO)

### 🔧 Técnico

- CSS: 845 → **846 chaves** balanceadas (+1 regra `.rodape-creditos p, strong`)
- HTML: 9/9 arquivos com cache-buster aplicado
- Hierarquia de headings validada: todas as 9 páginas com sequência válida (`h1 → h2 → h3 → h4 → h5`)
- Zero `rgba(255,255,255,0.x)` no rodapé (substituídos por cores sólidas)
- Conformidade com regulamento mantida em 100% (0 inline CSS, 0 inline JS, 0 frameworks)

### 🔒 Verificação técnica (Lighthouse Desktop, modo anônimo)

| Categoria | Antes | Depois | Status |
| :--- | :---: | :---: | :---: |
| Performance | 84 | **96** | 🟢 |
| Accessibility | 90 | **100** | 🏆 |
| Best Practices | 100 | **100** | 🏆 |
| SEO | 91 | **100** | 🏆 |
| **TOTAL** | 365 | **396** | **+31 pts** |

### 📊 Core Web Vitals (Desktop)

| Métrica | Valor | Meta Google | Status |
| :--- | :---: | :--- | :---: |
| FCP (First Contentful Paint) | 0.6 s | < 1.8 s | 🟢 |
| LCP (Largest Contentful Paint) | 1.3 s | < 2.5 s | 🟢 |
| TBT (Total Blocking Time) | 0 ms | < 200 ms | 🟢 |
| CLS (Cumulative Layout Shift) | 0.003 | < 0.1 | 🟢 |
| Speed Index | 1.2 s | < 3.4 s | 🟢 |

---

## [1.2.0] — 2026-05-16 — Polimentos Finais (UX, Onboarding e Documentação)

### ✨ Adicionado

- 🎓 **Tour Guiado** — Sistema de onboarding de 5 passos exibido na primeira visita ao `index.html`, persistido em `localStorage` (chave `agrinho-tour-completo`)
  - Passos temáticos: Bem-vindo · Funcionalidades · Conquistas · Personalização · Atalhos
  - Indicadores visuais de progresso (bolinhas animadas)
  - Botões "Pular tour" e "Próximo" / "Começar a explorar"
  - Tecla `ESC` fecha o tour
  - Acessibilidade completa (`role="dialog"`, `aria-modal="true"`, `aria-label`)
- 📊 **Indicador de Progresso de Leitura** — Barra fina (4px) no topo de todas as 9 páginas, atualizada em tempo real via `scroll` passivo
  - Gradiente verde-medio → dourado com sombra dourada
  - `role="progressbar"` + `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
  - Inserção dinâmica via JavaScript (sem alterar HTML)
  - Versão mobile (3px) para telas pequenas
- 🎨 **View Transitions API** — Transições suaves entre as 9 páginas com animações nativas
  - Meta tag `<meta name="view-transition" content="same-origin">` em todas as páginas
  - Animação `saidaPagina` (fade-out + slide-up, 0.25s)
  - Animação `entradaPagina` (fade-in + slide-up, 0.3s)
  - Respeita `prefers-reduced-motion`
  - Degradação graciosa em navegadores antigos
- 📝 **Comentários Enriquecidos** — Documentação inline em código:
  - **JavaScript** (5 módulos): Simulador, Jogo, Comparador, Conquistas, Síntese de Voz
  - **CSS** (3 seções): Variáveis CSS, Tema Escuro, Cabeçalho/Navegação
- 📑 Novas seções no README documentando as 3 funcionalidades acima

### 🚀 Melhorado

- **UX de navegação entre páginas** com transições nativas modernas
- **Onboarding** de novos visitantes via tour interativo
- **Engajamento visual** com feedback de scroll em tempo real
- **Manutenibilidade do código** com comentários explicativos em módulos complexos
- **Acessibilidade do tour guiado** (role, aria-modal, suporte a ESC)
- **Critério de desempate II do regulamento** (documentação clara no código)

### 🔧 Técnico

- CSS: +281 linhas (total: **5.371 linhas**)
- JavaScript: +273 linhas (total: **3.885 linhas**)
- Adicionada meta tag `view-transition` em todas as 9 páginas HTML
- Adicionados módulos `inicializarBarraProgresso()` e `inicializarTourGuiado()` em `script.js`
- Conformidade com regulamento mantida em 100%
- 0 inline CSS / 0 inline JS preservados
- CSS balanceado (811 chaves de abertura = 811 de fechamento)

### 🔒 Verificação técnica

| Critério | Status |
| :--- | :---: |
| 0 inline CSS nas HTMLs | ✅ |
| 0 inline JS nas HTMLs | ✅ |
| 9/9 páginas com `view-transition` | ✅ |
| Sintaxe JS válida (script.js + sw.js) | ✅ |
| CSS balanceado | ✅ |
| Tour guiado funcional | ✅ |
| Indicador de progresso em todas páginas | ✅ |
| Comentários enriquecidos | ✅ |

---

## [1.1.0] — 2026 — Otimizações Técnicas e Acessibilidade

### ✨ Adicionado

- Atributo `defer` em todos os scripts das 9 páginas HTML (performance)
- Meta tag `<meta name="robots" content="index, follow">` em todas as páginas principais (SEO)
- Bloco `<noscript>` com mensagem amigável em todas as 9 páginas (acessibilidade)
- Classe CSS `.aviso-sem-js` para estilização do fallback noscript (banner dourado fixo no topo)
- Arquivo `.editorconfig` na raiz do projeto (padronização de código)
- Atributos `role="status"` e `aria-live="polite"` na tela de carregamento (acessibilidade)
- Nova seção "Otimizações Técnicas" no README detalhando melhorias de qualidade
- Tabela "Verificação técnica final" no README com 13 checks de qualidade

### 🛠️ Corrigido

- **Hierarquia de headings:** removido `<h1>Agro Forte</h1>` duplicado da tela de carregamento em 8 páginas (HTML semântico)
- Cada página agora tem exatamente **1 único `<h1>`**, conforme padrão HTML5/WAI

### 🚀 Melhorado

- **Performance de carregamento:** scripts com `defer` não bloqueiam o parser HTML (download em paralelo)
- **Indexação por motores de busca:** meta robots explícito reforça intenção de indexação
- **Experiência de usuários com JS desabilitado:** mensagem clara orienta sobre funcionalidades
- **Consistência de estilo de código:** `.editorconfig` padroniza indentação entre VS Code, Sublime, Atom, etc.
- **Acessibilidade da tela de carregamento:** leitores de tela agora anunciam o estado de carregamento

### 🔒 Conformidade verificada

| Critério | Status |
| :--- | :---: |
| 0 inline CSS nas HTMLs | ✅ |
| 0 inline JS nas HTMLs | ✅ |
| 9/9 páginas com `script defer` | ✅ |
| 9/9 páginas com `meta robots` | ✅ |
| 9/9 páginas com `<noscript>` | ✅ |
| 9/9 páginas com 1 único H1 | ✅ |
| Sintaxe JS válida (script.js + sw.js) | ✅ |

---

## [1.0.0] - 2026 — Versão Final para Submissão

### ✨ Adicionado

#### Páginas (8 no total)
- **`index.html`** — Página inicial com hero animado, estatísticas, comparador antes/depois, carrossel de histórias, painel de estatísticas pessoais e conquistas
- **`sobre.html`** — Linha do tempo do agro sustentável, mapa interativo do Brasil, calculadora de impacto
- **`praticas.html`** — 12 práticas sustentáveis com filtros por categoria
- **`simulador.html`** — Simulador de fazenda com 12 lotes e 12 práticas
- **`quiz.html`** — Quiz interativo com 15 perguntas e síntese de voz
- **`jogo.html`** — Mini-jogo "Defensor do Agro" com 3 dificuldades
- **`glossario.html`** — 24 termos técnicos com busca e filtro alfabético
- **`contato.html`** — Formulário funcional via mailto + FAQ
- **`404.html`** — Página de erro personalizada

#### Funcionalidades JavaScript (26 módulos)
- Sistema de tema escuro/claro com persistência
- Menu mobile responsivo (hamburger)
- Animações ao rolar (Intersection Observer)
- Contadores animados nas estatísticas
- Botão "Voltar ao topo"
- Sistema completo de acessibilidade (3 tamanhos de fonte + alto contraste)
- Busca interna em tempo real
- Quiz interativo com feedback e confete
- Validação de formulário em JavaScript
- Calculadora de impacto sustentável
- Filtros de práticas por categoria
- Mapa interativo do Brasil (5 regiões clicáveis)
- Simulador de fazenda sustentável
- Glossário com busca e filtro
- Sistema de 10 conquistas com notificações
- Carrossel de histórias do campo
- Comparador antes/depois (slider)
- Mini-jogo com combos, power-ups, ranking, sons via Web Audio API
- Atalhos de teclado
- Easter egg (Código Konami)
- Síntese de voz no quiz (Web Speech API)
- Painel de estatísticas pessoais
- Botões de compartilhar (Web Share API)
- Service Worker (funciona offline)
- PWA (instalável como app no celular)

#### Recursos visuais
- 4.700+ linhas de CSS organizado
- Ilustrações SVG autorais (hero, mapa do Brasil, cenário do jogo, comparador)
- Tema claro e escuro com transições suaves
- Animações personalizadas
- Design responsivo para mobile, tablet e desktop
- Loading screen profissional
- Open Graph para compartilhamento em redes sociais

#### Acessibilidade
- Skip link em todas as páginas
- 125+ atributos `aria-label`
- Navegação completa por teclado
- Suporte a `prefers-reduced-motion`
- Modo alto contraste (preto/amarelo/verde)
- Síntese de voz no quiz
- Foco visível em elementos interativos

#### SEO e Discoverability
- `sitemap.xml` com todas as páginas
- `robots.txt` permitindo indexação
- Meta tags Open Graph + Twitter Card em todas as páginas
- `og-image.svg` para preview em redes sociais
- Manifest.json para PWA

### 🐛 Corrigido
- Todas as ocorrências de inline CSS (`style="..."`) removidas
- Onclick handler convertido para `addEventListener`
- Bug no comparador antes/depois (clip-path estava invertido)
- Slider do comparador agora arrasta suavemente (mouse + touch)
- Alinhamento dos checkboxes da calculadora corrigido
- Alinhamento do checkbox de aceite no formulário corrigido
- Mensagens contraditórias do fim de jogo corrigidas
- Formulário de contato agora funciona via mailto

### 🔒 Conformidade com Regulamento
- ✅ 0 inline CSS em qualquer HTML
- ✅ 0 inline JavaScript em qualquer HTML
- ✅ 0 frameworks (HTML/CSS/JS puro)
- ✅ Estilos e scripts declarados via `<link>` e `<script src>`
- ✅ Recursos organizados em pastas (`/css/`, `/js/`)
- ✅ Código identado com comentários
- ✅ README completo com objetivo, tecnologias e instruções

---

## Versão estrutural

### Estatísticas do projeto

| Métrica | Valor |
|---|---|
| Páginas HTML | 9 (incluindo 404) |
| Linhas de CSS | ~5.000 |
| Linhas de JavaScript | ~3.500 |
| Módulos JavaScript | 27 |
| Funções JavaScript | 90+ |
| Termos no glossário | 24 |
| Perguntas no quiz | 15 |
| Práticas no simulador | 12 |
| Histórias no carrossel | 5 |
| Conquistas | 10 |
| Tipos de objeto no jogo | 13 (+ 3 power-ups) |
| Atributos aria-label | 125+ |

### Tecnologias utilizadas

- HTML5 (semântico)
- CSS3 (variáveis, Grid, Flexbox, Animações)
- JavaScript ES6+ (sem frameworks)
- SVG (ilustrações autorais)
- Web APIs nativas:
  - localStorage
  - Web Audio API
  - Speech Synthesis API
  - Web Share API
  - Intersection Observer
  - Clipboard API
  - Service Workers (PWA)

---

**Projeto desenvolvido por João Gabriel Sabedra Vieira — 1º C ADM — Colégio Cívico-Militar Douradina — Concurso Agrinho 2026**

🌱 _Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente._
