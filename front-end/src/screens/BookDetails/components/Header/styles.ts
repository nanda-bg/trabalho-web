import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
`;

export const CoverImage = styled.img`
  width: 140px;
  height: 210px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`;

export const BookInfo = styled.div`
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

export const Subtitle = styled.p`
  font-size: 12px;
  color: #8e95a9;
  margin: 0 0 8px 0;
`;

export const Author = styled.p`
  font-size: 14px;
  color: #8e95a9;
  margin: 0 0 12px 0;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #8e95a9;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: #ff0080;
  font-size: 14px;
  padding: 0;
  margin: 0 0 12px 0;
  cursor: pointer;
  text-decoration: underline;
`;

export const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const GenreTag = styled.span`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 12px;
`;
