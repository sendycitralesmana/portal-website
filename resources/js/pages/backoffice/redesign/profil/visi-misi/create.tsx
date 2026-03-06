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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, RotateCcw, Save, FileText, Target } from 'lucide-react';
import React from 'react';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';

interface VisiMisiForm extends Record<string, any> {
    kategori: string;
    deskripsi: string;
    gambar: File | null;
}

export default function CreateVisiMisi() {
    const [isResetting, setIsResetting] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const { data, setData, post, reset, processing, errors } =
        useForm<VisiMisiForm>({
            kategori: '',
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

        post('/redesign/backoffice/profil/visi-misi/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
        });
    };

    return (
        <AppLayoutRedesign>
            <Head title="Visi & Misi">
                <meta name="description" content="Halaman Visi & Misi" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Visi & Misi"
                        subtitle="Kelola data visi misi yang ditampilkan pada halaman profil."
                        icon={Target}
                    />

                    <Button asChild variant="blue">
                        <Link href="/redesign/backoffice/profil/visi-misi">
                            <ArrowLeft className="size-4" />
                            Back
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form
                            className="space-y-6"
                            onSubmit={onHandleSubmit}
                        >
                            {/* Kategori - Shadcn Select */}
                            <div className="grid gap-1.5">
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
                                    <InputError
                                        message={errors.kategori}
                                    />
                                )}
                            </div>

                            {/* Deskripsi - Shadcn Textarea */}
                            <div className="grid gap-1.5">
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
                                    <InputError
                                        message={errors.deskripsi}
                                    />
                                )}
                            </div>

                            {/* Gambar */}
                            <div className="grid gap-1.5">
                                <Label>Gambar</Label>

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
                                        errors.gambar
                                            ? 'border-red-500'
                                            : ''
                                    }
                                />

                                {imagePreview && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="mt-2 h-32 w-32 cursor-zoom-in rounded border object-cover hover:opacity-80"
                                            />
                                        </DialogTrigger>

                                        <DialogContent className="max-w-3xl">
                                            <img
                                                src={imagePreview}
                                                alt="Preview Large"
                                                className="mx-auto max-h-[90vh] rounded object-contain"
                                            />
                                        </DialogContent>
                                    </Dialog>
                                )}

                                {errors.gambar && (
                                    <InputError
                                        message={errors.gambar}
                                    />
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-x-3 pt-4">
                                <Button
                                    type="button"
                                    onClick={handleReset}
                                    disabled={isResetting}
                                    className="flex cursor-pointer items-center gap-2 bg-amber-400 text-black hover:bg-amber-500"
                                >
                                    <RotateCcw
                                        className={`size-4 ${
                                            isResetting
                                                ? 'animate-spin'
                                                : ''
                                        }`}
                                    />
                                    Reset
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    variant="blue"
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