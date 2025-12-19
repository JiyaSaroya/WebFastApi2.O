import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import apiClient from '../services/api';
import Navbar from '../components/common/Navbar';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    designation: '',
  });

  const { data: projects } = useApi('/api/projects');
  const { data: clients } = useApi('/api/clients');
  const { data: contacts } = useApi('/api/contacts');
  const { data: newsletters } = useApi('/api/newsletters');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData(e.target);
    
    try {
      if (activeTab === 'projects') {
        await apiClient.post('/api/projects', formDataToSend);
      } else if (activeTab === 'clients') {
        await apiClient.post('/api/clients', formDataToSend);
      }
      alert('Added successfully!');
      e.target.reset();
      // Refresh data
      window.location.reload();
    } catch (error) {
      alert('Error adding item');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 bg-white p-2 rounded-xl shadow-lg">
          {['projects', 'clients', 'contacts', 'newsletters'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold mb-8">Add New Project</h2>
              <div className="space-y-6">
                <input name="name" placeholder="Project Name" className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" required />
                <textarea name="desc" placeholder="Project Description" rows="4" className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" required />
                <input type="file" name="image" accept="image/*" className="w-full p-4 border border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
                <button type="submit" className="w-full bg-green-600 text-white py-4 px-8 rounded-xl font-bold text-xl hover:bg-green-700 transition duration-200">
                  Add Project
                </button>
              </div>
            </form>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project) => (
                <div key={project.name} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${project.image}`} className="w-full h-48 object-cover rounded-xl mb-4" />
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-600">{project.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold mb-8">Add New Client</h2>
              <div className="space-y-6">
                <input name="name" placeholder="Client Name" className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" required />
                <input name="designation" placeholder="Designation (CEO, Developer, etc.)" className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" required />
                <textarea name="desc" placeholder="Client Description" rows="3" className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" required />
                <input type="file" name="image" accept="image/*" className="w-full p-4 border border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
                <button type="submit" className="w-full bg-green-600 text-white py-4 px-8 rounded-xl font-bold text-xl hover:bg-green-700 transition duration-200">
                  Add Client
                </button>
              </div>
            </form>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients?.map((client) => (
                <div key={client.name} className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all">
                  <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${client.image}`} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover shadow-lg" />
                  <h3 className="text-xl font-bold mb-2">{client.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{client.designation}</p>
                  <p className="text-gray-600 text-sm">{client.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-3xl font-bold">Contact Submissions ({contacts?.length || 0})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Mobile</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">City</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contacts?.map((contact, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{contact.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{contact.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{contact.mobile}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{contact.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Newsletters Tab */}
        {activeTab === 'newsletters' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-3xl font-bold">Newsletter Subscribers ({newsletters?.length || 0})</h2>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {newsletters?.map((subscriber, index) => (
                  <li key={index} className="px-8 py-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-900">{subscriber.email}</span>
                      <span className="text-sm text-gray-500">#{newsletters.length - index}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
