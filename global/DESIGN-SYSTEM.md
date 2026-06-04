# DESIGN-SYSTEM.md
> Padrões de interface, componentes e escrita para produtos digitais.
> Cole em sessões que envolvam criação ou alteração de telas.
>
> **Base visual**: `sakai-ng` — PrimeNG 21, tema **Aura**, _primary_ **blue**, _surface_ **slate**.
> **Biblioteca pronta**: [`prototypes/_biblioteca/`](../prototypes/_biblioteca/README.md) — HTML/CSS para protótipos.
> **Fonte UX Writing**: Guia de Escrita para Canais Digitais — v2.0 (25/02/26)

---

## Layout geral

Shell padrão do sakai-ng: **topbar fixa + sidebar flutuante + área de conteúdo**.

- **Topbar**: fixa no topo, altura **4rem (64px)**, fundo `surface-card`, borda inferior. Contém logo (à esquerda, container de 20rem), ações à direita (alternar tema, configurador, perfil).
- **Sidebar**: flutuante à esquerda (`top: 6rem; left: 2rem`), largura **20rem (320px)**, fundo `surface-overlay`, cantos arredondados (12px), rolável. Menu agrupado por seções (rótulo em caixa-alta) com item ativo em `primary`.
- **Área de conteúdo**: `padding: 6rem 2rem 0` (abaixo da topbar); largura total. Conteúdo organizado em **cards** (`.card`: fundo `surface-card`, padding 1.5–2rem, borda, raio 12px, `margin-bottom`).
- **Grid**: sistema de 12 colunas (utilitários estilo Tailwind — `grid-cols-12`, `col-span-*`, `gap-*`). Formulários usam `flex` com `gap-4`/`gap-6`.
- **Menu modes**: `static` (padrão, sidebar sempre visível no desktop) ou `overlay` (sidebar sobreposta). Em telas ≤ 991px a sidebar vira off-canvas.
- **Tema**: claro (padrão) e escuro, alternados pela classe `app-dark` na raiz.

---

## Paleta de cores

Tokens do tema Aura (referência PrimeNG: `--p-primary-*`, `--p-surface-*`).

**Primary — blue** · **Surface — slate**

| Token | Valor | Uso |
|---|---|---|
| `primary` (500) | `#3b82f6` | Botão primário, links, item de menu ativo, destaques |
| `primary-hover` (600) | `#2563eb` | Hover do primário |
| `primary-active` (700) | `#1d4ed8` | Estado pressionado |
| `primary-contrast` | `#ffffff` | Texto/ícone sobre o primário |
| `danger` | `#ef4444` | Erros, exclusão, alertas críticos |
| `warn` | `#f59e0b` | Avisos, atenção |
| `success` | `#22c55e` | Confirmações, status positivo |
| `info` | `#3b82f6` | Informação neutra |
| `help` | `#a855f7` | Ajuda, ação terciária |
| `contrast` | `#020617` | Botão de alto contraste |

**Superfícies (slate):**

| Token | Valor | Uso |
|---|---|---|
| `surface-ground` | `#f1f5f9` (slate-100) | Fundo da aplicação |
| `surface-card` | `#ffffff` (slate-0) | Fundo de cards, topbar |
| `surface-border` | `#e2e8f0` (slate-200) | Bordas, divisores |
| `surface-hover` | `#f1f5f9` | Hover de itens |
| `text-color` | `#334155` (slate-700) | Texto principal |
| `text-muted` | `#64748b` (slate-500) | Texto secundário, placeholders |

> **Dark mode**: `surface-ground` → slate-950 `#020617`; `surface-card` → slate-900 `#0f172a`; `primary` desloca para blue-400 `#60a5fa`; texto principal → branco.

---

## Tipografia

**Fonte**: `Lato`, com fallback `system-ui, 'Segoe UI', sans-serif`. Base **14px**, `line-height` 1.2.

| Elemento | Fonte | Tamanho | Peso |
|---|---|---|---|
| `h1` / Título de página | Lato | 2.5rem (`.page-title`: 1.5rem) | 700 |
| `h2` | Lato | 2rem | 700 |
| `h3` | Lato | 1.75rem | 700 |
| Subtítulo / `h5` | Lato | 1.25rem | 600–700 |
| Corpo | Lato | 1rem (14px) | 400 |
| Label de campo | Lato | 0.875rem | 500 |
| Texto de ajuda / `small` | Lato | 0.8125–0.875rem | 400 |
| Mensagem de erro | Lato | 0.8125rem | 400 (cor `danger`) |

