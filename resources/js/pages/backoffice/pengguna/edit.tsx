import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react'

import {
    Card,
    CardContent,
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
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ubah Pengguna',
        href: '/backoffice/pengguna/edit',
    },
];

type RoleItem = {
    id: number;
    name: string;
}

type UserItem = {
    id: string;
    role: RoleItem;
    name: string;
}

type PageProps = {
    categories: RoleItem[];
    user: UserItem;
}

const EditPenggunaPage = () => {
    const { categories, user } = usePage<PageProps>().props;

    const { data, setData, post, errors, processing } = useForm<{
        category: string;
        name: string;
    }>({
        category: user.role.id.toString(), // Convert number to string for Select compatibility
        name: user.name,
    });

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('backoffice.pengguna.update', user.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Pengguna" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Ubah Pengguna</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFormSubmit}>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='col-span-2 md:col-span-1'>
                                    <Label htmlFor='category'>Peran</Label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(value) => setData('category', value)}
                                    >
                                        <SelectTrigger id='category' aria-invalid={errors.category ? 'true' : 'false'}>
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category} />
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
                            </div>

                            <div className='mt-4 text-end'>
                                <Button type='submit' disabled={processing}>
                                    {processing && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                                    <span>Ubah Pengguna</span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default EditPenggunaPage;
