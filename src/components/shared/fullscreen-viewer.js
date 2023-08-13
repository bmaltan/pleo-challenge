import styled from 'styled-components';
import { useEffect } from 'react';
import { Button } from "@chakra-ui/react";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
`;

const CloseContainer = styled.div`
  position: absolute;
  right: 2rem;
  top: 1rem;
  z-index: 101;
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
      <CloseContainer>
        <Button 
          data-testid="close-viewer"
          onClick={() => setIsViewerOpen(false)}
        >
          Close
        </Button>
      </CloseContainer>
      {props.children}
    </Container>
  );
}
