import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBar from "./components/Search";
import PlaylistManager from "./components/PlaylistManager";
import SongDetail from "./components/Songd";
import axios from "axios";
import "./App.css";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Fetch initial songs when the component mounts
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          "https://cms.samespace.com/items/songs"
        );
        setSongs(response.data.songs);
      } catch (error) {
        console.error("Error fetching songs", error);
      }
    };

    fetchSongs();
  }, []);

  // Handles search results from the SearchBar component
  const handleSearchResults = (searchResults) => {
    setSongs(searchResults);
  };

  // Adds a song to a specific playlist
  const addToPlaylist = (song, playlistName) => {
    const updatedPlaylists = playlists.map((playlist) =>
      playlist.name === playlistName
        ? { ...playlist, songs: [...playlist.songs, song] }
        : playlist
    );
    setPlaylists(updatedPlaylists);
  };

  // Adds a song to the favorites list
  const addToFavorites = (song) => {
    setFavorites([...favorites, song]);
  };

  return (
    <Router>
      <div className="app-container">
        <SearchBar onSearchResults={handleSearchResults} />
        <Routes>
          <Route
            path="/"
            element={
              <PlaylistManager
                playlists={playlists}
                setPlaylists={setPlaylists}
                addToPlaylist={addToPlaylist}
                addToFavorites={addToFavorites}
                songs={songs}
              />
            }
          />
          <Route path="/song/:id" element={<SongDetail songs={songs} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
