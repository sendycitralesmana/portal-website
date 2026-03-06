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
    title: 'Tambah Unit Kerja',
    href: '/backoffice/unit-kerja/add',
  },
];

const AddWorkUnitPage = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const { data, setData, post, errors, processing } = useForm<{
    title: string;
    content: string;
  }>({
    title: '',
    content: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.$ && window.$.fn.summernote && editorRef.current) {
        const $ = window.$;
        $(editorRef.current).summernote({
          height: 500,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link']],
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
    post(route('backoffice.unit-kerja.store'));
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head>
            <title>Tambah Unit Kerja</title>
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
            <CardTitle>Tambah Unit Kerja</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">

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

              <div className="col-span-2 text-end mt-4">
                <Button type="submit" disabled={processing}>
                  {processing && <Loader2 className="animate-spin mr-2" />}
                  Tambah Unit Kerja
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AddWorkUnitPage;
