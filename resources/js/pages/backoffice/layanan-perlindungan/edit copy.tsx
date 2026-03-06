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
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Ubah Profil Lembaga',
    href: '/backoffice/lembaga/edit'
  }
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

  // Refs untuk masing-masing summernote
  const historyRef = useRef<HTMLDivElement>(null);
  const legalRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const authorityRef = useRef<HTMLDivElement>(null);

  const { data, setData, post, errors, processing } = useForm<{
    history: string;
    legal_basis: string;
    document: File | null;
    vision_cover: File | null;
    vision: string;
    mission_cover: File | null;
    mission: string;
    authority: string;
  }>({
    history: institution.history,
    legal_basis: institution.legal_basis,
    document: null,
    vision_cover: null,
    vision: institution.vision,
    mission_cover: null,
    mission: institution.mission,
    authority: institution.authority,
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('backoffice.lembaga.update', institution.id));
  }

  useEffect(() => {
    const $ = window.$;

    const initEditor = (ref: React.RefObject<HTMLDivElement>, field: keyof typeof data) => {
      if (ref.current && $.fn.summernote) {
        $(ref.current).summernote({
          height: 300,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline']],
            ['para', ['ul', 'ol', 'paragraph']],
          ],
          styleTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5'],
          callbacks: {
            onChange: (contents: string) => {
              setData(field, contents);
            },
          },
        });
        $(ref.current).summernote('code', data[field]);
      }
    };

    initEditor(historyRef, 'history');
    initEditor(legalRef, 'legal_basis');
    initEditor(visionRef, 'vision');
    initEditor(missionRef, 'mission');
    initEditor(authorityRef, 'authority');

    return () => {
      [historyRef, legalRef, visionRef, missionRef, authorityRef].forEach((ref) => {
        if (ref.current && $.fn.summernote) {
          $(ref.current).summernote('destroy');
        }
      });
    };
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ubah Profil Lembaga">
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
            <CardTitle>Ubah Profil Lembaga</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">

                {/* Sejarah */}
                <div className="col-span-2">
                  <Label>Sejarah Lahirnya LPSK</Label>
                  <div className="dark:bg-white">
                    <div className="summernote" ref={historyRef} />
                  </div>
                  <InputError message={errors.history} />
                </div>

                {/* Dasar Hukum */}
                <div className="col-span-2">
                  <Label>Dasar Hukum</Label>
                  <div className="dark:bg-white">
                    <div className="summernote" ref={legalRef} />
                  </div>
                  <InputError message={errors.legal_basis} />
                </div>

                {/* Dokumen PDF */}
                <div className="col-span-2">
                  <Label htmlFor="document">Pilih Berkas Dasar Hukum</Label>
                  <Input
                    type="file"
                    id="document"
                    accept="application/pdf"
                    onChange={(e) => setData('document', e.target.files?.[0] || null)}
                  />
                  <InputError message={errors.document} />
                </div>

                {/* Gambar Visi */}
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

                {/* Visi */}
                <div className="col-span-2">
                  <Label>Visi</Label>
                  <div className="dark:bg-white">
                    <div className="summernote" ref={visionRef} />
                  </div>
                  <InputError message={errors.vision} />
                </div>

                {/* Gambar Misi */}
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

                {/* Misi */}
                <div className="col-span-2">
                  <Label>Misi</Label>
                  <div className="dark:bg-white">
                    <div className="summernote" ref={missionRef} />
                  </div>
                  <InputError message={errors.mission} />
                </div>

                {/* Tugas & Wewenang */}
                <div className="col-span-2">
                  <Label>Tugas dan Wewenang</Label>
                  <div className="dark:bg-white">
                    <div className="summernote" ref={authorityRef} />
                  </div>
                  <InputError message={errors.authority} />
                </div>

              </div>

              <div className="mt-4 text-end">
                <Button type="submit" disabled={processing}>
                  {processing && <Loader2 className="animate-spin mr-2" />}
                  Simpan Perubahan
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
