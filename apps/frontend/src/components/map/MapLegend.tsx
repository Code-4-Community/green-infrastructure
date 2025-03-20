import styled from 'styled-components';
import { Checkbox, Image, Space, Typography } from 'antd';
import { ReactNode, useState } from 'react';
import { SITE_STATUS_ROADMAP } from '../../constants';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Collapse, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import generateCircleSVG from '../../images/markers/circle';
import generateDiamondSVG from '../../images/markers/diamond';
import generateSquareSVG from '../../images/markers/square';
import generateStarSVG from '../../images/markers/star';
import generateTriangleSVG from '../../images/markers/triangle';
import squareSVG from '../../images/markers/square.svg';
import triangleSVG from '../../images/markers/triangle.svg';
import circleSVG from '../../images/markers/circle.svg';
import diamondSVG from '../../images/markers/diamond.svg';
import starSVG from '../../images/markers/star.svg';
import pentagonSVG from '../../images/markers/pentagon.svg';
import { CheckboxOptionType } from 'antd/es/checkbox/Group';

type CheckboxValueType = string | number | boolean;

const Title = styled.h1`
font-size: 15px;
font-weight: bold; 
font-family: Montserrat;
margin-top: 0px
margin-bottom: 0px;
color: #091F2F;
text-align: center;
`;

const Heading = styled.h2`
  color: rgba(88, 88, 91, 1);
  text-align: center;
  font-family: Lora;
  font-size: 15px;
  margin-top: 0px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
`;

const MapLegendContainer = styled.div<{ isVisible: boolean }>`
  background: rgba(255, 253, 253, 1);
  width: 247px;
  gap: 20px;
  padding-right: 0px;
  position: relative;
  transition: height 0.3s ease;
  min-height: ${(props) => (props.isVisible ? '20px' : 'auto')};
  height: ${(props) => (props.isVisible ? '475px' : 'auto')};
  overflow: hidden;
`;

const LegendItem = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding-left: 10px;
  align-items: center;
  margin: 10px;
`;

const LegendImage = styled(Image)`
  height: 20px;
  width: 20px;
  justify-content: center;
  display: inline-block;
`;

const LegendText = styled.div`
  margin-left: 15px;
`;

const FeatureContainer = styled.div`
  width: 90%;
  height: 284px;
  margin: 10px;
  padding-top: 10px;
  background: rgba(242, 242, 242, 1);
`;

const StatusCheckbox = styled(Checkbox.Group)`
  height: 12px;
  width: 200px;
  color: #fff;
  border: line;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #e74c3c;
    border-color: #e74c3c;
  }
`;

const StatusContainer = styled.div`
  width: 206px;
  height: 79px;
  margin: 10px;
  background: rgba(242, 242, 242, 1);
`;

const StyledButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? '#45789C' : '#fff')};
  height: 36px;
  width: 187px;
  border-style: solid;
  border-color: black;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 0em;
  text-align: left;
  align-items: center;
  color: ${(props) => (props.isSelected ? '#fff' : 'rgba(24, 112, 188, 1)')};
  display: flex;
  &:hover {
    background-color: ${(props) => (props.isSelected ? '#45789C' : '#45789C')};
    color: ${(props) => (props.isSelected ? '#fff' : '#fff')};
  }
`;

const StatusButton = styled.button<{ isSelected: boolean }>`
  // background-color: ${(props) => (props.isSelected ? '#e74c3c' : '#fff')};
  height: 28px;
  width: 187px;
  // color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  align-items: center;
  color: rgba(40, 139, 228, 1);
  display: flex;
`;

const ToggleContainer = styled.div<{ isVisible: boolean }>`
  cursor: pointer;
  font-size: 18px;
  position: absolute;
  width: 247px;
  height: 20px;
  z-index: 1;
  display: flex;
  justify-content: center;
  background: #091f2f;
  bottom: 0px;
`;

const CaretDownStyled = styled(CaretDownOutlined)`
  color: #ffffff;
`;

const CaretUpStyled = styled(CaretUpOutlined)`
  color: #ffffff;
`;

const FullWidthSpace = styled(Space)`
  width: 100%;
`;
const statusSpan = (statusIcon: string, labelString: string): ReactNode => {
  return (
    <FullWidthSpace direction={'horizontal'} size={'small'}>
      <LegendImage
        src={statusIcon}
        alt={labelString}
        style={{
          width: '20px',
          height: '20px',
          justifyContent: 'center',
        }}
      />
      <Typography.Text
        style={{
          fontSize: '14px',
          fontFamily: 'Montserrat',
          fontWeight: '600',
          lineHeight: '17px',
          letterSpacing: '0em',
          textAlign: 'left',
          alignItems: 'center',
          color: 'rgba(24, 112, 188, 1)',
        }}
      >
        {labelString.replace(' Sites', '').toUpperCase()}
      </Typography.Text>
    </FullWidthSpace>
  );
};

interface MapLegendProps {
  selectedFeatures: string[];
  setSelectedFeatures: any;
  selectedStatuses: string[];
  setSelectedStatuses: any;
  icons: string[] | null;
}

