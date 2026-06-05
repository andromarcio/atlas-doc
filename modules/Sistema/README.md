# Sistema

**Nível 1 — Domínio**
**ID**: SIS

---

## Responsabilidade

### O que esta área faz

Gerencia o cadastro de sistemas, concentrando todas as informações gerais e tecnológicas de cada sistema registrado. O sistema é o ponto de partida para a especificação de requisitos, contagens e demais informações de projeto.

### O que esta área NÃO faz

Não realiza gestão de requisitos, contagens de pontos de função ou qualquer outra disciplina derivada. Essas responsabilidades pertencem a outras áreas.

---

## Feature Sets

| ID | Nome | Descrição |
|---|---|---|
| SIS-001 | Manter Sistema | Permite ao usuário incluir, editar e inativar o cadastro de sistemas, incluindo informações gerais como sigla, apelido e tecnologia. |

---

## Regras Transversais de Negócio

1. **Sigla única**: Todo sistema deve possuir uma sigla composta por exatamente 5 caracteres alfanuméricos. Não podem existir dois sistemas com a mesma sigla dentro da organização.
2. **Apelido**: Todo sistema pode ter um apelido, que representa o nome pelo qual o sistema é conhecido informalmente.
3. **Soft delete**: Sistemas não são removidos permanentemente — apenas inativados.
4. **Multitenancy**: Todos os sistemas pertencem a uma organização; nenhuma consulta ou operação é realizada sem esse vínculo.

---

## Dependências com Outras Áreas

> Esta área não possui dependências de entrada ou saída com outros domínios no momento.

⚠️ Suposto que futuramente os domínios de Requisitos, Contagens e demais disciplinas dependerão do cadastro de Sistema como ponto de partida — a relação inversa (SIS dependendo de outros domínios) não foi identificada.

---

## Seções reservadas para o PROMPT 1B

- Entidades e campos
- Integrações técnicas

---

# modules/INDEX.md — Visão Negocial

---

## Domínios mapeados

| ID | Domínio | Responsabilidade | Feature Sets |
|---|---|---|---|
| SIS | Sistemas | Gerencia o cadastro de sistemas, concentrando informações gerais e tecnológicas. É o ponto de partida para requisitos, contagens e demais informações de projeto. | SIS-001 · Manter Sistema |

---

## Mapa de dependências entre domínios

```
SIS ──► (nenhuma dependência de saída identificada)

(futuros domínios de Requisitos, Contagens etc.) ──► SIS
```

> ⚠️ Os domínios dependentes de SIS ainda não foram mapeados nesta sessão.
> À medida que novos domínios forem especificados, este mapa deve ser atualizado.

---

## Regras que cruzam mais de um domínio

| Regra | Domínios envolvidos | Descrição |
|---|---|---|
| Ponto de partida do projeto | SIS + futuros domínios | Todo artefato de requisito, contagem ou disciplina de projeto deve estar vinculado a um sistema previamente cadastrado. |

---

> **Próximo passo**: Parte negocial do N1 concluída para o domínio SIS.
> Para complementar com campos, entidades e integrações técnicas, use o **PROMPT 1B**
> passando o `modules/SIS/README.md` gerado aqui como contexto.
