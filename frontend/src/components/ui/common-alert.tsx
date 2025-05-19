import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface CommonAlertProps {
  show: boolean;
  variant?: 'default' | 'destructive';
  title: string;
  description: string;
}

function CommonAlert({
  show,
  variant = 'default',
  title,
  description,
}: CommonAlertProps) {
  if (!show) return null;

  return (
    <Alert variant={variant} className="flex items-center space-x-2">
      <AlertCircle className="h-4 w-4" />
      <div>
        <AlertTitle>{title}</AlertTitle>
        {description && (
          <AlertDescription
            className={variant === 'destructive' ? 'text-red-500' : ''}
          >
            {description}
          </AlertDescription>
        )}
      </div>
    </Alert>
  );
}

export { CommonAlert };
