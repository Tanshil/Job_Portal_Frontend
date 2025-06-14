import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.muted};
  padding: 32px 0 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 32px 32px 0 0;
  margin-top: 48px;
`;

const Links = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 16px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
`;

const Copyright = styled.div`
  font-size: 0.95rem;
`;

const Footer = () => (
  <FooterWrapper>
    <Links>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/jobs">Find Jobs</StyledLink>
      <StyledLink to="/contact">Contact</StyledLink>
      <StyledLink to="/blog">Blog</StyledLink>
    </Links>
    <Socials>
      <StyledLink to="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={22} /></StyledLink>
      <StyledLink to="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={22} /></StyledLink>
      <StyledLink to="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={22} /></StyledLink>
    </Socials>
    <Copyright>
      &copy; {new Date().getFullYear()} JobFly. All rights reserved.
    </Copyright>
  </FooterWrapper>
);

export default Footer; 