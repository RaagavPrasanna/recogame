import { useContext, useEffect, useReducer, useState } from 'react';
import Button from '../../UI/Button/Button';
import styles from './GameDetailView.module.css';
import { useParams } from 'react-router-dom';
import Spinner from '../../UI/Spinner';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Thumbs from '../../Posts/Thumbs/Thumbs';
import { useTranslation } from 'react-i18next';
import Tag from '../../Tag/Tag';
import UserContext from '../../../store/user-context';

const defaultGameDetails = {
  name: '',
  imageHeader: '',
  gameDesc: '',
  reviews: [],
};

function captialize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function gameReducer(state, action) {
  if (action.type === 'ADD_ALL_DETAILS') {
    const { game } = action;
    return {
      name: game.name,
      genre: game.genres,
      category: game.categories,
      developer: game.developers,
      publisher: game.publishers,
      platforms: game.platforms,
      contentDescriptors: game.contentDescriptors,
      background: game.background,
      imageHeader: game.imageHeader,
      gameDesc: game.shortDescription,
      storeUrl: game.storeUrl,
      screenshots: game.screenshots,
      likes: game.likes,
      dislikes: game.dislikes,
      thumbs: game.thumbs,
      reviews: [],
    };
  }

  return defaultGameDetails;
}

async function getGameDetails(id, isLoggedIn, callback) {
  const resp = await fetch(`/api/game/info/${id}`);
  if (!resp.ok) {
    throw new Error(`Could not fetch game (${resp.status})`);
  }

  const data = await resp.json();

  if (isLoggedIn) {
    const thumbs = await getThumbs();
    data.thumbs =
      Number(thumbs.likes?.includes(id)) - Number(thumbs.dislikes?.includes(id));
  }
  callback(data);
}

async function getThumbs() {
  // Fetch the CSRF token from the server
  const resp = await fetch('/authentication/csrf-token');
  const { token } = await resp.json();

  // Send the thumb to the server with the CSRF token
  const response = await fetch('/authentication/thumbs/count', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token,
    }
  });

  if (!response.ok) {
    return {};
  } else {
    return await response.json();
  }
}

function GameDetailView() {
  const { id } = useParams();
  const [wishlistToggle, setWishlistToggle] = useState(true);
  const [gameDetails, dispatchGameDetails] = useReducer(
    gameReducer,
    defaultGameDetails
  );
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const userCtx = useContext(UserContext);

  const checkWishlist = async () => {
    const response = await fetch(`/authentication/check-wishlist/${id}`);
    if (response.status === 200) {
      setWishlistToggle(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getGameDetails(id, Boolean(userCtx.user), (data) => {
      dispatchGameDetails({ type: 'ADD_ALL_DETAILS', game: data });
      setIsLoading(false);
    });
    if (userCtx.user !== null) {
      checkWishlist();
    }
  }, []);

  const wishlistHandler = async (url) => {
    // Fetch the CSRF token from the server
    const resp = await fetch('/authentication/csrf-token');
    const { token } = await resp.json();

    // Send game id to server witb CSRF token
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
      body: JSON.stringify({ id })
    });

    if (response.status === 200) {
      setWishlistToggle(!wishlistToggle);
    }
  };

  const wishlistButton = () => {
    if (wishlistToggle) {
      return (
        <Button onClick={() => wishlistHandler('/authentication/add-to-wishlist')}>{t('ADD TO WISHLIST')}</Button>
      );
    } else {
      // TODO for Shirley - Add translation
      return (
        <Button onClick={() =>
          wishlistHandler('/authentication/remove-from-wishlist')}>{t('REMOVE FROM WISHLIST')}</Button>
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <>
          <div
            className={styles.gameDetails}
            style={{
              backgroundImage: `url(${gameDetails.background})`,
              backgroundSize: 'cover',
              overflow: 'hidden',
            }}
          >
            <h1>{gameDetails.name}</h1>
            <div className={styles.images}>
              <div className={styles.screenshots}>
                <Carousel
                  className={styles.carousel}
                  dynamicHeight={false}
                  infiniteLoop={true}
                >
                  {gameDetails.screenshots?.map((screenshot, i) => {
                    return (
                      <div className={styles.screenshot} key={i}>
                        <img src={screenshot} />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
              <div className={styles.info}>
                <img src={gameDetails.imageHeader} />
                <ul>
                  <li>
                    {t('TITLE')} &nbsp;{gameDetails.name}
                  </li>
                  <li>
                    {t('GENRE')}{' '}
                    <div className={styles['tag-container']}>
                      {gameDetails.genre?.map((genre, i) => {
                        return <Tag key={i} tagName={genre} tagType='genres' />;
                      })}
                    </div>
                  </li>
                  <li>
                    {
                      <>
                        {t('DEVELOPER')} &nbsp;
                        {gameDetails.developer?.map((dev, i) => {
                          return <Tag key={i} tagName={dev} tagType='developers' />;
                        })}
                      </>
                    }
                  </li>
                  <li>
                    {
                      <>
                        {t('PUBLISHER')} &nbsp;
                        {gameDetails.publisher?.map((pub, i) => {
                          return <Tag key={i} tagName={pub} tagType='publishers' />;
                        })}
                      </>
                    }
                  </li>
                  <li>
                    {`${t('CATEGORIES')}`}
                    <div className={styles['tag-container']}>
                      {gameDetails.category?.map((cat, i) => {
                        return <Tag key={i} tagName={cat} tagType='categories' />;
                      })}
                    </div>
                  </li>
                  <li>
                    {t('PLATFORMS')}
                    <div className={styles.platforms}>
                      {gameDetails.platforms?.map((plat, i) => {
                        return <Tag key={i} tagName={captialize(plat)} tagType='platforms' />;
                      })}
                    </div>
                  </li>
                  <li>
                    {t('CONTENT DESCRIPTION')} &nbsp;
                    {gameDetails.contentDescriptors}
                  </li>
                </ul>
              </div>
            </div>
            <p className={styles.desc}>{gameDetails.gameDesc}</p>
            <div className={styles.buttons}>
              <Button
                onClick={() => window.open(gameDetails.storeUrl, '_blank')}
              >
                {t('BUY ON STEAM')}
              </Button>
              {userCtx.user && (
                <>
                  {wishlistButton()}
                </>
              )}
              <Thumbs
                likes={gameDetails.likes}
                dislikes={gameDetails.dislikes}
                rating={gameDetails.thumbs}
                gameId={id}
              />
              {/* TODO: Drop down menu */}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default GameDetailView;
