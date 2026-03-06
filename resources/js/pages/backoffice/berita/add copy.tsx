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

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tambah Berita',
    href: '/backoffice/berita/add'
  }
];

type CategoryItem = {
  id: string;
  name: string;
};

type PageProps = {
  categories: CategoryItem[];
};

const AddBeritaPage = () => {
  const { categories } = usePage<PageProps>().props;

  const editorRef = useRef<HTMLDivElement>(null);

  const { data, setData, post, errors, processing } = useForm<{
    category: string;
    title: string;
    content: string;
    cover: File | null;
    document: File | null;
  }>({
    category: '',
    title: '',
    content: '',
    cover: null,
    document: null
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('backoffice.berita.store'));
  };

  useEffect(() => {
    const interval = setInterval(() => {
        if (
        typeof window !== 'undefined' &&
        window.$ &&
        window.$.fn.summernote &&
        editorRef.current
        ) {
        const $ = window.$;

        $(editorRef.current).summernote({
            height: 500,
            toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']], // harus ada ini
            ['insert', ['picture']],
            ],
            styleTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5'],
            callbacks: {
            onChange: function (contents: string) {
                setData('content', contents);
            }
            }
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


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head>
        <title>Tambah Berita</title>
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
            <CardTitle>Tambah Berita</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="kategori">Kategori</Label>
                  <Select
                    value={data.category}
                    onValueChange={(e) => setData('category', e)}
                  >
                    <SelectTrigger
                      id="kategori"
                      aria-invalid={!!errors.category}
                    >
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
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
                    placeholder="Judul Berita"
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
                      aria-invalid={!!errors.content}
                      className="prose max-w-none"
                    />
                  </div>
                  <InputError message={errors.content} />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="cover">Pilih Gambar</Label>
                  <Input
                    type="file"
                    id="cover"
                    accept="image/*"
                    onChange={(e) =>
                      setData('cover', e.target.files?.[0] || null)
                    }
                    aria-invalid={!!errors.cover}
                  />
                  <InputError message={errors.cover} />
                  {data.cover && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(data.cover)}
                        alt="Preview"
                        className="w-32 object-cover rounded"
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
                
              </div>

              <div className="mt-4 text-end">
                <Button type="submit" disabled={processing}>
                  {processing && <Loader2 className="animate-spin" />}
                  <span>Tambah Berita</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AddBeritaPage;