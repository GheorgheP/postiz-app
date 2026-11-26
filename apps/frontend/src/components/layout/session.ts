import { customFetch } from '@gitroom/helpers/utils/custom.fetch.func';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

// Requests made outside the React tree (route guards and loaders), where the
// FetchWrapperComponent of LayoutContext is not mounted
export const backendFetch = (url: string, options?: RequestInit) =>
  customFetch({ baseUrl: runtimeVariables().backendUrl })(url, options);

// The auth cookie is httpOnly, so ask the backend whether there is a session.
// Once per page load: logging in reloads the page, logging out goes through
// /auth/logout, which calls forgetSession.
let session: Promise<boolean> | undefined;
export const isLogged = () => {
  session ??= backendFetch('/user/self').then(
    (response) => response.ok,
    () => false
  );
  return session;
};

export const forgetSession = () => {
  session = undefined;
};
