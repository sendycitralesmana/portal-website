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
        title: 'Tambah Berita',
        href: '/backoffice/berita/add',
    },
];

type CategoryItem = {
    id: string;
    name: string;
}

type PageProps = {
    categories: CategoryItem[]
    category: CategoryItem
}

const AddBeritaPage = () => {

    const { categories, category } = usePage<PageProps>().props

    const { data, setData, post, errors, processing } = useForm<{
        category: string;
        title: string;
        content: string;
        cover: File | null;
    }>({
        category: '',
        title: '',
        content: '',
        cover: null
    })

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('backoffice.berita.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Berita" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Tambah Berita</CardTitle>
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
                                    <Label htmlFor='content'>Deskripsi</Label>
                                    <Textarea 
                                        placeholder="Deskripsi" 
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        aria-invalid={errors.content ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.content} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='cover'>Pilih Gambar</Label>
                                    <Input 
                                        type='file' 
                                        id='cover'
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData('cover', file)
                                            }
                                        }}
                                        accept="image/*"
                                        aria-invalid={errors.cover ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.cover} />
                                    {data.cover && (
                                        <div className="mt-2">
                                            <img src={URL.createObjectURL(data.cover)} alt="Preview" className="mt-2 w-32 object-cover rounded" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='mt-4 text-end'>
                                <Button 
                                    className='' 
                                    type='submit'
                                    disabled={processing}
                                >
                                    {processing && <Loader2 className='animate-spin' />}
                                    <span>Tambah Berita</span>
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}

export default AddBeritaPage