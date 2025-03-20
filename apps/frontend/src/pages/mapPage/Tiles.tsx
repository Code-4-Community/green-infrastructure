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
import Bench from '../../assets/images/featuredResourcePictures/Bench.png';
import Arrow from '../../assets/images/featuredResourceIcons/FeaturesArrow.png';
import './featuresStyles.css';
import { border } from '@chakra-ui/react';

const cards = [
  {
    id: '0',
    front: 'Rain Garden',
    back: 'Small shallow depressed planted areas consisting of biosoil and simple plant palettes.',
    icon: generateRainGardenSVG,
    background: RainGarden,
  },
  {
    id: '1',
    front: 'Porous Paving',
    back: `Paving materials, like asphalt, concrete or pavers, with voids or gaps that
    water is able to pass through.`,
    icon: generatePorousPavingSVG,
    background: PorousPaving,
  },
  {
    id: '2',
    front: 'Bioswale',
    back: `Medium-sized depressed planted features that are often longer than they are wide
    and may have overflow structures/pipes.`,
    icon: generateBioswaleIcon,
    background: Bioswale,
  },
  {
    id: '3',
    front: 'Tree Trench /Planter',
    back: `Hybrid features that are planted with trees at the surface and have
    subsurface infiltration areas that give trees access to large volumes of stormwater
    while it absorbs into the ground.`,
    icon: generateTreeTrenchPlanterSVG,
    background: TreeTrench,
  },
  {
    id: '4',
    front: 'Biorentention',
    back: `Larger depressed planted features that vary in size and shape and can capture
    and infiltrate larger volumes of runoff (typically have pipes and structures).`,
    icon: generateBioretentionSVG,
    background: Bioretention,
  },
  {
    id: '5',
    front: 'Green Roof /Planter',
    back: `Vegetated areas, at ground level or on roofs, that consist of planting
    soil or other lightweight planting materials, and native plants.`,
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
      <div style={{ marginTop: '20px', justifyContent: 'center' }}>
        <div className="container" style={{ display: 'flex', gap: '20px' }}>
          <div
            className="col text-wrap green-box bench-photo"
            style={{
              backgroundImage: `url(${Bench})`,
            }}
          >
            <div className="green-box default-box"></div>
            <div className="green-box features-text">
              Learn About the Feature Types
              <img
                alt="arrow pointing to the feature types to the right"
                src={Arrow}
              />
            </div>
          </div>

          <div
            className="row row-cols-1 row-cols-md-5"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flex: '4',
            }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="col"
                style={{
                  minWidth: '200px',
                  maxHeight: '240px',
                  minHeight: '200px',
                  flex: '1 1 calc(33.333% - 20px)',
                  boxSizing: 'border-box',
                  aspectRatio: '1 / 1',
                  display: 'flex',
                  paddingBottom: '10px',
                }}
              >
                <FlippableTile
                  card={card}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
