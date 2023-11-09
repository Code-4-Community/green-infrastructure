import Map from '../../components/map/Map';
import React, { useState } from 'react';
import Divider from '../Divider';
import About from './About';
import Header from './Header';
import MapLegend from '../../components/map/MapLegend';
import Navbar from '../Navbar';
import { SITE_STATUS_ROADMAP } from '../../constants';
import Tiles from './Tiles';

const icons: string[] = SITE_STATUS_ROADMAP.map((option) => option.image);


export default function MapPage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  return (
    <div style={{ background: 'var(--Foreground, #F2F2F2)' }}>
      <Navbar />
      <div style={{ marginTop: '50px'}} />
      <Header />
      <Divider />
      <div style={{ position: 'relative' }}>
        <Map selectedFeatures={selectedFeatures} selectedStatuses={selectedStatuses} zoom={8} />
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 100 }}>
          <MapLegend selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} selectedStatuses={selectedStatuses} setSelectedStatuses={setSelectedStatuses} icons={icons} />
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 100 }}>
          <input 
            id="pac-input"
            type="text"
            placeholder="Search Box"
            style={{
              width: '200px', 
              height: '40px',
              fontFamily: "Open Sans",
              paddingLeft: '15px'
            }}
          />
        </div>
      </div>
      <Divider />
      <About />
      <Divider />
      <div style={{ paddingTop: '15px'}} />
      <div style={{ alignContent: 'center' }}>
        <Tiles />
      </div>
    </div>
  );
}