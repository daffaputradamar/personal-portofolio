'use client';
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { usePathname } from 'next/navigation';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Header() {
  const pathname = usePathname();
  const navItems = [
    { name: "Posts", link: "/posts" },
    { name: "Projects", link: "/projects" },
    { name: "Contact", link: "/contact" },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const getNavClassName = (link: string) => {
    const isActive = link === "/" ? pathname === link : pathname.startsWith(link);
    const baseClass = "relative flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 md:inline-flex md:w-auto";
    const activeClass = "text-background bg-primary/90 shadow-lg shadow-primary/30 after:absolute after:inset-x-2 after:-bottom-1 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-primary/80 after:via-primary/60 after:to-primary/80";
    const inactiveClass = "text-foreground/80 hover:text-foreground hover:bg-foreground/10";

    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex items-center gap-2">
            <NavbarLogo />
          </div>
          <NavItems
            items={navItems.map((item) => ({
              ...item,
              className: getNavClassName(item.link),
            }))}
          />
          <div className="flex items-center gap-4 z-50">
            <ThemeToggle />
          </div>
        </NavBody>
        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <div className="flex items-center gap-2">
              <NavbarLogo />
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={getNavClassName(item.link)}
                aria-current={pathname.startsWith(item.link) ? "page" : undefined}
              >
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <ThemeToggle />
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
