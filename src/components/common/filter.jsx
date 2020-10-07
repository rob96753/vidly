import React from "react";

const GroupFilter = (props) => {
  const { genres, onSelect, currentGenre } = props;
  console.log(genres, currentGenre);
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={`li-genre-${genre.name}`}
          className={
            genre._id === currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onSelect(genre)}
          id={`li-genre-${genre.name}`}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default GroupFilter;
