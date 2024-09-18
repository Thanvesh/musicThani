import React, { useRef, useState } from "react";
import { FaMusic, FaPlus, FaPlay, FaPause } from "react-icons/fa"; // Added FaPause icon
import "./SongCard.css";

const SongCard = ({ song, addSong, playlists, onClick }) => {
  const audioRef = useRef(null); // Create a ref for the audio element
  const [isPlaying, setIsPlaying] = useState(false); // Track if the song is playing

  const handleAddToPlaylist = (playlistName) => {
    addSong(song, playlistName);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Pause the song
      } else {
        audioRef.current.play(); // Play the song
      }
      setIsPlaying(!isPlaying); // Toggle play/pause state
    }
  };

  const handleSongEnd = () => {
    setIsPlaying(false); // Reset to pause when song finishes
  };

  return (
    <div className="song-card">
      <div
        className="song-details"
        onClick={onClick}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <FaMusic size={20} className="music-icon" />
        <div style={{ marginLeft: "20px" }}>
          <h3>{song.title}</h3>
          <p>{song.artist}</p>
        </div>
      </div>

      <select onChange={(e) => handleAddToPlaylist(e.target.value)}>
        <option value="">Add to playlist</option>
        {playlists
          .filter((pl) => !pl.songs.some((s) => s.id === song.id)) // Prevent adding to the same playlist again
          .map((playlist) => (
            <option key={playlist.name} value={playlist.name}>
              {playlist.name}
            </option>
          ))}
        <option value="createNew">
          <FaPlus /> Create New Playlist
        </option>
      </select>

      <button onClick={togglePlayPause} style={{ marginLeft: "auto" }}>
        {isPlaying ? <FaPause /> : <FaPlay />}{" "}
        {/* Toggle between play and pause icons */}
      </button>

      {/* Audio element for playing the song */}
      <audio
        ref={audioRef}
        src={song.url}
        onEnded={handleSongEnd} // Reset the state when the song ends
        controls
        style={{ display: "none" }} // Hidden audio element
        loop={false} // Ensure the song doesn't loop
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SongCard;
