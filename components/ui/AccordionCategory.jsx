import AccordionItem from './AccordionItem'

export default function AccordionCategory({ category, openMap, toggle }) {
  return (
    <section>
      <div className="space-y-4">
        {category.questions.map((q) => (
          <AccordionItem
            key={q.id}
            item={q}
            isOpen={openMap[q.id]}
            onToggle={() => toggle(q.id)}
          />
        ))}
      </div>
    </section>
  )
}
