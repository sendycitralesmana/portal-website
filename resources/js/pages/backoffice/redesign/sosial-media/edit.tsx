import HeaderTitle from '@/components/header-title';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Edit, RotateCcw, FileText, Share2 } from 'lucide-react';
import React from 'react';
import pejabatStruktural from '@/pages/frontoffice/redesign/profil/pejabat-struktural';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface SosialMedia {
    id: number;
    platform: string;
    embed_url: string;
}

interface EditSosialMediaProps {
    sosialMedia: SosialMedia;
}

export default function EditSosialMedia({
    sosialMedia,
}: EditSosialMediaProps) {
    const [isResetting, setIsResetting] = React.useState(false);

    const [newImagePreview, setNewImagePreview] =
        React.useState<string | null>(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        platform: sosialMedia.platform ?? '',
        embed_url: '',
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
            `/redesign/backoffice/sosial-media/${sosialMedia.id}/update`,
            {
                forceFormData: true,
            },
        );
    };

    return (
        <AppLayoutRedesign>
            <Head title="Sosial Media">
                <meta name="description" content="Halaman Sosial Media" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Ubah Sosial Media"
                        subtitle="Kelola data sosial media yang ditampilkan pada halaman sosial media."
                        icon={Share2}
                    />

                    <Button asChild variant="blue">
                        <Link href="/redesign/backoffice/sosial-media">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={onHandleSubmit}>
                            
                            {/* Platform */}
                            {/* <div className="grid gap-1.5">
                                <Label>
                                    Platform <span className="text-red-500">*</span>
                                </Label>

                                <Select
                                    value={data.platform}
                                    onValueChange={(value) => setData('platform', value)}
                                >
                                    <SelectTrigger
                                        className={errors.platform ? 'border-red-500' : ''}
                                    >
                                        <SelectValue placeholder="Pilih platform sosial media" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="instagram">
                                            Instagram
                                        </SelectItem>
                                        <SelectItem value="tiktok">
                                            TikTok
                                        </SelectItem>
                                        <SelectItem value="youtube">
                                            YouTube
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {errors.platform && (
                                    <InputError message={errors.platform} />
                                )}
                            </div> */}

                            {/* Platform (Tidak Bisa Diubah) */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Platform <span className="text-red-500">*</span>
                                </Label>

                                <Input
                                    value={sosialMedia.platform}
                                    readOnly
                                    className=" cursor-not-allowed"
                                />

                                {/* Hidden field supaya tetap terkirim */}
                                <input type="hidden" name="platform" value={data.platform} />
                            </div>

                            {/* Embed Saat Ini */}
                            <div className="grid gap-1.5">
                                <Label>Embed Saat Ini</Label>
                                <Input
                                    value={sosialMedia.embed_url}
                                    readOnly
                                    className=""
                                />
                            </div>

                            {/* Embed Baru (Opsional) */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Embed ID Baru (Opsional)
                                </Label>

                                <Input
                                    placeholder="Masukkan ID saja (contoh: DVIv_ysEp8I)"
                                    value={data.embed_url}
                                    onChange={(e) =>
                                        setData('embed_url', e.target.value)
                                    }
                                    className={
                                        errors.embed_url ? 'border-red-500' : ''
                                    }
                                />

                                <p className="text-xs text-gray-500">
                                    Kosongkan jika tidak ingin mengubah embed.
                                </p>

                                {errors.embed_url && (
                                    <InputError message={errors.embed_url} />
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