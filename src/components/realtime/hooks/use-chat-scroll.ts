import { useEffect, useRef, useState } from 'react';

export const useChatScroll = (isOpen: boolean, msgsLength: number, currentUserId?: string, lastMsgSessionId?: string) => {
  const chatContainer = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [unreads, setUnreads] = useState(0);

  // Use ref to track isAtBottom for the effect without adding it to deps
  const isAtBottomRef = useRef(isAtBottom);
  useEffect(() => { isAtBottomRef.current = isAtBottom; }, [isAtBottom]);

  const scrollToBottom = (smooth = true) => {
    if (!chatContainer.current) return;
    const viewport = chatContainer.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (viewport) {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      });
      setUnreads(0);
      setShowScrollButton(false);
    }
  };

  // Initial scroll to bottom
  useEffect(() => {
    if (isOpen) {
      // Small timeout to ensure content is rendered
      setTimeout(() => scrollToBottom(false), 100);
    }
  }, [isOpen]);

  // Handle scroll events
  useEffect(() => {
    const container = chatContainer.current;
    if (!container) return;

    const viewport = container.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (!viewport) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;
      const atBottom = distanceToBottom < 20; // 20px threshold

      setIsAtBottom(atBottom);

      if (atBottom) {
        setUnreads(0);
        setShowScrollButton(false);
      } else {
        setShowScrollButton(true);
      }
    };

    viewport.addEventListener('scroll', handleScroll);
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Handle new messages
  useEffect(() => {
    if (msgsLength === 0) return;

    const isMe = lastMsgSessionId === currentUserId;

    if (isAtBottomRef.current || isMe) {
      scrollToBottom(true);
    } else {
      setUnreads(prev => prev + 1);
    }
  }, [msgsLength, currentUserId]);

  return {
    chatContainer,
    showScrollButton,
    unreads,
    scrollToBottom,
    isAtBottomRef
  };
};
