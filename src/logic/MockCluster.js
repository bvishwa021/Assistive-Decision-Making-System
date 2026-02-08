/**
 * Temporary mock function.
 * Later this will be replaced by real ML inference.
 */
export function getMockCluster(encodedVector) {
  const sum = encodedVector.reduce((a, b) => a + b, 0);

  if (sum <= 8) return 0;
  if (sum <= 12) return 1;
  if (sum <= 16) return 2;
  return 3;
}
