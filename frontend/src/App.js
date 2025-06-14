import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './globalStyles';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import BlogSection from './components/BlogSection';
import NewsletterSection from './components/NewsletterSection';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobListPage from './pages/JobListPage';
import JobDetailsPage from './pages/JobDetailsPage';
import StudentDashboard from './pages/StudentDashboard';
import JobPostPage from './pages/JobPostPage';
import CompanyDashboard from './pages/CompanyDashboard';
import BlogPage from './pages/BlogPage';
import BlogEditorPage from './pages/BlogEditorPage';
import CompaniesPage from './pages/CompaniesPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <FeaturesSection />
              <BlogSection />
              <NewsletterSection />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/jobs/post" element={<JobPostPage />} />
          <Route path="/dashboard/company" element={<CompanyDashboard />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/write" element={<BlogEditorPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
