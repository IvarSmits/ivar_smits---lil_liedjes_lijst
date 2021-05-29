import React from "react";

function SongForm(props) {
  return (
    <form className="song__form">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={props.newSong.title}
        onChange={props.handleChange}
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        onChange={props.handleChange}
        value={props.newSong.artist}
      />
      <select
        name="genre"
        value={props.newSong.genre}
        onChange={props.handleChange}
      >
        <option value="">Select Option</option>
        <option value="drum_and_bass">Drum and Bass</option>
        <option value="punk">Punk</option>
        <option value="hiphop">Hip Hop</option>
        <option value="reggae">Reggae</option>
        <option value="other">Other</option>
      </select>
      <select
        name="rating"
        value={props.newSong.rating}
        onChange={props.handleChange}
      >
        <option value="1">*</option>
        <option value="2">* *</option>
        <option value="3">* * *</option>
        <option value="4">* * * *</option>
        <option value="5">* * * * *</option>
      </select>
      <button onClick={(e) => props.addSong(e, props.NewSong)}>Add</button>
    </form>
  );
}

export default SongForm;
