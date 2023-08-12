import styled from 'styled-components';
import { useEffect } from 'react';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
`;

const EscNotice = styled.div`
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: 101;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

export default function FullScreenViewer(props) {
  const { setIsViewerOpen } = props;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (['Escape', 'Esc'].includes(event.key)) {
        setIsViewerOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <Container id="full-screen-viewer">
      <EscNotice>Press ESC to exit</EscNotice>
      {props.children}
    </Container>
  );
}
