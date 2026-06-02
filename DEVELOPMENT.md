# 🔧 Guia de Desenvolvimento — Agro Forte | Agrinho 2026

Este documento descreve a arquitetura interna, o ambiente de desenvolvimento e as práticas técnicas do **Agro Forte**. Serve como referência para entender, executar e manter o projeto.

> 📌 Para regras de contribuição e padrões de commit, veja **[CONTRIBUTING.md](./CONTRIBUTING.md)**. Para a visão geral e funcionalidades, veja **[README.md](./README.md)**.

---

## 🛠️ Ambiente de Desenvolvimento

### Pré-requisitos

- Um **navegador moderno** (Chrome, Firefox, Edge ou Safari atualizados)
- Um **editor de código** (Visual Studio Code recomendado)
- Conhecimento básico de **HTML, CSS e JavaScript**

> ⚠️ **Nenhuma instalação de dependências é necessária.** O projeto é HTML, CSS e JavaScript puros — não há `npm install`, build ou ferramentas externas. Isso é uma exigência do regulamento (sem frameworks/bibliotecas).

### Como executar localmente

Como o projeto usa **Service Worker (PWA)**, o ideal é rodá-lo em um servidor local (`localhost`) ou via HTTPS, porque o Service Worker **não funciona** ao abrir o arquivo diretamente pelo `file://`.

**Opção 1 — Live Server (recomendado, no VS Code):**

1. Instale a extensão **Live Server** no VS Code
2. Clique com o botão direito em `index.html`
3. Selecione **"Open with Live Server"**

**Opção 2 — Servidor simples com Python:**

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

**Opção 3 — Abrir direto o `index.html`:**

Funciona para ver o visual, mas o **modo offline (Service Worker) não será ativado**. Útil apenas para testes rápidos de layout.

---

## 🗺️ Arquitetura do Projeto

### Estrutura de pastas

```text
Agrinho 2026/
├── index.html          # Página inicial (hero, estatísticas, conquistas)
├── sobre.html          # Tema, linha do tempo, mapa do Brasil, calculadora
├── praticas.html       # 12 práticas sustentáveis com filtro
├── simulador.html      # Simulador de fazenda sustentável
├── quiz.html           # Quiz de 15 perguntas com síntese de voz
├── jogo.html           # Mini-jogo "Defensor do Agro"
├── glossario.html      # 24 termos técnicos com busca
├── contato.html        # Formulário via mailto + FAQ
├── 404.html            # Página de erro personalizada
│
├── css/
│   └── style.css       # ~6.000 linhas, organizado por seções comentadas
│
├── js/
│   └── script.js       # ~4.000 linhas, 27 módulos funcionais
│
├── fonts/              # 8 fontes self-hosted (.woff2) — Playfair + Poppins
│
├── sw.js               # Service Worker (cache offline)
├── manifest.json       # Configuração PWA (instalável)
├── sitemap.xml         # SEO
├── robots.txt          # SEO
├── og-image.svg        # Preview para redes sociais
├── favicon.svg         # Ícone do site
│
├── README.md           # Documentação principal
├── CHANGELOG.md        # Histórico de versões
├── CONTRIBUTING.md     # Guia de contribuição
└── DEVELOPMENT.md      # Este arquivo
```

### Organização do JavaScript (`js/script.js`)

O código é dividido em **27 módulos funcionais numerados**, cada um com uma responsabilidade única. O padrão usado é de **funções** (JavaScript vanilla), não classes:

