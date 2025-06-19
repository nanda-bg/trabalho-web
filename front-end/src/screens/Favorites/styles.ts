import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  background-color: #1a1a2e;
  min-height: 100vh;
  position: relative;
  padding-bottom: 40px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const GenreFilter = styled.div`
  display: flex;
  gap: 10px;
  padding: 16px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  margin-bottom: 20px;
`;

export const GenreButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? "#ff0080" : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.active ? "white" : "#ccc")};
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const StatsSection = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px;
  margin-bottom: 20px;
`;

export const StatCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  width: 45%;
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ff4081;
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #b3b3b3;
`;

export const BookGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

export const BookCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const BookCover = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
`;

export const BookInfo = styled.div`
  padding: 12px;
`;

export const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BookAuthor = styled.p`
  font-size: 14px;
  color: #b3b3b3;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Rating = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => (props.isFavorite ? "#FF4081" : "#ffffff")};
`;

export const RecommendationSection = styled.div`
  padding: 16px;
  margin-top: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
`;
