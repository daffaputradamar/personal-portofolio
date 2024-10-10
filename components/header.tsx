'use client';
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { headers } from 'next/headers';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Header() {
  const pathname = usePathname();
  const [indicatorStyles, setIndicatorStyles] = useState({ width: 0, left: 0 }); // Track position and size for background animation
  const navRef = useRef<HTMLUListElement>(null); // Reference for the nav container

  useEffect(() => {
    const currentLink = navRef.current?.querySelector(`a[href="${pathname}"]`)?.parentNode;
    if (currentLink && navRef.current) {
      const linkRect = (currentLink as HTMLElement).getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      const left = linkRect.left - navRect.left; // Calculate position relative to nav
      setIndicatorStyles({ width: linkRect.width, left });
    }
  }, [pathname]);


  const isActive = (path: string) => pathname.startsWith(path) ? 'font-semibold text-background' : 'text-foreground/80 hover:text-foreground';

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm'>
      <nav className='container flex max-w-3xl gap-5 items-center justify-between'>
        <div>
          <Link href='/' className='font-serif text-2xl font-bold'>
            DF
          </Link>
        </div>
        <div className='relative'>
          <ul ref={navRef} className='flex items-center bg-foreground/10 border border-muted rounded-full text-sm'>
            <li className={cn('transition-all duration-300 px-4 md:px-6 py-2 z-10', isActive('/posts'))}>
              <Link href='/posts'>Posts</Link>
            </li>
            <li className={cn('transition-all duration-300 px-4 md:px-6 py-2 z-10', isActive('/projects'))}>
              <Link href='/projects'>Projects</Link>
            </li>
            <li className={cn('transition-all duration-300 px-4 md:px-6 py-2 z-10', isActive('/contact'))}>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
          {
            pathname !== '/' &&
            <span
               className="absolute top-[3px] h-[calc(100%-6px)] bg-foreground/80 transition-all duration-300 rounded-full ease-out"
              style={{
                width: `${indicatorStyles.width - 3}px`,
                left: `${indicatorStyles.left + 1.5}px`,
              }}
            />
          }
        </div>

        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
