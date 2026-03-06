import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tambah Publikasi',
    href: '/backoffice/publikasi/add',
  },
];

type CategoryItem = {
  id: string;
  name: string;
};

type PageProps = {
  categories: CategoryItem[];
  category: CategoryItem;
};

const AddPublikasiPage = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { categories } = usePage<PageProps>().props;

  const { data, setData, post, errors, processing } = useForm<{
    category: string;
    title: string;
    content: string;
    document: File | null;
    cover: File | null;
  }>({
    category: '',
    title: '',
    content: '',
    document: null,
    cover: null,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.$ && window.$.fn.summernote && editorRef.current) {
        const $ = window.$;
        $(editorRef.current).summernote({
          height: 500,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['picture']],
          ],
          styleTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5'],
          callbacks: {
            onChange: function (contents: string) {
              // Tambahkan clearfix setelah <img> untuk hindari float
              const clearedContent = contents.replace(
                /(<img[^>]*>)(?!\s*<div style="clear: both;"><\/div>)/g,
                '$1<div style="clear: both;"></div>'
              );
              setData('content', clearedContent);
            },
          },
        });

        $(editorRef.current).summernote('code', data.content);
        clearInterval(interval);
      }
    }, 250);

    return () => {
      clearInterval(interval);
      if (window.$ && window.$.fn.summernote && editorRef.current) {
        window.$(editorRef.current).summernote('destroy');
      }
    };
  }, []);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('backoffice.publikasi.store'));
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head>
            <title>Tambah Publikasi</title>
            <link
            href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.css"
            rel="stylesheet"
            />
            <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.js"></script>
        </Head>

      <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <CardTitle>Tambah Publikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="kategori">Kategori</Label>
                <Select value={data.category} onValueChange={(e) => setData('category', e)}>
                  <SelectTrigger id="kategori" aria-invalid={!!errors.category}>
                    <SelectValue placeholder="Pilih Kategori" />
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

              <div className="col-span-2">
                <Label htmlFor="title">Judul</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Judul"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  aria-invalid={!!errors.title}
                />
                <InputError message={errors.title} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="content">Deskripsi</Label>
                <div className='dark:bg-white'>
                  <div
                    id="summernote"
                    ref={editorRef}
                    className="prose max-w-none"
                    aria-invalid={!!errors.content}
                  />
                </div>
                <InputError message={errors.content} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="cover">Pilih Gambar</Label>
                <Input
                  type="file"
                  id="cover"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setData('cover', file);
                  }}
                  accept="image/*"
                  aria-invalid={!!errors.cover}
                />
                <InputError message={errors.cover} />
                {data.cover && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(data.cover)}
                      alt="Preview"
                      className="mt-2 w-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="document">Pilih Berkas</Label>
                <Input
                  type="file"
                  id="document"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setData('document', file);
                  }}
                  aria-invalid={!!errors.document}
                />
                <InputError message={errors.document} />
              </div>

              <div className="col-span-2 text-end mt-4">
                <Button type="submit" disabled={processing}>
                  {processing && <Loader2 className="animate-spin mr-2" />}
                  Tambah Publikasi
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AddPublikasiPage;
