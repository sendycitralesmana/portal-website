// import { X, ZoomIn, ZoomOut } from 'lucide-react';
// import { useState } from 'react';
// import type { Swiper as SwiperType } from 'swiper';
// import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';

// interface ImageItem {
//     id: number;
//     src: string;
//     title: string;
//     description: string;
// }

// const images: ImageItem[] = [
//     {
//         id: 1,
//         src: 'https://picsum.photos/id/1015/1600/900',
//         title: 'Foto 1',
//         description:
//             'Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme. Momen ini menggambarkan partisipasi aktif para peserta serta sinergi yang terjalin antar pihak dalam mendukung terlaksananya program secara optimal dan berkelanjutan. Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme. Momen ini menggambarkan partisipasi aktif para peserta serta sinergi yang terjalin antar pihak dalam mendukung terlaksananya program secara optimal dan berkelanjutan. Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme. Momen ini menggambarkan partisipasi aktif para peserta serta sinergi yang terjalin antar pihak dalam mendukung terlaksananya program secara optimal dan berkelanjutan. Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme. Momen ini menggambarkan partisipasi aktif para peserta serta sinergi yang terjalin antar pihak dalam mendukung terlaksananya program secara optimal dan berkelanjutan.',
//     },
//     {
//         id: 2,
//         src: 'https://picsum.photos/id/1016/1600/900',
//         title: 'Foto 2',
//         description:
//             'Suasana interaksi dan diskusi yang berlangsung secara produktif, mencerminkan komitmen bersama dalam memperkuat koordinasi serta meningkatkan kualitas pelaksanaan tugas dan fungsi kelembagaan. Kegiatan ini menjadi bagian dari upaya berkelanjutan dalam mendorong profesionalisme.',
//     },
//     {
//         id: 3,
//         src: 'https://picsum.photos/id/1018/1600/900',
//         title: 'Foto 3',
//         description:
//             'Potret situasi lapangan yang memperlihatkan implementasi program secara langsung. Dokumentasi ini menjadi representasi nyata dari kerja kolaboratif, perencanaan yang matang, serta dedikasi dalam memberikan pelayanan yang maksimal dan berorientasi pada hasil.',
//     },
//     {
//         id: 4,
//         src: 'https://picsum.photos/id/1015/1600/900',
//         title: 'Foto 4',
//         description:
//             'Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme. Momen ini menggambarkan partisipasi aktif para peserta serta sinergi yang terjalin antar pihak dalam mendukung terlaksananya program secara optimal dan berkelanjutan. Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme. Momen ini menggambarkan partisipasi aktif para peserta serta sinergi yang terjalin antar pihak dalam mendukung terlaksananya program secara optimal dan berkelanjutan. Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme. Momen ini menggambarkan partisipasi aktif para peserta serta sinergi yang terjalin antar pihak dalam mendukung terlaksananya program secara optimal dan berkelanjutan. Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme. Momen ini menggambarkan partisipasi aktif para peserta serta sinergi yang terjalin antar pihak dalam mendukung terlaksananya program secara optimal dan berkelanjutan.',
//     },
//     {
//         id: 5,
//         src: 'https://picsum.photos/id/1016/1600/900',
//         title: 'Foto 5',
//         description:
//             'Suasana interaksi dan diskusi yang berlangsung secara produktif, mencerminkan komitmen bersama dalam memperkuat koordinasi serta meningkatkan kualitas pelaksanaan tugas dan fungsi kelembagaan. Kegiatan ini menjadi bagian dari upaya berkelanjutan dalam mendorong profesionalisme.',
//     },
//     {
//         id: 6,
//         src: 'https://picsum.photos/id/1018/1600/900',
//         title: 'Foto 6',
//         description:
//             'Potret situasi lapangan yang memperlihatkan implementasi program secara langsung. Dokumentasi ini menjadi representasi nyata dari kerja kolaboratif, perencanaan yang matang, serta dedikasi dalam memberikan pelayanan yang maksimal dan berorientasi pada hasil.',
//     },
// ];

