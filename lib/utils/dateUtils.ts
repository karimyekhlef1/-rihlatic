export function formatFlightDate(date: string): string {
  if (!date) return '';
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short'
    });
  } catch (error) {
    console.error('Error formatting flight date:', error);
    return '';
  }
}

export function formatFlightTime(time: string): string {
  if (!time) return '--:--';
  try {
    // Handle both HH:mm and H:mm formats
    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      console.error('Invalid time format:', time);
      return '--:--';
    }
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error formatting flight time:', error);
    return '--:--';
  }
}

export function calculateArrivalTime(depTime: string, duration: string): string {
  if (!depTime || !duration) return '--:--';
  
  try {
    // Parse departure time
    const [depHours, depMinutes] = depTime.split(':').map(Number);
    if (isNaN(depHours) || isNaN(depMinutes) || depHours < 0 || depHours > 23 || depMinutes < 0 || depMinutes > 59) {
      console.error('Invalid departure time:', depTime);
      return '--:--';
    }

    // Parse duration
    const [durationHours, durationMinutes] = duration.split(':').map(Number);
    if (isNaN(durationHours) || isNaN(durationMinutes)) {
      console.error('Invalid duration:', duration);
      return '--:--';
    }

    // Calculate total minutes
    let totalMinutes = (depHours * 60 + depMinutes) + (durationHours * 60 + durationMinutes);
    
    // Handle day overflow
    totalMinutes = totalMinutes % (24 * 60);
    
    // Convert back to hours and minutes
    const arrHours = Math.floor(totalMinutes / 60);
    const arrMinutes = totalMinutes % 60;
    
    return `${arrHours.toString().padStart(2, '0')}:${arrMinutes.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error calculating arrival time:', error);
    return '--:--';
  }
}

export function calculateTotalDuration(durations: string[]): string {
  if (!durations?.length) return '--h --m';
  
  try {
    let totalMinutes = 0;
    durations.forEach(duration => {
      if (!duration) return;
      const [hours, minutes] = duration.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
        totalMinutes += hours * 60 + minutes;
      }
    });

    if (totalMinutes === 0) return '--h --m';
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  } catch (error) {
    console.error('Error calculating duration:', error);
    return '--h --m';
  }
}

export function calculateNights(segments: any[]): number {
  if (!segments || segments.length === 0) return 0;
  
  try {
    const firstSegment = segments[0][0];
    const lastSegment = segments[segments.length - 1][segments[segments.length - 1].length - 1];
    
    if (!firstSegment.boardDate || !lastSegment.offDate) return 0;
    
    const boardDate = new Date(firstSegment.boardDate);
    const offDate = new Date(lastSegment.offDate);
    
    if (isNaN(boardDate.getTime()) || isNaN(offDate.getTime())) return 0;
    
    const diffTime = Math.abs(offDate.getTime() - boardDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error('Error calculating nights:', error);
    return 0;
  }
}
