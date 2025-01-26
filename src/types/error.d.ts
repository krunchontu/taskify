import { ErrorInfo } from 'react';

declare module 'react-error-boundary' {
  export interface FallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
    errorInfo?: ErrorInfo;
  }
}
