import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

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

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  width: 100%;
  max-width: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
`;

const InfoTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 24px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.muted};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`;

const Form = styled.form`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 16px;
  border: none;
  font-size: 1rem;
  outline: none;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border-radius: 16px;
  border: none;
  font-size: 1rem;
  outline: none;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 120px;
  resize: vertical;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: 16px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.highlight};
  }
`;

const Message = styled.div`
  text-align: center;
  color: ${({ error, theme }) => (error ? '#ff4e4e' : theme.colors.primary)};
  font-size: 1rem;
  margin-top: 8px;
`;

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
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
    
    // Simulate form submission
    setTimeout(() => {
      setMessage('Thank you for your message! We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <PageWrapper>
      <Title>Contact Us</Title>
      <ContentWrapper>
        <ContactInfo>
          <InfoTitle>Get in Touch</InfoTitle>
          <InfoItem>
            <FaEnvelope size={20} />
            <span>contact@jobfly.com</span>
          </InfoItem>
          <InfoItem>
            <FaPhone size={20} />
            <span>+1 (555) 123-4567</span>
          </InfoItem>
          <InfoItem>
            <FaMapMarkerAlt size={20} />
            <span>123 Tech Street, Silicon Valley, CA 94043</span>
          </InfoItem>
          <SocialLinks>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialLink>
          </SocialLinks>
        </ContactInfo>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            name="subject"
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
          <TextArea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
          {message && <Message error={error}>{message}</Message>}
        </Form>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default ContactPage; 