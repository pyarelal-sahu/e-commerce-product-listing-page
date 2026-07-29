import { keyframes } from "@mui/system";

/**
 * Keyframes for a soft upward fade-in entrance.
 */
export const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(1rem) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

/**
 * Keyframes for toolbar intro motion.
 */
export const fadeSlideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-0.75rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/**
 * Calculates stagger delay for list animations.
 *
 * @param {number} index Zero-based item index.
 * @param {number} step Delay increment in milliseconds.
 * @param {number} max Maximum delay in milliseconds.
 * @returns {string} Delay value with ms unit.
 */
export function getStaggerDelay(index, step = 70, max = 420) {
  return `${Math.min(index * step, max)}ms`;
}
