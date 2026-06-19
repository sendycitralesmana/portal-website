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
  AlignLeft,
  AlignCenter,
  AlignRight,
  MessageSquareWarning,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function FloatingTabButtons() {
  const root = document.documentElement;

  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const [textSize, setTextSize] = useState(100);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [letterSpacing, setLetterSpacing] = useState("normal");
  const [textAlign, setTextAlign] = useState("left");

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
    root.style.letterSpacing =
      letterSpacing === "normal"
        ? "0px"
        : letterSpacing === "wide"
        ? "1px"
        : "2px";
    root.style.textAlign = textAlign;
    root.style.fontWeight = boldText ? "600" : "normal";

    root.classList.toggle("a11y-highlight-links", highlightLinks);
    root.classList.toggle("a11y-high-contrast", highContrast);
    root.classList.toggle("a11y-grayscale", grayscale);
    root.classList.toggle("a11y-hide-images", hideImages);
    root.classList.toggle("a11y-large-cursor", largeCursor);
    root.classList.toggle("a11y-stop-animations", stopAnimations);
    root.classList.toggle("a11y-focus-outline", focusOutline);
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
        utterance.lang = "id-ID";
        speechSynthesis.speak(utterance);
      }, 300);
    };

    if (voiceEnabled) {
      document.body.addEventListener("mouseover", handleHover);
    }

    return () => {
      document.body.removeEventListener("mouseover", handleHover);
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
    setLetterSpacing("normal");
    setTextAlign("left");
    setBoldText(false);
    setHighlightLinks(false);
    setHighContrast(false);
    setGrayscale(false);
    setHideImages(false);
    setLargeCursor(false);
    setStopAnimations(false);
    setFocusOutline(false);

    root.removeAttribute("style");
    root.className = "";
  };

  /* ===============================
     COMPONENT
  ================================= */

  return (
    <>
      {/* Pengaduan Publik */}
      {/* <div className="fixed top-1/2 left-9 -translate-y-1/2 z-50">
        <a
          href="https://www.lapor.go.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-700 text-white font-semibold text-sm px-2 py-2 rounded-br-md rounded-bl-md rotate-[-90deg] 
          origin-bottom-left hover:bg-red-800 transition cursor-pointer inline-flex items-center gap-1 border-amber-400 border-2"
        >
          <MessageSquareWarning className="w-6 h-6" />
          <span>Pengaduan Publik</span>
        </a>
      </div> */}

      {/* Floating Button */}
      {/* <div className="fixed top-1/2 right-2 -translate-y-1/2 z-50">
        <button
          onClick={() => setShowPanel(true)}
          className="bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center 
          hover:bg-red-800 transition cursor-pointer border-amber-400 border-2"
        >
          <Accessibility className="w-6 h-6" />
        </button>
      </div> */}

      {/* Floating Buttons Container */}
        <div className="fixed top-[85%] right-2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">

          {/* Accessibility Button */}
          <button
            onClick={() => setShowPanel(true)}
            className="bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center 
            hover:bg-red-800 transition cursor-pointer border-amber-400 border-2"
          >
            <Accessibility className="w-6 h-6" />
          </button>

          {/* WhatsApp Button */}
          <a
            href="https://api.whatsapp.com/send/?phone=6285770010048&text=Hallo+LPSK+saya+mau+bertanya&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center 
            hover:bg-green-700 transition cursor-pointer border-amber-400 border-2 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-6 h-6 fill-current"
            >
              <path d="M16.004 3C9.373 3 4 8.373 4 15.004c0 2.645.863 5.09 2.324 7.074L4 29l7.14-2.283a11.94 11.94 0 004.864 1.03h.001c6.63 0 12.003-5.373 12.003-12.003C28.008 8.373 22.635 3 16.004 3zm0 21.82c-1.97 0-3.89-.53-5.56-1.53l-.4-.24-4.24 1.36 1.39-4.13-.26-.42a9.79 9.79 0 01-1.51-5.26c0-5.44 4.42-9.86 9.86-9.86 2.63 0 5.1 1.02 6.96 2.88a9.79 9.79 0 012.89 6.98c0 5.44-4.42 9.86-9.86 9.86zm5.42-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.49-1.8-1.66-2.1-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52 0 1.5 1.08 2.95 1.23 3.15.15.2 2.13 3.25 5.17 4.55.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.28-.2-.58-.35z"/>
            </svg>
          </a>

          {/* Emergency Exit Button */}
          <a
            href="https://www.google.com/"
            rel="noopener noreferrer"
            className="bg-blue-800 text-white w-12 h-12 rounded-full flex items-center justify-center 
            hover:bg-blue-900 transition cursor-pointer border-amber-400 border-2 shadow-lg"
          >
            <LogOut className="w-6 h-6" />
          </a>

        </div>

      {showPanel && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
          <div className="w-80 bg-white shadow-2xl rounded-xl p-6 space-y-6 border">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg dark:text-black">Menu Aksesibilitas</h2>
              <button className="p-1 bg-red-700 border-amber-400 border-2 rounded-2xl cursor-pointer text-white" onClick={() => setShowPanel(false)}>
                <X />
              </button>
            </div>

            {/* Voice */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span className="dark:text-black">Mode Suara</span>
              </div>
              <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
            </div>

            {/* Text Size */}
            <div>
              <p className="font-semibold mb-2 dark:text-black">Ukuran Teks</p>
              <div className="flex justify-between items-center dark:text-black">
                <Button variant="ghost" onClick={() => setTextSize((p) => Math.max(50, p - 10))}><Minus /></Button>
                <span className="dark:text-black">{textSize}%</span>
                <Button variant="ghost" onClick={() => setTextSize((p) => Math.min(200, p + 10))}><Plus /></Button>
              </div>
            </div>

            {/* Alignment */}
            <div>
              <p className="font-semibold mb-2">Perataan Teks</p>
              <div className="flex gap-2">
                <Button variant={textAlign==="left"?"default":"outline"} onClick={()=>setTextAlign("left")}><AlignLeft /></Button>
                <Button variant={textAlign==="center"?"default":"outline"} onClick={()=>setTextAlign("center")}><AlignCenter /></Button>
                <Button variant={textAlign==="right"?"default":"outline"} onClick={()=>setTextAlign("right")}><AlignRight /></Button>
              </div>
            </div>

            {/* Toggles */}
            {[
              { label: "Pertebal Huruf", state: boldText, set: setBoldText, icon: <Bold /> },
              { label: "Sorot Tautan", state: highlightLinks, set: setHighlightLinks, icon: <Link2 /> },
            //   { label: "Kontras Tinggi", state: highContrast, set: setHighContrast, icon: <Contrast /> },
              { label: "Grayscale", state: grayscale, set: setGrayscale, icon: <CircleOff /> },
              { label: "Sembunyikan Gambar", state: hideImages, set: setHideImages, icon: <ImageIcon /> },
              { label: "Perbesar Kursor", state: largeCursor, set: setLargeCursor, icon: <MousePointer2 /> },
              { label: "Hentikan Animasi", state: stopAnimations, set: setStopAnimations, icon: <Accessibility /> },
              { label: "Perjelas Fokus", state: focusOutline, set: setFocusOutline, icon: <Accessibility /> },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex gap-2 items-center text-blue-600">
                  {item.icon}
                  {item.label}
                </div>
                <Switch checked={item.state} onCheckedChange={item.set} />
              </div>
            ))}

            <Button onClick={resetAll} className="w-full bg-red-800 hover:bg-red-700 text-white border-amber-400 border-2">
              Reset Pengaturan
            </Button>
          </div>
        </div>
      )}
    </>
  );
}