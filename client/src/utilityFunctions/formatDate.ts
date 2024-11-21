export function formatDate(date: string): string {
    const formattedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    return formattedDate.toLocaleDateString('en-US', options);
  }