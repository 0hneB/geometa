/** @typedef {{ type: string, depth?: number, value?: string, children?: MarkdownNode[], data?: { hProperties?: Record<string, unknown> } }} MarkdownNode */
/** @typedef {{ data: { fm?: Record<string, unknown> } }} MarkdownFile */
/** @typedef {{ depth: number, id: string, title: string }} OutlineHeading */

/** @param {MarkdownNode} node @returns {string} */
const textContent = (node) =>
  typeof node.value === 'string'
    ? node.value
    : (node.children ?? []).map((child) => textContent(child)).join('');

/** @param {string} value */
const slug = (value) =>
  value
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') || 'section';

/** @param {MarkdownNode} node @param {(node: MarkdownNode) => void} visit */
const walk = (node, visit) => {
  visit(node);
  for (const child of node.children ?? []) walk(child, visit);
};

/** @returns {(tree: MarkdownNode, file: MarkdownFile) => void} */
export const remarkHeadings = () => (tree, file) => {
  /** @type {Map<string, number>} */
  const counts = new Map();
  /** @type {OutlineHeading[]} */
  const headings = [];

  walk(tree, (node) => {
    if (node.type !== 'heading' || !node.depth || node.depth < 2 || node.depth > 3) return;

    const title = textContent(node).trim();
    const base = slug(title);
    const count = counts.get(base) ?? 0;
    const id = count ? `${base}-${count}` : base;
    counts.set(base, count + 1);

    node.data ??= {};
    node.data.hProperties = { ...node.data.hProperties, id };
    headings.push({ depth: node.depth, id, title });
  });

  file.data.fm ??= {};
  file.data.fm.headings = headings;
};
