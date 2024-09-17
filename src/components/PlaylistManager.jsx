import React, { useState } from "react";
import SongCard from "./SongCard";

const PlaylistManager = ({
  playlists,
  setPlaylists,
  addToPlaylist,
  addToFavorites,
  songs = [],
}) => {
  // Default songs to an empty array
  const [playlistName, setPlaylistName] = useState("");

  const createPlaylist = () => {
    setPlaylists([...playlists, { name: playlistName, songs: [] }]);
    setPlaylistName("");
  };

  const removeSongFromPlaylist = (playlistIndex, songIndex) => {
    const updatedPlaylists = playlists.map((playlist, index) =>
      index === playlistIndex
        ? {
            ...playlist,
            songs: playlist.songs.filter((_, i) => i !== songIndex),
          }
        : playlist
    );
    setPlaylists(updatedPlaylists);
  };

  return (
    <div className="playlist-manager">
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Create new playlist"
      />
      <button onClick={createPlaylist}>Create Playlist</button>

      <div className="playlists">
        {playlists.map((playlist, index) => (
          <div key={index} className="playlist">
            <h3>{playlist.name}</h3>
            <ul>
              {(playlist.songs || []).map((song, songIndex) => (
                <li key={songIndex}>
                  <SongCard song={song} />
                  <button
                    onClick={() => removeSongFromPlaylist(index, songIndex)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="songs-list">
        <h2>All Songs</h2>
        {songs?.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            addToPlaylist={addToPlaylist}
            addToFavorites={addToFavorites}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistManager;
