interface ShortcutItem {
  title: string
  image: string
  link: string
}

const shortcuts: ShortcutItem[] = [
  {
    title: "FONDASI",
    image: "/images/aplikasi/fondasi.png",
    link: "https://limo.lpsk.go.id/apps/forms/s/oj7jdZAwAZ3z89aHCrdZNsEt",
  },
  {
    title: "SSK",
    image: "/images/aplikasi/ssk.jpg",
    link: "https://ssk.lpsk.go.id/",
  },
  {
    title: "OPERA",
    image: "/images/aplikasi/opera.webp",
    link: "https://hukum.lpsk.go.id/",
  },
  {
    title: "EMP",
    image: "/images/aplikasi/bareskrim.webp",
    link: "https://robinops.bareskrim.polri.go.id/Account/Login?ReturnUrl=%2F",
  },
  {
    title: "KEJAKSAAN RI",
    image: "/images/aplikasi/kejaksaan-ri.webp",
    link: "https://cms-publik.kejaksaan.go.id/",
  },
  {
    title: "E-MINDIK BNN",
    image: "/images/aplikasi/bnn.webp",
    link: "https://mindik.bnn.go.id/",
  },
  {
    title: "SDP KEMENKUMHAM",
    image: "/images/aplikasi/kemenkumham.webp",
    link: "https://kemenkum.go.id/",
  },
  {
    title: "KPK",
    image: "/images/aplikasi/kpk.jpg",
    link: "https://kpk.go.id/",
  },
]

export default function AplikasiSection() {
  return (
    <section id="tautan" className="w-full px-4 xl:px-20 py-8 md:py-10">
      <div className="container mx-auto">

        <h3 className="text-xl sm:text-2xl font-bold mb-4">
          Aplikasi LPSK
        </h3>

        <div className="w-20 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mb-4"></div>

        <div className="
          grid grid-cols-2 xl:grid-cols-4
          border border-gray-300
          divide-x divide-y divide-gray-300
        ">

          {/* {shortcuts.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex flex-col items-center justify-center
                text-center
                p-4 sm:p-5 md:p-6
                hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 transition-all duration-300
              "
            >
              <img
                src={item.image}
                alt={item.title}
                className="
                  h-12 sm:h-16 md:h-18 xl:h-20
                  object-contain
                  mb-2 sm:mb-3
                "
              />

              <span className="
                text-xs sm:text-sm md:text-base
                font-medium
                leading-snug
                text-white
              ">
                {item.title}
              </span>
            </a>
          ))} */}
          
          {shortcuts.map((item, index) => (
  <a
    key={index}
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="
      relative w-full
      aspect-square
      rounded-lg
      overflow-hidden
      group
    "
  >
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${item.image})`,
      }}
    ></div>

    {/* Overlay */}
    <div className="
      absolute inset-0 
      bg-gradient-to-t from-black/40 via-black/10 to-transparent
      group-hover:from-black/20 transition
    "></div>

    {/* Text */}
    <div className="absolute bottom-0 left-0 p-3 z-10">
      <span
        className="
          text-white
          text-xs sm:text-sm md:text-base
          font-semibold
          leading-snug
        "
      >
        {item.title}
      </span>
    </div>
  </a>
))}

        </div>

      </div>
    </section>
  )
}