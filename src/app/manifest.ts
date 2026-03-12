import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Accolades | Opp-Portal by Aman Anubhav',
    short_name: 'Accolades',
    description: 'Discover the best hackathons, internships, fellowships, and research programs for students. Curated by Aman Anubhav (www.amananubhav.com).',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.png', // Fallback, update when you have a real icon
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png', // Fallback
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
