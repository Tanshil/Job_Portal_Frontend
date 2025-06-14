import React from 'react';
import styled from 'styled-components';
import { FaUserTie, FaBriefcase } from 'react-icons/fa';

const HeroWrapper = styled.section`
  background: linear-gradient(135deg, #23263A 60%, #181A20 100%);
  color: ${({ theme }) => theme.colors.text};
  padding: 64px 0 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0 0 48px 48px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
`;

const Headline = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 16px;
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.2rem;
  margin-bottom: 32px;
  text-align: center;
`;

const CTAButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: 32px;
  padding: 16px 40px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(108,99,255,0.2);
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.highlight};
  }
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;

const StatNumber = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
`;

const StatLabel = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const HeroSection = () => (
  <HeroWrapper>
    <Headline>
      Get a <span>Job</span> that Perfect for <span>You</span>
    </Headline>
    <SubText>
      Be found. Put your CV in front of great employers.<br />
      Search all the open positions on the portal.
    </SubText>
    <CTAButton>Find Job</CTAButton>
    <Stats>
      <Stat>
        <FaUserTie size={32} color="#FFD600" />
        <StatNumber>12M+</StatNumber>
        <StatLabel>Users Worldwide</StatLabel>
      </Stat>
      <Stat>
        <FaBriefcase size={32} color="#6C63FF" />
        <StatNumber>80K+</StatNumber>
        <StatLabel>Companies</StatLabel>
      </Stat>
    </Stats>
  </HeroWrapper>
);

export default HeroSection; 