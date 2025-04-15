import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../Navbar';
import { CSSProperties, useEffect, useState } from 'react';
import AdoptedGIBlock from './AdoptedGIBlock';
import BioswaleImage from './BioswaleImage.png';
import { SiteType, SITES } from '../../GIBostonSites';
import { fetchSiteInfo, fetchUserInfo } from '../volunteerPage/VolunteerPage';

const containerStyles: CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '6%',
  paddingTop: '4%',
};

const titleStyles: CSSProperties = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '30px',
  fontWeight: '600',
};

const rowStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  width: '92%',
  marginTop: '2%',
};

const bioswaleTitleStyles: CSSProperties = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '25px',
  fontWeight: '600',
};

const blueLineStyle: CSSProperties = {
  width: '100%',
  height: '3px',
  backgroundColor: '#288BE4',
  marginTop: '1.5%',
};

interface FormControlsProps {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  selectedName: string;
  setSelectedName: (value: string) => void;
}
function RenderFormControls({
  selectedFilter,
  setSelectedFilter,
  selectedName,
  setSelectedName,
}: FormControlsProps) {
  const handleSiteTypeChange = (event: { target: { value: string } }) => {
    setSelectedFilter(event.target.value);
  };
  const handleNameChange = (event: { target: { value: string } }) => {
    setSelectedName(event.target.value);
  };
  return (
    <div style={rowStyles}>
      <FormControl
        variant="filled"
        sx={{ width: '20%', marginRight: '20px' }}
        size="small"
      >
        <InputLabel
          id="filter-one-select"
          sx={{ fontFamily: 'Montserrat, sans-serif', color: 'black' }}
        >
          Site Type
        </InputLabel>
        <Select
          labelId="filter-one-select"
          label="Filter 1"
          value={selectedFilter}
          onChange={handleSiteTypeChange}
          sx={{ borderRadius: '7px' }}
          disableUnderline
        >
          <MenuItem value="" style={{ color: 'grey' }}>
            Show All
          </MenuItem>
          <MenuItem value="Rain Garden">Rain Garden</MenuItem>
          <MenuItem value="Bioswale">Bioswale</MenuItem>
          <MenuItem value="Bioretention">Bioretention</MenuItem>
          <MenuItem value="Porous Paving">Porous Paving</MenuItem>
          <MenuItem value="Tree Trench/Pit">Tree Trench/Pit</MenuItem>
          <MenuItem value="Green Roof/Planter">Green Roof/Planter</MenuItem>
          <MenuItem value="Curb Inlet">Curb Inlet</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="filled-search"
        label="Search for a site"
        value={selectedName}
        onChange={handleNameChange}
        type="search"
        sx={{ width: '50%' }}
        variant="filled"
        size="small"
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          style: { fontFamily: 'Montserrat, sans-serif', color: 'black' },
        }}
      />
    </div>
  );
}

export default function MyAdoptedGIPage() {
  const [sites, setSites] = useState<Array<SiteType>>([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    async function fetchData() {
      console.log('test test testDENNIS');
      const volunteerInfo = await fetchUserInfo();
      console.log('volunteerInfo', volunteerInfo);

      const sitePromises = volunteerInfo.siteIds.map(async (siteId: number) => {
        const siteData = await fetchSiteInfo(siteId);
        return {
          'Object ID?': siteData.siteID,
          'Asset Name': siteData.siteName,
          'Asset Type': siteData.symbolType,
          'Symbol Type': siteData.symbolType,
          Lat: siteData.siteLatitude,
          Long: siteData.siteLongitude,
          Address: siteData.address,
          Neighborhood: siteData.neighborhood,
          'Partner Depts.': '',
          'Maintenance Agreement?': '',
          'Link to Maintenance Agreement': '',
          'Link to Maintenance Checklist': '',
          'Link to Construction Cost + Plans': '',
          'Link to RFQ or Bid Invitation': '',
          'Link to Final Reports': '',
        };
      });

      const allSites = await Promise.all(sitePromises);
      setSites(allSites);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={containerStyles}>
        <div style={titleStyles}>My Adopted Green Infrastructure</div>
        <RenderFormControls
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedName={selectedName}
          setSelectedName={setSelectedName}
        />
      </div>
      <div
        style={{
          width: '65%',
          position: 'absolute',
          right: '7.5%',
          marginTop: '3%',
        }}
      >
        <div style={bioswaleTitleStyles}>Features</div>
        <div className="blueLine" style={blueLineStyle} />
        {sites
          .filter((props) =>
            props['Asset Type']
              .toLowerCase()
              .includes(selectedFilter.toLowerCase()),
          )
          .filter((props) =>
            props['Asset Name']
              .toLowerCase()
              .includes(selectedName.toLowerCase()),
          )
          .map((props, index) => (
            <AdoptedGIBlock
              key={index}
              img={BioswaleImage}
              featureName={props['Asset Name']}
              featureType={props['Asset Type']}
              featureAddress={props['Address']}
              lastMaintenanceDate="Last Maintenance Date"
            />
          ))}
      </div>
    </div>
  );
}