| # | Módulo | Responsabilidade |
| :-- | :-- | :-- |
| 1 | Alternância de Tema | Modo claro/escuro com persistência |
| 2 | Menu Mobile | Menu hambúrguer responsivo |
| 3 | Animações ao Rolar | Intersection Observer (fade-in) |
| 4 | Contador Animado | Estatísticas que sobem na tela |
| 5 | Voltar ao Topo | Botão que aparece após rolar |
| 6 | Quiz Interativo | 15 perguntas, pontuação, feedback |
| 7 | Formulário de Contato | Validação + envio via `mailto:` |
| 8 | Calculadora de Impacto | Cálculo de sustentabilidade |
| 9 | Filtro de Práticas | Filtragem por categoria |
| 10 | Tela de Carregamento | Loader inicial |
| 11 | Controles de Acessibilidade | Fonte e alto contraste |
| 12 | Busca Interna | Pesquisa no conteúdo do site |
| 13 | Confete | Celebração ao acertar 100% no quiz |
| 14 | Mapa Interativo do Brasil | Regiões clicáveis (SVG) |
| 15 | Simulador de Fazenda | Construção de fazenda sustentável |
| 16 | Glossário Interativo | 24 termos com busca e filtro |
| 17 | Sistema de Conquistas | 15 badges de gamificação |
| 18 | Carrossel de Histórias | Slides do campo |
| 19 | Comparador Antes/Depois | Slider de imagens |
| 20 | Jogo "Defensor do Agro" | Mini-jogo em Canvas |
| 21 | Rastreadores de Conquistas | Detecta interações do usuário |
| 22 | Efeitos de Parallax | Profundidade visual |
| 23 | Síntese de Voz | Leitura das perguntas (acessibilidade) |
| 24 | Estatísticas Pessoais | Painel de progresso do usuário |
| 25 | Web Share API | Botão compartilhar |
| 26 | Registro do Service Worker | Ativa o modo offline (PWA) |
| 27 | Inicialização Geral | Liga todos os módulos ao carregar |

> 💡 **Padrão recorrente:** quase toda seção segue a mesma lógica — **(1)** pega elementos do HTML com `getElementById`, **(2)** escuta eventos com `addEventListener`, **(3)** executa a ação, **(4)** quando necessário, salva no `localStorage`. A seção 27 chama as funções de inicialização quando a página carrega.

---

## 🎨 Sistema de Design

### Variáveis de cores (CSS Custom Properties)

Todas as cores são definidas em `:root` no início do `style.css`. O **tema escuro** sobrescreve essas mesmas variáveis em `body.tema-escuro`, então a interface inteira se adapta sem duplicar regras.

```css
/* Tema claro (padrão) */
--verde-escuro: #1a4d2e;
--verde-medio: #4f9d50;
--verde-claro: #a8d5a8;
--verde-suave: #e8f3e8;
--dourado: #d4a017;
--dourado-claro: #f0d878;
--terra: #8b6f47;

--bg-principal: #f8f9f7;
--bg-card: #ffffff;
--bg-destaque: #f0f5ec;

--texto-principal: #2c3e2d;
--texto-suave: #4a5d4b;

--borda: #e0e5dc;
--sombra-leve:  0 2px 8px rgba(26, 77, 46, 0.08);
--sombra-media: 0 4px 16px rgba(26, 77, 46, 0.12);
--sombra-forte: 0 8px 32px rgba(26, 77, 46, 0.18);

--transicao: 0.3s ease;
--raio: 12px;
```

> Para mudar o visual do site inteiro, basta alterar esses valores — todos os elementos se adaptam automaticamente.

### Tipografia

- **Playfair Display** (títulos) — pesos 600, 700, 800
- **Poppins** (texto) — pesos 300, 400, 500, 600, 700

Ambas são **self-hosted** na pasta `/fonts` (formato `.woff2`), carregadas via `@font-face` com `font-display: swap`. Não há dependência de Google Fonts ou qualquer CDN.

---

## 💾 Dados Salvos no Navegador (localStorage)

O projeto **não usa backend**. Todos os dados do usuário ficam apenas no navegador dele, via `localStorage`. As chaves utilizadas são:

