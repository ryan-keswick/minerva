import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

export const MiddleMiddleImage = styled.div`
  border: 1px solid black;
`;

export const MiddleImage = styled.div`
  border-left: 1px solid black;
  border-right: 1px solid black;
`;

export const CenterImage = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;
