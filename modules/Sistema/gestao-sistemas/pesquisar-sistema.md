# Feature: Pesquisar Sistema

**Nível 3 — Feature (Negocial)**
**ID**: SIS-001-01

---

## Descrição

Permite ao usuário interno localizar sistemas cadastrados na organização por meio de filtros de pesquisa. Ao acessar a tela, os últimos 30 sistemas cadastrados são exibidos automaticamente, sem necessidade de ação prévia do usuário.

---

## Campos

### Campos de filtro (preenchidos pelo usuário)

| Label PO | Tipo | Obrigatório | Validação |
|---|---|---|---|
| Nome | Texto | Não | Busca parcial (contém); sem restrição de caracteres especiais; máximo 255 caracteres |
| Sigla | Texto | Não | Busca parcial (contém); aceita apenas caracteres alfanuméricos; máximo 5 caracteres |

### Campos exibidos no resultado

| Label PO | Tipo | Observação |
|---|---|---|
| ID | Texto | Identificador único do sistema; exibido no formato UUID |
| Nome | Texto | Nome completo do sistema |
| Sigla | Texto | Sigla de 5 caracteres alfanuméricos |
| Quantidade de Funcionalidades | Número | Total de funcionalidades registradas para o sistema |
| Tamanho Baseline | Número | Tamanho baseline registrado para o sistema |
| Total PF Mensurados | Número | Total de pontos de função mensurados para o sistema |

### Campos automáticos

| Label PO | Valor | Quando |
|---|---|---|
| Resultados iniciais | Últimos 30 sistemas cadastrados na organização | Ao acessar a tela, antes de qualquer pesquisa |

---

## Regras de Negócio

1. Ao acessar a tela, o sistema exibe automaticamente os últimos 30 sistemas cadastrados, ordenados por data de criação decrescente, sem que o usuário precise acionar a pesquisa.
2. Os filtros **Nome** e **Sigla** podem ser usados isoladamente ou em combinação. Nenhum filtro é obrigatório.
3. A pesquisa é executada quando o usuário acionar o botão de pesquisa ou pressionar Enter.
4. A busca por **Nome** utiliza correspondência parcial (contém), sem distinção entre maiúsculas e minúsculas.
5. A busca por **Sigla** utiliza correspondência parcial (contém), sem distinção entre maiúsculas e minúsculas.
6. Apenas sistemas da organização do usuário autenticado são retornados — nunca sistemas de outras organizações.
   → ver N1 (SIS): Regras Transversais: Multitenancy
7. Sistemas marcados como excluídos (soft delete) **não** aparecem nos resultados.
   → ver MASTER.md: Regra global: Soft delete universal
8. A paginação segue o padrão global: cursor-based, 20 itens por página, teto de 100.
   → ver MASTER.md: Regra global: Paginação
9. A ação de pesquisa **não** é registrada no histórico de auditoria.
10. Apenas usuários com permissão de **Administrador** podem acessar esta funcionalidade.
    → ver N2 (SIS-001): Permissões por Perfil

---

## Cenários Gherkin

