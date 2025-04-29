"use client"

import type React from "react"
import * as S from "./styles"


interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false, onClick }) => {
  return (
    <S.NavItemContainer isActive={isActive} onClick={onClick}>
      <S.IconWrapper>{icon}</S.IconWrapper>
      <S.Label>{label}</S.Label>
    </S.NavItemContainer>
  )
}

export default NavItem
