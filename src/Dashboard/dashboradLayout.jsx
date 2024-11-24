import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Menu, MenuItem, Button } from "@mui/material";
import AddCategory from "./DashboradPages/AddCategory";
import AddProducts from "./DashboradPages/AddProducts";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAllProducts from "../Dashboard/DashboradPages/ListAllProducts";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListIcon from "@mui/icons-material/List";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Dashbords from "./dashboarad";
import AddIcon from "@mui/icons-material/Add";
import ListAllOrders from "./DashboradPages/ListAllOrders";
import "../App.css";
import PanelSettingsIcon from "@mui/icons-material/Settings";
import EditProducts from "./DashboradPages/EditProducts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main Items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "AddCategory",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "AddProducts",
    icon: <AddIcon />,
  },
  {
    segment: "EditProducts",
    icon: <EditIcon />,
  },
  {
    segment: "ListAllProducts",
    icon: <ListIcon />,
  },
  {
    segment: "ListAllOrder",
    icon: <ListAltIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [session, setSession] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate("");

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
      setLoggedIn(true);
      setUser(response.data);
    } catch (error) {
      setLoggedIn(false);
      console.error("Error fetching user details:", error);
    } finally {
      setLoggedIn(true);
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
        navigate("/");
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
    // if (!loggedIn) {
    //   navigate("/");
    // }
  }, [user, authentication]);

  const router = useDemoRouter("/dashboard");
  const demoWindow = window ? window() : undefined;

  function renderPage() {
    switch (router.pathname) {
      case "/dashboard":
        return <Dashbords />;
      case "/AddCategory":
        return <AddCategory />;
      case "/AddProducts":
        return <AddProducts />;
      case "/ListAllProducts":
        return <ListAllProducts />;
      case "/EditProducts":
        return <EditProducts />;
      case "/ListAllOrder":
        return <ListAllOrders />;
      default:
        return <div>Page Not Found</div>;
    }
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      session={session}
      authentication={authentication}
    >
      <DashboardLayout>
        <PageContainer>{renderPage()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
