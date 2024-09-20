'use client';
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { headers } from 'next/headers';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path) ? 'font-semibold bg-muted/80 rounded-full' : 'hover:text-foreground';

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm'>
      <nav className='container flex max-w-3xl gap-5 items-center justify-between'>
        <div>
          <Link href='/' className='font-serif text-2xl font-bold'>
            DF
          </Link>
        </div>
        <ul className='flex items-center bg-muted/40 border border-muted rounded-full text-sm'>
          <li className={cn('transition-all px-4 md:px-6 py-2',isActive('/posts'))}>
            <Link href='/posts'>Posts</Link>
          </li>
          <li className={cn('transition-all px-4 md:px-6 py-2',isActive('/projects'))}>
            <Link href='/projects'>Projects</Link>
          </li>
          <li className={cn('transition-all px-4 md:px-6 py-2',isActive('/contact'))}>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>

        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
