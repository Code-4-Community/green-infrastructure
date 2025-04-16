import React from 'react';
import { Button } from '@mui/material';

interface ApplicantCardProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: any;
  user: any;
  site: any;
  onApprove: (applicantId: string, siteId: string) => void;
  onDeny: (applicantId: string) => void;
  onBack: () => void;
  onSkip: () => void;
  currentIndex: number;
  totalApplications: number;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({
  isOpen,
  onClose,
  applicant,
  user,
  site,
  onApprove,
  onDeny,
  onBack,
  onSkip,
  currentIndex,
  totalApplications,
}) => {
  if (!isOpen || !applicant || !user) return null;

  const isPending = applicant.status === 'Pending';


  const handleApprove = () => {
    onApprove(applicant.appId, applicant.siteId);
    onClose(); // Close current card
  };

  const handleDeny = () => {
    onDeny(applicant.appId);
    onClose(); // Close current card
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    width: '100%',
    maxWidth: '450px',
    height: 'calc(100vh - 150px)',
    margin: '100px 0 50px 0',
    overflowY: 'auto',
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    boxShadow: '-4px 0px 12px rgba(0, 0, 0, 0.15)',
    fontFamily: 'Montserrat, sans-serif',
    marginRight: '0',
  };

  const headerStyle: React.CSSProperties = {
    padding: '20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const closeButtonStyle: React.CSSProperties = {
    cursor: 'pointer',
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#f5f5f5',
    transition: 'background-color 0.2s',
  };

  const contentStyle: React.CSSProperties = {
    padding: '20px',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '15px',
  };

  const labelStyle: React.CSSProperties = {
    color: '#58585B',
    fontSize: '16px',
    marginBottom: '4px',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '18px',
    fontFamily: 'Lora, serif',
    marginBottom: '4px',
  };

  const mapContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '180px',
    backgroundColor: '#eee',
    marginBottom: '20px',
    position: 'relative',
  };

  const siteInfoStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(33, 84, 63, 0.9)',
    color: 'white',
    padding: '12px',
    width: '150px',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const siteNameStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '14px',
    marginBottom: '8px',
  };

  const actionButtonStyle: React.CSSProperties = {
    width: '48%',
    padding: '12px 0',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none',
    fontFamily: 'Montserrat, sans-serif',
  };

  const actionContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  };

  const navigationStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 0 20px',
  };

  const navButtonStyle: React.CSSProperties = {
    color: '#21543F',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
  };

  return (
    <div style={overlayStyle}>
      <div style={cardStyle as React.CSSProperties}>
        <div style={headerStyle}>
          <h3>Application Overview</h3>
          <div style={closeButtonStyle} onClick={onClose} title="Close card">×</div>
        </div>

        <div style={{ padding: '10px 20px', backgroundColor: '#f8f8f8' }}>
          <h2>{currentIndex} of {totalApplications} Applications</h2>
        </div>

        <div style={mapContainerStyle}>
          {/* Map would go here - showing as placeholder */}
          <div style={siteInfoStyle}>
            <div style={siteNameStyle}>GREEN SITE</div>
            <div style={{ textAlign: 'center', fontSize: '16px' }}>
              {site?.assetType?.toUpperCase() || 'RAIN GARDEN'}
            </div>
          </div>
        </div>

        <div style={contentStyle}>
          <div style={sectionStyle}>
            <div style={labelStyle}>Site</div>
            <div style={valueStyle}>{site?.siteName || 'Rain Garden 1'}</div>
          </div>

          <div style={sectionStyle}>
            <div style={labelStyle}>Volunteer Name</div>
            <div style={valueStyle}>{`${user.firstName || ''} ${user.lastName || ''}`}</div>
          </div>

          <div style={sectionStyle}>
            <div style={labelStyle}>Email Address</div>
            <div style={valueStyle}>{user.email || 'Not provided'}</div>
          </div>

          <div style={sectionStyle}>
            <div style={labelStyle}>Phone Number</div>
            <div style={valueStyle}>{user.phoneNumber || 'Not provided'}</div>
          </div>

          <div style={sectionStyle}>
            <div style={labelStyle}>Birth Year</div>
            <div style={valueStyle}>{user.birthYear || 'Not provided'}</div>
          </div>

          <div style={sectionStyle}>
            <div style={labelStyle}>Zip Code</div>
            <div style={valueStyle}>{user.zipCode || 'Not provided'}</div>
          </div>

          <div style={actionContainerStyle}>
            <Button
              variant="outlined"
              style={{ ...actionButtonStyle, borderColor: '#21543F', color: '#21543F' }}
              onClick={() => onDeny(applicant.appId)}
            >
              Deny
            </Button>
            <Button
              variant="contained"
              style={{ ...actionButtonStyle, backgroundColor: '#3174D5', color: 'white' }}
              onClick={() => onApprove(applicant.appId, applicant.siteId)}
            >
              Approve
            </Button>
          </div>

          <div style={navigationStyle}>
            <div style={navButtonStyle} onClick={onBack}>Back</div>
            <div style={navButtonStyle} onClick={onSkip}>Skip</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;