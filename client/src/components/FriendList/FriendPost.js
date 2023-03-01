import styles from './FriendPost.module.css';

function FriendPost(
  name
) {
  return (
    <div>
      <br />
      <br />
      <br />
      <section className={styles.friendPost}>
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
        <h2> {name} </h2>
      </section>
    </div>
  );
}

export default FriendPost;
