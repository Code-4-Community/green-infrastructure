import React, { useState } from 'react';
import DashboardMap from '../../components/map/DashboardMap';
import MapLegend from '../../components/map/MapLegend';
import { SITE_STATUS_ROADMAP } from '../../constants';

const VolunteerDashboard = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedSite, setSelectedSite] = useState('Most recently adopted');

  const icons = SITE_STATUS_ROADMAP.map((option) => option.image);

  const mockData = [
    { siteName: 'Bioswale 1', featureType: 'Bioswale', address: '123 1st street', yearBuilt: '2016', lastMaintenance: '9/4/2024' },
    { siteName: 'Rain Garden 1', featureType: 'Rain Garden', address: '14 Beacon Ave', yearBuilt: '2022', lastMaintenance: '5/16/2023' },
    { siteName: 'Green Roof 2', featureType: 'Green Roof', address: '1222 Massachusetts Ave', yearBuilt: '2024', lastMaintenance: '6/30/2019' },
    { siteName: 'Porous Paving 1', featureType: 'Porous Paving', address: '6 Cambridge Street', yearBuilt: '2011', lastMaintenance: '8/27/2024' },
    { siteName: 'Green Roof 4', featureType: 'Green Roof', address: '12 Camden Ave', yearBuilt: '1998', lastMaintenance: '11/13/2023' },
    { siteName: 'Tree Trench 6', featureType: 'Tree Trench', address: '34 Nubian Street', yearBuilt: '2005', lastMaintenance: '4/11/2024' }
  ];

  return (
    <div style={{ padding: '0 10%' }}>
      {/* Header and Stats Container */}
      <div style={{ padding: '0 24px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>Welcome, Jane Doe</h1>
        <p style={{ marginBottom: '24px' }}>
          Welcome to the City's Office of Green Infrastructure Volunteer Program dashboard!
        </p>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '48px', marginBottom: '32px' }}>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', marginRight: '8px' }}>10</span>
            <span>Green Infrastructure<br/>Adopted</span>
          </div>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', marginRight: '8px' }}>1</span>
            <span>Year<br/>Volunteering</span>
          </div>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', marginRight: '8px' }}>7</span>
            <span>Group<br/>Adoptions</span>
          </div>
        </div>
      </div>

      {/* Map and Cards Container */}
      <div style={{ 
        display: 'flex',
        width: '100%',
        padding: '0 24px',
        marginBottom: '24px',
        gap: '24px'
      }}>
        {/* Left Column - Map */}
        <div style={{ 
          width: '50%',
          position: 'relative',
          height:'70%',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            paddingTop: '100%', 
            position: 'relative'
          }}>
            <div style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}>
              <DashboardMap
                selectedFeatures={selectedFeatures}
                selectedStatuses={selectedStatuses}
                zoom={8}
              />
            </div>
            <input
              id="pac-input"
              type="text"
              placeholder="Search by address"
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                zIndex: 1,
                width: '250px',
                height: '40px',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
              <MapLegend
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
                selectedStatuses={selectedStatuses}
                setSelectedStatuses={setSelectedStatuses}
                icons={icons}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Cards */}
        <div style={{ 
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div style={{ 
            padding: '24px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Maintenance Guide</h2>
          </div>

          <div style={{ 
            padding: '24px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Videos</h2>
          </div>

          <div style={{ 
            padding: '24px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              Maintenance Visit Checklist
            </h2>
            <p style={{ marginBottom: '12px' }}>Select the site you'd like to see a checklist for:</p>
            <select
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            >
              <option>Most recently adopted</option>
              <option>Rain Garden 1</option>
              <option>Green Roof 1</option>
              <option>Tree Trench 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>My Adopted Green Infrastructure</h2>
          <div style={{ display: 'flex', gap: '16px' }}>
            <input
              type="text"
              placeholder="Search for a site"
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                width: '200px'
              }}
            />
            <select style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}>
              <option>Filter 1</option>
            </select>
            <select style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}>
              <option>Filter 2</option>
            </select>
          </div>
        </div>

        <table style={{ 
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          marginBottom: '24px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Site Name</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Feature Type</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Address</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Year Built</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Last Maintenance Date</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, index) => (
              <tr key={index}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>{row.siteName}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>{row.featureType}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>{row.address}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>{row.yearBuilt}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>{row.lastMaintenance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerDashboard;