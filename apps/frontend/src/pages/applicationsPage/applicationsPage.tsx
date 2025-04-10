import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import ApplicantsTable from './Table';
import axios from 'axios';

export default function ApplicationsPage() {
  const [applicants, setApplicants] = useState<any[]>([]);

  const findApplicants = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/applications/applicationsInfo`,
    );
    return response.data;
  };

  const fetchApplicants = async () => {
    const applicants = await findApplicants();
    setApplicants(applicants);
  };
  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div style={{ backgroundColor: '#f2f2f2' }}>
      <Navbar />
      <div style={{ marginTop: '50px' }} />
      <ApplicantsTable applicants={applicants} />
    </div>
  );
}
