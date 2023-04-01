import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClick} />;
}

function ModalOverlay(props) {
  return (
    <div className={`${classes.modal} ${props.className}`}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

const portalElement = document.getElementById('overlays');

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={props.className}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;
