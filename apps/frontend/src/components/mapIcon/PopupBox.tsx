import { CSSProperties } from 'react';

interface Props {
  setShowSignUp: (value: boolean) => void;
  name: string;
  location: string;
  status: string;
  type: string;
  color: string;
  svgFunction: (color: string) => string;
}

interface PopupStyles {
  [key: string]: CSSProperties;
}

const popupStyles: PopupStyles = {
  featureType: {
    backgroundColor: '#2D6A4F',
    width: '45%',
    height: '130px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  details: {
    backgroundColor: 'white',
    width: '60%',
    height: '130px',
    marginLeft: '4%',
    display: 'flex',
    flexDirection: 'column',
  },
};

export default function PopupBox({
  setShowSignUp,
  name,
  location,
  status,
  type,
  color,
  svgFunction,
}: Props) {
  const openSignUp = () => {
    // Triggers the sign-up form to open (the siteId was already set on marker click)
    setShowSignUp(true);
  };

  return (
    <div style={{ display: 'flex', width: '400px', margin: '0', padding: '0' }}>
      <div style={popupStyles.featureType}>
        <text
          style={{
            fontFamily: 'Lora',
            fontStyle: 'italic',
            fontSize: '14px',
            color: '#ffffff',
          }}
        >
          Feature Type:
        </text>
        <text
          style={{
            fontFamily: 'system-ui',
            fontWeight: '700',
            fontSize: '16px',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginTop: '1%',
            textAlign: 'center',
          }}
        >
          {type}
        </text>
        <div style={{ marginTop: '9%' }} dangerouslySetInnerHTML={{ __html: svgFunction('#ffffff') }} />
      </div>

      <div style={popupStyles.details}>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%', gap: '5px' }}>
          <text style={{ fontFamily: 'system-ui', fontWeight: '700' }}>NAME:</text>
          <text style={{ fontFamily: 'system-ui', whiteSpace: 'nowrap' }}>{name}</text>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%', gap: '5px' }}>
          <text style={{ fontFamily: 'system-ui', fontWeight: '700' }}>LOCATION:</text>
          <text>{location}</text>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%', gap: '5px' }}>
          <text style={{ fontFamily: 'system-ui', fontWeight: '700' }}>STATUS:</text>
          <text>{status}</text>
        </div>

        {status === 'Available' && (
          <button
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: '7%',
              fontFamily: 'Lora',
              fontStyle: 'italic',
              fontSize: '15px',
              color: '#288BE4',
              backgroundColor: '#ffffff',
              border: '0',
              marginLeft: '0',
              paddingLeft: '0',
              borderLeft: '0',
              textDecoration: 'underline',
            }}
            onClick={openSignUp}
          >
            Interested in adopting →
          </button>
        )}
      </div>
    </div>
  );
}
