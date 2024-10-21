import React, { useEffect, useRef, useState } from 'react';
import { loader, BOSTON_BOUNDS, BOSTON_PLACE_ID } from '../../constants';
import styled from 'styled-components';
import { SITES } from '../../GIBostonSites';
import generateCircleSVG from '../../images/markers/circle';
import generateSquareSVG from '../../images/markers/square';
import generateDiamondSVG from '../../images/markers/diamond';
import generateTriangleSVG from '../../images/markers/triangle';
import generateStarSVG from '../../images/markers/star';
import generatePentagonSVG from '../../images/markers/pentagon';
import PopupBox from '../mapIcon/PopupBox';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import SignUpPage from '../volunteer/signup/SignUpPage';


const MapDiv = styled.div`
  height: 100%;
`;

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

  // need to apply filtering from site type as well
  if (selectedStatuses.length === 0) {
    tempMarkers.forEach((marker: google.maps.Marker) => {
      marker.setMap(map);
    });
  } else {
    tempMarkers.forEach((marker: google.maps.Marker) => marker.setMap(null));
    tempMarkers.forEach((marker: google.maps.Marker) => {
      const status = marker.get('status');
      console.log(selectedStatuses);
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
}

function randomizeStatus(): string {
  const statuses = ['Available', 'Adopted'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

const Map: React.FC<MapProps> = ({
  zoom,
  selectedFeatures,
  selectedStatuses,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  let map: google.maps.Map;

  useEffect(() => {
    if (mapRef.current) {
      loader.load().then(() => {
        map = new google.maps.Map(mapRef.current as HTMLElement, {
          center: { lat: 42.36, lng: -71.06 },
          zoom: 8,
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

        // sets the style for the boundary
        const featureLayer = map.getFeatureLayer(
          google.maps.FeatureType.LOCALITY,
        );
        const featureStyleOptions: google.maps.FeatureStyleOptions = {
          strokeColor: '#50B0E6',
          strokeOpacity: 1.0,
          strokeWeight: 3.0,
          fillColor: '#50B0E6',
          fillOpacity: 0.3,
        };

        featureLayer.style = (options) => {
          const feature = options.feature as google.maps.PlaceFeature;
          if (feature.placeId === BOSTON_PLACE_ID) {
            // Place ID for Boston
            return featureStyleOptions;
          }
        };

        let currentInfoWindow: google.maps.InfoWindow | null = null;

        const markersArray: google.maps.Marker[] = [];

        SITES.forEach((markerInfo) => {
          const types = [
            'Rain Garden',
            'Bioswale',
            'Bioretention',
            'Porous Paving',
            'Tree Trench/Pit',
            'Green Roof/Planter',
          ];

          if (
            markerInfo['Lat'] != null &&
            markerInfo['Long'] != null &&
            types.includes(markerInfo['Symbol Type'])
          ) {
            const status = randomizeStatus();

            let typeColor = '';
            if (status === 'Available') {
              typeColor = '#2D6A4F';
            } else if (status === 'Adopted') {
              typeColor = '#FB4D42';
            }

            let tempIcon = '';
            let iconFunc = null;

            if (markerInfo['Symbol Type'] === 'Rain Garden') {
              tempIcon = generateSquareSVG(typeColor);
              iconFunc = generateSquareSVG;
            } else if (markerInfo['Symbol Type'] === 'Bioswale') {
              tempIcon = generateTriangleSVG(typeColor);
              iconFunc = generateTriangleSVG;
            } else if (markerInfo['Symbol Type'] === 'Bioretention') {
              tempIcon = generateCircleSVG(typeColor);
              iconFunc = generateCircleSVG;
            } else if (markerInfo['Symbol Type'] === 'Porous Paving') {
              tempIcon = generateDiamondSVG(typeColor);
              iconFunc = generateDiamondSVG;
            } else if (markerInfo['Symbol Type'] === 'Tree Trench/Pit') {
              tempIcon = generateStarSVG(typeColor);
              iconFunc = generateStarSVG;
            } else if (markerInfo['Symbol Type'] === 'Green Roof/Planter') {
              tempIcon = generatePentagonSVG(typeColor);
              iconFunc = generatePentagonSVG;
            }

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
                  name={markerInfo['Asset Name']}
                  location={markerInfo['Address']}
                  status={'Available'}
                  type={markerInfo['Symbol Type']}
                  color={typeColor}
                  svgFunction={iconFunc as (color: string) => string}
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

            const marker: google.maps.Marker = new google.maps.Marker({
              position: {
                lat: Number(markerInfo['Lat']),
                lng: markerInfo['Long'],
              },
              map: map,
              icon: customIcon,
            });

            marker.set('featureType', markerInfo['Symbol Type']);
            marker.set('status', status);

            marker.addListener('click', () => {
              if (currentInfoWindow) {
                currentInfoWindow.close();
              }
              infoWindow.open(map, marker);
              currentInfoWindow = infoWindow;
            });
            markersArray.push(marker);
          }
        });

        setMarkers(markersArray);
        console.log(selectedFeatures);
        filterMarkers(selectedFeatures, selectedStatuses, markersArray, map);

        const input = document.getElementById('pac-input') as HTMLInputElement;

        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', () => {
          // marker.setVisible(false);
          const place = autocomplete.getPlace();

          if (!place.geometry || !place.geometry.location) {
            window.alert(`No details available for input: '${place.name}'`);
            return;
          }

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }

          // marker.setPosition(place.geometry.location);
          // marker.setVisible(true);
        });
      });
    }
  }, [zoom, selectedFeatures, selectedStatuses]);

  return (
    <div>
      <MapDiv
        id="map"
        ref={mapRef}
        style={{ width: '100%', height: '675px' }}
      />
      {showSignUp && <SignUpPage setShowSignUp={setShowSignUp} />}
    </div>
  );
};

export default Map;
