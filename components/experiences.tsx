import { BackpackIcon } from "@radix-ui/react-icons"

export default function Experiences() {
    const experiences = [
        { 
          title: 'Senior IT Application Development Analyst',
          company: 'PT. Mitra Pinasthika Mulia',
          period: 'Jul 2021 - Present'
        },
        { 
          title: 'Freelance Web Developer',
          company: '-',
          period: 'Mar 2020 - Present'
        },
      ]

    return (
        <section id="experience" className="py-20 md:py-32">
            <div className="container px-4 md:px-6">
                <h2 className="title mb-12 text-center">Experience</h2>
                <div className="space-y-10 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-foreground/50 before:to-transparent">
                    {experiences.map((experience, index) => (
                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-foreground/10 bg-background group-[.is-active]:bg-background text-backvia-foreground/50 group-[.is-active]:text-foreground dark:group-[.is-active]:text-foreground/80 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <BackpackIcon className="w-5 h-5" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-background border border-input p-4 rounded shadow"> 
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-foreground">{experience.title}</div>
                                </div>
                                <div className="mb-4">
                                    <time className="font-caveat font-medium text-foreground/50">{experience.period}</time>
                                </div>
                                <div className="text-foreground/90 mb-2">{experience.company}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}