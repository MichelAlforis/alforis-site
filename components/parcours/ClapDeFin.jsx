export default function ClapDeFin({ profil, meta }) {
  const data = meta?.profilesData?.[profil]

  if (!data) {
    return <p className="text-center mt-12 text-lg text-anthracite">Merci pour votre confiance.</p>
  }

  const { icon, title, description, color, paragraphs, citation, cta } = data

  return (
    <div className="max-w-xl mx-auto text-center space-y-6 mt-16 p-8 border-2 rounded-2xl shadow-lg" style={{ borderColor: color || '#000' }}>
      {/* Titre & icône */}
      <div className="text-5xl">{icon}</div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-lg text-steel">{description}</p>

      {/* Paragraphes */}
      <div className="text-left space-y-4 pt-4">
        {paragraphs?.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Citation */}
      {citation && (
        <p className="italic text-steel pt-2">
          {citation.emoji} {citation.text}
        </p>
      )}

      {/* Call to Action */}
      {cta && (
        <a href={cta.href} target="_blank" className="btn-alforis-retro inline-block mt-4">
          {cta.label}
        </a>
      )}
    </div>
  )
}
