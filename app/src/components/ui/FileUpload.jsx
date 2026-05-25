import { useRef, useState } from 'react'
import { Upload, X, FileText, Image } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function FileUpload({
  label,
  accept,
  maxSizeMB = 10,
  preview = false,
  onChange,
  error,
  hint,
}) {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  function handleFile(f) {
    if (!f) return
    if (f.size > maxSizeMB * 1024 * 1024) {
      alert(`File too large. Max size is ${maxSizeMB} MB.`)
      return
    }
    setFile(f)
    onChange?.(f)
    if (preview && f.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(f))
    } else {
      setPreviewUrl(null)
    }
  }

  function handleRemove(e) {
    e.stopPropagation()
    setFile(null)
    setPreviewUrl(null)
    onChange?.(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFile(dropped)
  }

  const isPdf = file?.type === 'application/pdf'

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-300">{label}</label>}

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'relative rounded-xl border-2 border-dashed transition-all duration-150 cursor-pointer',
          dragOver ? 'border-orange-500/70 bg-orange-500/8' : 'border-white/10 hover:border-white/20 bg-white/3',
          error && 'border-red-500/40',
          file && previewUrl ? 'p-0 overflow-hidden' : 'p-6'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        {/* Image preview */}
        {file && previewUrl && (
          <div className="relative">
            <img src={previewUrl} alt="preview" className="w-full h-40 object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-medium">Click to change</span>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* PDF / non-image file */}
        {file && !previewUrl && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
              {isPdf ? <FileText className="w-5 h-5 text-orange-400" /> : <Image className="w-5 h-5 text-orange-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="w-7 h-7 rounded-full hover:bg-red-500/10 flex items-center justify-center text-gray-500 hover:text-red-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Empty state */}
        {!file && (
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <Upload className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-300">
                <span className="text-orange-400 font-medium">Click to upload</span> or drag & drop
              </p>
              {hint && <p className="text-xs text-gray-500 mt-0.5">{hint}</p>}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
