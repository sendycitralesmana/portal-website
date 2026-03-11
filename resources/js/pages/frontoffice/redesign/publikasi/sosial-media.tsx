import { Head } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import MainLayout from "../layout/main";
import { SosialMedia, SocialPlatform } from "@/types/sosial-media";

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

interface Props {
  sosialMedias: SosialMedia[];
}

const SosialMediaPage: PageWithLayout<Props> = ({ sosialMedias }) => {

  const platforms: SocialPlatform[] = ["instagram", "tiktok", "youtube"];

  const aspectMap: Record<SocialPlatform, string> = {
    instagram: "aspect-[12/16]",
    tiktok: "aspect-[13/23]",
    youtube: "aspect-video",
  };

  const gridMap: Record<SocialPlatform, string> = {
    instagram: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    tiktok: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    youtube: "grid-cols-1 md:grid-cols-2",
  };

  const titleMap: Record<SocialPlatform, string> = {
    instagram: "Instagram",
    tiktok: "TikTok",
    youtube: "YouTube",
  };

  return (
    <>
      <Head title="Sosial Media - LPSK" />

      <div className="min-h-screen">

        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs md:text-sm text-white border-b-amber-400 border-b-2">
          <div className="container mx-auto px-4">
            Publikasi /{" "}
            <span className="font-semibold">
              Sosial Media
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 md:py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug">
              Sosial Media
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 space-y-10">

          {platforms.map((platform) => {
            const data = sosialMedias.filter(
              (item) => item.platform === platform
            );

            if (data.length === 0) return null;

            return (
              <div key={platform}>

                {/* Platform Title */}
                <h3 className="text-xl font-semibold">
                  {titleMap[platform]}
                </h3>

                <div className="w-16 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mt-2 mb-4"></div>

                {/* Grid */}
                <div className={`grid gap-4 ${gridMap[platform]}`}>
                  {data.map((item) => (
                    <div
                      key={item.id}
                      className={`w-full rounded-xl overflow-hidden ${aspectMap[platform]}`}
                    >
                      <iframe
                        src={item.embed_url}
                        className="w-full h-full border-0"
                        allow="fullscreen"
                        loading="lazy"
                        scrolling="no"
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

SosialMediaPage.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default SosialMediaPage;