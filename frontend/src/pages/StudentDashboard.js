import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FaBriefcase, FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const Wrapper = styled.div`
  min-height: 60vh;
  padding: 6rem 24px 2rem 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
`;

const DashboardHeader = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: 16px 24px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatNumber = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
`;

const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1200px;
`;

const AppCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const JobTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  margin: 0;
`;

const Company = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Status = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ status }) => 
    status === 'accepted' ? 'rgba(76, 175, 80, 0.1)' : 
    status === 'rejected' ? 'rgba(255, 78, 78, 0.1)' : 
    'rgba(255, 214, 0, 0.1)'};
  color: ${({ status }) => 
    status === 'accepted' ? '#4caf50' : 
    status === 'rejected' ? '#ff4e4e' : 
    '#FFD600'};
`;

const JobDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 8px;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
`;

const AppliedDate = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LoadingMessage = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  text-align: center;
  margin: 48px 0;
`;

const ErrorMessage = styled.div`
  color: #ff4e4e;
  font-size: 1.1rem;
  text-align: center;
  margin: 48px 0;
`;

const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  margin: 48px 0;
  font-size: 1.1rem;
`;

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('You must be logged in.');
        const decoded = jwtDecode(token);
        const studentId = decoded.id;
        const res = await axios.get(`http://localhost:8000/api/applications/student/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setApplications(res.data);
      } catch (err) {
        setError('Failed to load applications.');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <FaCheckCircle />;
      case 'rejected':
        return <FaTimesCircle />;
      default:
        return <FaClock />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  if (loading) {
    return (
      <Wrapper>
        <LoadingMessage>Loading your applications...</LoadingMessage>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <ErrorMessage>{error}</ErrorMessage>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <DashboardHeader>
        <Title>Your Applications</Title>
        <StatsContainer>
          <StatCard>
            <StatNumber>{stats.total}</StatNumber>
            <StatLabel>Total Applications</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.pending}</StatNumber>
            <StatLabel>Pending</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.accepted}</StatNumber>
            <StatLabel>Accepted</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.rejected}</StatNumber>
            <StatLabel>Rejected</StatLabel>
          </StatCard>
        </StatsContainer>
      </DashboardHeader>

      {applications.length === 0 ? (
        <EmptyState>
          You haven't applied to any jobs yet. Start exploring opportunities!
        </EmptyState>
      ) : (
        <ApplicationsGrid>
          {applications.map(app => (
            <AppCard key={app._id}>
              <CardHeader>
                <JobInfo>
                  <JobTitle>{app.job?.title || 'Unknown Job'}</JobTitle>
                  <Company>
                    <FaBuilding />
                    {app.job?.company?.name || 'Unknown Company'}
                  </Company>
                </JobInfo>
                <Status status={app.status}>
                  {getStatusIcon(app.status)}
                  {getStatusText(app.status)}
                </Status>
              </CardHeader>
              
              <JobDetails>
                {app.job?.location && (
                  <Detail>
                    <FaMapMarkerAlt />
                    {app.job.location}
                  </Detail>
                )}
                {app.job?.type && (
                  <Detail>
                    <FaBriefcase />
                    {app.job.type}
                  </Detail>
                )}
              </JobDetails>

              <AppliedDate>
                <FaCalendarAlt />
                Applied on {new Date(app.createdAt).toLocaleDateString()}
              </AppliedDate>
            </AppCard>
          ))}
        </ApplicationsGrid>
      )}
    </Wrapper>
  );
};

export default StudentDashboard; 