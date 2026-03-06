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
        title: 'Ubah Tentang Kami',
        href: '/backoffice/tentang-kami/edit',
    },
];

type AboutUsItem = {
    id: string;
    address: string;
    phone: string;
    hotline: string;
    whatsapp: string;
    email: string;
    faqs: string;
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
    created_at: string;
  };

type PageProps = {
    aboutUs: AboutUsItem
}

const EditTentangKamiPage = () => {

    const { categories, aboutUs } = usePage<PageProps>().props

    console.log(aboutUs);

    const { data, setData, post, errors, processing } = useForm<{
        address: string;
        phone: string;
        hotline: string;
        whatsapp: string;
        email: string;
        faqs: string;
        facebook: string;
        instagram: string;
        twitter: string;
        youtube: string;
        tiktok: string;
    }>({
        address: aboutUs.address,
        phone: aboutUs.phone,
        hotline: aboutUs.hotline,
        whatsapp: aboutUs.whatsapp,
        email: aboutUs.email,
        faqs: aboutUs.faqs,
        facebook: aboutUs.facebook,
        instagram: aboutUs.instagram,
        twitter: aboutUs.twitter,
        youtube: aboutUs.youtube,
        tiktok: aboutUs.tiktok
    })

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('backoffice.tentang-kami.update', aboutUs.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Tentang Kami" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Ubah Tentang Kami</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFormSubmit}>
                            <div className=' grid grid-cols-2 gap-4'>
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
                                {/* <div className='col-span-2'>
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
                                </div> */}
                                <div className='col-span-2'>
                                    <Label htmlFor='whatsapp'>Whatsapp</Label>
                                    <Input 
                                        type='text' 
                                        id='whatsapp' 
                                        placeholder='Whatsapp'
                                        value={data.whatsapp}
                                        onChange={(e) => setData('whatsapp', e.target.value)}
                                        aria-invalid={errors.whatsapp ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.whatsapp} />
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
                                {/* <div className='col-span-2'>
                                    <Label htmlFor='faqs'>Faqs</Label>
                                    <Input 
                                        type='text' 
                                        id='faqs' 
                                        placeholder='Faqs'
                                        value={data.faqs}
                                        onChange={(e) => setData('faqs', e.target.value)}
                                        aria-invalid={errors.faqs ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.faqs} />
                                </div> */}
                                <div className='col-span-2'>
                                    <Label htmlFor='facebook'>facebook</Label>
                                    <Input 
                                        type='text' 
                                        id='facebook' 
                                        placeholder='facebook'
                                        value={data.facebook}
                                        onChange={(e) => setData('facebook', e.target.value)}
                                        aria-invalid={errors.facebook ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.facebook} />
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
                                    <InputError message={errors.instagram} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='twitter'>Twitter</Label>
                                    <Input 
                                        type='text' 
                                        id='twitter' 
                                        placeholder='Twitter'
                                        value={data.twitter}
                                        onChange={(e) => setData('twitter', e.target.value)}
                                        aria-invalid={errors.twitter ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.twitter} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='youtube'>Youtube</Label>
                                    <Input 
                                        type='text' 
                                        id='youtube' 
                                        placeholder='Youtube'
                                        value={data.youtube}
                                        onChange={(e) => setData('youtube', e.target.value)}
                                        aria-invalid={errors.youtube ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.youtube} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='tiktok'>Tiktok</Label>
                                    <Input 
                                        type='text' 
                                        id='tiktok' 
                                        placeholder='Tiktok'
                                        value={data.tiktok}
                                        onChange={(e) => setData('tiktok', e.target.value)}
                                        aria-invalid={errors.tiktok ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.tiktok} />
                                </div>
                            </div>
                            <div className='mt-4 text-end'>
                                <Button 
                                    className='' 
                                    type='submit'
                                    disabled={processing}
                                >
                                    {processing && <Loader2 className='animate-spin' />}
                                    <span>Ubah Tentang Kami</span>
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}

export default EditTentangKamiPage