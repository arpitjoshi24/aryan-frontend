'use client';
import React from 'react';
import { Range } from 'react-range';
import { ChevronDown, MapPin, User, Search } from 'lucide-react';

const MIN = 0;
const MAX = 100;

const TopbarFilter = ({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  jobType,
  setJobType,
  salaryRange,
  setSalaryRange
}) => {
  const handleFilterChange = () => {
    console.log({
      searchTerm,
      location,
      jobType,
      salaryRange,
    });
  };

  return (
    <div className="bg-white shadow-md px-48 py-4 mx-auto mt-6 flex items-center justify-between space-x-6">
      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search By Job Title, Role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="outline-none text-sm text-gray-800 w-40"
        />
      </div>

      <div className="w-px h-6 bg-gray-200" />

      {/* Location Dropdown */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <MapPin className="w-4 h-4 text-gray-500" />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent outline-none text-sm"
        >
          <option value="Any">Preferred Location</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="chennai">Chennai</option>
        </select>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>

      <div className="w-px h-6 bg-gray-200" />

      {/* Job Type Dropdown */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <User className="w-4 h-4 text-gray-500" />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="bg-transparent outline-none text-sm"
        >
          <option value="Any">Job type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>

      <div className="w-px h-6 bg-gray-200" />

      {/* Salary Range */}
      <div className="flex flex-col space-y-1 text-sm">
        <span className="text-gray-500">Salary Per Month</span>
        <div className="flex items-center space-x-4">
          <span>₹{salaryRange[0]}k</span>
          <Range
            step={1}
            min={MIN}
            max={MAX}
            values={salaryRange}
            onChange={(values) => setSalaryRange(values)}
            onFinalChange={handleFilterChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="w-40 h-1 bg-gray-200 rounded-full"
                style={{ ...props.style }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="w-4 h-4 bg-black rounded-full shadow"
              />
            )}
          />
          <span>₹{salaryRange[1]}k</span>
        </div>
      </div>
    </div>
  );
};

export default TopbarFilter;
