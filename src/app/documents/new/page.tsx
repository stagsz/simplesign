'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileSignature, ArrowLeft } from 'lucide-react'
import { PDFDropzone } from '@/components/PDFDropzone'

export default function NewDocumentPage() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', file.name.replace('.pdf', ''))

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Något gick fel')
      }

      // Redirect to document editor
      router.push(`/documents/${data.document.id}/edit`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte ladda upp filen')
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm">Tillbaka</span>
            </Link>
            <div className="h-6 w-px bg-gray-800" />
            <div className="flex items-center gap-2">
              <FileSignature className="h-6 w-6 text-purple-500" />
              <span className="font-semibold text-white">SimpleSign</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Ladda upp dokument</h1>
          <p className="mt-2 text-gray-400">
            Ladda upp en PDF som du vill skicka för signering
          </p>
        </div>

        <PDFDropzone onUpload={handleUpload} isUploading={isUploading} />

        {error && (
          <div className="mt-6 rounded-lg bg-red-500/10 border border-red-500/20 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="mt-8 rounded-xl bg-gray-900/50 border border-gray-800 p-6">
          <h3 className="font-medium text-white mb-3">Hur det fungerar</h3>
          <ol className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">1</span>
              <span>Ladda upp din PDF-fil</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">2</span>
              <span>Lägg till signaturfält där mottagaren ska signera</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">3</span>
              <span>Ange mottagarens e-post och skicka</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">4</span>
              <span>Mottagaren signerar direkt i webbläsaren</span>
            </li>
          </ol>
        </div>
      </main>
    </div>
  )
}
