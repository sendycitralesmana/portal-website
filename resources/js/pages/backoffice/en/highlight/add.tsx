import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add Highlight',
    href: '/backoffice/highlight/add',
  },
];

type CategoryItem = {
  id: string;
  name: string;
};

type NewsItem = {
  id: string;
  title: string;
  status: string;
  news_category: CategoryItem;
  cover_url: string;
  created_at: string;
};

type PageProps = {
  categories: CategoryItem[];
  news: NewsItem[];
};

const AddHighlightPage = () => {
  const { categories, news } = usePage<PageProps>().props;

  const [selectedNewsDetail, setSelectedNewsDetail] = useState<null | {
    id: string;
    title: string;
    cover_url: string;
    excerpt: string;
    category: string;
    created_at: string;
  }>(null);

  const { data, setData, post, errors, processing } = useForm<{
    category: string;
    news: string;
  }>({
    category: '',
    news: '',
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('backoffice.highlightEn.store'));
  }

  function handleNewsChange(newsId: string) {
    setData('news', newsId);
    if (!newsId) {
      setSelectedNewsDetail(null);
      return;
    }

    fetch(route('backoffice.newsEn.show', newsId))
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch news detail');
        return res.json();
      })
      .then((data) => setSelectedNewsDetail(data))
      .catch((err) => {
        console.error(err);
        setSelectedNewsDetail(null);
      });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Highlight" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <CardTitle>Add Highlight</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="category">Category</Label>
                  <Select value={data.category} onValueChange={(e) => setData('category', e)}>
                    <SelectTrigger id="category" aria-invalid={errors.category ? 'true' : 'false'}>
                      <SelectValue placeholder="Select Category" />
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
                  <Label htmlFor="news">News</Label>
                  <Select value={data.news} onValueChange={handleNewsChange}>
                    <SelectTrigger id="news" aria-invalid={errors.news ? 'true' : 'false'}>
                      <SelectValue placeholder="Select News" />
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
                        {selectedNewsDetail.category} · {selectedNewsDetail.created_at}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base text-gray-700">{selectedNewsDetail.excerpt}</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="mt-4 text-end">
                <Button type="submit" disabled={processing}>
                  {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <span>Add Highlight</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AddHighlightPage;
