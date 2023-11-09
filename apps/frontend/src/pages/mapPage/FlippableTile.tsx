import { useState } from "react"; 
import './FlippableTile.scss';
import "bootstrap/dist/css/bootstrap.min.css";

export default function FlipCard({ ...props }) {
  const card = props.card;

  const [showBack, setShowBack] = useState(false); 

  function handleClick() { 
    setShowBack(!showBack); 
  } 

  return (
    <div className="flip-card-outer" onClick={handleClick}>
      <div className={`flip-card-inner ${showBack ? 'showBack' : ''}`}>
        <div className="card front">
          <div className="card-body d-flex justify-content-around align-items-center row">
            <div className="icon-placeholder col-md-4"></div>
            <p className="card-text text-center">{card.front}</p>
          </div>
        </div>
        <div className="card back">
          <div className="card-body d-flex justify-content-around align-items-center">
            <p className="card-text text-center">{card.back}</p>
          </div>
        </div>
      </div>
    </div>
  );
}