'use client';
import React from 'react';
import Image from 'next/image';
import { Briefcase, Clock, MapPin, Users } from 'lucide-react';

const JobCards = ({ jobData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-8xl mx-auto p-6">
      {jobData.length === 0 ? (
        <p className="text-gray-400 col-span-full text-center">No jobs posted yet.</p>
      ) : (
        jobData.map((job) => (
          <div
           key={job._id || job.id || `${job.title}-${job.company}`}
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start">
              <Image
                src="/amazon.jpg"
                alt={job.company}
                width={40}
                height={40}
              />
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                Just Now
              </span>
            </div>

            <h2 className="text-md font-semibold mt-4">{job.title}</h2>

            <div className="flex items-center text-sm text-gray-500 space-x-2 mt-2">
              <Users className="w-4 h-4" /> <span>1–3 yr Exp</span>
              <MapPin className="w-4 h-4 ml-4" /> <span>{job.location}</span>
              <Briefcase className="w-4 h-4 ml-4" />{" "}
              <span>
                {job.salaryMax
                  ? `₹${job.salaryMax}`
                  : "N/A"}
              </span>
            </div>

            <ul className="text-sm text-gray-500 mt-4 space-y-1">
              <li>• {job.description?.slice(0, 60)}...</li>
            </ul>

            {job.deadline && (
              <div className="text-sm text-red-500 mt-2 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Apply before:{" "}
                <span className="ml-1 font-medium">
                  {new Date(job.deadline).toLocaleDateString()}
                </span>
              </div>
            )}

            <button className="mt-4 w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition">
              Apply Now
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobCards;
