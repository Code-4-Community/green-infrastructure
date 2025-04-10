import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar';
import VolunteerDashboard from '../../components/volunteerDashboard/VolunteerDashboard';
import MaintenanceChecklistPopup from '../../components/volunteerDashboard/MaintenanceChecklistPopup';
import Map from '../../components/map/Map';
import MapLegend from '../../components/map/MapLegend';
import { useState } from 'react';
import { SITE_STATUS_ROADMAP } from '../../constants';
import useAxios from '../../services/axios';

const icons: string[] = SITE_STATUS_ROADMAP.map((option) => option.image);

export default function VolunteerPage() {
  const axiosInstance = useAxios()
  const { userID, isAuthenticated } = useAuth();

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [maintenanceChecklistOpen, setMaintenanceChecklistOpen] = useState(false);

  console.log('in volunteer dashboard')
  console.log(userID)
  console.log(isAuthenticated)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Send login request to backend
      const response = await axiosInstance.get(`/users/${userID}`);
      console.log(response.data)
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '50px' }} />
      <button style={{ width: '100px', height: '100px', }} onClick={handleSubmit}/>
      <VolunteerDashboard
        setMaintenanceChecklistOpen={setMaintenanceChecklistOpen}
      />
      <MaintenanceChecklistPopup
        maintenanceChecklistOpen={maintenanceChecklistOpen}
        setMaintenanceChecklistOpen={setMaintenanceChecklistOpen}
      />
      <div
        style={{
          position: 'relative',
          width: '88%',
          margin: '0 auto',
          paddingBottom: '7%',
        }}
      >
        <Map
          selectedFeatures={selectedFeatures}
          selectedStatuses={selectedStatuses}
          zoom={8}
        />
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 100 }}>
          <MapLegend
            selectedFeatures={selectedFeatures}
            setSelectedFeatures={setSelectedFeatures}
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
            icons={icons}
          />
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 100 }}>
          <input
            id="pac-input"
            type="text"
            placeholder="Search Box"
            style={{
              width: '200px',
              height: '40px',
              fontFamily: 'Open Sans',
              paddingLeft: '15px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
