import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaSearch } from 'react-icons/fa';

const PageWrapper = styled.div`
  min-height: 60vh;
  padding: 6rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 24px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-bottom: 32px;
`;

const SearchBar = styled.input`
  padding: 14px 20px 14px 48px;
  border-radius: 20px;
  border: none;
  font-size: 1.1rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.1rem;
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 1000px;
  padding: 0 24px;
`;

const JobCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
  padding: 28px 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
`;

const JobTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
  margin-bottom: 8px;
`;

const Company = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  font-size: 1.05rem;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1rem;
  margin: 12px 0 20px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
`;

const JobDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: 16px;
  padding: 10px 28px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.highlight};
    transform: translateY(-1px);
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
  padding: 16px;
  background: rgba(255, 78, 78, 0.1);
  border-radius: 8px;
`;

const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  margin: 48px 0;
  font-size: 1.1rem;
`;

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get('http://localhost:8000/api/jobs');
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const keyword = search.toLowerCase();
    return (
      job.title.toLowerCase().includes(keyword) ||
      (job.company?.name || '').toLowerCase().includes(keyword) ||
      job.description.toLowerCase().includes(keyword) ||
      (job.location || '').toLowerCase().includes(keyword) ||
      (job.type || '').toLowerCase().includes(keyword)
    );
  });

  return (
    <PageWrapper>
      <Title>Find Your Next Opportunity</Title>
      <SearchContainer>
        <SearchIcon />
        <SearchBar
          type="text"
          placeholder="Search by title, company, location, or keyword..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </SearchContainer>

      {loading && <LoadingMessage>Loading jobs...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!loading && !error && filteredJobs.length === 0 && (
        <EmptyState>
          {search ? 'No jobs found matching your search.' : 'No jobs available at the moment.'}
        </EmptyState>
      )}
      
      <JobsGrid>
        {filteredJobs.map(job => (
          <JobCard key={job._id}>
            <JobTitle>{job.title}</JobTitle>
            <Company>{job.company?.name || 'Unknown Company'}</Company>
            <JobDetails>
              {job.location && (
                <Detail>
                  <FaMapMarkerAlt />
                  {job.location}
                </Detail>
              )}
              {job.salary && (
                <Detail>
                  <FaMoneyBillWave />
                  {job.salary}
                </Detail>
              )}
              {job.type && (
                <Detail>
                  <FaBriefcase />
                  {job.type}
                </Detail>
              )}
              {job.postedAt && (
                <Detail>
                  <FaClock />
                  Posted {new Date(job.postedAt).toLocaleDateString()}
                </Detail>
              )}
            </JobDetails>
            <Description>{job.description}</Description>
            <Button onClick={() => navigate(`/jobs/${job._id}`)}>
              View Details
            </Button>
          </JobCard>
        ))}
      </JobsGrid>
    </PageWrapper>
  );
};

export default JobListPage; 