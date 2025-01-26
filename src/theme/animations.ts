import { css, keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

export const animationMixin = (animation: ReturnType<typeof keyframes>, duration = '0.3s') => css`
  animation: ${animation} ${duration} ease-in-out;
`;
