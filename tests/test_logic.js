// Tests for src/logic.js — pure keyboard event functions

const { KEY_NAMES, MODIFIERS, SPECIALS, keyName, keyCategory, pruneTokens } = require('../src/logic.js');

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    passed++;
  } catch (e) {
    failed++;
    console.error(`  FAIL: ${description} — ${e.message}`);
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'assertion failed');
}

function assertEqual(actual, expected, msg) {
  if (actual !== expected) {
    throw new Error(msg || `expected "${expected}", got "${actual}"`);
  }
}

// ── keyName ──
console.log('\nkeyName:');

test('Space → "Space"', () => {
  assertEqual(keyName(' '), 'Space');
});

test('ArrowUp → "↑"', () => {
  assertEqual(keyName('ArrowUp'), '↑');
});

test('ArrowDown → "↓"', () => {
  assertEqual(keyName('ArrowDown'), '↓');
});

test('ArrowLeft → "←"', () => {
  assertEqual(keyName('ArrowLeft'), '←');
});

test('ArrowRight → "→"', () => {
  assertEqual(keyName('ArrowRight'), '→');
});

test('Escape → "Esc"', () => {
  assertEqual(keyName('Escape'), 'Esc');
});

test('Backspace → "⌫"', () => {
  assertEqual(keyName('Backspace'), '⌫');
});

test('Delete → "⌦"', () => {
  assertEqual(keyName('Delete'), '⌦');
});

test('Enter → "↵"', () => {
  assertEqual(keyName('Enter'), '↵');
});

test('F1-F12 returned as-is', () => {
  assertEqual(keyName('F1'), 'F1');
  assertEqual(keyName('F12'), 'F12');
});

test('regular character returned as-is', () => {
  assertEqual(keyName('a'), 'a');
  assertEqual(keyName('A'), 'A');
  assertEqual(keyName('1'), '1');
});

test('Control returned as-is', () => {
  assertEqual(keyName('Control'), 'Control');
});

// ── keyCategory ──
console.log('\nkeyCategory:');

test('Control → modifier-tok', () => {
  assertEqual(keyCategory('Control'), 'modifier-tok');
});

test('Alt → modifier-tok', () => {
  assertEqual(keyCategory('Alt'), 'modifier-tok');
});

test('Shift → modifier-tok', () => {
  assertEqual(keyCategory('Shift'), 'modifier-tok');
});

test('Meta → modifier-tok', () => {
  assertEqual(keyCategory('Meta'), 'modifier-tok');
});

test('AltGraph → modifier-tok', () => {
  assertEqual(keyCategory('AltGraph'), 'modifier-tok');
});

test('Enter → special', () => {
  assertEqual(keyCategory('Enter'), 'special');
});

test('Backspace → special', () => {
  assertEqual(keyCategory('Backspace'), 'special');
});

test('Arrow keys → special', () => {
  assertEqual(keyCategory('ArrowUp'), 'special');
  assertEqual(keyCategory('ArrowDown'), 'special');
});

test('F-keys → special', () => {
  assertEqual(keyCategory('F1'), 'special');
  assertEqual(keyCategory('F12'), 'special');
});

test('regular character → regular', () => {
  assertEqual(keyCategory('a'), 'regular');
  assertEqual(keyCategory('1'), 'regular');
  assertEqual(keyCategory('.'), 'regular');
});

// ── pruneTokens ──
console.log('\npruneTokens:');

test('does nothing when under max', () => {
  const arr = ['a', 'b', 'c'];
  pruneTokens(arr, 10, 5);
  assertEqual(arr.length, 3);
});

test('prunes to (max - pruneCount) when hitting max', () => {
  const arr = [];
  for (let i = 0; i < 20; i++) arr.push(`token-${i}`);
  pruneTokens(arr, 20, 5);
  assertEqual(arr.length, 15, `should be 15, got ${arr.length}`);
  assertEqual(arr[0], 'token-5', 'first remaining should be token-5');
});

test('prunes exactly one round', () => {
  const arr = [];
  for (let i = 0; i < 100; i++) arr.push(`x-${i}`);
  pruneTokens(arr, 100, 20);
  assertEqual(arr.length, 80);
  assertEqual(arr[0], 'x-20');
});

// ── Summary ──
console.log(`\n${'─'.repeat(40)}`);
console.log(`Passed: ${passed}, Failed: ${failed}`);
console.log(`${'─'.repeat(40)}`);

process.exit(failed > 0 ? 1 : 0);
