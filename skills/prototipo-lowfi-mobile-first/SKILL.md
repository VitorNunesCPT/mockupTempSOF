---
name: prototipo-lowfi-mobile-first
description: Criar prototipos de baixa fidelidade, simples e navegaveis, sempre com abordagem mobile-first e breakpoint base X-small (<576px). Usar quando o usuario pedir wireframe/mockup rapido de fluxo de telas, prototipo HTML/CSS/JS sem alta fidelidade, ou adaptacao de layout para prioridade em celular.
---

# Prototipo Lowfi Mobile First

## Objetivo

Transformar requisitos de fluxo em prototipo clicavel de baixa fidelidade, com foco em velocidade de entrega e clareza funcional.

## Fluxo Padrao

1. Mapear telas, campos, tabelas, botoes e transicoes.
2. Criar estrutura minima de arquivos:
   - `index-mobile.html`
   - `styles-mobile.css`
   - `script-mobile.js`
3. Implementar layout base em X-small sem depender de media query.
4. Implementar navegacao entre telas, abas e modais.
5. Adicionar breakpoints progressivos por `min-width`.
6. Validar sintaxe JS com `node --check script-mobile.js`.

## Regras Obrigatorias

- Projetar em mobile-first por padrao.
- Definir X-small como base (`<576px`).
- Usar breakpoints progressivos:
  - `sm`: `@media (min-width: 576px)`
  - `md`: `@media (min-width: 768px)`
  - `lg`: `@media (min-width: 992px)`
- Manter baixa fidelidade:
  - Usar visual simples, sem foco em pixel-perfect.
  - Priorizar hierarquia, fluxo e estados (lista, detalhe, modal).
- Evitar dependencia de framework quando nao for necessario.

## Padrao de Estrutura de Tela

- Home:
  - Usar abas para separar etapas do fluxo.
  - Mostrar lista em cards no X-small.
  - Mostrar tabela completa a partir de `md`.
- Detalhe:
  - Mostrar metadados principais no topo.
  - Mostrar blocos textuais por secao (ex.: resposta, complemento, referencias).
  - Mostrar botoes de acao por status.
- Modal:
  - Abrir para captura de datas e confirmacao de etapa.
  - Reaproveitar componente visual para acoes similares.

## Comportamento Minimo

- Clicar em item da lista/tabela para abrir detalhe.
- Acionar botao de submissao para abrir modal de data.
- Acionar botao de publicacao para abrir modal com duas datas.
- Atualizar status e datas em memoria no prototipo.
- Retornar para Home mantendo aba ativa.

## Entregavel Esperado

Entregar prototipo funcional simples com:

- navegacao entre telas;
- modais operacionais;
- dados de exemplo;
- layout mobile-first com X-small como base;
- adaptacao para telas maiores via breakpoints.

## Checklist Rapido

- Confirmar que a base CSS e X-small.
- Confirmar que as media queries sao `min-width`.
- Confirmar que o fluxo principal esta navegavel.
- Confirmar que o JS esta sem erro de sintaxe.
