/// <reference types="svelte" />
export {};

declare global {
  interface Window {
    getState: () => GameState;
  }
}