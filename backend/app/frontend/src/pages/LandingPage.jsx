import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import ProjectCard from '../components/cards/ProjectCard';
import ClientCard from '../components/cards/ClientCard';
import Navbar from '../components/common/Navbar';
import apiClient from '../services/api';

const LandingPage = () => {
  const { data: projects, loading: projectsLoading } = useApi('/api/projects');
  const { data: clients, loading: clientsLoading } = useApi('/api/clients');
  
  const [contact, setContact] = useState({ name: '', email: '', mobile: '', city: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const submitContact = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/api/contact', contact);
      alert('Contact form submitted successfully!');
      setContact({ name: '', email: '', mobile: '', city: '' });
    } catch (error) {
      alert('Error submitting contact form');
    }
  };

  const subscribeNewsletter = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/api/newsletter', { email: newsletterEmail });
      alert('Subscribed to newsletter!');
      setNewsletterEmail('');
    } catch (error) {
      alert('Error subscribing to newsletter');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Welcome to Our Platform</h1>
          <p className="text-xl md:text-2xl mb-8">Innovative solutions for modern businesses</p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Projects</h2>
          {projectsLoading ? (
            <p className="text-center">Loading projects...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Happy Clients</h2>
          {clientsLoading ? (
            <p className="text-center">Loading clients...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {clients?.map((client) => (
                <ClientCard key={client.name} client={client} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Get In Touch</h2>
          <form onSubmit={submitContact} className="max-w-lg mx-auto space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              value={contact.name}
              onChange={(e) => setContact({...contact, name: e.target.value})}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={contact.email}
              onChange={(e) => setContact({...contact, email: e.target.value})}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={contact.mobile}
              onChange={(e) => setContact({...contact, mobile: e.target.value})}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={contact.city}
              onChange={(e) => setContact({...contact, city: e.target.value})}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Newsletter</h2>
          <p className="text-xl mb-8 opacity-90">Stay updated with our latest news</p>
          <form onSubmit={subscribeNewsletter} className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 p-4 rounded-l-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-r-lg font-bold transition duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
