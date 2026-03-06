interface ShortcutItem {
  title: string
  image: string
  link: string
}

const shortcuts: ShortcutItem[] = [
  {
    title: "Whistleblowing System",
    image: "https://www.ojk.go.id/id/Tautan%20Pintas/Homepage%20OJK%20-%20rev-31.png",
    link: "https://wbs.ojk.go.id/",
  },
  {
    title: "Investor Relations Unit",
    image: "https://www.ojk.go.id/id/Tautan%20Pintas/Homepage%20IRU.png",
    link: "https://iru.ojk.go.id/iru/",
  },
  {
    title: "SUCH",
    image: "https://www.ojk.go.id/id/Tautan%20Pintas/Homepage%20SLIK.png",
    link: "https://www.ojk.go.id/id/kanal/perbankan/Pages/Sistem-Layanan-Informasi-Keuangan-SLIK.aspx",
  },
  {
    title: "Consumer Protection Portal Application",
    image: "https://www.ojk.go.id/id/Tautan%20Pintas/Homepage%20APPK.png",
    link: "https://kontak157.ojk.go.id/appkpublicportal/",
  },
  {
    title: "Sustainable Finance",
    image: "https://www.ojk.go.id/id/Tautan%20Pintas/Logo%20Sustainable%20Finance-012.png",
    link: "https://keuanganberkelanjutan.ojk.go.id/keuanganberkelanjutan/",
  },
  {
    title: "e-PPID",
    image: "https://www.ojk.go.id/id/Tautan%20Pintas/Homepage%20eppid.png",
    link: "https://e-ppid.ojk.go.id/e-ppid/",
  },
  {
    title: "OJK Institute",
    image: "https://www.ojk.go.id/id/Tautan%20Pintas/Homepage%20OJKI.png",
    link: "https://institute.ojk.go.id/ojk-institute",
  },
  {
    title: "Indonesia Anti-Scam Centre",
    image: "https://www.ojk.go.id/id/Tautan%20Pintas/logo%20pusaka-01.png",
    link: "https://iasc.ojk.go.id/",
  },
  {
    title: "Learning Management System",
    image: "https://www.ojk.go.id/id/Tautan%20Pintas/Homepage%20LMS.png",
    link: "https://lmsku.ojk.go.id/Login",
  },
  {
    title: "Regional OJK",
    image: "https://www.ojk.go.id/id/Tautan%20Pintas/Homepage%20OJK%20Daerah.png",
    link: "https://www.ojk.go.id/id/Publikasi/OJK-Daerah/Default.aspx",
  },
]

export default function ShortcutLinks() {
  return (
    <section id="tautan" className="w-full px-4 xl:px-20 py-8 md:py-10">
      <div className="container mx-auto">

        <h3 className="text-blue-900 text-xl sm:text-2xl font-bold mb-4 md:mb-6">
          Shortcut Link
        </h3>

        <div className="
          grid grid-cols-2 xl:grid-cols-5
          border border-gray-300
          divide-x divide-y divide-gray-300
        ">

          {shortcuts.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex flex-col items-center justify-center
                text-center
                p-4 sm:p-5 md:p-6
                hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-600 transition-all duration-300
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
              ">
                {item.title}
              </span>
            </a>
          ))}

        </div>

      </div>
    </section>
  )
}