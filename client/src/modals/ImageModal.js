import { React } from 'react';
import './ImageModal.css';

function ImageModal(props) { 
  const image = props.image;
  return (
    <div className="image-modal">
      <div className="image-modal-content">
        <img 
          src={image} 
          alt='popup'
        />
      </div>
      <div className='image-modal-panel d-flex'>
        <button 
          className="image-modal-button-close" 
          onClick={
            () => props.sendConfirm(false)
          }
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ImageModal;