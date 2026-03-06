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
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Edit Protection Service',
    href: '/backoffice/en/protection-service/add',
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
    post(route('backoffice.protection-service.update', protectionService.id));
  }

  return (
    <AppLayoutEn breadcrumbs={breadcrumbs}>
      <Head>
        <title>Edit Protection Service</title>
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
            <CardTitle>Edit Protection Service</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">

              <div className='col-span-2'>
                <Label htmlFor='title'>Title</Label>
                <Input 
                    type='text' 
                    id='title' 
                    placeholder='Title'
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    aria-invalid={errors.title ? 'true' : 'false'}
                />
                <InputError message={errors.title} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="title">Information</Label>
                <div className='dark:bg-white'>
                  <div ref={informationRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.title} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="legal_basis">Legal Basis</Label>
                <div className='dark:bg-white'>
                  <div ref={legalBasisRef} className="prose max-w-none" />
                </div>
                <InputError message={errors.legal_basis} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="access_protection">Access Protection</Label>
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
                <Label htmlFor="cover">Select Cover</Label>
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
                  Edit Protection Service
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayoutEn>
  );
};

export default EditLembagaPage;
