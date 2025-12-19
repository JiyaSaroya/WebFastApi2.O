import ProjectCard from '../cards/ProjectCard';
import { useApi } from '../../hooks/useApi';

const ProjectsSection = () => {
  const { data: projects, loading, error } = useApi('/api/projects');

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Our Projects
        </h2>

        {loading && <p className="text-center">Loading projects...</p>}
        {error && <p className="text-center text-red-500">Failed to load projects.</p>}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
