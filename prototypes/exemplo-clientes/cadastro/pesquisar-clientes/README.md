# Protótipos de Estado: Pesquisar Clientes
> Feature: Pesquisar Clientes — Feature Set: Cadastro — Domínio: Clientes
> Gerado como exemplo de referência do DESIGN-SYSTEM.md (UX Writing v2.0)
> Estilo visual via [biblioteca de componentes](../../../_biblioteca/README.md) (`sakai.css`)

---

## Estados cobertos

| Estado | Arquivo | Formato | Status | Aprovado por |
|---|---|---|---|---|
| Formulário com resultados | [form.html](./form.html) | HTML | 🎨 Mockup | — |
| Loading / skeleton | [loading.html](./loading.html) | HTML | 🎨 Mockup | — |
| Empty state (sem resultados) | [empty.html](./empty.html) | HTML | 🎨 Mockup | — |
| Erro de servidor | [error.html](./error.html) | HTML | 🎨 Mockup | — |

---

## Diretrizes de UX Writing aplicadas

Este exemplo demonstra as seguintes diretrizes do [DESIGN-SYSTEM.md](../../../../global/DESIGN-SYSTEM.md):

### Botões
- Verbos no infinitivo: **Pesquisar**, **Cadastrar Cliente**, **Exportar lista**, **Limpar filtros**
- Verbo complementado para evitar ambiguidade: **Exportar lista** (não apenas "Exportar")
- Botão primário à direita, ghost/cancelar à esquerda
- Sem "OK" — substituído por **Tentar novamente**, **Falar com o suporte**

### Labels e formulários
- Labels descritivos e sucintos: `CPF`, `Nome`, `Cadastrado a partir de`
- Obrigatoriedade marcando a exceção: `(opcional)` nos campos que não são obrigatórios
- Placeholder mostra formato esperado: `000.000.000-00`, `exemplo@dominio.com.br`
- Texto de ajuda explicativo no campo Status

### Mensagens de erro
- Erro de validação: cor + ícone + texto descritivo (nunca só cor)
- Texto específico: `CPF inválido. Verifique os dígitos e tente de novo`
- Erro exibido próximo ao campo com problema
- Erro de servidor: tom calmo, nunca culpa a pessoa usuária
- Título específico: `Não conseguimos carregar os resultados` (não "Ocorreu um erro")

### Empty state
- Ícone ilustrativo + título positivo + dicas orientadoras + botão de saída
- Título foca no que a pessoa pode fazer: `Nenhum cliente encontrado com esses filtros`
- Nunca deixar a pessoa num "beco sem saída" — sempre oferecer ação corretiva

### Loading / textos de transição
- Verbo específico no gerúndio + reticências: `Buscando clientes...`
- Spinner acompanha o texto (elemento visual obrigatório)
- Skeleton com mesma proporção e estrutura do conteúdo real

### Hierarquia e navegação
- H1 descritivo: `Pesquisar Clientes` (nunca vago como "Busca" ou "Resultados")
- Breadcrumb: `Início › Clientes › Cadastro › Pesquisar Clientes`
- Nomenclatura do breadcrumb = título da página atual
- Coluna de ações sempre na última coluna da tabela

---

## Status geral

**Status**: 🎨 Mockup

**Aprovado por**: — *(preencher quando aprovado)*

---

*Links: [DESIGN-SYSTEM.md](../../../../global/DESIGN-SYSTEM.md) · [Índice de protótipos](../../../README.md)*
