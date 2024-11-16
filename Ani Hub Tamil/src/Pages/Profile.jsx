import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios"; // Import axios for API requests
import MovieBox from "../Components/MovieBox";
import { movieData } from "../Components/MovieData";

const Profile = () => {
  const [user, setUser] = useState(null); // Store user information
  const [likedMovies, setLikedMovies] = useState([]); // Store liked movies
  const [loading, setLoading] = useState(true); // Loading state for movies
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await axios.get("/api/user/status"); // Check login status from backend
        if (response.data.isLoggedIn) {
          setUser(response.data.user); // Set user info if logged in
          fetchLikedMovies(response.data.user.email); // Fetch liked movies if user is logged in
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    };

    checkUserStatus(); // Call function to check login status
  }, []);

  const fetchLikedMovies = async (email) => {
    try {
      const response = await axios.get(`/api/user/${email}/liked-movies`); // Fetch liked movies from backend
      setLikedMovies(response.data.likedMovies);
    } catch (error) {
      console.error("Error fetching liked movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white pt-20">
      <nav className="w-full p-4 flex items-center justify-between fixed z-50 left-[90%] bg-gray-800">
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 transition duration-300 shadow-lg text-sm flex items-center"
        >
          <FaSignOutAlt size={20} className="mr-2" />
          Logout
        </button>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-8">Liked Movies</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            {likedMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {likedMovies.map((title, index) => {
                  const movie = movieData.find((m) => m.title === title);

                  if (!movie) {
                    return (
                      <div
                        key={index}
                        className="w-[270px] h-[450px] p-2 bg-gray-800 rounded-md shadow-lg flex items-center justify-center text-white"
                      >
                        <p>Image not available</p>
                      </div>
                    );
                  }

                  return (
                    <MovieBox
                      key={index}
                      imageSrc={movie.imageSrc || "/images/default-image.jpg"}
                      label1={movie.label1 || "N/A"}
                      label2={movie.label2 || "N/A"}
                      title={title}
                      isLiked={true}
                      onLike={() => {}}
                      redirectLink={movie.redirectLink}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-lg">You haven't liked any movies yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
