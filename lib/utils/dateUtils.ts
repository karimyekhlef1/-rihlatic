export function formatFlightDate(date: string): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  });
}

export function formatFlightTime(time: string): string {
  return time || '';
}

export function calculateTotalDuration(durations: string[]): string {
  let totalMinutes = 0;
  
  durations.forEach(duration => {
    const [hours, minutes] = duration.split(':').map(Number);
    totalMinutes += hours * 60 + minutes;
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return `${hours}h ${minutes}m`;
}

export function calculateNights(segments: any[]): number {
  if (!segments || segments.length === 0) return 0;
  
  const firstSegment = segments[0][0];
  const lastSegment = segments[segments.length - 1][segments[segments.length - 1].length - 1];
  
  if (!firstSegment.boardDate || !lastSegment.offDate) return 0;
  
  const boardDate = new Date(firstSegment.boardDate);
  const offDate = new Date(lastSegment.offDate);
  
  const diffTime = Math.abs(offDate.getTime() - boardDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
