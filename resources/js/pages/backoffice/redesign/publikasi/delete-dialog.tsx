import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { IconArrowLeft } from '@tabler/icons-react'
import { Trash } from 'lucide-react'
import { router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'

interface DeleteDialogProps {
    id: number
}

export default function DeleteDialog({
    id,
}: DeleteDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className='cursor-pointer'>
                    <Trash className="size-4" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Apakah anda benar-benar yakin?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data secara permanen.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        <IconArrowLeft /> Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() =>
                            router.delete(
                                `/redesign/backoffice/publikasi/${id}/delete`
                            )
                        }
                    >
                        <Trash /> Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
