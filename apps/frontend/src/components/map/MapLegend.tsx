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
import otherSVG from '../../images/markers/other.svg';
import { CheckboxOptionType } from 'antd/es/checkbox/Group';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


type CheckboxValueType = string | number | boolean;

const Title = styled.h1`
  font-size: 16px; /* Title remains 14px */
  font-weight: bold;
  font-family: Montserrat;
  margin-top: 10px;
  margin-bottom: 5px;
  color: #091F2F;
  text-align: left;
  padding-left: 5px;
`;

const MapLegendContainer = styled.div<{ isVisible: boolean }>`
  background: rgba(255, 253, 253, 1);
  width: 280px;
  position: relative;
  transition: height 0.3s ease;
  min-height: ${(props) => (props.isVisible ? '20px' : 'auto')};
  max-height: ${(props) => (props.isVisible ? '600px' : 'auto')};
  overflow-y: auto;
  padding-bottom: 30px;
  padding: 25px 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 5px;
  margin: 10px 0;
`;

const LegendImage = styled(Image)`
  width: 21px;
  height: 20px;
  display: inline-block;
`;


const LegendText = styled.div`
  font-family: 'Lora', serif;
  font-size: 16px; /* Increased text to 16px */
  color: #000;
  line-height: 1.3;
`;

const BoxedGroup = styled.div`
  background-color: #F2F2F2;
  padding: 8px;
  margin: 10px 6px;
  border-radius: 4px;
  width: calc(100% - 12px);
`;

const StatusCheckbox = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  gap: 5px;
`;

const ToggleContainer = styled.div<{ isVisible: boolean }>`
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  width: 280px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0072C4;
  bottom: 0px;
`;

const statusSpan = (statusIcon: string, labelString: string): ReactNode => {
  let color = '#000';
  if (labelString.toLowerCase().includes('adopted')) color = '#DFC22A';
  if (labelString.toLowerCase().includes('available')) color = '#2D6A4F';
  if (labelString.toLowerCase().includes('inactive')) color = '#58585B';

  return (
    <Space size={'small'} direction="horizontal">
      <div style={{ width: '18px', height: '18px', backgroundColor: color }} />
      <Typography.Text style={{ fontSize: '16px', fontFamily: 'Lora', color: '#000' }}>
        {labelString}
      </Typography.Text>
    </Space>
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

  const allFeatureTypes = [
    'Bioretention',
    'Rain Garden',
    'Bioswale',
    'Porous Paving',
    'Tree Trench/Pit',
    'Green Roof/Planter',
    'Other',
  ];

  useState(() => {
    setSelectedFeatures(allFeatureTypes);

    const defaultStatus = SITE_STATUS_ROADMAP.find((s) =>
      s.label.toLowerCase().includes('available')
    );
    if (defaultStatus) {
      setSelectedStatuses([defaultStatus.value]);
    }

    return;
  });

  const options: CheckboxOptionType[] = SITE_STATUS_ROADMAP.map((option) => ({
    label: statusSpan(option.image, option.label),
    value: option.value,
  }));

  const toggleShowLegend = () => {
    setIsVisible((prev) => !prev);
  };

  const handleFeatureClick = (feature: string) => {
    setSelectedFeatures((prevSelected: string[]) => {
      if (prevSelected.includes(feature)) {
        return prevSelected.filter((f) => f !== feature);
      } else {
        return [...prevSelected, feature];
      }
    });
  };

  const CenteredIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

  const handleStatusClick = (values: CheckboxValueType[]) => {
    setSelectedStatuses(values);
  };

  return (
    <Collapse collapsedSize={20} in={isVisible}>
      <MapLegendContainer isVisible={isVisible}>
        <Title>Feature Types</Title>

        <BoxedGroup>
          <LegendItem>
            {icons && (
              <Checkbox checked={selectedFeatures.includes('Bioretention')} onClick={() => handleFeatureClick('Bioretention')} />
            )}
            <LegendImage src={circleSVG} alt="Circle" />
            <LegendText>Bioretention</LegendText>
          </LegendItem>

          <LegendItem>
            {icons && (
              <Checkbox checked={selectedFeatures.includes('Rain Garden')} onClick={() => handleFeatureClick('Rain Garden')} />
            )}
            <LegendImage src={squareSVG} alt="Square" />
            <LegendText>Rain Garden</LegendText>
          </LegendItem>

          <LegendItem>
            {icons && (
              <Checkbox checked={selectedFeatures.includes('Bioswale')} onClick={() => handleFeatureClick('Bioswale')} />
            )}
            <LegendImage src={triangleSVG} alt="Triangle" />
            <LegendText>Bioswale</LegendText>
          </LegendItem>

          <LegendItem>
            {icons && (
              <Checkbox checked={selectedFeatures.includes('Porous Paving')} onClick={() => handleFeatureClick('Porous Paving')} />
            )}
            <LegendImage src={diamondSVG} alt="Diamond" />
            <LegendText>Porous Paving</LegendText>
          </LegendItem>

          <LegendItem>
            {icons && (
              <Checkbox checked={selectedFeatures.includes('Tree Trench/Pit')} onClick={() => handleFeatureClick('Tree Trench/Pit')} />
            )}
            <LegendImage src={starSVG} alt="Star" />
            <LegendText>Tree Trench / Planter</LegendText>
          </LegendItem>

          <LegendItem>
            {icons && (
              <Checkbox checked={selectedFeatures.includes('Green Roof/Planter')} onClick={() => handleFeatureClick('Green Roof/Planter')} />
            )}
            <LegendImage src={pentagonSVG} alt="Pentagon" />
            <LegendText>Green Roof / Planter</LegendText>
          </LegendItem>

          <LegendItem>
            {icons && (
              <Checkbox checked={selectedFeatures.includes('Other')} onChange={() => handleFeatureClick('Other')}/>
            )}
            <LegendImage src={otherSVG} alt="Other" />
            <LegendText>Other</LegendText>
          </LegendItem>

        </BoxedGroup>

        <Title>Status</Title>

        <BoxedGroup>
          <StatusCheckbox onChange={(values) => handleStatusClick(values as CheckboxValueType[])} value={selectedStatuses} options={options} />
        </BoxedGroup>
      </MapLegendContainer>

      <ToggleContainer isVisible={isVisible} onClick={toggleShowLegend}>
  <KeyboardArrowDownIcon
    style={{
      transform: isVisible ? 'rotate(180deg)' : 'rotate(0deg)',
      color: 'white',
      fontSize: '24px',
    }}
  />
</ToggleContainer>



    </Collapse>
  );
};

export default MapLegend;
