import React, { useState } from "react";

const episodes = [
  {
    id: 1,
    title: "Episode 1-12",
    embedCode: `<iframe src="https://drive.google.com/file/d/YOUR_FULL_VIDEO_ID/preview" width="80%" height="80%" allow="autoplay; fullscreen"></iframe>`,
  },
];

const TimeLoopTheVillainessEnjoys = () => {
  const [currentEpisode, setCurrentEpisode] = useState(episodes[0]);

  return (
    <div className="relative w-full h-screen">
      <div className="flex flex-grow absolute w-full" style={{ top: "10%" }}>
        <div className="w-1/5 bg-gray-900 p-4 overflow-y-auto">
          <h2 className="text-white text-lg mb-4">Episodes</h2>
          <div className="space-y-2">
            {episodes.map((episode) => (
              <button
                key={episode.id}
                className="p-3 w-full bg-black hover:bg-blue-500 text-white rounded"
                onClick={() => setCurrentEpisode(episode)}
              >
                <center>{episode.title}</center>
              </button>
            ))}
          </div>
        </div>

        <div className="w-4/5 bg-black flex justify-center items-center p-4">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <div
              className="absolute top-0 left-0 w-full h-full"
              dangerouslySetInnerHTML={{ __html: currentEpisode.embedCode }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLoopTheVillainessEnjoys;
