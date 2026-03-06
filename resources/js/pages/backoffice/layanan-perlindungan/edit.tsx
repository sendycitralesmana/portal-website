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
    title: 'Edit Layanan Perlindungan',
    href: '/backoffice/layanan-perlindungan/add',
  },
];

type ProtectionServiceItem = {
  id: number;
  title: string;
  information: string;
  legal_basis: string;
  access_protection: string;
  cover: string;
  cover_url: string;
};

type PageProps = {
  protectionService: ProtectionServiceItem;
};

const EditLembagaPage = () => {
  const { protectionService } = usePage<PageProps>().props;

  const titleRef = useRef<HTMLDivElement>(null);
  const legalBasisRef = useRef<HTMLDivElement>(null);
  const informationRef = useRef<HTMLDivElement>(null);
  const access_protectionRef = useRef<HTMLDivElement>(null);
  const authorityRef = useRef<HTMLDivElement>(null);

  const { data, setData, post, errors, processing } = useForm<{
      title: string;
      legal_basis: string;
      information: string;
      access_protection: string;
      cover: File | null;
    }>({
      title: protectionService.title,
      legal_basis: protectionService.legal_basis,
      information: protectionService.information,
      access_protection: protectionService.access_protection,
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
      initEditor(legalBasisRef, 'legal_basis');
      initEditor(informationRef, 'information');
      initEditor(access_protectionRef, 'access_protection');
      clearInterval(interval);
    }, 250);

    return () => {
      [titleRef, legalBasisRef, informationRef, access_protectionRef, authorityRef].forEach((ref) => {
        if (ref.current) {
          window.$(ref.current).summernote('destroy');
        }
      });
    };
  }, []);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('backoffice.layanan-perlindungan.update', protectionService.id));
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head>
        <title>Edit Layanan Perlindungan</title>
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
            <CardTitle>Edit Layanan Perlindungan</CardTitle>
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
                <Label htmlFor="title">Informasi</Label>
                <div className='dark:bg-white'>
                  <div ref={informationRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.title} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="legal_basis">Dasar Hukum</Label>
                <div className='dark:bg-white'>
                  <div ref={legalBasisRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.legal_basis} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="access_protection">Akses Perlindungan</Label>
                <div className='dark:bg-white'>
                  <div ref={access_protectionRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.access_protection} />
              </div>

              {/* <div className="col-span-2">
                <Label htmlFor="document">Pilih Berkas Dasar Hukum</Label>
                <Input
                  type="file"
                  id="document"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setData('document', file);
                  }}
                />
                <InputError message={errors.document} />
              </div> */}

              <div className="col-span-2">
                <Label htmlFor="cover">Pilih Gambar</Label>
                <Input
                  type="file"
                  id="cover"
                  accept="image/*"
                  onChange={(e) => setData('cover', e.target.files?.[0] || null)}
                />
                <InputError message={errors.cover} />
                <div className="mt-2">
                  {data.cover ? (
                    <img
                      src={URL.createObjectURL(data.cover)}
                      alt="Preview Baru"
                      className="w-32 object-cover rounded"
                    />
                  ) : protectionService.cover_url && (
                    <img
                      src={protectionService.cover_url}
                      alt="Preview Lama"
                      className="w-32 object-cover rounded"
                    />
                  )}
                </div>
              </div>

              <div className="col-span-2 text-end mt-4">
                <Button type="submit" disabled={processing}>
                  {processing && <Loader2 className="animate-spin mr-2" />}
                  Edit Layanan Perlindungan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EditLembagaPage;
