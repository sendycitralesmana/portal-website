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
import { ArrowLeft, RotateCcw, Save, FileText, Info } from 'lucide-react';
import React from 'react';

interface TentangKami {
    id: number;
    alamat: string;
    telepon: string;
    hotline: string;
    whatsapp: string;
    email: string;
    jam_operasional: string;
    latitude: string;
    longitude: string;
    zoom: string;
    gambar: string | null;
}

interface EditTentangKamiProps {
    tentangKami: TentangKami;
}

export default function EditTentangKami({ tentangKami }: EditTentangKamiProps) {
    const [isResetting, setIsResetting] = React.useState(false);
    const [newImagePreview, setNewImagePreview] = React.useState<string | null>(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        alamat: tentangKami.alamat ?? '',
        telepon: tentangKami.telepon ?? '',
        hotline: tentangKami.hotline ?? '',
        whatsapp: tentangKami.whatsapp ?? '',
        email: tentangKami.email ?? '',
        jam_operasional: tentangKami.jam_operasional ?? '',
        latitude: tentangKami.latitude ?? '',
        longitude: tentangKami.longitude ?? '',
        zoom: tentangKami.zoom ?? '',
        gambar: null as File | null,
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
        post(`/backoffice/tentang-kami/${tentangKami.id}/update`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayoutRedesign>
            <Head title="Tentang Kami">
                <meta name="description" content="Halaman Tentang Kami" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Ubah Tentang Kami"
                        subtitle="Kelola informasi tentang kami yang ditampilkan pada halaman publik."
                        icon={Info}
                    />

                    <Button asChild variant="blue">
                        <Link href="/backoffice/tentang-kami">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={onHandleSubmit}>
                            {/* Alamat */}
                            <div className="grid gap-1.5">
                                <Label>Alamat <span className="text-red-500">*</span></Label>
                                <Textarea
                                    rows={4}
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    placeholder="Masukkan alamat"
                                    className={errors.alamat ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                />
                                {errors.alamat && <InputError message={errors.alamat} />}
                            </div>

                            {/* Telepon */}
                            <div className="grid gap-1.5">
                                <Label>Telepon <span className="text-red-500">*</span></Label>
                                <Input
                                    value={data.telepon}
                                    onChange={(e) => setData('telepon', e.target.value)}
                                    placeholder="Masukkan telepon"
                                    className={errors.telepon ? 'border-red-500' : ''}
                                />
                                {errors.telepon && <InputError message={errors.telepon} />}
                            </div>

                            {/* Hotline */}
                            <div className="grid gap-1.5">
                                <Label>Hotline <span className="text-red-500">*</span></Label>
                                <Input
                                    value={data.hotline}
                                    onChange={(e) => setData('hotline', e.target.value)}
                                    placeholder="Masukkan hotline"
                                    className={errors.hotline ? 'border-red-500' : ''}
                                />
                                {errors.hotline && <InputError message={errors.hotline} />}
                            </div>

                            {/* Whatsapp */}
                            <div className="grid gap-1.5">
                                <Label>Whatsapp <span className="text-red-500">*</span></Label>
                                <Input
                                    value={data.whatsapp}
                                    onChange={(e) => setData('whatsapp', e.target.value)}
                                    placeholder="Masukkan whatsapp"
                                    className={errors.whatsapp ? 'border-red-500' : ''}
                                />
                                {errors.whatsapp && <InputError message={errors.whatsapp} />}
                            </div>

                            {/* Email */}
                            <div className="grid gap-1.5">
                                <Label>Email <span className="text-red-500">*</span></Label>
                                <Input
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Masukkan email"
                                    className={errors.email ? 'border-red-500' : ''}
                                />
                                {errors.email && <InputError message={errors.email} />}
                            </div>

                            {/* Jam Operasional */}
                            <div className="grid gap-1.5">
                                <Label>Jam Operasional <span className="text-red-500">*</span></Label>
                                <Textarea
                                    rows={3}
                                    value={data.jam_operasional}
                                    onChange={(e) => setData('jam_operasional', e.target.value)}
                                    placeholder="Masukkan jam operasional"
                                    className={errors.jam_operasional ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                />
                                {errors.jam_operasional && <InputError message={errors.jam_operasional} />}
                            </div>

                            {/* Latitude */}
                            <div className="grid gap-1.5">
                                <Label>Latitude <span className="text-red-500">*</span></Label>
                                <Input
                                    value={data.latitude}
                                    onChange={(e) => setData('latitude', e.target.value)}
                                    placeholder="Masukkan latitude"
                                    className={errors.latitude ? 'border-red-500' : ''}
                                />
                                {errors.latitude && <InputError message={errors.latitude} />}
                            </div>

                            {/* Longitude */}
                            <div className="grid gap-1.5">
                                <Label>Longitude <span className="text-red-500">*</span></Label>
                                <Input
                                    value={data.longitude}
                                    onChange={(e) => setData('longitude', e.target.value)}
                                    placeholder="Masukkan longitude"
                                    className={errors.longitude ? 'border-red-500' : ''}
                                />
                                {errors.longitude && <InputError message={errors.longitude} />}
                            </div>

                            {/* Zoom */}
                            <div className="grid gap-1.5">
                                <Label>Zoom <span className="text-red-500">*</span></Label>
                                <Input
                                    type='number'
                                    max={100}
                                    min={50}
                                    value={data.zoom}
                                    onChange={(e) => setData('zoom', e.target.value)}
                                    placeholder="Masukkan zoom"
                                    className={errors.zoom ? 'border-red-500' : ''}
                                />
                                {errors.zoom && <InputError message={errors.zoom} />}
                            </div>

                            {/* Gambar */}
                            <div className="grid gap-1.5">
                                <Label>Gambar</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] ?? null;
                                        setData('gambar', file);
                                        if (file) setNewImagePreview(URL.createObjectURL(file));
                                        else setNewImagePreview(null);
                                    }}
                                    className={errors.gambar ? 'border-red-500' : ''}
                                />

                                {(tentangKami.gambar || newImagePreview) && (
                                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                                        {tentangKami.gambar && !newImagePreview && (
                                            <div>
                                                <Label className="mb-2 block text-sm font-medium">Gambar Saat Ini</Label>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <img
                                                            src={tentangKami.gambar}
                                                            alt="Current"
                                                            className="h-64 w-full max-w-sm cursor-zoom-in rounded-2xl border object-contain shadow-md"
                                                        />
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-5xl">
                                                        <img
                                                            src={tentangKami.gambar}
                                                            alt="Current Large"
                                                            className="mx-auto max-h-[85vh] rounded-2xl object-contain"
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        )}

                                        {newImagePreview && (
                                            <div>
                                                <Label className="mb-2 block text-sm font-medium text-blue-600">
                                                    Pratinjau Gambar Baru
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

                                {errors.gambar && <InputError message={errors.gambar} />}
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