// 360° turntable frames per car. Generated via AI from the base hero image.
// Only cars present in this map get a real 360° spin; others fall back to the static hero.

const cc8sFrames = Array.from({ length: 17 }, (_, i) =>
  new URL(`../assets/cars/360/cc8s/frame-${String(i).padStart(2, "0")}.png`, import.meta.url).href,
);

export const CAR_360: Record<string, string[]> = {
  cc8s: cc8sFrames,
};