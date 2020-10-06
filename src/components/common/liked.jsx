import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Liked = (props) => {
  const { movie, onLike } = props;
  const { liked } = movie;
  const classes = liked ? "ml-4 mt-2 text-danger" : "ml-4 mt-2 text-muted";
  return (
    <FontAwesomeIcon
      className={classes}
      icon={faHeart}
      onClick={() => onLike(movie)}
    />
  );
};

export default Liked;
