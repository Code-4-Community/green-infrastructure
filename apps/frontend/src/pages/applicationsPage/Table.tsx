import { Height, VerticalAlignCenter } from '@mui/icons-material';
import axios from 'axios';
import { color, px } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ApplicantsTable({
  applicants = [],
}: {
  applicants?: any[];
}) {
  const [userData, setUserData] = useState<{ [key: string]: any }>({});
  const [siteData, setSiteData] = useState<{ [key: string]: any }>({});
  const [selectedStatuses, setSelectedStatuses] = useState<ApplicationStatus[]>(
    [],
  );
  const [filteredApplicants, setFilteredApplicants] = useState(applicants);

  enum Role {
    VOLUNTEER = 'Volunteer',
    ADMIN = 'Admin',
  }

  enum ApplicationStatus {
    APPROVED = 'Approved',
    PENDING = 'Pending',
    DENIED = 'Denied',
  }

  const toggleStatus = (status: ApplicationStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  useEffect(() => {
    let filtered = applicants.filter(
      (applicant) => userData[applicant.userId]?.role === Role.VOLUNTEER,
    );

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((applicant) =>
        selectedStatuses.includes(applicant.status),
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.dateApplied || 0).getTime();
      const dateB = new Date(b.dateApplied || 0).getTime();
      return dateB - dateA;
    });

    setFilteredApplicants(filtered);
  }, [selectedStatuses, applicants, userData]);

  // Function to fetch user info for each applicant
  const fetchUserInfo = async (userId: string) => {
    if (!userId) return null;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/${userId}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching user data for user ${userId}:`, error);
      return null;
    }
  };

  const fetchSiteInfo = async (siteId: string) => {
    if (!siteId) return null;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/sites/${siteId}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching site data for site ${siteId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const loadUserAndSiteData = async () => {
      const userMap: { [key: string]: any } = {};
      const siteMap: { [key: string]: any } = {};
      const uniqueSiteIds = new Set<string>();

      await Promise.all(
        applicants.map(async (applicant) => {
          if (applicant.userId) {
            const userInfo = await fetchUserInfo(applicant.userId);
            if (userInfo) {
              userMap[applicant.userId] = userInfo;
            }
          }

          if (applicant.siteId) {
            uniqueSiteIds.add(applicant.siteId);
          }
        }),
      );

      await Promise.all(
        Array.from(uniqueSiteIds).map(async (siteId) => {
          const siteInfo = await fetchSiteInfo(siteId);
          if (siteInfo) {
            siteMap[siteId] = siteInfo;
          }
        }),
      );

      setUserData(userMap);
      setSiteData(siteMap);
    };

    if (applicants.length > 0) {
      loadUserAndSiteData();
    }
  }, [applicants]);

  const headings = {
    fontFamily: 'Montserrat',
    color: '#000000',
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: 'normal',
    margin: '0',
  };

  const tableHeadings = {
    fontFamily: 'Montserrat',
    color: '#58585B',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: 'normal',
    verticalAlign: 'middle',
    margin: '0',
  };

  const tableData = {
    fontFamily: 'Lora',
    color: '#000000',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: 'normal',
    verticalAlign: 'middle',
    padding: '12px 12px',
  };

  const margLeft = {
    marginLeft: '15px',
  };

  return (
    <div
      id="applicants-table"
      style={{ margin: '5%', padding: '4%', backgroundColor: '#fffdfd' }}
    >
      <div style={headings}>
        Your Green Site Applicants
        <div className="float-end">
          <label style={tableHeadings}>
            <input
              type="checkbox"
              checked={selectedStatuses.includes(ApplicationStatus.APPROVED)}
              onChange={() => toggleStatus(ApplicationStatus.APPROVED)}
            />{' '}
            Approved
          </label>
          <label style={{ ...tableHeadings, ...margLeft }}>
            <input
              type="checkbox"
              checked={selectedStatuses.includes(ApplicationStatus.PENDING)}
              onChange={() => toggleStatus(ApplicationStatus.PENDING)}
            />{' '}
            Pending
          </label>
          <label style={{ ...tableHeadings, ...margLeft }}>
            <input
              type="checkbox"
              checked={selectedStatuses.includes(ApplicationStatus.DENIED)}
              onChange={() => toggleStatus(ApplicationStatus.DENIED)}
            />{' '}
            Denied
          </label>
        </div>
      </div>
      <hr />
      <table
        className="table"
        style={{
          borderCollapse: 'separate',
          borderSpacing: '0 20px',
          textAlign: 'left',
        }}
      >
        <thead style={tableHeadings}>
          <tr>
            <th style={{ ...tableHeadings, width: '20%' }}>First Name</th>
            <th style={{ ...tableHeadings, width: '20%' }}>Last Name</th>
            <th style={tableHeadings}>Site</th>
            <th style={tableHeadings}>Approval Status</th>
            <th style={tableHeadings}>Date Applied</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.map((applicant: any) => {
            const user = userData[applicant.userId] || {};
            const site = siteData[applicant.siteId] || {};

            return (
              <tr key={applicant.appId}>
                <td style={tableData}>{user?.firstName || '-'}</td>
                <td style={tableData}>{user?.lastName || '-'}</td>
                <td style={tableData}>
                  {site?.siteName || '-'} {site?.assetType || '-'}
                </td>
                <td style={tableData}>{applicant.status || '-'}</td>
                <td style={tableData}>
                  {applicant.dateApplied
                    ? new Date(applicant.dateApplied).toLocaleDateString()
                    : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
