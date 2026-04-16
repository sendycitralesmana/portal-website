interface ShortcutItem {
    title: string;
    image: string;
    link: string;
}

const shortcuts: ShortcutItem[] = [
    {
        title: 'FONDASI',
        image: '/images/aplikasi/fondasi.png',
        link: 'https://limo.lpsk.go.id/apps/forms/s/oj7jdZAwAZ3z89aHCrdZNsEt',
    },
    {
        title: 'SSK',
        image: '/images/aplikasi/ssk.jpg',
        link: 'https://ssk.lpsk.go.id/',
    },
    {
        title: 'OPERA',
        image: '/images/aplikasi/opera.webp',
        link: 'https://hukum.lpsk.go.id/',
    },
    {
        title: 'EMP',
        image: '/images/aplikasi/bareskrim.webp',
        link: 'https://robinops.bareskrim.polri.go.id/Account/Login?ReturnUrl=%2F',
    },
    {
        title: 'KEJAKSAAN RI',
        image: '/images/aplikasi/kejaksaan-ri.webp',
        link: 'https://cms-publik.kejaksaan.go.id/',
    },
    {
        title: 'E-MINDIK BNN',
        image: '/images/aplikasi/bnn.webp',
        link: 'https://mindik.bnn.go.id/',
    },
    {
        title: 'SDP KEMENKUMHAM',
        image: '/images/aplikasi/kemenkumham.webp',
        link: 'https://kemenkum.go.id/',
    },
    {
        title: 'KPK',
        image: '/images/aplikasi/kpk.jpg',
        link: 'https://kpk.go.id/',
    },
];

export default function AplikasiSection() {
    return (
        <section id="tautan" className="w-full px-4 py-10 md:py-12 xl:px-20">
            <div className="container mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">Aplikasi LPSK</p>
                    <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-amber-700 to-amber-400"></div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                    {shortcuts.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url(${item.image})`,
                                    }}
                                />
                            </div>

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>

                            {/* Content */}
                            <div className="absolute right-0 bottom-0 left-0 z-10 p-3">
                                <span className="block text-xs leading-snug font-semibold text-white drop-shadow-sm sm:text-sm md:text-base">
                                    {item.title}
                                </span>
                            </div>

                            {/* Hover indicator */}
                            <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 group-hover:border-amber-400"></div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
