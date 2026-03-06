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
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Publication',
        href: '/backoffice/en/publication/edit',
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

const EditPublicationPage = () => {

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
        post(route('backoffice.publicationEn.update', publication.id));
    }

    return (
        <AppLayoutEn breadcrumbs={breadcrumbs}>
            <Head title="Edit Publication" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Publication</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFormSubmit}>
                            <div className=' grid grid-cols-2 gap-4'>
                                <div className='col-span-2 md:col-span-1'>
                                    <Label htmlFor='category'>Category</Label>
                                    <Select value={data.category} onValueChange={(e) => setData('category', e)}>
                                        <SelectTrigger id='category' aria-invalid={errors.category ? 'true' : 'false'}>
                                            <SelectValue placeholder="Select Category" />
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
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="DINAIKAN">Published</SelectItem>
                                            <SelectItem value="DIAJUKAN">Draft</SelectItem>
                                            <SelectItem value="DITURUNKAN">Unpublished</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='title'>Title</Label>
                                    <Input 
                                        type='text' 
                                        id='title' 
                                        placeholder='Title'
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        aria-invalid={errors.title ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='cover'>Choose Cover</Label>
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
                                    <Label htmlFor='document'>Choose Document</Label>
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
                                    <span>Edit Publication</span>
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayoutEn>
    );
}

export default EditPublicationPage