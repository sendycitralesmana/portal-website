import { Head, Link } from '@inertiajs/react'
import { useState } from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

import HeaderTitle from '@/components/header-title'
import ImagePreviewDialog from '@/components/image-preview-dialog'
import { useFilter } from '@/hooks/use-filter'
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign'

import { IconArrowsDownUp } from '@tabler/icons-react'
import { FileText, Pencil, Plus, Search as SearchIcon, Share2, Youtube } from 'lucide-react'

import DeleteDialog from './delete-dialog'
import Filter from './filter'
import VideoInfoPagination from './pagination'

const VideoInfoPage = (props: any) => {
    const { data: videoInfos = [], meta } =
        props.videoInfos ?? {}

        console.log('videoInfos', videoInfos)

    const [params, setParams] = useState({
        ...props.state,
        load: props.state.load.toString(),
    })

    const [isLoading, setIsLoading] = useState(true)
    const skeletonRows = Array.from({ length: 10 })

    const onSortable = (field: string) => {
        setParams({
            ...params,
            field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
            page: 1,
        })
    }

    const resetParams = () => {
        setParams({
            ...props.state,
            load: props.state.load.toString(),
        })
    }

    useFilter({
        route: '/redesign/backoffice/video-info',
        values: params,
        only: ['videoInfos'],
        onLoading: (loading) => setIsLoading(loading),
    })

    return (
        <AppLayoutRedesign>
            <Head title="Video Info">
                <meta name="description" content="Halaman Video Info" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title="Video Info"
                        subtitle="Kelola data video info yang ditampilkan pada halaman video info."
                        icon={Youtube}
                    />
                </div>

                <Card>
                    <CardHeader>
                        <Filter
                            params={params}
                            setParams={setParams}
                            resetParams={resetParams}
                            total={meta?.total}
                        />
                    </CardHeader>

                    <CardContent>
                        {/* ================= DESKTOP ================= */}
                        <div className="hidden lg:block">
                            <Table className="w-full table-auto">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('judul')}>
                                                Judul
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('embed_url')}>
                                                Embed URL
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('created_at')}>
                                                Dibuat Pada
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {isLoading ? (
                                        skeletonRows.map((_, i) => (
                                            <TableRow key={i}>
                                                {Array.from({ length: 4 }).map((__, j) => (
                                                    <TableCell key={j}>
                                                        <Skeleton className="h-4 w-full rounded bg-gradient-to-r from-blue-500 to-blue-400" />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : videoInfos.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="py-20 text-center">
                                                <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 animate-fade-in">
                                                    <SearchIcon className="h-10 w-10 animate-bounce text-blue-500" />
                                                    <span className="text-sm animate-pulse">
                                                        Tidak ada data
                                                    </span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        videoInfos.map(
                                            (item: any, index: number) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        {index +
                                                            1 +
                                                            (meta.current_page - 1) *
                                                                meta.per_page}
                                                    </TableCell>

                                                    <TableCell>{item.judul}</TableCell>
                                                    <TableCell>{item.embed_url}</TableCell>
                                                    <TableCell>{item.created_at}</TableCell>

                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                className="bg-amber-400"
                                                                variant="link"
                                                                size="sm"
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={`/redesign/backoffice/video-info/${item.id}/edit`}
                                                                >
                                                                    <Pencil className="size-4" />
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* ================= MOBILE ================= */}
                        <div className="space-y-4 lg:hidden">
                            {isLoading ? (
                                skeletonRows.map((_, i) => (
                                    <div
                                        key={i}
                                        className="rounded-xl border p-4"
                                    >
                                        <Skeleton className="h-4 w-1/2 mb-3" />
                                        <Skeleton className="h-20 w-full" />
                                    </div>
                                ))
                            ) : videoInfos.length === 0 ? (
                                <div className="py-20 text-center">
                                    <SearchIcon className="mx-auto h-10 w-10 animate-bounce text-blue-500" />
                                    <p className="mt-2 text-sm animate-pulse text-gray-500">
                                        Tidak ada data
                                    </p>
                                </div>
                            ) : (
                                videoInfos.map((item: any, index: number) => (
                                    <div
                                        key={item.id}
                                        className="rounded-xl border bg-white p-4 shadow-sm dark:bg-gray-900"
                                    >
                                        <div className="flex justify-between">
                                            <span className="text-sm font-semibold">
                                                #{index + 1}
                                            </span>

                                            <div className="flex gap-2">
                                                <Button
                                                    className="bg-amber-400"
                                                    variant="link"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/redesign/backoffice/video-info/${item.id}/edit`}
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <DeleteDialog id={item.id} />
                                            </div>
                                        </div>

                                        <div className="mt-3 space-y-2 text-sm">
                                            <p><strong>Judul:</strong> {item.judul}</p>
                                            <p><strong>Embed URL:</strong> {item.embed_url}</p>
                                            <p><strong>Dibuat:</strong> {item.created_at}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex w-full flex-col items-center justify-between border-t py-2 lg:flex-row">
                        <VideoInfoPagination meta={meta} />
                    </CardFooter>
                </Card>
            </div>
        </AppLayoutRedesign>
    )
}

export default VideoInfoPage