export function capitalize (str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

export function formatDate(dateString) {
    const date = new Date(dateString);
  
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  