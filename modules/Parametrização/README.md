# Domínio: Parametrização

**Nível 1 — N1 Negócio**
**ID:** PAR

---

## Responsabilidade

**O que faz:**
Gerencia o cadastro e a manutenção dos parâmetros que governam o comportamento do sistema, incluindo parâmetros gerais, métodos de contagem e as configurações da máquina de estado.

**O que não faz:**
Não executa contagens nem realiza o cadastro de sistemas — limita-se a disponibilizar as configurações que outras áreas consomem para operar.

---

## Feature Sets

| ID | Nome | Descrição |
|---|---|---|
| PAR-001 | Manter Parâmetros Gerais | Cadastro e manutenção dos parâmetros globais que controlam o comportamento geral do sistema. |
| PAR-002 | Manter Métodos de Contagem | Cadastro e manutenção dos métodos de contagem disponíveis para uso nas demais áreas. |
| PAR-003 | Manter Máquina de Estado | Cadastro e manutenção dos estados, transições e regras que definem o ciclo de vida dos processos do sistema. |

---

## Regras Transversais de Negócio

- Alterações em qualquer parâmetro devem ser registradas para fins de rastreabilidade, dado o impacto sistêmico que mudanças de configuração podem causar.
- ⚠️ Supõe-se que parâmetros ativos não possam ser excluídos enquanto estiverem em uso por outras áreas — validar com PO.
- ⚠️ Supõe-se que ao menos um método de contagem deve estar ativo em todo momento — validar com PO.

---

## Dependências com Outras Áreas

**Esta área depende de:**
- ⚠️ Nenhuma dependência identificada nos insumos fornecidos — validar se alguma área fornece informações para compor os parâmetros.

**Outras áreas dependem desta:**
- As demais áreas do sistema consomem os parâmetros gerais para definir seu comportamento operacional.
- As áreas que realizam contagem consultam os métodos de contagem cadastrados aqui para saber quais abordagens estão disponíveis.
- As áreas que possuem ciclo de vida de processos consultam a máquina de estado para determinar quais transições são permitidas em cada situação.

---

## Seções reservadas para o N1 Técnico (PROMPT 1B)

- Entidades e campos
- Integrações técnicas
