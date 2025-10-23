import { SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiVuedotjs, SiAngular, SiNodedotjs, SiPrisma, SiPostgresql, SiFirebase, SiDrizzle, SiDotnet, SiApachekafka, SiDocker, SiLaravel, SiGithubcopilot, SiGooglegemini, SiOllama } from 'react-icons/si';
import { FaProjectDiagram } from 'react-icons/fa';

const cardClassName = 'inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-medium transition-colors duration-200 group-hover:border-primary/50 group-hover:bg-primary/10';
const iconSize = 18;

export default function TechStack() {
  const techCategories = [
    {
      title: 'Frontend',
      items: [
        { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" size={iconSize} /> },
        { name: 'React', icon: <SiReact className="text-cyan-400" size={iconSize} /> },
        { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white" size={iconSize} /> },
    { name: 'Vue.js', icon: <SiVuedotjs className="text-emerald-500" size={iconSize} /> },
  { name: 'Angular', icon: <SiAngular className="text-red-500" size={iconSize} /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-sky-400" size={iconSize} /> },
      ],
    },
    {
      title: 'Backend & Architecture',
      items: [
        { name: 'Node.js', icon: <SiNodedotjs className="text-green-600" size={iconSize} /> },
        { name: '.NET', icon: <SiDotnet className="text-indigo-500" size={iconSize} /> },
        { name: 'Laravel', icon: <SiLaravel className="text-red-600" size={iconSize} /> },
        { name: 'Microservices', icon: <FaProjectDiagram className="text-amber-500" size={iconSize} /> },
      ],
    },
    {
      title: 'Data & Messaging',
      items: [
        { name: 'Prisma', icon: <SiPrisma className="text-slate-600 dark:text-slate-300" size={iconSize} /> },
        { name: 'Drizzle', icon: <SiDrizzle className="text-lime-500" size={iconSize} /> },
        { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-800" size={iconSize} /> },
        { name: 'Apache Kafka', icon: <SiApachekafka className="text-black dark:text-white" size={iconSize} /> },
      ],
    },
    {
      title: 'Cloud & Infrastructure',
      items: [
        { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" size={iconSize} /> },
        { name: 'Docker', icon: <SiDocker className="text-sky-500" size={iconSize} /> },
      ],
    },
    {
      title: 'AI & Developer Tools',
      items: [
        { name: 'GitHub Copilot', icon: <SiGithubcopilot className="text-emerald-500" size={iconSize} /> },
        { name: 'Google Gemini', icon: <SiGooglegemini className="text-blue-500" size={iconSize} /> },
        { name: 'Ollama', icon: <SiOllama className="text-slate-500" size={iconSize} /> },
      ],
    },
  ];

  return (
    <div className="md:pt-6 pb-24">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <span>Tech Stack</span>
        <span className="text-xl">🚀</span>
      </h2>
      <div className="grid gap-5 md:grid-cols-2">
        {techCategories.map((category) => (
          <section key={category.title} className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {category.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {category.items.map((tech) => (
                <li key={tech.name} className="group relative">
                  <div className={cardClassName}>
                    {tech.icon}
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}