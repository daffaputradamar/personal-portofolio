import { SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiPrisma, SiPostgresql, SiFirebase, SiDrizzle, SiDotnet } from 'react-icons/si';

export default function TechStack() {
    const techStack = [
        { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" size={20} /> },
        { name: 'React', icon: <SiReact className="text-cyan-400" size={20} /> },
        { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white" size={20} /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-sky-400" size={20} /> },
        { name: 'Node.js', icon: <SiNodedotjs className="text-green-600" size={20} /> },
        { name: '.NET', icon: <SiDotnet className='text-indigo-500' size={20}/> },
        { name: 'Drizzle', icon: <SiDrizzle className="text-lime-500" size={20} /> },
        { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-800" size={20} /> },
        { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" size={20} /> },
    ];
    return (
        <div className="md:pt-6 pb-24">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <span>Tech Stack</span>
            <span className="text-xl">🚀</span>
          </h2>
          <ul className="flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
                <li key={index} className="group relative">
                <div className='bg-card border rounded-lg p-4 h-full flex items-center justify-center text-center transition-all duration-300 group-hover:shadow-md group-hover:scale-105 group-hover:bg-primary/5 gap-2'>
                    {tech.icon}
                    <span className="text-sm font-medium">{tech.name}</span>
                </div>
                </li>
            ))}
          </ul>
        </div>
    )
}