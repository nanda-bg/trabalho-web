import { FC, useState } from "react";
import {
  Home,
  BookOpen,
  Star,
  Heart,
  LogOut,
  Menu,
  X,
  Book,
  BookPlus,
} from "lucide-react";
import ProfileSection from "./components/ProfileSection/ProfileSection";
import NavItem from "./components/NavItem/NavItem";
import * as S from "./styles";
import { useDispatch } from "react-redux";
import { logout } from "@app/store/slices/LoginSlice";
import { useNavigate } from "react-router-dom";
import { ActiveScreen } from "@app/types/Screens";
import { useAppSelector } from "@app/store/rootReducer";

interface SidebarProps {
  activeScreen: ActiveScreen;
}

const Sidebar: FC<SidebarProps> = ({ activeScreen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type } = useAppSelector((state) => state.userSlice);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const signOut = () => {
    dispatch(logout());
  };

  const goToFavorites = () => {
    navigate("/books/favorites");
  };

  const goToBooks = () => {
    navigate("/books");
  };

  const goToReadingList = () => {
  navigate("/reading-list");
  };

  const goToReviews = () => {
  navigate("/reviews");
};

  const goToHome = () => {
    navigate("/home");
  };

  const goToCreateBook = () => {
    navigate("/book/create");
  };

  return (
    <>
      {isOpen ? (
        <S.CloseIcon onClick={toggleSidebar}>
          <X size={24} />
        </S.CloseIcon>
      ) : (
        <S.MenuToggle onClick={toggleSidebar}>
          <Menu size={24} />
        </S.MenuToggle>
      )}

      <S.SidebarContainer isOpen={isOpen}>
        <ProfileSection />

        <S.NavContainer>
          <NavItem
            icon={<Home size={20} />}
            label="Início"
            onClick={goToHome}
            isActive={activeScreen === "Home"}
          />
          <NavItem
            icon={<Book size={20} />}
            label="Livros"
            onClick={goToBooks}
            isActive={activeScreen === "Books"}
          />
          <NavItem 
            icon={<Star size={20} />} 
            label="Avaliações" 
            onClick={goToReviews}
            isActive={activeScreen === "Reviews"}
          />
          <NavItem 
            icon={<BookOpen size={20} />} 
            label="Lista de leitura" 
            onClick={goToReadingList} 
            isActive={activeScreen === "ReadingList"} 
          />
          <NavItem
            icon={<Heart size={20} />}
            label="Favoritos"
            onClick={goToFavorites}
            isActive={activeScreen === "Favorites"}
          />
          {type === "CONTRIBUIDOR" && (
            <NavItem
              icon={<BookPlus size={20} />}
              label="Criar Livro"
              onClick={goToCreateBook}
              isActive={activeScreen === "CreateBook"}
            />
          )}

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
