import React from "react";
import "./Songd.css"; // Style for modal

const SongModal = ({ song, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{song.title}</h2>
        <p>{song.artist}</p>
        <audio controls>
          <source src={song.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default SongModal;
