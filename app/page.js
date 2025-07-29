'use client';
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TopbarFilter from "./components/TopbarFilter";
import JobCards from "./components/JobCards";
import CreateJobForm from "./components/CreateJobForm";

export default function Home() {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('Any');
  const [jobType, setJobType] = useState('Any');
  const [salaryRange, setSalaryRange] = useState([0, 100]);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();
        setAllJobs(data);
        setFilteredJobs(data); // Initially show all jobs
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  // Apply filter whenever filter states or job list changes
  useEffect(() => {
    const filterJobs = () => {
      let filtered = allJobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = location === "Any" || job.location === location;
        const matchesType = jobType === "Any" || job.type === jobType;
        const salary = job.salaryMax || 0;
        const matchesSalary = salary >= salaryRange[0] * 1000 && salary <= salaryRange[1] * 1000;

        return matchesSearch && matchesLocation && matchesType && matchesSalary;
      });

      setFilteredJobs(filtered);
    };

    filterJobs();
  }, [searchTerm, location, jobType, salaryRange, allJobs]);

  // Add new job
  const handleAddJob = (newJob) => {
    const updatedJobs = [newJob, ...allJobs];
    setAllJobs(updatedJobs);
    setShowModal(false);
  };

  return (
    <div>
      <Navbar onJobSubmit={() => setShowModal(true)} />

      <TopbarFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        location={location}
        setLocation={setLocation}
        jobType={jobType}
        setJobType={setJobType}
        salaryRange={salaryRange}
        setSalaryRange={setSalaryRange}
      />

      <JobCards jobData={filteredJobs} />

      {showModal && (
        <CreateJobForm
          onClose={() => setShowModal(false)}
          onJobCreated={handleAddJob}
        />
      )}
    </div>
  );
}
