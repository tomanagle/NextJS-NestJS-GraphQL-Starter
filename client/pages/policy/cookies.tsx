import { Link } from 'bumbag';
import App from 'components/App';
import PageContainer from 'containers/Page';
import { CLIENT_DOMAIN, SITE_NAME } from 'config/env';

const CookiePolicyPage = () => {
  return (
    <App
      title="Privacy Policy"
      description={`Your privacy is important to us. It is ${SITE_NAME}}'s policy to
    respect your privacy regarding any information we may collect from you
    across our website`}
    >
      <PageContainer>
        <h1>Cookie Policy</h1>

        <p>
          This is the Cookie Policy for {SITE_NAME}, accessible from{' '}
          {CLIENT_DOMAIN}
        </p>

        <p>
          <strong>What Are Cookies</strong>
        </p>

        <p>
          As is common practice with almost all professional websites this site
          uses cookies, which are tiny files that are downloaded to your
          computer, to improve your experience. This page describes what
          information they gather, how we use it and why we sometimes need to
          store these cookies. We will also share how you can prevent these
          cookies from being stored however this may downgrade or 'break'
          certain elements of the sites functionality.
        </p>

        <p>
          For more general information on cookies, please read{' '}
          <Link
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://www.cookieconsent.com/what-are-cookies/"
          >
            "What Are Cookies"
          </Link>
          .
        </p>

        <p>
          <strong>How We Use Cookies</strong>
        </p>

        <p>
          We use cookies for a variety of reasons detailed below. Unfortunately
          in most cases there are no industry standard options for disabling
          cookies without completely disabling the functionality and features
          they add to this site. It is recommended that you leave on all cookies
          if you are not sure whether you need them or not in case they are used
          to provide a service that you use.
        </p>

        <p>
          <strong>Disabling Cookies</strong>
        </p>

        <p>
          You can prevent the setting of cookies by adjusting the settings on
          your browser (see your browser Help for how to do this). Be aware that
          disabling cookies will affect the functionality of this and many other
          websites that you visit. Disabling cookies will usually result in also
          disabling certain functionality and features of the this site.
          Therefore it is recommended that you do not disable cookies.
        </p>

        <p>
          <strong>The Cookies We Set</strong>
        </p>

        <ul>
          <li>
            <p>Account related cookies</p>
            <p>
              If you create an account with us then we will use cookies for the
              management of the signup process and general administration. These
              cookies will usually be deleted when you log out however in some
              cases they may remain afterwards to remember your site preferences
              when logged out.
            </p>
          </li>

          <li>
            <p>Login related cookies</p>
            <p>
              We use cookies when you are logged in so that we can remember this
              fact. This prevents you from having to log in every single time
              you visit a new page. These cookies are typically removed or
              cleared when you log out to ensure that you can only access
              restricted features and areas when logged in.
            </p>
          </li>

          <li>
            <p>Forms related cookies</p>
            <p>
              When you submit data to through a form such as those found on
              contact pages or comment forms cookies may be set to remember your
              user details for future correspondence.
            </p>
          </li>

          <li>
            <p>Site preferences cookies</p>
            <p>
              In order to provide you with a great experience on this site we
              provide the functionality to set your preferences for how this
              site runs when you use it. In order to remember your preferences
              we need to set cookies so that this information can be called
              whenever you interact with a page is affected by your preferences.
            </p>
          </li>
        </ul>

        <p>
          <strong>Third Party Cookies</strong>
        </p>

        <p>
          In some special cases we also use cookies provided by trusted third
          parties. The following section details which third party cookies you
          might encounter through this site.
        </p>

        <ul>
          <li>
            <p>
              This site uses Google Analytics which is one of the most
              widespread and trusted analytics solution on the web for helping
              us to understand how you use the site and ways that we can improve
              your experience. These cookies may track things such as how long
              you spend on the site and the pages that you visit so we can
              continue to produce engaging content.
            </p>
            <p>
              For more information on Google Analytics cookies, see the official
              Google Analytics page.
            </p>
          </li>
        </ul>

        <p>
          <strong>More Information</strong>
        </p>

        <p>
          Hopefully that has clarified things for you and as was previously
          mentioned if there is something that you aren't sure whether you need
          or not it's usually safer to leave cookies enabled in case it does
          interact with one of the features you use on our site.
        </p>
      </PageContainer>
    </App>
  );
};

export default CookiePolicyPage;
