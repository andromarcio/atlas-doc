# MASTER.md
> Arquivo de contexto global. Cole em toda sessão com o Claude,
> independente do módulo ou nível que está sendo trabalhado.

---

## Identificação do sistema

- **Sigla**: SIGES
- **Nome**: Sistema Integrado de Gestão de Engenharia de Software
- **Nome Produto**: Atlas
- **Descrição**: Plataforma que centraliza a gestão do ciclo de vida de software para quem coordena o processo, e não para quem escreve o código. Em um único lugar, gerentes de projeto, analistas de requisitos, equipes de teste e responsáveis pela GCM acompanham requisitos, métricas, testes e versões com rastreabilidade ponta a ponta — do requisito levantado até a versão entregue.
- **Versão atual**: Beta
- **Repositório de docs**: https://github.com/andromarcio/atlas-doc

---

## Stack técnica

- **Frontend**: Angular 21, TypeScript, Tailwind CSS
- **Backend**: Java Quarkus
- **Banco de dados**: PostgreSQL com Prisma ORM
- **Autenticação**: NextAuth.js com Google Provider
- **Fila / Jobs**: Não se aplica
- **Storage**: A definir
- **E-mail**: Não se aplica
- **SMS**: Não se aplica
- **Mensageria**: Não se aplica

---

## Repositórios do sistema

| Repositório | Responsabilidade |
|---|---|
| [nome-backend] | [ex: API REST, regras de negócio] |
| [nome-frontend] | [ex: Interface web] |
| atlas-doc | Documentação e especificações (este repo) |

---

## Convenções de código

### Nomenclatura
- Componentes Angular: PascalCase, um arquivo por componente
- Funções e variáveis: camelCase
- Constantes: UPPER_SNAKE_CASE
- Rotas de API: kebab-case (ex: `/smart-lists`)
- Arquivos de teste: `[nome].spec.ts`

### TypeScript
- `strict: true` em todo o projeto
- Proibido o uso de `any` — usar `unknown` com type guard quando necessário
- Tipos de entidades gerados pelo Prisma — não redefinir manualmente

### Estrutura de pastas (exemplo Next.js)
```
/app
  /(auth)           → páginas protegidas
  /(public)         → páginas sem autenticação
  /api/v1           → rotas de API
/components
  /ui               → componentes genéricos reutilizáveis
  /[modulo]         → componentes específicos de cada módulo
/lib
  /db.ts            → instância do Prisma
  /auth.ts          → configuração de autenticação
  /events.ts        → publicação de eventos internos
  /audit.ts         → registro de auditoria
  /validations/     → schemas Zod por módulo
/services           → lógica de negócio separada dos controllers
/repositories       → acesso a dados separado dos services
```

---

## Identificadores únicos (IDs)

Cada nível da hierarquia de documentação possui um ID único para rastreabilidade
entre ferramentas externas (Jira, Azure DevOps, etc.).

| Nível | Formato | Exemplo |
|---|---|---|
| Domínio (N1) | `[SIGLA]` — sigla em maiúsculas definida na criação do domínio | `CRM` |
| Feature Set (N2) | `[SIGLA]-[NNN]` — 3 dígitos sequenciais dentro do domínio | `CRM-001` |
| Feature (N3) | `[SIGLA]-[NNN]-[NN]` — 2 dígitos sequenciais dentro do Feature Set | `CRM-001-01` |

**Regras:**
- A sigla do domínio é definida uma única vez na criação do N1 e nunca alterada
- A numeração de Feature Sets e Features é sequencial e não reutilizada após exclusão
- O ID fica no cabeçalho de cada artefato, logo abaixo da linha `**Nível X**`

---

## Nomenclatura de features

Features são nomeadas sempre no **infinitivo**, seguindo o padrão:

**`Verbo + Entidade + Complemento (quando necessário)`**

| Regra | Exemplo |
|---|---|
| Criação | `Cadastrar Cliente` |
| Edição | `Editar Endereço de Entrega` |
| Exclusão | `Excluir Produto` |
| Listagem sem filtro | `Listar Pedidos` |
| Listagem com filtro | `Pesquisar Pedidos` |
| Ação específica | `Aprovar Solicitação de Crédito` |