```gherkin
Feature: Pesquisar Sistema
  Como usuário interno com perfil Administrador
  Quero pesquisar sistemas cadastrados
  Para localizar rapidamente um sistema pelo nome ou sigla

  # ── Acesso e carregamento inicial ────────────────────────────

  Scenario: Exibição automática dos últimos 30 sistemas ao acessar a tela
    Given que o usuário autenticado possui perfil Administrador
    And existem sistemas cadastrados na organização
    When o usuário acessa a tela "Pesquisar Sistema"
    Then o sistema exibe automaticamente os últimos 30 sistemas cadastrados
    And os resultados estão ordenados por data de criação decrescente
    And os campos "ID", "Nome", "Sigla", "Quantidade de Funcionalidades",
        "Tamanho Baseline" e "Total PF Mensurados" são exibidos para cada registro

  Scenario: Exibição da tela quando não há sistemas cadastrados
    Given que o usuário autenticado possui perfil Administrador
    And não existem sistemas cadastrados na organização
    When o usuário acessa a tela "Pesquisar Sistema"
    Then o sistema exibe a área de resultados no estado vazio
    And exibe a mensagem: "Nenhum sistema cadastrado. Clique em 'Incluir Sistema' para começar."

  # ── Pesquisa com filtros ──────────────────────────────────────

  Scenario: Pesquisa por nome com resultado encontrado
    Given que o usuário autenticado possui perfil Administrador
    And existe ao menos um sistema cujo nome contém "Atlas"
    When o usuário preenche "Nome" com "Atlas"
    And aciona a pesquisa
    Then o sistema exibe apenas os sistemas cujo nome contém "Atlas"
    And os campos de resultado são exibidos para cada registro retornado

  Scenario: Pesquisa por sigla com resultado encontrado
    Given que o usuário autenticado possui perfil Administrador
    And existe ao menos um sistema cuja sigla contém "ATL"
    When o usuário preenche "Sigla" com "ATL"
    And aciona a pesquisa
    Then o sistema exibe apenas os sistemas cuja sigla contém "ATL"

  Scenario: Pesquisa combinando nome e sigla
    Given que o usuário autenticado possui perfil Administrador
    When o usuário preenche "Nome" com "Atlas" e "Sigla" com "ATL01"
    And aciona a pesquisa
    Then o sistema exibe apenas os sistemas que atendem simultaneamente
         aos dois critérios informados

  Scenario: Pesquisa sem preencher nenhum filtro
    Given que o usuário autenticado possui perfil Administrador
    When o usuário aciona a pesquisa sem preencher nenhum filtro
    Then o sistema exibe os últimos 30 sistemas cadastrados na organização

  Scenario: Pesquisa sem resultado
    Given que o usuário autenticado possui perfil Administrador
    When o usuário preenche "Nome" com "SistemaNãoExistente"
    And aciona a pesquisa
    Then o sistema exibe a área de resultados no estado vazio
    And exibe a mensagem: "Nenhum sistema encontrado para os filtros informados."

  # ── Isolamento por organização ────────────────────────────────

  Scenario: Resultado exibe apenas sistemas da organização do usuário
    Given que o usuário autenticado pertence à organização "Empresa A"
    And existem sistemas cadastrados tanto para "Empresa A" quanto para "Empresa B"
    When o usuário acessa a tela "Pesquisar Sistema"
    Then o sistema exibe apenas os sistemas pertencentes à "Empresa A"
    And nenhum sistema de "Empresa B" é exibido

  # ── Exclusão lógica ───────────────────────────────────────────

  Scenario: Sistemas excluídos não aparecem nos resultados
    Given que existe um sistema com exclusão lógica registrada
    When o usuário realiza uma pesquisa que localizaria esse sistema
    Then o sistema excluído não aparece nos resultados

  # ── Controle de acesso ────────────────────────────────────────

  Scenario: Usuário sem permissão tenta acessar a tela
    Given que o usuário autenticado não possui perfil Administrador
    When o usuário tenta acessar a tela "Pesquisar Sistema"
    Then o sistema exibe uma tela de erro
    And exibe a mensagem: "Você não tem permissão para acessar esta funcionalidade."
    And o usuário não visualiza nenhum dado de sistema

  # ── Paginação ─────────────────────────────────────────────────

  Scenario: Resultado com mais de 20 registros exibe paginação
    Given que a pesquisa retorna mais de 20 sistemas
    When o resultado é exibido
    Then o sistema pagina os resultados com no máximo 20 registros por página
    And exibe o controle de navegação entre páginas
```

---

## Comportamento de Tela

**Localização**: página própria, rota `/sistemas`, acessada pelo menu principal.

**Layout**:
- Área superior: campos de filtro (Nome, Sigla) dispostos horizontalmente, seguidos do botão "Pesquisar" (ação primária) e do botão "Incluir Sistema" (ação secundária).
- Área central: tabela de resultados com as colunas ID, Nome, Sigla, Quantidade de Funcionalidades, Tamanho Baseline e Total PF Mensurados. A última coluna exibe as ações disponíveis por registro (Visualizar, Editar, Excluir, Ativar/Inativar).
- Rodapé da tabela: controle de paginação.

**Durante o carregamento**: exibir skeleton na área da tabela enquanto os dados são buscados.

**Estado vazio — sem sistemas cadastrados**: ícone ilustrativo + título "Nenhum sistema cadastrado" + descrição "Clique em 'Incluir Sistema' para começar" + botão "Incluir Sistema".

**Estado vazio — pesquisa sem resultado**: ícone ilustrativo + título "Nenhum sistema encontrado" + descrição "Nenhum sistema encontrado para os filtros informados." Sem botão de ação.

**Erro de carregamento**: ícone de erro + mensagem "Não foi possível carregar os sistemas. Tente novamente." + botão "Tentar novamente".

**Sem permissão**: tela de erro com a mensagem "Você não tem permissão para acessar esta funcionalidade."

**Feedback de ações iniciadas a partir desta tela** (Excluir, Ativar/Inativar): toast no canto superior direito confirmando a conclusão da ação, com duração de 4–5 segundos.

---

## Seções reservadas para o PROMPT 3B

- Mapeamento de campos (dev-only — referência ao DATA-MODEL.md)
- Cenários técnicos (dev-only)
- Endpoints (dev-only)
- Eventos e AuditLog (dev-only)
- Arquivos e dependências (dev-only)
