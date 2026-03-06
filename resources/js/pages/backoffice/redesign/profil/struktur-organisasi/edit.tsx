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
import { ArrowLeft, RotateCcw, Save, FileText, Info, Network } from 'lucide-react';
import React from 'react';

interface StrukturOrganisasi {
    id: number;
    gambar: string | null;
}

interface EditStrukturOrganisasiProps {
    strukturOrganisasi: StrukturOrganisasi;
}

export default function EditStrukturOrganisasi({ strukturOrganisasi }: EditStrukturOrganisasiProps) {
    const [isResetting, setIsResetting] = React.useState(false);
    const [newImagePreview, setNewImagePreview] = React.useState<string | null>(null);

    const { data, setData, reset, post, processing, errors } = useForm({
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
        post(`/redesign/backoffice/profil/struktur-organisasi/${strukturOrganisasi.id}/update`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayoutRedesign>
            <Head title="Struktur Organisasi" >
                <meta name="description" content="Halaman Struktur Organisasi"  />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Ubah Struktur Organisasi"
                        subtitle="Kelola informasi struktur organisasi yang ditampilkan pada halaman profil."
                        icon={Network}
                    />

                    <Button asChild variant="blue">
                        <Link href="/redesign/backoffice/profil/struktur-organisasi">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={onHandleSubmit}>

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

                                {(strukturOrganisasi.gambar || newImagePreview) && (
                                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                                        {strukturOrganisasi.gambar && !newImagePreview && (
                                            <div>
                                                <Label className="mb-2 block text-sm font-medium">Gambar Saat Ini</Label>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <img
                                                            src={strukturOrganisasi.gambar}
                                                            alt="Current"
                                                            className="h-64 w-full max-w-sm cursor-zoom-in rounded-2xl border object-contain shadow-md"
                                                        />
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-5xl">
                                                        <img
                                                            src={strukturOrganisasi.gambar}
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