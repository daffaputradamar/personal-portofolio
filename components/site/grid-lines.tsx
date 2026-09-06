/**
 * Vertical hairlines on the layout columns. Pure structure: it gives the hero
 * something to sit on so the large type does not float in empty space.
 */
export function GridLines() {
  return (
    <div
      aria-hidden
      className='pointer-events-none absolute inset-0 hidden md:block'
    >
      <div className='container relative h-full'>
        <div className='absolute inset-y-0 left-6 w-px bg-line/70 md:left-12 xl:left-18' />
        <div className='absolute inset-y-0 right-6 w-px bg-line/70 md:right-12 xl:right-18' />
        <div className='absolute inset-y-0 left-1/4 w-px bg-line/40' />
        <div className='absolute inset-y-0 left-1/2 w-px bg-line/40' />
        <div className='absolute inset-y-0 left-3/4 w-px bg-line/40' />
      </div>
    </div>
  )
}
