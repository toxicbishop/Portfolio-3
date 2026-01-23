import { useCallback, useEffect, useRef } from "react";

export const useSounds = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const pressBufferRef = useRef<AudioBuffer | null>(null);
  const releaseBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const loadSound = async () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        const response = await fetch('/assets/keycap-sounds/press.mp3');
        const arrayBuffer = await response.arrayBuffer();
        const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);
        pressBufferRef.current = decodedBuffer;

        const releaseResponse = await fetch('/assets/keycap-sounds/release.mp3');
        const releaseArrayBuffer = await releaseResponse.arrayBuffer();
        const releaseDecodedBuffer = await ctx.decodeAudioData(releaseArrayBuffer);
        releaseBufferRef.current = releaseDecodedBuffer;
      } catch (error) {
        console.error("Failed to load keycap sound", error);
      }
    };

    loadSound();

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const getContext = useCallback(() => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((startFreq: number, endFreq: number, duration: number, vol: number) => {
    try {
      const ctx = getContext();
      if (!ctx) return;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = "sine";
      const startTime = ctx.currentTime;

      oscillator.frequency.setValueAtTime(startFreq, startTime);
      oscillator.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(vol, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    } catch (error) {
      console.error("Failed to play notification sound", error);
    }
  }, [getContext]);

  const playSoundBuffer = useCallback((buffer: AudioBuffer | null, baseDetune = 0) => {
    try {
      const ctx = getContext();
      if (!ctx || !buffer) return;

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Add slight variation
      source.detune.value = baseDetune + (Math.random() * 200) - 100;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.4;

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start(0);
    } catch (err) {
      console.error(err);
    }
  }, [getContext]);

  const playPressSound = useCallback(() => {
    playSoundBuffer(pressBufferRef.current);
  }, [playSoundBuffer]);

  const playReleaseSound = useCallback(() => {
    playSoundBuffer(releaseBufferRef.current);
  }, [playSoundBuffer]);

  // Send: Clear, slightly higher pitch, quick
  const playSendSound = useCallback(() => {
    playTone(600, 300, 0.25, 0.08);
  }, [playTone]);

  // Receive: Lower pitch, bubble-like, slightly longer
  const playReceiveSound = useCallback(() => {
    playTone(800, 400, 0.35, 0.1);
  }, [playTone]);

  return { playSendSound, playReceiveSound, playPressSound, playReleaseSound };
};
