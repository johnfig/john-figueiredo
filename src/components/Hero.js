import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  backdrop-filter: blur(5px);
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 8.5rem;
  color: #fff;
  position: relative;
  z-index: 1;
  text-align: center;
  font-weight: 600;
  letter-spacing: -2px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 80px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 4.5rem;
    letter-spacing: -1px;
  }
`;

class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.alive = Math.random() < 0.3;
    this.nextState = this.alive;
    this.energy = this.alive ? 1 : 0;
    this.color = this.getRandomColor();
    this.velocity = Math.random() * 0.3 + 0.1; // Slower, more controlled movement
  }

  getRandomColor() {
    const colors = [
      { h: 210, s: 80, l: 55 }, // Vibrant Blue
      { h: 270, s: 80, l: 55 }, // Vibrant Purple
      { h: 180, s: 80, l: 55 }, // Vibrant Teal
      { h: 240, s: 80, l: 55 }, // Vibrant Indigo
      { h: 200, s: 80, l: 55 }, // Vibrant Light Blue
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  draw(ctx) {
    if (this.energy > 0.1) {
      const { h, s, l } = this.color;
      
      // Draw sharp border
      ctx.fillStyle = `hsla(${h}, ${s}%, ${l - 10}%, ${this.energy})`;
      ctx.fillRect(this.x, this.y, this.size, this.size);
      
      // Draw main block slightly smaller
      ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${this.energy})`;
      ctx.fillRect(
        this.x + 1,
        this.y + 1,
        this.size - 2,
        this.size - 2
      );
      
      // Draw highlight
      ctx.fillStyle = `hsla(${h}, ${s}%, ${l + 30}%, ${this.energy})`;
      ctx.fillRect(
        this.x + 3,
        this.y + 3,
        this.size - 6,
        this.size - 6
      );
      
      // Draw inner glow
      ctx.fillStyle = `hsla(${h}, ${s}%, ${l + 10}%, ${this.energy * 0.7})`;
      ctx.fillRect(
        this.x + 6,
        this.y + 6,
        this.size - 12,
        this.size - 12
      );
    }
  }

  update(width) {
    this.x += this.velocity;
    
    if (this.x > width) {
      this.x = -this.size;
      this.energy = this.alive ? 1 : 0;
      this.color = this.getRandomColor();
    }

    // Sharper transitions
    if (this.alive && this.energy < 1) {
      this.energy += 0.1;
    } else if (!this.alive && this.energy > 0) {
      this.energy -= 0.1;
    }

    this.energy = Math.max(0, Math.min(1, this.energy));
  }
}

class Grid {
  constructor(width, height, cellSize) {
    this.cellSize = cellSize;
    this.cols = Math.ceil(width / cellSize) + 1; // Add one extra column
    this.rows = Math.ceil(height / cellSize);
    this.cells = [];

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.cells.push(new Cell(
          x * cellSize,
          y * cellSize,
          cellSize
        ));
      }
    }
  }

  draw(ctx) {
    this.cells.forEach(cell => cell.draw(ctx));
  }

  update(width) {
    this.cells.forEach(cell => cell.update(width));
    
    // Randomly activate new cells
    if (Math.random() < 0.03) {
      const randomCell = this.cells[Math.floor(Math.random() * this.cells.length)];
      randomCell.alive = true;
      randomCell.energy = 1;
      randomCell.color = randomCell.getRandomColor();
    }
  }
}

const Hero = () => {
  const canvasRef = useRef(null);
  const gridRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animating = true;

    const resizeCanvas = () => {
      // Set canvas size with pixel ratio for sharpness
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Scale context for high DPI displays
      ctx.scale(pixelRatio, pixelRatio);
      
      gridRef.current = new Grid(window.innerWidth, window.innerHeight, 20);
    };

    const animate = () => {
      if (!animating) return;

      // Clearer background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Enable crisp edges
      ctx.imageSmoothingEnabled = false;
      
      gridRef.current.update(window.innerWidth);
      gridRef.current.draw(ctx);

      animationFrameId.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      animating = false;
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <HeroSection>
      <Canvas 
        ref={canvasRef}
        style={{ opacity: 0.9 }} // Increased opacity for sharper appearance
      />
      <GradientOverlay />
      <Title
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.25, 0.1, 0, 1],
          delay: 0.2
        }}
      >
        SISU Ventures
      </Title>
    </HeroSection>
  );
};

export default Hero; 