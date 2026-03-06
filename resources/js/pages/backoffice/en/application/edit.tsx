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
        title: 'Edit Application',
        href: '/backoffice/en/application/edit',
    },
];

type CategoryItem = {
    id: string;
    name: string;
}

type ApplicationItem = {
    id: number;
    title: string;
    application_category: CategoryItem
    description: string;
    cover_url: string;
    url: string;
}

type PageProps = {
    categories: CategoryItem[]
    application: ApplicationItem
}

const EditApplicationPage = () => {

    const { categories, application } = usePage<PageProps>().props

    console.log(application);

    const { data, setData, post, errors, processing } = useForm<{
        category: string;
        title: string;
        description: string;
        link1:string;
        link2:string;
        cover: File | null;
    }>({
        category: application.application_category.id,
        title: application.title,
        description: application.description,
        link1: application.url,
        link2: '',
        cover: null
    })

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('applicationEn.update', application.id));
    }

    return (
        <AppLayoutEn breadcrumbs={breadcrumbs}>
            <Head title="Edit Application" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Application</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFormSubmit}>
                            <div className='grid grid-cols-2 gap-4'>
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
                                {/* <div className='col-span-2'>
                                    <Label htmlFor='description'>Description</Label>
                                    <Textarea 
                                        placeholder="Description" 
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        aria-invalid={errors.description ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.description} />
                                </div> */}
                                <div className='col-span-2 md:col-span-1'>
                                    <Label htmlFor='link1'>Link 1</Label>
                                    <Input 
                                        type='url' 
                                        id='link1' 
                                        placeholder='Link 1'
                                        value={data.link1}
                                        onChange={(e) => setData('link1', e.target.value)}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='cover'>Choose Image</Label>
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
                                                alt="New Preview"
                                                className="w-32 object-cover rounded"
                                            />
                                        ) : application.cover_url && (
                                            <img
                                                src={application.cover_url}
                                                alt="Old Preview"
                                                className="w-32 object-cover rounded"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4 text-end'>
                                <Button 
                                    type='submit'
                                    disabled={processing}
                                >
                                    {processing && <Loader2 className='animate-spin' />}
                                    <span>Edit Application</span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>


            </div>
        </AppLayoutEn>
    );
}

export default EditApplicationPage