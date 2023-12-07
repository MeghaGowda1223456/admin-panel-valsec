import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { PrivateRoutes } from './utils/privateRoutes';
import EmployerPage from './pages/employer/EmployerPage';
import BusinessList from './pages/employer/BusinessList';
import JobPostList from './pages/employer/JobPostList';
import StoreManagerList from './pages/employer/StoreManagerList';
import InterviewScheduledPage from './pages/interviews/InterviewScheduledPage';
import CandidateInfo from './pages/Candidates/CandidateInfo';
import MastersPage from './pages/employer/MastersPage';
import MastersBusinessPage from './pages/masterPage/MasterBusinesses';
import MastersCityPage from './pages/masterPage/MasterCity';
import MastersNotificationPage from './pages/masterPage/MasterNotifications';
import MastersStorePage from './pages/masterPage/MasterStore';
import MastersJobPage from './pages/masterPage/MasterJob';
import MastersIndustryPage from './pages/masterPage/MasterIndustry';
import SettingsPage from './pages/settings/Settings';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: <PrivateRoutes />,
      children: [
        {
          path: 'dashboard',
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to="/dashboard/app" />, index: true },
            { path: 'app', element: <div>Dashboard</div>
            // <DashboardAppPage /> 
          },
            { path: 'user', element: <UserPage /> },
            {
              path: 'employers',
              element: <EmployerPage />,
            },
            {
              path: 'business',
              element: <MastersBusinessPage />,
            },
            {
              path: 'cityes',
              element: <MastersCityPage />,
            },
            {
              path: 'notification',
              element: <MastersNotificationPage />,
            },
            {
              path: 'stores',
              element: <MastersStorePage />,
            },
            {
              path: 'jobs',
              element: <MastersJobPage />,
            },
            {
              path: 'settings',
              element: <SettingsPage />,
            },
            {
              path: 'industries',
              element: <MastersIndustryPage />,
            },
            { path: 'business/:employerId', element: <BusinessList /> },
            { path: 'jobs/:employerId', element: <JobPostList /> },
            { path: 'storemanagers/:businessId', element: <StoreManagerList /> },
            { path: 'products', element: <ProductsPage /> },
            { path: 'blog', element: <BlogPage /> },
            { path: 'storemanager', element: <StoreManagerList /> },
            { path: 'candidates', element: <CandidateInfo /> },
            {
              path: 'interviews',
              element: <InterviewScheduledPage />,
            },
          ],
        },
        {
          path: '/',
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to="/dashboard/app" />, index: true },
            { path: 'app', element: <DashboardAppPage /> },
            { path: 'user', element: <UserPage /> },
            {
              path: 'employers',
              element: <EmployerPage />,
            },

            { path: 'business/:employerId', element: <BusinessList /> },
            { path: 'jobs/:employerId', element: <JobPostList /> },
            { path: 'storemanagers/:businessId', element: <StoreManagerList /> },
            { path: 'products', element: <ProductsPage /> },
            { path: 'blog', element: <BlogPage /> },
          ],
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
