// Convert duration from "HH:mm" to verbose format
export function formatDuration(duration: string): string {
  if (!duration) return "N/A";
  const [hours, minutes] = duration.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return "N/A";
  return `${hours}h ${minutes}m`;
}

// Calculate layover duration between two timestamps
export function calculateLayoverDuration(prevOffTime?: string, nextBoardTime?: string): string {
  if (!prevOffTime || !nextBoardTime) return "N/A";
  try {
    const off = new Date(`1970-01-01T${prevOffTime}`);
    const board = new Date(`1970-01-01T${nextBoardTime}`);
    const diffMinutes = (board.getTime() - off.getTime()) / (1000 * 60);
    if (isNaN(diffMinutes)) return "N/A";
    const hours = Math.floor(diffMinutes / 60);
    const minutes = Math.floor(diffMinutes % 60);
    return `${hours}h ${minutes}m`;
  } catch {
    return "N/A";
  }
}

// Calculate total trip duration including layovers
export function calculateTotalDuration(segments: any[]): string {
  try {
    let totalMinutes = 0;

    segments.forEach((segment: any[]) => {
      // Add flight durations
      segment.forEach((leg) => {
        if (!leg.duration) return;
        const [hours, minutes] = leg.duration.split(':').map(Number);
        if (!isNaN(hours) && !isNaN(minutes)) {
          totalMinutes += hours * 60 + minutes;
        }
      });

      // Add layover durations within segment
      for (let i = 0; i < segment.length - 1; i++) {
        if (!segment[i].offTime || !segment[i + 1].boardTime) continue;
        const layoverMinutes = calculateLayoverMinutesFromTimes(
          segment[i].offTime,
          segment[i + 1].boardTime
        );
        if (!isNaN(layoverMinutes)) {
          totalMinutes += layoverMinutes;
        }
      }
    });

    if (totalMinutes === 0) return "N/A";
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  } catch {
    return "N/A";
  }
}

// Helper function to calculate minutes between times
function calculateLayoverMinutesFromTimes(offTime: string, boardTime: string): number {
  try {
    const off = new Date(`1970-01-01T${offTime}`);
    const board = new Date(`1970-01-01T${boardTime}`);
    return (board.getTime() - off.getTime()) / (1000 * 60);
  } catch {
    return NaN;
  }
}

// Generate a visually pleasing color based on airline IATA code
export function generateAirlineColor(iata: string): { bg: string; text: string } {
  if (!iata) return { bg: '#f0f0f0', text: '#666666' };
  
  // Generate a hash from the IATA code
  const hash = iata.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // Use the hash to generate HSL values
  // Hue: Full spectrum (0-360)
  // Saturation: 60-80% for soft but visible colors
  // Lightness: 85-95% for background, 15-25% for text
  const hue = Math.abs(hash % 360);
  const saturation = 60 + (hash % 20); // 60-80%
  const bgLightness = 85 + (hash % 10); // 85-95%
  const textLightness = 15 + (hash % 10); // 15-25%

  return {
    bg: `hsl(${hue}, ${saturation}%, ${bgLightness}%)`,
    text: `hsl(${hue}, ${saturation}%, ${textLightness}%)`
  };
}
