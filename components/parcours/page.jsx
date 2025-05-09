// app/parcours/page.jsx
'use server'
import path from 'path'
import { promises as fs } from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'

async function getModules() {
  const contentDir = path.join(process.cwd(), 'content/quizz')
  const files = await fs.readdir(contentDir)

  const modules = await Promise.all(
    files.map(async (filename) => {
      const fileContent = await fs.readFile(path.join(contentDir, filename), 'utf-8')
      const { data: meta } = matter(fileContent)
      return { ...meta, slug: `/quizz/${meta.slug}` }
    })
  )

  return modules
}

export default async function Parcours() {
  const modules = await getModules()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-title font-bold mb-10">Parcours interactifs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {modules.map(({ title, slug, cover, intro }) => (
          <Link href={slug} key={slug} className="group block rounded-xl overflow-hidden border border-light hover:shadow-xl transition">
            {cover && (
              <div className="aspect-video relative">
                <Image src={cover} alt={title} fill className="object-cover" />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-anthracite group-hover:text-gold transition">{title}</h3>
              <p className="text-sm text-muted mt-1">{intro}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
