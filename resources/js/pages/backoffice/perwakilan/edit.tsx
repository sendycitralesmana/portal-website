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
        title: 'Ubah Perwakilan',
        href: '/backoffice/perwakilan/edit',
    },
];

type CategoryItem = {
    id: string;
    name: string;
}

type RepresentativeItem = {
    id: number;
    office: string;
    chief_representative: string;
    address: string;
    phone: string;
    hotline: string;
    email: string;
    instagram: string;
    cover_url: string;
    longitude: string;
    latitude: string;
    created_at: string;
  };

type PageProps = {
    categories: CategoryItem[]
    representative: RepresentativeItem
}

const EditPerwakilanPage = () => {

    const { categories, representative } = usePage<PageProps>().props

    console.log(representative);

    const { data, setData, post, errors, processing } = useForm<{
        office: string;
        chief_representative: string;
        address: string;
        phone: string;
        hotline: string;
        email: string;
        instagram: string;
        longitude: string;
        latitude: string;
        cover: File | null;
    }>({
        office: representative.office,
        chief_representative: representative.chief_representative,
        address: representative.address,
        phone: representative.phone,
        hotline: representative.hotline,
        email: representative.email,
        instagram: representative.instagram,
        longitude: representative.longitude,
        latitude: representative.latitude,
        cover: null
    })

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('backoffice.perwakilan.update', representative.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Perwakilan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Ubah Perwakilan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFormSubmit}>
                            <div className=' grid grid-cols-2 gap-4'>
                                <div className='col-span-2'>
                                    <Label htmlFor='office'>Kantor</Label>
                                    <Input 
                                        type='text' 
                                        id='office' 
                                        placeholder='Kantor'
                                        value={data.office}
                                        onChange={(e) => setData('office', e.target.value)}
                                        aria-invalid={errors.office ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.office} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='chief_representative'>Kepala Perwakilan</Label>
                                    <Input 
                                        type='text' 
                                        id='chief_representative' 
                                        placeholder='Kepala Perwakilan'
                                        value={data.chief_representative}
                                        onChange={(e) => setData('chief_representative', e.target.value)}
                                        aria-invalid={errors.chief_representative ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.chief_representative} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='address'>Alamat</Label>
                                    <Textarea 
                                        placeholder="Alamat" 
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        aria-invalid={errors.address ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.address} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='phone'>Telepon</Label>
                                    <Input 
                                        type='text' 
                                        id='phone' 
                                        placeholder='Telepon'
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        aria-invalid={errors.phone ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='hotline'>Hotline</Label>
                                    <Input 
                                        type='text' 
                                        id='hotline' 
                                        placeholder='Hotline'
                                        value={data.hotline}
                                        onChange={(e) => setData('hotline', e.target.value)}
                                        aria-invalid={errors.hotline ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.hotline} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input 
                                        type='text' 
                                        id='email' 
                                        placeholder='Email'
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        aria-invalid={errors.email ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='instagram'>Instagram</Label>
                                    <Input 
                                        type='text' 
                                        id='instagram' 
                                        placeholder='Instagram'
                                        value={data.instagram}
                                        onChange={(e) => setData('instagram', e.target.value)}
                                        aria-invalid={errors.instagram ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.phone} />
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
                                    <div className="mt-2">
                                        {data.cover ? (
                                        <img
                                            src={URL.createObjectURL(data.cover)}
                                            alt="Preview Baru"
                                            className="w-32 object-cover rounded"
                                        />
                                        ) : representative.cover_url && (
                                        <img
                                            src={representative.cover_url}
                                            alt="Preview Lama"
                                            className="w-32 object-cover rounded"
                                        />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className=' grid grid-cols-2 gap-4 mt-4'>
                                <div className='col-span-2 md:col-span-1'>
                                    <Label htmlFor='latitude'>Latitude</Label>
                                    <Input 
                                        type='text' 
                                        id='latitude' 
                                        placeholder='Latitude'
                                        value={data.latitude}
                                        onChange={(e) => setData('latitude', e.target.value)}
                                        aria-invalid={errors.latitude ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.latitude} />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <Label htmlFor='longitude'>Longitude</Label>
                                    <Input 
                                        type='text' 
                                        id='longitude' 
                                        placeholder='Longitude'
                                        value={data.longitude}
                                        onChange={(e) => setData('longitude', e.target.value)}
                                        aria-invalid={errors.longitude ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.longitude} />
                                </div>
                            </div>
                            <div className='mt-4 text-end'>
                                <Button 
                                    className='' 
                                    type='submit'
                                    disabled={processing}
                                >
                                    {processing && <Loader2 className='animate-spin' />}
                                    <span>Ubah Perwakilan</span>
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}

export default EditPerwakilanPage