import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

// Pages
import Dashbords from "./dashboarad";
import AddCategory from "./DashboradPages/AddCategory";
import AddProducts from "./DashboradPages/AddProducts";
import ListAllProducts from "./DashboradPages/ListAllProducts";
import ListAllOrders from "./DashboradPages/ListAllOrders";
import AddSubCategory from "./DashboradPages/AddSubCategory";
import AddBlog from "./DashboradPages/AddBlog";
import { CartContext } from "../Context/Context";

// Navigation Configuration
const NAVIGATION = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { kind: "header", title: "Products" },
  {
    segment: "product",
    title: "Products",
    children: [
      { segment: "addproduct", title: "Add Product", icon: <EditIcon /> },
      {
        segment: "listproduct",
        title: "List Products",
        icon: <ShoppingCartIcon />,
      },
    ],
  },
  { kind: "header", title: "Category" },
  {
    segment: "addcategory",
    title: "Categories",
    children: [
      { segment: "addcategory", title: "Add Category", icon: <EditIcon /> },
      {
        segment: "addsubcategory",
        title: "Add Subcategory",
        icon: <AppRegistrationIcon />,
      },
      { kind: "divider" },
    ],
  },
  { kind: "header", title: "Blog" },
  {
    segment: "add-blog",
    title: "Add Blog",
    children: [
      { segment: "add-blog", title: "Add Blog", icon: <EditIcon /> },
      { kind: "divider" },
    ],
  },

  { segment: "orderList", title: "Order List", icon: <AppRegistrationIcon /> },
];

// Theme Configuration
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
});

// Custom Hook for Navigation
function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(
    () => ({
      pathname,
      navigate: (path) => setPathname(String(path)),
    }),
    [pathname]
  );

  return router;
}

export default function DashboardLayoutBasic() {
  const [loading, setLoading] = React.useState(true);
  const [session, setSession] = React.useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  // const { user } = React.useContext(CartContext);
  const {  user } = React.useContext(CartContext);
  console.log(user)

  const navigate = useNavigate("");
  const username = user?.username?.[0]?.toUpperCase();
  const authentication = React.useMemo(
    () => ({
      signIn: () => {
        if (user) {
          setSession({
            user: {
              name: username,
              email: user.email,
              image: `http://192.168.100.155:4000${user.profileImage}`,
            },
          });
        }
      },
      signOut: () => {
        localStorage.removeItem("authToken");
        navigate("/");
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

  // Page Rendering Logic
  function renderPage() {
    switch (router.pathname) {
      case "/dashboard":
        return <Dashbords />;
      case "/addcategory/addcategory":
        return <AddCategory />;
      case "/addcategory/addsubcategory":
        return <AddSubCategory />;
      case "/product/addproduct":
        return <AddProducts />;
      case "/product/listproduct":
        return <ListAllProducts />;
      case "/add-blog/add-blog":
        return <AddBlog />;
      case "/orderList":
        return <ListAllOrders />;
      default:
        return <div>Page Not Found</div>;
    }
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      session={session}
      authentication={authentication}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <PageContainer>{renderPage()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
