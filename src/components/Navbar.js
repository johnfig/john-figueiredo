import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.5rem 2rem;
  background: ${props => props.scrolled ? 
    'rgba(0, 9, 25, 0.9)' : // Dark background when scrolled
    'transparent'
  };
  backdrop-filter: ${props => props.scrolled ? 'blur(8px)' : 'none'};
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.5px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  opacity: 0.9;
  
  &:hover {
    opacity: 1;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 24px;
  position: relative;
  z-index: 101;
  padding: 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const HamburgerLine = styled(motion.span)`
  width: 30px;
  height: 2px;
  background-color: white;
  transform-origin: center;
  position: relative;
  display: block;
  transition: background-color 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  margin-left: auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 98;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenuBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 9, 25, 0.98);
  backdrop-filter: blur(10px);
`;

const MobileNavContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.9;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  padding: 0.5rem 1rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(255, 215, 0, 0.8); // Golden highlight
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
    padding: 1rem 2rem;
    width: 100%;
    text-align: center;
    
    &:hover {
      background: rgba(255, 215, 0, 0.1); // Subtle golden background on mobile
    }
    
    &:active {
      background: rgba(255, 215, 0, 0.2);
    }
    
    &:after {
      display: none; // Hide underline effect on mobile
    }
  }
  
  &:hover {
    opacity: 1;
    
    &:after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <Nav scrolled={scrolled}>
        <NavContainer>
          <HamburgerButton 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <HamburgerLine
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 11 : 0
              }}
              transition={{ duration: 0.2 }}
            />
            <HamburgerLine
              animate={{
                opacity: isOpen ? 0 : 1
              }}
              transition={{ duration: 0.2 }}
            />
            <HamburgerLine
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -11 : 0
              }}
              transition={{ duration: 0.2 }}
            />
          </HamburgerButton>
          
          <Logo 
            to="hero" 
            smooth={true}
            onClick={() => {
              setIsOpen(false);
              document.body.style.overflow = 'unset';
            }}
          >
            SISU Ventures
          </Logo>

          <NavLinks>
            <NavLink to="about" smooth={true}>About</NavLink>
            <NavLink to="portfolio" smooth={true}>Portfolio</NavLink>
            <NavLink to="contact" smooth={true}>Contact</NavLink>
          </NavLinks>
        </NavContainer>
      </Nav>

      <MobileMenu isOpen={isOpen}>
        <MobileMenuBackground
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isOpen ? 1 : 0
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        />
        <MobileNavContainer
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -20
          }}
          transition={{
            duration: 0.3,
            delay: 0.1,
            ease: "easeOut"
          }}
        >
          <NavLink 
            to="about" 
            smooth={true} 
            onClick={handleLinkClick}
          >
            About
          </NavLink>
          <NavLink 
            to="portfolio" 
            smooth={true} 
            onClick={handleLinkClick}
          >
            Portfolio
          </NavLink>
          <NavLink 
            to="contact" 
            smooth={true} 
            onClick={handleLinkClick}
          >
            Contact
          </NavLink>
        </MobileNavContainer>
      </MobileMenu>
    </>
  );
};

export default Navbar; 