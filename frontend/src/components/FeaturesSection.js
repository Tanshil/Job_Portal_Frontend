import React from 'react';
import styled from 'styled-components';
import { FaClock, FaRocket, FaHeadset, FaLaptopCode } from 'react-icons/fa';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: 48px 0 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 900px;
  margin-top: 32px;
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 24px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin: 16px 0 8px 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const FeatureDesc = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  font-size: 1rem;
`;

const FeaturesSection = () => (
  <Section>
    <Title>Here's why you'll love it <span style={{ color: '#6C63FF' }}>JobFly</span></Title>
    <FeaturesGrid>
      <FeatureCard>
        <FaHeadset size={32} color="#FFD600" />
        <FeatureTitle>24/7 Support</FeatureTitle>
        <FeatureDesc>Many employers posting new jobs every day and support always available.</FeatureDesc>
      </FeatureCard>
      <FeatureCard>
        <FaLaptopCode size={32} color="#6C63FF" />
        <FeatureTitle>Tech & Startup Jobs</FeatureTitle>
        <FeatureDesc>Many amazing positions and opportunities in tech and startups.</FeatureDesc>
      </FeatureCard>
      <FeatureCard>
        <FaRocket size={32} color="#FF4ECD" />
        <FeatureTitle>Quick & Easy</FeatureTitle>
        <FeatureDesc>Easy job discovery and application process for students and graduates.</FeatureDesc>
      </FeatureCard>
      <FeatureCard>
        <FaClock size={32} color="#A0A3BD" />
        <FeatureTitle>Save Time</FeatureTitle>
        <FeatureDesc>Save time with personalized job recommendations and fast applications.</FeatureDesc>
      </FeatureCard>
    </FeaturesGrid>
  </Section>
);

export default FeaturesSection; 