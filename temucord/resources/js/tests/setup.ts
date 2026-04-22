import '@testing-library/jest-dom/vitest';

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

(globalThis as any).ResizeObserver = ResizeObserverMock;