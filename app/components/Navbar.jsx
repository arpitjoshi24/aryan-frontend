'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CreateJobForm from './CreateJobForm'; // Adjust the path if needed

export default function Navbar({ onJobSubmit }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md rounded-full px-6 py-3 mx-auto max-w-3xl mt-6 flex items-center gap-12 justify-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="./logo.png" alt="Logo" width={40} height={40} />
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-8 font-medium text-gray-700">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/find-jobs">Find Jobs</Link></li>
          <li><Link href="/find-talents">Find Talents</Link></li>
          <li><Link href="/about">About us</Link></li>
          <li><Link href="/testimonials">Testimonials</Link></li>
          <li>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition"
            >
              Create Jobs
            </button>
          </li>
        </ul>
      </nav>

      {/* Modal */}
      {showForm && (
        <CreateJobForm
          onClose={() => setShowForm(false)}
          onSubmit={(jobData) => {
            onJobSubmit(jobData);
            setShowForm(false);
          }}
        />
      )}
    </>
  );
}
