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

interface MaklumatStandarForm extends Record<string, any> {
    judul: string;
    deskripsi: string;
    file: File | null;
}

export default function CreateMaklumatStandar() {
    const [isResetting, setIsResetting] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const { data, setData, post, reset, processing, errors } = useForm<MaklumatStandarForm>({
        judul: '',
        deskripsi: '',
        file: null,
    });

    const handleReset = () => {
        setIsResetting(true);
        reset();
        setImagePreview(null);
        setTimeout(() => setIsResetting(false), 300);
    };

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/backoffice/maklumat-standar/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
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
                        title="Tambah Maklumat dan Standar Pelayanan Publik"
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

                            {/* file */}
                            <div className="grid gap-1.5">
                                <Label>File</Label>

                                <Input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] ?? null;

                                        setData('file', file);

                                        if (file) {
                                            setImagePreview(URL.createObjectURL(file));
                                        } else {
                                            setImagePreview(null);
                                        }
                                    }}
                                    className={errors.file ? 'border-red-500' : ''}
                                />

                                {/* PDF Preview */}
                                {imagePreview && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="mt-4 w-full max-w-sm cursor-pointer">
                                                <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border bg-slate-100 shadow-md transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
                                                    <FileText className="mb-3 h-12 w-12 text-red-600" />

                                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                                        Lihat Preview PDF
                                                    </span>

                                                    <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">Klik untuk membuka</span>
                                                </div>
                                            </div>
                                        </DialogTrigger>

                                        <DialogContent className="max-w-5xl">
                                            <div className="h-[80vh] w-full overflow-hidden rounded-xl">
                                                <iframe src={imagePreview} title="PDF Preview" className="h-full w-full" />
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
