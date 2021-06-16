import { adminLogOut } from "app/redux/adminAuthSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { AdminRoutes } from "routes.const";
import "./AdminDashboard.scss";
import AdminDashboardRoutes from "./AdminDashboard.routes";
import Navbar from "./Navbar";
import queryString from "query-string";

export default function LandingPage() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(adminLogOut());
  };

  useEffect(() => {
    const linkColor = document.querySelectorAll(".menu-item__title");
    function colorLink() {
      if (linkColor) {
        this.parentElement.classList.toggle("active");
        linkColor.forEach((l) => {
          if (l !== this) {
            l.parentElement.classList.remove("active");
          }
        });
      }
    }
    linkColor.forEach((l) => l.addEventListener("click", colorLink));
  }, []);

  const handleToggleSidebar = () => {
    const adminLayout = document.getElementById("admin-dashboard-container");
    const headerToggle = document.getElementById("header-toggle-icon");

    if (headerToggle.classList.contains("bx-right-arrow-alt")) {
      headerToggle.classList.remove("bx-right-arrow-alt");
      headerToggle.classList.add("bx-menu-alt-left");
    } else {
      headerToggle.classList.add("bx-right-arrow-alt");
      headerToggle.classList.remove("bx-menu-alt-left");
    }

    adminLayout.classList.toggle("show-sidebar");
  };

  const {
    //web ban hang
    CATEGORY,
    PRODUCTS,
    PRODUCT_DETAIL,
    INTRODUCTION,
    EDIT_PRODUCT,
    SHIPPING_METHOD,
    DISCOUNT,
    CARD_TYPE,
  } = AdminRoutes;

  return (
    <Router>
      <div id="admin-dashboard-container" className="">
        <aside id="admin-sidebar">
          <header
            id="admin-sidebar__header"
            className="items-center text-admin_color_2"
          >
            <div className="brand">
              <svg
                className="transform rotate-45"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="arcs"
              >
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                <polyline points="17 2 12 7 7 2"></polyline>
              </svg>
              <h1 className="font-extrabold text-2xl ml-3">Cinema</h1>
            </div>
          </header>
          <div className="menu-container">
            <ul className="menu-list">
              <Link to={INTRODUCTION}>
                <li className="menu-item">
                  <div className="menu-item__title">
                    <i className="bx bxs-home menu-item__title__icon"></i>
                    <span className="menu-item__title__name">Trang chủ</span>
                  </div>
                </li>
              </Link>
              <li className="menu-item">
                <div className="menu-item__title">
                  <i className="bx bx-cookie menu-item__title__icon"></i>
                  <span className="menu-item__title__name">Sản phẩm</span>
                  <i className="bx bx-chevron-down menu-item__title__submenu-icon"></i>
                </div>
                <ul className="submenu-list">
                  <Link to={CATEGORY}>
                    <li>Danh mục sản phẩm</li>
                  </Link>
                  <Link
                    to={
                      PRODUCTS +
                      "/" +
                      queryString.stringify({ categoryId: null })
                    }
                  >
                    <li>Tất cả sản phẩm</li>
                  </Link>
                  <Link
                    to={
                      EDIT_PRODUCT +
                      "/" +
                      queryString.stringify({ productId: null })
                    }
                  >
                    <li>Thêm sản phẩm mới</li>
                  </Link>
                  <Link to={""}>
                    <li>Quản lý kho</li>
                  </Link>
                </ul>
              </li>
              <li className="menu-item">
                <div className="menu-item__title">
                  <i className="bx bx-comment-detail menu-item__title__icon"></i>
                  <span className="menu-item__title__name">
                    Quản lý đơn hàng
                  </span>
                  <i className="bx bx-chevron-down menu-item__title__submenu-icon"></i>
                </div>
                <ul className="submenu-list">
                  <Link to={""}>
                    <li>Danh mục sản phẩm</li>
                  </Link>
                  <Link to={""}>
                    <li>Tất cả sản phẩm</li>
                  </Link>
                  <Link to={""}>
                    <li>Quản lý kho</li>
                  </Link>
                </ul>
              </li>
              <li className="menu-item">
                <div className="menu-item__title">
                  <i className="bx bxs-truck menu-item__title__icon"></i>
                  <span className="menu-item__title__name">Vận chuyển</span>
                  <i className="bx bx-chevron-down menu-item__title__submenu-icon"></i>
                </div>
                <ul className="submenu-list">
                  <Link to={SHIPPING_METHOD}>
                    <li>Phương thức vận chuyển</li>
                  </Link>
                </ul>
              </li>
              <li className="menu-item">
                <div className="menu-item__title">
                  <i className="bx bx-money menu-item__title__icon"></i>
                  <span className="menu-item__title__name">Thanh toán</span>
                  <i className="bx bx-chevron-down menu-item__title__submenu-icon"></i>
                </div>
                <ul className="submenu-list">
                  <Link to={CARD_TYPE}>
                    <li>Các loại thẻ</li>
                  </Link>
                </ul>
              </li>
              <li className="menu-item">
                <div className="menu-item__title">
                  <i className="bx bx-gift menu-item__title__icon"></i>
                  <span className="menu-item__title__name">Khuyến mãi</span>
                  <i className="bx bx-chevron-down menu-item__title__submenu-icon"></i>
                </div>
                <ul className="submenu-list">
                  <Link to={DISCOUNT}>
                    <li>Mã giảm giá</li>
                  </Link>
                </ul>
              </li>

              {/* <li className="menu-item">
                <div className="menu-item__title">
                  <i className="bx bx-store-alt menu-item__title__icon"></i>
                  <span className="menu-item__title__name">Quản lý rạp</span>
                  <i className="bx bx-chevron-down menu-item__title__submenu-icon"></i>
                </div>
                <ul className="submenu-list">
                  <li>Hệ thống rạp</li>
                  <li>Cụm rạp</li>
                  <li>Cụm rạp</li>
                  <li>Cụm rạp</li>
                  <li>Cụm rạp</li>
                  <li>Cụm rạp</li>
                </ul>
              </li> */}
            </ul>
            <div className="btn-logout-wrapper">
              <div
                className="btn-logout"
                onClick={() => {
                  handleLogout();
                }}
              >
                <i className="bx bx-log-out btn-logout__icon"></i>
                <span className="btn-logout__name">Đăng xuất</span>
              </div>
            </div>
          </div>
        </aside>
        <div id="admin-main">
          <Navbar handleToggleSidebar={handleToggleSidebar} />
          <div className="main-admin-page">
            <AdminDashboardRoutes />
          </div>
        </div>
      </div>
    </Router>
  );
}
