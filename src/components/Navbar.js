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
  padding: 1rem 2rem;
  background: ${props => props.scrolled ? 'white' : 'transparent'};
  transition: background 0.3s ease;
  box-shadow: ${props => props.scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'};
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
  font-size: 1.5rem;
  cursor: pointer;
  font-weight: 700;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${props => props.scrolled ? props.theme.colors.primary : 'white'};
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
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
    <Nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      scrolled={scrolled}
    >
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