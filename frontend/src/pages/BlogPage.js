import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaComment, FaEdit, FaTrash, FaPen } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 1rem 2rem 1rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}10, ${props => props.theme.colors.secondary}10);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid ${props => props.theme.colors.primary}20;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  font-weight: 700;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const WriteButton = styled.button`
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.colors.secondary};
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const BlogCard = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const BlogContent = styled.div`
  padding: 2rem;
`;

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  font-weight: 700;
  line-height: 1.4;
`;

const BlogText = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const AuthorAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  transition: all 0.2s ease;
  border-radius: 8px;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.background};
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: ${props => props.theme.colors.background};
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textLight};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
`;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/blogs');
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }
  };

  const handleLike = async (blogId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8000/api/blogs/${blogId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchBlogs();
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/api/blogs/${blogId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        Loading blogs...
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Blog Posts</Title>
        <WriteButton onClick={() => navigate('/blog/write')}>
          <FaPen /> Write a Blog
        </WriteButton>
      </Header>
      
      <BlogGrid>
        {blogs.map(blog => (
          <BlogCard key={blog._id}>
            <BlogContent>
              <BlogTitle>{blog.title}</BlogTitle>
              <BlogText>{blog.content}</BlogText>
              <Tags>
                {blog.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </Tags>
            </BlogContent>
            <BlogMeta>
              <Author>
                <AuthorAvatar>
                  {blog.author.name.charAt(0).toUpperCase()}
                </AuthorAvatar>
                {blog.author.name}
              </Author>
              <Actions>
                <ActionButton onClick={() => handleLike(blog._id)}>
                  {blog.likes.includes(localStorage.getItem('userId')) ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart />
                  )}
                  {blog.likes.length}
                </ActionButton>
                <ActionButton>
                  <FaComment />
                  {blog.comments.length}
                </ActionButton>
                {blog.author._id === localStorage.getItem('userId') && (
                  <>
                    <ActionButton onClick={() => navigate(`/blog/edit/${blog._id}`)}>
                      <FaEdit />
                    </ActionButton>
                    <ActionButton onClick={() => handleDelete(blog._id)}>
                      <FaTrash />
                    </ActionButton>
                  </>
                )}
              </Actions>
            </BlogMeta>
          </BlogCard>
        ))}
      </BlogGrid>
    </Container>
  );
};

export default BlogPage; 