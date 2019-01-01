import LocationOn from "@material-ui/icons/LocationOn";
import Settings from '@material-ui/icons/Settings'
import ReceiveRequest from "../views/Receive/Request";
import LocateRequest from "../views/Locate/Request";
import Options from "../views/Office/Options";

const RouterLocation = [
  {
    path: "/dashboard/#",
    sidebarName: "Định vị viên",
    navbarName: "Nhân viên",
    icon: '',
    component: ReceiveRequest
  },

  {
    path: "/dashboard/locaterequest",
    sidebarName: "Định vị",
    navbarName: "Định vị",
    icon: LocationOn,
    component: LocateRequest
  },

  {
    path: "/dashboard/Options",
    sidebarName: "Tùy chọn",
    navbarName: "Tùy chọn",
    icon: Settings,
    component: Options
  },

  { redirect: true, path: "/dashboard", to: "/dashboard/locaterequest", navbarName: "Redirect" }
];

export default RouterLocation;