import { useEffect, useReducer, useState } from 'react';
import Button from '../../UI/Button/Button';
import styles from './GameDetailView.module.css';
import { useParams } from 'react-router-dom';
import Spinner from '../../UI/Spinner';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Thumbs from '../../Posts/Thumbs/Thumbs';
import { useTranslation } from 'react-i18next';

const defaultGameDetails = {
  name: '',
  imageHeader: '',
  gameDesc: '',
  reviews: [],
};

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
      reviews: [],
    };
  }

  return defaultGameDetails;
}

async function getGameDetails(id, callback) {
  const resp = await fetch(`/api/game/info/${id}`);
  if (!resp.ok) {
    throw new Error(`Could not fetch game (${resp.status})`);
  }
  const data = await resp.json();
  callback(data);
}

function GameDetailView() {
  const { id } = useParams();
  const [gameDetails, dispatchGameDetails] = useReducer(
    gameReducer,
    defaultGameDetails
  );
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    getGameDetails(id, (data) => {
      dispatchGameDetails({ type: 'ADD_ALL_DETAILS', game: data });
      setIsLoading(false);
    });
  }, []);

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
                    {t('GENRE')} {gameDetails.genre?.join(', ')}
                  </li>
                  <li>
                    {t('DEVELOPER')} &nbsp;{gameDetails.developer?.join(', ')}
                  </li>
                  <li>
                    {t('PUBLISHER')} &nbsp;{gameDetails.publisher?.join(', ')}
                  </li>
                  <li>
                    {t('CATEGORIES')} &nbsp;{gameDetails.category?.join(', ')}
                  </li>
                  <li>
                    {t('PLATFORMS')} {gameDetails.platforms?.join(', ')}
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
              <Button>{t('ADD TO WISHLIST')}</Button>
              <Button>{t('ADD TO MY GAMELIST')}</Button>
              <Thumbs />
              {/* TODO: Drop down menu */}
            </div>
          </div>
          <div className={styles.reviews}>
            <h2>{t('Community Reviews')}</h2>
            {/* TODO: Render reviews */}
          </div>
        </>
      )}
    </>
  );
}

export default GameDetailView;
