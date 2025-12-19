const ClientCard = ({ client }) => (
  <div className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
      <img 
        src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${client.image}`} 
        alt={client.name} 
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{client.name}</h3>
    <p className="text-blue-600 font-semibold text-lg mb-3">{client.designation}</p>
    <p className="text-gray-600 leading-relaxed">{client.desc}</p>
  </div>
);

export default ClientCard;
