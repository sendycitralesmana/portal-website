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
import { ArrowLeft, RotateCcw, Save, FileText, MapPin } from 'lucide-react';
import React from 'react';

interface PerwakilanDaerah {
    id: number;
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
    gambar: string | null;
}

interface EditPerwakilanDaerahProps {
    perwakilanDaerah: PerwakilanDaerah;
}

export default function EditPerwakilanDaerah({
    perwakilanDaerah,
}: EditPerwakilanDaerahProps) {
    const [isResetting, setIsResetting] = React.useState(false);
    const [newImagePreview, setNewImagePreview] = React.useState<string | null>(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        kantor: perwakilanDaerah.kantor ?? '',
        alamat: perwakilanDaerah.alamat ?? '',
        telepon: perwakilanDaerah.telepon ?? '',
        email: perwakilanDaerah.email ?? '',
        whatsapp: perwakilanDaerah.whatsapp ?? '',
        twitter: perwakilanDaerah.twitter ?? '',
        tiktok: perwakilanDaerah.tiktok ?? '',
        youtube: perwakilanDaerah.youtube ?? '',
        instagram: perwakilanDaerah.instagram ?? '',
        latitude: perwakilanDaerah.latitude ?? '',
        longitude: perwakilanDaerah.longitude ?? '',
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
        post(`/backoffice/profil/perwakilan-daerah/${perwakilanDaerah.id}/update`, {
            forceFormData: true,
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
                        title="Ubah Perwakilan Daerah"
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
                                <Label>Kantor <span className="text-red-500">*</span></Label>
                                <Input
                                    value={data.kantor}
                                    onChange={(e) => setData('kantor', e.target.value)}
                                    placeholder="Masukkan kantor"
                                    className={errors.kantor ? 'border-red-500' : ''}
                                />
                                {errors.kantor && <InputError message={errors.kantor} />}
                            </div>

                            {/* Alamat */}
                            <div className="grid gap-1.5">
                                <Label>Alamat <span className="text-red-500">*</span></Label>
                                <Textarea
                                    rows={6}
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    placeholder="Tulis alamat perwakilan daerah..."
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

                            {/* WhatsApp */}
                            <div className="grid gap-1.5">
                                <Label>WhatsApp <span className="text-red-500">*</span></Label>
                                <Input
                                    value={data.whatsapp}
                                    onChange={(e) => setData('whatsapp', e.target.value)}
                                    placeholder="Masukkan nomor WhatsApp"
                                    className={errors.whatsapp ? 'border-red-500' : ''}
                                />
                                {errors.whatsapp && <InputError message={errors.whatsapp} />}
                            </div>

                            {/* Twitter */}
                            <div className="grid gap-1.5">
                                <Label>Twitter <span className="text-red-500">*</span></Label>
                                <Input
                                    value={data.twitter}
                                    onChange={(e) => setData('twitter', e.target.value)}
                                    placeholder="Masukkan username Twitter"
                                    className={errors.twitter ? 'border-red-500' : ''}
                                />
                                {errors.twitter && <InputError message={errors.twitter} />}
                            </div>

                            {/* TikTok */}
                            <div className="grid gap-1.5">
                                <Label>TikTok <span className="text-red-500">*</span></Label>
                                <Input
                                    value={data.tiktok}
                                    onChange={(e) => setData('tiktok', e.target.value)}
                                    placeholder="Masukkan username TikTok"
                                    className={errors.tiktok ? 'border-red-500' : ''}
                                />
                                {errors.tiktok && <InputError message={errors.tiktok} />}
                            </div>

                            {/* YouTube */}
                            <div className="grid gap-1.5">
                                <Label>YouTube <span className="text-red-500">*</span></Label>
                                <Input
                                    value={data.youtube}
                                    onChange={(e) => setData('youtube', e.target.value)}
                                    placeholder="Masukkan username YouTube"
                                    className={errors.youtube ? 'border-red-500' : ''}
                                />
                                {errors.youtube && <InputError message={errors.youtube} />}
                            </div>

                            {/* Instagram */}
                            <div className="grid gap-1.5">
                                <Label>Instagram <span className="text-red-500">*</span></Label>
                                <Input
                                    value={data.instagram}
                                    onChange={(e) => setData('instagram', e.target.value)}
                                    placeholder="Masukkan instagram"
                                    className={errors.instagram ? 'border-red-500' : ''}
                                />
                                {errors.instagram && <InputError message={errors.instagram} />}
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

                                {(perwakilanDaerah.gambar || newImagePreview) && (
                                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                                        {/* Current Image */}
                                        {perwakilanDaerah.gambar && !newImagePreview && (
                                            <div>
                                                <Label className="mb-2 block text-sm font-medium">Gambar Saat Ini</Label>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <img
                                                            src={perwakilanDaerah.gambar}
                                                            alt="Current"
                                                            className="h-64 w-full max-w-sm cursor-zoom-in rounded-2xl border object-contain shadow-md"
                                                        />
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-5xl">
                                                        <img
                                                            src={perwakilanDaerah.gambar}
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