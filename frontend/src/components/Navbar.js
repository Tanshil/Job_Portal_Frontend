import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CTAButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.highlight};
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Nav>
      <Logo to="/">
        JobFly <FaRocket style={{ marginLeft: 8 }} />
      </Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/jobs">Find Jobs</NavLink>
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        
        {token ? (
          <>
            {user?.role === 'student' ? (
              <NavLink to="/dashboard/student">Dashboard</NavLink>
            ) : (
              <NavLink to="/dashboard/company">Dashboard</NavLink>
            )}
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <CTAButton to="/register">Get Started</CTAButton>
          </>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar; 