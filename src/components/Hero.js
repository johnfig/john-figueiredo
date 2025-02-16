import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';

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
    rgba(255, 255, 255, 1) 100%
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
  const theme = useTheme();

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

    // Define all scene drawing functions first
    const drawFutureScene = (progress, x, y) => {
      // AI network effect
      const nodes = 6;
      const radius = 80;
      
      // Draw nodes
      for (let i = 0; i < nodes; i++) {
        const angle = (i / nodes) * Math.PI * 2;
        const nodeX = x + Math.cos(angle) * radius;
        const nodeY = y + Math.sin(angle) * radius;
        
        // Node glow
        const gradient = ctx.createRadialGradient(
          nodeX, nodeY, 0, nodeX, nodeY, 15
        );
        gradient.addColorStop(0, `rgba(0, 255, 255, ${progress * 0.8})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect nodes
        for (let j = i + 1; j < nodes; j++) {
          const angle2 = (j / nodes) * Math.PI * 2;
          const node2X = x + Math.cos(angle2) * radius;
          const node2Y = y + Math.sin(angle2) * radius;
          
          // Animated connection
          const connectionProgress = Math.sin((progress * Math.PI + i * 0.5) % Math.PI);
          ctx.strokeStyle = `rgba(255, 215, 0, ${connectionProgress * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodeX, nodeY);
          ctx.lineTo(node2X, node2Y);
          ctx.stroke();
        }
      }

      // Central AI core
      const coreGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${progress * 0.2})`);
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawRealEstateScene = (progress, x, y) => {
      const buildingWidth = 60;
      const buildingHeight = 100;
      const numBuildings = 3;
      const spacing = buildingWidth * 1.5;
      
      // Draw multiple buildings
      for (let i = 0; i < numBuildings; i++) {
        const buildingX = x + (i - 1) * spacing;
        const height = buildingHeight * (0.7 + i * 0.3);
        const buildingProgress = Math.max(0, Math.min(1, progress * 3 - i * 0.3));
        
        ctx.strokeStyle = `rgba(255, 215, 0, ${buildingProgress})`;
        ctx.lineWidth = 2;
        
        // Building outline
        ctx.beginPath();
        ctx.rect(buildingX - buildingWidth/2, 
                y + buildingHeight/2 - height * buildingProgress,
                buildingWidth, height * buildingProgress);
        ctx.stroke();
        
        // Windows
        if (buildingProgress > 0.5) {
          const windowProgress = (buildingProgress - 0.5) * 2;
          ctx.strokeStyle = `rgba(0, 255, 255, ${windowProgress * 0.8})`;
          for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 3; col++) {
              ctx.beginPath();
              ctx.rect(buildingX - buildingWidth/3 + col * buildingWidth/3,
                      y + buildingHeight/2 - height * 0.8 + row * height/6,
                      buildingWidth/5, height/8);
              ctx.stroke();
            }
          }
        }
      }
    };

    const drawEdTechScene = (progress, x, y) => {
      // Cracking effect
      const size = 100;
      ctx.strokeStyle = `rgba(255, 255, 255, ${progress})`;
      ctx.lineWidth = 2;

      // Draw EdTech symbol
      ctx.beginPath();
      ctx.moveTo(x - size/2, y - size/2);
      ctx.lineTo(x + size/2, y + size/2);
      ctx.moveTo(x + size/2, y - size/2);
      ctx.lineTo(x - size/2, y + size/2);
      ctx.stroke();

      // Fracture effect
      if (progress > 0.5) {
        const fractures = 6;
        const fractureProg = (progress - 0.5) * 2;
        for (let i = 0; i < fractures; i++) {
          const angle = (i / fractures) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x + Math.cos(angle) * size * fractureProg,
            y + Math.sin(angle) * size * fractureProg
          );
          ctx.strokeStyle = `rgba(255, 0, 0, ${(1 - fractureProg) * 0.5})`;
          ctx.stroke();
        }
      }
    };

    const drawIPOScene = (progress, x, y) => {
      // Stock chart animation
      const chartWidth = 200;
      const chartHeight = 150;
      
      // Base grid
      ctx.strokeStyle = `rgba(255, 255, 255, ${progress * 0.3})`;
      ctx.lineWidth = 1;
      
      // Grid lines
      for (let i = 0; i <= 5; i++) {
        const gridY = y - chartHeight/2 + (chartHeight * i/5);
        ctx.beginPath();
        ctx.moveTo(x - chartWidth/2, gridY);
        ctx.lineTo(x + chartWidth/2, gridY);
        ctx.stroke();
      }

      // Dramatic rising chart
      ctx.strokeStyle = `rgba(0, 255, 255, ${progress})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - chartWidth/2, y + chartHeight/2);
      
      for (let i = 0; i <= chartWidth * progress; i += 2) {
        const chartX = x - chartWidth/2 + i;
        const heightMultiplier = Math.min(1, i/(chartWidth * 0.8));
        const chartY = y + chartHeight/2 - 
                 (Math.pow(heightMultiplier, 2) * chartHeight * 0.8 + 
                  Math.sin(i * 0.05) * 10 * heightMultiplier);
        ctx.lineTo(chartX, chartY);
      }
      ctx.stroke();

      // IPO bell effect at peak
      if (progress > 0.8) {
        const bellProgress = (progress - 0.8) * 5;
        const rings = 3;
        for (let i = 0; i < rings; i++) {
          const ringProgress = Math.max(0, Math.min(1, bellProgress - i * 0.2));
          const radius = ringProgress * 50;
          
          ctx.strokeStyle = `rgba(255, 215, 0, ${(1 - ringProgress) * 0.5})`;
          ctx.beginPath();
          ctx.arc(x, y - chartHeight/2, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const drawSISUGrowthScene = (progress, x, y) => {
      // Napkin sketch effect
      if (progress < 0.3) {
        const sketchProgress = progress / 0.3;
        ctx.strokeStyle = `rgba(255, 255, 255, ${sketchProgress})`;
        ctx.lineWidth = 1;
        
        // Draw rough sketch lines
        for (let i = 0; i < 5; i++) {
          const length = sketchProgress * 100;
          const lineY = y - 50 + i * 10;
          ctx.beginPath();
          ctx.moveTo(x - length/2 + Math.random() * 5, lineY + Math.random() * 5);
          ctx.lineTo(x + length/2 + Math.random() * 5, lineY + Math.random() * 5);
          ctx.stroke();
        }
      }

      // Factory blueprint and growth
      if (progress > 0.3) {
        const buildProgress = (progress - 0.3) / 0.7;
        const factoryWidth = 200;
        const factoryHeight = 100;
        
        // Factory outline
        ctx.strokeStyle = `rgba(255, 215, 0, ${buildProgress})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(x - factoryWidth/2, y - factoryHeight/2, 
                factoryWidth * buildProgress, factoryHeight);
        ctx.stroke();

        // Revenue graph
        if (buildProgress > 0.5) {
          const graphProgress = (buildProgress - 0.5) * 2;
          ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.moveTo(x - factoryWidth/2, y + factoryHeight/2 + 25);
          
          for (let i = 0; i <= factoryWidth * graphProgress; i += 5) {
            ctx.lineTo(
              x - factoryWidth/2 + i,
              y + factoryHeight/2 + 25 - Math.pow(i/factoryWidth, 2) * 100
            );
          }
          ctx.stroke();
        }
      }
    };

    const drawCodingScene = (progress, x, y) => {
      // Draw computer screen outline
      const screenWidth = 150;
      const screenHeight = 100;
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${progress})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(x - screenWidth/2, y - screenHeight/2, screenWidth, screenHeight);
      ctx.stroke();

      // Animated code lines
      const numLines = 6;
      const lineSpacing = screenHeight / (numLines + 1);
      
      for (let i = 0; i < numLines; i++) {
        const lineProgress = Math.max(0, Math.min(1, progress * 3 - i * 0.2));
        const lineWidth = (Math.random() * 0.4 + 0.6) * screenWidth * 0.8;
        const lineY = y - screenHeight/2 + lineSpacing * (i + 1);
        
        ctx.strokeStyle = `rgba(0, 255, 255, ${lineProgress * 0.8})`;
        ctx.beginPath();
        ctx.moveTo(x - screenWidth/2 + 10, lineY);
        ctx.lineTo(x - screenWidth/2 + 10 + lineWidth * lineProgress, lineY);
        ctx.stroke();
      }

      // Screen glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, screenWidth/2);
      gradient.addColorStop(0, `rgba(0, 255, 255, ${progress * 0.1})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(x - screenWidth, y - screenHeight, screenWidth * 2, screenHeight * 2);
    };

    const drawLimoScene = (progress, x, y) => {
      // Draw city street grid around current position
      const gridSize = 30;
      const gridWidth = 200;
      const gridHeight = 100;
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${progress * 0.3})`;
      ctx.lineWidth = 1;
      
      // Horizontal streets
      for (let offsetY = -gridHeight/2; offsetY <= gridHeight/2; offsetY += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x - gridWidth/2, y + offsetY);
        ctx.lineTo(x + gridWidth/2, y + offsetY);
        ctx.stroke();
      }
      
      // Vertical streets
      for (let offsetX = -gridWidth/2; offsetX <= gridWidth/2; offsetX += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + offsetX, y - gridHeight/2);
        ctx.lineTo(x + offsetX, y + gridHeight/2);
        ctx.stroke();
      }

      // Animated limo
      const limoX = x + Math.cos(progress * Math.PI * 2) * 50;
      const limoY = y + Math.sin(progress * Math.PI * 2) * 20;
      
      ctx.strokeStyle = `rgba(255, 215, 0, ${progress})`;
      ctx.lineWidth = 2;
      
      // Limo body
      ctx.beginPath();
      ctx.rect(limoX - 20, limoY - 5, 40, 10);
      ctx.stroke();
      
      // Wheels
      ctx.beginPath();
      ctx.arc(limoX - 12, limoY + 5, 3, 0, Math.PI * 2);
      ctx.arc(limoX + 12, limoY + 5, 3, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawRunnerScene = (progress, x, y) => {
      ctx.save();
      ctx.translate(x, y);
      
      // Trophy animation phase
      const trophyOpacity = Math.min(1, progress * 1.5);
      
      // Trophy colors
      ctx.strokeStyle = `rgba(255, 215, 0, ${trophyOpacity})`;
      ctx.fillStyle = `rgba(255, 215, 0, ${trophyOpacity * 0.3})`;
      ctx.lineWidth = 2;
      
      // Draw trophy
      // Cup body - tapered shape
      ctx.beginPath();
      // Top rim - wider at top
      ctx.moveTo(-20, -45);
      ctx.lineTo(20, -45);
      // Cup sides with elegant taper
      ctx.quadraticCurveTo(25, -45, 25, -35); // Wider curve at top
      ctx.quadraticCurveTo(18, -15, 10, 0);   // Taper to narrow bottom
      ctx.lineTo(-10, 0);  // Narrow base
      ctx.quadraticCurveTo(-18, -15, -25, -35); // Mirror taper on left side
      ctx.quadraticCurveTo(-25, -45, -20, -45);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      
      // Handles - adjusted to match tapered cup
      // Left handle
      ctx.beginPath();
      ctx.moveTo(-25, -35); // Start at cup edge
      ctx.quadraticCurveTo(-35, -35, -35, -25); // Outer curve
      ctx.quadraticCurveTo(-35, -15, -25, -15); // Bottom curve
      ctx.lineTo(-25, -15); // Connect back to cup
      ctx.stroke();
      
      // Right handle
      ctx.beginPath();
      ctx.moveTo(25, -35); // Start at cup edge
      ctx.quadraticCurveTo(35, -35, 35, -25); // Outer curve
      ctx.quadraticCurveTo(35, -15, 25, -15); // Bottom curve
      ctx.lineTo(25, -15); // Connect back to cup
      ctx.stroke();
      
      // Base structure
      // Top platform - narrower to match cup bottom
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(10, 0);
      ctx.lineTo(8, 5);
      ctx.lineTo(-8, 5);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      
      // Middle column - taller and more elegant
      ctx.beginPath();
      ctx.moveTo(-5, 5);
      ctx.lineTo(5, 5);
      ctx.lineTo(6, 20); // Taller middle section
      ctx.lineTo(-6, 20);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      
      // Bottom base - proportional width
      ctx.beginPath();
      ctx.moveTo(-20, 20);
      ctx.lineTo(20, 20);
      ctx.lineTo(16, 25);
      ctx.lineTo(-16, 25);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      
      // Add trophy glow
      if (progress > 0.5) {
        const glowOpacity = (progress - 0.5) * 2;
        const gradient = ctx.createRadialGradient(0, -20, 0, 0, -20, 60);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${glowOpacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(-60, -60, 120, 120);
      }
      
      // Add sparkles
      if (progress > 0.7) {
        const sparkleOpacity = (progress - 0.7) * 3;
        for (let i = 0; i < 6; i++) {
          const angle = progress * 5 + i * Math.PI / 3;
          const radius = 40 + Math.sin(angle * 3) * 5;
          const sparkleX = Math.cos(angle) * radius;
          const sparkleY = Math.sin(angle) * radius - 20;
          
          ctx.strokeStyle = `rgba(255, 255, 255, ${sparkleOpacity * 0.8})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(sparkleX - 4, sparkleY);
          ctx.lineTo(sparkleX + 4, sparkleY);
          ctx.moveTo(sparkleX, sparkleY - 4);
          ctx.lineTo(sparkleX, sparkleY + 4);
          ctx.stroke();
        }
      }
      
      ctx.restore();
    };

    // Now define stages after all scene functions are defined
    const stages = [
      { text: "2025+: The Next Chapter", scene: drawFutureScene },
      { text: "2023: Real Estate Investing", scene: drawRealEstateScene },
      { text: "2022: EdTech Startup", scene: drawEdTechScene },
      { text: "2021: SISU IPO", scene: drawIPOScene },
      { text: "2018-2021: Built SISU to $100M", scene: drawSISUGrowthScene },
      { text: "2012-2018: Learned to Code", scene: drawCodingScene },
      { text: "2011-2012: Driving a Limo", scene: drawLimoScene },
      { text: "2000-2010: Nationally Ranked Runner", scene: drawRunnerScene }
    ];

    const drawTimeline = (time) => {
      const duration = 40000;
      const progress = Math.min(1, (time % duration) / duration);
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 9, 25, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid(time * 0.5);

      // Responsive sizing
      const isMobile = canvas.width < 768;
      const timelineCenterX = canvas.width / 2;
      const offsetX = isMobile ? 80 : 150;
      const stageSpacing = isMobile ? 250 : 300;
      const fontSize = isMobile ? 12 : 16;
      const sceneScale = isMobile ? 0.7 : 1;

      // Calculate base position for all elements
      const totalHeight = canvas.height * 2.5;
      const scrollOffset = progress * totalHeight;
      const baseY = canvas.height + 1900 - scrollOffset;

      // Draw "My Life Journey" title first
      const titleY = baseY - (stages.length * stageSpacing) - 100;
      if (titleY < canvas.height + 100 && titleY > -100) {
        const fadeProgress = Math.max(0, Math.min(1,
          (canvas.height - titleY + 300) / 400
        ));
        
        // Center title above timeline
        ctx.font = `${isMobile ? 28 : 32}px ${theme.fonts.heading}`;
        ctx.textAlign = 'center';
        
        // Add text shadow for better visibility
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        // Draw main title
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * fadeProgress})`;
        ctx.fillText('My Life Journey', timelineCenterX, titleY);
        
        // Draw SISU definition below the title
        ctx.font = `${isMobile ? 16 : 20}px ${theme.fonts.heading}`;
        ctx.fillStyle = `rgba(255, 215, 0, ${0.9 * fadeProgress})`; // Yellow color
        ctx.fillText('SISU (n.) - Persevering against all odds', timelineCenterX, titleY + 40);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // Draw timeline path starting below the title
      const timelineStartY = titleY + 70; // Changed from 40 to 70 to add more space
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = isMobile ? 2 : 3;
      ctx.beginPath();
      ctx.moveTo(timelineCenterX, timelineStartY);
      ctx.lineTo(timelineCenterX, canvas.height);
      ctx.stroke();

      // Draw stages
      stages.forEach((stage, index) => {
        const stageY = baseY - (index * stageSpacing);
        const isLeft = index % 2 === 0;
        
        // Center animations in each half for mobile
        const sceneX = isMobile ? 
          (isLeft ? canvas.width * 0.25 : canvas.width * 0.75) : // Center in each half on mobile
          timelineCenterX + (isLeft ? -offsetX : offsetX); // Desktop positioning
        
        // Only draw stages that are on screen
        if (stageY < canvas.height + 100 && stageY > -100) {
          // Calculate fade-in based on entry from bottom
          const fadeProgress = Math.max(0, Math.min(1,
            (canvas.height - stageY + 300) / 400
          ));

          // Calculate stage progress
          const stageProgress = Math.max(0, Math.min(1, 
            (canvas.height - stageY + 300) / canvas.height
          ));

          // Draw stage marker
          ctx.beginPath();
          ctx.arc(timelineCenterX, stageY, isMobile ? 3 : 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * fadeProgress})`;
          ctx.fill();

          // Draw connection line to scene - extend 50px from timeline
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * fadeProgress})`;
          ctx.beginPath();
          ctx.moveTo(timelineCenterX, stageY);
          
          // Line extends 50px from center
          const lineEndX = isLeft ? 
            timelineCenterX - 50 : // Left side: 50px to the left
            timelineCenterX + 50;  // Right side: 50px to the right
          
          ctx.lineTo(lineEndX, stageY);
          ctx.stroke();

          // Save context for scene scaling
          ctx.save();
          ctx.translate(sceneX, stageY);
          ctx.scale(sceneScale, sceneScale);
          ctx.translate(-sceneX, -stageY);

          // Draw stage scene with fade
          stage.scene(stageProgress * fadeProgress, sceneX, stageY);
          
          // Restore context
          ctx.restore();

          // Draw stage text with fade
          ctx.textAlign = 'center';

          // Split text into date and title
          const [date, ...titleParts] = stage.text.split(': ');
          const title = titleParts.join(': ');

          // Calculate text position with proper spacing
          const dateY = stageY - (isMobile ? 85 : 120);
          const titleY = stageY - (isMobile ? 65 : 95);

          // Adjust font sizes
          ctx.font = `${fontSize}px Arial`; // Date font
          const dateWidth = ctx.measureText(date).width;

          ctx.font = `bold ${fontSize}px Arial`; // Title font
          const titleWidth = ctx.measureText(title).width;

          // Calculate maximum width for background
          const maxWidth = Math.max(dateWidth, titleWidth);
          const padding = isMobile ? 10 : 20;
          const bgHeight = isMobile ? 45 : 55;

          // Calculate text position with half-screen centering for mobile
          const textX = isMobile ? 
            (isLeft ? canvas.width * 0.25 : canvas.width * 0.75) : // Center in each half on mobile
            sceneX; // Desktop positioning

          // Draw text background
          const bgX = textX - maxWidth/2 - padding;
          ctx.fillStyle = `rgba(0, 9, 25, ${0.25 * fadeProgress})`;
          ctx.fillRect(
            bgX,
            dateY - fontSize - padding/2,
            maxWidth + padding * 2,
            bgHeight
          );

          // Draw date
          ctx.font = `${fontSize}px Arial`;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.7 * stageProgress * fadeProgress})`;
          ctx.fillText(date, textX, dateY);

          // Draw title
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.fillStyle = `rgba(255, 255, 255, ${stageProgress * fadeProgress})`;
          ctx.fillText(title, textX, titleY);
        }
      });

      // Draw runner following the timeline
      const runnerY = Math.max(100, Math.min(canvas.height - 100, baseY));
      drawRunner(timelineCenterX, runnerY, progress);
    };

    const drawRunner = (x, y, progress) => {
      const runnerSize = 20;
      const bounceOffset = Math.sin(progress * Math.PI * 8) * 5;
      
      // Runner glow
      const gradient = ctx.createRadialGradient(
        x, y + bounceOffset, 0,
        x, y + bounceOffset, runnerSize * 2
      );
      gradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y + bounceOffset, runnerSize * 2, 0, Math.PI * 2);
      ctx.fill();

      // Runner core
      ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
      ctx.beginPath();
      ctx.arc(x, y + bounceOffset, runnerSize / 2, 0, Math.PI * 2);
      ctx.fill();
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
  }, [theme]);

  return (
    <HeroSection id="hero">
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
      </Title>
    </HeroSection>
  );
};

export default Hero; 