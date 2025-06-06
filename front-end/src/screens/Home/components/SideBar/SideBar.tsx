import type React from "react";
import { useState } from "react";
import {
  Home,
  BookOpen,
  Star,
  Heart,
  LogOut,
  Menu,
  X,
  Book,
} from "lucide-react";
import ProfileSection from "./components/ProfileSection/ProfileSection";
import NavItem from "./components/NavItem/NavItem";
import * as S from "./styles";
import { useDispatch } from "react-redux";
import { logout } from "@app/store/slices/LoginSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const signOut = () => {
    dispatch(logout());
  };

  const goToFavorites = () => {
    navigate("/books/favorites");
  };

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <>
      {isOpen ? (
        <S.CloseIcon onClick={toggleSidebar}>
          {" "}
          <X size={24} />{" "}
        </S.CloseIcon>
      ) : (
        <S.MenuToggle onClick={toggleSidebar}>
          <Menu size={24} />
        </S.MenuToggle>
      )}

      <S.SidebarContainer isOpen={isOpen}>
        <ProfileSection followers={1087} following={430} />

        <S.NavContainer>
          <NavItem
            icon={<Home size={20} />}
            label="Início"
            onClick={goToHome}
            isActive={true}
          />
          <NavItem icon={<Book size={20} />} label="Livros" />
          <NavItem icon={<Star size={20} />} label="Avaliações" />
          <NavItem icon={<BookOpen size={20} />} label="Lista de leitura" />
          <NavItem
            icon={<Heart size={20} />}
            label="Favoritos"
            onClick={goToFavorites}
          />

          <S.LogoutButton onClick={signOut}>
            <LogOut size={20} />
            Sair
          </S.LogoutButton>
        </S.NavContainer>
      </S.SidebarContainer>
    </>
  );
};

export default Sidebar;
