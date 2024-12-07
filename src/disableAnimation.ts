// disableAnimation ts file
import { writable } from 'svelte/store';

// Create a writable store for the disableAnimationForShapes variable
export const disableAnimationForShapes = writable(false);

// Create a function to toggle the store value
export function toggleSpinAnimation() {
    disableAnimationForShapes.update(value => !value);
}