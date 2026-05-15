import '@testing-library/jest-dom'

// Node.js 25 ships a native (stub) localStorage/sessionStorage that lacks
// the standard Web Storage API methods (.clear, .setItem, .getItem, etc.).
// We replace both with a fully-functional in-memory implementation so that
// tests relying on localStorage work correctly under jsdom + Node 25.
function createLocalStorageMock() {
  let store: Record<string, string> = {}
  return {
    get length() { return Object.keys(store).length },
    key(index: number) { return Object.keys(store)[index] ?? null },
    getItem(key: string) { return key in store ? store[key] : null },
    setItem(key: string, value: string) { store[key] = String(value) },
    removeItem(key: string) { delete store[key] },
    clear() { store = {} },
  }
}

const localStorageMock = createLocalStorageMock()
const sessionStorageMock = createLocalStorageMock()

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
})

Object.defineProperty(globalThis, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true,
  configurable: true,
})
