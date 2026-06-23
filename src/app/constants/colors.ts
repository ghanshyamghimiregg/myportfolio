export const AI = {
  bg: '#F7F6F3',
  fg: '#1A1A1A',
  accent: '#2563EB',
  accentLight: '#EFF6FF',
  muted: '#6B6B6B',
  subtle: '#E8E7E4',
  border: '#D8D7D4',
  card: '#FFFFFF',
}

export const MUSIC = {
  bg: '#FAF4E8',
  fg: '#2C1610',
  accent: '#B45309',
  accentLight: '#FEF3C7',
  muted: '#7C6652',
  subtle: '#EDE4D0',
  border: '#D9CFBA',
  card: '#FFF8EE',
}

export type Mode = 'ai' | 'music'

export function getColors(mode: Mode) {
  return mode === 'ai' ? AI : MUSIC
}
