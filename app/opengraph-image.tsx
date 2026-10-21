import { ImageResponse } from 'next/og'

import { profile } from '@/lib/resume'

export const alt = `${profile.name} — ${profile.role} in ${profile.location}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const INK = '#211f1c'
const PAPER = '#f7f4ee'
const LINE = '#d1cbc2'
const MUTED = '#6b655d'
const SIGNAL = '#d55b0e'

/**
 * IBM Plex, as on the site. Satori reads WOFF but not WOFF2, so these come
 * from Fontsource's WOFF builds. If the fetch fails the card still renders in
 * the default face rather than failing the build.
 */
async function font(family: string, weight: number) {
  try {
    const res = await fetch(
      `https://cdn.jsdelivr.net/fontsource/fonts/${family}@latest/latin-${weight}-normal.woff`
    )
    if (!res.ok) return null
    return await res.arrayBuffer()
  } catch {
    return null
  }
}

/** Shared social card: the title block of the sheet, plus Fig. 01 in brief. */
export default async function OpengraphImage() {
  const [display, mono, sans] = await Promise.all([
    font('ibm-plex-sans-condensed', 600),
    font('ibm-plex-mono', 400),
    font('ibm-plex-sans', 400)
  ])

  const fonts = [
    display && { name: 'Display', data: display, weight: 600 as const },
    mono && { name: 'Mono', data: mono, weight: 400 as const },
    sans && { name: 'Sans', data: sans, weight: 400 as const }
  ].filter(Boolean) as {
    name: string
    data: ArrayBuffer
    weight: 400 | 600
  }[]

  const label = {
    fontFamily: 'Mono',
    fontSize: 18,
    letterSpacing: '0.09em',
    textTransform: 'uppercase' as const,
    color: MUTED
  }

  const node = (text: string, lit = false) => (
    <div
      style={{
        display: 'flex',
        padding: '12px 18px',
        border: `1.5px solid ${lit ? SIGNAL : LINE}`,
        background: lit ? '#fbeee4' : PAPER,
        fontFamily: 'Sans',
        fontSize: 22,
        color: INK
      }}
    >
      {text}
    </div>
  )

  const edge = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: 44, height: 2, background: SIGNAL }} />
      <svg
        width='12'
        height='16'
        viewBox='0 0 12 16'
        style={{ marginLeft: -6 }}
      >
        <path
          d='M2 2 L10 8 L2 14'
          fill='none'
          stroke={SIGNAL}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: PAPER,
          padding: '56px 72px',
          backgroundImage: `radial-gradient(${LINE} 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px'
        }}
      >
        {/* Title block */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: `2px solid ${INK}`,
            paddingTop: 14,
            ...label
          }}
        >
          <span>Curriculum vitae</span>
          <span>
            {profile.location} · {profile.timezone}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 52,
            fontFamily: 'Display',
            fontSize: 132,
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: INK
          }}
        >
          <span>{profile.name}</span>
          <span style={{ color: SIGNAL, fontSize: 64, marginTop: 22 }}>
            {profile.role}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 26,
            maxWidth: 900,
            fontFamily: 'Sans',
            fontSize: 26,
            lineHeight: 1.45,
            color: MUTED
          }}
        >
          Self-hosted LLM serving, a central AI gateway and agent workflows over
          enterprise data.
        </div>

        {/* Fig. 01, in brief */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            borderTop: `1.5px solid ${LINE}`,
            paddingTop: 22
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {node('Applications')}
            {edge}
            {node('LiteLLM gateway', true)}
            {edge}
            {node('vLLM models')}
          </div>
          <span style={{ ...label, color: INK }}>
            {new URL(profile.siteUrl).host}
          </span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  )
}
