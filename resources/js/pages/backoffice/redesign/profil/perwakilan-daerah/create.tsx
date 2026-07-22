import HeaderTitle from '@/components/header-title';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, RotateCcw, Save, FileText, MapPin } from 'lucide-react';
import React from 'react';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';

interface PerwakilanDaerahForm extends Record<string, any> {
    kantor: string;
    alamat: string;
    telepon: string;
    email: string;
    whatsapp: string;
    twitter: string;
    tiktok: string;
    youtube: string;
    instagram: string;
    latitude: string;
    longitude: string;
    lokasi: string;
    maps: string;
    gambar: File | null;
}

export default function CreatePerwakilanDaerah() {
    const [isResetting, setIsResetting] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const { data, setData, post, reset, processing, errors } =
        useForm<PerwakilanDaerahForm>({
            kantor: '',
            alamat: '',
            telepon: '',
            email: '',
            whatsapp: '',
            twitter: '',
            tiktok: '',
            youtube: '',
            instagram: '',
            latitude: '',
            longitude: '',
            lokasi: '',
            maps: '',
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

        post('/backoffice/profil/perwakilan-daerah/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
        });
    };

    return (
        <AppLayoutRedesign>
            <Head title="Perwakilan Daerah">
                <meta name="description" content="Halaman Perwakilan Daerah" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Tambah Perwakilan Daerah"
                        subtitle="Kelola data perwakilan daerah yang ditampilkan pada halaman profil."
                        icon={MapPin}
                    />

                    <Button asChild variant="blue">
                        <Link href="/backoffice/profil/perwakilan-daerah">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={onHandleSubmit}>

                            {/* Kantor */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Kantor <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.kantor}
                                    onChange={(e) =>
                                        setData('kantor', e.target.value)
                                    }
                                    placeholder="Masukkan kantor"
                                    className={
                                        errors.kantor ? 'border-red-500' : ''
                                    }
                                />
                                {errors.kantor && (
                                    <InputError message={errors.kantor} />
                                )}
                            </div>

                            {/* Alamat */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Alamat <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    rows={6}
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData('alamat', e.target.value)
                                    }
                                    placeholder="Tulis alamat perwakilan daerah..."
                                    className={
                                        errors.alamat
                                            ? 'border-red-500 focus-visible:ring-red-500'
                                            : ''
                                    }
                                />
                                {errors.alamat && (
                                    <InputError message={errors.alamat} />
                                )}
                            </div>

                            {/* Telepon */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Telepon <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.telepon}
                                    onChange={(e) =>
                                        setData('telepon', e.target.value)
                                    }
                                    placeholder="Masukkan telepon"
                                    className={
                                        errors.telepon ? 'border-red-500' : ''
                                    }
                                />
                                {errors.telepon && (
                                    <InputError message={errors.telepon} />
                                )}
                            </div>

                            {/* Email */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    placeholder="Masukkan email"
                                    className={
                                        errors.email ? 'border-red-500' : ''
                                    }
                                />
                                {errors.email && (
                                    <InputError message={errors.email} />
                                )}
                            </div>

                            {/* Whatsapp */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Whatsapp <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.whatsapp}
                                    onChange={(e) =>
                                        setData('whatsapp', e.target.value)
                                    }
                                    placeholder="Masukkan whatsapp"
                                    className={
                                        errors.whatsapp ? 'border-red-500' : ''
                                    }
                                />
                                {errors.whatsapp && (
                                    <InputError message={errors.whatsapp} />
                                )}
                            </div>

                            {/* Twitter */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Twitter <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.twitter}
                                    onChange={(e) =>
                                        setData('twitter', e.target.value)
                                    }
                                    placeholder="Masukkan twitter"
                                    className={
                                        errors.twitter ? 'border-red-500' : ''
                                    }
                                />
                                {errors.twitter && (
                                    <InputError message={errors.twitter} />
                                )}
                            </div>

                            {/* Tiktok */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Tiktok <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.tiktok}
                                    onChange={(e) =>
                                        setData('tiktok', e.target.value)
                                    }
                                    placeholder="Masukkan tiktok"
                                    className={
                                        errors.tiktok ? 'border-red-500' : ''
                                    }
                                />
                                {errors.tiktok && (
                                    <InputError message={errors.tiktok} />
                                )}
                            </div>

                            {/* YouTube */}
                            <div className="grid gap-1.5">
                                <Label>
                                    YouTube <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.youtube}
                                    onChange={(e) =>
                                        setData('youtube', e.target.value)
                                    }
                                    placeholder="Masukkan youtube"
                                    className={
                                        errors.youtube ? 'border-red-500' : ''
                                    }
                                />
                                {errors.youtube && (
                                    <InputError message={errors.youtube} />
                                )}
                            </div>

                            {/* Instagram */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Instagram <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.instagram}
                                    onChange={(e) =>
                                        setData('instagram', e.target.value)
                                    }
                                    placeholder="Masukkan instagram"
                                    className={
                                        errors.instagram ? 'border-red-500' : ''
                                    }
                                />
                                {errors.instagram && (
                                    <InputError message={errors.instagram} />
                                )}
                            </div>

                            {/* Lokasi */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Lokasi <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.lokasi}
                                    onChange={(e) =>
                                        setData('lokasi', e.target.value)
                                    }
                                    placeholder="Masukkan lokasi"
                                    className={
                                        errors.lokasi ? 'border-red-500' : ''
                                    }
                                />
                                {errors.lokasi && (
                                    <InputError message={errors.lokasi} />
                                )}
                            </div>

                            {/* Maps */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Maps <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    value={data.maps}
                                    onChange={(e) =>
                                        setData('maps', e.target.value)
                                    }
                                    placeholder="Masukkan maps"
                                    className={
                                        errors.maps ? 'border-red-500' : ''
                                    }
                                />
                                {errors.maps && (
                                    <InputError message={errors.maps} />
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