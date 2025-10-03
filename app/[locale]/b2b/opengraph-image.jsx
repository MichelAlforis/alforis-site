import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Alforis B2B'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }) {
  const { locale } = await params
  
  const titles = {
    fr: 'Alforis : votre accélérateur de distribution en Europe',
    en: 'Alforis: Your European distribution accelerator',
    es: 'Alforis: su acelerador de distribución en Europa',
    pt: 'Alforis: o seu acelerador de distribuição na Europa'
  }
  
  const subtitles = {
    fr: 'France • Luxembourg • Espagne • Portugal',
    en: 'France • Luxembourg • Spain • Portugal',
    es: 'Francia • Luxemburgo • España • Portugal',
    pt: 'França • Luxemburgo • Espanha • Portugal'
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #2C3E50 0%, #3E5871 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          color: '#F5EFE6',
          fontFamily: 'sans-serif'
        }}
      >
        <div style={{ 
          fontSize: 64, 
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 30,
          lineHeight: 1.2
        }}>
          {titles[locale] || titles.fr}
        </div>
        <div style={{ 
          fontSize: 36,
          color: '#D4AF37',
          textAlign: 'center'
        }}>
          {subtitles[locale] || subtitles.fr}
        </div>
        <div style={{
          position: 'absolute',
          bottom: 40,
          fontSize: 24,
          color: '#F5EFE6',
          opacity: 0.8
        }}>
          Membre AFTPM
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}