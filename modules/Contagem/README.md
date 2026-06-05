# Domínio: Contagem

**Nível 1 — Negocial**
**ID:** CTG

---

## Responsabilidade

**O que faz:**
Gerencia as contagens realizadas para os sistemas, suportando múltiplos métodos de medição (PF, SNAP, COSMIC ou qualquer outro método parametrizado no sistema).

**O que não faz:**
Não é responsável por parametrizar os métodos de contagem nem por gerenciar os sistemas que são objeto das contagens — essas responsabilidades pertencem a outras áreas.

---

## Feature Sets

| ID | Nome | Descrição |
|---|---|---|
| CTG-001 | Manter Contagem | Criação, edição e gestão do ciclo de vida das contagens realizadas para os sistemas, independentemente do método utilizado. |
| CTG-002 | Dashboard de Priorização | Visão consolidada que apoia a priorização das contagens pendentes ou em andamento, oferecendo indicadores para tomada de decisão. |
| CTG-003 | Realizar Processo de Divergência | Condução do fluxo de análise e resolução quando há divergência entre contagens de um mesmo escopo, garantindo rastreabilidade do resultado final. |
| CTG-004 | Manter Baseline de Contagem | Registro e gestão dos baselines associados às contagens, preservando os marcos de referência para comparações e auditorias futuras. |

---

## Regras Transversais de Negócio

- Toda contagem está obrigatoriamente associada a um sistema e a um método de contagem previamente parametrizado no sistema.
- O método de contagem de uma contagem não pode ser alterado após sua criação.
- Contagens participam do processo de divergência sempre que dois ou mais resultados para o mesmo escopo apresentarem valores incompatíveis, conforme critérios definidos pelo método utilizado.
- Ações críticas sobre contagens (criação, encerramento, resolução de divergência, geração de baseline) devem ser registradas em auditoria.

---

## Dependências com Outras Áreas

| Direção | Área | Descrição da dependência |
|---|---|---|
| Depende de | Sistemas | A área de Contagem precisa que os sistemas estejam cadastrados para que uma contagem possa ser associada a eles. |
| Depende de | Métodos / Parametrização | Os métodos de contagem (PF, SNAP, COSMIC etc.) precisam estar parametrizados antes que uma contagem possa ser iniciada. |
| Fornece para | Outras áreas consumidoras | Os resultados e baselines de contagem podem ser consumidos por áreas responsáveis por indicadores, contratos ou planejamento de capacidade. |

> ⚠️ As áreas "Sistemas" e "Métodos / Parametrização" foram inferidas a partir da descrição do domínio e do que ele explicitamente declara não fazer. Confirme se essas áreas existem como domínios separados no sistema.

---

## Seções reservadas para o N1 Técnico (PROMPT 1B)

- Entidades e campos
- Integrações técnicas
- Eventos publicados e consumidos
