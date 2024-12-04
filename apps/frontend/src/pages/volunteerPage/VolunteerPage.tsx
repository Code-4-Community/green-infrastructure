import Navbar from '../Navbar';
import VolunteerDashboard from '../../components/volunteerDashboard/VolunteerDashboard';
import MaintenanceChecklistPopup from '../../components/volunteerDashboard/MaintenanceChecklistPopup';
import Map from '../../components/map/Map';
import MapLegend from '../../components/map/MapLegend';
import { useState } from 'react';
import { SITE_STATUS_ROADMAP } from '../../constants';

const icons: string[] = SITE_STATUS_ROADMAP.map((option) => option.image);

export default function VolunteerPage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [maintenanceChecklistOpen, setMaintenanceChecklistOpen] =
    useState(false);

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '50px' }} />
      <VolunteerDashboard/>
      <MaintenanceChecklistPopup
        maintenanceChecklistOpen={maintenanceChecklistOpen}
        setMaintenanceChecklistOpen={setMaintenanceChecklistOpen}
      />
    </div>
  );
}
