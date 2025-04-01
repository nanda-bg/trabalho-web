import styled from "styled-components";

export const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:rgb(126, 126, 126);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
  }
`;
