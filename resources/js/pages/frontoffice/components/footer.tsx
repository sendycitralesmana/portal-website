import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MessageCircleIcon,
  TwitterIcon,
  YoutubeIcon,
  InfoIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SiTiktok } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

type FooterItem = {
  address: string;
  phone: string;
  hotline: string;
  whatsapp: string;
  email: string;
  faqs: string;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  youtube: string | null;
  tiktok: string | null;
};

const Footer = () => {
  const [data, setData] = useState<FooterItem | null>(null);

  useEffect(() => {
    fetch("/api/footer")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <footer className="w-full bg-gradient-to-b from-[#859ab8] to-[#000c73] text-white py-10 mt-5">
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Kolom 1: Logo dan Alamat */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo-lg.png"
              alt="Logo LPSK"
              className="w-[80px] h-[80px] object-contain"
            />
            <div>
              <h1 className="text-xl font-bold">LPSK</h1>
              <p className="text-base font-bold">
                Lembaga Perlindungan Saksi dan Korban
              </p>
            </div>
          </div>
          <p className="text-base mt-2">{data?.address}</p>
          <p className="text-base flex items-center gap-2">
            <FiPhone className="w-5 h-5" />
            <b>Telepon:</b> {data?.phone}
          </p>
        </div>

        {/* Kolom 2: WhatsApp, Email, Hotline */}
        <div className="grid grid-cols-2 gap-4 md:mt-24 place-items-center">
          {/* WhatsApp */}
          <div className="flex flex-col items-center text-center gap-1">
            <div className="flex items-center gap-2">
              <FaWhatsapp className="w-5 h-5" />
              <span className="text-base font-semibold">WhatsApp</span>
            </div>
            <span className="text-sm">{data?.whatsapp}</span>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center text-center gap-1">
            <div className="flex items-center gap-2">
              <MailIcon className="w-5 h-5" />
              <span className="text-base font-semibold">Email</span>
            </div>
            <span className="text-sm break-all">{data?.email}</span>
          </div>

          {/* Hotline */}
          {/* <div className="flex flex-col items-center text-center gap-1">
            <div className="flex items-center gap-2">
              <FiPhone className="w-5 h-5" />
              <span className="text-base font-semibold">Hotline</span>
            </div>
            <span className="text-sm">{data?.hotline}</span>
          </div> */}
        </div>

        {/* Kolom 3: Media Sosial dan Statistik */}
        <div className="flex flex-col gap-4 md:mt-10">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold text-base">Media Sosial</span>
            {data?.facebook && (
              <a href={data.facebook} target="_blank" rel="noopener noreferrer">
                <Avatar className="text-blue-900 bg-white dark:text-white">
                  <AvatarFallback>
                    <FacebookIcon className="w-6 h-6 dark:text-white" />
                  </AvatarFallback>
                </Avatar>
              </a>
            )}
            {data?.instagram && (
              <a href={data.instagram} target="_blank" rel="noopener noreferrer">
                <Avatar className="bg-white text-blue-900">
                  <AvatarFallback>
                    <FaInstagram  className="w-6 h-6 dark:text-white" />
                  </AvatarFallback>
                </Avatar>
              </a>
            )}
            {data?.twitter && (
              <a href={data.twitter} target="_blank" rel="noopener noreferrer">
                <Avatar className="bg-white text-blue-900">
                  <AvatarFallback>
                    <BsTwitterX className="w-6 h-6 dark:text-white" />
                  </AvatarFallback>
                </Avatar>
              </a>
            )}
            {data?.youtube && (
              <a href={data.youtube} target="_blank" rel="noopener noreferrer">
                <Avatar className="bg-white text-blue-900">
                  <AvatarFallback>
                    <FaYoutube  className="w-6 h-6 dark:text-white" />
                  </AvatarFallback>
                </Avatar>
              </a>
            )}
            {data?.tiktok && (
              <a href={data.tiktok} target="_blank" rel="noopener noreferrer">
                <Avatar className="bg-white text-blue-900">
                  <AvatarFallback>
                    {/* <span className="w-6 h-6  dark:text-white">TT</span> Optional: Ganti dengan ikon TikTok custom */}
                    <SiTiktok className="w-6 h-6 dark:text-white" />
                  </AvatarFallback>
                </Avatar>
              </a>
            )}
          </div>

          <p className="text-base leading-snug">
            Pengunjung hari ini: 1,359 | Kemarin: 9,571 | Minggu ini: 36,588<br />
            Bulan ini: 158,117 | Total: 5,226,379
          </p>
          <p className="text-base">
            © {new Date().getFullYear()} Lembaga Perlindungan Saksi dan Korban. All Rights Reserved.
          </p>
        </div>
      </section>
    </footer>
  );
};

export { Footer };
