'use client';
import React, { useState } from "react";

export default function CreateJobForm({ onClose, onJobCreated }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("FullTime");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newJob = {
      title,
      company,
      location,
      type,
      salaryMin: parseInt(salaryMin),
      salaryMax: parseInt(salaryMax),
      deadline,
      description,
    };

    try {
      const res = await fetch("https://aryan-1-hoac.onrender.com/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      if (res.ok) {
        const savedJob = await res.json();
        alert("Job posted successfully!");

       if (onJobCreated) onJobCreated(savedJob);// Optional callback
        onClose();
      } else {
        const error = await res.json();
        alert("Failed to post job: " + error?.message || "Unknown error");
      }
    } catch (err) {
      console.error("Error submitting job:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Job Opening</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Job Title</label>
            <input
              type="text"
              className="border rounded px-2 py-1 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Company Name</label>
            <input
              type="text"
              className="border rounded px-2 py-1 w-full"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Location</label>
            <select
              className="border rounded px-2 py-1 w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="">Select Location</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Job Type</label>
            <select
              className="border rounded px-2 py-1 w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Salary Min (₹)</label>
            <input
              type="number"
              className="border rounded px-2 py-1 w-full"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Salary Max (₹)</label>
            <input
              type="number"
              className="border rounded px-2 py-1 w-full"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Application Deadline</label>
            <input
              type="date"
              className="border rounded px-2 py-1 w-full"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1">Job Description</label>
            <textarea
              rows="4"
              className="border rounded px-2 py-1 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please share a description to let the candidate know more about the job role"
              required
            />
          </div>

          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>

            <div className="flex gap-4">
              <button
                type="button"
                className="border px-4 py-2 rounded bg-gray-100"
                onClick={() => alert("Saved as draft (not implemented)")}
              >
                Save Draft ⌄
              </button>

              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Publish »
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
