import { Loader } from '@googlemaps/js-api-loader';
// import { createMapIcon, MapIcon } from './components/mapIcon/MapIcon';
// import { createMapPoint, MapPoint } from './components/mapIcon/MapPoint';
// import { allSvgMarkers } from './components/mapIcon/MapIconDesigns';
import availableIcon from './assets/images/siteIcons/availableIcon.jpg';
import adoptedIcon from './assets/images/siteIcons/adoptedIcon.png';
import invalidIcon from './assets/images/siteIcons/invalidicon.png';

export const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places'],
});

// defines the boundaries for the map
export const BOSTON_BOUNDS = {
  north: 42.42,
  south: 42.2,
  west: -71.28,
  east: -70.83,
};

export type SiteStatus = 'Available' | 'Adopted' | 'Invalid';

interface SiteStatusOption {
  image: string;
  label: string;
  value: SiteStatus;
}

export const SITE_STATUS_ROADMAP: SiteStatusOption[] = [
  {
    image: availableIcon,
    label: 'Available Sites',
    value: 'Available',
  },
  {
    image: adoptedIcon,
    label: 'Adopted Sites',
    value: 'Adopted',
  },
  {
    image: invalidIcon,
    label: 'Invalid Sites',
    value: 'Invalid',
  },
];

export const BOSTON_PLACE_ID = 'ChIJGzE9DS1l44kRoOhiASS_fHg';
