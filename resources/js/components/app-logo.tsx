// import AppLogoIcon from './app-logo-icon';

// export default function AppLogo() {
//     return (
//         <>
//             <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
//                 <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
//             </div>
//             <div className="ml-1 grid flex-1 text-left text-sm">
//                 <span className="mb-0.5 truncate leading-none font-semibold">LPSK</span>
//             </div>
//         </>
//     );
// }

export default function AppLogo() {
    return (
        <div className="w-full h-24 flex items-center justify-start overflow-hidden">
            <img
                src="/images/logo-lpsk.png"
                alt="LPSK Logo"
                className="h-12 w-auto object-contain"
            />
        </div>
    );
}

