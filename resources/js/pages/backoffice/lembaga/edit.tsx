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
    title: 'Edit Profil Lembaga',
    href: '/backoffice/lembaga/add',
  },
];

type InstitutionItem = {
  id: number;
  history: string;
  legal_basis: string;
  document_url: string;
  document_full_url: string;
  vision_cover: string;
  vision_cover_url: string;
  vision: string;
  mission_cover: string;
  mission_cover_url: string;
  mission: string;
  authority: string;
};

type PageProps = {
  institution: InstitutionItem;
};

const EditLembagaPage = () => {
  const { institution } = usePage<PageProps>().props;

  const historyRef = useRef<HTMLDivElement>(null);
  const legalBasisRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const authorityRef = useRef<HTMLDivElement>(null);

  const { data, setData, post, errors, processing } = useForm<{
      history: string;
      legal_basis: string;
      document: File | null;
      file: File | null;
      vision_cover: File | null;
      vision: string;
      mission_cover: File | null;
      mission: string;
      authority: string;
    }>({
      history: institution.history,
      legal_basis: institution.legal_basis,
      document: null,
      file: null,
      vision_cover: null,
      vision: institution.vision,
      mission_cover: null,
      mission: institution.mission,
      authority: institution.authority,
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
    post(route('backoffice.lembaga.update', institution.id));
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head>
        <title>Edit Profil Lembaga</title>
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
            <CardTitle>Edit Profil Lembaga</CardTitle>
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
                <Label htmlFor="file">Pilih Berkas Dasar Hukum</Label>
                <Input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setData('file', file);
                  }}
                />
                <InputError message={errors.file} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="vision_cover">Pilih Gambar Visi</Label>
                <Input
                  type="file"
                  id="vision_cover"
                  accept="image/*"
                  onChange={(e) => setData('vision_cover', e.target.files?.[0] || null)}
                />
                <InputError message={errors.vision_cover} />
                <div className="mt-2">
                  {data.vision_cover ? (
                    <img
                      src={URL.createObjectURL(data.vision_cover)}
                      alt="Preview Baru"
                      className="w-32 object-cover rounded"
                    />
                  ) : institution.vision_cover_url && (
                    <img
                      src={institution.vision_cover_url}
                      alt="Preview Lama"
                      className="w-32 object-cover rounded"
                    />
                  )}
                </div>
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
                  accept="image/*"
                  onChange={(e) => setData('mission_cover', e.target.files?.[0] || null)}
                />
                <InputError message={errors.mission_cover} />
                <div className="mt-2">
                  {data.mission_cover ? (
                    <img
                      src={URL.createObjectURL(data.mission_cover)}
                      alt="Preview Baru"
                      className="w-32 object-cover rounded"
                    />
                  ) : institution.mission_cover_url && (
                    <img
                      src={institution.mission_cover_url}
                      alt="Preview Lama"
                      className="w-32 object-cover rounded"
                    />
                  )}
                </div>
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
                  Edit Profil Lembaga
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
