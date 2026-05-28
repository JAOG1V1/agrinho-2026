# 🤝 Guia de Contribuição — Agro Forte | Agrinho 2026

Obrigado pelo seu interesse no projeto **Agro Forte**! Este documento descreve as diretrizes e boas práticas adotadas no desenvolvimento do site, servindo tanto como referência técnica quanto como guia para futuras colaborações.

---

## 📌 Contexto importante

> **Sobre o período do concurso:** O Agro Forte foi desenvolvido **individualmente** por um único estudante como trabalho para o **Concurso Agrinho 2026 — Categoria Programação, Subcategoria Front-End**, em conformidade com o regulamento oficial. Durante o período de avaliação, o projeto **não recebe contribuições externas** (é uma exigência do concurso que o trabalho seja autoral e individual).
>
> Este guia documenta as **práticas de desenvolvimento** usadas no projeto e deixa a base preparada para **colaboração aberta no futuro** — após o encerramento do concurso, como um projeto educacional de código aberto sobre agronegócio sustentável.

---

## 🛠️ Stack do projeto

Antes de qualquer coisa, é essencial entender a regra de ouro deste projeto:

| Tecnologia | Uso |
| :--- | :--- |
| **HTML5** | Estrutura semântica |
| **CSS3** | Estilização (variáveis, Grid, Flexbox, animações) |
| **JavaScript (Vanilla / ES6+)** | Interatividade |

> ⚠️ **REGRA ABSOLUTA:** Este projeto usa **exclusivamente HTML, CSS e JavaScript puros**. Por exigência do regulamento Agrinho 2026 (item 6.1.15, retificado em 21/05/2026), **NÃO é permitido o uso de frameworks ou bibliotecas** (React, Vue, jQuery, Bootstrap, Tailwind, etc.). Qualquer contribuição que introduza dependências externas será automaticamente recusada.

---

## 🐛 Como reportar um bug

Encontrou um problema? Abra uma **issue** seguindo este modelo:

### O que incluir

1. **Título descritivo** — resuma o problema com clareza
   - ✅ Bom: `Menu mobile não fecha ao clicar em um link`
   - ❌ Ruim: `bug no menu`
2. **Comportamento esperado** — o que deveria acontecer
3. **Comportamento atual** — o que está acontecendo
4. **Passos para reproduzir** — lista numerada
5. **Ambiente** — navegador, versão, sistema operacional, dispositivo
6. **Capturas de tela** — se ajudarem a entender

### Exemplo de issue

```text
Título: Formulário de contato não valida e-mail corretamente

Comportamento esperado:
E-mail inválido deve exibir a mensagem de erro abaixo do campo.

Comportamento atual:
E-mail inválido não exibe nenhuma mensagem.

Passos para reproduzir:
1. Ir para a página de contato
2. Digitar "email_invalido" no campo de e-mail
3. Clicar fora do campo (ou tentar enviar)
4. Nenhuma validação aparece

Ambiente:
- Chrome 120
- Windows 11
- Desktop
```

---

## 💡 Como sugerir uma funcionalidade

Para propor uma melhoria, abra uma issue com a label `enhancement` contendo:

1. **O problema** que a funcionalidade resolve
2. **A solução proposta**
3. **Benefícios** esperados
4. **Exemplos ou mockups** (se houver)

> 💡 Lembre-se: qualquer sugestão precisa respeitar a regra de **HTML/CSS/JS puro** — sem frameworks ou bibliotecas.

### Exemplo

```text
Título: Adicionar modo de leitura para o glossário

Problema:
Termos técnicos longos do glossário são difíceis de ler em telas pequenas.

Solução proposta:
Criar um botão "modo leitura" que aumenta a fonte e o espaçamento,
usando apenas CSS (classe alternável via JavaScript vanilla).

Benefícios:
- Melhor acessibilidade
- Leitura mais confortável no celular
- Zero dependências externas
```

---

## 🔀 Enviando um Pull Request

> 📎 Reforçando: PRs externos só serão aceitos **após o encerramento do concurso**. As instruções abaixo valem para esse cenário futuro.

### Antes de começar

1. Faça um **fork** do repositório
2. Crie uma **branch** específica para sua mudança
3. Siga os **padrões de código** (descritos mais abaixo)

