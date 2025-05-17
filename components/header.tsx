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
              className:
                pathname.startsWith(item.link)
                  ? "font-semibold text-background bg-primary rounded-full px-4 py-2"
                  : "text-foreground/80 hover:text-foreground px-4 py-2",
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
              <Link href="/" className="font-serif text-2xl font-bold">DF</Link>
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
                className={`relative block ${
                  pathname.startsWith(item.link)
                    ? "font-semibold text-background bg-primary rounded-full px-4 py-2"
                    : "text-foreground/80 hover:text-foreground px-4 py-2"
                }`}
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
