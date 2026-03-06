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
        title: 'Ubah Afiliasi',
        href: '/backoffice/Afiliasi/edit',
    },
];

type AffiliateItem = {
    id: number;
    title: string;
    description: string;
    cover_url: string;
    url: string;
}

type PageProps = {
    affiliate: AffiliateItem
}

const EditAfiliasiPage = () => {

    const { affiliate } = usePage<PageProps>().props

    const { data, setData, post, errors, processing } = useForm<{
        title: string;
        url: string;
        cover: File | null;
    }>({
        title: affiliate.title,
        url: affiliate.url,
        cover: null
    })

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('afiliasi.update', affiliate.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Afiliasi">
                <meta name="description" content="Halaman Ubah Afiliasi" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Ubah Afiliasi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFormSubmit}>
                            <div className=' grid grid-cols-2 gap-4'>
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
                                <div className='col-span-2 md:col-span-1'>
                                    <Label htmlFor='url'>Link</Label>
                                    <Input 
                                        type='url' 
                                        id='url' 
                                        placeholder='Link'
                                        value={data.url}
                                        onChange={(e) => setData('url', e.target.value)}
                                    />
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
                                        ) : affiliate.cover_url && (
                                        <img
                                            src={affiliate.cover_url}
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
                                    <span>Ubah Afiliasi</span>
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}

export default EditAfiliasiPage