import { useState } from 'react';
import apiClient from '../../services/api';

const ContactsForm = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const submitContact = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/api/contact', contact);
      alert('Contact form submitted successfully!');
      setContact({ name: '', email: '', mobile: '', city: '' });
    } catch {
      alert('Error submitting contact form');
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Get In Touch
        </h2>
        <form onSubmit={submitContact} className="max-w-lg mx-auto space-y-6">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={contact.name}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={contact.email}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            name="mobile"
            type="tel"
            placeholder="Mobile Number"
            value={contact.mobile}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            name="city"
            type="text"
            placeholder="City"
            value={contact.city}
            onChange={handleChange}
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
  );
};

export default ContactsForm;
