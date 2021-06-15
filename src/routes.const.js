export const PublicRoutes = {
  LANDINGPAGE: "/",
  HOMEPAGE: "/home",
  CONTACT: "/contact",
  ABOUT: "/about",

  ADMIN_DASHBOARD: "/admin",
  ADMIN_SIGNIN: "/admin-sign-in",
  USER_DASHBOARD: "/user",
  USER_SIGNIN: "/user-sign-in",
};

export const AdminRoutes = {
  //dành cho quản lý trang web bán hàng
  INTRODUCTION: `${PublicRoutes.ADMIN_DASHBOARD}`,
  CATEGORY: `${PublicRoutes.ADMIN_DASHBOARD}/category/`,
  PRODUCT_DETAIL: `${PublicRoutes.ADMIN_DASHBOARD}/product_detailed/:productId`,
  EDIT_PRODUCT: `${PublicRoutes.ADMIN_DASHBOARD}/product/edit`,

  PRODUCTS: `${PublicRoutes.ADMIN_DASHBOARD}/product/category`,
  INVENTORY: `${PublicRoutes.ADMIN_DASHBOARD}/invetory/`,

  SHIPPING_METHOD: `${PublicRoutes.ADMIN_DASHBOARD}/product/shipping_method`,
  CARD_TYPE: `${PublicRoutes.ADMIN_DASHBOARD}/product/card_type`,
};

export const UserRoutes = {
  ABOUT_ME: `${PublicRoutes.USER_DASHBOARD}/about-me`,
  MY_ACTIVITY: `${PublicRoutes.USER_DASHBOARD}/my-activity`,
  MY_SETTINGS: `${PublicRoutes.USER_DASHBOARD}/my-activity`,
};
