# PROMPT_PROTOTYPE_FLOW — Protótipo de Fluxo (N2)

> **Quem participa**: dev / designer / PO técnico
> **Insumo necessário**: DESIGN-SYSTEM.md + N2 do Feature Set
> **Entrega**: arquivo `flow.html` navegável mostrando como as telas do
> Feature Set se conectam, seguindo os padrões do Design System
>
> **Pré-requisito**: N2 aprovado (PROMPT_2B concluído)
> **Onde salvar**: `prototypes/[dominio]/[feature-set]/flow.html`

---

## INSTRUÇÕES PARA O CLAUDE

Você vai gerar um protótipo de fluxo HTML para um Feature Set.
O protótipo deve mostrar visualmente como as telas se conectam,
seguindo rigorosamente os padrões definidos no DESIGN-SYSTEM.md.

### Regras de geração

1. **Fidelidade ao Design System**: use exatamente as cores, tipografia,
   espaçamentos e componentes definidos no DESIGN-SYSTEM.md.
   Não invente padrões visuais — se algo não estiver no Design System,
   use o padrão mais neutro e sinalize com um comentário `<!-- TODO: definir no Design System -->`.

2. **Use a biblioteca de componentes**: linke `prototypes/_biblioteca/sakai.css`
   e use as classes `p-*` e `layout-*` (espelham o DESIGN-SYSTEM.md). Ajuste o
   caminho relativo conforme a profundidade do arquivo — para
   `prototypes/[dom]/[fs]/flow.html` o caminho é `../../_biblioteca/sakai.css`.
   A navegação entre telas usa `.screen` / `.screen.active` (já na biblioteca).
   Apenas o JS de navegação vai inline.

3. **Navegação funcional**: os botões e links que levam de uma tela para outra
   devem funcionar — implementar como troca de `display: block/none` entre
   seções, sem backend. O usuário deve conseguir clicar e "navegar" pelo fluxo.

4. **Layout completo**: gerar o layout completo da aplicação — sidebar, topbar,
   área de conteúdo — conforme definido no DESIGN-SYSTEM.md.
   Não gerar apenas o componente isolado.

5. **Indicador de tela atual**: a tela ativa deve ser sempre identificável —
   breadcrumb atualizado, item da sidebar destacado, título da página visível.

6. **Dados fictícios realistas**: preencher tabelas, listas e formulários com
   dados fictícios que façam sentido para o domínio — nunca "Lorem ipsum" ou
   "Teste 1, Teste 2". Os dados devem refletir o contexto real da feature.

7. **Anotar lacunas**: qualquer comportamento descrito no N2 que não puder ser
   representado visualmente no HTML deve ser anotado em um painel de notas
   visível no protótipo:
   ```html
   <div class="prototype-notes">
     <strong>📋 Notas do protótipo:</strong>
     <ul>
       <li>O comportamento X não está representado aqui — ver N2: [seção]</li>
     </ul>
   </div>
   ```

---

## CONTEXTO DO PROJETO

=== DESIGN-SYSTEM.md ===
[cole aqui o conteúdo do DESIGN-SYSTEM.md]

=== N2 DO FEATURE SET ===
[cole aqui o README.md do Feature Set]

=== N3s DAS FEATURES (opcional — para mais fidelidade) ===
[cole aqui os N3s das features do Feature Set, se disponíveis]

---

## PASSO 1 — Mapeamento de telas

Leia o N2 e liste as telas identificadas na seção "Telas".
Apresente o mapa de navegação antes de gerar o HTML:

```
[Tela de listagem] ──"Novo"──→ [Modal de criação]
                   ──"Linha"──→ [Tela de detalhe]
                                     └──"Editar"──→ [Tela de edição]
                                     └──"Excluir"──→ [Modal de confirmação]
```

Pergunte:
> "O mapa de navegação acima reflete o fluxo esperado?
> Posso gerar o HTML do protótipo de fluxo?"

---

## PASSO 2 — Geração do HTML

Após aprovação do mapa, gere o arquivo `flow.html` com:

**Estrutura do arquivo**:
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Protótipo: [Feature Set] — [Domínio]</title>
  <!-- Biblioteca de componentes (sakai-ng) — ajuste os ../ conforme a profundidade -->
  <link rel="stylesheet" href="../../_biblioteca/sakai.css">
</head>
<body>

  <div class="prototype-badge">🎨 PROTÓTIPO — não é o sistema real</div>

  <!-- Topbar (fixa, comum a todas as telas) -->
  <header class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <a class="layout-topbar-logo" href="#"><span>Sistema</span></a>
    </div>
    <div class="layout-topbar-actions"><span class="p-avatar p-avatar-primary">AC</span></div>
  </header>

  <!-- Sidebar flutuante (comum a todas as telas) -->
  <aside class="layout-sidebar">
    <ul class="layout-menu">
      <li><span class="layout-menuitem-root-text">[Feature Set]</span>
        <ul>
          <li><a class="active-route" href="#" onclick="showScreen('screen-list')">[Tela 1]</a></li>
          <li><a href="#" onclick="showScreen('screen-detail')">[Tela 2]</a></li>
        </ul>
      </li>
    </ul>
  </aside>

  <div class="layout-main-container">
    <main class="layout-main">

      <!-- Tela 1: Listagem (visível por padrão) -->
      <div id="screen-list" class="screen active">
        <nav class="p-breadcrumb"><span class="p-breadcrumb-current">[Tela 1]</span></nav>
        <div class="card"><!-- tabela p-datatable com dados fictícios realistas --></div>
      </div>

      <!-- Tela 2: Detalhe -->
      <div id="screen-detail" class="screen">
        <nav class="p-breadcrumb">
          <a href="#" onclick="showScreen('screen-list')">[Tela 1]</a>
          <span class="p-breadcrumb-sep">›</span><span class="p-breadcrumb-current">[Tela 2]</span>
        </nav>
        <div class="card"><!-- detalhe do registro --></div>
      </div>

    </main>
  </div>

  <!-- Modal: usa p-dialog-mask / p-dialog da biblioteca -->
  <div id="modal-create" class="p-dialog-mask" style="display:none">
    <div class="p-dialog">...</div>
  </div>

  <div class="prototype-notes">
    <strong>📋 Notas:</strong>
    <ul>
      <li>...</li>
    </ul>
  </div>

  <script>
    function showScreen(id) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    }
    function toggleModal(id, show) {
      document.getElementById(id).style.display = show ? 'flex' : 'none';
    }
  </script>
</body>
</html>
```

---

## PASSO 3 — Entrega

Após gerar o HTML, informe:

> "✅ Protótipo de fluxo gerado.
>
> **Salvar como**: `prototypes/[dominio]/[feature-set]/flow.html`
>
> **Atualizar**: `prototypes/[dominio]/[feature-set]/README.md`
> — adicionar linha na tabela de protótipos com status '🎨 Mockup'
>
> **Telas cobertas**: [lista]
> **Telas não cobertas** (⚠️): [lista, se houver]"
