import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Loading = ({
  variant = 'inline',
  size = 'default',
  className,
  text,
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    default: 'h-4 w-4',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  };

  const baseSpinner = (
    <Loader2
      className={cn(
        'animate-spin text-primary',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );

  switch (variant) {
    case 'page':
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
          {baseSpinner}
          {text && (
            <p className="text-sm text-muted-foreground animate-pulse">
              {text}
            </p>
          )}
        </div>
      );

    case 'overlay':
      return (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            {baseSpinner}
            {text && (
              <p className="text-sm text-muted-foreground animate-pulse">
                {text}
              </p>
            )}
          </div>
        </div>
      );

    case 'button':
      return (
        <div className="flex items-center gap-2">
          {baseSpinner}
          {text && (
            <span className="text-sm">
              {text}
            </span>
          )}
        </div>
      );

    case 'card':
      return (
        <div className="flex flex-col items-center justify-center p-8 gap-4">
          {baseSpinner}
          {text && (
            <p className="text-sm text-muted-foreground animate-pulse">
              {text}
            </p>
          )}
        </div>
      );

    case 'inline':
    default:
      return (
        <div className="flex items-center gap-2">
          {baseSpinner}
          {text && (
            <span className="text-sm text-muted-foreground animate-pulse">
              {text}
            </span>
          )}
        </div>
      );
  }
};

export { Loading };
