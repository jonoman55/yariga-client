// DOCS : https://refine.dev/docs
// TODO : Implement Messages and Reviews Pages
// TODO : Go through project and covert components to styled components where necessary
// TODO : Add Theme Switch and custom MUI Theme

import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from "@mui/icons-material";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider, { HashRouterComponent } from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { Title, Sider, Layout, Header } from "components/layout";
import { ColorModeContextProvider } from "contexts";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";

import {
  Login,
  Home,
  Agents,
  MyProfile,
  PropertyDetails,
  AllProperties,
  CreateProperty,
  AgentProfile,
  EditProperty,
  UnderConstruction,
} from "pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return request;
});

/**
 * App with Refine
 */
const App = () => {
  const authProvider: AuthProvider = {
    /**
     * Google Login
     */
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;
      if (profileObj) {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, {
          name: profileObj?.name,
          email: profileObj?.email,
          avatar: profileObj?.picture,
        });
        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj?.picture,
              userid: response?.data?._id,
            }),
          );
        } else {
          return Promise.reject();
        }
      }
      localStorage.setItem("token", `${credential}`);
      return Promise.resolve();
    },
    /**
     * Google Logout
     */
    logout: () => {
      const token = localStorage.getItem("token");
      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }
      return Promise.resolve();
    },
    /**
     * Google Error Check
     */
    checkError: () => Promise.resolve(),
    /**
     * Google Auth Check
     */
    checkAuth: async () => {
      const token = localStorage.getItem("token");
      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },
    /**
     * Get Google User Permissions
     */
    getPermissions: () => Promise.resolve(),
    /**
     * Get Google User Identity
     */
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider(`${process.env.REACT_APP_SERVER_URL}`)}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "properties",
              list: AllProperties,
              show: PropertyDetails,
              create: CreateProperty,
              edit: EditProperty,
              icon: <VillaOutlined />,
            },
            {
              name: "agents",
              list: Agents,
              show: AgentProfile,
              icon: <PeopleAltOutlined />,
            },
            {
              name: "reviews",
              list: UnderConstruction,
              icon: <StarOutlineRounded />,
            },
            {
              name: "messages",
              list: UnderConstruction,
              icon: <ChatBubbleOutline />,
            },
            {
              name: "my-profile",
              options: { label: "My Profile " },
              list: MyProfile,
              icon: <AccountCircleOutlined />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={{
            ...routerProvider,
            RouterComponent: HashRouterComponent.bind({
              initialRoute: "/"
            }),
          }}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
};

export default App;