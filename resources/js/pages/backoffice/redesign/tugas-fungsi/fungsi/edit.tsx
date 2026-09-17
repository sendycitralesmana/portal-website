import HeaderTitle from '@/components/header-title';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, FileText, RotateCcw, Save, ShieldCheck } from 'lucide-react';
import React from 'react';

interface Fungsi {
    id: number;
    kategori: string;
    judul: string;
    deskripsi: string;
    gambar: string | null;
    file: string | null;
}

interface EditFungsiProps {
    fungsi: Fungsi;
}

export default function EditFungsi({ fungsi }: EditFungsiProps) {
    const [isResetting, setIsResetting] = React.useState(false);
    const [newImagePreview, setNewImagePreview] = React.useState<string | null>(null);
    const [newPdfPreview, setNewPdfPreview] = React.useState<string | null>(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        kategori: fungsi.kategori ?? '',
        judul: fungsi.judul ?? '',
        deskripsi: fungsi.deskripsi ?? '',
        gambar: null as File | null,
        file: null as File | null,
        _method: 'put',
    });

    const handleReset = () => {
        setIsResetting(true);
        reset();
        setNewImagePreview(null);
        setNewPdfPreview(null);
        setTimeout(() => setIsResetting(false), 300);
    };

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(`/backoffice/tugas-fungsi/fungsi/${fungsi.id}/update`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayoutRedesign>
            <Head title="Fungsi">
                <meta name="description" content="Halaman Fungsi" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Ubah Fungsi"
                        subtitle="Kelola data fungsi yang ditampilkan pada halaman tugas dan fungsi."
                        icon={ShieldCheck}
                    />

                    <Button asChild variant="blue">
                        <Link href="/backoffice/tugas-fungsi/fungsi">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={onHandleSubmit}>
                            {/* Deskripsi */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Deskripsi <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    rows={6}
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    placeholder="Tulis deskripsi ..."
                                    className={errors.deskripsi ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                />
                                {errors.deskripsi && <InputError message={errors.deskripsi} />}
                            </div>

                            {/* Upload Gambar & PDF */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Gambar */}
                                <div className="grid gap-1.5">
                                    <Label>Gambar</Label>

                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] ?? null;

                                            setData('gambar', file);

                                            if (file) {
                                                setNewImagePreview(URL.createObjectURL(file));
                                            } else {
                                                setNewImagePreview(null);
                                            }
                                        }}
                                        className={errors.gambar ? 'border-red-500' : ''}
                                    />

                                    {/* Preview Gambar */}
                                    {(fungsi.gambar || newImagePreview) && (
                                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {/* GAMBAR LAMA */}
                                            {fungsi.gambar && (
                                                <div className="rounded-xl border bg-gray-50 p-4 dark:bg-gray-900">
                                                    <Label className="mb-3 block text-sm font-medium">Gambar Saat Ini</Label>

                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <img
                                                                src={fungsi.gambar}
                                                                alt="Gambar Saat Ini"
                                                                className="h-56 w-full cursor-zoom-in rounded-xl border bg-white object-contain shadow-sm transition hover:opacity-90 dark:bg-gray-800"
                                                            />
                                                        </DialogTrigger>

                                                        <DialogContent className="max-w-5xl">
                                                            <img
                                                                src={fungsi.gambar}
                                                                alt="Gambar Saat Ini - Preview"
                                                                className="mx-auto max-h-[85vh] rounded-xl object-contain"
                                                            />
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            )}

                                            {/* GAMBAR BARU */}
                                            {newImagePreview && (
                                                <div className="rounded-xl border border-blue-400 bg-blue-50 p-4 dark:bg-blue-950/20">
                                                    <Label className="mb-3 block text-sm font-medium text-blue-600">Gambar Baru</Label>

                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <img
                                                                src={newImagePreview}
                                                                alt="Gambar Baru"
                                                                className="h-56 w-full cursor-zoom-in rounded-xl border border-blue-300 bg-white object-contain shadow-sm transition hover:opacity-90 dark:bg-gray-800"
                                                            />
                                                        </DialogTrigger>

                                                        <DialogContent className="max-w-5xl">
                                                            <img
                                                                src={newImagePreview}
                                                                alt="Gambar Baru - Preview"
                                                                className="mx-auto max-h-[85vh] rounded-xl object-contain"
                                                            />
                                                        </DialogContent>
                                                    </Dialog>

                                                    <p className="mt-2 truncate text-xs text-blue-500">{data.gambar?.name}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {errors.gambar && <InputError message={errors.gambar} />}
                                </div>

                                {/* PDF */}
                                <div className="grid gap-1.5">
                                    <Label>Dokumen PDF</Label>

                                    <Input
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] ?? null;

                                            setData('file', file);

                                            if (file) {
                                                setNewPdfPreview(URL.createObjectURL(file));
                                            } else {
                                                setNewPdfPreview(null);
                                            }
                                        }}
                                        className={errors.file ? 'border-red-500' : ''}
                                    />

                                    {/* Preview PDF */}
                                    {(fungsi.file || newPdfPreview) && (
                                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {/* PDF LAMA */}
                                            {fungsi.file && (
                                                <div className="rounded-xl border bg-gray-50 p-4 dark:bg-gray-900">
                                                    <Label className="mb-3 block text-sm font-medium">Dokumen Saat Ini</Label>

                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <button
                                                                type="button"
                                                                className="flex w-full items-center gap-3 rounded-xl border bg-white p-4 text-left shadow-sm transition hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                                                            >
                                                                <FileText className="size-10 shrink-0 text-red-500" />

                                                                <div className="min-w-0">
                                                                    <p className="truncate font-medium">{fungsi.file.split('/').pop()}</p>

                                                                    <p className="mt-1 text-sm text-gray-500">Klik untuk preview PDF</p>
                                                                </div>
                                                            </button>
                                                        </DialogTrigger>

                                                        <DialogContent className="!h-[95vh] !w-[95vw] !max-w-[95vw] overflow-hidden p-3 sm:!max-w-[95vw] sm:p-4">
                                                            <div className="flex h-full min-h-0 flex-col">
                                                                <div className="mb-3 flex shrink-0 items-center gap-2">
                                                                    <FileText className="size-5 text-red-600" />

                                                                    <h3 className="font-semibold">Dokumen PDF</h3>
                                                                </div>

                                                                <iframe
                                                                    src={fungsi.file}
                                                                    title={`Preview PDF ${fungsi.id}`}
                                                                    className="min-h-0 w-full flex-1 rounded-lg border"
                                                                />
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            )}

                                            {/* PDF BARU */}
                                            {newPdfPreview && (
                                                <div className="rounded-xl border border-blue-400 bg-blue-50 p-4 dark:bg-blue-950/20">
                                                    <Label className="mb-3 block text-sm font-medium text-blue-600">Dokumen Baru</Label>

                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <button
                                                                type="button"
                                                                className="flex w-full items-center gap-3 rounded-xl border border-blue-300 bg-white p-4 text-left shadow-sm transition hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                                                            >
                                                                <FileText className="size-10 shrink-0 text-blue-500" />

                                                                <div className="min-w-0">
                                                                    <p className="truncate font-medium">{data.file?.name}</p>

                                                                    <p className="mt-1 text-sm text-blue-500">PDF baru · Klik untuk preview</p>
                                                                </div>
                                                            </button>
                                                        </DialogTrigger>

                                                        <DialogContent className="!h-[95vh] !w-[95vw] !max-w-[95vw] overflow-hidden p-3 sm:!max-w-[95vw] sm:p-4">
                                                            <div className="flex h-full min-h-0 flex-col">
                                                                <div className="mb-3 flex shrink-0 items-center gap-2">
                                                                    <FileText className="size-5 text-red-600" />

                                                                    <h3 className="font-semibold">Dokumen PDF</h3>
                                                                </div>

                                                                <iframe
                                                                    src={newPdfPreview}
                                                                    title={`Preview PDF`}
                                                                    className="min-h-0 w-full flex-1 rounded-lg border"
                                                                />
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {errors.file && <InputError message={errors.file} />}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-x-3 pt-4">
                                <Button
                                    type="button"
                                    onClick={handleReset}
                                    disabled={isResetting}
                                    className="flex items-center gap-2 bg-amber-400 text-black hover:bg-amber-500"
                                >
                                    <RotateCcw className={`size-4 ${isResetting ? 'animate-spin' : ''}`} />
                                    Reset
                                </Button>

                                <Button type="submit" disabled={processing} variant="blue" className="flex items-center gap-2">
                                    {processing ? (
                                        <>
                                            <RotateCcw className="size-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="size-4" />
                                            Simpan
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayoutRedesign>
    );
}
