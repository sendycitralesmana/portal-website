import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Edit Publication',
    href: '/backoffice/en/publication/edit'
  }
];

type CategoryItem = {
  id: string;
  name: string;
};

type PublicationItem = {
  id: number;
  title: string;
  status: string;
  publication_category: CategoryItem;
  document: string;
  content: string;
  cover_url: string;
};

type PageProps = {
  categories: CategoryItem[];
  publication: PublicationItem;
};

const EditPublikasiPage = () => {
  const { categories, publication } = usePage<PageProps>().props;

  const editorRef = useRef<HTMLDivElement>(null);

  const { data, setData, post, errors, processing } = useForm<{
    category: string;
    title: string;
    status: string;
    content: string;
    document: File | null;
    cover: File | null;
  }>({
    category: publication.publication_category.id,
    title: publication.title,
    status: publication.status,
    content: publication.content,
    document: null,
    cover: null
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('backoffice.publicationEn.update', publication.id));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.$ && editorRef.current && window.$.fn.summernote) {
        const $ = window.$;
        $(editorRef.current).summernote({
          height: 500,
          toolbar: [
            ['style', ['style']], // Tambahkan style untuk heading
            ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['picture']], // hanya gambar
        ],
        styleTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5'],
        
          callbacks: {
            onChange: function (contents: string) {
              setData('content', contents);
            }
          }
        });
        $(editorRef.current).summernote('code', data.content);
        clearInterval(interval); // stop polling
      }
    }, 100);
  
    return () => {
      clearInterval(interval);
      if (window.$ && editorRef.current && window.$.fn.summernote) {
        window.$(editorRef.current).summernote('destroy');
      }
    };
  }, []);
  

  return (
    <AppLayoutEn breadcrumbs={breadcrumbs}>
      <Head title="Edit Publication">
            <link
            href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.css"
            rel="stylesheet"
            />
            <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.js"></script>
        </Head>

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <CardTitle>Edit Publication</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="kategori">Category</Label>
                  <Select
                    value={data.category}
                    onValueChange={(e) => setData('category', e)}
                  >
                    <SelectTrigger
                      id="kategori"
                      aria-invalid={errors.category ? 'true' : 'false'}
                    >
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.category} />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={data.status}
                    onValueChange={(e) => setData('status', e)}
                  >
                    <SelectTrigger
                      id="status"
                      aria-invalid={errors.status ? 'true' : 'false'}
                    >
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DINAIKAN">Published</SelectItem>
                      <SelectItem value="DIAJUKAN">Draft</SelectItem>
                      <SelectItem value="DITURUNKAN">Unpublished</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.status} />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    aria-invalid={errors.title ? 'true' : 'false'}
                  />
                  <InputError message={errors.title} />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="content">Description</Label>
                  <div className='dark:bg-white'>
                    <div
                      id="summernote"
                      ref={editorRef}
                      aria-invalid={errors.content ? 'true' : 'false'}
                    />
                  </div>
                  <InputError message={errors.content} />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="cover">Select Cover</Label>
                  <Input
                    type="file"
                    id="cover"
                    accept="image/*"
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
                    ) : (
                      publication.cover_url && (
                        <img
                          src={publication.cover_url}
                          alt="Preview Lama"
                          className="w-32 object-cover rounded"
                        />
                      )
                    )}
                  </div>
                </div>
                <div className='col-span-2'>
                    <Label htmlFor='document'>Select Document</Label>
                    <Input
                        type='file'
                        id='document'
                        // accept='image/*'
                        onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setData('document', file);
                        }}
                        aria-invalid={errors.document ? 'true' : 'false'}
                    />
                    <InputError message={errors.document} />
                </div>
              </div>

              <div className="mt-4 text-end">
                <Button type="submit" disabled={processing}>
                  {processing && <Loader2 className="animate-spin" />}
                  <span>Edit Publication</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayoutEn>
  );
};

export default EditPublikasiPage;
