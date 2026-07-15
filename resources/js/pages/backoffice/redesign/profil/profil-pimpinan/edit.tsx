import HeaderTitle from '@/components/header-title';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Edit, RotateCcw, FileText, User } from 'lucide-react';
import React from 'react';

interface ProfilPimpinan {
    id: number;
    nama: string;
    jabatan: string;
    deskripsi: string;
    foto: string | null;
}

interface EditProfilPimpinanProps {
    profilPimpinan: ProfilPimpinan;
}

export default function EditProfilPimpinan({
    profilPimpinan,
}: EditProfilPimpinanProps) {
    const [isResetting, setIsResetting] = React.useState(false);

    const [currentImage] = React.useState<string | null>(
        profilPimpinan.foto ?? null,
    );

    const [newImagePreview, setNewImagePreview] =
        React.useState<string | null>(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        nama: profilPimpinan.nama ?? '',
        jabatan: profilPimpinan.jabatan ?? '',
        deskripsi: profilPimpinan.deskripsi ?? '',
        foto: null as File | null,
        _method: 'put',
    });

    const handleReset = () => {
        setIsResetting(true);
        reset();
        setNewImagePreview(null);
        setTimeout(() => setIsResetting(false), 300);
    };

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(
            `/backoffice/profil/profil-pimpinan/${profilPimpinan.id}/update`,
            {
                forceFormData: true,
            },
        );
    };

    return (
        <AppLayoutRedesign>
            <Head title="Profil Pimpinan">
                <meta name="description" content="Halaman Profil Pimpinan" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Ubah Profil Pimpinan"
                        subtitle="Kelola data profil pimpinan yang ditampilkan pada halaman profil."
                        icon={User}
                    />

                    <Button asChild variant="blue">
                        <Link href="/backoffice/profil/profil-pimpinan">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={onHandleSubmit}>
                            
                            {/* Nama */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Nama <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData('nama', e.target.value)
                                    }
                                    className={
                                        errors.nama ? 'border-red-500' : ''
                                    }
                                />
                                {errors.nama && (
                                    <InputError message={errors.nama} />
                                )}
                            </div>

                            {/* Jabatan */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Jabatan <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.jabatan}
                                    onChange={(e) =>
                                        setData('jabatan', e.target.value)
                                    }
                                    className={
                                        errors.jabatan ? 'border-red-500' : ''
                                    }
                                />
                                {errors.jabatan && (
                                    <InputError message={errors.jabatan} />
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

                            {/* Foto */}
                            <div className="grid gap-1.5">
                                <Label>Foto</Label>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file =
                                            e.target.files?.[0] ?? null;

                                        setData('foto', file);

                                        if (file) {
                                            setNewImagePreview(
                                                URL.createObjectURL(file),
                                            );
                                        } else {
                                            setNewImagePreview(null);
                                        }
                                    }}
                                    className={
                                        errors.foto ? 'border-red-500' : ''
                                    }
                                />

                                {(currentImage || newImagePreview) && (
                                    <div className="mt-6 grid gap-6 md:grid-cols-2">

                                        {/* Current Image */}
                                        {currentImage && (
                                            <div>
                                                <Label className="mb-2 block text-sm font-medium">
                                                    Foto Saat Ini
                                                </Label>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <img
                                                            src={currentImage}
                                                            alt="Current"
                                                            className="h-64 w-full max-w-sm cursor-zoom-in rounded-2xl border object-contain shadow-md"
                                                        />
                                                    </DialogTrigger>

                                                    <DialogContent className="max-w-5xl">
                                                        <img
                                                            src={currentImage}
                                                            alt="Current Large"
                                                            className="mx-auto max-h-[85vh] rounded-2xl object-contain"
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        )}

                                        {/* New Preview */}
                                        {newImagePreview && (
                                            <div>
                                                <Label className="mb-2 block text-sm font-medium text-blue-600">
                                                    Pratinjau Foto Baru
                                                </Label>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <img
                                                            src={newImagePreview}
                                                            alt="New Preview"
                                                            className="h-64 w-full max-w-sm cursor-zoom-in rounded-2xl border border-blue-400 object-contain shadow-md"
                                                        />
                                                    </DialogTrigger>

                                                    <DialogContent className="max-w-5xl">
                                                        <img
                                                            src={newImagePreview}
                                                            alt="New Large"
                                                            className="mx-auto max-h-[85vh] rounded-2xl object-contain"
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {errors.foto && (
                                    <InputError message={errors.foto} />
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
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Edit className="size-4" />
                                            Ubah
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