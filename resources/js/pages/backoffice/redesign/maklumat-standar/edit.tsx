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
import { ArrowLeft, Briefcase, FileText, RotateCcw, Save } from 'lucide-react';
import React from 'react';

interface MaklumatStandar {
    id: number;
    judul: string;
    deskripsi: string;
    file: string | null;
}

interface EditMaklumatStandarProps {
    maklumatStandar: MaklumatStandar;
}

export default function EditMaklumatStandar({ maklumatStandar }: EditMaklumatStandarProps) {
    const [isResetting, setIsResetting] = React.useState(false);

    // Ubah dari newImagePreview menjadi newPdfPreview
    const [newPdfPreview, setNewPdfPreview] = React.useState<string | null>(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        judul: maklumatStandar.judul ?? '',
        deskripsi: maklumatStandar.deskripsi ?? '',
        file: null as File | null,
        _method: 'put',
    });

    const handleReset = () => {
        setIsResetting(true);
        reset();
        setNewPdfPreview(null);

        setTimeout(() => setIsResetting(false), 300);
    };

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(`/backoffice/maklumat-standar/${maklumatStandar.id}/update`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayoutRedesign>
            <Head title="Maklumat Standar">
                <meta name="description" content="Halaman Maklumat Standar" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Ubah Maklumat dan Standar Pelayanan Publik"
                        subtitle="Kelola data maklumat dan standar pelayanan publik yang ditampilkan pada halaman maklumat standar."
                        icon={Briefcase}
                    />

                    <Button asChild variant="blue">
                        <Link href="/backoffice/maklumat-standar">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={onHandleSubmit}>
                            {/* Judul */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Judul <span className="text-red-500">*</span>
                                </Label>

                                <Input
                                    value={data.judul}
                                    onChange={(e) => setData('judul', e.target.value)}
                                    placeholder="Masukkan judul"
                                    className={errors.judul ? 'border-red-500' : ''}
                                />

                                {errors.judul && <InputError message={errors.judul} />}
                            </div>

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

                            {/* File PDF */}
                            <div className="grid gap-1.5">
                                <Label>File PDF</Label>

                                <Input
                                    type="file"
                                    accept="application/pdf"
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

                                {/* PDF Preview */}
                                <div className="mt-6 grid gap-6 md:grid-cols-2">
                                    {/* KIRI - File Saat Ini */}
                                    <div>
                                        <Label className="mb-2 block text-sm font-medium">File Saat Ini</Label>

                                        {maklumatStandar.file ? (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border bg-slate-100 shadow-md transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
                                                        <FileText className="mb-3 h-12 w-12 text-red-600" />

                                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                                            Lihat PDF Saat Ini
                                                        </span>

                                                        <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">Klik untuk membuka</span>
                                                    </div>
                                                </DialogTrigger>

                                                <DialogContent className="max-w-5xl">
                                                    <div className="h-[80vh] w-full overflow-hidden rounded-xl">
                                                        <iframe src={maklumatStandar.file} title="PDF Saat Ini" className="h-full w-full" />
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        ) : (
                                            <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed bg-slate-50 dark:bg-slate-900">
                                                <FileText className="mb-3 h-12 w-12 text-slate-400" />

                                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Belum ada file PDF</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* KANAN - Preview File Baru */}
                                    <div>
                                        <Label className="mb-2 block text-sm font-medium text-blue-600">Preview File Baru</Label>

                                        {newPdfPreview ? (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-blue-400 bg-blue-50 shadow-md transition hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900">
                                                        <FileText className="mb-3 h-12 w-12 text-red-600" />

                                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                                            Lihat PDF Baru
                                                        </span>

                                                        <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">Klik untuk membuka</span>
                                                    </div>
                                                </DialogTrigger>

                                                <DialogContent className="max-w-5xl">
                                                    <div className="h-[80vh] w-full overflow-hidden rounded-xl">
                                                        <iframe src={newPdfPreview} title="Preview PDF Baru" className="h-full w-full" />
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        ) : (
                                            <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed bg-slate-50 dark:bg-slate-900">
                                                <FileText className="mb-3 h-12 w-12 text-slate-400" />

                                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                                    Pilih file PDF baru untuk melihat preview
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {errors.file && <InputError message={errors.file} />}
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
