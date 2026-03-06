import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react'

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
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Pengguna',
        href: '/backoffice/pengguna/add',
    },
];

type RoleItem = {
    id: number;
    name: string;
}

type PageProps = {
    roles: RoleItem[]
}

const AddPenggunaPage = () => {

    const { roles } = usePage<PageProps>().props
    console.log(roles);

    const { data, setData, post, errors, processing } = useForm<{
        role: string;
        name: string;
        email: string;
        password: string;
    }>({
        role: '',
        name: '',
        email: '',
        password: '',
    })

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('backoffice.pengguna.store'));
    }

    const [showPassword, setShowPassword] = useState(false);

    return (
        <AppLayoutEn breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pengguna" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Tambah Pengguna</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFormSubmit}>
                            <div className=' grid grid-cols-2 gap-4'>
                                <div className='col-span-2 md:col-span-1'>
                                    <Label htmlFor='role'>Peran</Label>
                                    <Select value={data.role} onValueChange={(e) => setData('role', e)}>
                                        <SelectTrigger id='role' aria-invalid={errors.role ? 'true' : 'false'}>
                                            <SelectValue placeholder="Pilih Peran" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                            <SelectItem key={role.id} value={String(role.id)}>
                                                {role.name}
                                            </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='name'>Nama</Label>
                                    <Input 
                                        type='text' 
                                        id='name' 
                                        placeholder='Nama'
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        aria-invalid={errors.name ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className='col-span-2'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input 
                                        type='email' 
                                        id='email' 
                                        placeholder='Email'
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        aria-invalid={errors.email ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                {/* <div className='col-span-2'>
                                    <Label htmlFor='password'>Password</Label>
                                    <Input 
                                        type='password' 
                                        id='password' 
                                        placeholder='Password'
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        aria-invalid={errors.password ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.password} />
                                </div> */}
                                <div className='col-span-2'>
                                    <Label htmlFor='password'>Password</Label>
                                    <div className='relative'>
                                        <Input 
                                        type={showPassword ? 'text' : 'password'}
                                        id='password'
                                        placeholder='Password'
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        aria-invalid={errors.password ? 'true' : 'false'}
                                        className='pr-10' // Tambah padding untuk ruang icon
                                        />
                                        <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        tabIndex={-1}
                                        >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>
                            </div>

                            <div className='mt-4 text-end'>
                                <Button 
                                    className='' 
                                    type='submit'
                                    disabled={processing}
                                >
                                    {processing && <Loader2 className='animate-spin' />}
                                    <span>Tambah Pengguna</span>
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayoutEn>
    );
}

export default AddPenggunaPage