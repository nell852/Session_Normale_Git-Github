import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, ShoppingCart, User, Menu, Sun, Moon, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/contexts/CartContext"
import { useTheme } from "@/contexts/ThemeContext"
import { useLanguage } from "@/contexts/LanguageContext"

export function Header() {
  const { state: cartState, toggleCart } = useCart()
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top bar with enhanced styling */}
        <div className="flex items-center justify-end py-2 text-sm border-b border-border/30">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 hover:bg-accent/50 transition-all duration-200 rounded-full border border-transparent hover:border-border/50"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="font-medium">{language.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="backdrop-blur-md bg-background/95 border-border/50">
                <DropdownMenuItem
                  onClick={() => setLanguage("fr")}
                  className="hover:bg-accent/50 transition-colors duration-200"
                >
                  🇫🇷 Français
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("en")}
                  className="hover:bg-accent/50 transition-colors duration-200"
                >
                  🇺🇸 English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-8 w-8 px-0 hover:bg-accent/50 transition-all duration-200 rounded-full border border-transparent hover:border-border/50 hover:rotate-12"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 transition-transform duration-200" />
              ) : (
                <Sun className="h-4 w-4 transition-transform duration-200" />
              )}
            </Button>
          </div>
        </div>

        {/* Main header with enhanced styling */}
        <div className="flex items-center justify-between py-6">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-brand-blue to-blue-600 text-white p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="font-bold text-xl">ST</span>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-brand-navy to-brand-blue bg-clip-text text-transparent group-hover:from-brand-blue group-hover:to-blue-600 transition-all duration-300">
              StyleThread
            </span>
          </Link>

          {/* Enhanced Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { to: "/", key: "nav.home" },
              { to: "/products", key: "nav.products" },
              { to: "/about", key: "nav.about" },
              { to: "/contact", key: "nav.contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-4 py-2 text-foreground hover:text-brand-blue transition-all duration-200 rounded-lg hover:bg-accent/30 font-medium relative group"
              >
                {t(item.key)}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-blue to-blue-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </nav>

          {/* Enhanced Search bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors duration-200 group-focus-within:text-brand-blue" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des produits..."
                className="pl-12 pr-4 w-full h-11 rounded-full border-2 border-border/50 bg-background/50 backdrop-blur-sm focus:border-brand-blue focus:bg-background transition-all duration-200 hover:border-border focus:shadow-lg focus:shadow-brand-blue/10"
              />
            </form>
          </div>

          {/* Enhanced Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile search with enhanced styling */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10 hover:bg-accent/50 transition-all duration-200 rounded-full hover:scale-105"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Enhanced Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative h-10 w-10 hover:bg-accent/50 transition-all duration-200 rounded-full hover:scale-105"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartState.itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 bg-gradient-to-r from-brand-blue to-blue-600 text-white font-bold text-xs shadow-lg animate-pulse">
                  {cartState.itemCount}
                </Badge>
              )}
            </Button>

            {/* Enhanced User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-accent/50 transition-all duration-200 rounded-full hover:scale-105"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="backdrop-blur-md bg-background/95 border-border/50 shadow-xl">
                <DropdownMenuItem className="hover:bg-accent/50 transition-colors duration-200">
                  <Link to="/login" className="w-full">
                    {t("nav.login")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent/50 transition-colors duration-200">
                  <Link to="/register" className="w-full">
                    {t("nav.register")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent/50 transition-colors duration-200">
                  <Link to="/account" className="w-full">
                    {t("nav.account")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Enhanced Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10 hover:bg-accent/50 transition-all duration-200 rounded-full hover:scale-105"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
