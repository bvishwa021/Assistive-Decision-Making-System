import { FEATURES } from "./FeatureConfig.js";

/**
 * Converts user input object into a numerical vector
 * in a fixed, model-compatible order.
 */

export function encodeInput(inputObject) {
  return FEATURES.map((feature) => inputObject[feature.key]);
}
