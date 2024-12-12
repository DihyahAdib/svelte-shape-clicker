// disableAnimation ts file
import { writable } from "svelte/store";
export async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export const disableAnimationForShapes = writable(
  JSON.parse(localStorage.getItem("disableAnimationForShapes") ?? "false")
);

export function toggleSpinAnimation() {
  disableAnimationForShapes.update((value) => {
    const newValue = !value;
    localStorage.setItem("disableAnimationForShapes", JSON.stringify(newValue));
    return newValue;
  });
}
