import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;


export const SaveButton = styled.button`
  background: none;
  border: none;
  color: #ff0080;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const Container = styled.div`
  max-width: 430px;
  margin: 0 auto;
  background-color: #1a1a2e;
  min-height: 100vh;
  position: relative;
  padding-bottom: 70px;

  @media (max-width: 768px) {
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
  }

  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
`;

export const BookHeader = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
`;

export const BookCover = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const BookCardCover = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BookInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 4px 0;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #ccc;
  margin: 0;
`;

export const GenreContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const Genre = styled.span`
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 12px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
`;

export const ActionButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.$primary ? "#ff0080" : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.$primary ? "white" : "#ccc")};
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const RatingSection = styled.div`
  padding: 16px;
`;

export const RatingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const RatingTitle = styled.h2`
  font-size: 18px;
  margin: 0;
`;

export const RatingScore = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const RatingBars = styled.div`
  display: flex;
  align-items: flex-end;
  height: 60px;
  gap: 4px;
`;

export const RatingBar = styled.div<{ height: number }>`
  flex: 1;
  height: ${(props) => props.height}%;
  background-color: #e63946;
  border-radius: 2px;
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  background: none;
  border: none;
  color: ${(props) => (props.active ? "white" : "#999")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.active ? "2px solid #ff0080" : "none")};
  cursor: pointer;
`;

export const TabContent = styled.div`
  padding: 16px;
`;

export const ReviewsSection = styled.div`
  padding: 16px;
`;

export const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ReviewsTitle = styled.h2`
  font-size: 18px;
  margin: 0;
`;

export const SeeAllLink = styled.a`
  color: #ff0080;
  font-size: 14px;
  text-decoration: none;
`;

export const ReviewCard = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const ReviewAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
`;

export const ReviewInfo = styled.div`
  flex: 1;
`;

export const ReviewName = styled.div`
  font-weight: 500;
`;

export const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #999;
`;

export const ReviewText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  color: #ccc;
`;

export const RecommendedSection = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const RecommendedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const RecommendedTitle = styled.h2`
  font-size: 18px;
  margin: 0;
`;

export const RecommendedGrid = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 16px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
  }
`;

export const BookCard = styled.div`
  min-width: 120px;
  width: 120px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const BookCardInfo = styled.div`
  padding: 0 4px;
`;

export const BookCardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BookCardAuthor = styled.p`
  font-size: 12px;
  color: #ccc;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BookCardRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #ccc;
`;
