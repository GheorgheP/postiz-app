import {
  createRootRoute,
  HeadContent,
  isRedirect,
  Outlet,
  ParsedLocation,
  redirect,
} from '@tanstack/react-router';
import './global.scss';
import 'react-tooltip/dist/react-tooltip.css';
import '@copilotkit/react-ui/styles.css';
import { getCookieUrlFromDomain } from '@gitroom/helpers/subdomain/subdomain.management';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';
import { setCookie } from '@gitroom/frontend/components/layout/layout.context';
import { GlobalError } from '@gitroom/frontend/components/layout/global.error.component';
import {
  backendFetch,
  forgetSession,
  isLogged,
} from '@gitroom/frontend/components/layout/session';

// What the Next.js middleware (proxy.ts) did on every page request
const guard = async (location: ParsedLocation) => {
  const { isGeneral, isSecured, disableRegistration, genericOauth } =
    runtimeVariables();
  const { pathname } = location;
  const href = window.location.origin + location.href;
  const url = location.searchStr;
  const org = new URLSearchParams(url).get('org');

  if (pathname.startsWith('/modal/') && !(await isLogged())) {
    throw redirect({ href: '/auth/login-required' });
  }

  if (
    pathname.startsWith('/uploads/') ||
    pathname.startsWith('/p/') ||
    pathname.startsWith('/provider/') ||
    pathname.startsWith('/icons/') ||
    // the consent screen of MCP / OAuth clients handles signed-out visitors
    // itself (sign in and come back, or connect a self-hosted instance)
    pathname.startsWith('/oauth/authorize')
  ) {
    return;
  }

  if (
    pathname.startsWith('/integrations/social/') &&
    href.indexOf('state=login') === -1
  ) {
    return;
  }

  // the page of a connect link (public API), opened by people with no account
  if (pathname.startsWith('/integrations/connect/')) {
    return;
  }

  if (href.indexOf('/auth/logout') > -1) {
    await backendFetch('/user/logout', { method: 'POST' }).catch(() => null);
    forgetSession();
    if (!isSecured) {
      setCookie('auth', '', -10);
      setCookie('showorg', '', -10);
      setCookie('impersonate', '', -10);
    }
    throw redirect({ href: '/auth/login' });
  }

  if (pathname.startsWith('/auth/register') && disableRegistration) {
    throw redirect({ href: '/auth/login' });
  }

  const logged = await isLogged();

  if (!pathname.startsWith('/auth') && !logged) {
    const providers = ['google', 'settings'];
    const findIndex = providers.find((p) => href.indexOf(p) > -1);
    const additional = !findIndex
      ? ''
      : (url.indexOf('?') > -1 ? '&' : '?') +
        `provider=${(findIndex === 'settings'
          ? genericOauth
            ? 'generic'
            : 'github'
          : findIndex
        ).toUpperCase()}`;
    throw redirect({ href: `/auth${url}${additional}` });
  }

  // If the url is /auth and there is a session, redirect to /
  if (pathname.startsWith('/auth') && logged) {
    throw redirect({ href: `/${url}` });
  }

  if (pathname.startsWith('/auth') && !logged) {
    if (org) {
      // read by the backend when the invited person registers or logs in
      setCookie(
        'org',
        org,
        2,
        isSecured
          ? `;secure;domain=${getCookieUrlFromDomain(
              runtimeVariables().frontEndUrl
            )}`
          : ''
      );
      throw redirect({ href: '/' });
    }
    return;
  }

  try {
    if (org) {
      const { id } = await (
        await backendFetch('/user/join-org', {
          body: JSON.stringify({ org }),
          method: 'POST',
        })
      ).json();
      if (id) {
        // sets the showorg cookie (or returns it as a header when not secured)
        const changed = await backendFetch('/user/change-org', {
          body: JSON.stringify({ id }),
          method: 'POST',
        });
        const showOrg = changed.headers.get('showorg');
        if (showOrg) {
          setCookie('showorg', showOrg, 365);
        }
      }
      throw redirect({ href: '/?added=true' });
    }
  } catch (err) {
    if (isRedirect(err)) {
      throw err;
    }
    console.log('err', err);
    throw redirect({ href: '/auth/logout' });
  }

  if (pathname === '/') {
    throw redirect({ href: isGeneral ? '/launches' : '/analytics' });
  }
};

export const Route = createRootRoute({
  beforeLoad: ({ location }) => guard(location),
  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
  errorComponent: GlobalError,
});
