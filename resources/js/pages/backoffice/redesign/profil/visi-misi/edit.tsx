import HeaderTitle from '@/components/header-title';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Edit, FileText, RotateCcw, Target } from 'lucide-react';
import React from 'react';

interface VisiMisi {
    id: number;
    kategori: string;
    deskripsi: string;
    gambar: string;
}

interface EditVisiMisiProps {
    visiMisi: VisiMisi;
}

export default function EditVisiMisi({ visiMisi }: EditVisiMisiProps) {
    const [isResetting, setIsResetting] = React.useState(false);

    // gambar dari database (tidak berubah)
    const [currentImage] = React.useState<string | null>(
        visiMisi.gambar ?? null,
    );

    // Pratinjau gambar baru
    const [newImagePratinjau, setNewImagePratinjau] =
        React.useState<string | null>(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        kategori: visiMisi.kategori ?? '',
        deskripsi: visiMisi.deskripsi ?? '',
        gambar: null as File | null,
        _method: 'put',
    });

    const handleReset = () => {
        setIsResetting(true);
        reset();
        setNewImagePratinjau(null);
        setTimeout(() => setIsResetting(false), 300);
    };

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(
            `/redesign/backoffice/profil/visi-misi/${visiMisi.id}/update`,
            {
                forceFormData: true,
            },
        );
    };

    return (
        <AppLayoutRedesign>
            <Head title="Visi & Misi">
                <meta name="description" content="Halaman Visi & Misi" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title="Ubah Visi & Misi"
                        subtitle="Kelola data visi misi untuk ditampilkan pada halaman profil."
                        icon={Target}
                    />

                    <Button size="lg" asChild variant="blue">
                        <Link href="/redesign/backoffice/profil/visi-misi">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                {/* Form */}
                <Card>
                    <CardContent className="p-6">
                        <form
                            className="space-y-6"
                            onSubmit={onHandleSubmit}
                        >
                            {/* Kategori */}
                            <div className="grid w-full gap-1.5">
                                <Label>
                                    Kategori{' '}
                                    <span className="text-red-500">*</span>
                                </Label>

                                <Select
                                    value={data.kategori}
                                    onValueChange={(value) =>
                                        setData('kategori', value)
                                    }
                                >
                                    <SelectTrigger
                                        className={
                                            errors.kategori
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    >
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="visi">
                                            Visi
                                        </SelectItem>
                                        <SelectItem value="misi">
                                            Misi
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {errors.kategori && (
                                    <InputError message={errors.kategori} />
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div className="grid w-full gap-1.5">
                                <Label>
                                    Deskripsi{' '}
                                    <span className="text-red-500">*</span>
                                </Label>

                                <Textarea
                                    rows={6}
                                    value={data.deskripsi}
                                    onChange={(e) =>
                                        setData(
                                            'deskripsi',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Tulis deskripsi visi atau misi..."
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

                            {/* Gambar */}
                            <div className="grid w-full gap-1.5">
                                <Label>Gambar</Label>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file =
                                            e.target.files?.[0] ?? null;

                                        setData('gambar', file);

                                        if (file) {
                                            setNewImagePratinjau(
                                                URL.createObjectURL(file),
                                            );
                                        } else {
                                            setNewImagePratinjau(null);
                                        }
                                    }}
                                    className={
                                        errors.gambar
                                            ? 'border-red-500'
                                            : ''
                                    }
                                />

                                {/* Pratinjau Section */}
                                {(currentImage || newImagePratinjau) && (
                                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                        
                                        {/* Gambar Saat Ini */}
                                        {currentImage && (
                                            <div>
                                                <Label className="mb-2 block text-sm font-medium">
                                                    Gambar Saat Ini
                                                </Label>
                                                <div className="flex h-64 items-center justify-center rounded-xl border p-4 shadow-sm">
                                                    <img
                                                        src={currentImage}
                                                        alt="Gambar Saat Ini"
                                                        className="max-h-full max-w-full object-contain"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Pratinjau Gambar Baru */}
                                        {newImagePratinjau && (
                                            <div>
                                                <Label className="mb-2 block text-sm font-medium text-blue-600">
                                                    Pratinjau Gambar Baru
                                                </Label>
                                                <div className="flex h-64 items-center justify-center rounded-xl border border-blue-400 p-4 shadow-md">
                                                    <img
                                                        src={newImagePratinjau}
                                                        alt="Pratinjau Gambar Baru"
                                                        className="max-h-full max-w-full object-contain"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {errors.gambar && (
                                    <InputError message={errors.gambar} />
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-x-2">
                                <Button
                                    type="button"
                                    onClick={handleReset}
                                    disabled={isResetting}
                                    className="flex items-center gap-2 bg-amber-400 text-black hover:bg-amber-500"
                                >
                                    {isResetting ? (
                                        <>
                                            <RotateCcw className="size-4 animate-spin" />
                                            Resetting...
                                        </>
                                    ) : (
                                        <>
                                            <RotateCcw className="size-4" />
                                            Reset
                                        </>
                                    )}
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