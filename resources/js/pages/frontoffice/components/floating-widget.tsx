import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
    Accessibility,
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    CircleOff,
    ImageIcon,
    Link2,
    LogOut,
    Minus,
    MousePointer2,
    Plus,
    Volume2,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FloatingTabButtons() {
    const root = document.documentElement;

    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    const [textSize, setTextSize] = useState(100);
    const [lineHeight, setLineHeight] = useState(1.6);
    const [letterSpacing, setLetterSpacing] = useState('normal');
    const [textAlign, setTextAlign] = useState('left');

    const [boldText, setBoldText] = useState(false);
    const [highlightLinks, setHighlightLinks] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [grayscale, setGrayscale] = useState(false);
    const [hideImages, setHideImages] = useState(false);
    const [largeCursor, setLargeCursor] = useState(false);
    const [stopAnimations, setStopAnimations] = useState(false);
    const [focusOutline, setFocusOutline] = useState(false);

    /* ===============================
     APPLY SETTINGS
  ================================= */

    useEffect(() => {
        root.style.fontSize = `${textSize}%`;
        root.style.lineHeight = `${lineHeight}`;
        root.style.letterSpacing = letterSpacing === 'normal' ? '0px' : letterSpacing === 'wide' ? '1px' : '2px';
        root.style.textAlign = textAlign;
        root.style.fontWeight = boldText ? '600' : 'normal';

        root.classList.toggle('a11y-highlight-links', highlightLinks);
        root.classList.toggle('a11y-high-contrast', highContrast);
        root.classList.toggle('a11y-grayscale', grayscale);
        root.classList.toggle('a11y-hide-images', hideImages);
        root.classList.toggle('a11y-large-cursor', largeCursor);
        root.classList.toggle('a11y-stop-animations', stopAnimations);
        root.classList.toggle('a11y-focus-outline', focusOutline);
    }, [
        textSize,
        lineHeight,
        letterSpacing,
        textAlign,
        boldText,
        highlightLinks,
        highContrast,
        grayscale,
        hideImages,
        largeCursor,
        stopAnimations,
        focusOutline,
    ]);

    /* ===============================
     VOICE READER
  ================================= */

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const handleHover = (e: MouseEvent) => {
            if (!voiceEnabled) return;
            const target = e.target as HTMLElement;
            const text = target.innerText?.trim();
            if (!text) return;

            speechSynthesis.cancel();
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'id-ID';
                speechSynthesis.speak(utterance);
            }, 300);
        };

        if (voiceEnabled) {
            document.body.addEventListener('mouseover', handleHover);
        }

        return () => {
            document.body.removeEventListener('mouseover', handleHover);
            speechSynthesis.cancel();
            clearTimeout(timeout);
        };
    }, [voiceEnabled]);

    /* ===============================
     RESET
  ================================= */

    const resetAll = () => {
        setVoiceEnabled(false);
        setTextSize(100);
        setLineHeight(1.6);
        setLetterSpacing('normal');
        setTextAlign('left');
        setBoldText(false);
        setHighlightLinks(false);
        setHighContrast(false);
        setGrayscale(false);
        setHideImages(false);
        setLargeCursor(false);
        setStopAnimations(false);
        setFocusOutline(false);

        root.removeAttribute('style');
        root.className = '';
    };

    /* ===============================
     COMPONENT
  ================================= */

    return (
        <>
            {/* <div className="fixed top-1/2 left-12 z-50 -translate-y-1/2">
                <a
                    href="https://www.lapor.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-amber-400 inline-flex origin-bottom-left rotate-[-90deg] cursor-pointer items-center rounded-br-md rounded-bl-md bg-gradient-to-b from-red-900 to-red-700 px-2 py-4 text-sm font-semibold tracking-widest text-white transition-all duration-300 hover:from-red-700 hover:to-red-800 md:text-base"
                >
                    Pengaduan Masyarakat
                </a>
            </div> */}
            <div className="fixed top-1/2 left-8 z-30 -translate-y-1/2 md:left-12">
                <a
                    href="https://span.lapor.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex origin-bottom-left rotate-[-90deg] cursor-pointer items-center rounded-br-md rounded-bl-md border-2 border-amber-400 bg-gradient-to-b from-red-900 to-red-700 px-1.5 py-2 text-xs font-semibold tracking-wide text-white transition-all duration-300 hover:from-red-700 hover:to-red-800 md:px-2 md:py-4 md:text-base md:tracking-widest"
                >
                    Pengaduan Masyarakat
                </a>
            </div>

            {/* Floating Buttons Container */}
            <div className="fixed top-[85%] right-2 z-50 flex -translate-y-1/2 flex-col items-end gap-3">
                {/* Accessibility */}
                <div className="group relative">
                    <button
                        onClick={() => setShowPanel(true)}
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-amber-400 bg-red-700 text-white transition hover:bg-red-800"
                    >
                        <Accessibility className="h-6 w-6" />
                    </button>

                    <span className="absolute top-1/2 right-14 -translate-y-1/2 rounded-md bg-black px-3 py-1 text-xs whitespace-nowrap text-white opacity-0 transition group-hover:opacity-100">
                        Aksesibilitas
                    </span>
                </div>

                {/* WhatsApp */}
                <div className="group relative">
                    <a
                        href="https://api.whatsapp.com/send/?phone=6285770010048&text=Hallo+LPSK+saya+mau+bertanya&type=phone_number&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-amber-400 bg-green-600 text-white shadow-lg transition hover:bg-green-700"
                    >
                        <img src="/images/wa_icon.png" alt="WhatsApp" className="h-6 w-6 object-contain" />
                    </a>

                    <span className="absolute top-1/2 right-14 -translate-y-1/2 rounded-md bg-black px-3 py-1 text-xs whitespace-nowrap text-white opacity-0 transition group-hover:opacity-100">
                        Chat WhatsApp
                    </span>
                </div>

                {/* Emergency Exit */}
                <div className="group relative">
                    <a
                        href="https://www.google.com/"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-amber-400 bg-blue-800 text-white shadow-lg transition hover:bg-blue-900"
                    >
                        <LogOut className="h-5 w-5" />
                    </a>

                    <span className="absolute top-1/2 right-14 -translate-y-1/2 rounded-md bg-black px-3 py-1 text-xs whitespace-nowrap text-white opacity-0 transition group-hover:opacity-100">
                        Keluar Cepat
                    </span>
                </div>
            </div>

            {showPanel && (
                <div className="fixed top-1/2 right-4 z-50 -translate-y-1/2">
                    <div className="w-80 space-y-6 rounded-xl border bg-white p-6 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold dark:text-black">Menu Aksesibilitas</h2>
                            <button
                                className="cursor-pointer rounded-2xl border-2 border-amber-400 bg-red-700 p-1 text-white"
                                onClick={() => setShowPanel(false)}
                            >
                                <X />
                            </button>
                        </div>

                        {/* Voice */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Volume2 className="h-4 w-4 text-blue-600" />
                                <span className="dark:text-black">Mode Suara</span>
                            </div>
                            <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
                        </div>

                        {/* Text Size */}
                        <div>
                            <p className="mb-2 font-semibold dark:text-black">Ukuran Teks</p>
                            <div className="flex items-center justify-between dark:text-black">
                                <Button variant="ghost" onClick={() => setTextSize((p) => Math.max(50, p - 10))}>
                                    <Minus />
                                </Button>
                                <span className="dark:text-black">{textSize}%</span>
                                <Button variant="ghost" onClick={() => setTextSize((p) => Math.min(200, p + 10))}>
                                    <Plus />
                                </Button>
                            </div>
                        </div>

                        {/* Alignment */}
                        <div>
                            <p className="mb-2 font-semibold">Perataan Teks</p>
                            <div className="flex gap-2">
                                <Button variant={textAlign === 'left' ? 'default' : 'outline'} onClick={() => setTextAlign('left')}>
                                    <AlignLeft />
                                </Button>
                                <Button variant={textAlign === 'center' ? 'default' : 'outline'} onClick={() => setTextAlign('center')}>
                                    <AlignCenter />
                                </Button>
                                <Button variant={textAlign === 'right' ? 'default' : 'outline'} onClick={() => setTextAlign('right')}>
                                    <AlignRight />
                                </Button>
                            </div>
                        </div>

                        {/* Toggles */}
                        {[
                            { label: 'Pertebal Huruf', state: boldText, set: setBoldText, icon: <Bold /> },
                            { label: 'Sorot Tautan', state: highlightLinks, set: setHighlightLinks, icon: <Link2 /> },
                            //   { label: "Kontras Tinggi", state: highContrast, set: setHighContrast, icon: <Contrast /> },
                            { label: 'Grayscale', state: grayscale, set: setGrayscale, icon: <CircleOff /> },
                            { label: 'Sembunyikan Gambar', state: hideImages, set: setHideImages, icon: <ImageIcon /> },
                            { label: 'Perbesar Kursor', state: largeCursor, set: setLargeCursor, icon: <MousePointer2 /> },
                            { label: 'Hentikan Animasi', state: stopAnimations, set: setStopAnimations, icon: <Accessibility /> },
                            { label: 'Perjelas Fokus', state: focusOutline, set: setFocusOutline, icon: <Accessibility /> },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-blue-600">
                                    {item.icon}
                                    {item.label}
                                </div>
                                <Switch checked={item.state} onCheckedChange={item.set} />
                            </div>
                        ))}

                        <Button onClick={resetAll} className="w-full border-2 border-amber-400 bg-red-800 text-white hover:bg-red-700">
                            Reset Pengaturan
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
