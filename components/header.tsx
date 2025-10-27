import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="max-w-[1060px] mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center gap-2">
              <Image src="/codemypixel-logo.png" alt="CodeMyPixel" width={32} height={32} className="w-8 h-8" />
              <div className="text-foreground font-semibold text-lg">CodeMyPixel</div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-foreground hover:text-foreground/80 text-sm font-medium">Products</button>
              <button className="text-foreground hover:text-foreground/80 text-sm font-medium">Pricing</button>
              <button className="text-foreground hover:text-foreground/80 text-sm font-medium">Docs</button>
            </div>
          </div>
          <Button variant="ghost" className="text-foreground hover:bg-foreground/5">
            Log in
          </Button>
        </nav>
      </div>
    </header>
  )
}
