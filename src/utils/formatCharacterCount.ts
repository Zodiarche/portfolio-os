function pluralSuffix(count: number): string {
  return count > 1 ? "s" : "";
}

/**
 * Counts down while there is room left, then says by how much the text overflows.
 * Wording follows the GOV.UK character count, which lets people paste a long answer
 * and edit it down rather than losing the overflow.
 */
export function formatCharacterCount(length: number, maxLength: number): string {
  const remaining = maxLength - length;

  if (remaining < 0) {
    const excess = -remaining;
    return `${excess} caractère${pluralSuffix(excess)} de trop`;
  }

  return `Il vous reste ${remaining} caractère${pluralSuffix(remaining)}`;
}
