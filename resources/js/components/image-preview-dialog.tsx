// import * as React from "react"
// import {
//   Dialog,
//   DialogContent,
// } from "@/components/ui/dialog"

// interface ImagePreviewDialogProps {
//   src: string
//   alt?: string
// }

// export default function ImagePreviewDialog({
//   src,
//   alt,
// }: ImagePreviewDialogProps) {
//   const [open, setOpen] = React.useState(false)

//   return (
//     <>
//       {/* Thumbnail */}
//       <div
//         onClick={() => setOpen(true)}
//         className="flex h-24 w-24 cursor-pointer items-center justify-center rounded border p-2 transition hover:scale-105"
//       >
//         <img
//           src={src}
//           alt={alt}
//           className="max-h-full max-w-full object-contain"
//           loading="lazy"
//         />
//       </div>

//       {/* Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-4xl p-6">
//           <div className="flex max-h-[80vh] items-center justify-center">
//             <img
//               src={src}
//               alt={alt}
//               className="max-h-[75vh] max-w-full object-contain rounded-lg"
//             />
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

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
                className="flex h-20 w-20 sm:h-24 sm:w-24 cursor-pointer items-center justify-center rounded-md border bg-white p-2 transition hover:scale-105"
            >
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            {/* Dialog */}
            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogContent
                    className="
                    w-[95vw]
                    max-w-4xl
                    p-3 sm:p-6
                    "
                >
                    <div
                        className="
                        flex
                        items-center
                        justify-center
                        max-h-[85vh]
                        "
                    >
                        <img
                            src={src}
                            alt={alt}
                            className="
                            w-full
                            max-h-[80vh]
                            object-contain
                            rounded-lg
                            "
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}