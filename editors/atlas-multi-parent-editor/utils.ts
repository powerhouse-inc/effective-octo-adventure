/**
 * Extract the docNo from a title in format "docNo - Document Name"
 * @param title - The title containing the docNo
 * @returns The docNo or null if no separator found
 */
export function extractDocNoFromTitle(title: string): string | null {
  const separatorIndex = title.indexOf(" - ");
  if (separatorIndex === -1) {
    return null;
  }

  const docNo = title.slice(0, separatorIndex);
  return docNo;
}
