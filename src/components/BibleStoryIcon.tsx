import { memo } from 'react';
import { ScrollText } from 'lucide-react';
import { storyIconMap } from '@/components/ui/bible-story-icons';

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