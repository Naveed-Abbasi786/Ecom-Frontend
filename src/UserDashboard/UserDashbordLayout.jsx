import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import EditIcon from "@mui/icons-material/Edit";
import { useDemoRouter } from "@toolpad/core/internal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import axios from "axios";
import Orders from "./UserDashboradPages/Orders";
import ChangePassword from "./UserDashboradPages/ChangePassword";
import UpdateProfile from "./UserDashboradPages/UpdateProfile";
const NAVIGATION = [
  { kind: "header", title: "Main items" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "orders", title: "Orders", icon: <ShoppingCartIcon /> },
  { kind: "divider" },
  { kind: "header", title: "Profile" },
  {
    segment: "profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
    children: [
      {
        segment: "update-profile",
        title: "Change Profile",
        icon: <EditIcon />,
      },
      {
        segment: "change-password",
        title: "Change Password",
        icon: <AppRegistrationIcon />,
      },
    ],
  },
];

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

function DemoPageContent({ pathname }) {
  switch (pathname) {
    case "/dashboard":
      return <Typography>Welcome to the Dashboard!</Typography>;
    case "/orders":
      return <Orders />;
    case "/profile/update-profile":
      return <UpdateProfile />;
    case "/profile/change-password":
      return <ChangePassword />;
    case "/integrations":
      return <Typography>Integrations with third-party services.</Typography>;
    default:
      return <Typography>Page Not Found!</Typography>;
  }
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutAccount({ window }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [session, setSession] = React.useState(null);

  const API_URL = "http://192.168.100.106:4000/api/auth";

  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/user-details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  const username=user?.username?.[0]?.toUpperCase()
  const authentication = React.useMemo(
    () => ({
      signIn: () => {
        if (user) {
          setSession({
            user: {
              name: username,
              email: user.email,
              image: `http://192.168.100.106:4000${user.profileImage}`,
            },
          });
        }
      },
      signOut: () => {
        localStorage.removeItem("authToken");
        setSession(null);
        setUser(null);
      },
    }),
    [user]
  );

  React.useEffect(() => {
    if (user) {
      authentication.signIn();
    }
  }, [user, authentication]);

  const router = useDemoRouter("/dashboard");
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <Box sx={{ p: 4 }}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <DemoPageContent pathname={router.pathname} />
          )}
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccount;
