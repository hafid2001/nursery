import { Loading } from '@/components/ui/loading';

// Global Loading Component for Parent pages
// Use this component in all Parent pages while fetching data
const ParentLoading = ({ variant = 'page', text = 'جاري التحميل...', className, ...props }) => {
  return (
    <Loading
      variant={variant}
      text={text}
      className={className}
      {...props}
    />
  );
};

export { ParentLoading };
