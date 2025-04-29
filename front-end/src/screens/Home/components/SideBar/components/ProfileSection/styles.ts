import styled from "styled-components"

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const Avatar = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Username = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #fff;
`

export const Handle = styled.p`
  font-size: 14px;
  color: #9e9aa7;
  margin: 4px 0 12px;
`

export const StatsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
`

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StatValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`

export const StatLabel = styled.span`
  font-size: 12px;
  color: #9e9aa7;
`

export const EditButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`