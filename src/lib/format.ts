/** "July 7, 2026" (UTC, so a date-only frontmatter value never shifts a day). */
export const formatDate = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
