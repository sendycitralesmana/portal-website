import HeaderTitle from '@/components/header-title';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, RotateCcw, Save, FileText, Gavel } from 'lucide-react';
import React from 'react';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';

interface TindakPidanaTertentuForm extends Record<string, any> {
    kategori: string;
    judul: string;
    deskripsi: string;
    gambar: File | null;
}

export default function CreateTindakPidanaTertentu() {
    const [isResetting, setIsResetting] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const { data, setData, post, reset, processing, errors } =
        useForm<TindakPidanaTertentuForm>({
            kategori: 'tindak pidana tertentu',
            judul: '',
            deskripsi: '',
            gambar: null,
        });

    const handleReset = () => {
        setIsResetting(true);
        reset();
        setImagePreview(null);
        setTimeout(() => setIsResetting(false), 300);
    };

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/backoffice/tugas-fungsi/tindak-pidana-tertentu/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
        });
    };

    return (
        <AppLayoutRedesign>
            <Head title="Tindak Pidana Tertentu">
                <meta name="description" content="Halaman Tindak Pidana Tertentu" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Tambah Tindak Pidana Tertentu"
                        subtitle="Kelola data tindak pidana tertentu yang ditampilkan pada halaman tugas dan fungsi."
                        icon={Gavel}
                    />

                    <Button asChild variant="blue">
                        <Link href="/backoffice/tugas-fungsi/tindak-pidana-tertentu">
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
                                    onChange={(e) =>
                                        setData('judul', e.target.value)
                                    }
                                    placeholder="Masukkan judul"
                                    className={
                                        errors.judul ? 'border-red-500' : ''
                                    }
                                />
                                {errors.judul && (
                                    <InputError message={errors.judul} />
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Deskripsi <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    rows={6}
                                    value={data.deskripsi}
                                    onChange={(e) =>
                                        setData('deskripsi', e.target.value)
                                    }
                                    placeholder="Tulis deskripsi ..."
                                    className={
                                        errors.deskripsi
                                            ? 'border-red-500 focus-visible:ring-red-500'
                                            : ''
                                    }
                                />
                                {errors.deskripsi && (
                                    <InputError message={errors.deskripsi} />
                                )}
                            </div>

                            {/* gambar */}
                            <div className="grid gap-1.5">
                                <Label>gambar</Label>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file =
                                            e.target.files?.[0] ?? null;

                                        setData('gambar', file);

                                        if (file) {
                                            setImagePreview(
                                                URL.createObjectURL(file),
                                            );
                                        } else {
                                            setImagePreview(null);
                                        }
                                    }}
                                    className={
                                        errors.gambar ? 'border-red-500' : ''
                                    }
                                />

                                {/* Preview Only */}
                                {imagePreview && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="mt-4 w-full max-w-sm cursor-zoom-in">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="h-64 w-full rounded-2xl border object-contain shadow-md transition hover:opacity-90"
                                                />
                                            </div>
                                        </DialogTrigger>

                                        <DialogContent className="max-w-5xl">
                                            <img
                                                src={imagePreview}
                                                alt="Preview Large"
                                                className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain"
                                            />
                                        </DialogContent>
                                    </Dialog>
                                )}

                                {errors.gambar && (
                                    <InputError message={errors.gambar} />
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-x-3 pt-4">
                                <Button
                                    type="button"
                                    onClick={handleReset}
                                    disabled={isResetting}
                                    className="flex items-center gap-2 bg-amber-400 text-black hover:bg-amber-500"
                                >
                                    <RotateCcw
                                        className={`size-4 ${
                                            isResetting ? 'animate-spin' : ''
                                        }`}
                                    />
                                    Reset
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    variant="blue"
                                    className="flex items-center gap-2"
                                >
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