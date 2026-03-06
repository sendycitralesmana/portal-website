import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Ubah Sorot', href: '/backoffice/sorot/edit' },
];

type CategoryItem = {
  id: string;
  name: string;
};

type NewsItem = {
  id: string;
  title: string;
  status: string;
  cover_url: string;
  created_at: string;
};

type HighlightItem = {
  id: string;
  highlight_category: CategoryItem;
  news_id: string;
  news: NewsItem;
};

type PageProps = {
  categories: CategoryItem[];
  highlight: HighlightItem;
  news: NewsItem[];
};

const EditSorotPage = () => {
  const { categories, highlight, news } = usePage<PageProps>().props;

  const [selectedNewsDetail, setSelectedNewsDetail] = useState<NewsItem | null>(null);

  const { data, setData, post, errors, processing } = useForm({
    category: highlight.highlight_category.id,
    news: highlight.news_id,
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('backoffice.sorot.update', highlight.id));
  }

  function handleNewsChange(newsId: string) {
    setData('news', newsId);
    const selected = news.find((item) => item.id === newsId) || null;
    setSelectedNewsDetail(selected);
  }

  useEffect(() => {
    // Set default selected news on page load
    const selected = news.find((item) => item.id === highlight.news_id) || null;
    setSelectedNewsDetail(selected);
  }, [highlight.news_id, news]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ubah Sorot" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <CardTitle>Ubah Sorot</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="kategori">Kategori</Label>
                  <Select value={data.category} onValueChange={(e) => setData('category', e)}>
                    <SelectTrigger id="kategori" aria-invalid={errors.category ? 'true' : 'false'}>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.category} />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="news">Berita</Label>
                  <Select value={data.news} onValueChange={handleNewsChange}>
                    <SelectTrigger id="news" aria-invalid={errors.news ? 'true' : 'false'}>
                      <SelectValue placeholder="Pilih Berita" />
                    </SelectTrigger>
                    <SelectContent>
                      {news.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.news} />
                </div>
              </div>

              {selectedNewsDetail && (
                <div className="col-span-2 mt-6">
                  <Card className="overflow-hidden">
                    {selectedNewsDetail.cover_url && (
                      <div className="w-full aspect-[16/9] bg-gray-100 overflow-hidden">
                        <img
                          src={selectedNewsDetail.cover_url}
                          alt={selectedNewsDetail.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">
                        {selectedNewsDetail.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mt-1">
                        {highlight.highlight_category.name} · {selectedNewsDetail.created_at}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base text-gray-700">
                        {selectedNewsDetail.title.length > 200
                          ? selectedNewsDetail.title.slice(0, 200) + '...'
                          : selectedNewsDetail.title}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="mt-6 text-end">
                <Button type="submit" disabled={processing}>
                  {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <span>Ubah Sorot</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EditSorotPage;
