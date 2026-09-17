import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Head } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '../layout/main';

type StrukturOrganisasiType = {
    id: number;
    gambar: string | null;
    deskripsi: string | null;
    file: string | null;
    created_at?: string;
    updated_at?: string;
};

type PageProps = {
    strukturOrganisasi: StrukturOrganisasiType[];
};

type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

const StrukturOrganisasi: PageWithLayout<PageProps> = ({ strukturOrganisasi }) => {
    // =========================================================
    // DATA GAMBAR
    // =========================================================
    // Record gambar adalah record yang tidak memiliki
    // deskripsi dan file.
    const strukturGambar = strukturOrganisasi.find((item) => item.deskripsi === null && item.file === null);

    // =========================================================
    // DATA DOKUMEN
    // =========================================================
    // Record dokumen adalah record yang memiliki
    // deskripsi dan file.
    const dokumen = strukturOrganisasi.filter(
        (
            item,
        ): item is StrukturOrganisasiType & {
            file: string;
            deskripsi: string;
        } => item.deskripsi !== null && item.file !== null,
    );

    // =========================================================
    // FALLBACK GAMBAR
    // =========================================================
    const imageSrc = strukturGambar?.gambar ?? '/images/struktur-organisasi.webp';

    return (
        <>
            <Head title="Struktur Organisasi" />

            <div>
                {/* =========================================================
            BREADCRUMB
        ========================================================= */}
                <div className="border-b-2 border-b-amber-400 bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs text-white md:text-sm">
                    <div className="container mx-auto px-4">
                        Profil / <span className="font-semibold">Struktur Organisasi</span>
                    </div>
                </div>

                {/* =========================================================
            HEADER
        ========================================================= */}
                <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 md:py-8">
                    <div className="container mx-auto px-4">
                        <p className="text-xl leading-snug font-bold text-white md:text-2xl lg:text-3xl">Struktur Organisasi</p>
                    </div>
                </div>

                {/* =========================================================
            CONTENT
        ========================================================= */}
                <div className="dark:bg-background bg-slate-50 py-12">
                    <div className="container mx-auto w-full px-4">
                        {/* =====================================================
                GAMBAR STRUKTUR ORGANISASI
            ===================================================== */}
                        <div className="relative overflow-hidden rounded-md shadow-xl">
                            <img src={imageSrc} alt="Struktur Organisasi" className="h-auto w-full object-contain" />
                        </div>

                        {/* =====================================================
                DOKUMEN PDF
            ===================================================== */}
                        {/* DOKUMEN LAMPIRAN */}
                        {dokumen.length > 0 && (
                            <div className="mt-10">
                                <p className="mb-2 text-base font-semibold md:text-lg lg:text-xl">Dokumen Lampiran</p>

                                <div className="mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-amber-700 to-amber-400"></div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {dokumen.map((doc) => (
                                        <Dialog key={doc.id}>
                                            <div className="flex items-start justify-between rounded-lg border p-4 shadow-sm transition hover:shadow-md">
                                                <div className="flex min-w-0 items-start gap-3">
                                                    {/* Icon PDF */}
                                                    <div className="shrink-0 rounded-lg bg-red-100 p-2">
                                                        <FileText size={18} className="text-red-700" />
                                                    </div>

                                                    {/* Deskripsi */}
                                                    <div className="flex min-w-0 flex-col">
                                                        <p className="text-sm font-semibold md:text-base">Dokumen</p>

                                                        {doc.deskripsi && <p className="mt-1 line-clamp-2 text-sm text-gray-600">{doc.deskripsi}</p>}
                                                    </div>
                                                </div>

                                                {/* Lihat */}
                                                <DialogTrigger asChild>
                                                    <button
                                                        type="button"
                                                        className="ml-3 shrink-0 text-sm font-semibold text-red-700 transition hover:text-red-900 cursor-pointer"
                                                    >
                                                        Lihat
                                                    </button>
                                                </DialogTrigger>
                                            </div>

                                            {/* Dialog PDF */}
                                            <DialogContent className="!h-[95vh] !w-[95vw] !max-w-[95vw] overflow-hidden p-3 sm:p-4">
                                                <div className="flex h-full min-h-0 flex-col">
                                                    {/* Header */}
                                                    <div className="mb-3 flex shrink-0 items-center gap-2">
                                                        <FileText className="size-5 text-red-600" />

                                                        <h3 className="font-semibold">Dokumen PDF</h3>
                                                    </div>

                                                    {/* PDF Preview */}
                                                    <iframe
                                                        src={doc.file}
                                                        title={`Preview PDF ${doc.id}`}
                                                        className="min-h-0 w-full flex-1 rounded-lg border"
                                                    />
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

StrukturOrganisasi.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default StrukturOrganisasi;
