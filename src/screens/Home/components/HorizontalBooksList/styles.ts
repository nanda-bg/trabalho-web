import styled from "styled-components";

export const HorizontalScroll = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 16px;
  margin-bottom: 24px;
  
  &::-webkit-scrollbar {
    height: 0px;
  }
`