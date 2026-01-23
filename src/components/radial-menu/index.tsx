'use client';

import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import confetti from 'canvas-confetti';
import { RadialMenuPresentational } from './radial-menu-presentational';
import { MenuItem, Position } from './types';
import { SocketContext } from '@/contexts/socketio';

// Define our menu items
const MENU_ITEMS: MenuItem[] = [
  { id: 'love', emoji: '❤️', label: 'Love', color: '#ef4444' },
  { id: 'laugh', emoji: '😂', label: 'Haha', color: '#fbbf24' },
  { id: 'wow', emoji: '😮', label: 'Wow', color: '#3b82f6' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: '#60a5fa' },
  { id: 'angry', emoji: '😡', label: 'Angry', color: '#f97316' },
  { id: 'fire', emoji: '🔥', label: 'Lit', color: '#f59e0b' },
];

const DEAD_ZONE = 20; // Radius where nothing is selected
const HOLD_DELAY = 0; // ms to hold right click before opening menu

export default function RadialMenu() {
  const { socket } = useContext(SocketContext);
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<Position>({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Refs
  const isOpenRef = useRef(false);
  const menuPosRef = useRef<Position>({ x: 0, y: 0 });
  const activeIndexRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const suppressMenuRef = useRef(false);

  // Track our own triggers to ignore echos
  const myTriggersRef = useRef<Set<string>>(new Set());

  // Sync refs
  useEffect(() => {
    isOpenRef.current = isOpen;
    menuPosRef.current = menuPos;
    activeIndexRef.current = activeIndex;
  }, [isOpen, menuPos, activeIndex]);

  // Handle Confetti
  const fireConfetti = useCallback((pageX: number, pageY: number, emoji: string) => {
    // Normalize coordinates relative to the viewport
    const normalizedX = (pageX - window.scrollX) / window.innerWidth;
    const normalizedY = (pageY - window.scrollY) / window.innerHeight;

    // Fire multiple bursts with different scalar values for random sizes
    const count = 5;

    for (let i = 0; i < count; i++) {
      const scalar = 1.5 + Math.random() * 5;
      const emojiShape = confetti.shapeFromText({ text: emoji, scalar });

      confetti({
        particleCount: 15,
        spread: 60 + Math.random() * 20,
        origin: { x: normalizedX, y: normalizedY },
        shapes: [emojiShape],
        scalar,
        disableForReducedMotion: true,
        zIndex: 9999,
        startVelocity: 25 + Math.random() * 10,
        gravity: 0.6 + Math.random() * 0.4,
        drift: (Math.random() - 0.5) * 0.5,
      });
    }
  }, []);

  const triggerConfetti = (x: number, y: number, item: MenuItem) => {
    // 1. Trigger Locally using Page Coordinates
    fireConfetti(x, y, item.emoji);
  };

  // Listen for remote confetti
  useEffect(() => {
    if (!socket) return;

    const handleConfettiReceive = (data: { id: string; emoji: string; x: number; y: number }) => {
      // Ignore if it's our own
      if (myTriggersRef.current.has(data.id)) {
        // clean up old IDs
        myTriggersRef.current.delete(data.id);
        return;
      }

      // Received data is in Page Coordinates, fire directly
      fireConfetti(data.x, data.y, data.emoji);
    };

    socket.on("confetti-receive", handleConfettiReceive);

    return () => {
      socket.off("confetti-receive", handleConfettiReceive);
    };
  }, [socket, fireConfetti]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    // Check for Right Click (button 2)
    if (e.button === 2) {
      const pos = { x: e.clientX, y: e.clientY };

      // Start timer
      timerRef.current = setTimeout(() => {
        setMenuPos(pos);
        setIsOpen(true);
        setActiveIndex(null);
        suppressMenuRef.current = true; // Mark as suppressing the context menu
      }, HOLD_DELAY);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isOpenRef.current) return;

    const currentPos = { x: e.clientX, y: e.clientY };
    const origin = menuPosRef.current;

    const dist = getDistance(origin, currentPos);

    if (dist < DEAD_ZONE) {
      if (activeIndexRef.current !== null) setActiveIndex(null);
      return;
    }

    // Calculate Angle
    const angle = getAngle(origin, currentPos);

    // Use original menu items
    const count = MENU_ITEMS.length;
    const slice = 360 / count / 2; // Half slice for each side of the center line

    // Shift angle so that 0 is at -90deg (North)
    const normalizedAngle = (angle + 90) % 360;

    // Ensure positive modulus
    const positiveAngle = normalizedAngle < 0 ? normalizedAngle + 360 : normalizedAngle;

    // Calculate index based on angle
    const index = Math.floor(positiveAngle / (360 / count));

    if (activeIndexRef.current !== index) {
      setActiveIndex(index);
    }
  }, []);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    // Always clear timer on mouse up
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Only care if we are open
    if (isOpenRef.current) {
      // If we have an active selection
      if (activeIndexRef.current !== null) {
        const item = MENU_ITEMS[activeIndexRef.current];
        // Trigger action
        triggerConfetti(e.pageX, e.pageY, item);

        // Broadcast to others
        if (socket) {
          const burstId = `${socket.id}-${Date.now()}-${Math.random()}`;
          myTriggersRef.current.add(burstId);

          // clean up old IDs
          if (myTriggersRef.current.size > 100) {
            myTriggersRef.current.clear();
          }

          socket.emit("confetti-send", {
            id: burstId,
            emoji: item.emoji,
            x: e.pageX,
            y: e.pageY,
          });
        }
      }

      setIsOpen(false);
      setActiveIndex(null);
    } else {
    }
  }, [triggerConfetti]);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    if (suppressMenuRef.current) {
      e.preventDefault();
      suppressMenuRef.current = false;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleContextMenu]);

  return (
    <RadialMenuPresentational
      isOpen={isOpen}
      position={menuPos}
      items={MENU_ITEMS}
      activeIndex={activeIndex}
    />
  );
}

const getDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

const getAngle = (origin: { x: number; y: number }, target: { x: number; y: number }) => {
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  let theta = Math.atan2(dy, dx);
  theta *= 180 / Math.PI; // rads to degs
  return theta;
};
