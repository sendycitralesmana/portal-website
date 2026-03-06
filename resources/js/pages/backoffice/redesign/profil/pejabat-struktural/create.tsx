import HeaderTitle from '@/components/header-title';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, RotateCcw, Save, FileText, Users } from 'lucide-react';
import React from 'react';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface PejabatStrukturalForm extends Record<string, any> {
    kategori: string;
    nama: string;
    jabatan: string;
    foto: File | null;
}

export default function CreatePejabatStruktural() {
    const [isResetting, setIsResetting] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const { data, setData, post, reset, processing, errors } =
        useForm<PejabatStrukturalForm>({
            kategori: '',
            nama: '',
            jabatan: '',
            foto: null,
        });

    const handleReset = () => {
        setIsResetting(true);
        reset();
        setImagePreview(null);
        setTimeout(() => setIsResetting(false), 300);
    };

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/redesign/backoffice/profil/pejabat-struktural/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
        });
    };

    return (
        <AppLayoutRedesign>
            <Head title="Pejabat Struktural">
                <meta name="description" content="Halaman Pejabat Struktural" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Tambah Pejabat Struktural"
                        subtitle="Kelola data pejabat struktural yang ditampilkan pada halaman profil."
                        icon={Users}
                    />

                    <Button asChild variant="blue">
                        <Link href="/redesign/backoffice/profil/pejabat-struktural">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={onHandleSubmit}>
                            
                            {/* Kategori */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Kategori <span className="text-red-500">*</span>
                                </Label>

                                <Select
                                    value={data.kategori}
                                    onValueChange={(value) => setData('kategori', value)}
                                >
                                    <SelectTrigger
                                        className={errors.kategori ? 'border-red-500' : ''}
                                    >
                                        <SelectValue placeholder="Pilih kategori pimpinan" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="sekretaris jenderal">
                                            Sekretaris Jenderal
                                        </SelectItem>
                                        <SelectItem value="kepala biro lpsk">
                                            Kepala Biro LPSK
                                        </SelectItem>
                                        <SelectItem value="kepala perwakilan lpsk daerah">
                                            Kepala Perwakilan LPSK Daerah
                                        </SelectItem>
                                        <SelectItem value="tenaga ahli">
                                            Tenaga Ahli
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {errors.kategori && (
                                    <InputError message={errors.kategori} />
                                )}
                            </div>

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
                                    placeholder="Masukkan nama pimpinan"
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
                                    placeholder="Masukkan jabatan"
                                    className={
                                        errors.jabatan ? 'border-red-500' : ''
                                    }
                                />
                                {errors.jabatan && (
                                    <InputError message={errors.jabatan} />
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
                                            setImagePreview(
                                                URL.createObjectURL(file),
                                            );
                                        } else {
                                            setImagePreview(null);
                                        }
                                    }}
                                    className={
                                        errors.foto ? 'border-red-500' : ''
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