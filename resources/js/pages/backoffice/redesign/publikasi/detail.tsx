import { Head, Link, router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import HeaderTitle from '@/components/header-title';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';

import { ArrowLeft, Calendar, Eye, File, ImageIcon, Newspaper, Pencil, Plus } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import DeleteDialogPublikasiMedia from './delete-dialog-publikasi-media';

const PublikasiDetailPage = ({ publikasi }: any) => {
    const gambarMedia = publikasi.media?.filter((m: any) => m.kategori === 'gambar') ?? [];
    const dokumenMedia = publikasi.media?.filter((m: any) => m.kategori === 'dokumen') ?? [];

    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        judul: '',
        deskripsi: '',
        file: null as File | null,
    });

    const [preview, setPreview] = useState<string | null>(null);

    const [addForm, setAddForm] = useState({
        kategori: '',
        judul: '',
        deskripsi: '',
        file: null as File | null,
    });

    const [addPreview, setAddPreview] = useState<string | null>(null);

    const startEdit = (media: any) => {
        setEditingId(media.id);

        setForm({
            judul: media.judul ?? '',
            deskripsi: media.deskripsi ?? '',
            file: null,
        });

        setPreview(null);
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];

        setForm({
            ...form,
            file: file,
        });

        if (file && file.type.startsWith('image')) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const updateMedia = (id: number) => {
        const data = new FormData();

        data.append('judul', form.judul);
        data.append('deskripsi', form.deskripsi);

        if (form.file) {
            data.append('file', form.file);
        }

        router.post(`/backoffice/publikasi-media/${id}/update`, data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setEditingId(null);
                setPreview(null);
            },
        });
    };

    const [addImageForm, setAddImageForm] = useState({
        judul: '',
        deskripsi: '',
        file: null as File | null,
    });

    const [addDocForm, setAddDocForm] = useState({
        judul: '',
        deskripsi: '',
        file: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageFile = (e: any) => {
        const file = e.target.files[0];

        setAddImageForm({
            ...addImageForm,
            file: file,
        });

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleDocFile = (e: any) => {
        const file = e.target.files[0];

        setAddDocForm({
            ...addDocForm,
            file: file,
        });
    };

    const storeImage = () => {
        const data = new FormData();

        data.append('publikasi_id', publikasi.id);
        data.append('kategori', 'gambar');
        data.append('judul', addImageForm.judul);
        data.append('deskripsi', addImageForm.deskripsi);

        if (addImageForm.file) {
            data.append('file', addImageForm.file);
        }

        router.post('/backoffice/publikasi-media/store', data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setAddImageForm({
                    judul: '',
                    deskripsi: '',
                    file: null,
                });
                setImagePreview(null);
            },
        });
    };

    const storeDoc = () => {
        const data = new FormData();

        data.append('publikasi_id', publikasi.id);
        data.append('kategori', 'dokumen');
        data.append('judul', addDocForm.judul);
        data.append('deskripsi', addDocForm.deskripsi);

        if (addDocForm.file) {
            data.append('file', addDocForm.file);
        }

        router.post('/backoffice/publikasi-media/store', data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setAddDocForm({
                    judul: '',
                    deskripsi: '',
                    file: null,
                });
            },
        });
    };

    return (
        <AppLayoutRedesign>
            <Head title="Publikasi">
                <meta name="description" content="Halaman Publikasi" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-24">
                <div className="mb-6 flex justify-between">
                    <HeaderTitle title="Detail Publikasi" subtitle="Tampilan publikasi seperti artikel." icon={Newspaper} />

                    <Button asChild variant="blue">
                        <Link href="/backoffice/publikasi">
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-8">
                        <div className="mx-auto max-w-4xl space-y-6">
                            <div className="flex items-start justify-between">
                                <h1 className="text-3xl font-bold">{publikasi.judul}</h1>

                                <Button asChild size="sm" className="bg-amber-400 hover:bg-amber-500">
                                    <Link href={`/backoffice/publikasi/${publikasi.id}/edit`}>
                                        <Pencil className="size-4 mr-1" />
                                        Edit
                                    </Link>
                                </Button>
                            </div>

                            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                                <span className="rounded bg-blue-100 px-3 py-1 text-blue-700">{publikasi.jenis}</span>

                                <span className="rounded bg-gray-100 px-3 py-1">{publikasi.kategori}</span>

                                <div className="flex items-center gap-1">
                                    <Calendar className="size-4" />
                                    {publikasi.created_at}
                                </div>
                            </div>

                            {/* {publikasi.gambar && (
                                <div className="overflow-hidden rounded-xl border">
                                    <img src={publikasi.gambar} alt={publikasi.judul} className="w-full object-cover" />
                                </div>
                            )} */}

                            {publikasi.gambar && (
                                <div className="relative h-[450px] overflow-hidden rounded-xl border">
                                    {/* Background Blur */}
                                    <img
                                        src={publikasi.gambar}
                                        alt=""
                                        className="absolute inset-0 h-full w-full scale-110 object-cover blur-3xl grayscale opacity-40"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gray-200/60 dark:bg-black/40" />

                                    {/* Gambar Asli */}
                                    <div className="relative flex h-full w-full items-center justify-center">
                                        <img
                                            src={publikasi.gambar}
                                            alt={publikasi.judul}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="prose max-w-none text-justify break-words whitespace-pre-line" dangerouslySetInnerHTML={{ __html: publikasi.deskripsi }} />
                        </div>

                        <div className="mx-auto mt-12 max-w-5xl space-y-10 border-t pt-10">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    storeImage();
                                }}
                            >
                                <Card>
                                    <CardContent className="space-y-3 p-4">
                                        <div className="flex items-center gap-2 font-semibold">
                                            <Plus className="size-4" />
                                            Tambah Gambar
                                        </div>

                                        {imagePreview && <img src={imagePreview} className="max-h-32 rounded border" />}

                                        <Input type="file" accept="image/*" onChange={handleImageFile} required />

                                        <Input
                                            placeholder="Judul"
                                            value={addImageForm.judul}
                                            onChange={(e) => setAddImageForm({ ...addImageForm, judul: e.target.value })}
                                            required
                                        />

                                        <Textarea
                                            placeholder="Deskripsi"
                                            value={addImageForm.deskripsi}
                                            onChange={(e) =>
                                                setAddImageForm({
                                                    ...addImageForm,
                                                    deskripsi: e.target.value,
                                                })
                                            }
                                        />

                                        <Button size="sm" type="submit">
                                            Tambah
                                        </Button>
                                    </CardContent>
                                </Card>
                            </form>

                            {gambarMedia.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="size-5 text-blue-500" />
                                        <h3 className="text-lg font-semibold">Galeri Gambar</h3>
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                                        {gambarMedia.map((media: any) => (
                                            <Card key={media.id} className="overflow-hidden">
                                                <div className="bg-muted flex h-48 items-center justify-center p-3">
                                                    <img src={media.file} className="max-h-full max-w-full object-contain" />
                                                </div>

                                                <CardContent className="space-y-3 p-4">
                                                    {editingId === media.id ? (
                                                        <>
                                                            {preview && <img src={preview} className="max-h-32 rounded border" />}

                                                            <Input type="file" accept="image/*" onChange={handleFileChange} />

                                                            <Input value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} />

                                                            <Textarea
                                                                value={form.deskripsi}
                                                                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                                                            />

                                                            <div className="flex gap-2">
                                                                <Button size="sm" onClick={() => updateMedia(media.id)}>
                                                                    Simpan
                                                                </Button>

                                                                <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                                                                    Batal
                                                                </Button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div>
                                                                <p className="font-semibold">{media.judul ?? 'Tanpa Judul'}</p>

                                                                {media.deskripsi && (
                                                                    <p className="text-muted-foreground text-sm">{media.deskripsi}</p>
                                                                )}
                                                            </div>

                                                            <div className="flex justify-end gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => startEdit(media)}
                                                                    className="bg-amber-400 hover:bg-amber-500"
                                                                >
                                                                    <Pencil className="size-4" />
                                                                </Button>

                                                                <DeleteDialogPublikasiMedia id={media.id} />
                                                            </div>
                                                        </>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* TAMBAH DOKUMEN */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    storeDoc();
                                }}
                            >
                                <Card>
                                    <CardContent className="space-y-3 p-4">
                                        <div className="flex items-center gap-2 font-semibold">
                                            <Plus className="size-4" />
                                            Tambah Dokumen
                                        </div>

                                        <Input type="file" accept="application/pdf" onChange={handleDocFile} required />

                                        <Input
                                            placeholder="Judul"
                                            value={addDocForm.judul}
                                            onChange={(e) => setAddDocForm({ ...addDocForm, judul: e.target.value })}
                                            required
                                        />

                                        <Textarea
                                            placeholder="Deskripsi"
                                            value={addDocForm.deskripsi}
                                            onChange={(e) =>
                                                setAddDocForm({
                                                    ...addDocForm,
                                                    deskripsi: e.target.value,
                                                })
                                            }
                                        />

                                        <Button size="sm" type="submit">
                                            Tambah
                                        </Button>
                                    </CardContent>
                                </Card>
                            </form>

                            {dokumenMedia.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <File className="size-5 text-red-500" />
                                        <h3 className="text-lg font-semibold">Dokumen Lampiran</h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {dokumenMedia.map((media: any) => (
                                            <Card key={media.id}>
                                                <CardContent className="flex items-start justify-between gap-4 p-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="rounded-lg bg-red-100 p-2">
                                                            <File className="size-5 text-red-600" />
                                                        </div>

                                                        {editingId === media.id ? (
                                                            <div className="space-y-2">
                                                                <Input type="file" accept="application/pdf" onChange={handleFileChange} />

                                                                <Input
                                                                    value={form.judul}
                                                                    onChange={(e) => setForm({ ...form, judul: e.target.value })}
                                                                />

                                                                <Textarea
                                                                    value={form.deskripsi}
                                                                    onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                                                                />

                                                                <div className="flex gap-2">
                                                                    <Button size="sm" onClick={() => updateMedia(media.id)}>
                                                                        Simpan
                                                                    </Button>

                                                                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                                                                        Batal
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <p className="font-semibold">{media.judul ?? 'Dokumen'}</p>

                                                                {media.deskripsi && (
                                                                    <p className="text-muted-foreground text-sm">{media.deskripsi}</p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <a href={media.file} target="_blank" className="rounded-md bg-blue-700 p-2 text-white">
                                                            <Eye className="size-4" />
                                                        </a>

                                                        <Button
                                                            size="sm"
                                                            className="bg-amber-400 hover:bg-amber-500"
                                                            onClick={() => startEdit(media)}
                                                        >
                                                            <Pencil className="size-4" />
                                                        </Button>

                                                        <DeleteDialogPublikasiMedia id={media.id} />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayoutRedesign>
    );
};

export default PublikasiDetailPage;
