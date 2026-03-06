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
    title: 'Tambah Profil Lembaga',
    href: '/backoffice/lembaga/add',
  },
];

const AddLembagaPage = () => {
  const historyRef = useRef<HTMLDivElement>(null);
  const legalBasisRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const authorityRef = useRef<HTMLDivElement>(null);

  const { data, setData, post, errors, processing } = useForm({
    history: '',
    legal_basis: '',
    document: null,
    vision_cover: null,
    vision: '',
    mission_cover: null,
    mission: '',
    authority: '',
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
      initEditor(historyRef, 'history');
      initEditor(legalBasisRef, 'legal_basis');
      initEditor(visionRef, 'vision');
      initEditor(missionRef, 'mission');
      initEditor(authorityRef, 'authority');
      clearInterval(interval);
    }, 250);

    return () => {
      [historyRef, legalBasisRef, visionRef, missionRef, authorityRef].forEach((ref) => {
        if (ref.current) {
          window.$(ref.current).summernote('destroy');
        }
      });
    };
  }, []);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('backoffice.lembaga.store'));
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head>
        <title>Tambah Profil Lembaga</title>
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
            <CardTitle>Tambah Profil Lembaga</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">

              <div className="col-span-2">
                <Label htmlFor="history">Sejarah Lahirnya LPSK</Label>
                <div className='dark:bg-white'>
                  <div ref={historyRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.history} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="legal_basis">Dasar Hukum</Label>
                <div className='dark:bg-white'>
                  <div ref={legalBasisRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.legal_basis} />
              </div>

              <div className="col-span-2">
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
              </div>

              <div className="col-span-2">
                <Label htmlFor="vision_cover">Pilih Gambar Visi</Label>
                <Input
                  type="file"
                  id="vision_cover"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setData('vision_cover', file);
                  }}
                  accept="image/*"
                />
                <InputError message={errors.vision_cover} />
                {data.vision_cover && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(data.vision_cover)}
                      alt="Preview"
                      className="mt-2 w-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="vision">Visi</Label>
                <div className='dark:bg-white'>
                  <div ref={visionRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.vision} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="mission_cover">Pilih Gambar Misi</Label>
                <Input
                  type="file"
                  id="mission_cover"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setData('mission_cover', file);
                  }}
                  accept="image/*"
                />
                <InputError message={errors.mission_cover} />
                {data.mission_cover && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(data.mission_cover)}
                      alt="Preview"
                      className="mt-2 w-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="mission">Misi</Label>
                <div className='dark:bg-white'>
                  <div ref={missionRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.mission} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="authority">Tugas dan Wewenang</Label>
                <div className='dark:bg-white'>
                  <div ref={authorityRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.authority} />
              </div>

              <div className="col-span-2 text-end mt-4">
                <Button type="submit" disabled={processing}>
                  {processing && <Loader2 className="animate-spin mr-2" />}
                  Tambah Profil Lembaga
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