### Nomeando a branch

```text
feature/descricao-curta      → nova funcionalidade
fix/descricao-do-bug         → correção de bug
docs/melhoria-documentacao   → documentação
style/ajustes-css            → ajustes visuais
refactor/nome-do-refactor    → refatoração
perf/otimizacao              → performance
```

**Exemplos:**

```bash
git checkout -b feature/adicionar-filtro-glossario
git checkout -b fix/menu-mobile-nao-fecha
git checkout -b docs/atualizar-readme
```

### Padrão de commits

Este projeto segue o padrão **Conventional Commits**. Use mensagens claras:

```bash
# ✅ Bons commits
git commit -m "feat: adiciona filtro de busca no glossario"
git commit -m "fix: corrige menu mobile que nao fecha ao clicar"
git commit -m "docs: atualiza instrucoes no README"

# ❌ Commits ruins
git commit -m "bug"
git commit -m "alteracoes"
git commit -m "aaa"
```

**Tipos de commit:**

| Tipo | Uso |
| :--- | :--- |
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Mudanças na documentação |
| `style` | Formatação/CSS, sem mudança de lógica |
| `refactor` | Refatoração de código |
| `perf` | Melhoria de performance |

### Abrindo o PR

1. Faça o push da sua branch (exemplo abaixo)
2. Abra o Pull Request no GitHub com `main` como destino
3. Preencha o template abaixo

```bash
git push origin feature/sua-feature
```

### Template de Pull Request

```markdown
## Descrição
Descreva brevemente a mudança.

## Tipo de Mudança
- [ ] Nova funcionalidade
- [ ] Correção de bug
- [ ] Atualização de documentação
- [ ] Ajuste visual / refatoração

## Problema Relacionado
Fixes #<numero-da-issue>

## Testes Realizados
- [ ] Testado em desktop
- [ ] Testado em mobile
- [ ] Testado no Chrome
- [ ] Testado no Firefox
- [ ] Testado em modo offline (PWA)

## Checklist de Conformidade
- [ ] Não adicionei frameworks ou bibliotecas
- [ ] Não há CSS inline (style="...") nem <style> internos
- [ ] Não há JavaScript inline (onclick="...") nem <script> internos
- [ ] O código segue as convenções deste guia
- [ ] Mantive/adicionei comentários explicativos
- [ ] Não deixei console.log ou código temporário
- [ ] Não quebrei funcionalidades existentes
```

---

## 📋 Padrões de Código

### HTML

```html
<!-- Use HTML semântico e atributos de acessibilidade -->
<section aria-labelledby="titulo-secao">
    <h2 id="titulo-secao">Título da Seção</h2>
    <p>Conteúdo...</p>
</section>

<!-- Sempre use alt descritivo em imagens -->
<img src="campo.svg" alt="Ilustração de um campo agrícola ao amanhecer">

<!-- NUNCA use estilos ou scripts inline -->
<!-- ❌ ERRADO: <div style="color:red" onclick="fn()"> -->
<!-- ✅ CERTO:  use classes no CSS e addEventListener no JS -->
```

### CSS

```css
/* SEMPRE use as variáveis CSS do projeto (definidas em :root) */
.meu-card {
    color: var(--texto-principal);
    background: var(--bg-card);
    border: 1px solid var(--borda);
    border-radius: var(--raio);
    box-shadow: var(--sombra-leve);
    transition: var(--transicao);
}

/* Variáveis disponíveis no projeto: */
/* Cores:    --verde-escuro, --verde-medio, --verde-claro, --verde-suave */
/*           --dourado, --dourado-claro, --terra                          */
/* Fundos:   --bg-principal, --bg-card, --bg-secao, --bg-destaque         */
/* Texto:    --texto-principal, --texto-suave, --texto-claro              */
/* Outros:   --borda, --sombra-leve/media/forte, --transicao, --raio      */

/* Agrupe as propriedades logicamente */
.elemento {
    /* Posição e layout */
    position: relative;
    display: flex;

    /* Dimensões */
    width: 100%;

    /* Cores e fundo */
    color: var(--texto-principal);
    background: var(--bg-card);

    /* Espaçamento */
    padding: 1rem;
    margin: 1.5rem 0;

    /* Bordas e sombras */
    border-radius: var(--raio);
    box-shadow: var(--sombra-media);

    /* Transições */
    transition: var(--transicao);
}
```

