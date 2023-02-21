import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box } from "@pankod/refine-mui";

import { CredentialResponse } from "interfaces/google";
import { yariga } from "assets";

/**
 * Login Page
 */
export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  /**
   * Google Login Button
   */
  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }
      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here
    return <Box component="div" ref={divRef} />;
  };

  return (
    <Box component="div" sx={{ backgroundColor: '#FCFCFC' }}>
      <Container component="main" maxWidth="xs" sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh"
      }}>
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column",  alignItems: "center" }}>
          <Box component="div">
            <Box component="img" src={yariga} alt="Yariga Logo" />
          </Box>
          <Box mt={4}>
            <GoogleButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
