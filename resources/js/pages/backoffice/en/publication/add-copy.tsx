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
        title: 'Add Publication',
        href: '/backoffice/en/publication/add',
    },
];

type CategoryItem = {
    id: string;
    name: string;
}

type PageProps = {
    categories: CategoryItem[]
}

const AddPublikasiPage = () => {

    const { categories } = usePage<PageProps>().props

    const { data, setData, post, errors, processing } = useForm<{
        category: string;
        title: string;
        document: File | null;
        cover: File | null;
    }>({
        category: '',
        title: '',
        document: null,
        cover: null
    })

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('backoffice.publicationEn.store'));
    }

    return (
        <AppLayoutEn breadcrumbs={breadcrumbs}>
            <Head title="Add Publication" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Add Publication</CardTitle>
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
                                <div className='col-span-2'>
                                    <Label htmlFor='document'>Choose Document</Label>
                                    <Input 
                                        type='file' 
                                        id='document'
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData('document', file)
                                            }
                                        }}
                                        // accept="image/*"
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
                                    <span>Add Publication</span>
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayoutEn>
    );
}

export default AddPublikasiPage