import { SocialPlatform, SosialMedia } from '@/types/sosial-media';
import { Facebook, Instagram, Music2, Twitter, Youtube } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Props {
    sosialMedias: SosialMedia[];
}

export default function SocialMediaSection({ sosialMedias }: Props) {
    const [active, setActive] = useState<SocialPlatform>('instagram');

    const [loadedPlatforms, setLoadedPlatforms] = useState<SocialPlatform[]>(['instagram']);

    const handlePlatformChange = (platform: SocialPlatform) => {
        setActive(platform);

        if (!loadedPlatforms.includes(platform)) {
            setLoadedPlatforms((prev) => [...prev, platform]);
        }
    };

    const icons = [
        { key: 'instagram', icon: Instagram },
        { key: 'tiktok', icon: Music2 },
        { key: 'youtube', icon: Youtube },
        { key: 'twitter', icon: Twitter }, // sementara
        { key: 'facebook', icon: Facebook },
    ] as const;

    const twitterData: SosialMedia[] = [
        {
            id: 1,
            platform: 'twitter',
            embed_url: 'https://platform.twitter.com/embed/Tweet.html?id=2062471706284069331',
        },
        {
            id: 2,
            platform: 'twitter',
            embed_url: 'https://platform.twitter.com/embed/Tweet.html?id=2062470577609458104',
        },
        {
            id: 3,
            platform: 'twitter',
            embed_url: 'https://platform.twitter.com/embed/Tweet.html?id=2062470253100388846',
        },
        {
            id: 4,
            platform: 'twitter',
            embed_url: 'https://platform.twitter.com/embed/Tweet.html?id=2062469941954236570',
        },
    ];

    const facebookData: SosialMedia[] = [
        {
            id: 1,
            platform: 'facebook',
            embed_url: 'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/948279264898458',
        },
        {
            id: 2,
            platform: 'facebook',
            embed_url: 'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/4606688322992675',
        },
        {
            id: 3,
            platform: 'facebook',
            embed_url: 'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/1732761444740821',
        },
        {
            id: 4,
            platform: 'facebook',
            embed_url: 'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/1340659271538696',
        },
    ];

    const instagramData = useMemo(() => sosialMedias.filter((item) => item.platform === 'instagram'), [sosialMedias]);

    const tiktokData = useMemo(() => sosialMedias.filter((item) => item.platform === 'tiktok'), [sosialMedias]);

    const youtubeData = useMemo(() => sosialMedias.filter((item) => item.platform === 'youtube'), [sosialMedias]);

    const aspectMap: Record<SocialPlatform, string> = {
        instagram: 'aspect-[12/17]',
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

    const getTikTokUrl = (url: string) => {
        return url.includes('?') ? `${url}&rel=0` : `${url}?rel=0`;
    };

    const renderPlatform = (data: SosialMedia[], platform: SocialPlatform) => {
        if (data.length === 0) {
            return <p className="mt-4 text-sm text-gray-500">Belum ada konten untuk platform ini.</p>;
        }

        return (
            <div className={`grid gap-4 ${gridMap[platform]}`}>
                {data.map((item) => (
                    <div
                        key={item.id}
                        className={`w-full overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-lg ${aspectMap[platform]}`}
                    >
                        {/* <iframe
              src={item.embed_url}
              className="w-full h-full border-0"
              allowFullScreen
              scrolling="no"
              title={`${platform}-${item.id}`}
            /> */}
                        <iframe
                            src={getTikTokUrl(item.embed_url)}
                            className="h-full w-full border-0"
                            allowFullScreen
                            scrolling="no"
                            title={`${platform}-${item.id}`}
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section className="w-full px-4 py-12 xl:px-20">
            <div className="container mx-auto">
                <p className="mb-4 text-lg font-bold md:text-xl lg:text-2xl">LPSK Sosial Media</p>

                <div className="mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-amber-700 to-amber-400" />

                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Platform Icons */}
                    <div className="flex gap-4 lg:w-20 lg:flex-col">
                        {icons.map(({ key, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => handlePlatformChange(key)}
                                className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border transition-all duration-200 ${
                                    active === key ? 'border-2 border-amber-400 bg-red-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <Icon size={22} />
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        {loadedPlatforms.includes('instagram') && (
                            <div className={active === 'instagram' ? 'block' : 'hidden'}>{renderPlatform(instagramData, 'instagram')}</div>
                        )}

                        {loadedPlatforms.includes('tiktok') && (
                            <div className={active === 'tiktok' ? 'block' : 'hidden'}>{renderPlatform(tiktokData, 'tiktok')}</div>
                        )}

                        {loadedPlatforms.includes('youtube') && (
                            <div className={active === 'youtube' ? 'block' : 'hidden'}>{renderPlatform(youtubeData, 'youtube')}</div>
                        )}

                        {loadedPlatforms.includes('twitter') && (
                            <div className={active === 'twitter' ? 'block' : 'hidden'}>{renderPlatform(twitterData, 'twitter')}</div>
                        )}

                        {loadedPlatforms.includes('facebook') && (
                            <div className={active === 'facebook' ? 'block' : 'hidden'}>{renderPlatform(facebookData, 'facebook')}</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