// export default function Galeri() {
//     const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [zoom, setZoom] = useState(1);

//     return (
//         <div className="fixed inset-0 z-50 flex flex-col bg-black text-white">
//             {/* ================= HEADER ================= */}
//             <div className="flex w-full items-center justify-between border-b border-white/10 px-8 py-4">
//                 <div className="text-sm font-medium">
//                     {activeIndex + 1} / {images.length}
//                 </div>

//                 <div className="flex items-center gap-4">
//                     <button onClick={() => setZoom((z) => z + 0.2)} className="transition hover:opacity-70">
//                         <ZoomIn size={20} />
//                     </button>

//                     <button onClick={() => setZoom((z) => Math.max(1, z - 0.2))} className="transition hover:opacity-70">
//                         <ZoomOut size={20} />
//                     </button>

//                     <button className="transition hover:opacity-70">
//                         <X size={22} />
//                     </button>
//                 </div>
//             </div>

//             {/* ================= MAIN IMAGE ================= */}
//             <div className="flex flex-1 items-center justify-center px-6 md:px-10">
//                 <Swiper
//                     modules={[Thumbs, Navigation]}
//                     navigation
//                     spaceBetween={10}
//                     onSlideChange={(swiper) => {
//                         setActiveIndex(swiper.activeIndex);
//                         setZoom(1);
//                     }}
//                     thumbs={{
//                         swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
//                     }}
//                     className="h-full w-full"
//                 >
//                     {images.map((img) => (
//                         <SwiperSlide key={img.id}>
//                             <div className="flex h-full flex-col items-center justify-center">
//                                 {/* IMAGE */}
//                                 <div className="flex w-full flex-1 items-center justify-center">
//                                     <div className="overflow-hidden rounded-xl">
//                                         <img
//                                             src={img.src}
//                                             alt={img.title}
//                                             onWheel={(e) => {
//                                                 e.stopPropagation();
//                                                 if (e.deltaY < 0) {
//                                                     setZoom((z) => z + 0.2);
//                                                 } else {
//                                                     setZoom((z) => Math.max(1, z - 0.2));
//                                                 }
//                                             }}
//                                             style={{ transform: `scale(${zoom})` }}
//                                             className="max-h-[60vh] w-auto object-contain shadow-2xl transition duration-300"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* CAPTION */}
//                                 <div className="flex w-full justify-center px-6 pb-6">
//                                     <div className="max-w-7xl text-center">
//                                         <h3 className="text-lg font-semibold tracking-wide">{img.title}</h3>
//                                         <p className="mt-2 text-sm leading-relaxed text-white/70">{img.description}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>

//             {/* ================= THUMBNAILS ================= */}
//             <div className="mt-4 flex w-full justify-center px-4 pb-8 sm:px-8">
//                 <div className="w-full max-w-3xl">
//                     <Swiper
//                         onSwiper={setThumbsSwiper}
//                         modules={[FreeMode, Thumbs]}
//                         spaceBetween={0}
//                         slidesPerView={4}
//                         breakpoints={{
//                             640: { slidesPerView: 5 },
//                             1024: { slidesPerView: 6 },
//                         }}
//                         freeMode
//                         watchSlidesProgress
//                         slideToClickedSlide
//                         className="w-full"
//                     >
//                         {images.map((img, index) => (
//                             <SwiperSlide key={img.id} className="flex cursor-pointer justify-center">
//                                 <div
//                                     className={`aspect-square w-16 overflow-hidden rounded-md border-2 transition sm:w-20 ${
//                                         activeIndex === index ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'
//                                     }`}
//                                 >
//                                     <img src={img.src} alt={img.title} className="h-full w-full object-cover" />
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>
//             </div>
//         </div>
//     );
// }
