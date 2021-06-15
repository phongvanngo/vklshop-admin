import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AdminRoutes } from "routes.const";

//web ban hang
const AdminIntroduction = lazy(() =>
  import("./AdminIntroduction/AdminIntroduction")
);

const CategoryManagement = lazy(() =>
  import("./ProductManagement/Category/index")
);
const ProductManagement = lazy(() =>
  import("./ProductManagement/Product/index")
);
const ProductForm = lazy(() =>
  import("./ProductManagement/Product/ProductFormCreate/index")
);
const CardType = lazy(() => import("./CardType/CardTypeManagement"));
const ShippingMethod = lazy(() =>
  import("./ShippingMethod/ShippingMethodManagement")
);
const TestLayout = lazy(() => import("./TestLayout"));

const {
  //web bán hàng
  INTRODUCTION,
  CATEGORY,
  PRODUCTS,
  PRODUCT_DETAIL,
  EDIT_PRODUCT,
  SHIPPING_METHOD,
  CARD_TYPE,
} = AdminRoutes;

export default function AdminDashboardRoutes() {
  return (
    <Switch>
      <Route path={INTRODUCTION} component={AdminIntroduction} exact={true} />
      <Route path={CATEGORY} component={CategoryManagement} exact={true} />
      <Route
        path={PRODUCTS + "/:categoryId"}
        component={ProductManagement}
        exact={true}
      />
      {/* <Route path={PRODUCT_DETAIL} component={ProductForm} exact={true} /> */}
      <Route
        path={EDIT_PRODUCT + "/:productInfo"}
        component={ProductForm}
        exact={true}
      />
      <Route path={INTRODUCTION + "/test"} component={TestLayout} />

      <Route path={SHIPPING_METHOD} component={ShippingMethod} />
      <Route path={CARD_TYPE} component={CardType} />

      <Redirect to={CARD_TYPE} />
    </Switch>
  );
}
