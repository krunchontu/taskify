import { Button } from './theme/components/Button.styles';
import styled from 'styled-components';
import { AppTheme } from './theme/theme';
import { useNavigate } from 'react-router-dom';

const ErrorContainer = styled.div<{ theme: AppTheme }>`
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.radii.lg};
  max-width: 600px;
  margin: ${({ theme }) => theme.spacing(4)} auto;
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorDetails = styled.pre<{ theme: AppTheme }>`
  white-space: pre-wrap;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  overflow-x: auto;
`;

const ErrorActions = styled.div<{ theme: AppTheme }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(3)};
  justify-content: center;
`;

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();
  const errorTime = new Date().toLocaleString();

  return (
    <ErrorContainer role="alert">
      <h2>⚠️ Application Error</h2>
      <p>Our team has been notified. You can:</p>
      
      <ErrorDetails>
        [{errorTime}] {error.message}
        {error.stack && `\n\nStack Trace:\n${error.stack}`}
      </ErrorDetails>

      <ErrorActions>
        <Button
          variant="primary"
          onClick={resetErrorBoundary}
          aria-label="Retry last action"
        >
          Try Again
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/')}
          aria-label="Return to homepage"
        >
          Return Home
        </Button>
        <Button
          variant="text"
          onClick={() => window.location.reload()}
          aria-label="Reload application"
        >
          Full Refresh
        </Button>
      </ErrorActions>
    </ErrorContainer>
  );
}

export default ErrorFallback;
