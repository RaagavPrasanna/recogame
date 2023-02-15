function GamePost({ gameTitle, devName, review, rating }) {
  return (
    <li>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        width={150}
      />
      <h1>{gameTitle}</h1>
      <div>
        <span>{devName}</span>
        <span>{'⭐️'.repeat(rating)}</span>
      </div>
      <p>{review}</p>
    </li>
  );
}

export default GamePost;