const MapLegend: React.FC<MapLegendProps> = ({
  selectedFeatures,
  setSelectedFeatures,
  selectedStatuses,
  setSelectedStatuses,
  icons,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const options: CheckboxOptionType[] = SITE_STATUS_ROADMAP.map((option) => {
    return {
      label: statusSpan(option.image, option.label),
      value: option.value,
    };
  });

  const toggleShowLegend = () => {
    setIsVisible((prev) => !prev);
  };

  const [availableIcon, adoptedIcon] =
    icons ?? SITE_STATUS_ROADMAP.map((option) => option.image);

  const handleFeatureClick = (icon: string) => {
    // Check if the icon is already selected
    const isAlreadySelected = selectedFeatures.includes(icon);

    if (isAlreadySelected) {
      // Deselect the icon
      setSelectedFeatures((prevSelectedFeatures: string[]) =>
        prevSelectedFeatures.filter((selected) => selected !== icon),
      );
    } else {
      // Select the icon
      setSelectedFeatures((prevSelectedFeatures: string[]) => [
        ...prevSelectedFeatures,
        icon,
      ]);
    }
  };

  const handleStatusClick = (values: CheckboxValueType[]) => {
    // set selected statuses
    setSelectedStatuses(values);
  };

  return (
    <Collapse collapsedSize={20} in={isVisible}>
      <MapLegendContainer isVisible={isVisible}>
        <Grid container alignItems="center" display="flex" spacing={0}>
          <Grid
            item
            xs
            style={{ display: 'flex', alignItems: 'center', flex: 1 }}
          >
            <hr
              style={{
                borderTop: '3px solid black',
                width: '90%',
                marginLeft: '20px',
                marginRight: '5px',
              }}
            />
          </Grid>
          <Grid item style={{ textAlign: 'center', paddingTop: '0px' }}>
            <Title>FEATURE TYPE</Title>
          </Grid>
          <Grid
            item
            xs
            style={{ display: 'flex', alignItems: 'center', flex: 1 }}
          >
            <hr
              style={{
                borderTop: '3px solid black',
                width: '90%',
                marginLeft: '5px',
                marginRight: '20px',
              }}
            />
          </Grid>
        </Grid>
        <Heading>Legend and Description</Heading>

        <FeatureContainer>
          <LegendItem>
            {icons && (
              <StyledButton
                onClick={() => handleFeatureClick('Rain Garden')}
                isSelected={selectedFeatures.includes('Rain Garden')}
              >
                <LegendImage
                  src={squareSVG}
                  alt="Square"
                  style={{
                    width: '20px',
                    height: '20px',
                    justifyContent: 'center',
                  }}
                />
                <LegendText>RAIN GARDEN</LegendText>
              </StyledButton>
            )}
          </LegendItem>

          <LegendItem>
            {icons && (
              <StyledButton
                onClick={() => handleFeatureClick('Bioswale')}
                isSelected={selectedFeatures.includes('Bioswale')}
              >
                <LegendImage
                  src={triangleSVG}
                  alt="Triangle"
                  style={{
                    width: '20px',
                    height: '20px',
                    justifyContent: 'center',
                  }}
                />
                <LegendText>BIOSWALE</LegendText>
              </StyledButton>
            )}
          </LegendItem>

          <LegendItem>
            {icons && (
              <StyledButton
                onClick={() => handleFeatureClick('Bioretention')}
                isSelected={selectedFeatures.includes('Bioretention')}
              >
                <LegendImage
                  src={circleSVG}
                  alt="Circle"
                  style={{
                    width: '20px',
                    height: '20px',
                    justifyContent: 'center',
                  }}
                />
                <LegendText>BIORETENTION</LegendText>
              </StyledButton>
            )}
          </LegendItem>

          <LegendItem>
            {icons && (
              <StyledButton
                onClick={() => handleFeatureClick('Porous Paving')}
                isSelected={selectedFeatures.includes('Porous Paving')}
              >
                <LegendImage
                  src={diamondSVG}
                  alt="Diamond"
                  style={{
                    width: '20px',
                    height: '20px',
                    justifyContent: 'center',
                  }}
                />
                <LegendText>POROUS PAVING</LegendText>
              </StyledButton>
            )}
          </LegendItem>

          <LegendItem>
            {icons && (
              <StyledButton
                onClick={() => handleFeatureClick('Tree Trench/Pit')}
                isSelected={selectedFeatures.includes('Tree Trench/Pit')}
              >
                <LegendImage
                  src={starSVG}
                  alt="Star"
                  style={{
                    width: '20px',
                    height: '20px',
                    justifyContent: 'center',
                  }}
                />
                <LegendText>TREE TRENCH/PIT</LegendText>
              </StyledButton>
            )}
          </LegendItem>

          <LegendItem>
            {icons && (
              <StyledButton
                onClick={() => handleFeatureClick('Green Roof/Planter')}
                isSelected={selectedFeatures.includes('Green Roof/Planter')}
              >
                <LegendImage
                  src={pentagonSVG}
                  alt="Pentagon"
                  style={{
                    width: '20px',
                    height: '20px',
                    justifyContent: 'center',
                  }}
                />
                <LegendText>GREEN ROOF/PLANTER</LegendText>
              </StyledButton>
            )}
          </LegendItem>
        </FeatureContainer>

        <StatusContainer>
          <LegendItem>
            {icons && (
              <StatusCheckbox
                onChange={(values) =>
                  handleStatusClick(values as CheckboxValueType[])
                }
                value={selectedStatuses}
                options={options}
              />
            )}
          </LegendItem>
        </StatusContainer>
      </MapLegendContainer>
      <ToggleContainer isVisible={isVisible} onClick={toggleShowLegend}>
        {isVisible ? (
          <ArrowBackIosIcon
            style={{
              transform: 'translateY(-30%) rotate(-90deg)',
              color: 'white',
            }}
          />
        ) : (
          <ArrowBackIosIcon
            style={{
              transform: 'translateY(15%) rotate(90deg)',
              color: 'white',
            }}
          />
        )}
      </ToggleContainer>
    </Collapse>
  );
};

export default MapLegend;
