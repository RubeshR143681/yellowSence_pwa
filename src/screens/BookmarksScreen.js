import React from "react";

const BookmarksScreen = ({ bookmarkedJobs, onDelete }) => {
  return (
    <div className="p-8 pb-24 bg-gradient-to-r from-gray-100 to-gray-300 h-[100vh] overflow-auto lg:pb-24">
      <h1 className="text-2xl font-bold mb-10">Bookmarked Jobs</h1>
      {bookmarkedJobs.length === 0 ? (
        <p>No bookmarked jobs found.</p>
      ) : (
        bookmarkedJobs.map((job) => (
          <div
            key={job.id}
            className="border p-4 mb-4 rounded-lg shadow bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex flex-col gap-2 w-full">
              <h2 className="text-lg md:text-xl font-semibold">{job.title}</h2>
              <p>
                <span className="font-semibold">Company Name:</span>{" "}
                {job.company_name}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {job.job_location_slug}
              </p>
            </div>
            <button
              onClick={() => onDelete(job.id)}
              className="mt-2 md:mt-0 bg-white text-red-500 p-2 rounded border border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out w-full md:w-auto flex justify-center items-center"
            >
              <span className="hidden md:block">Delete</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 md:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarksScreen;
