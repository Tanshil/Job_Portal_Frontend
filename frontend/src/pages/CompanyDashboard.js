import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FaBriefcase, FaUsers, FaCheckCircle, FaTimesCircle, FaClock, FaFilter, FaSort } from 'react-icons/fa';

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

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 1200px;
`;

const JobCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
  padding: 28px 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const JobTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const ApplicationsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
  width: 100%;
`;

const AppItem = styled.li`
  background: #23263A;
  border-radius: 12px;
  margin-bottom: 10px;
  padding: 16px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Status = styled.span`
  font-weight: 700;
  color: ${({ status }) =>
    status === 'accepted' ? '#4caf50' : status === 'rejected' ? '#ff4e4e' : '#FFD600'};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const ActionButton = styled.button`
  background: ${({ accept, theme }) => accept ? '#4caf50' : '#ff4e4e'};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 18px;
  font-size: 0.98rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    opacity: 0.85;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 1200px;
`;

const FilterSelect = styled.select`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
`;

const PostJobButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: ${({ theme }) => theme.colors.highlight};
  }
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

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchJobsAndApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('You must be logged in.');
        const decoded = jwtDecode(token);
        const companyId = decoded.id;
        
        // Fetch jobs posted by this company
        const jobsRes = await axios.get('http://localhost:8000/api/jobs');
        const companyJobs = jobsRes.data.filter(job => job.company === companyId);
        
        // For each job, fetch applications
        const jobsWithApps = await Promise.all(companyJobs.map(async job => {
          const appsRes = await axios.get(`http://localhost:8000/api/applications`);
          const applications = appsRes.data.filter(app => app.job === job._id);
          return { ...job, applications };
        }));
        
        setJobs(jobsWithApps);
      } catch (err) {
        setError('Failed to load company jobs or applications.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobsAndApplications();
  }, []);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/applications/${appId}`, { status: newStatus });
      setJobs(jobs => jobs.map(job => ({
        ...job,
        applications: job.applications.map(app =>
          app._id === appId ? { ...app, status: newStatus } : app
        )
      })));
    } catch (err) {
      alert('Failed to update application status.');
    }
  };

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

  const stats = {
    totalJobs: jobs.length,
    totalApplications: jobs.reduce((acc, job) => acc + job.applications.length, 0),
    pendingApplications: jobs.reduce((acc, job) => 
      acc + job.applications.filter(app => app.status === 'pending').length, 0),
    acceptedApplications: jobs.reduce((acc, job) => 
      acc + job.applications.filter(app => app.status === 'accepted').length, 0)
  };

  const filteredAndSortedJobs = jobs
    .map(job => ({
      ...job,
      applications: job.applications.filter(app => 
        statusFilter === 'all' || app.status === statusFilter
      )
    }))
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'applications') {
        return b.applications.length - a.applications.length;
      }
      return 0;
    });

  if (loading) {
    return (
      <Wrapper>
        <LoadingMessage>Loading your dashboard...</LoadingMessage>
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
        <Title>Company Dashboard</Title>
        <PostJobButton onClick={() => window.location.href = '/jobs/post'}>
          <FaBriefcase />
          Post New Job
        </PostJobButton>
      </DashboardHeader>

      <StatsContainer>
        <StatCard>
          <StatNumber>{stats.totalJobs}</StatNumber>
          <StatLabel>Total Jobs Posted</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.totalApplications}</StatNumber>
          <StatLabel>Total Applications</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.pendingApplications}</StatNumber>
          <StatLabel>Pending Applications</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.acceptedApplications}</StatNumber>
          <StatLabel>Accepted Applications</StatLabel>
        </StatCard>
      </StatsContainer>

      <FilterContainer>
        <FilterSelect 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Applications</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </FilterSelect>
        <FilterSelect 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="applications">Most Applications</option>
        </FilterSelect>
      </FilterContainer>

      <JobsGrid>
        {filteredAndSortedJobs.map(job => (
          <JobCard key={job._id}>
            <JobTitle>{job.title}</JobTitle>
            <div style={{ color: '#A0A3BD', marginBottom: 8 }}>{job.description}</div>
            <strong>Applications ({job.applications.length}):</strong>
            <ApplicationsList>
              {job.applications.length === 0 && <li>No applications yet.</li>}
              {job.applications.map(app => (
                <AppItem key={app._id}>
                  <div>Student: {app.student}</div>
                  <Status status={app.status}>
                    {getStatusIcon(app.status)}
                    Status: {app.status}
                  </Status>
                  {app.status === 'pending' && (
                    <ActionButtons>
                      <ActionButton accept onClick={() => handleStatusChange(app._id, 'accepted')}>
                        Accept
                      </ActionButton>
                      <ActionButton onClick={() => handleStatusChange(app._id, 'rejected')}>
                        Reject
                      </ActionButton>
                    </ActionButtons>
                  )}
                </AppItem>
              ))}
            </ApplicationsList>
          </JobCard>
        ))}
      </JobsGrid>
    </Wrapper>
  );
};

export default CompanyDashboard; 