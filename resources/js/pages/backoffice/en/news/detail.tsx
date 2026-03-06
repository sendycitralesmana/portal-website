// DetailProfilPage.tsx
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadIcon, PenBox, Trash2, Edit, Plus } from 'lucide-react';
import { AppContainer } from '@/components/ui/app-container';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';

const breadcrumbs = [
  { title: 'News', href: '/backoffice/en/news' },
];

type FileItem = {
  id: number;
  name: string;
  url: string;
  full_url: string;
};

type NewsCategoryItem = {
  id: number;
  name: string;
  slug: string;
};

type UserItem = {
  name: string;
};

type NewsItem = {
  id: number;
  slug: string;
  title: string;
  content: string;
  cover_url: string | null;
  user: UserItem | null;
  news_category: NewsCategoryItem;
  documents: FileItem[];
  images: FileItem[];
  created_at: string;
};

type PageProps = {
  news: NewsItem;
};

export default function DetailProfilPage() {

  const { flash } = usePage<PageProps & { flash: { message?: string } }>().props;
  useEffect(() => {
    if (flash.message) toast.success(flash.message);
  }, [flash.message]);

  // State per dialog
  const [openAddDoc, setOpenAddDoc] = useState(false);
  const [openEditDoc, setOpenEditDoc] = useState<number | null>(null);
  const [openAddImage, setOpenAddImage] = useState(false);
  const [openEditImage, setOpenEditImage] = useState<number | null>(null);

  const { news } = usePage<PageProps>().props;
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [addFile, setAddFile] = useState<File | null>(null);
  const [previewAddImage, setPreviewAddImage] = useState<string | null>(null);

  const handleDelete = (type: 'documents' | 'images', id: number) => {
    router.delete(`/backoffice/en/news/${type}/${id}/delete`, 
      {
        onSuccess: () => {

          if (type === 'documents') {
            toast.success('Document has successfully been deleted.');
          } else {
            toast.success('Image has successfully been deleted.');
          }
        },
      }
    );
  };

  const handleEdit = (type: 'documents' | 'images') => {
    if (!selectedFile || !newFile) return;
    const formData = new FormData();
    formData.append('file', newFile);
    router.post(`/backoffice/en/news/${type}/${selectedFile.id}/update`, formData, {
      onSuccess: () => {
        setSelectedFile(null);
        setNewFile(null);
        if (type === 'documents') setOpenEditDoc(null);
        if (type === 'images') setOpenEditImage(null);
        if (type === 'documents') {
          toast.success('Document has successfully been updated.');
        } else {
          toast.success('Image has successfully been updatedh.');
        }
      },
    });
  };

  const handleAdd = (type: 'documents' | 'images') => {
    if (!addFile) return;
    const formData = new FormData();
    formData.append('file', addFile);
    formData.append('news_id', news.id.toString());
    router.post(`/backoffice/en/news/${news.id}/${type}/store`, formData, {
      onSuccess: () => {
        setAddFile(null);
        setPreviewAddImage(null);
        if (type === 'documents') setOpenAddDoc(false);
        if (type === 'images') setOpenAddImage(false);
        if (type === 'documents') {
          toast.success('Document has successfully been added.');
        } else {
          toast.success('Image has successfully been added.');
        }
      },
    });
  };

  return (
    <AppLayoutEn breadcrumbs={breadcrumbs}>
      <Head title="Berita">
        <meta name="description" content="Halaman Berita" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      <div className="flex flex-col gap-4 p-4">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>News</CardTitle>
            <Button asChild>
              <Link
                href={`/backoffice/en/news/${news.id}/edit`}
                className="flex items-center gap-1"
              >
                <PenBox size={18} /> Edit
              </Link>
            </Button>
          </CardHeader>

          <CardContent>
            <main className="w-full">
              {/* Banner Cover */}
              <section className="relative w-full aspect-[4/3] sm:aspect-[16/6] md:aspect-[16/5] min-h-[200px] overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    src={news.cover_url ?? '/images/default.webp'}
                    alt="cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </section>

              <AppContainer className="flex flex-col gap-4 pt-5">
                <div className="flex flex-col gap-1">
                  <small>{news.created_at}</small>
                  <h2 className="font-bold text-2xl text-[color:var(--primary-navy)] dark:text-white">
                    {news.title}
                  </h2>
                  <p className="text-[color:var(--primary-navy)] dark:text-white">{news.news_category.name}</p>
                  {news.user && (
                    <small>Author by: {news.user.name}</small>
                  )}
                </div>

                <article
                  className="prose prose-li:marker:text-black prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />

                {/* Dokumen & Gambar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                  {/* Dokumen */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">Related Documents</h3>
                      <Dialog open={openAddDoc} onOpenChange={setOpenAddDoc}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex items-center gap-1">
                            <Plus size={14} /> Add
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Document</DialogTitle>
                            <DialogDescription>
                              Add document related to this news.
                            </DialogDescription>
                          </DialogHeader>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setAddFile(e.target.files?.[0] || null)}
                          />
                          <DialogFooter>
                            <Button onClick={() => handleAdd('documents')} disabled={!addFile}>
                              Add
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    {news.documents?.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {news.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between border p-3 rounded gap-2"
                          >
                            <span className="font-medium truncate flex-1">
                              {doc.name}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                asChild
                                className="bg-blue-900 hover:bg-blue-800 dark:text-white"
                              >
                                <a
                                  href={doc.full_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <DownloadIcon />
                                </a>
                              </Button>

                              {/* Edit */}
                              <Dialog
                                open={openEditDoc === doc.id}
                                onOpenChange={(isOpen) =>
                                  setOpenEditDoc(isOpen ? doc.id : null)
                                }
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => setSelectedFile(doc)}
                                  >
                                    <Edit />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Document</DialogTitle>
                                    <DialogDescription>
                                      Edit document related to this news.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedFile && (
                                    <div className="space-y-3">
                                      <p className="font-medium">{selectedFile.name}</p>
                                      <Button asChild variant="secondary" size="sm">
                                        <a href={selectedFile.full_url} target="_blank">Preview</a>
                                      </Button>
                                      <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) =>
                                          setNewFile(e.target.files?.[0] || null)
                                        }
                                      />
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button
                                      onClick={() => handleEdit('documents')}
                                      disabled={!newFile}
                                    >
                                      Save
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              {/* Hapus */}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="icon" variant="destructive">
                                    <Trash2 />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete document?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This document will be permanently deleted
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete('documents', doc.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No documents found.
                      </p>
                    )}
                  </div>

                  {/* Gambar */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">Related Images</h3>
                      <Dialog open={openAddImage} onOpenChange={setOpenAddImage}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex items-center gap-1">
                            <Plus size={14} /> Add
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Images</DialogTitle>
                            <DialogDescription>
                              Upload a new image for this story.
                            </DialogDescription>
                          </DialogHeader>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              setAddFile(file);
                              if (file) {
                                setPreviewAddImage(URL.createObjectURL(file));
                              } else {
                                setPreviewAddImage(null);
                              }
                            }}
                          />
                          {previewAddImage && (
                            <img
                              src={previewAddImage}
                              alt="Preview Gambar Baru"
                              className="w-full h-auto rounded border mt-2"
                            />
                          )}
                          <DialogFooter>
                            <Button onClick={() => handleAdd('images')} disabled={!addFile}>
                              Save
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    {news.images?.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {news.images.map((img) => (
                          <div
                            key={img.id}
                            className="border rounded overflow-hidden flex flex-col items-center p-1"
                          >
                            <img
                              src={img.full_url}
                              alt={img.name}
                              className="w-full h-24 object-cover rounded"
                            />
                            <div className="flex gap-1 mt-2">
                              {/* Edit */}
                              <Dialog
                                open={openEditImage === img.id}
                                onOpenChange={(isOpen) =>
                                  setOpenEditImage(isOpen ? img.id : null)
                                }
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedFile(img);
                                      setNewFile(null);
                                    }}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Image</DialogTitle>
                                    <DialogDescription>
                                      Change the image related to this news.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedFile && (
                                    <div className="space-y-3">
                                      {!newFile && (
                                        <img
                                          src={selectedFile.full_url}
                                          alt={selectedFile.name}
                                          className="w-full h-auto rounded"
                                        />
                                      )}
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0] || null;
                                          setNewFile(file);
                                        }}
                                      />
                                      {newFile && (
                                        <img
                                          src={URL.createObjectURL(newFile)}
                                          alt="Preview Gambar Baru"
                                          className="w-full h-auto rounded border"
                                        />
                                      )}
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button
                                      onClick={() => handleEdit('images')}
                                      disabled={!newFile}
                                    >
                                      Save
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              {/* Hapus */}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="icon" variant="destructive">
                                    <Trash2 size={16} />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Image?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. The image will be permanently deleted.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete('images', img.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No images found.</p>
                    )}
                  </div>
                </div>
              </AppContainer>
            </main>
          </CardContent>
        </Card>
      </div>
    </AppLayoutEn>
  );
}
