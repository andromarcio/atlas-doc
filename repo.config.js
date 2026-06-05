/* ═══════════════════════════════════════════════════════════════
   repo.config.js  —  CONFIGURAÇÃO DO REPOSITÓRIO
   ───────────────────────────────────────────────────────────────
   Edite apenas este arquivo ao instalar o template em um novo repo.
   Tanto index.html (landing) quanto script.js (viewer) lêem daqui.
   ═══════════════════════════════════════════════════════════════ */

window.REPO_CONFIG = {

  /* ── Repositório GitHub ────────────────────────────────────── */
  owner:  'andromarcio',
  name:   'atlas-doc',
  branch: 'main',

  /* ── Landing page ──────────────────────────────────────────── */
  landing: {
    /** Tag/badge exibido acima do título hero */
    badge: 'Feature-Driven Documentation',

    /** Título hero — use <mark> para destacar uma palavra */
    title: 'Documente software por <mark>níveis</mark>,<br>do domínio à feature.',

    /** Subtítulo / lead */
    lead: `Um template de documentação FDD (N1 → N2 → N3) com design system próprio,
biblioteca de componentes e prompts orquestrados que conduzem a especificação
de negócio e técnica — do legado ao protótipo navegável.`,

    /** Cards da seção "Explorar"
     *  icon   → SVG inline (path)
     *  title  → título do card
     *  desc   → descrição curta
     *  label  → texto do link
     *  href   → URL relativa ou absoluta; use {github} como alias da URL do repo
     *  external → true abre em nova aba
     */
    cards: [
      {
        icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
        title: 'Documentação',
        desc: 'Navegue pela estrutura FDD: domínios, feature sets e features, com seções de negócio e técnica.',
        label: 'Abrir visualizador →',
        href: 'viewer.html',
      },
      {
        icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
        title: 'Biblioteca de componentes',
        desc: 'Catálogo vivo do design system sakai-ng: cores, botões, formulários, tabelas, estados e overlays.',
        label: 'Ver catálogo →',
        href: 'prototypes/_biblioteca/index.html',
      },
      {
        icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
        title: 'Protótipos',
        desc: 'Telas navegáveis (form, loading, empty, error) geradas a partir dos N3, com o shell completo.',
        label: 'Ver exemplo →',
        href: 'prototypes/exemplo-clientes/cadastro/pesquisar-clientes/form.html',
      },
      {
        icon: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
        title: 'Data Model',
        desc: 'Modelo de dados gerado de um schema SQL, fragmentado por domínio, com dimensionamento APF (IFPUG).',
        label: 'Abrir índice →',
        href: 'global/DATA-MODEL.md',
      },
      {
        icon: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
        title: 'Prompts',
        desc: 'Orquestrador de sessões que coleta insumos e executa cada etapa da documentação (R0–R2, N1–N3, SDD, QA…).',
        label: 'Ver menu de prompts →',
        href: '{github}/blob/{branch}/prompts/PROMPT_MENU.md',
        external: true,
      },
      {
        icon: '<path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.547 2.914 1.186.09-.924.35-1.547.636-1.903-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>',
        title: 'Repositório',
        desc: 'Código-fonte, automação de releases e o template completo no GitHub.',
        label: 'Abrir no GitHub →',
        href: '{github}',
        external: true,
      },
    ],

    /** Passos da seção "Como funciona" */
    steps: [
      { num: '1', title: 'Domínio (N1)', desc: 'Responsabilidades, limites e feature sets em linguagem de negócio.' },
      { num: '2', title: 'Feature Set (N2)', desc: 'Fluxo, telas e permissões — depois complementado com campos e endpoints.' },
      { num: '3', title: 'Feature (N3)', desc: 'Campos, regras e cenários Gherkin; API, eventos e AuditLog no técnico.' },
      { num: '4', title: 'Protótipo', desc: 'HTML navegável por estado, fiel ao design system, a partir do N3.' },
    ],

    /** Texto do rodapé (HTML permitido) */
    footer: `Construído com o design system <strong>sakai-ng</strong> (PrimeNG · tema Aura).`,
  },
};
