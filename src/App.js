import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "./components/Navbar";
import JobsScreen from "./screens/JobsScreen";
import BookmarksScreen from "./screens/BookmarksScreen";
import "./index.css";

// Configure the Toast notifications using SweetAlert2
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: "#333",
  color: "#fff",
});

const App = () => {
  // Initialize bookmarked jobs from localStorage
  const [bookmarkedJobs, setBookmarkedJobs] = useState(() => {
    const savedJobs = localStorage.getItem("bookmarkedJobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  // Save the bookmarked jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarkedJobs", JSON.stringify(bookmarkedJobs));
  }, [bookmarkedJobs]);

  // Function to handle bookmarking a job
  const handleBookmark = (job) => {
    if (!bookmarkedJobs.find((bkJob) => bkJob.id === job.id)) {
      const newBookmarks = [...bookmarkedJobs, job];
      setBookmarkedJobs(newBookmarks);

      Toast.fire({
        icon: "success",
        title: "Job bookmarked successfully!",
        background: "green",
        color: "white",
      });
    } else {
      Toast.fire({
        icon: "info",
        title: "Job is already bookmarked.",
        background: "red",
        color: "white",
      });
    }
  };

  // Function to handle deleting a bookmarked job
  const handleDeleteBookmark = (jobId) => {
    const updatedBookmarks = bookmarkedJobs.filter((job) => job.id !== jobId);
    setBookmarkedJobs(updatedBookmarks);

    Toast.fire({
      icon: "success",
      title: "Bookmark removed successfully!",
      background: "green",
      color: "white",
    });
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <JobsScreen
              onBookmark={handleBookmark}
              setBookmarkedJobs={setBookmarkedJobs}
            />
          }
        />
        <Route
          path="/bookmarks"
          element={
            <BookmarksScreen
              bookmarkedJobs={bookmarkedJobs}
              onDelete={handleDeleteBookmark}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
