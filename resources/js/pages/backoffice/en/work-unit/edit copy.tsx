import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ubah Publikasi',
        href: '/backoffice/publikasi/edit',
    },
];

type CategoryItem = {
    id: string;
    name: string;
}

type PublikasiItem = {
    id: number;
    title: string;
    status: string
    publication_category: CategoryItem
    document: string;
    cover_url: string;
}

type PageProps = {
    categories: CategoryItem[]
    publication: PublikasiItem
}

const EditPublikasiPage = () => {

    const { categories, publication } = usePage<PageProps>().props

    console.log(publication);

    const { data, setData, post, errors, processing } = useForm<{
        category: string;
        title: string;
        status: string;
        document: File | null;
        cover: File | null;
    }>({
        category: publication.publication_category.id,
        title: publication.title,
        status: publication.status,
        document: null,
        cover: null
    })

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('backoffice.publikasi.update', publication.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Publikasi" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Ubah Publikasi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFormSubmit}>
                            <div className=' grid grid-cols-2 gap-4'>
                                <div className='col-span-2 md:col-span-1'>
                                    <Label htmlFor='kategori'>Kategori</Label>
                                    <Select value={data.category} onValueChange={(e) => setData('category', e)}>
                                        <SelectTrigger id='kategori' aria-invalid={errors.category ? 'true' : 'false'}>
                                            <SelectValue placeholder="Pilih Kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category} />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <Label htmlFor='status'>Status</Label>
                                    <Select value={data.status} onValueChange={(e) => setData('status', e)}>
                                        <SelectTrigger id='status' aria-invalid={errors.status ? 'true' : 'false'}>
                                            <SelectValue placeholder="Pilih Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="DINAIKAN">Dinaikan</SelectItem>
                                            <SelectItem value="DIAJUKAN">Diajukan</SelectItem>
                                            <SelectItem value="DITURUNKAN">Diturunkan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='title'>Judul</Label>
                                    <Input 
                                        type='text' 
                                        id='title' 
                                        placeholder='Judul'
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        aria-invalid={errors.title ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='cover'>Pilih Gambar</Label>
                                    <Input
                                        type='file'
                                        id='cover'
                                        accept='image/*'
                                        onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        setData('cover', file);
                                        }}
                                        aria-invalid={errors.cover ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.cover} />

                                    <div className="mt-2">
                                        {data.cover ? (
                                        <img
                                            src={URL.createObjectURL(data.cover)}
                                            alt="Preview Baru"
                                            className="w-32 object-cover rounded"
                                        />
                                        ) : publication.cover_url && (
                                        <img
                                            src={publication.cover_url}
                                            alt="Preview Lama"
                                            className="w-32 object-cover rounded"
                                        />
                                        )}
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='document'>Pilih Berkas</Label>
                                    <Input
                                        type='file'
                                        id='document'
                                        // accept='image/*'
                                        onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        setData('document', file);
                                        }}
                                        aria-invalid={errors.document ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.document} />
                                </div>

                            </div>

                            <div className='mt-4 text-end'>
                                <Button 
                                    className='' 
                                    type='submit'
                                    disabled={processing}
                                >
                                    {processing && <Loader2 className='animate-spin' />}
                                    <span>Ubah Publikasi</span>
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}

export default EditPublikasiPage