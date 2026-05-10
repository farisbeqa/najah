'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2 } from 'lucide-react'

interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFiles = async (files: FileList) => {
    setUploading(true)
    const uploaded: string[] = []

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        uploaded.push(data.url)
      }
    }

    onChange([...value, ...uploaded])
    setUploading(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files)
    }
  }

  const removeImage = (url: string) => {
    onChange(value.filter((u) => u !== url))
  }

  return (
    <div className="space-y-4">
      {/* Upload zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded p-8 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-charcoal bg-beige-200'
            : 'border-beige-300 hover:border-beige-400 bg-beige-50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-warm-gray">
            <Loader2 size={24} className="animate-spin" />
            <p className="text-sm">Uploadovanje...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-warm-gray">
            <Upload size={24} />
            <p className="text-sm">
              Prevuci slike ovdje ili{' '}
              <span className="underline">klikni za upload</span>
            </p>
            <p className="text-xs text-beige-400">JPG, PNG, WEBP — max 10MB</p>
          </div>
        )}
      </div>

      {/* Preview */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {value.map((url, i) => (
            <div key={url} className="relative aspect-square group">
              <Image
                src={url}
                alt={`Image ${i + 1}`}
                fill
                className="object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 bg-charcoal text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 bg-charcoal text-white text-[9px] px-1.5 py-0.5 rounded">
                  Glavna
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