---

## Tokens de forma e movimento

| Token | Valor | Uso |
|---|---|---|
| `border-radius` | 6px | Botões, inputs, conteúdo (Aura `border.radius.md`) |
| `border-radius-lg` | 12px | Cards, sidebar, modais |
| `transition-duration` | 0.2s | Transições de hover/estado |
| `focus-ring` | anel 2px `primary-300` com offset | Foco visível por teclado |
| `shadow-card` | sombra suave (2 camadas) | Cards, sidebar |
| `shadow-overlay` | sombra de elevação | Modais, toasts, popovers |

---

## Componentes padrão

> Use a biblioteca [`prototypes/_biblioteca/sakai.css`](../prototypes/_biblioteca/README.md) — classes `p-*` espelham o PrimeNG. Nunca criar estilos inline divergentes.

### Botões (`p-button`)

PrimeNG expõe botões por **severidade** e **variante visual**. Classe base `.p-button`.

**Severidades**: `primary` (padrão), `secondary`, `success`, `info`, `warn`, `help`, `danger`, `contrast`.
**Variantes**: solid (padrão), `outlined`, `text`, `link`, `rounded`.
**Tamanhos**: `sm`, padrão, `lg`. **Ícone**: à esquerda (padrão) ou `icon-only`.

| Papel na tela | Severidade + variante | Posição padrão |
|---|---|---|
| Ação principal | `primary` (solid) | Direita do rodapé do formulário |
| Ação secundária | `secondary` (outlined) | À esquerda do Primary |
| Cancelar / descartar | `secondary` (text) | À esquerda das demais |
| Excluir, desativar | `danger` (solid ou outlined) | Separado das demais ações |

- Estado `disabled`: opacidade reduzida e cursor `not-allowed`.
- Estado `loading`: spinner no lugar/ao lado do ícone.

### Formulários

- Label sempre **acima** do campo (`.p-field` é uma coluna flex com `gap`)
- Inputs: `.p-inputtext`, `.p-textarea`, `.p-select`, `.p-iconfield` (input com ícone)
- Seletores: `.p-checkbox`, `.p-radiobutton`, `.p-toggleswitch`
- Campos obrigatórios marcados com `*` na cor `danger`; opcionais com `(opcional)` em `text-muted`
- Foco: borda `primary` + sombra de 1px `primary`
- Erro: borda `danger` (`.p-invalid`) + mensagem `.p-error` (ícone + texto) **abaixo** do campo
- Mensagem de erro exibida **abaixo** do campo, na cor `danger` — nunca só a cor
- Placeholder apenas para exemplificar formato — nunca substituir label
- Texto de ajuda: `.p-help` abaixo do campo, em `text-muted`
- Campos desabilitados com opacidade reduzida e cursor `not-allowed`
- Use `.p-fluid` no container para campos ocuparem 100% da largura

### Tabelas e listas (`p-datatable`)

- Cabeçalho com fundo `surface-card`, divisores `surface-border`
- Coluna de ações sempre na **última coluna** (`.p-column-actions`, alinhada à direita)
- Linha clicável (hover `surface-hover`) leva ao detalhe do registro
- Linha selecionada destacada com `highlight-bg`
- Status exibido com **tag** colorida (`.p-tag-*`), não apenas texto
- Paginação (`.p-paginator`) no **rodapé** da tabela
- Variante densa: `.p-datatable-sm`

### Modais (`p-dialog`)

- Confirmação de exclusão: **sempre modal** — nunca `confirm()` nativo
- Estrutura: `.p-dialog-mask` (overlay) > `.p-dialog` > header (título + fechar) + content + footer
- Footer: botão de ação à direita (danger para exclusão) + cancelar (text) à esquerda
- Fechar com ESC ou clique fora da área (`.p-dialog-mask`)

### Toasts / Notificações (`p-toast`)

- Posição: **canto superior direito** (`top: 100px; right: 1.5rem`)
- Estrutura: borda esquerda colorida por severidade + ícone + sumário + detalhe
- Duração: **~4–5 segundos** para sucesso/info; **persistente** (com fechar) para erro
- Nunca usar `alert()` nativo

