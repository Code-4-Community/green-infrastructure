import FlippableTile from './FlippableTile';
import generateBioretentionSVG from '../../assets/images/featuredResourceIcons/BioretentionIcon';
import generateBioswaleIcon from '../../assets/images/featuredResourceIcons/BioswaleIcon';
import generateGreenRoofPlanterSVG from '../../assets/images/featuredResourceIcons/GreenRoofPlanterIcon';
import generatePorousPavingSVG from '../../assets/images/featuredResourceIcons/PorousPavingIcon';
import generateRainGardenSVG from '../../assets/images/featuredResourceIcons/RainGardenIcon';
import generateTreeTrenchPlanterSVG from '../../assets/images/featuredResourceIcons/TreeTrenchPlanterIcon';
import Bioretention from '../../assets/images/featuredResourcePictures/Bioretention.png';
import Bioswale from '../../assets/images/featuredResourcePictures/Bioswale.png';
import GreenRoofPlanter from '../../assets/images/featuredResourcePictures/GreenRoofPlanter.png';
import PorousPaving from '../../assets/images/featuredResourcePictures/PorousPaving.png';
import RainGarden from '../../assets/images/featuredResourcePictures/RainGarden.png';
import TreeTrench from '../../assets/images/featuredResourcePictures/TreeTrench.png';

const cards = [
  {
    id: '0',
    front: 'Rain Garden',
    back: 'back',
    icon: generateRainGardenSVG,
    background: RainGarden,
  },
  {
    id: '1',
    front: 'Porous Paving',
    back: 'back',
    icon: generatePorousPavingSVG,
    background: PorousPaving,
  },
  {
    id: '2',
    front: 'Bioswale',
    back: 'back',
    icon: generateBioswaleIcon,
    background: Bioswale,
  },
  {
    id: '3',
    front: 'Tree Trench /Planter',
    back: 'back',
    icon: generateTreeTrenchPlanterSVG,
    background: TreeTrench,
  },
  {
    id: '4',
    front: 'Biorentention',
    back: 'back',
    icon: generateBioretentionSVG,
    background: Bioretention,
  },
  {
    id: '5',
    front: 'Green Roof /Planter',
    back: 'back',
    icon: generateGreenRoofPlanterSVG,
    background: GreenRoofPlanter,
  },
];

export default function App() {
  return (
    <div
      className="resources"
      style={{
        display: 'flex',
        padding: '20px 40px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '15px',
        flexShrink: '0',
        background: 'white',
      }}
    >
      <p
        style={{
          color: 'var(--Text-Primary, #091F2F)',
          fontFamily: 'Montserrat',
          fontSize: '27px',
          fontStyle: 'bold',
          fontWeight: '1200',
          lineHeight: '33px',
          textDecorationLine: 'underline',
          letterSpacing: '0em',
          margin: '0',
        }}
      >
        <u>FEATURED RESOURCES →</u>
      </p>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-auto text-center">
            {cards.slice(0, 2).map((card) => (
              <FlippableTile key={card.id} card={card} />
            ))}
          </div>
          <div className="col-md-auto text-center">
            {cards.slice(2, 4).map((card) => (
              <FlippableTile key={card.id} card={card} />
            ))}
          </div>
          <div className="col-md-auto text-center">
            {cards.slice(4, 6).map((card) => (
              <FlippableTile key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
