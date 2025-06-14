import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';

const Wrapper = styled.div`
  min-height: 60vh;
  padding: 6rem 24px 2rem 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
`;

const Form = styled.form`
  background: ${({ theme }) => theme.colors.card};
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 8px;
  text-align: center;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  width: 100%;
  min-height: 150px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.highlight};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  color: ${({ error, theme }) => (error ? '#ff4e4e' : theme.colors.primary)};
  font-size: 1rem;
  text-align: center;
  margin-top: 8px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  font-weight: 600;
`;

const JobPostPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    type: 'full-time',
    salary: '',
    requirements: '',
    benefits: '',
    deadline: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError(false);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('You must be logged in as a company.');
      const decoded = jwtDecode(token);
      if (decoded.role !== 'company') throw new Error('Only companies can post jobs.');
      const companyId = decoded.id;
      await axios.post('http://localhost:8000/api/jobs', {
        ...form,
        company: companyId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Job posted successfully!');
      setForm({
        title: '',
        description: '',
        location: '',
        type: 'full-time',
        salary: '',
        requirements: '',
        benefits: '',
        deadline: ''
      });
    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.message || err.message || 'Job posting failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Post a New Job</Title>
        
        <FormSection>
          <Label>Job Title</Label>
          <Input
            name="title"
            type="text"
            placeholder="e.g. Senior Frontend Developer"
            value={form.title}
            onChange={handleChange}
            required
          />
        </FormSection>

        <FormSection>
          <Label>Job Description</Label>
          <TextArea
            name="description"
            placeholder="Describe the role, responsibilities, and expectations..."
            value={form.description}
            onChange={handleChange}
            required
          />
        </FormSection>

        <FormSection>
          <Label>Location</Label>
          <Input
            name="location"
            type="text"
            placeholder="e.g. New York, NY or Remote"
            value={form.location}
            onChange={handleChange}
            required
          />
        </FormSection>

        <FormSection>
          <Label>Employment Type</Label>
          <Select name="type" value={form.type} onChange={handleChange} required>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </Select>
        </FormSection>

        <FormSection>
          <Label>Salary Range</Label>
          <Input
            name="salary"
            type="text"
            placeholder="e.g. $80,000 - $100,000"
            value={form.salary}
            onChange={handleChange}
            required
          />
        </FormSection>

        <FormSection>
          <Label>Requirements</Label>
          <TextArea
            name="requirements"
            placeholder="List the required skills, experience, and qualifications..."
            value={form.requirements}
            onChange={handleChange}
            required
          />
        </FormSection>

        <FormSection>
          <Label>Benefits</Label>
          <TextArea
            name="benefits"
            placeholder="List the benefits and perks offered..."
            value={form.benefits}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection>
          <Label>Application Deadline</Label>
          <Input
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
            required
          />
        </FormSection>

        <Button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Job'}
        </Button>
        {message && <Message error={error}>{message}</Message>}
      </Form>
    </Wrapper>
  );
};

export default JobPostPage; 