import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="bg-purple-600 py-12 px-4 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="mb-6">Get 10% off your first order and stay updated with new arrivals and offers!</p>
        <form className="flex flex-col md:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded border-amber-50 border w-full md:w-1/2 text-white focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-purple-600 px-6 py-2 rounded font-bold hover:bg-yellow-300 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
