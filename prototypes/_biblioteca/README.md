# Biblioteca de Componentes (HTML/CSS)

> Componentes prontos para protótipos, baseados no **sakai-ng** (PrimeNG 21 · tema **Aura** · _primary_ **blue** · _surface_ **slate**).
> Espelha o [DESIGN-SYSTEM.md](../../global/DESIGN-SYSTEM.md).

---

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| [`sakai.css`](./sakai.css) | Folha de estilo única: tokens (light/dark) + todos os componentes |
| [`index.html`](./index.html) | Catálogo navegável — abra no browser para ver todos os componentes |

---

## Como usar em um protótipo

### Opção A — linkar a biblioteca (recomendado)

No `<head>` do protótipo, aponte para a `sakai.css` com caminho relativo:

```html
<!-- protótipo em prototypes/[dominio]/[feature-set]/[feature]/form.html -->
<link rel="stylesheet" href="../../../_biblioteca/sakai.css">
```

Ajuste o número de `../` conforme a profundidade do arquivo. Vantagem:
um único ponto de verdade — mudou o Design System, muda todo protótipo.

### Opção B — auto-contido

Quando o protótipo precisa ser 100% portátil (um arquivo único, sem
dependências de caminho), copie o conteúdo de `sakai.css` para dentro de
uma tag `<style>` no próprio HTML. Use esta opção apenas quando o
protótipo for circular isolado (e-mail, anexo, etc.).

---

## Modo escuro

Adicione a classe `app-dark` na raiz para ativar o tema escuro:

```html
<html class="app-dark"> … </html>
```

ou via JS: `document.documentElement.classList.toggle('app-dark')`.

---

## Estrutura de shell (sidebar + topbar + conteúdo)

```html
<body>
  <header class="layout-topbar"> … </header>
  <aside class="layout-sidebar">
    <ul class="layout-menu"> … </ul>
  </aside>
  <div class="layout-main-container">
    <main class="layout-main">
      <nav class="p-breadcrumb"> … </nav>
      <div class="page-header">
        <h1 class="page-title">Título da tela</h1>
        <p class="page-subtitle">Subtítulo opcional</p>
      </div>
      <div class="card"> … conteúdo … </div>
    </main>
    <footer class="layout-footer">…</footer>
  </div>
</body>
```

> Para protótipos **component-only** (sem shell), use `<main class="layout-component-only">`
> em vez do bloco `layout-main-container`.

---

## Catálogo de classes

| Categoria | Classes principais |
|---|---|
| **Layout** | `layout-topbar` · `layout-sidebar` · `layout-menu` · `layout-main-container` · `layout-main` · `layout-footer` |
| **Botões** | `p-button` + `p-button-{secondary,success,info,warn,help,danger,contrast}` · modificadores `p-button-{outlined,text,link,rounded,sm,lg,icon-only}` · `p-buttongroup` |
| **Formulário** | `p-field` · `p-inputtext` · `p-textarea` · `p-select` · `p-iconfield`/`p-inputicon` · `p-checkbox` · `p-radiobutton` · `p-toggleswitch` · `p-invalid` · `p-error` · `p-help` · `p-fluid` |
| **Tabela** | `p-datatable` (`p-datatable-sm`) · `p-column-actions` · `p-paginator` |
| **Indicadores** | `p-tag` (+ severidade) · `p-badge` · `p-chip` · `p-avatar` |
| **Feedback** | `p-message` (+ severidade) · `p-toast` · `p-dialog`/`p-dialog-mask` |
| **Estados** | `p-skeleton` · `p-empty-state` · `p-error-state` |
| **Cartão** | `card` · `card-title` |
| **Utilitários** | subconjunto Tailwind: `flex`, `grid`, `gap-*`, `grid-cols-*`, `w-full`, etc. |

Veja todos renderizados em [`index.html`](./index.html).

---

## Severidades (cores semânticas)

| Severidade | Token | Uso |
|---|---|---|
| `primary` | blue 500 | Ação principal, destaque |
| `secondary` | slate | Ação secundária neutra |
| `success` | `#22c55e` | Confirmação, status positivo |
| `info` | `#3b82f6` | Informação neutra |
| `warn` | `#f59e0b` | Aviso, atenção |
| `danger` | `#ef4444` | Erro, exclusão |
| `help` | `#a855f7` | Ajuda, secundário |
| `contrast` | slate 950 | Alto contraste |

---

*Mantida em sincronia com o [DESIGN-SYSTEM.md](../../global/DESIGN-SYSTEM.md). Origem dos padrões: repositório `sakai-ng`.*
