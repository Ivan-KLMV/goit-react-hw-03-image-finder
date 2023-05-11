import { LoadMoreButtonStyled } from './LoadMoreButton.styled';

export const LoadMoreButton = ({ loadMoreHandle }) => {
  return (
    <LoadMoreButtonStyled type="button" onClick={loadMoreHandle}>
      Load more
    </LoadMoreButtonStyled>
  );
};
