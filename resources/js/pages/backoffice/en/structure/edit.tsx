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
        title: 'Edit Structure',
        href: '/backoffice/en/structure/edit',
    },
];

type StructureItem = {
    id: number;
    name: string;
    category: string;
    description: string;
    position: string;
    foto_url: string;
    url: string;
}

type PageProps = {
    structure: StructureItem
}

const EditStrukturPage = () => {

    const {structure } = usePage<PageProps>().props

    console.log(structure);

    const { data, setData, post, errors, processing } = useForm<{
        category: string;
        name: string;
        position: string;
        description: string;
        foto: File | null;
    }>({
        category: structure.category,
        name: structure.name,
        position: structure.position,
        description: structure.description,
        foto: null
    })

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('backoffice.structure.update', structure.id));
    }

    return (
        <AppLayoutEn breadcrumbs={breadcrumbs}>
            <Head title="Edit Structure" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFormSubmit}>
                            <div className=' grid grid-cols-2 gap-4'>
                                <div className='col-span-2 md:col-span-1'>
                                    <Label htmlFor='category'>Category</Label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(e) => setData('category', e)}
                                    >
                                        <SelectTrigger
                                        id='category'
                                        aria-invalid={errors.category ? 'true' : 'false'}
                                        >
                                        <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Sekretaris Jenderal">Secretary General</SelectItem>
                                            <SelectItem value="Kepala Biro">Head of Bureau</SelectItem>
                                            <SelectItem value="Kepala Bagian">Head of Division</SelectItem>
                                            <SelectItem value="Kepala Perwakilan">Head of Representative Office</SelectItem>
                                            <SelectItem value="Tenaga Ahli">Expert Staff</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category} />
                                </div>
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
                                    <Label htmlFor='position'>Position</Label>
                                    <Input 
                                        type='text' 
                                        id='position' 
                                        placeholder='Position'
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
                                    <Label htmlFor='foto'>Select Foto</Label>
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
                                        ) : structure.foto_url && (
                                        <img
                                            src={structure.foto_url}
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
                                    <span>Edit Structure</span>
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayoutEn>
    );
}

export default EditStrukturPage