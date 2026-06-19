// import { Monitor, Moon, Sun } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { useTheme } from "@/components/theme-provider"

// export function ModeToggle() {
//   const { setTheme } = useTheme()

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-[color:var(--primary-navy)] dark:text-white" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-[color:var(--primary-navy)] dark:text-white" />
//           <span className="sr-only text-[color:var(--primary-navy)] dark:text-white">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="text-[color:var(--primary-navy)] dark:text-white font-semibold">
//         <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
//           <Sun className="w-4 h-4 mr-2" />
//           Terang
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
//           <Moon className="w-4 h-4 mr-2" />
//           Gelap
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
//           <Monitor className="w-4 h-4 mr-2" />
//           Sistem
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

import { Monitor, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

interface ModeToggleProps {
  transparent?: boolean
}

export function ModeToggle({ transparent = false }: ModeToggleProps) {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "transition-all duration-300",
            transparent
              ? "bg-white/10 border-white/20 text-slate-200 backdrop-blur-md hover:bg-white/20"
              : ""
          )}
        >
          <Sun
            className={cn(
              "h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90",
              transparent
                ? "text-slate-200"
                : "text-[color:var(--primary-navy)] dark:text-white"
            )}
          />

          <Moon
            className={cn(
              "absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0",
              transparent
                ? "text-slate-200"
                : "text-[color:var(--primary-navy)] dark:text-white"
            )}
          />

          <span className="sr-only">
            Toggle theme
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="text-[color:var(--primary-navy)] dark:text-white font-semibold"
      >
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
          <Sun className="w-4 h-4 mr-2" />
          Terang
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
          <Moon className="w-4 h-4 mr-2" />
          Gelap
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
          <Monitor className="w-4 h-4 mr-2" />
          Sistem
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}