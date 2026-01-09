// VirtualScreen.js - In-world presentation display
// Supports slides, videos, documents, and interactive annotations

import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Screen frame/bezel
 */
const ScreenFrame = ({ width, height, depth = 0.1 }) => {
  const frameThickness = 0.1;

  return (
    <group>
      {/* Frame edges */}
      {/* Top */}
      <mesh position={[0, height / 2 + frameThickness / 2, 0]}>
        <boxGeometry args={[width + frameThickness * 2, frameThickness, depth]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -height / 2 - frameThickness / 2, 0]}>
        <boxGeometry args={[width + frameThickness * 2, frameThickness, depth]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Left */}
      <mesh position={[-width / 2 - frameThickness / 2, 0, 0]}>
        <boxGeometry args={[frameThickness, height, depth]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Right */}
      <mesh position={[width / 2 + frameThickness / 2, 0, 0]}>
        <boxGeometry args={[frameThickness, height, depth]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

/**
 * Slide presentation display
 */
const SlideDisplay = ({ content, width, height }) => {
  const { title, body, slideNumber, totalSlides } = content;

  return (
    <Html
      transform
      distanceFactor={10}
      position={[0, 0, 0.05]}
      style={{
        width: `${width * 100}px`,
        height: `${height * 100}px`,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '8px',
        padding: '40px',
        color: 'white',
        overflow: 'auto',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '48px', margin: '0 0 30px 0', fontWeight: 'bold' }}>
          {title}
        </h1>
        <div style={{ flex: 1, fontSize: '24px', lineHeight: '1.6' }}>
          {body}
        </div>
        <div style={{ fontSize: '18px', opacity: 0.8, textAlign: 'right' }}>
          Slide {slideNumber} of {totalSlides}
        </div>
      </div>
    </Html>
  );
};

/**
 * Video player display
 */
const VideoDisplay = ({ content, width, height }) => {
  const { videoUrl, title, isPlaying } = content;

  return (
    <Html
      transform
      distanceFactor={10}
      position={[0, 0, 0.05]}
      style={{
        width: `${width * 100}px`,
        height: `${height * 100}px`,
        background: '#000',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {videoUrl ? (
          <video
            src={videoUrl}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            controls
            autoPlay={isPlaying}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px'
          }}>
            {title || 'No video loaded'}
          </div>
        )}
      </div>
    </Html>
  );
};

/**
 * Document viewer display
 */
const DocumentDisplay = ({ content, width, height }) => {
  const { documentUrl, title, page } = content;

  return (
    <Html
      transform
      distanceFactor={10}
      position={[0, 0, 0.05]}
      style={{
        width: `${width * 100}px`,
        height: `${height * 100}px`,
        background: 'white',
        borderRadius: '8px',
        padding: '30px',
        overflow: 'auto',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ height: '100%' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>{title}</h2>
        {documentUrl ? (
          <iframe
            src={`${documentUrl}#page=${page || 1}`}
            style={{
              width: '100%',
              height: 'calc(100% - 60px)',
              border: 'none',
              borderRadius: '4px'
            }}
            title={title}
          />
        ) : (
          <div style={{ color: '#666', fontSize: '18px' }}>
            No document loaded
          </div>
        )}
      </div>
    </Html>
  );
};

/**
 * Research poster display
 */
const PosterDisplay = ({ content, width, height }) => {
  const { title, authors, abstract, methods, results, conclusions } = content;

  return (
    <Html
      transform
      distanceFactor={10}
      position={[0, 0, 0.05]}
      style={{
        width: `${width * 100}px`,
        height: `${height * 100}px`,
        background: 'white',
        borderRadius: '8px',
        padding: '30px',
        overflow: 'auto',
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div>
        <h1 style={{ color: '#2196F3', fontSize: '36px', margin: '0 0 15px 0' }}>
          {title}
        </h1>
        <h3 style={{ color: '#666', fontSize: '20px', margin: '0 0 25px 0', fontWeight: 'normal' }}>
          {authors}
        </h3>

        {abstract && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Abstract</h2>
            <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6' }}>{abstract}</p>
          </div>
        )}

        {methods && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Methods</h2>
            <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6' }}>{methods}</p>
          </div>
        )}

        {results && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Results</h2>
            <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6' }}>{results}</p>
          </div>
        )}

        {conclusions && (
          <div>
            <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Conclusions</h2>
            <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6' }}>{conclusions}</p>
          </div>
        )}
      </div>
    </Html>
  );
};

/**
 * Default/placeholder display
 */
const PlaceholderDisplay = ({ width, height, message }) => {
  return (
    <group>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#2196F3"
          emissiveIntensity={0.2}
        />
      </mesh>
      <Text
        position={[0, 0, 0.02]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={width - 0.5}
      >
        {message || 'No content'}
      </Text>
    </group>
  );
};

/**
 * Interactive annotations overlay
 */
const Annotations = ({ annotations = [], width, height }) => {
  if (!annotations || annotations.length === 0) return null;

  return (
    <group>
      {annotations.map((annotation, index) => {
        // Convert normalized coordinates to screen space
        const x = (annotation.x - 0.5) * width;
        const y = (0.5 - annotation.y) * height;

        return (
          <group key={index} position={[x, y, 0.1]}>
            {/* Annotation marker */}
            <mesh>
              <circleGeometry args={[0.1, 16]} />
              <meshBasicMaterial color="#FF9800" transparent opacity={0.8} />
            </mesh>
            {/* Annotation text */}
            <Text
              position={[0.3, 0, 0]}
              fontSize={0.15}
              color="#FF9800"
              anchorX="left"
              anchorY="middle"
              maxWidth={2}
            >
              {annotation.text}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

/**
 * Glow effect for active screen
 */
const ScreenGlow = ({ width, height, isActive }) => {
  const glowRef = useRef();

  useFrame((state) => {
    if (glowRef.current && isActive) {
      const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.intensity = intensity;
    }
  });

  if (!isActive) return null;

  return (
    <pointLight
      ref={glowRef}
      position={[0, 0, 0.5]}
      color="#2196F3"
      intensity={0.3}
      distance={Math.max(width, height) * 2}
    />
  );
};

/**
 * Main VirtualScreen Component
 */
const VirtualScreen = ({
  position = [0, 2, -5],
  rotation = [0, 0, 0],
  scale = [5, 3, 0.1],
  contentType = 'placeholder',
  content = {},
  annotations = [],
  showFrame = true,
  isActive = false,
  onClick = null
}) => {
  const screenRef = useRef();
  const [hovered, setHovered] = useState(false);

  const width = scale[0];
  const height = scale[1];

  // Handle click interaction
  const handleClick = (event) => {
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    }
  };

  // Render content based on type
  const renderContent = () => {
    switch (contentType) {
      case 'slide':
        return <SlideDisplay content={content} width={width} height={height} />;
      case 'video':
        return <VideoDisplay content={content} width={width} height={height} />;
      case 'document':
        return <DocumentDisplay content={content} width={width} height={height} />;
      case 'poster':
        return <PosterDisplay content={content} width={width} height={height} />;
      default:
        return <PlaceholderDisplay width={width} height={height} message={content.message} />;
    }
  };

  return (
    <group
      ref={screenRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Screen background */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, 0.1]} />
        <meshStandardMaterial
          color={hovered ? '#333' : '#1a1a1a'}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Screen frame */}
      {showFrame && <ScreenFrame width={width} height={height} />}

      {/* Content display */}
      {renderContent()}

      {/* Annotations */}
      <Annotations annotations={annotations} width={width} height={height} />

      {/* Glow effect */}
      <ScreenGlow width={width} height={height} isActive={isActive} />
    </group>
  );
};

/**
 * Screen Gallery - Multiple screens in a layout
 */
export const ScreenGallery = ({ screens = [] }) => {
  return (
    <group>
      {screens.map((screen, index) => (
        <VirtualScreen
          key={screen.id || index}
          position={screen.position}
          rotation={screen.rotation}
          scale={screen.scale}
          contentType={screen.contentType}
          content={screen.content}
          annotations={screen.annotations}
          showFrame={screen.showFrame}
          isActive={screen.isActive}
          onClick={screen.onClick}
        />
      ))}
    </group>
  );
};

export default VirtualScreen;
