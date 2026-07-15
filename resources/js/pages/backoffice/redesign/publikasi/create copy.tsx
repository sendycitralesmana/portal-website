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

interface PublikasiForm extends Record<string, any> {
    jenis: string;
    kategori: string;
    judul: string;
    deskripsi: string;
    gambar: File | null;
}

export default function CreatePerwakilanDaerah() {
    const [isResetting, setIsResetting] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const { data, setData, post, reset, processing, errors } = useForm<PublikasiForm>({
        jenis: '',
        kategori: '',
        judul: '',
        deskripsi: '',
        gambar: null,
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
        { label: 'Undang Undang Terkait', value: 'Undang Undang Terkait' },
        { label: 'Peraturan Pemerintah', value: 'Peraturan Pemerintah' },
        { label: 'Peraturan Presiden', value: 'Peraturan Presiden' },
        { label: 'Perma', value: 'Perma' },
        { label: 'Peraturan Lain', value: 'Peraturan Lain' },
        { label: 'Peraturan LPSK', value: 'Peraturan LPSK' },
        { label: 'Peraturan dan Keputusan Ketua LPSK', value: 'Peraturan dan Keputusan Ketua LPSK' },
        { label: 'Peraturan dan Keputusan Sekjen LPSK', value: 'Peraturan dan Keputusan Sekjen LPSK' },
        { label: 'Instansi Aparat Penegak Hukum', value: 'Instansi Aparat Penegak Hukum' },
        { label: 'Instansi Umum', value: 'Instansi Umum' },
        { label: 'Internasional', value: 'Internasional' },
        { label: 'Kesehatan', value: 'Kesehatan' },
        { label: 'Pendidikan', value: 'Pendidikan' },
        { label: 'LSM/Pers', value: 'LSM/Pers' },
        { label: 'Standar Pelayanan Pemerintah Permohonan', value: 'Standar Pelayanan Pemerintah Permohonan' },
        { label: 'Standar Pelayanan Proaktif dan Darurat', value: 'Standar Pelayanan Proaktif dan Darurat' },
        { label: 'Standar Pelayanan Informasi Publik', value: 'Standar Pelayanan Informasi Publik' },
        { label: 'Standar Pelayanan dan Pemenuhan Hak', value: 'Standar Pelayanan dan Pemenuhan Hak' },
        { label: 'Standar Pelayanan Penerimaan Permohonan', value: 'Standar Pelayanan Penerimaan Permohonan' },
        { label: 'Berita', value: 'Berita' },
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

    return (
        <AppLayoutRedesign>
            <Head title="Publikasi">
                <meta name="description" content="Halaman Publikasi" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

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
                                    placeholder="Tulis deskripsi perwakilan daerah..."
                                    className={errors.deskripsi ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                />
                                {errors.deskripsi && <InputError message={errors.deskripsi} />}
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

                                        if (file) {
                                            setImagePreview(URL.createObjectURL(file));
                                        } else {
                                            setImagePreview(null);
                                        }
                                    }}
                                    className={errors.gambar ? 'border-red-500' : ''}
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