### JavaScript

```javascript
// Este projeto usa FUNÇÕES (não classes) e JavaScript vanilla puro.
// Os nomes são descritivos e em português, mantendo o padrão do código.

// Use 'const' por padrão; 'let' apenas quando precisar reatribuir
const conquistasDisponiveis = [/* ... */];
let conquistasDesbloqueadas = [];

// Funções com nomes claros que descrevem a ação
function inicializarConquistas() {
    // implementação
}

// SEMPRE adicione eventos via addEventListener (nunca onclick inline)
botao.addEventListener('click', function() {
    desbloquearConquista('visitante');
});

// Comente o PORQUÊ das decisões — os comentários didáticos
// são parte da identidade deste projeto educacional
// (não os remova ao contribuir!)

// Trate erros com try/catch ao acessar localStorage
try {
    const dados = JSON.parse(localStorage.getItem('agrinho-conquistas'));
} catch (e) {
    // fallback seguro
}
```

---

## ✅ Conformidade com o Regulamento (Checklist crítico)

Toda contribuição **DEVE** passar nesta verificação:

- [ ] **Zero frameworks** (sem React, Vue, Angular, Svelte...)
- [ ] **Zero bibliotecas** (sem jQuery, Bootstrap, Tailwind, GSAP...)
- [ ] **Zero CDN externo** (tudo self-hosted, inclusive fontes)
- [ ] **Zero CSS inline** (`style="..."`) e zero `<style>` internos
- [ ] **Zero JS inline** (`onclick="..."`) e zero `<script>` internos
- [ ] **Apenas HTML, CSS e JavaScript** nas extensões `.html`, `.css`, `.js`

> Esta seção existe porque o projeto compete em um concurso com regras estritas. Não é burocracia — é o que garante a validade do trabalho.

---

## 🎯 Prioridades de Contribuição

### 🔴 Alta prioridade
- Bugs que quebram funcionalidades
- Problemas de acessibilidade
- Regressões de performance
- Falhas no funcionamento offline (PWA)

### 🟡 Média prioridade
- Novas funcionalidades educativas
- Melhorias de experiência do usuário (UX)
- Documentação

### 🟢 Baixa prioridade
- Ajustes cosméticos
- Comentários adicionais no código
- Reorganização de arquivos

---

## 🚫 O que NÃO fazer

**❌ Não adicione ao repositório:**
- Arquivos de sistema (`.DS_Store`, `Thumbs.db`)
- Configurações pessoais de IDE
- Qualquer pasta de dependências (`node_modules`, etc.)
- Arquivos de ambiente (`.env`)

**❌ Não faça:**
- Introduzir frameworks ou bibliotecas (quebra o regulamento)
- Adicionar CSS ou JS inline
- Reformatar código sem necessidade (gera ruído no diff)
- Misturar muitas mudanças em um único PR (mantenha o foco)
- Remover os comentários didáticos do código
- Ignorar avisos do linter (markdownlint, etc.)

---

## 🎓 Recursos úteis

- **[README.md](./README.md)** — Documentação principal do projeto
- **[CHANGELOG.md](./CHANGELOG.md)** — Histórico de versões e mudanças
- **[MDN Web Docs](https://developer.mozilla.org/pt-BR/)** — Referência de HTML, CSS e JS
- **[Can I Use](https://caniuse.com/)** — Compatibilidade entre navegadores
- **[Conventional Commits](https://www.conventionalcommits.org/pt-br/)** — Padrão de mensagens de commit
- **[Web.dev](https://web.dev/)** — Boas práticas de performance e acessibilidade

---

## 🙏 Obrigado!

Cada melhoria torna o Agro Forte um recurso educacional melhor sobre o agronegócio sustentável brasileiro. Sua atenção a estas diretrizes — especialmente às regras de conformidade — é o que mantém o projeto íntegro e fiel à sua proposta.

---

<div align="center">

**Agro Forte — Agro forte, futuro sustentável** 🌱

Projeto desenvolvido por **João Gabriel Sabedra Vieira**
Colégio Cívico-Militar Douradina · Concurso Agrinho 2026 · Categoria Programação

</div>
