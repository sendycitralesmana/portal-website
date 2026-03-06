import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import clsx from "clsx";
import { getFirstSentence } from "@/utils/html.utils";
import { Link } from "@inertiajs/react";
export default function EnImageSliderModal({ modals }: { modals: any[] }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [open, setOpen] = useState(true);
    if (!open || modals.length == 0) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
            <div className="relative w-[90vw] max-w-4xl h-[80vh] bg-slate-900 text-white rounded-lg overflow-hidden shadow-lg">
                <div
                    className="flex transition-transform duration-500 ease-in-out h-full w-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {modals.map((modal: any, i: number) => (
                        <div
                            key={i}
                            className="w-full flex-shrink-0 relative flex flex-col justify-end min-w-0"
                        >
                            <img
                                key={i}
                                src={
                                    modal.news.cover != null
                                        ? `${modal.news.cover_url}`
                                        : "/images/default.webp"
                                }
                                alt="LPSK"
                                className={clsx(
                                    "absolute inset-0 w-full h-full object-contain bg-black transition-opacity duration-700",
                                    i === currentIndex ? "opacity-100" : "opacity-0"
                                )}
                            />

                            <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 pb-24 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
                                {modal.news.title !== "-" && (
                                    <Link
                                        href={`/en/news/${modal.news.news_category.slug}/${modal.news.id}`}
                                        className="text-2xl font-bold lg:text-4xl leading-snug break-words"
                                    >
                                        {modal.news.title}
                                    </Link>
                                )}

                                {modal.news.content !== "-" && (
                                    <p className="mt-1 text-base lg:text-lg text-slate-200 leading-relaxed break-words whitespace-normal w-full">
                                        <p className="text-sm leading-relaxed">
                                            {getFirstSentence(modal.news.content)}
                                        </p>
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() =>
                        setCurrentIndex((currentIndex - 1 + modals.length) % modals.length)
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-400 z-20"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                    onClick={() => setCurrentIndex((currentIndex + 1) % modals.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-400 z-20"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>

                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 bg-white text-black rounded hover:bg-red-600 hover:text-white p-1 z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {modals.map((_: any, i: number) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={clsx(
                                "h-3 w-3 rounded-full transition-all duration-300",
                                i === currentIndex
                                    ? "bg-orange-500 scale-125"
                                    : "bg-slate-300 opacity-70 hover:opacity-100"
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
