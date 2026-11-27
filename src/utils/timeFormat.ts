export function formatHMS(totalSeconds: number): string {
  const clamped = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(clamped / 3600);
  const m = Math.floor((clamped % 3600) / 60);
  const s = clamped % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function formatMS(totalSeconds: number): string {
  const clamped = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function formatDelta(deltaSeconds: number): string {
  const rounded = Math.round(deltaSeconds);
  if (rounded === 0) return '0:00';
  const sign = rounded > 0 ? '+' : '-';
  const abs = Math.abs(rounded);
  const m = Math.floor(abs / 60);
  const s = abs % 60;
  return `${sign}${m}:${String(s).padStart(2, '0')}`;
}

export function parseTimeToSeconds(input: string): number | null {
  const clean = input.trim();
  const parts = clean.split(':').map((p) => Number(p));
  if (parts.some((n) => Number.isNaN(n) || n < 0)) return null;
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return null;
}
