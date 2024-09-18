import React from "react";
import SongCard from "./SongCard";
import "./PlaylistManager.css";

const Playlist = ({ playlists }) => {
  return (
    <div className="playlist-container">
      {playlists.length > 0 ? (
        playlists.map((playlist) => (
          <div key={playlist.name} className="playlist">
            <h3>{playlist.name}</h3>
            {playlist.songs.length > 0 ? (
              playlist.songs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  addSong={() => {}}
                  playlists={[]} // Don't show the playlist selector in the playlist view
                />
              ))
            ) : (
              <p>No songs in this playlist.</p>
            )}
          </div>
        ))
      ) : (
        <p>No playlists created yet.</p>
      )}
    </div>
  );
};

export default Playlist;
