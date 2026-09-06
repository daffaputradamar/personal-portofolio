import Link from 'next/link'

export default function NotFound() {
  return (
    <section className='flex min-h-[70svh] items-center'>
      <div className='container'>
        <p className='eyebrow'>Error 404</p>

        <h1 className='display mt-6 text-display'>Page not found.</h1>

        <p className='mt-6 max-w-md text-base leading-relaxed text-muted-foreground'>
          The link may be out of date, or the page may have moved.
        </p>

        <div className='mt-10 flex flex-wrap gap-3'>
          <Link
            href='/'
            className='group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground'
          >
            <svg
              aria-hidden
              viewBox='0 0 24 24'
              className='h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.75'
            >
              <path d='M19 12H5M11 6l-6 6 6 6' strokeLinecap='round' />
            </svg>
            Back home
          </Link>

          <Link
            href='/projects'
            className='inline-flex items-center rounded-full border border-line px-6 py-3.5 text-sm transition-colors hover:border-foreground/40 hover:bg-foreground/5'
          >
            View projects
          </Link>
        </div>
      </div>
    </section>
  )
}
