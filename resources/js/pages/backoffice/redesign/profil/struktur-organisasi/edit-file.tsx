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
import { ArrowLeft, FileText, RotateCcw, Save } from 'lucide-react';
import React from 'react';

interface StrukturOrganisasi {
    id: number;
    gambar: string | null;
    deskripsi: string | null;
    file: string | null;
}

interface EditStrukturOrganisasiFileProps {
    strukturOrganisasi: StrukturOrganisasi;
}

interface StrukturOrganisasiForm extends Record<string, any> {
    gambar: string;
    deskripsi: string;
    file: File | null;
    _method: string;
}

export default function EditStrukturOrganisasiFile({ strukturOrganisasi }: EditStrukturOrganisasiFileProps) {
    const [isResetting, setIsResetting] = React.useState(false);
    const [newPdfPreview, setNewPdfPreview] = React.useState<string | null>(null);

    const [filePreview, setFilePreview] = React.useState<string | null>(strukturOrganisasi.file ?? null);

    const { data, setData, post, reset, processing, errors } = useForm<StrukturOrganisasiForm>({
        gambar: '-',
        deskripsi: strukturOrganisasi.deskripsi ?? '',
        file: null,
        _method: 'put',
    });

    const handleReset = () => {
        setIsResetting(true);

        reset();

        setData('deskripsi', strukturOrganisasi.deskripsi ?? '');
        setData('file', null);
        setFilePreview(strukturOrganisasi.file ?? null);

        setTimeout(() => {
            setIsResetting(false);
        }, 300);
    };

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(`/backoffice/profil/struktur-organisasi/${strukturOrganisasi.id}/update-file`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayoutRedesign>
            <Head title="Ubah Deskripsi & Dokumen">
                <meta name="description" content="Ubah deskripsi dan dokumen struktur organisasi" />

                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between gap-4">
                    <HeaderTitle title="Ubah Deskripsi & Dokumen" subtitle="Kelola deskripsi dan dokumen struktur organisasi." icon={FileText} />

                    <Button asChild variant="blue">
                        <Link href="/backoffice/profil/struktur-organisasi">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={onHandleSubmit}>
                            {/* ================================================= */}
                            {/* DESKRIPSI */}
                            {/* ================================================= */}

                            <div className="grid gap-1.5">
                                <Label>
                                    Deskripsi <span className="text-red-500">*</span>
                                </Label>

                                <Textarea
                                    required
                                    rows={6}
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    placeholder="Tulis deskripsi ..."
                                    className={errors.deskripsi ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                />

                                {errors.deskripsi && <InputError message={errors.deskripsi} />}
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
                                {(strukturOrganisasi.file || newPdfPreview) && (
                                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {/* PDF LAMA */}
                                        {strukturOrganisasi.file && (
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
                                                                <p className="truncate font-medium">{strukturOrganisasi.file.split('/').pop()}</p>

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
                                                                src={strukturOrganisasi.file}
                                                                title={`Preview PDF ${strukturOrganisasi.id}`}
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
                                                                title="Preview PDF Baru"
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

                            {/* ================================================= */}
                            {/* ACTIONS */}
                            {/* ================================================= */}

                            <div className="flex justify-end gap-3 border-t pt-6">
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
