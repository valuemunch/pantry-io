import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Curation: What\'s for Dinner?',
    short_name: 'What\'s for Dinner?',
    description: 'Instant recipe inspiration from your pantry.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff7ed',
    theme_color: '#f97316',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
