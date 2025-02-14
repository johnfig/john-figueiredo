import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 1.5rem 2rem;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: ${props => props.scrolled ? props.theme.colors.primary : 'white'};
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.5px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
`;

const NavLink = styled(Link)`
  color: ${props => props.scrolled ? props.theme.colors.primary : 'white'};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.9;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav scrolled={scrolled}>
      <NavContainer>
        <Logo scrolled={scrolled}>SISU Ventures</Logo>
        <NavLinks>
          <NavLink to="about" smooth={true} scrolled={scrolled}>About</NavLink>
          <NavLink to="portfolio" smooth={true} scrolled={scrolled}>Portfolio</NavLink>
          <NavLink to="contact" smooth={true} scrolled={scrolled}>Contact</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 