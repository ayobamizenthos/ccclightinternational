import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';
import useHapticFeedback from '@/hooks/useHapticFeedback';

interface HapticButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
  children: ReactNode;
  hapticType?: 'light' | 'medium' | 'heavy' | 'success';
  enableSound?: boolean;
  variant?: 'default' | 'primary' | 'ghost';
}

const HapticButton = forwardRef<HTMLButtonElement, HapticButtonProps>(({
  children,
  hapticType = 'light',
  enableSound = true,
  variant = 'default',
  onClick,
  className = '',
  ...props
}, ref) => {
  const { trigger } = useHapticFeedback();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trigger(hapticType, enableSound);
    onClick?.(e);
  };

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
});

HapticButton.displayName = 'HapticButton';

export default HapticButton;
