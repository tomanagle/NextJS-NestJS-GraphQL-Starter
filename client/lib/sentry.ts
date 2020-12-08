import * as Sentry from '@sentry/node';
import { get } from 'lodash';
import { SENTRY_DSN, IS_SERVER, IS_DEV, ENV } from 'config/env';

function initSentry({ user }) {
  Sentry.init({
    dsn: SENTRY_DSN,
    release: process.env.SENTRY_RELEASE,
    debug: IS_DEV,
    environment: ENV
  });

  Sentry.configureScope(scope => {
    if (user) {
      scope.setUser(user);
    }

    if (!IS_SERVER && !user) {
      // Get the user's ID from the DOM
      const clientUser = get(
        window,
        '__NEXT_DATA__.props.apolloState.ROOT_QUERY.me.id',
        ''
      );

      scope.setUser({ user: clientUser });
    }

    // Set if this is an SSR error or not
    scope.setTag('server', String(IS_SERVER));
  });
}
export default initSentry;
