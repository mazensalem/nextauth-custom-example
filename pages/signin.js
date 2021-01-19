import React from "react";
import { providers, signIn, getSession } from "next-auth/client";

export default function SignIn({ providers }) {
  return (
    <div className="login">
      <h1>Welcome to our custom page</h1>
      <div className="login-item">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

SignIn.getInitialProps = async (context) => {
  const { req, res, query } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await providers(context),
  };
};
