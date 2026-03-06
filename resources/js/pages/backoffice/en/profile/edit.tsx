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
        title: 'Edit Profile',
        href: '/backoffice/en/profile/edit',
    },
];

type CategoryItem = {
    id: string;
    name: string;
}

type ProfileItem = {
    id: number;
    name: string;
    profile_category: CategoryItem
    description: string;
    foto_url: string;
    url: string;
}

type PageProps = {
    categories: CategoryItem[]
    profile: ProfileItem
}

const EditPublikasiPage = () => {

    const { categories, profile } = usePage<PageProps>().props

    console.log(profile);

    const { data, setData, post, errors, processing } = useForm<{
        category: string;
        name: string;
        description: string;
        foto: File | null;
    }>({
        category: profile.profile_category.id,
        name: profile.name,
        description: profile.description,
        foto: null
    })

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('backoffice.profileEn.update', profile.id));
    }

    return (
        <AppLayoutEn breadcrumbs={breadcrumbs}>
            <Head title="Edit Profile" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFormSubmit}>
                            <div className=' grid grid-cols-2 gap-4'>
                                {/* <div className='col-span-2 md:col-span-1'>
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
                                </div> */}
                                <div className='col-span-2'>
                                    <Label htmlFor='name'>Name</Label>
                                    <Input 
                                        type='text' 
                                        id='name' 
                                        placeholder='Name'
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        aria-invalid={errors.name ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='description'>Description</Label>
                                    <Textarea 
                                        placeholder="Description" 
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        aria-invalid={errors.description ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.description} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='foto'>Choose Foto</Label>
                                    <Input
                                        type='file'
                                        id='foto'
                                        accept='image/*'
                                        onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        setData('foto', file);
                                        }}
                                        aria-invalid={errors.foto ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.foto} />

                                    <div className="mt-2">
                                        {data.foto ? (
                                        <img
                                            src={URL.createObjectURL(data.foto)}
                                            alt="Preview Baru"
                                            className="w-32 object-cover rounded"
                                        />
                                        ) : profile.foto_url && (
                                        <img
                                            src={profile.foto_url}
                                            alt="Preview Lama"
                                            className="w-32 object-cover rounded"
                                        />
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className='mt-4 text-end'>
                                <Button 
                                    className='' 
                                    type='submit'
                                    disabled={processing}
                                >
                                    {processing && <Loader2 className='animate-spin' />}
                                    <span>Edit Profile</span>
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayoutEn>
    );
}

export default EditPublikasiPage