import * as React from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

interface ImagePreviewDialogProps {
  src: string
  alt?: string
}

export default function ImagePreviewDialog({
  src,
  alt,
}: ImagePreviewDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {/* Thumbnail */}
      <div
        onClick={() => setOpen(true)}
        className="flex h-24 w-24 cursor-pointer items-center justify-center rounded border p-2 transition hover:scale-105"
      >
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-6">
          <div className="flex max-h-[80vh] items-center justify-center">
            <img
              src={src}
              alt={alt}
              className="max-h-[75vh] max-w-full object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}