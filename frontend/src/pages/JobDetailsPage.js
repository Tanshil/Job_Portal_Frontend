import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
  min-height: 60vh;
  padding: 6rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
  padding: 36px 32px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 8px;
`;

const Company = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 12px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.1rem;
  margin: 18px 0 24px 0;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: 16px;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.highlight};
  }
`;

const Message = styled.div`
  color: ${({ error, theme }) => (error ? '#ff4e4e' : theme.colors.primary)};
  font-size: 1rem;
  margin-top: 16px;
`;

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applyMsg, setApplyMsg] = useState('');
  const [applyError, setApplyError] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/jobs`);
        const found = res.data.find(j => j._id === jobId);
        setJob(found);
      } catch (err) {
        setError('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleApply = async () => {
    setApplying(true);
    setApplyMsg('');
    setApplyError(false);
    try {
      const token = localStorage.getItem('token');
      // In a real app, you'd get the student ID from the token or user context
      // For demo, we'll just show a success message
      await axios.post('http://localhost:8000/api/applications', {
        job: jobId,
        student: 'student_id_here' // Replace with actual student ID
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplyMsg('Application submitted!');
    } catch (err) {
      setApplyError(true);
      setApplyMsg(err.response?.data || 'Application failed.');
    } finally {
      setApplying(false);
    }
  };

  return (
    <Wrapper>
      {loading && <p>Loading job details...</p>}
      {error && <Message error>{error}</Message>}
      {job && (
        <Card>
          <Title>{job.title}</Title>
          <Company>{job.company?.name || 'Unknown Company'}</Company>
          <Description>{job.description}</Description>
          <Button onClick={handleApply} disabled={applying}>{applying ? 'Applying...' : 'Apply'}</Button>
          {applyMsg && <Message error={applyError}>{applyMsg}</Message>}
        </Card>
      )}
    </Wrapper>
  );
};

export default JobDetailsPage; 