import React, { useEffect, useRef, useState } from 'react';
import { loader, BOSTON_BOUNDS } from '../../constants';
import styled from 'styled-components';
import generateCircleSVG from '../../images/markers/circle';
import generateSquareSVG from '../../images/markers/square';
import generateDiamondSVG from '../../images/markers/diamond';
import generateTriangleSVG from '../../images/markers/triangle';
import generateStarSVG from '../../images/markers/star';
import generatePentagonSVG from '../../images/markers/pentagon';
import generateOtherSVG from '../../images/markers/other';
import PopupBox from '../mapIcon/PopupBox';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import SignUpPage from '../volunteer/signup/SignUpPage';
import { MarkEmailReadTwoTone } from '@mui/icons-material';

const MapDiv = styled.div`
  height: 100%;
`;

async function fetchAllSites() {
  const response = await fetch('http://localhost:3000/sites');
  if (!response.ok) {
    throw new Error('Failed to fetch site data');
  }
  return response.json();
}

const iconGenerators = {
  'Rain Garden': generateSquareSVG,
  Bioswale: generateTriangleSVG,
  Bioretention: generateCircleSVG,
  'Porous Paving': generateDiamondSVG,
  'Tree Trench/Pit': generateStarSVG,
  'Green Roof/Planter': generatePentagonSVG,

  Other: generateOtherSVG, // Placeholder, will remove
} as const;

type SymbolType = keyof typeof iconGenerators;

function isValidSymbolType(symbol: string): symbol is SymbolType {
  return symbol in iconGenerators;
}

function filterMarkers(
  selectedFeatures: string[],
  selectedStatuses: string[],
  markers: google.maps.Marker[],
  map: google.maps.Map,
) {
  let tempMarkers: google.maps.Marker[] = [];
  if (selectedFeatures.length === 0) {
    markers.forEach((marker: google.maps.Marker) => {
      marker.setMap(map);
    });
    tempMarkers = markers;
  } else {
    markers.forEach((marker: google.maps.Marker) => marker.setMap(null));
    markers.forEach((marker: google.maps.Marker) => {
      const featureType = marker.get('featureType');
      if (selectedFeatures.includes(featureType)) {
        marker.setMap(map);
        tempMarkers.push(marker);
      }
    });
  }

  if (selectedStatuses.length === 0) {
    tempMarkers.forEach((marker: google.maps.Marker) => {
      marker.setMap(map);
    });
  } else {
    tempMarkers.forEach((marker: google.maps.Marker) => marker.setMap(null));
    tempMarkers.forEach((marker: google.maps.Marker) => {
      const status = marker.get('status');
      if (selectedStatuses.includes(status)) {
        marker.setMap(map);
      }
    });
  }
}

interface MapProps {
  readonly zoom: number;
  selectedFeatures: string[];
  selectedStatuses: string[];
  query: string;
}

