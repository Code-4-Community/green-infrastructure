import { useState } from 'react';
import './FlippableTIle.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import generateRedline from '../../assets/images/featuredResourceIcons/RedLine';

export default function FlipCard({ ...props }) {
  const card = props.card;

  const [showBack, setShowBack] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handleClick() {
    setShowBack(!showBack);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <div
      className="flip-card-outer"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flip-card-inner ${showBack ? 'showBack' : ''}`}>
        <div
          className="card front"
          style={{
            backgroundImage: isHovered ? `url(${card.background})` : 'none',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="icon-placeholder col-md-4">
            {card.icon(isHovered)}
          </div>
          <p className="card-text">{card.front}</p>
          <p className="card-text">{generateRedline()}</p>
        </div>
        <div className="card back">
          <p className="card-text text-center">{card.back}</p>
        </div>
      </div>
    </div>
  );
}
