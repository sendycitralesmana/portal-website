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
    title: 'Ubah Unit Kerja',
    href: '/backoffice/unit-kerja/edit'
  }
];

type WorkUnitItem = {
  id: number;
  title: string;
  content: string;
};

type PageProps = {
  workUnit: WorkUnitItem;
};

const EditPublikasiPage = () => {
  const {  workUnit } = usePage<PageProps>().props;

  const editorRef = useRef<HTMLDivElement>(null);

  const { data, setData, post, errors, processing } = useForm<{
    title: string;
    content: string;
  }>({
    title: workUnit.title,
    content: workUnit.content,
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('backoffice.unit-kerja.update', workUnit.id));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.$ && editorRef.current && window.$.fn.summernote) {
        const $ = window.$;
        $(editorRef.current).summernote({
          height: 500,
          toolbar: [
            ['style', ['style']], // Tambahkan style untuk heading
            ['font', ['bold', 'italic', 'underline']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link']], // hanya gambar
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
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head 
        title="Ubah Unit Kerja">
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
            <CardTitle>Ubah Unit Kerja</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">

                <div className="col-span-2">
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Judul"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    aria-invalid={errors.title ? 'true' : 'false'}
                  />
                  <InputError message={errors.title} />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="content">Konten</Label>
                  <div className='dark:bg-white'>
                    <div
                      id="summernote"
                      ref={editorRef}
                      aria-invalid={errors.content ? 'true' : 'false'}
                    />
                  </div>
                  <InputError message={errors.content} />
                </div>
                
              </div>

              <div className="mt-4 text-end">
                <Button type="submit" disabled={processing}>
                  {processing && <Loader2 className="animate-spin" />}
                  <span>Ubah Unit Kerja</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EditPublikasiPage;
