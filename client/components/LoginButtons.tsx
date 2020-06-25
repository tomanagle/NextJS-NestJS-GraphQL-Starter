import GitHubLogin from 'components/GitHubLogin';
import RedditLogin from 'components/RedditLogin';
import styled from 'styled-components';

const Wrapper = styled.div`
  button:nth-of-type(1) {
    margin-right: 1rem;
  }
`;

function LoginButtons() {
  return (
    <Wrapper className="login-buttons-wrapper">
      <GitHubLogin />
      <RedditLogin />
    </Wrapper>
  );
}

export default LoginButtons;
