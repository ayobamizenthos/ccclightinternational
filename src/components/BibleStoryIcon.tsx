import { memo } from 'react';
import {
  Globe, Apple, Ship, Building2, Star, Heart, Sparkles,
  Flame, Waves, ScrollText, Sword, Crown, Fish, Users,
  Zap, Baby, Bird, Mountain, Wheat, Home, Sailboat,
  HandHeart, Wine, Moon, Cross, Sunrise, Map, Wind, Lightbulb
} from 'lucide-react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: string | number;
}

// Story icon mapping - replaces emojis with elegant icons
export const storyIconMap: Record<number, { icon: React.ComponentType<IconProps>; color: string; bg: string }> = {
  // Old Testament
  1: { icon: Globe, color: '#059669', bg: '#ECFDF5' }, // Creation
  2: { icon: Apple, color: '#DC2626', bg: '#FEF2F2' }, // Fall of Man
  3: { icon: Ship, color: '#0284C7', bg: '#F0F9FF' }, // Noah's Ark
  4: { icon: Building2, color: '#7C3AED', bg: '#F5F3FF' }, // Tower of Babel
  5: { icon: Star, color: '#D97706', bg: '#FFFBEB' }, // Abraham's Call
  6: { icon: Heart, color: '#DC2626', bg: '#FEF2F2' }, // Abraham's Faith
  7: { icon: Sparkles, color: '#7C3AED', bg: '#F5F3FF' }, // Joseph's Dreams
  8: { icon: Flame, color: '#EA580C', bg: '#FFF7ED' }, // Burning Bush
  9: { icon: Waves, color: '#0284C7', bg: '#F0F9FF' }, // Red Sea
  10: { icon: ScrollText, color: '#1D4ED8', bg: '#EFF6FF' }, // Ten Commandments
  11: { icon: Sword, color: '#6B7280', bg: '#F3F4F6' }, // David & Goliath
  12: { icon: Crown, color: '#B45309', bg: '#FFFBEB' }, // Daniel Lions
  13: { icon: Fish, color: '#0891B2', bg: '#ECFEFF' }, // Jonah
  14: { icon: Users, color: '#DB2777', bg: '#FDF2F8' }, // Ruth's Loyalty
  15: { icon: Zap, color: '#F59E0B', bg: '#FFFBEB' }, // Elijah
  
  // New Testament
  16: { icon: Baby, color: '#2563EB', bg: '#EFF6FF' }, // Birth of Jesus
  17: { icon: Bird, color: '#0D9488', bg: '#F0FDFA' }, // Baptism
  18: { icon: Mountain, color: '#059669', bg: '#ECFDF5' }, // Beatitudes
  19: { icon: Wheat, color: '#B45309', bg: '#FFFBEB' }, // Feeding 5000
  20: { icon: HandHeart, color: '#DC2626', bg: '#FEF2F2' }, // Good Samaritan
  21: { icon: Home, color: '#7C3AED', bg: '#F5F3FF' }, // Prodigal Son
  22: { icon: Sailboat, color: '#0284C7', bg: '#F0F9FF' }, // Calms Storm
  23: { icon: Sunrise, color: '#D97706', bg: '#FFFBEB' }, // Raising Lazarus
  24: { icon: Wine, color: '#7F1D1D', bg: '#FEF2F2' }, // Last Supper
  25: { icon: Moon, color: '#1E3A8A', bg: '#EFF6FF' }, // Gethsemane
  26: { icon: Cross, color: '#1F2937', bg: '#F3F4F6' }, // Crucifixion
  27: { icon: Sunrise, color: '#F59E0B', bg: '#FFFBEB' }, // Resurrection
  28: { icon: Map, color: '#059669', bg: '#ECFDF5' }, // Great Commission
  29: { icon: Wind, color: '#EA580C', bg: '#FFF7ED' }, // Pentecost
  30: { icon: Lightbulb, color: '#F59E0B', bg: '#FFFBEB' }, // Paul's Conversion
};

interface BibleStoryIconProps {
  storyId: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const BibleStoryIcon = memo(({ storyId, size = 'md', className = '' }: BibleStoryIconProps) => {
  const iconData = storyIconMap[storyId] || { icon: ScrollText, color: '#6B7280', bg: '#F3F4F6' };
  const IconComponent = iconData.icon;
  
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20'
  };
  
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10'
  };
  
  return (
    <div 
      className={`${sizeClasses[size]} rounded-2xl flex items-center justify-center ${className}`}
      style={{ backgroundColor: iconData.bg }}
    >
      <IconComponent 
        className={iconSizes[size]} 
        style={{ color: iconData.color }}
        strokeWidth={1.5}
      />
    </div>
  );
});

BibleStoryIcon.displayName = 'BibleStoryIcon';

export default BibleStoryIcon;