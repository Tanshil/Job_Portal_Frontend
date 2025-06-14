import React from 'react';
import styled from 'styled-components';
import { FaBuilding, FaMapMarkerAlt, FaGlobe, FaLinkedin } from 'react-icons/fa';

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

const CompaniesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
`;

const CompanyCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const CompanyLogo = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const CompanyName = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  margin-bottom: 8px;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

const CompanyDescription = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
  margin: 16px 0;
  line-height: 1.5;
`;

const CompanyLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const CompanyLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`;

const sampleCompanies = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    website: 'https://techcorp.com',
    linkedin: 'https://linkedin.com/company/techcorp',
    description: 'Leading provider of enterprise software solutions and cloud services.',
    industry: 'Technology',
    size: '500-1000 employees'
  },
  {
    id: 2,
    name: 'Green Energy Innovations',
    location: 'Austin, TX',
    website: 'https://greenenergy.com',
    linkedin: 'https://linkedin.com/company/greenenergy',
    description: 'Pioneering sustainable energy solutions for a greener future.',
    industry: 'Renewable Energy',
    size: '100-500 employees'
  },
  {
    id: 3,
    name: 'Global Finance Partners',
    location: 'New York, NY',
    website: 'https://globalfinance.com',
    linkedin: 'https://linkedin.com/company/globalfinance',
    description: 'International financial services and investment management firm.',
    industry: 'Finance',
    size: '1000+ employees'
  },
  {
    id: 4,
    name: 'HealthTech Solutions',
    location: 'Boston, MA',
    website: 'https://healthtech.com',
    linkedin: 'https://linkedin.com/company/healthtech',
    description: 'Innovative healthcare technology and digital health solutions.',
    industry: 'Healthcare',
    size: '100-500 employees'
  },
  {
    id: 5,
    name: 'EduTech Pioneers',
    location: 'Seattle, WA',
    website: 'https://edutech.com',
    linkedin: 'https://linkedin.com/company/edutech',
    description: 'Revolutionizing education through technology and online learning.',
    industry: 'Education',
    size: '50-100 employees'
  },
  {
    id: 6,
    name: 'Smart Retail Systems',
    location: 'Chicago, IL',
    website: 'https://smartretail.com',
    linkedin: 'https://linkedin.com/company/smartretail',
    description: 'Next-generation retail technology and automation solutions.',
    industry: 'Retail',
    size: '100-500 employees'
  }
];

const CompaniesPage = () => {
  return (
    <PageWrapper>
      <Title>Featured Companies</Title>
      <CompaniesGrid>
        {sampleCompanies.map(company => (
          <CompanyCard key={company.id}>
            <CompanyLogo>
              <FaBuilding />
            </CompanyLogo>
            <CompanyName>{company.name}</CompanyName>
            <CompanyInfo>
              <FaMapMarkerAlt />
              <span>{company.location}</span>
            </CompanyInfo>
            <CompanyInfo>
              <span>{company.industry}</span>
              <span>•</span>
              <span>{company.size}</span>
            </CompanyInfo>
            <CompanyDescription>{company.description}</CompanyDescription>
            <CompanyLinks>
              <CompanyLink href={company.website} target="_blank" rel="noopener noreferrer">
                <FaGlobe />
              </CompanyLink>
              <CompanyLink href={company.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </CompanyLink>
            </CompanyLinks>
          </CompanyCard>
        ))}
      </CompaniesGrid>
    </PageWrapper>
  );
};

export default CompaniesPage; 