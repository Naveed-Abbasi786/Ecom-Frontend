// DashboardLayoutBasic.js
import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
// import Logo from './Logo';
import AddCategory from './DashboradPages/AddCategory';
import AddProducts from './DashboradPages/AddProducts';  
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAllProducts from '../Dashboard/DashboradPages/ListAllProducts'
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListIcon from '@mui/icons-material/List';
import Dashbords from './dashboarad'
import AddIcon from '@mui/icons-material/Add';
import '../App.css'
import EditProducts from './DashboradPages/EditProducts';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main Items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'AddCategory',
    // title: 'AddCategory',  
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'AddProducts',
    // title: 'AddProducts',
    icon: <AddIcon />,
  },
  {
    segment: 'EditProducts',
    // title: 'AddProducts',
    icon: <EditIcon />,
  },
  {
    segment: 'ListAllProducts',
    // title: 'AddProducts',
    icon: <ListIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
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
  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined;

  function renderPage() {
    console.log("Current Path:", router.pathname); 
    switch (router.pathname) {
      case '/dashboard':
        return <Dashbords />;
      case '/dashboard/AddCategory':
      case '/AddCategory': 
        return <AddCategory />;
      case '/dashboard/AddProducts':
      case '/AddProducts':
        return <AddProducts />;
      case '/dashboard/ListAllProducts':
      case '/ListAllProducts': 
        return <ListAllProducts />;
        case '/dashboard/EditProducts':
          case '/EditProducts': 
            return <EditProducts />;
      default:
        return <div>Page Not Found</div>;
    }
  }
  

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout>
              <PageContainer>
          {renderPage()}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
