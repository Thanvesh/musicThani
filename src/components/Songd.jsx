import React from "react";
import { useParams } from "react-router-dom";

const SongDetail = ({ songs }) => {
  const { id } = useParams();
  const song = songs.find((song) => song.id === id);

  if (!song) return <p>Song not found</p>;

  return (
    <div className="song-detail" style={{ backgroundColor: song.accentColor }}>
      <h2>{song.title}</h2>
      <p>{song.artist}</p>
      <img src={song.coverImage || "placeholder.png"} alt={song.title} />
      <audio controls src={song.sampleUrl}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SongDetail;
