export const AI = {
  bg: 'var(--ai-bg)',
  fg: 'var(--ai-fg)',
  accent: 'var(--ai-accent)',
  accentLight: 'var(--ai-accentLight)',
  muted: 'var(--ai-muted)',
  subtle: 'var(--ai-subtle)',
  border: 'var(--ai-border)',
  card: 'var(--ai-card)',
}

export const MUSIC = {
  bg: 'var(--music-bg)',
  fg: 'var(--music-fg)',
  accent: 'var(--music-accent)',
  accentLight: 'var(--music-accentLight)',
  muted: 'var(--music-muted)',
  subtle: 'var(--music-subtle)',
  border: 'var(--music-border)',
  card: 'var(--music-card)',
}

export type Mode = 'ai' | 'music'

export function getColors(mode: Mode) {
  return mode === 'ai' ? AI : MUSIC
}
