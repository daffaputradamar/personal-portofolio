import type { MetadataRoute } from 'next'

import { profile } from '@/lib/resume'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.name,
    description: profile.pitch,
    start_url: '/',
    display: 'standalone',
    background_color: '#0d0d0c',
    theme_color: '#0d0d0c',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  }
}