### Mensagens inline (`p-message`)

- Alerta contextual dentro da página, por severidade: `info`, `success`, `warn`, `error`
- Estrutura: ícone + texto, fundo e borda suaves na cor da severidade
- Usar para avisos persistentes na tela (não confundir com toast, que é transitório)

### Tags, badges e chips

- `.p-tag` — status em tabelas/cards (com severidade colorida)
- `.p-badge` — contadores (notificações, itens)
- `.p-chip` — filtros aplicados, seleções removíveis
- `.p-avatar` — iniciais ou foto do usuário

---

## Estados obrigatórios de tela

Todo módulo deve tratar e exibir os quatro estados abaixo. Classes na biblioteca: `.p-skeleton`, `.p-empty-state`, `.p-error-state`.

### Loading
- Usar **skeleton** (`.p-skeleton`, com animação _shimmer_) no lugar do conteúdo que está carregando
- Nunca usar spinner genérico isolado
- Blocos de skeleton com a mesma proporção do conteúdo real

### Empty state
- `.p-empty-state`: ícone ilustrativo + título + descrição + botão de ação (quando aplicável)

### Error state
- `.p-error-state`: ícone de erro + mensagem descritiva + botão "Tentar novamente"

### Success
- Toast com mensagem de confirmação
- Nunca redirecionar sem feedback visual

---

## Padrões de navegação

- Breadcrumb atualizado em toda navegação
- URL sempre reflete o estado atual (filtros, tabs, modal aberto)
- Botão Voltar do browser deve funcionar corretamente
- Links externos sempre abrem em nova aba

---

## Acessibilidade (mínimo obrigatório)

- Todo campo de formulário com `label` associado via `for`/`id`
- Imagens com `alt` descritivo — nunca deixar vazio em imagens funcionais
- Ícones de ação com `aria-label`
- Contraste mínimo de 4.5:1 para textos
- Navegação completa por teclado em formulários e modais
- Erros sinalizados com cor **e** texto — nunca depender apenas da cor
- Header principal da tela funciona como `H1` — título nunca pode ser vago ou genérico

---

## UX Writing

> Diretrizes de escrita para interfaces digitais.
> Aplicar em todos os microtextos: botões, labels, placeholders, mensagens, títulos.

### Princípios gerais

| Princípio | Diretriz |
|---|---|
| **Clareza** | Palavras simples, frases objetivas, sem jargões técnicos ou termos bancários desnecessários |
| **Concisão** | Textos curtos e diretos — o tempo da pessoa usuária é valioso |
| **Relevância** | Informar o que é mais importante no contexto certo |
| **Consistência** | Usar os mesmos termos em todo o produto — nunca nomear o mesmo elemento de formas diferentes |
| **Acessibilidade** | Linguagem Simples, acessível a qualquer nível de familiaridade digital |

### Voz e Tom

- **Voz** (constante): brasileira, segura, próxima, empática
  - Otimista e realizadora: foco em soluções concretas, não frases motivacionais genéricas
  - Empoderador: dá controle e confiança à pessoa usuária
  - Parceiro: colaborativo, nunca impositivo ("A gente sabe o que você precisa" ❌)

- **Tom** (varia por contexto):

| Situação | Tom |
|---|---|
| Erro grave / bloqueio | Sério, claro e calmo |
| Aviso / alerta leve | Neutro e orientador |
| Sucesso / confirmação | Positivo, curto e cordial |
| Urgência | Direto e imperativo |
| Onboarding / boas-vindas | Acolhedor e motivador |

---

### Hierarquia da informação

Organize o conteúdo de tela para que a pessoa:
1. Entenda o que está vendo
2. Saiba o que pode fazer a seguir
3. Encontre rapidamente o que precisa

**Regra**: a informação mais importante sempre no início.

---

### Botões

- Sempre usar **verbos** — nunca substantivos isolados
- Apenas a **primeira letra maiúscula** — sem pontuação final
- **Infinitivo** (padrão) ou **imperativo** (urgência)
- Evitar termos vagos: `OK` ❌ → `Confirmar pagamento` ✅
- Complementar o verbo quando necessário para evitar ambiguidade

**Verbos mapeados e quando usar:**

