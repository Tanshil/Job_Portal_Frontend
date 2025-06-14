import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: 48px 0 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 900px;
  margin-top: 32px;
`;

const BlogCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
  padding: 24px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const BlogTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

const BlogDesc = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.98rem;
`;

const BlogSection = () => (
  <Section>
    <Title>Latest Blog or News</Title>
    <BlogGrid>
      <BlogCard>
        <BlogTitle>5 Tips For Job Interviews</BlogTitle>
        <BlogDesc>Learn how to ace your next job interview with these essential tips for students and graduates.</BlogDesc>
      </BlogCard>
      <BlogCard>
        <BlogTitle>Career Paths After Graduation</BlogTitle>
        <BlogDesc>Explore different career options and how to get started in your chosen field.</BlogDesc>
      </BlogCard>
      <BlogCard>
        <BlogTitle>Overseas/Remote Career</BlogTitle>
        <BlogDesc>Discover the benefits and challenges of working remotely or abroad as a new graduate.</BlogDesc>
      </BlogCard>
    </BlogGrid>
  </Section>
);

export default BlogSection; 