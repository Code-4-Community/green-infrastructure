import Map from '../../components/map/Map';
import React, { useState } from 'react';
import Divider from '../Divider';
import Resources from './Resources';
import Header from './Header';
import MapPreview from '../../assets/images/siteIcons/mapPreview.png';
import Navbar from '../Navbar';
import { SITE_STATUS_ROADMAP } from '../../constants';

const icons: string[] = SITE_STATUS_ROADMAP.map((option) => option.image);

export default function VolunteerPage() {
  return (
    <div style={{ background: 'var(--Foreground, #F2F2F2)' }}>
      <Navbar />
      <div style={{ marginTop: '50px' }} />
      <Header />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          background: 'white',
          padding: '50px 40px',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <img src={MapPreview} />
        <a
          href=""
          style={{
            top: '50%',
            left: '50%',
            fontSize: '27px',
            fontWeight: 'bold',
            fontFamily: 'Helvetica',
            lineHeight: '49px',
            color: '#091F2F',
          }}
        >
          VIEW THE INTERACTIVE MAP &rarr;
        </a>
      </div>
      <Divider />
      <Resources />
      <Divider />
      <div style={{ paddingTop: '15px' }} />
    </div>
  );
}
