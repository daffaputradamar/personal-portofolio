import { Chevron, Connector, Figure } from './figure'

const services = [
  { runtime: 'Node.js', name: 'Service' },
  { runtime: '.NET', name: 'Service' },
  { runtime: 'Node.js', name: 'Service' }
]

const pipeline = ['Commit', 'Build', 'Image', 'Deploy']

/**
 * Fig. 02 — the Senior Developer years in one picture: a legacy monolith split
 * into containerised Node.js and .NET services that talk over Kafka and ship
 * through a CI/CD pipeline. Generic on purpose; the systems themselves are
 * internal.
 */
export function DecompositionFigure() {
  return (
    <Figure number='02' title='Monolith to services' note='Schematic'>
      <div className='grid items-stretch md:grid-cols-[minmax(0,0.75fr)_5.5rem_minmax(0,1.6fr)]'>
        {/* Before */}
        <div className='flex flex-col'>
          <span className='eyebrow text-foreground mb-3'>Before</span>
          <div className='border-foreground/40 bg-background flex grow flex-col border p-2'>
            {[0, 1, 2].map(i => (
              <span
                key={i}
                aria-hidden
                className='hatch border-foreground/20 h-6 border-b last:border-b-0 md:grow'
              />
            ))}
          </div>
          <p className='mt-2 text-sm font-medium'>Legacy monolith</p>
          <p className='text-muted-foreground font-mono text-[0.6875rem]'>
            One codebase · one deploy
          </p>
        </div>

        <Connector label='modularise' />

        {/* After */}
        <div>
          <span className='eyebrow text-foreground mb-3 block'>After</span>

          <ul className='grid grid-cols-3 gap-2'>
            {services.map((service, i) => (
              <li key={i} className='flex flex-col items-center'>
                <div className='border-line bg-background w-full border border-dashed p-1.5'>
                  <span className='eyebrow text-foreground/40 block text-[0.5625rem]'>
                    Docker
                  </span>
                  <div className='border-foreground/40 mt-1 border px-2 py-2'>
                    <p className='text-sm font-medium'>{service.runtime}</p>
                    <p className='text-muted-foreground font-mono text-[0.6875rem]'>
                      {service.name}
                    </p>
                  </div>
                </div>
                {/* Stub down to the event bus. */}
                <span
                  className='flow-y h-5'
                  style={
                    { '--flow-delay': `${i * 0.4}s` } as React.CSSProperties
                  }
                />
              </li>
            ))}
          </ul>

          {/* Event bus */}
          <div className='border-signal/50 bg-signal/[0.05] flex items-center justify-between border px-3 py-1.5'>
            <span className='text-sm font-medium'>Apache Kafka</span>
            <span className='eyebrow text-[0.625rem]'>Event bus</span>
          </div>

          {/* Delivery */}
          <div className='mt-5'>
            <span className='eyebrow text-foreground/45 text-[0.625rem]'>
              CI/CD
            </span>
            <ol className='mt-1.5 flex items-center'>
              {pipeline.map((step, i) => (
                <li key={step} className='flex grow items-center'>
                  <span className='border-line bg-background grow border px-2 py-1 text-center font-mono text-[0.6875rem]'>
                    {step}
                  </span>
                  {i < pipeline.length - 1 && (
                    <Chevron direction='right' className='mx-1' />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Figure>
  )
}
