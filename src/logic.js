// Pure functions for keyboard event processing

const KEY_NAMES = {
  ' ': 'Space',
  'ArrowUp': '↑',
  'ArrowDown': '↓',
  'ArrowLeft': '←',
  'ArrowRight': '→',
  'Escape': 'Esc',
  'Backspace': '⌫',
  'Delete': '⌦',
  'Enter': '↵',
  'CapsLock': 'Caps',
  'PageUp': 'PgUp',
  'PageDown': 'PgDn',
  'Insert': 'Ins',
  'Home': 'Home',
  'End': 'End',
  'NumLock': 'NumLk',
  'ScrollLock': 'ScrLk',
  'PrintScreen': 'PrtSc',
  'Pause': 'Pause',
  'ContextMenu': 'Menu',
};

const MODIFIERS = new Set(['Control', 'Alt', 'Shift', 'Meta']);

const SPECIALS = new Set([
  'Enter', 'Backspace', 'Delete', 'Escape', 'Tab', 'CapsLock',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'Home', 'End', 'PageUp', 'PageDown', 'Insert',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  'NumLock', 'ScrollLock', 'PrintScreen', 'Pause', 'ContextMenu',
]);

function keyName(eventKey) {
  if (KEY_NAMES[eventKey]) return KEY_NAMES[eventKey];
  if (/^F\d{1,2}$/.test(eventKey)) return eventKey;
  return eventKey.length === 1 ? eventKey : eventKey;
}

function keyCategory(eventKey) {
  if (MODIFIERS.has(eventKey)) return 'modifier-tok';
  if (SPECIALS.has(eventKey)) return 'special';
  if (/^F\d{1,2}$/.test(eventKey)) return 'special';
  return 'regular';
}

function pruneTokens(tokens, maxTokens, pruneCount) {
  while (tokens.length >= maxTokens) {
    tokens.shift();
    pruneCount--;
  }
  while (tokens.length > maxTokens - pruneCount) {
    tokens.shift();
  }
  return tokens;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KEY_NAMES, MODIFIERS, SPECIALS, keyName, keyCategory, pruneTokens };
}
