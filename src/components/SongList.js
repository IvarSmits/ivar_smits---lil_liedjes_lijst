import React from "react";

function SongList(props) {
  const elementList = props.songs.map((song, index) => {
    return (
      <tr key={index}>
        <td>{song.title}</td>
        <td>{song.artist}</td>
        <td>{song.genre}</td>
        <td>{song.rating}</td>
        <td>
          <button onClick={() => props.handleDelete(index)}>delete</button>
        </td>
      </tr>
    );
  });

  return <tbody>{elementList}</tbody>;
}

export default SongList;