**Regras:**
- Sempre infinitivo — nunca substantivo (`Cadastro de Cliente` ❌) nem gerúndio (`Cadastrando Cliente` ❌)
- Listagens que exibem apenas a lista, sem opções de filtro → verbo **Listar**
- Listagens que possuem campos de filtro ou busca → verbo **Pesquisar**
- Complemento é opcional — usar apenas quando necessário para distinguir features de mesma entidade

---

## Nomenclatura de campos — três camadas

A nomenclatura de campos segue três camadas com responsabilidades distintas.
**A única fonte de verdade para Label Dev e campo banco é o `global/DATA-MODEL.md`.**
Os N3 usam apenas Label PO — nunca duplicam as camadas técnicas.

| Camada | Convenção | Exemplo | Onde aparece |
|---|---|---|---|
| Label PO | Português, title case, sem jargão | `Nome completo` | N3 (tabela de campos), Gherkin, telas |
| Label Dev | camelCase, inglês, autoexplicativo | `fullName` | DATA-MODEL.md, código, API |
| Campo banco | [CONVENÇÃO DA ORGANIZAÇÃO] | `full_name` | DATA-MODEL.md, migrations, ORM |

> ⚠️ Informe aqui a convenção de banco de dados da sua organização
> antes de usar este arquivo em qualquer sessão.

---

## Campos globais obrigatórios em toda tabela

| Label Dev | Campo banco | Tipo | Notas |
|---|---|---|---|
| id | id | uuid | PK; gerado automaticamente |
| organizationId | organization_id | uuid | FK → organizations; multitenancy |
| createdAt | created_at | timestamptz | Gerado automaticamente |
| updatedAt | updated_at | timestamptz | Atualizado automaticamente |
| deletedAt | deleted_at | timestamptz | Soft delete; null = ativo |

---

## Regras globais de negócio

1. **Soft delete universal**: registros nunca são removidos fisicamente
2. **IDs em URLs**: sempre UUID — nunca IDs sequenciais
3. **Paginação**: sempre cursor-based; padrão 20 itens; teto 100
4. **Validação**: Zod em frontend e backend; nunca confiar apenas no client
5. **Auditoria**: ações críticas sempre registradas em `AuditLog`
6. **Eventos internos**: módulos comunicam-se via eventos, nunca chamadas diretas

---

## Padrão de resposta de API

```typescript
// Sucesso com dado único
{ "data": { ...objeto }, "meta": null }

// Sucesso com lista
{ "data": [...], "meta": { "total": 0, "nextCursor": null, "prevCursor": null } }

// Erro
{ "data": null, "error": { "code": "ENTIDADE_ERRO", "message": "...", "details": [] } }
```

---

## O que NUNCA fazer

- Usar `any` no TypeScript
- Expor IDs sequenciais do banco em URLs ou respostas
- Retornar senhas ou tokens em respostas, mesmo hasheados
- Fazer query sem filtrar por `organization_id`
- Remover registros fisicamente do banco
- Lançar exceções cruas — sempre retornar envelope de erro padronizado
- Chamar diretamente outro módulo — usar eventos internos
- Duplicar Label Dev ou campo banco nos N3 — essas informações vivem apenas no DATA-MODEL.md
---

## Arquivos globais de referência

| Arquivo | Propósito |
|---|---|
| `global/MASTER.md` | Stack, convenções globais (este arquivo) |
| `global/DATA-MODEL.md` | Índice de entidades + campos globais + enums |
| `global/SIZING.md` | Convenções de contagem APF e COSMIC |
| `global/RULES-DICTIONARY.md` | Regras de negócio canônicas |
| `global/FIELD-DICTIONARY.md` | Campos canônicos (CPF, CEP, e-mail…) |
| `global/ERROR-DICTIONARY.md` | Fonte única de códigos de erro |
| `global/API-PATTERNS.md` | Padrões de API |
| `global/DESIGN-SYSTEM.md` | Padrões de UI |
