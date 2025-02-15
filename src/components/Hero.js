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
  background: #000919;
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
    rgba(0, 9, 25, 0.2) 0%,
    rgba(0, 9, 25, 0.4) 100%
  );
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

const Hero = () => {
  const canvasRef = useRef(null);
  const timelineRef = useRef(0);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animating = true;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrid = (time) => {
      const gridSize = 50;
      const offset = time % gridSize;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;

      // Draw vertical lines
      for (let x = offset; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = offset; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawTimeline = (time) => {
      // Increase duration to ensure all animations complete
      const duration = 20000; // 20 seconds for full animation cycle
      const progress = (time % duration) / duration;
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 9, 25, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Keep grid animation at original speed
      drawGrid(time * 0.5);

      // Timeline animations with longer transitions
      if (progress < 0.125) {
        // 2.5 seconds per scene
        drawRunnerScene(Math.min(1, progress * 8));
      } else if (progress < 0.25) {
        // Add small pause between scenes
        const sceneProgress = Math.min(1, (progress - 0.125) * 7);
        drawLimoScene(sceneProgress);
      } else if (progress < 0.375) {
        const sceneProgress = Math.min(1, (progress - 0.25) * 7);
        drawCodingScene(sceneProgress);
      } else if (progress < 0.5) {
        const sceneProgress = Math.min(1, (progress - 0.375) * 7);
        drawSISUGrowthScene(sceneProgress);
      } else if (progress < 0.625) {
        const sceneProgress = Math.min(1, (progress - 0.5) * 7);
        drawIPOScene(sceneProgress);
      } else if (progress < 0.75) {
        const sceneProgress = Math.min(1, (progress - 0.625) * 7);
        drawEdTechScene(sceneProgress);
      } else if (progress < 0.875) {
        const sceneProgress = Math.min(1, (progress - 0.75) * 7);
        drawRealEstateScene(sceneProgress);
      } else {
        const sceneProgress = Math.min(1, (progress - 0.875) * 7);
        drawFutureScene(sceneProgress);
      }
    };

    const drawRunnerScene = (progress) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw track
      ctx.strokeStyle = `rgba(255, 255, 255, ${progress})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      ctx.stroke();

      // Draw runner silhouette
      const runnerAngle = progress * Math.PI * 4;
      const runnerX = centerX + Math.cos(runnerAngle) * 100;
      const runnerY = centerY + Math.sin(runnerAngle) * 100;

      const gradient = ctx.createRadialGradient(
        runnerX, runnerY, 0,
        runnerX, runnerY, 20
      );
      gradient.addColorStop(0, `rgba(255, 215, 0, ${progress})`);
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(runnerX, runnerY, 10, 0, Math.PI * 2);
      ctx.fill();

      // Track fracture effect at the end
      if (progress > 0.8) {
        const fractures = 5;
        for (let i = 0; i < fractures; i++) {
          const angle = (i / fractures) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + Math.cos(angle) * 150 * (progress - 0.8) * 5,
            centerY + Math.sin(angle) * 150 * (progress - 0.8) * 5
          );
          ctx.strokeStyle = `rgba(255, 215, 0, ${1 - (progress - 0.8) * 5})`;
          ctx.stroke();
        }
      }
    };

    const drawLimoScene = (progress) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw city street grid
      const gridSize = 50;
      const gridWidth = 400;
      const gridHeight = 200;
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${progress * 0.3})`;
      ctx.lineWidth = 1;
      
      // Horizontal streets
      for (let y = -gridHeight/2; y <= gridHeight/2; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(centerX - gridWidth/2, centerY + y);
        ctx.lineTo(centerX + gridWidth/2, centerY + y);
        ctx.stroke();
      }
      
      // Vertical streets
      for (let x = -gridWidth/2; x <= gridWidth/2; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(centerX + x, centerY - gridHeight/2);
        ctx.lineTo(centerX + x, centerY + gridHeight/2);
        ctx.stroke();
      }

      // Animated limo
      const limoX = centerX + Math.cos(progress * Math.PI * 2) * 150;
      const limoY = centerY + Math.sin(progress * Math.PI * 2) * 50;
      
      ctx.strokeStyle = `rgba(255, 215, 0, ${progress})`;
      ctx.lineWidth = 2;
      
      // Limo body
      ctx.beginPath();
      ctx.rect(limoX - 40, limoY - 10, 80, 20);
      ctx.stroke();
      
      // Wheels
      ctx.beginPath();
      ctx.arc(limoX - 25, limoY + 10, 5, 0, Math.PI * 2);
      ctx.arc(limoX + 25, limoY + 10, 5, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawCodingScene = (progress) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw computer screen outline
      const screenWidth = 300;
      const screenHeight = 200;
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${progress})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(centerX - screenWidth/2, centerY - screenHeight/2, screenWidth, screenHeight);
      ctx.stroke();

      // Animated code lines
      const numLines = 8;
      const lineSpacing = screenHeight / (numLines + 1);
      
      for (let i = 0; i < numLines; i++) {
        const lineProgress = Math.max(0, Math.min(1, progress * 3 - i * 0.2));
        const lineWidth = (Math.random() * 0.4 + 0.6) * screenWidth * 0.8;
        const y = centerY - screenHeight/2 + lineSpacing * (i + 1);
        
        ctx.strokeStyle = `rgba(0, 255, 255, ${lineProgress * 0.8})`;
        ctx.beginPath();
        ctx.moveTo(centerX - screenWidth/2 + 20, y);
        ctx.lineTo(centerX - screenWidth/2 + 20 + lineWidth * lineProgress, y);
        ctx.stroke();
      }

      // Screen glow effect
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, screenWidth
      );
      gradient.addColorStop(0, `rgba(0, 255, 255, ${progress * 0.1})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(centerX - screenWidth, centerY - screenHeight, screenWidth * 2, screenHeight * 2);
    };

    const drawSISUGrowthScene = (progress) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Napkin sketch effect
      if (progress < 0.3) {
        const sketchProgress = progress / 0.3;
        ctx.strokeStyle = `rgba(255, 255, 255, ${sketchProgress})`;
        ctx.lineWidth = 1;
        
        // Draw rough sketch lines
        for (let i = 0; i < 5; i++) {
          const length = sketchProgress * 200;
          const y = centerY - 100 + i * 20;
          ctx.beginPath();
          ctx.moveTo(centerX - length/2 + Math.random() * 5, y + Math.random() * 5);
          ctx.lineTo(centerX + length/2 + Math.random() * 5, y + Math.random() * 5);
          ctx.stroke();
        }
      }

      // Factory blueprint and growth
      if (progress > 0.3) {
        const buildProgress = (progress - 0.3) / 0.7;
        const factoryWidth = 400;
        const factoryHeight = 200;
        
        // Factory outline
        ctx.strokeStyle = `rgba(255, 215, 0, ${buildProgress})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(centerX - factoryWidth/2, centerY - factoryHeight/2, 
                factoryWidth * buildProgress, factoryHeight);
        ctx.stroke();

        // Revenue graph
        if (buildProgress > 0.5) {
          const graphProgress = (buildProgress - 0.5) * 2;
          ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.moveTo(centerX - factoryWidth/2, centerY + factoryHeight/2 + 50);
          
          for (let i = 0; i <= factoryWidth * graphProgress; i += 5) {
            ctx.lineTo(
              centerX - factoryWidth/2 + i,
              centerY + factoryHeight/2 + 50 - Math.pow(i/factoryWidth, 2) * 200
            );
          }
          ctx.stroke();
        }
      }
    };

    const drawIPOScene = (progress) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Stock chart animation
      const chartWidth = 400;
      const chartHeight = 300;
      
      // Base grid
      ctx.strokeStyle = `rgba(255, 255, 255, ${progress * 0.3})`;
      ctx.lineWidth = 1;
      
      // Grid lines
      for (let i = 0; i <= 5; i++) {
        const y = centerY - chartHeight/2 + (chartHeight * i/5);
        ctx.beginPath();
        ctx.moveTo(centerX - chartWidth/2, y);
        ctx.lineTo(centerX + chartWidth/2, y);
        ctx.stroke();
      }

      // Dramatic rising chart
      ctx.strokeStyle = `rgba(0, 255, 255, ${progress})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX - chartWidth/2, centerY + chartHeight/2);
      
      for (let i = 0; i <= chartWidth * progress; i += 2) {
        const x = centerX - chartWidth/2 + i;
        const heightMultiplier = Math.min(1, i/(chartWidth * 0.8));
        const y = centerY + chartHeight/2 - 
                 (Math.pow(heightMultiplier, 2) * chartHeight * 0.8 + 
                  Math.sin(i * 0.05) * 20 * heightMultiplier);
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // IPO bell effect at peak
      if (progress > 0.8) {
        const bellProgress = (progress - 0.8) * 5;
        const rings = 3;
        for (let i = 0; i < rings; i++) {
          const ringProgress = Math.max(0, Math.min(1, bellProgress - i * 0.2));
          const radius = ringProgress * 100;
          
          ctx.strokeStyle = `rgba(255, 215, 0, ${(1 - ringProgress) * 0.5})`;
          ctx.beginPath();
          ctx.arc(centerX, centerY - chartHeight/2, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const drawEdTechScene = (progress) => {
      // Implementation of drawEdTechScene
    };

    const drawRealEstateScene = (progress) => {
      // Implementation of drawRealEstateScene
    };

    const drawFutureScene = (progress) => {
      // Implementation of drawFutureScene
    };

    const animate = (timestamp) => {
      if (!animating) return;
      timelineRef.current = timestamp;
      drawTimeline(timestamp);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    handleResize();
    animate(0);

    window.addEventListener('resize', handleResize);

    return () => {
      animating = false;
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <HeroSection>
      <Canvas ref={canvasRef} />
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