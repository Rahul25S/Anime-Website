import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axios from "axios"; // Import axios for API requests

const MovieBox = ({
  imageSrc,
  label1,
  label2,
  title,
  isLiked,
  onLike,
  redirectLink,
}) => {
  const { user } = useAuth();

  // Function to toggle the favorite status of a movie
  const toggleFavShow = async () => {
    if (user) {
      try {
        // Replace this with the correct endpoint for your backend
        const response = await axios.get(`http://localhost:5000/user/${user.email}/likedMovies`);
        const favShowsList = response.data.likedMovies || [];

        if (favShowsList.includes(title)) {
          await axios.post(`http://localhost:5000/user/${user.email}/likedMovies`, {
            movieTitle: title,
            action: "remove", // Action to remove the movie from the list
          });
        } else {
          await axios.post(`http://localhost:5000/user/${user.email}/likedMovies`, {
            movieTitle: title,
            action: "add", // Action to add the movie to the list
          });
        }
        onLike(); // Update the parent component about the state change
      } catch (error) {
        console.error("Error toggling favorite show: ", error);
      }
    } else {
      alert("Please log in to save your favorite anime.");
    }
  };

  // Handle click event to redirect to the movie's details page
  const handleBoxClick = () => {
    window.location.href = redirectLink;
  };

  return (
    <div
      className="w-[200px] h-[380px] p-1 lg:w-[270px] lg:h-[450px] lg:p-2 bg-gray-800 rounded-md shadow-lg lg:hover:scale-105 lg:transition-transform lg:duration-300 cursor-pointer"
      onClick={handleBoxClick}
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-[80%] object-cover rounded-md"
      />
      <div className="flex gap-2 mt-2">
        <span className="px-2 text-sm lg:py-1 lg:text-xs text-white bg-blue-600 rounded">
          {label1}
        </span>
        <span className="text-sm px-2 lg:py-1 text-white bg-gray-600 rounded">
          {label2}
        </span>
        <span
          className="text-sm py-1 px-1 lg:py-1 text-white bg-gray-600 rounded cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavShow(); // Toggle favorite status
          }}
        >
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </span>
      </div>
      <h3 className="mt-2 text-xs lg:text-sm text-white">{title}</h3>
    </div>
  );
};

export default MovieBox;
