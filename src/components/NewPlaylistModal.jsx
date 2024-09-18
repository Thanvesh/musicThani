import React, { useState } from "react";
import "./NewPlaylistModal.css"; // Ensure this imports the above styles

const NewPlaylistModal = ({ onCreate, onClose }) => {
  const [playlistName, setPlaylistName] = useState("");

  const handleCreate = () => {
    if (playlistName.trim()) {
      onCreate(playlistName);
      setPlaylistName("");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Create New Playlist</h2>
        <input
          type="text"
          placeholder="Enter playlist name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default NewPlaylistModal;
