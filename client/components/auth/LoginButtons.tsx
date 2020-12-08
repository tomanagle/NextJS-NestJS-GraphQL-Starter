import { Set, styled } from 'bumbag';
import GitHubLogin from 'components/auth/GitHubLogin';
import RedditLogin from 'components/auth/RedditLogin';
import GoogleLogin from 'components/auth/GoogleLogin';

const Wrapper = styled.div`
  button:nth-of-type(1) {
    margin-right: 1rem;
  }
`;

function LoginButtons() {
  return (
    <Set
      orientation="vertical"
      spacing="minor-2"
      width="100%"
      alignItems="center"
    >
      <GitHubLogin />
      <GoogleLogin />
      <RedditLogin />
    </Set>
  );
}

export default LoginButtons;
