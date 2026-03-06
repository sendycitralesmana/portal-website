import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

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
import { File, Image, Loader2, Minus, Plus } from 'lucide-react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tambah Berita', href: '/backoffice/berita/add' }
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

  const { data, setData, post, errors, processing } = useForm<any>({
    category: '',
    title: '',
    content: '',
    cover: null,
    images: [],
    documents: [],
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
            ['para', ['ul', 'ol', 'paragraph']],
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

  // State untuk dokumen & gambar dinamis
  const [fileInputs, setFileInputs] = useState<File[]>([]);
  const [imageInputs, setImageInputs] = useState<File[]>([]);

  const handleFileChange = (type: 'doc' | 'img', index: number, file: File | null) => {
    if (type === 'doc') {
      const updated = [...fileInputs];
      updated[index] = file || ("" as any);
      setFileInputs(updated);
      setData('documents', updated.filter(Boolean)); // array bersih dari null
    } else {
      const updated = [...imageInputs];
      updated[index] = file || ("" as any);
      setImageInputs(updated);
      setData('images', updated.filter(Boolean));
    }
  };

  const addInput = (type: 'doc' | 'img') => {
    if (type === 'doc') setFileInputs([...fileInputs, "" as any]);
    else setImageInputs([...imageInputs, "" as any]);
  };

  const removeInput = (type: 'doc' | 'img', index: number) => {
    if (type === 'doc') {
      const updated = [...fileInputs];
      updated.splice(index, 1);
      setFileInputs(updated);
      setData('documents', updated.filter(Boolean));
    } else {
      const updated = [...imageInputs];
      updated.splice(index, 1);
      setImageInputs(updated);
      setData('images', updated.filter(Boolean));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head>
        <title>Tambah Berita</title>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.css"
          rel="stylesheet"
        />
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
                {/* Kategori */}
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="kategori">Kategori</Label>
                  <Select
                    value={data.category}
                    onValueChange={(e) => setData('category', e)}
                  >
                    <SelectTrigger id="kategori" aria-invalid={!!errors.category}>
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

                {/* Judul */}
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

                {/* Deskripsi */}
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

                {/* Sampul */}
                <div className="col-span-2">
                  <Label htmlFor="cover">Pilih Sampul</Label>
                  <Input
                    type="file"
                    id="cover"
                    accept="image/*"
                    name="cover"
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

                {/* Upload Gambar Dinamis */}
                <div className="flex flex-col gap-3">
                  <Label>Gambar</Label>
                  {imageInputs.length === 0 && (
                    <Button
                      type="button"
                      onClick={() => addInput('img')}
                      className='w-1/2'
                    >
                      <Image /> Tambah Gambar
                    </Button>
                  )}

                  {imageInputs.map((file, index) => (
                    <div key={index} className="flex flex-col gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <input
                          required
                          type="file"
                          accept="image/*"
                          name="images[]"
                          onChange={(e) =>
                            handleFileChange('img', index, e.target.files?.[0] || null)
                          }
                          className="flex-1 border rounded p-1"
                        />

                        {index === imageInputs.length - 1 && (
                          <Button
                            type="button"
                            onClick={() => addInput('img')}
                          >
                            <Plus />
                          </Button>
                        )}

                        <Button
                          type="button"
                          onClick={() => removeInput('img', index)}
                          variant="destructive"
                        >
                          <Minus />
                        </Button>
                      </div>

                      {file && (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-32 object-cover rounded border"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Upload Dokumen Dinamis */}
                <div className="flex flex-col gap-3">
                  <Label>Dokumen</Label>
                  {fileInputs.length === 0 && (
                    <Button
                      type="button"
                      onClick={() => addInput('doc')}
                      className='w-1/2'
                    >
                      <File /> Tambah Berkas
                    </Button>
                  )}

                  {fileInputs.map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        required
                        type="file"
                        accept='application/pdf'
                        name="documents[]"
                        onChange={(e) =>
                          handleFileChange('doc', index, e.target.files?.[0] || null)
                        }
                        className="flex-1 border rounded p-1"
                      />

                      {index === fileInputs.length - 1 && (
                        <Button
                          type="button"
                          onClick={() => addInput('doc')}
                        >
                          <Plus />
                        </Button>
                      )}

                      <Button
                        type="button"
                        onClick={() => removeInput('doc', index)}
                        variant='destructive'
                      >
                        <Minus />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <hr className='mt-8'/>

              {/* Tombol Submit */}
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
