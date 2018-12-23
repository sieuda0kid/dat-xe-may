import AddLocation from "@material-ui/icons/AddLocation";
import LocationOn from "@material-ui/icons/LocationOn";
import EditLocation from "@material-ui/icons/EditLocation";
import AccessibilityNew from "@material-ui/icons/AccessibilityNew";
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import Settings from '@material-ui/icons/Settings'
import ReceiveRequest from "../views/Receive/Request";
import LocateRequest from "../views/Locate/Request";
import ManageRequest from "../views/Manage/Request";
import ManageDriver from "../views/Office/ManageDriver";
import ManagePersonnel from "../views/Office/ManagePersonnel";
import Options from "../views/Office/Options";

const dashboardRoutes = [
  {
    path: "/dashboard/#",
    sidebarName: "NHÂN VIÊN",
    navbarName: "Nhân viên",
    icon: '',
    component: ReceiveRequest
  },
  {
    path: "/dashboard/receiverequest",
    sidebarName: "Nhận chuyến đi",
    navbarName: "Nhận chuyến đi",
    icon: AddLocation,
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
    path: "/dashboard/managerequest",
    sidebarName: "Quản lý chuyến đi",
    navbarName: "Quản lý chuyến đi",
    icon: EditLocation,
    component: ManageRequest
  },
  {
    path: "/dashboard/office",
    sidebarName: "Văn phòng",
    navbarName: "Văn phòng",
    icon: '',
    component: null
  },
  {
    path: "/dashboard/managedriver",
    sidebarName: "Danh sách tài xế",
    navbarName: "Danh sách tài xế",
    icon: DirectionsBike,
    component: ManageDriver
  },
  {
    path: "/dashboard/managepersonnel",
    sidebarName: "Danh sách nhân viên",
    navbarName: "Danh sách nhân viên",
    icon: AccessibilityNew,
    component: ManagePersonnel
  },
  {
    path: "/dashboard/Options",
    sidebarName: "Tùy chọn",
    navbarName: "Tùy chọn",
    icon: Settings,
    component: Options
  },

  { redirect: true, path: "/dashboard", to: "/dashboard/receiverequest", navbarName: "Redirect" }
];

export default dashboardRoutes;
