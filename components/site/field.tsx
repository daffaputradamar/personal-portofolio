import type { ReactNode } from 'react'

/**
 * One row of a spec table: name, dotted leader, value.
 *
 * The leader is a real element at an explicit `col-start`, not a `::before` —
 * auto-placement around a pseudo-element makes the column order depend on box
 * order, which is exactly the kind of thing that silently reflows later.
 */
export function Field({
  label,
  children
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className='border-line grid grid-cols-[minmax(5.5rem,auto)_1fr_auto] items-baseline gap-2.5 border-b py-2.5'>
      <dt className='eyebrow col-start-1'>{label}</dt>
      <span
        aria-hidden
        className='border-line col-start-2 mb-[0.34em] border-b border-dotted'
      />
      <dd className='col-start-3 text-sm'>{children}</dd>
    </div>
  )
}
