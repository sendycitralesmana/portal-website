import HeaderTitle from '@/components/header-title';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, RotateCcw, Save, FileText } from 'lucide-react';
import React from 'react';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface SosialMediaForm extends Record<string, any> {
    platform: string;
    embed_url: string;
}

export default function CreateSosialMedia() {
    const [isResetting, setIsResetting] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const { data, setData, post, reset, processing, errors } =
        useForm<SosialMediaForm>({
            platform: '',
            embed_url: '',
        });

    const handleReset = () => {
        setIsResetting(true);
        reset();
        setImagePreview(null);
        setTimeout(() => setIsResetting(false), 300);
    };

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/backoffice/sosial-media/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
        });
    };

    return (
        <AppLayoutRedesign>
            <Head title="Tambah Sosial Media" />

            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Tambah Sosial Media"
                        subtitle="Kelola data sosial media yang ditampilkan pada halaman sosial media."
                        icon={FileText}
                    />

                    <Button asChild variant="blue">
                        <Link href="/backoffice/sosial-media">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={onHandleSubmit}>
                            
                            {/* Platform */}
                            <div className="grid gap-1.5">
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
                            </div>

                            {/* Embed Url */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Embed Url <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.embed_url}
                                    onChange={(e) =>
                                        setData('embed_url', e.target.value)
                                    }
                                    placeholder="Masukkan embed url sosial media"
                                    className={
                                        errors.embed_url ? 'border-red-500' : ''
                                    }
                                />
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