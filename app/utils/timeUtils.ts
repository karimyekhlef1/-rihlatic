export function calculateDuration(departureTime: string, arrivalTime: string): { hours: number; minutes: number } {
  // Convert times to minutes since midnight
  const [depHours, depMinutes] = departureTime.split(':').map(Number);
  const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);

  let depTotalMinutes = depHours * 60 + depMinutes;
  let arrTotalMinutes = arrHours * 60 + arrMinutes;

  // Handle case where flight arrives next day
  if (arrTotalMinutes < depTotalMinutes) {
    arrTotalMinutes += 24 * 60; // Add 24 hours
  }

  const durationMinutes = arrTotalMinutes - depTotalMinutes;
  
  return {
    hours: Math.floor(durationMinutes / 60),
    minutes: durationMinutes % 60
  };
}
