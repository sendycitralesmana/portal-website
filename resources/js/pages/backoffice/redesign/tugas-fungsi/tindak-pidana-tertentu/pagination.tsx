import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from '@/components/ui/pagination'

interface TindakPidanaTertentuPaginationProps {
    meta: {
        from?: number
        to?: number
        total?: number
        last_page?: number
        links?: any[]
    }
}

export default function TindakPidanaTertentuPagination({
    meta,
}: TindakPidanaTertentuPaginationProps) {
    if (!meta) return null

    return (
        <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
            {/* Info */}
            <p className="text-sm text-muted-foreground">
                Menampilkan{' '}
                <span className="font-medium text-blue-500">
                    {meta.from ?? 0} - {meta.to ?? 0}
                </span>{' '}
                dari total{' '}
                <span className="font-medium text-blue-500">
                    {meta.total ?? 0}
                </span>{' '}
                tindak pidana tertentu
            </p>

            {/* Pagination */}
            {meta.last_page && meta.last_page > 1 && (
                <div className="overflow-x-auto">
                    <Pagination>
                        <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                            {meta.links?.map((link: any, index: number) => (
                                <PaginationItem key={index} className="mx-1 mb-1">
                                    <PaginationLink
                                        href={link.url ?? '#'}
                                        isActive={link.active}
                                        className={`rounded-md px-3 py-1 transition-colors ${
                                            link.active
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'hover:bg-blue-400 hover:text-white'
                                        }`}
                                    >
                                        {link.label
                                            .replace(/&laquo;/g, '«')
                                            .replace(/&raquo;/g, '»')}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}