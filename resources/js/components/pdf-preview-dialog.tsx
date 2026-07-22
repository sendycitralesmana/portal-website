import { FileText } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog';

type PdfPreviewDialogProps = {
    src: string;
    title?: string;
};

export function PdfPreviewDialog({
    src,
    title = 'Preview PDF',
}: PdfPreviewDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    <FileText className="h-4 w-4 text-red-600" />
                    Lihat PDF
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl">
                <div className="h-[80vh] w-full overflow-hidden rounded-lg border">
                    <iframe
                        src={src}
                        title={title}
                        className="h-full w-full"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}