import HeaderTitle from '@/components/header-title';
import InputError from '@/components/input-error';
import SearchableSelect from '@/components/searchable-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Newspaper, RotateCcw, Save } from 'lucide-react';
import React from 'react';

interface PublikasiMediaItem {
    kategori: string;
    judul: string;
    deskripsi: string;
    file: File | null;
    preview?: string | null;
}

interface PublikasiForm extends Record<string, any> {
    jenis: string;
    kategori: string;
    judul: string;
    deskripsi: string;
    gambar: File | null;
    media: PublikasiMediaItem[];
}

export default function CreatePublikasi() {
    const [isResetting, setIsResetting] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const { data, setData, post, reset, processing, errors } = useForm<PublikasiForm>({
        jenis: '',
        kategori: '',
        judul: '',
        deskripsi: '',
        gambar: null,
        media: [],
    });

    const jenisOptions = [
        { label: 'LPSK-BERITA', value: 'LPSK-BERITA' },
        { label: 'LPSK-PUBLIKASI', value: 'LPSK-PUBLIKASI' },
    ];

    const kategoriOptions = [
        { label: 'Siaran Pers', value: 'Siaran Pers' },
        { label: 'Warta Hukum', value: 'Warta Hukum' },
        { label: 'Buku', value: 'Buku' },
        { label: 'Buletin', value: 'Buletin' },
        { label: 'Jurnal', value: 'Jurnal' },
        { label: 'Artikel', value: 'Artikel' },
        { label: 'Informasi', value: 'Informasi' },
        { label: 'Kegiatan', value: 'Kegiatan' },
        { label: 'Kalender Kegiatan', value: 'Kalender Kegiatan' },
        { label: 'Galeri', value: 'Galeri' },
        { label: 'Video', value: 'Video' },
        { label: 'Laporan', value: 'Laporan' },
        { label: 'Berita', value: 'Berita' },
        { label: 'Berita Foto', value: 'Berita Foto' },
    ];

    const handleReset = () => {
        setIsResetting(true);
        reset();
        setImagePreview(null);
        setTimeout(() => setIsResetting(false), 300);
    };

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/backoffice/publikasi/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
        });
    };

    const addMedia = (kategori: string) => {
        setData('media', [...data.media, { kategori, judul: '', deskripsi: '', file: null, preview: null }]);
    };

    const updateMedia = (index: number, field: keyof PublikasiMediaItem, value: any) => {
        const newMedia = [...data.media];
        newMedia[index][field] = value;

        // khusus gambar, update preview
        if (field === 'file' && newMedia[index].kategori === 'gambar' && value) {
            newMedia[index].preview = URL.createObjectURL(value);
        }

        setData('media', newMedia);
    };

    const removeMedia = (index: number) => {
        const newMedia = [...data.media];
        newMedia.splice(index, 1);
        setData('media', newMedia);
    };

    return (
        <AppLayoutRedesign>
            <Head title="Publikasi" />
            <div className="flex w-full flex-col pb-32">
                {/* Header */}
                <div className="mb-8 flex justify-between">
                    <HeaderTitle
                        title="Tambah Publikasi"
                        subtitle="Kelola data publikasi yang ditampilkan pada halaman publikasi."
                        icon={Newspaper}
                    />
                    <Button asChild variant="blue">
                        <Link href="/backoffice/publikasi">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={onHandleSubmit}>
                            {/* Jenis */}
                            <SearchableSelect
                                label="Jenis"
                                required
                                options={jenisOptions}
                                value={data.jenis}
                                placeholder="Pilih jenis"
                                searchPlaceholder="Cari jenis..."
                                error={errors.jenis}
                                onChange={(value) => setData('jenis', value)}
                            />

                            {/* Kategori */}
                            <SearchableSelect
                                label="Kategori"
                                required
                                options={kategoriOptions}
                                value={data.kategori}
                                placeholder="Pilih kategori"
                                searchPlaceholder="Cari kategori..."
                                error={errors.kategori}
                                onChange={(value) => setData('kategori', value)}
                            />

                            {/* Judul */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Judul <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.judul}
                                    onChange={(e) => setData('judul', e.target.value)}
                                    placeholder="Masukkan judul"
                                    className={errors.judul ? 'border-red-500' : ''}
                                />
                                {errors.judul && <InputError message={errors.judul} />}
                            </div>

                            {/* Deskripsi */}
                            <div className="grid gap-1.5">
                                <Label>
                                    Deskripsi <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    rows={6}
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    placeholder="Tulis deskripsi publikasi..."
                                    className={errors.deskripsi ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                />
                                {errors.deskripsi && <InputError message={errors.deskripsi} />}
                            </div>

                            {/* Gambar utama */}
                            <div className="grid gap-1.5">
                                <Label>Gambar</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] ?? null;
                                        setData('gambar', file);
                                        setImagePreview(file ? URL.createObjectURL(file) : null);
                                    }}
                                    className={errors.gambar ? 'border-red-500' : ''}
                                />
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
                                {errors.gambar && <InputError message={errors.gambar} />}
                            </div>

                            {/* Publikasi Media */}
                            <div className="space-y-4 border-t pt-6">
                                <div>
                                    <Label className="text-lg font-semibold">Publikasi Media</Label>
                                    <p className="text-muted-foreground text-sm">Opsional. Tambahkan gambar atau dokumen pendukung publikasi.</p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* GAMBAR */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label>Gambar</Label>
                                            <Button type="button" size="sm" onClick={() => addMedia('gambar')}>
                                                Tambah Gambar
                                            </Button>
                                        </div>

                                        {data.media
                                            .map((item, index) => ({ ...item, index }))
                                            .filter((item) => item.kategori === 'gambar')
                                            .map((item) => (
                                                <Card key={item.index}>
                                                    <CardContent className="space-y-3 p-4">
                                                        <Input
                                                            placeholder="Judul gambar"
                                                            value={item.judul}
                                                            onChange={(e) => updateMedia(item.index, 'judul', e.target.value)}
                                                            className={errors[`media.${item.index}.judul`] ? 'border-red-500' : ''}
                                                        />
                                                        {errors[`media.${item.index}.judul`] && (
                                                            <InputError message={errors[`media.${item.index}.judul`]} />
                                                        )}

                                                        <Textarea
                                                            placeholder="Deskripsi gambar"
                                                            value={item.deskripsi}
                                                            onChange={(e) => updateMedia(item.index, 'deskripsi', e.target.value)}
                                                        />

                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => updateMedia(item.index, 'file', e.target.files?.[0] ?? null)}
                                                            className={errors[`media.${item.index}.file`] ? 'border-red-500' : ''}
                                                        />
                                                        {errors[`media.${item.index}.file`] && (
                                                            <InputError message={errors[`media.${item.index}.file`]} />
                                                        )}

                                                        {/* Preview Gambar */}
                                                        {item.preview && (
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <div className="mt-2 w-full cursor-zoom-in">
                                                                        <img
                                                                            src={item.preview}
                                                                            alt="Preview"
                                                                            className="h-40 w-full rounded-lg border object-contain shadow-sm transition hover:opacity-90"
                                                                        />
                                                                    </div>
                                                                </DialogTrigger>
                                                                <DialogContent className="max-w-4xl">
                                                                    <img
                                                                        src={item.preview}
                                                                        alt="Preview Large"
                                                                        className="mx-auto max-h-[85vh] w-auto rounded-lg object-contain"
                                                                    />
                                                                </DialogContent>
                                                            </Dialog>
                                                        )}

                                                        <Button type="button" variant="destructive" size="sm" onClick={() => removeMedia(item.index)}>
                                                            Hapus
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                    </div>

                                    {/* DOKUMEN */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label>Dokumen</Label>
                                            <Button type="button" size="sm" onClick={() => addMedia('dokumen')}>
                                                Tambah Dokumen
                                            </Button>
                                        </div>

                                        {data.media
                                            .map((item, index) => ({ ...item, index }))
                                            .filter((item) => item.kategori === 'dokumen')
                                            .map((item) => (
                                                <Card key={item.index}>
                                                    <CardContent className="space-y-3 p-4">
                                                        <Input
                                                            placeholder="Judul dokumen"
                                                            value={item.judul}
                                                            onChange={(e) => updateMedia(item.index, 'judul', e.target.value)}
                                                            className={errors[`media.${item.index}.judul`] ? 'border-red-500' : ''}
                                                        />
                                                        {errors[`media.${item.index}.judul`] && (
                                                            <InputError message={errors[`media.${item.index}.judul`]} />
                                                        )}

                                                        <Textarea
                                                            placeholder="Deskripsi dokumen"
                                                            value={item.deskripsi}
                                                            onChange={(e) => updateMedia(item.index, 'deskripsi', e.target.value)}
                                                        />

                                                        <Input
                                                            type="file"
                                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                                            onChange={(e) => updateMedia(item.index, 'file', e.target.files?.[0] ?? null)}
                                                            className={errors[`media.${item.index}.file`] ? 'border-red-500' : ''}
                                                        />
                                                        {errors[`media.${item.index}.file`] && (
                                                            <InputError message={errors[`media.${item.index}.file`]} />
                                                        )}

                                                        <Button type="button" variant="destructive" size="sm" onClick={() => removeMedia(item.index)}>
                                                            Hapus
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                    </div>
                                </div>
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

                                <Button type="submit" disabled={processing} variant="blue" className="flex items-center gap-2">
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
