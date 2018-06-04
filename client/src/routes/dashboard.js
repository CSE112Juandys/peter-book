import EmptyView from "views/EmptyView";

import {
  Dashboard,
  Person,
  Photo,
} from "@material-ui/icons";

const dashboardRoutes = [
  {
    path: "/newsFeed",
    sidebarName: "News Feed",
    navbarName: "News Feed",
    icon: Dashboard,
    component: EmptyView
  },
  {
    path: "/about",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: EmptyView
  },
  {
    path: "/photos",
    sidebarName: "Photos",
    navbarName: "Photos",
    icon: Photo,
    component: EmptyView
  },
  { redirect: true, path: "/", to: "/newsFeed", navbarName: "Redirect" }
];

export default dashboardRoutes;