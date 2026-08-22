import assert from 'node:assert/strict';
import test from 'node:test';
import { remarkHeadings } from './remark-headings.js';

test('builds a stable outline with duplicate-safe heading ids', () => {
  /** @type {any} */
  const tree = {
    type: 'root',
    children: [
      { type: 'heading', depth: 1, children: [{ type: 'text', value: 'Ignored title' }] },
      { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Start here!' }] },
      {
        type: 'heading',
        depth: 3,
        children: [
          { type: 'text', value: 'API ' },
          { type: 'inlineCode', value: 'token' }
        ]
      },
      { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Start here!' }] }
    ]
  };
  /** @type {any} */
  const file = { data: { fm: { title: 'Example' } } };

  remarkHeadings()(tree, file);

  assert.deepEqual(file.data.fm.headings, [
    { depth: 2, id: 'start-here', title: 'Start here!' },
    { depth: 3, id: 'api-token', title: 'API token' },
    { depth: 2, id: 'start-here-1', title: 'Start here!' }
  ]);
  assert.equal(tree.children[1].data.hProperties.id, 'start-here');
  assert.equal(tree.children[3].data.hProperties.id, 'start-here-1');
});