const Map: React.FC<MapProps> = ({
  zoom,
  selectedFeatures,
  selectedStatuses,
  query
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const allMarkersRef = useRef<google.maps.Marker[]>([]);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  // CHANGED: State to store the selected site's ID.
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  let map: google.maps.Map;

  useEffect(() => {
    if (!mapRef.current) return;

    loader.load().then(async () => {
      const map = new google.maps.Map(mapRef.current as HTMLElement, {
        center: { lat: 42.36, lng: -71.06 },
        zoom: zoom,
        mapId: '3aa9b524d13192b',
        mapTypeControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
        streetViewControl: false,
        restriction: {
          latLngBounds: BOSTON_BOUNDS,
          strictBounds: false,
        },
      });

      mapInstanceRef.current = map;

      try {
        const sites = await fetchAllSites();
        const markersArray: google.maps.Marker[] = [];

        sites.forEach((markerInfo: any) => {
          const symbolType = markerInfo.symbolType;

          if (!isValidSymbolType(symbolType)) {
            console.warn(`Unknown symbol type: ${symbolType}`);
            return;
          }

          let typeColor = '#58585B';
          if (markerInfo.siteStatus === 'Available') {
            typeColor = '#2D6A4F'; // Green
          } else if (markerInfo.siteStatus === 'Adopted') {
            typeColor = '#DFC22A'; // Yellow (match legend)
          } else if (markerInfo.siteStatus === 'Inactive') {
            typeColor = '#58585B'; // Gray
          }

          const generateIcon = iconGenerators[symbolType];
          const tempIcon = generateIcon(typeColor);
          const typeIcon = `data:image/svg+xml;utf8,${encodeURIComponent(
            tempIcon,
          )}`;

          const infoWindowContent = document.createElement('div');
          infoWindowContent.id = 'info-window-content';

          const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
          });

          const infoWindowRoot = createRoot(infoWindowContent);
          infoWindowRoot.render(
            createPortal(
              <PopupBox
                setShowSignUp={setShowSignUp}
                name={markerInfo.siteName}
                location={markerInfo.address}
                status={markerInfo.siteStatus}
                type={symbolType}
                color={typeColor}
                svgFunction={generateIcon}
              />,
              infoWindowContent,
            ),
          );

          const customIcon = {
            url: typeIcon,
            size: new google.maps.Size(21, 20),
            scaledSize: new google.maps.Size(21, 20),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(10, 10),
          };

          const marker = new google.maps.Marker({
            position: {
              lat: Number(markerInfo.siteLatitude),
              lng: Number(markerInfo.siteLongitude),
            },
            map: null, // Don't add to map yet
            icon: customIcon,
          });

          marker.set('featureType', symbolType);
          marker.set('status', markerInfo.siteStatus);
          marker.set('siteData', markerInfo); // Store all site data for searching

          marker.addListener('click', () => {
            if (currentInfoWindow.current) {
              currentInfoWindow.current.close();
            }
            infoWindow.open(map, marker);
            currentInfoWindow.current = infoWindow;

            setSelectedSiteId(markerInfo.siteID);
          });

          markersArray.push(marker);
        });

        allMarkersRef.current = markersArray;
        
        // Initial filtering
        updateVisibleMarkers();
      } catch (error) {
        console.error('Failed to load sites:', error);
      }
    });
  }, []); // Only run on mount

  // Separate effect for filtering markers
  useEffect(() => {
    updateVisibleMarkers();
  }, [query, selectedFeatures, selectedStatuses]);

  const updateVisibleMarkers = () => {
    if (!mapInstanceRef.current) return;
    
    const map = mapInstanceRef.current;
    const allMarkers = allMarkersRef.current;
    
    // Hide all markers first
    allMarkers.forEach(marker => marker.setMap(null));
    
    // Apply filters and search query
    allMarkers.forEach(marker => {
      const featureType = marker.get('featureType');
      const status = marker.get('status');
      const siteData = marker.get('siteData');
      
      // Apply feature type filter
      const passesFeatureFilter = 
        selectedFeatures.length === 0 || 
        selectedFeatures.includes(featureType);
      
      // Apply status filter
      const passesStatusFilter = 
        selectedStatuses.length === 0 || 
        selectedStatuses.includes(status);
      
      // Apply search query filter
      const passesSearchFilter = 
        !query || 
        siteData.siteName.toLowerCase().includes(query.toLowerCase());
      
      // Show marker if it passes all filters
      if (passesFeatureFilter && passesStatusFilter && passesSearchFilter) {
        marker.setMap(map);
      }
    });
  };
  

  return (
    <div>
      <MapDiv
        id="map"
        ref={mapRef}
        style={{ width: '100%', height: '675px' }}
      />
      {}
      {showSignUp && (
        <SignUpPage setShowSignUp={setShowSignUp} siteID={selectedSiteId} />
      )}
    </div>
  );
};

export default Map;
