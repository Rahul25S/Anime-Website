import React, { useState, useEffect } from "react";
import MovieBox from "./MovieBox.jsx";
import { movieData } from "./MovieData.jsx";
import axios from "axios"; // Import axios for API requests

const Popular = () => {
  const [user, setUser] = useState(null); // Store user information
  const [likedMovies, setLikedMovies] = useState({});
  const [bookmarkedMovies, setBookmarkedMovies] = useState({});

  // Check user login status on component mount
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await axios.get("/api/user/status"); // Check login status from backend
        if (response.data.isLoggedIn) {
          setUser(response.data.user); // Set user info if logged in
          fetchLikedMovies(response.data.user.email); // Fetch liked movies if logged in
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    };

    checkUserStatus(); // Call function to check login status
  }, []);

  // Fetch liked movies from backend
  const fetchLikedMovies = async (email) => {
    try {
      const response = await axios.get(`/api/user/${email}/likedMovies`);
      const favShows = response.data.favShows || [];
      const likedStatus = movieData.reduce((acc, movie, index) => {
        acc[index] = favShows.includes(movie.title);
        return acc;
      }, {});
      setLikedMovies(likedStatus);
    } catch (error) {
      console.error("Error fetching liked movies:", error);
    }
  };

  // Handle like toggle
  const toggleLike = async (index) => {
    try {
      if (user) {
        const newLikedMovies = { ...likedMovies, [index]: !likedMovies[index] };
        setLikedMovies(newLikedMovies);
        
        // Update liked movies in backend
        await axios.post(`/api/user/${user.email}/updateLikedMovies`, {
          likedMovies: Object.keys(newLikedMovies).filter(key => newLikedMovies[key]).map(Number),
        });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Handle bookmark toggle
  const toggleBookmark = (index) => {
    setBookmarkedMovies((prevBookmarks) => ({
      ...prevBookmarks,
      [index]: !prevBookmarks[index],
    }));
  };

  return (
    <div className="p-4">
      <h1 className="font-nsans-medium text-3xl p-1 md:text-4xl md:p-4 text-white">
        POPULAR
      </h1>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movieData.map((movie, index) => (
          <MovieBox
            key={index}
            imageSrc={movie.imageSrc}
            label1={movie.label1}
            label2={movie.label2}
            title={movie.title}
            isLiked={likedMovies[index]}
            onLike={() => toggleLike(index)}
            isBookmarked={bookmarkedMovies[index]}
            onBookmark={() => toggleBookmark(index)}
            redirectLink={movie.redirectLink}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