| Chave | O que guarda |
| :-- | :-- |
| `agrinho-tema` | Tema escolhido (claro/escuro) |
| `agrinho-fonte` | Tamanho de fonte da acessibilidade |
| `agrinho-contraste` | Modo alto contraste (ligado/desligado) |
| `agrinho-conquistas` | Lista de conquistas desbloqueadas |
| `agrinho-paginas-visitadas` | Páginas que o usuário já visitou |
| `agrinho-melhor-pontuacao-jogo` | Recorde no jogo |
| `agrinho-melhor-pontuacao-quiz` | Melhor nota no quiz |
| `agrinho-ranking-jogo` | Histórico de partidas do jogo |
| `agrinho-som-jogo` | Preferência de som do jogo |
| `agrinho-mensagens` | Histórico de mensagens do formulário |
| `agrinho-tour-completo` | Se o usuário já viu o tour inicial |
| `agrinho-total-jogos` / `agrinho-total-quiz` / `agrinho-total-simulador` | Contadores de uso |

> 🔒 **Privacidade:** nada é enviado para servidores. Tudo fica no dispositivo do usuário e pode ser apagado pelo botão "Resetar dados" no painel de estatísticas.

---

## 🧪 Testes Manuais

### Checklist de funcionalidades

- [ ] Menu hambúrguer abre e fecha no celular
- [ ] Links de navegação funcionam em todas as páginas
- [ ] Estatísticas animam quando entram na tela
- [ ] Botão "voltar ao topo" aparece ao rolar
- [ ] Quiz valida respostas e calcula pontuação
- [ ] Formulário valida campos e abre o cliente de e-mail
- [ ] Tema escuro alterna e persiste após recarregar
- [ ] Conquistas desbloqueiam ao interagir
- [ ] Jogo, simulador e mapa funcionam

### Responsividade

- [ ] Desktop (1200px+)
- [ ] Tablet (768px – 1199px)
- [ ] Celular (480px – 767px)
- [ ] Celular pequeno (< 480px)

### Acessibilidade

- [ ] Navegação por teclado (Tab) com foco visível
- [ ] Alto contraste e ajuste de fonte funcionam
- [ ] Síntese de voz lê as perguntas do quiz
- [ ] Sem erros no console do navegador

### PWA / Offline

- [ ] O site instala como aplicativo
- [ ] Funciona offline (modo avião) após a primeira visita

---

## 🔍 Depuração (Debugging)

Ferramentas do navegador (atalho **F12**):

- **Console** — ver erros de JavaScript (deve estar limpo)
- **Application → Service Workers** — confirmar que `agro-forte-v2` está "activated"
- **Application → Cache Storage** — ver os arquivos em cache offline
- **Application → Local Storage** — inspecionar os dados salvos (chaves acima)
- **Lighthouse** — auditar Performance, Acessibilidade, Boas Práticas e SEO

> 💡 Ao testar mudanças, lembre-se de **limpar os dados do site** (ou usar aba anônima) para o Service Worker buscar a versão mais nova dos arquivos.

---

## ✅ Conformidade Técnica

Este projeto segue estritamente o regulamento Agrinho 2026 (Subcategoria 3 — Front-End):

- ✅ **Apenas HTML, CSS e JavaScript puros**
- ✅ **Zero frameworks** e **zero bibliotecas** (sem React, jQuery, Bootstrap, etc.)
- ✅ **Zero CDN externo** — fontes self-hosted, ícones em emoji Unicode
- ✅ **Zero CSS/JS inline** — tudo declarado em arquivos `.css` e `.js` externos
- ✅ **Código comentado** e identado (mantido legível, sem minificação proposital)
- ✅ **Tag `agrinho`** configurada nos topics do repositório

> 📝 **Decisão consciente:** o código **não é minificado**. Embora a minificação reduza o tamanho dos arquivos, optamos por manter os comentários didáticos e a indentação, pois a legibilidade e o valor educacional são prioridades deste projeto.

---

## 🌐 Suporte de Navegadores

| Navegador | Versão mínima |
| :-- | :-- |
| Chrome / Edge | 88+ |
| Firefox | 87+ |
| Safari | 14+ |
| Chrome Mobile | 88+ |
| Safari iOS | 14+ |

---

<div align="center">

**Agro Forte — Agro forte, futuro sustentável** 🌱

Desenvolvido por **João Gabriel Sabedra Vieira** · Colégio Cívico-Militar Douradina · Agrinho 2026

</div>
