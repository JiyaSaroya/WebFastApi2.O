// src/components/landing/ClientsManager.jsx
import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import apiClient from '../../services/api';

const ClientsManager = () => {
  const { data: clients, loading, error } = useApi('/api/clients');

  const [form, setForm] = useState({
    name: '',
    designation: '',
    desc: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('designation', form.designation);
    fd.append('desc', form.desc);
    if (form.image) fd.append('image', form.image);

    try {
      await apiClient.post('/api/clients', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Client added successfully');
      setForm({ name: '', designation: '', desc: '', image: null });
      window.location.reload(); // simple refresh to re-fetch list
    } catch (err) {
      console.error(err);
      alert('Error adding client');
    }
  };

  return (
    <div className="space-y-10">
      {/* Add Client Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl"
      >
        <h2 className="text-3xl font-bold mb-8">Add New Client</h2>
        <div className="space-y-6">
          <input
            name="name"
            type="text"
            placeholder="Client Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="designation"
            type="text"
            placeholder="Designation (CEO, Developer, Designer, etc.)"
            value={form.designation}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="desc"
            rows="3"
            placeholder="Client Description"
            value={form.desc}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-green-700 transition duration-200"
          >
            Add Client
          </button>
        </div>
      </form>

      {/* Existing Clients List */}
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          Existing Clients {clients ? `(${clients.length})` : ''}
        </h2>

        {loading && <p>Loading clients...</p>}
        {error && <p className="text-red-500">Failed to load clients.</p>}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients?.map((client) => (
              <div
                key={client.name}
                className="bg-gray-50 rounded-2xl p-6 text-center shadow hover:shadow-lg transition"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${client.image}`}
                  alt={client.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover shadow"
                />
                <h3 className="text-lg font-bold mb-1">{client.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">
                  {client.designation}
                </p>
                <p className="text-gray-600 text-sm">{client.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsManager;
