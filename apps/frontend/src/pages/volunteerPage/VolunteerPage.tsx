import Navbar from '../Navbar';
import VolunteerDashboard from '../../components/volunteerDashboard/VolunteerDashboard';
import MaintenanceChecklistPopup from '../../components/volunteerDashboard/MaintenanceChecklistPopup';
import Map from '../../components/map/Map';
import MapLegend from '../../components/map/MapLegend';
import { useEffect, useState } from 'react';
import { SITE_STATUS_ROADMAP } from '../../constants';
import axios from 'axios';

const icons: string[] = SITE_STATUS_ROADMAP.map((option) => option.image);
export enum Role {
  VOLUNTEER = 'Volunteer',
  ADMIN = 'Admin',
}

export enum UserStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  DENIED = 'Denied',
}
export interface UserModel {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  siteIds: number[];
  zipCode: number;
  birthDate: Date;
  role: Role;
  status: UserStatus;
}

export enum SiteStatus {
  ADOPTED = 'Adopted',
  AVAILABLE = 'Available',
  INACTIVE = 'Inactive',
}

export enum SymbolType {
  RAIN_GARDEN = 'Rain Garden',
  BIOSWALE = 'Bioswale',
  BIORETENTION = 'Bioretention',
  TREE_TRENCH_PIT = 'Tree Trench/Pit',
  GREEN_ROOF_PLANTER = 'Green Roof/Planter',
}

export type SiteModel = {
  siteID: number;
  siteName: string;
  siteStatus: SiteStatus;
  assetType: string;
  symbolType: SymbolType;
  siteLatitude: string;
  siteLongitude: number;
  dateAdopted: Date;
  maintenanceReports: number[];
  neighborhood: string;
  address: string;
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchUserInfo = async () => {
  const tempUserID = '400';
    const response = await axios.get(
    `${baseUrl}/users/${tempUserID}`,
  );
  if (response.status !== 200) {
    console.error('Failed to fetch user information');
    console.error(response);
  }
  const userData: UserModel = await response.data;
  return userData;
};
export const fetchSiteInfo = async (siteId: number) => {
  const response = await axios.get(
    `${baseUrl}/sites/${siteId}`,
  );
  if (response.status !== 200) {
    console.error('Failed to fetch site information');
    console.error(response);
  }
  const siteData: SiteModel = await response.data;
  return siteData;
};

export default function VolunteerPage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [maintenanceChecklistOpen, setMaintenanceChecklistOpen] =
    useState(false);
  const [volunteerInfo, setVolunteerInfo] = useState<UserModel | null>(null);

  useEffect(() => {
    async function fetchData() {
      const volunteerInfo = await fetchUserInfo();
      setVolunteerInfo(volunteerInfo);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '50px' }} />
      <VolunteerDashboard
        setMaintenanceChecklistOpen={setMaintenanceChecklistOpen}
        userData={volunteerInfo}
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
