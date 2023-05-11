import { FooterMessageStyled } from './FooterMessage.styled';

export const FooterMessage = ({ children }) => {
  return (
    <FooterMessageStyled className="FooterMessage">
      <p>{children}</p>
    </FooterMessageStyled>
  );
};
