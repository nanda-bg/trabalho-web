import styled from "styled-components"

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`
export const ClickableUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const ReviewUserInfo = styled.div`
  flex: 1;
`

export const ReviewUserName = styled.h4`
  font-size: 16px;
  font-weight: 600;
`

export const ReviewTime = styled.span`
  font-size: 12px;
  color: #9999a9;
`