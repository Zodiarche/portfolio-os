/** Removes a known file extension (.exe/.txt/.pdf) from a display title. */
export function stripExtension(title: string): string {
  return title.replace(/\.(exe|txt|pdf)$/i, "");
}
