import * as S from "./styles"

const Guide = () => {
  return (
    <S.GuideContainer>
      <h3>Orientações</h3>
      <ul>
        <li>Use fontes de informações oficiais para preencher os dados.</li>
        <li>
          Adicione uma foto da capa do livro de boa qualidade, sem fundo e sem
          imagens próprias.
        </li>
        <li>
          Verifique se a imagem da capa está destacando apenas o livro, sem
          recortes ou elementos externos.
        </li>
        <li>Confirme em mais de uma fonte se todos os dados estão corretos.</li>
        <li>Preencha todos os campos antes de salvar.</li>
      </ul>
    </S.GuideContainer>
  );
};

export default Guide;