import { FC } from "react";
import styled from "styled-components";

export const AppContainer = styled.div`
  margin: 0 auto;
  background-color: #1a1a2e;
  min-height: 100vh;
  position: relative;
  padding-bottom: 40px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  color: #9999a9;
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 500;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
`;

export const MainContent = styled.main`
  padding: 0 16px;
`;

export const SubText = styled.p`
  color: #9999a9;
  font-size: 14px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Icon = styled.img`
  height: 16px;
  width: 16px;
  color: rgb(163, 162, 173);
`;

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  imgUrl?: string;
}

export const UserAvatar: FC<UserAvatarProps> = styled.div<UserAvatarProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.imgUrl});

  ${(props) =>
    !props.imgUrl &&
    `
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ccc;
    &::after {
      content: '';
      content: url("@app/assets/icons/profile.svg");
      background-size: cover;
      background-position: center;
      width: 16px;
      height: 16px;
    }
  `}
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const UserName = styled.span`
  font-size: 12px;
  color: #9999a9;
`;

export const ReviewCard = styled.div`
  background-color: #16162a;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const ReviewUserInfo = styled.div`
  flex: 1;
`;

export const ReviewUserName = styled.h4`
  font-size: 16px;
  font-weight: 600;
`;

export const ReviewTime = styled.span`
  font-size: 12px;
  color: #9999a9;
`;

export const ReviewContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
`;

export const ReviewBook = styled.div`
  display: flex;
  gap: 12px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 12px;
`;

export const ReviewBookPoster = styled.div`
  width: 60px;
  height: 90px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

export const ReviewBookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ReviewBookTitle = styled.h5`
  font-size: 14px;
  font-weight: 600;
`;

export const ReviewBookRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const RatingText = styled.span`
  font-size: 12px;
  color: #ff4d4d;
  font-weight: 600;
`;

export const NavButton = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.$active ? "#fff" : "#9999a9")};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  cursor: pointer;
`;

export const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #16162a;
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;
