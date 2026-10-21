/**
 * Renders a JSON-LD block. `<` is escaped so a string in the data can never
 * close the script tag early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\u003c')
      }}
    />
  )
}
