import assert from 'node:assert/strict';
import test from 'node:test';
import { requiresLogin } from './requires-login.js';

test('keeps the legacy documentation redirect public', () => {
  assert.equal(requiresLogin('/map-making/docs/meta-uploads'), false);
  assert.equal(requiresLogin('/map-making'), true);
  assert.equal(requiresLogin('/map-making/groups/1'), true);
});
