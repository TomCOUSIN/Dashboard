import { UserAgentApplication } from "msal";

export const requiresInteraction = errorMessage => {
  if (!errorMessage || !errorMessage.length) {
    return false;
  }

  return (
    errorMessage.indexOf("consent_required") > -1 ||
    errorMessage.indexOf("interaction_required") > -1 ||
    errorMessage.indexOf("login_required") > -1
  );
};

export const fetchMsGraph = async (url, accessToken) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.json();
};

export const isIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ") > -1;
  const msie11 = ua.indexOf("Trident/") > -1;

  // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
  // const isEdge = ua.indexOf("Edge/") > -1;

  return msie || msie11;
};

export const GRAPH_SCOPES = {
  OPENID: "openid",
  PROFILE: "profile",
  USER_READ: "User.Read",
  MAIL_READ: "Mail.Read",
  FILE_READ: "Files.Read",
  FILE_READ_ALL: "Files.Read.All",
  SITES_READ_ALL: "Sites.Read.All"
};

export const GRAPH_ENDPOINTS = {
  ME: "https://graph.microsoft.com/v1.0/me",
  MAIL: "https://graph.microsoft.com/v1.0/me/messages"
};

export const GRAPH_REQUESTS = {
  LOGIN: {
    scopes: [
      GRAPH_SCOPES.OPENID,
      GRAPH_SCOPES.PROFILE,
      GRAPH_SCOPES.USER_READ,
      GRAPH_SCOPES.MAIL_READ,
      GRAPH_SCOPES.FILE_READ,
      GRAPH_SCOPES.FILE_READ_ALL,
      GRAPH_SCOPES.SITES_READ_ALL
    ]
  }
};

export const msalApp = new UserAgentApplication({
  auth: {
    clientId: "0048b43c-e373-4754-96e2-92490729beb0",
    authority: "https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86",
    validateAuthority: true,
    postLogoutRedirectUri: "http://localhost:5000",
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: isIE()
  },
  system: {
    navigateFrameWait: 0
  }
});
