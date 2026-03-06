import { useState, useEffect } from "react";
import {
    Accessibility,
    X,
    Minus,
    Plus,
    Bold,
    MousePointer2,
    ImageIcon,
    CircleOff,
    Contrast,
    Volume2,
    Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function FloatingTabButtons() {
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const [showAksesibilitas, setShowAksesibilitas] = useState(false);
    const [textSize, setTextSize] = useState(100);
    const [lineHeight, setLineHeight] = useState(1);
    const [textSpacing, setTextSpacing] = useState("sedang");
    const [textAlign, setTextAlign] = useState("left");
    const [isBold, setIsBold] = useState(false);
    const [highlightLinks, setHighlightLinks] = useState(false);
    const [monochrome, setMonochrome] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [largeCursor, setLargeCursor] = useState(false);
    const [hideImages, setHideImages] = useState(false);

    useEffect(() => {
        document.body.style.fontSize = `${textSize}%`;
        document.body.style.lineHeight = `${lineHeight}`;
        document.body.style.letterSpacing =
            textSpacing === "kecil"
                ? "0px"
                : textSpacing === "sedang"
                    ? "1px"
                    : "2px";
        document.body.style.fontWeight = isBold ? "bold" : "normal";
        document.body.classList.toggle("highlight-links", highlightLinks);
        document.body.classList.toggle("monochrome", monochrome);
        document.body.classList.toggle("high-contrast", highContrast);
        document.body.classList.toggle("large-cursor", largeCursor);
        document.body.classList.toggle("hide-images", hideImages);
    }, [
        textSize,
        lineHeight,
        textSpacing,
        textAlign,
        isBold,
        highlightLinks,
        monochrome,
        highContrast,
        largeCursor,
        hideImages,
    ]);

    useEffect(() => {
        let speakTimeout: NodeJS.Timeout;

        const handleMouseOver = (e: MouseEvent) => {
            if (!voiceEnabled) return;

            const target = e.target as HTMLElement;
            const text = target.innerText?.trim();

            if (text && text.length > 0) {
                // Hentikan suara yang sedang berjalan
                speechSynthesis.cancel();

                // Tunggu sedikit agar tidak terlalu cepat
                clearTimeout(speakTimeout);
                speakTimeout = setTimeout(() => {
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = "id-ID"; // Bahasa Indonesia
                    speechSynthesis.speak(utterance);
                }, 300);
            }
        };

        if (voiceEnabled) {
            document.body.addEventListener("mouseover", handleMouseOver);
        }

        return () => {
            document.body.removeEventListener("mouseover", handleMouseOver);
            speechSynthesis.cancel();
            clearTimeout(speakTimeout);
        };
    }, [voiceEnabled]);


    const resetSettings = () => {
        setVoiceEnabled(false);
        setTextSize(100);
        setLineHeight(1);
        setTextSpacing("sedang");
        setTextAlign("left");
        setIsBold(false);
        setHighlightLinks(false);
        setMonochrome(false);
        setHighContrast(false);
        setLargeCursor(false);
        setHideImages(false);
    };

    return (
        <>
            <div className="fixed top-1/2 left-12 -translate-y-1/2 z-50">
                <a
                    href="https://www.lapor.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#EE2D11] text-white font-semibold text-sm px-2 py-4 rounded-br-md rounded-bl-md rotate-[-90deg] origin-bottom-left hover:bg-[#c8250e] transition cursor-pointer inline-block"
                >
                    Pengaduan Publik
                </a>
            </div>

            <div className="fixed top-1/2 right-4 -translate-y-1/2 z-50 group">
                <button
                    className="bg-[#121D79] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#0f1963] transition relative cursor-pointer"
                    onClick={() => setShowAksesibilitas(true)}
                >
                    <Accessibility className="w-6 h-6" />
                </button>
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-[#121D79] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Aksesibilitas
                </div>
            </div>

            {showAksesibilitas && (
                <div
                    className={cn("fixed right-0 top-0 h-screen w-fit z-[99] flex flex-col justify-center items-end pointer-events-none")}
                    style={{ background: "none" }}
                >
                   <section className="relative p-5 mb-4 overflow-auto bg-white dark:bg-zinc-900 shadow-md pointer-events-auto w-80 rounded-lg">
                        <div className="flex items-center justify-between pb-5">
                            <h2 className="text-lg font-bold leading-normal md:text-xl text-black dark:text-white">
                                Menu Aksesibilitas
                            </h2>
                            <Button
                                size="icon"
                                className="bg-indigo-600 text-white hover:bg-indigo-500"
                                onClick={() => setShowAksesibilitas(false)}
                                aria-label="Tutup Menu Aksesibilitas"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Volume2 className="w-4 h-4 text-indigo-600" />
                                    <span>Aktifkan Mode Suara</span>
                                </div>
                                <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
                            </div>

                            <div>
                                <p className="font-semibold mb-2">Atur Ukuran Teks</p>
                                <div className="flex items-center justify-between">
                                    <Button variant="ghost" onClick={() => setTextSize((prev) => Math.max(50, prev - 10))}><Minus /></Button>
                                    <span className="font-medium">{textSize}%</span>
                                    <Button variant="ghost" onClick={() => setTextSize((prev) => Math.min(200, prev + 10))}><Plus /></Button>
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold mb-2">Atur Tinggi Baris</p>
                                <div className="flex items-center justify-between">
                                    <Button variant="ghost" onClick={() => setLineHeight((prev) => Math.max(1, prev - 0.1))}><Minus /></Button>
                                    <span className="font-medium">{lineHeight.toFixed(1)}x</span>
                                    <Button variant="ghost" onClick={() => setLineHeight((prev) => Math.min(3, prev + 0.1))}><Plus /></Button>
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold mb-2">Spasi Teks</p>
                                <div className="flex gap-2">
                                    <Button variant={textSpacing === "kecil" ? "default" : "outline"} onClick={() => setTextSpacing("kecil")}>Kecil</Button>
                                    <Button variant={textSpacing === "sedang" ? "default" : "outline"} onClick={() => setTextSpacing("sedang")}>Sedang</Button>
                                    <Button variant={textSpacing === "besar" ? "default" : "outline"} onClick={() => setTextSpacing("besar")}>Besar</Button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {[{
                                    label: "Pertebal Huruf",
                                    icon: <Bold />,
                                    value: isBold,
                                    toggle: () => setIsBold(!isBold),
                                }, {
                                    label: "Sorot Tautan",
                                    icon: <Link2 />,
                                    value: highlightLinks,
                                    toggle: () => setHighlightLinks(!highlightLinks),
                                }, 
                                // {
                                //     label: "Mode Monokrom",
                                //     icon: <CircleOff />,
                                //     value: monochrome,
                                //     toggle: () => setMonochrome(!monochrome),
                                // }, 
                                {
                                    label: "Mode Kontras Terang",
                                    icon: <Contrast />,
                                    value: highContrast,
                                    toggle: () => setHighContrast(!highContrast),
                                }, 
                                // {
                                //     label: "Perbesar Kursor",
                                //     icon: <MousePointer2 />,
                                //     value: largeCursor,
                                //     toggle: () => setLargeCursor(!largeCursor),
                                // }, 
                                {
                                    label: "Sembunyikan Gambar",
                                    icon: <ImageIcon />,
                                    value: hideImages,
                                    toggle: () => setHideImages(!hideImages),
                                }].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-indigo-600">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </div>
                                        <Switch checked={item.value} onCheckedChange={item.toggle} />
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4">
                                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-500" onClick={resetSettings}>
                                    Atur Ulang Pengaturan
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}
