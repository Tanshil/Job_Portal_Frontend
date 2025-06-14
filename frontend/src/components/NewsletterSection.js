import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.card};
  padding: 48px 0 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 32px;
  margin: 48px auto 0 auto;
  max-width: 700px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const Input = styled.input`
  padding: 12px 20px;
  border-radius: 24px;
  border: none;
  font-size: 1rem;
  outline: none;
  min-width: 220px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: 24px;
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.highlight};
  }
`;

const NewsletterSection = () => (
  <Section>
    <Title>Subscribe Newsletter</Title>
    <Form onSubmit={e => e.preventDefault()}>
      <Input type="email" placeholder="Enter your email" required />
      <Button type="submit">Subscribe</Button>
    </Form>
  </Section>
);

export default NewsletterSection; 