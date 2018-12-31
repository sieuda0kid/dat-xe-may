import Gesture from "@material-ui/icons/Gesture";
import ReceiveRequest from "../views/Receive/Request";

const RouterReceive = [
    {
      path: "/dashboard/#",
      sidebarName: "Dàm Thoại Viên",
      navbarName: "Nhân viên",
      icon: '',
      component: ReceiveRequest
    },
    {
      path: "/dashboard/receiverequest",
      sidebarName: "Nhận chuyến đi",
      navbarName: "Nhận chuyến đi",
      icon: Gesture,
      component: ReceiveRequest
    },
    { redirect: true, path: "/dashboard", to: "/dashboard/receiverequest", navbarName: "Redirect" }
  ];

  export default RouterReceive;