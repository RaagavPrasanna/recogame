// import Popup from 'reactjs-popup';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './GameList.module.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function GameList() {
  // TODO: Add tags to so it can go to the right section

  const [show, setShow] = useState(false);
  const mockData = 'Game Name';
  const { t } = useTranslation();

  function handleClose() {
    setShow(false);
  }
  function handleShow() {
    setShow(true);
  }

  return (
    <div className={classes.gameList}>
      <h2> {t('Wishlist')} </h2>

      <section>
        <p> {mockData} </p>
        <Button onClick={handleShow}> {t('Edit')} </Button>
        {show && (
          <Modal
            className={classes.buttonsModal}
            onClick={handleClose}
          >
            <Button> {t('Remove')} </Button>
            <Button onClick={handleClose}> {t('Cancel')} </Button>
          </Modal>
        )}
      </section>

      <h2> {t('In progress')}</h2>

      <section>
        <p> {mockData} </p>
        <Button onClick={handleShow}> {t('Edit')} </Button>
        {show && (
          <Modal
            className={classes.buttonsModal}
            onClick={handleClose}
          >
            <Button> {t('Remove')} </Button>
            <Button onClick={handleClose}> {t('Cancel')} </Button>
          </Modal>
        )}
      </section>

      <h2> {t('Finished')} </h2>

      <section>
        <p> {mockData} </p>
        <Button onClick={handleShow}> {t('Edit')} </Button>
        {show && (
          <Modal
            className={classes.buttonsModal}
            onClick={handleClose}
          >
            <Button> {t('Remove')} </Button>
            <Button onClick={handleClose}> {t('Cancel')} </Button>
          </Modal>
        )}
      </section>

      <h2> {t('Completed 100% Achievements')} </h2>

      <section>
        <p> {mockData} </p>
        <Button onClick={handleShow}> {t('Edit')} </Button>
        {show && (
          <Modal
            className={classes.buttonsModal}
            onClick={handleClose}
          >
            <Button> {t('Remove')} </Button>
            <Button onClick={handleClose}> {t('Cancel')} </Button>
          </Modal>
        )}
      </section>

      <h2>{t('Never Played')} </h2>

      <section>
        <p> {mockData} </p>
        <Button onClick={handleShow}> {t('Edit')} </Button>
        {show && (
          <Modal
            className={classes.buttonsModal}
            onClick={handleClose}
          >
            <Button> {t('Remove')} </Button>
            <Button onClick={handleClose}> {t('Cancel')} </Button>
          </Modal>
        )}
      </section>

    </div>
  );
}

export default GameList;
