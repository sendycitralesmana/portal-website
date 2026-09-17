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
import { ArrowLeft, Building2, FileText, RotateCcw, Save } from 'lucide-react';
import React from 'react';

interface StrukturOrganisasiForm extends Record<string, any> {
    gambar: string;
    deskripsi: string;
    file: File | null;
}

export default function CreateStrukturOrganisasi() {
    const [isResetting, setIsResetting] = React.useState(false);
    const [filePreview, setPdfPreview] = React.useState<string | null>(null);

    const { data, setData, post, reset, processing, errors } = useForm<StrukturOrganisasiForm>({
        gambar: '-',
        deskripsi: '',
        file: null,
    });

    const handleReset = () => {
        setIsResetting(true);
        reset();
        setPdfPreview(null);

        setTimeout(() => setIsResetting(false), 300);
    };

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/backoffice/profil/struktur-organisasi/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setPdfPreview(null);
            },
        });
    };

    return (
        <AppLayoutRedesign>
            <Head title="Struktur Organisasi">
                <meta name="description" content="Halaman Struktur Organisasi" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Tambah Struktur Organisasi"
                        subtitle="Kelola data struktur organisasi yang ditampilkan pada halaman struktur organisasi."
                        icon={Building2}
                    />

                    <Button asChild variant="blue">
                        <Link href="/backoffice/struktur-organisasi">
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
                                    required
                                    rows={6}
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    placeholder="Tulis deskripsi ..."
                                    className={errors.deskripsi ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                />

                                {errors.deskripsi && <InputError message={errors.deskripsi} />}
                            </div>

                            {/* Upload PDF */}
                            <div className="grid gap-1.5">
                                <Label>
                                    File <span className="text-red-500">*</span>
                                </Label>

                                <Input
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    required
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] ?? null;

                                        setData('file', file);

                                        if (file) {
                                            setPdfPreview(URL.createObjectURL(file));
                                        } else {
                                            setPdfPreview(null);
                                        }
                                    }}
                                    className={errors.file ? 'border-red-500' : ''}
                                />

                                {filePreview && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="mt-3 cursor-pointer rounded-xl border p-4 transition hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="size-8 text-red-500" />

                                                    <div>
                                                        <p className="font-medium">{data.file?.name ?? 'Preview PDF'}</p>

                                                        <p className="text-sm text-gray-500">Klik untuk melihat PDF</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogTrigger>

                                        <DialogContent className="!h-[95vh] !w-[95vw] !max-w-[95vw] overflow-hidden p-3 sm:!max-w-[95vw] sm:p-4">
                                            <div className="flex h-full min-h-0 flex-col">
                                                <div className="mb-3 flex shrink-0 items-center gap-2">
                                                    <FileText className="size-5 text-red-600" />

                                                    <h3 className="font-semibold">Dokumen PDF</h3>
                                                </div>

                                                <iframe src={filePreview} title={`Preview PDF`} className="min-h-0 w-full flex-1 rounded-lg border" />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )}

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
