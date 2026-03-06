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
      <div className="fixed top-1/2 left-9 -translate-y-1/2 z-50">
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
      </div>

      {/* Floating Button */}
      <div className="fixed top-1/2 right-2 -translate-y-1/2 z-50">
        <button
          onClick={() => setShowPanel(true)}
          className="bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center 
          hover:bg-red-800 transition cursor-pointer border-amber-400 border-2"
        >
          <Accessibility className="w-6 h-6" />
        </button>
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