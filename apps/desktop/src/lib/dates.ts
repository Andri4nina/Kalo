export function formatDate(unixSeconds: number | null): string {
  if (!unixSeconds) return "Jamais";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(unixSeconds * 1000));
}

export function formatRelative(unixSeconds: number): string {
  const minutes = Math.max(0, Math.floor(Date.now() / 1000 - unixSeconds) / 60);
  if (minutes < 60) return "À l'instant";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days} j`;
}
