const ProjectCard = ({ project }) => (
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    <img 
      src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${project.image}`} 
      alt={project.name} 
      className="w-full h-64 object-cover"
    />
    <div className="p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{project.name}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{project.desc}</p>
      <button className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-full font-semibold transition duration-200">
        Read More →
      </button>
    </div>
  </div>
);

export default ProjectCard;
