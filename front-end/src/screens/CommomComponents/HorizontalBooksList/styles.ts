import styled from "styled-components";

export const HorizontalScroll = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  overflow-y: visible;
  padding-bottom: 16px;
  margin-bottom: 24px;
  padding-top: 10px;

  &::-webkit-scrollbar {
    height: 0px;
  }
`;
