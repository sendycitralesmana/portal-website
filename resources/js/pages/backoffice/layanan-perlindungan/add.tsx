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
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tambah Layanan Perlindungan',
    href: '/backoffice/layanan-perlindungan/add',
  },
];

const AddLembagaPage = () => {
  const informationRef = useRef<HTMLDivElement>(null);
  const legalBasisRef = useRef<HTMLDivElement>(null);
  const accessProtectionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const authorityRef = useRef<HTMLDivElement>(null);

  const { data, setData, post, errors, processing } = useForm({
    title: '',
    information: '',
    legal_basis: '',
    access_protection: '',
    cover: null,
  });

  const initEditor = (ref: React.RefObject<HTMLDivElement>, field: keyof typeof data) => {
    if (window.$ && window.$.fn.summernote && ref.current) {
      const $ = window.$;
      $(ref.current).summernote({
        height: 300,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'italic']],
          ['para', ['ul', 'ol']],
        ],
        styleTags: ['p', 'h1', 'h2', 'h3'],
        callbacks: {
          onChange: (contents: string) => {
            const cleared = contents.replace(
              /(<img[^>]*>)(?!\s*<div style="clear: both;"><\/div>)/g,
              '$1<div style="clear: both;"></div>'
            );
            setData(field, cleared);
          },
        },
      });
      $(ref.current).summernote('code', data[field]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      initEditor(informationRef, 'information');
      initEditor(legalBasisRef, 'legal_basis');
      initEditor(accessProtectionRef, 'access_protection');
      clearInterval(interval);
    }, 250);

    return () => {
      [informationRef, legalBasisRef, accessProtectionRef, missionRef, authorityRef].forEach((ref) => {
        if (ref.current) {
          window.$(ref.current).summernote('destroy');
        }
      });
    };
  }, []);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('backoffice.layanan-perlindungan.store'));
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head>
        <title>Tambah Layanan Perlindungan</title>
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
            <CardTitle>Tambah Layanan Perlindungan</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">

              <div className='col-span-2'>
                <Label htmlFor='title'>Judul</Label>
                <Input 
                    type='text' 
                    id='title' 
                    placeholder='Judul'
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    aria-invalid={errors.title ? 'true' : 'false'}
                />
                <InputError message={errors.title} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="information">Information</Label>
                <div className='dark:bg-white'>
                  <div ref={informationRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.information} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="legal_basis">Dasar Hukum</Label>
                <div className='dark:bg-white'>
                  <div ref={legalBasisRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.legal_basis} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="access_protection">Proteksi Akses</Label>
                <div className='dark:bg-white'>
                  <div ref={accessProtectionRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.access_protection} />
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

              <div className="col-span-2 text-end mt-4">
                <Button type="submit" disabled={processing}>
                  {processing && <Loader2 className="animate-spin mr-2" />}
                  Tambah Layanan Perlindungan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AddLembagaPage;
