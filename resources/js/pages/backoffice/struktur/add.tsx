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
        title: 'Tambah struktur',
        href: '/backoffice/struktur/add',
    },
];

const AddstrukturPage = () => {

    const {category } = usePage<PageProps>().props

    const { data, setData, post, errors, processing } = useForm<{
        category: string;
        name: string;
        position: string;
        description: string;
        foto: File | null;
    }>({
        category: '',
        name: '',
        position: '',
        description: '',
        foto: null
    })

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('backoffice.struktur.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Struktur" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Tambah Struktur</CardTitle>
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
                                        {/* <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                            ))}
                                        </SelectContent> */}
                                        <SelectContent>
                                            <SelectItem value="Sekretaris Jenderal">Sekretaris Jenderal</SelectItem>
                                            <SelectItem value="Kepala Biro">Kepala Biro</SelectItem>
                                            <SelectItem value="Kepala Bagian">Kepala Bagian</SelectItem>
                                            <SelectItem value="Kepala Perwakilan">Kepala Perwakilan</SelectItem>
                                            <SelectItem value="Tenaga Ahli">Tenaga Ahli</SelectItem>
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
                                <div className='col-span-2'>
                                    <Label htmlFor='position'>Jabatan</Label>
                                    <Input 
                                        type='text' 
                                        id='position' 
                                        placeholder='Jabatan'
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                        aria-invalid={errors.position ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.position} />
                                </div>
                                {/* <div className='col-span-2'>
                                    <Label htmlFor='description'>Deskripsi</Label>
                                    <Textarea 
                                        placeholder="Deskripsi" 
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        aria-invalid={errors.description ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.description} />
                                </div> */}
                                <div className='col-span-2'>
                                    <Label htmlFor='foto'>Pilih Gambar</Label>
                                    <Input 
                                        type='file' 
                                        id='foto'
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData('foto', file)
                                            }
                                        }}
                                        accept="image/*"
                                        aria-invalid={errors.foto ? 'true' : 'false'}
                                    />
                                    <InputError message={errors.foto} />
                                    {data.foto && (
                                        <div className="mt-2">
                                            <img src={URL.createObjectURL(data.foto)} alt="Preview" className="mt-2 w-32 object-cover rounded" />
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
                                    <span>Tambah Struktur</span>
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}

export default AddstrukturPage