| Botão | Quando usar | Evitar |
|---|---|---|
| Abrir conta digital | Iniciar abertura de conta nos canais digitais | "Iniciar abertura de conta" |
| Adicionar | Somar novo item à tela atual (anexar, criar, expandir lista) | "Incluir" (registro definitivo), "Criar" (início de fluxo) |
| Alterar | Mudar dado específico em operação já configurada (valor, data, conta) | "Editar", "Mudar", "Trocar" |
| Atualizar | Substituir algo existente ou recarregar dados em tempo real | "Alterar" (que leva a fluxo de edição) |
| Autorizar | Dar permissão formal, legal ou de segurança | "Confirmar" (para transações únicas), "Permitir" |
| Cadastrar | Criar ou registrar nova informação no sistema | "Adicionar", "Criar" |
| Cancelar | Desistir da tarefa atual — fecha tela e descarta alterações | Dois "Cancelar" com sentidos diferentes na mesma tela |
| Cancelar `<operação>` | Interromper operação específica em andamento (portabilidade, agendamento) | "Excluir", "Remover" |
| Compartilhar comprovante | Enviar comprovante de operação concluída | Apenas "Compartilhar" quando houver risco de ambiguidade |
| Continuar | Avançar para próxima etapa sem salvar | "Próximo", "Avançar" |
| Excluir | Remover dado permanentemente — sempre com modal de confirmação | "Deletar", "Apagar" |
| Ok, entendi | Confirmar leitura de informação sem ação subsequente | "OK" sozinho |
| Salvar | Persistir alterações feitas | "Confirmar" (reservar para transações financeiras) |

**App vs. sistema/desktop:**
- **App**: máxima concisão — um substantivo pode bastar (ex: `Empréstimos`)
- **Desktop**: pode ser mais descritivo em processos complexos, mas manter ordem direta (ex: `Acesse as parcelas do Fies`)

---

### Títulos e subtítulos

- Títulos `H1`: descrevem onde a pessoa está — nunca vagos (`Detalhes` ❌ → `Comprovante de transferência` ✅)
- Subtítulos: destacam a principal utilidade ou orientam a próxima ação
- **Sem ponto final** em títulos
- Apenas a **primeira letra maiúscula** (não title case)
- App: use o mínimo de palavras sem perder o sentido
- Desktop: pode ser mais descritivo, mas mantenha objetividade

---

### Formulários — labels, placeholders e textos de ajuda

**Labels (rótulos):**
- Palavras diretas e sucintas: `CPF`, `Senha de acesso`, `Valor da transferência`
- Sem frases longas, sem gerúndio, sem termos genéricos
- Obrigatoriedade: marcar a exceção
  - Maioria obrigatória → indicar `Opcional` nos que não forem
  - Maioria opcional → indicar `Obrigatório` nos que forem

**Placeholders:**
- Mostrar o formato esperado para o campo — não substituem o label
- Exemplo: campo CPF → placeholder `000.000.000-00`

**Textos de ajuda:**
- Usar para explicar o preenchimento, não repetir o label
- Exibir abaixo do campo, texto menor

**Ordem lógica:**
- Agrupar campos por assunto e sequência natural
- Formulários longos: dividir em seções (`Informações pessoais`, `Dados bancários`, etc.)

---

### Alertas, avisos e modais

Usar **apenas quando houver real necessidade**: confirmar ação irreversível, alertar risco, informar falha ou exigir decisão.

**Alertas** (tom preventivo/corretivo):
- Texto claro e direto, frases curtas
- Tom calmo e empático — nunca culpar a pessoa usuária
- Evitar jargões técnicos

**Avisos** (informações não emergenciais):
- Título informativo + texto
- Linguagem preventiva, não alarmista
- Usar marcadores (bullets) para instruções

**Diálogos modais:**
1. Título com ação clara
2. Botão principal com verbo claro — nunca `OK`
3. Corpo curto e objetivo
4. Priorizar ações que possam ser desfeitas
5. Tom compatível com a gravidade da jornada
6. Sem termos negativos duplos

---

### Mensagens de erro

Ao criar uma mensagem de erro, responder:
1. O que é esse erro?
2. Por que ocorreu?
3. É possível resolver?
4. Qual o contexto (telas antes e depois)?

**Anatomia de uma boa mensagem de erro:**
- Explicar o que aconteceu
- Indicar como resolver
- Tom respeitoso e humano
- Nunca culpar a pessoa usuária

