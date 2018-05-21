// @flow
import styled from 'styled-components';

// TODO add polyfill for position: sticky
export const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: flex-end;
  position: sticky;
  right: 0;
  top: 0;
  z-index: 300;
`;
