
export const extractDocNoAndTitle = (docNo: string, name: string) => {
  if (name.length > 0) {
    return [docNo.trim(), name.trim()];
  }

  const dashPosition = docNo.indexOf('-');
  if (dashPosition < 0) {
    return [docNo.trim(), name.trim()];
  }

  return [
    docNo.substring(0, dashPosition).trim(),
    docNo.substring(dashPosition + 1).trim(),
  ];
}