**Boas práticas:**
- Ser específico: `Seu saldo é insuficiente para a operação` ✅ / `Falha na operação` ❌
- Orientar a próxima ação: `Verifique se inseriu a senha corretamente e tente de novo`
- Exibir o erro **após** a ação ser concluída (ao sair do campo ou clicar em enviar)
- Mostrar o erro **próximo ao campo** com problema
- Usar cor **e** texto — nunca só a cor para sinalizar erro

**Categorias:**

| Categoria | Definição | Exemplo |
|---|---|---|
| Ruído | Sem interrupção — breve orientação para corrigir | E-mail em formato errado |
| Obstáculo | Não consegue concluir agora, mas pode chegar lá | Necessidade de atualizar o app |
| Barreira | Bloqueio — precisa agir para continuar | Sem conexão com a internet |

---

### Estados vazios (empty states)

Ocorrem quando não há dados a exibir: primeiro uso, dados excluídos, pesquisa sem resultado, erro específico.

**Estrutura recomendada:**
- Elemento visual (ícone ou ilustração) — reduz carga cognitiva
- Título positivo: foco no que a pessoa **pode fazer**, não no que falta
  - `Você não tem dados` ❌ → `Insira seus dados para visualizar` ✅
- Orientação de próximo passo com botão ou link de ação

**Tipos:**

| Tipo | Como tratar |
|---|---|
| Primeiro uso | Informar o tipo de dado disponível e orientar o próximo passo |
| Resultado de pesquisa/filtro vazio | Explicar que pode ajustar parâmetros para visualizar |

**Regras:**
- Nunca deixar a pessoa num "beco sem saída" — sempre oferecer saída
- Situações semelhantes devem seguir o mesmo padrão visual e textual

---

### Textos de transição (loading states)

- Usar **verbos específicos no gerúndio**: `Carregando extrato...`, `Processando pagamento...`
- Acompanhar sempre de elemento visual (spinner, barra de progresso)
- Ações < 1 segundo: texto pode ser omitido
- Ações > 5 segundos: atualizar o status progressivamente
- Texto deve ser conciso — absorvido rapidamente

---

### Breadcrumbs

- Refletem a hierarquia de navegação — marcam o caminho percorrido
- Usar apenas quando necessário: analisar comportamento antes de adicionar
- Nomenclatura: mesmo nome do título da página atual (sem link)
- Máximo de **3 links** (excluindo home e página atual) — excedente usa truncamento `...`
- Texto: palavras-chave (substantivos), até 3 palavras por nível, sem conectivos
- Mobile: exibir apenas o link para a página anterior
- Nunca usar mais de uma linha em mobile — encurtar para linha única

---

### Formatação de texto em interfaces

| Elemento | Quando usar |
|---|---|
| **Negrito** | Destacar informação-chave — usar com moderação |
| *Itálico* | Termos estrangeiros não incorporados ao português ou conceitos técnicos |
| Sublinhado | Reservar para links — não usar para ênfase |

**Palavras estrangeiras:**
- Priorizar sempre o equivalente em português
- Permitido quando amplamente conhecido (`login`, `app`, `e-mail`, `site`, `design`) ou sem equivalente (`token`)
- Jargões técnicos em inglês não devem aparecer na comunicação com a pessoa usuária

---

### Numerais e formatos

| Item | Padrão em apps/sistemas |
|---|---|
| Números | Preferir algarismos — mais rápidos de ler e ocupam menos espaço |
| Datas | `DD/MM` — dois dígitos para dia e mês, sem nome do mês por extenso |
| Horários | `9h`, `18h` — sem espaço entre número e "h", sem zero à esquerda |
| Log de transação | `HH:MM:SS` com dois-pontos |
| Dinheiro | `R$ 1.200,53` — espaço entre símbolo e valor, vírgula para centavos |
| Telefones | Sem hífen — separar prefixo com espaço: `(11) 99999 9999` |

---

### Listas

- **Numerada**: quando a ordem importa (instruções, passo a passo)
- **Com marcadores**: quando a ordem não importa — usar dois-pontos antes da lista
- Cada item termina com ponto e vírgula; último item com ponto final
- Sempre que possível, usar listas: facilitam escaneabilidade em situações complexas
