import React from "react";
import { Link } from "react-router-dom";

const SongCard = ({ song, addToPlaylist, addToFavorites }) => {
  const { id, title, artist, coverImage, accentColor } = song;

  return (
    <div className="song-card" style={{ borderColor: accentColor }}>
      <img src={coverImage || "placeholder.png"} alt={title} />
      <div className="song-info">
        <h3>{title}</h3>
        <p>{artist}</p>
      </div>
      <div className="song-actions">
        <Link to={`/song/${id}`}>View Details</Link>
        <button onClick={() => addToPlaylist(song, "My Playlist")}>
          Add to Playlist
        </button>
        <button onClick={() => addToFavorites(song)}>Favorite</button>
      </div>
    </div>
  );
};

export default SongCard;
