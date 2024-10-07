import React, { useEffect, useState, useCallback } from "react";
import Loader from "../components/Loader"; // Ensure this component exists
import { fetchJobs } from "../services/jobService"; // Ensure this service is correctly implemented
import TinderCard from "react-tinder-card";
import Swal from "sweetalert2";

const JobCard = ({ job }) => {
  const salary =
    job?.primary_details?.Salary === "-"
      ? "Based on Interview"
      : job?.primary_details?.Salary || "Not Available";

  return (
    <div className="relative bg-white rounded-lg p-3 flex flex-col justify-start gap-3 lg:w-[50%] shadow-lg transition-transform transform hover:scale-105">
      <h1 className="lg:text-xl text-lg font-semibold text-gray-800">
        {job?.title || "Title not available"}
      </h1>
      <p className="hidden lg:block text-gray-600">
        {job?.other_details || "Details not available"}
      </p>
      <p className="font-semibold text-gray-700">
        Company Name:{" "}
        <span className="font-normal">
          {job?.company_name || "Not Available"}
        </span>
      </p>
      <p className="font-semibold text-gray-700">
        Job Role:{" "}
        <span className="font-normal">{job?.job_role || "Not Available"}</span>
      </p>
      <p className="font-semibold text-gray-700">
        Working Hours:{" "}
        <span className="font-normal">{job?.job_hours || "Not Available"}</span>
      </p>
      <p className="font-semibold text-gray-700">
        Location:{" "}
        <span className="font-normal">
          {job?.job_location_slug || "Not Available"}
        </span>
      </p>
      <p className="font-semibold text-gray-700">
        Salary: <span className="font-normal">{salary}</span>
      </p>
      <p className="font-semibold text-gray-700">
        Openings:{" "}
        <span className="font-normal">
          {job?.openings_count || "Not Available"}
        </span>
      </p>
      <p className="font-semibold text-gray-700">
        Experience:{" "}
        <span className="font-normal">
          {job?.primary_details?.Experience || "Not Available"}
        </span>
      </p>
      <p className="font-semibold text-gray-700">
        Contact Number:{" "}
        <span className="font-normal">
          {job?.whatsapp_no || "Not Available"}
        </span>
      </p>
    </div>
  );
};

const JobsScreen = ({ setBookmarkedJobs }) => {
  const [jobs, setJobsLocal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);

  // Load jobs from API and filter out unwanted jobs
  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchJobs(page); // Fetch jobs based on the current page

      // Filter out jobs with the specific ID (e.g., ID 5)
      const filteredJobs = data.filter((item) => {
        if (Array.isArray(item.type)) {
          return !item.type.includes(1040);
        } else if (typeof item.type === "number") {
          return item.type !== 1040;
        } else if (typeof item.type === "string") {
          return !item.type.split(",").map(Number).includes(1040);
        }
        console.warn("Unexpected type format:", item.type);
        return false; // Default return if the format is unexpected
      });

      if (filteredJobs.length === 0 && page > 1) {
        // No jobs returned on the new page
        Swal.fire({
          icon: "info",
          title: "No more jobs available!",
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#333",
          color: "#fff",
        });
      } else {
        setJobsLocal((prevJobs) => [...prevJobs, ...filteredJobs]); // Append new jobs to the existing list
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadJobs(); // Load jobs when the page changes

    // Load bookmarked jobs from localStorage when component mounts
    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
    setBookmarkedJobs(savedBookmarks);
  }, [loadJobs, page, setBookmarkedJobs]);

  const handleSwipe = (direction, job) => {
    if (direction === "right") {
      setBookmarkedJobs((prev) => {
        if (!prev.some((bkJob) => bkJob.id === job.id)) {
          const newBookmarks = [...prev, job];
          localStorage.setItem("bookmarkedJobs", JSON.stringify(newBookmarks));
          Swal.fire({
            icon: "success",
            title: "Job bookmarked successfully!",
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: "green",
            color: "#fff",
          });
          return newBookmarks;
        } else {
          Swal.fire({
            icon: "info",
            title: "Job is already bookmarked.",
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: "red",
            color: "white",
          });
          return prev;
        }
      });
    }
    setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next job
  };

  // Load more jobs when the user swipes left or right and when there are no more jobs left
  useEffect(() => {
    if (currentIndex >= jobs.length) {
      setPage((prevPage) => prevPage + 1); // Load more jobs when the index exceeds the job length
    }
  }, [currentIndex, jobs.length]);

  if (loading && currentIndex === 0) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-5 bg-gradient-to-r from-blue-100 to-green-100 min-h-screen">
      <h1 className="text-2xl font-bold pb-4 text-center text-gray-800">
        Jobs
      </h1>
      <div className="flex justify-around items-center">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 text-red-600 animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          <p className="font-semibold text-red-600">Swipe to Ignore</p>
        </div>
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 text-green-600 animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
          <p className="font-semibold text-green-600">Swipe to Save</p>
        </div>
      </div>
      <div className="flex flex-col items-center lg:mt-[15px] mt-[10px]">
        {currentIndex < jobs.length ? (
          <TinderCard
            key={jobs[currentIndex]?.id}
            onSwipe={(dir) => handleSwipe(dir, jobs[currentIndex])}
            preventSwipe={["up", "down"]}
            className="flex justify-center items-center w-full"
          >
            <JobCard job={jobs[currentIndex]} />
          </TinderCard>
        ) : (
          <p className="text-gray-600">No more jobs available!</p>
        )}
      </div>
    </div>
  );
};

export default JobsScreen;
