import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/Search";
import SongCard from "./components/SongCard";
import Playlist from "./components/PlaylistManager";
import SongModal from "./components/SongModal";
import NewPlaylistModal from "./components/NewPlaylistModal.jsx";
import "./App.css";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);

  useEffect(() => {
    const fetchDefaultSongs = async () => {
      try {
        const response = await axios.get(
          "https://cms.samespace.com/items/songs"
        );
        setSongs(response.data.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchDefaultSongs();
  }, []);

  const searchSongs = async (query) => {
    try {
      const response = await axios.get(
        query.trim()
          ? `https://cms.samespace.com/items/songs?search=${query}`
          : "https://cms.samespace.com/items/songs"
      );
      setSongs(response.data.data);
    } catch (error) {
      console.error("Error searching songs:", error);
    }
  };

  const createPlaylist = (name) => {
    setPlaylists([...playlists, { name, songs: [] }]);
    setIsCreatingPlaylist(false);
  };

  const addSongToPlaylist = (song, playlistName) => {
    if (playlistName === "createNew") {
      setIsCreatingPlaylist(true);
    } else {
      const updatedPlaylists = playlists.map((pl) =>
        pl.name === playlistName && !pl.songs.some((s) => s.id === song.id)
          ? { ...pl, songs: [...pl.songs, song] }
          : pl
      );
      setPlaylists(updatedPlaylists);
    }
  };

  const handleSongClick = (song) => {
    setSelectedSong(song);
  };

  return (
    <div className="app-container">
      <h1>Music Playlist Manager</h1>
      <SearchBar onSearch={searchSongs} />
      <div className="song-list">
        {songs.length > 0 ? (
          songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              addSong={addSongToPlaylist}
              playlists={playlists}
              onClick={() => handleSongClick(song)}
            />
          ))
        ) : (
          <p>No songs available. Please search for songs.</p>
        )}
      </div>
      <Playlist playlists={playlists} />
      {selectedSong && (
        <SongModal song={selectedSong} onClose={() => setSelectedSong(null)} />
      )}
      {isCreatingPlaylist && (
        <NewPlaylistModal
          onCreate={createPlaylist}
          onClose={() => setIsCreatingPlaylist(false)}
        />
      )}
    </div>
  );
};

export default App;
