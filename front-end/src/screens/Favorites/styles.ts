import styled from "styled-components";

export const Container = styled.div`
  max-width: 430px;
  margin: 0 auto;
  background-color: #1a1a2e;
  min-height: 100vh;
  position: relative;
  padding-bottom: 70px;
`;

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

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

export const SearchButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GenreFilter = styled.div`
  display: flex;
  gap: 10px;
  padding: 16px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #2a2a2a;
  border: none;
  border-radius: 20px;
  color: #ffffff;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  padding: 16px;
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

export const RecommendationScroll = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RecommendationCard = styled.div`
  min-width: 120px;
  max-width: 120px;
`;

export const RecommendationCover = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const RecommendationTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RecommendationAuthor = styled.p`
  font-size: 12px;
  color: #b3b3b3;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BottomNav = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: #1a1a1a;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 0;
  border-top: 1px solid #2a2a2a;
`;

export const NavItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.active ? "#FF4081" : "#b3b3b3")};
  cursor: pointer;
`;

export const NavText = styled.span`
  font-size: 12px;
  margin-top: 4px;
`;
