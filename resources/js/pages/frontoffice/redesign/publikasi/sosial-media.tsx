import { SocialPlatform, SosialMedia } from '@/types/sosial-media';
import { Head } from '@inertiajs/react';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '../layout/main';

type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

interface Props {
    sosialMedias: SosialMedia[];
}

const SosialMediaPage: PageWithLayout<Props> = ({ sosialMedias }) => {
    const platforms: SocialPlatform[] = ['instagram', 'tiktok', 'youtube', 'twitter', 'facebook'];

    const getEmbedUrl = (url: string, platform: SocialPlatform) => {
        if (platform === 'tiktok') {
            return url.includes('?') ? `${url}&rel=0` : `${url}?rel=0`;
        }

        return url;
    };

    const aspectMap: Record<SocialPlatform, string> = {
        instagram: 'aspect-[12/16]',
        tiktok: 'aspect-[13/23]',
        youtube: 'aspect-video',
        twitter: 'aspect-[12/16]',
        facebook: 'aspect-[12/21]',
    };

    const gridMap: Record<SocialPlatform, string> = {
        instagram: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        tiktok: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        youtube: 'grid-cols-1 md:grid-cols-2',
        twitter: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        facebook: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    const titleMap: Record<SocialPlatform, string> = {
        instagram: 'Instagram',
        tiktok: 'TikTok',
        youtube: 'YouTube',
        twitter: 'Twitter',
        facebook: 'Facebook',
    };

    return (
        <>
            <Head title="Sosial Media - LPSK" />

            <div className="min-h-screen">
                {/* Breadcrumb */}
                <div className="border-b-2 border-b-amber-400 bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs text-white md:text-sm">
                    <div className="container mx-auto px-4">
                        Publikasi / <span className="font-semibold">Sosial Media</span>
                    </div>
                </div>

                {/* Header */}
                <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 md:py-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-xl leading-snug font-semibold text-white md:text-2xl">Sosial Media</h2>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto space-y-10 px-4 py-8">
                    {platforms.map((platform) => {
                        const data = sosialMedias.filter((item) => item.platform === platform);

                        if (data.length === 0) return null;

                        return (
                            <div key={platform}>
                                {/* Platform Title */}
                                <h3 className="text-xl font-semibold">{titleMap[platform]}</h3>

                                <div className="mt-2 mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-amber-700 to-amber-400"></div>

                                {/* Grid */}
                                <div className={`grid gap-4 ${gridMap[platform]}`}>
                                    {data.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`w-full overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-lg ${aspectMap[platform]}`}
                                        >
                                            <iframe
                                                src={getEmbedUrl(item.embed_url, platform)}
                                                className="h-full w-full border-0"
                                                allowFullScreen
                                                loading="lazy"
                                                scrolling="no"
                                                title={`${platform}-${item.id}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

SosialMediaPage.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default SosialMediaPage;
