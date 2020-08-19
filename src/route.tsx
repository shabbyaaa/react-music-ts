import React, { lazy, Suspense, LazyExoticComponent } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Layout from "./layout";
import Loading from './components/Loading1'

const SuspenseComponent = (Component: LazyExoticComponent<any>) => (
  props: any
) => (
  <Suspense fallback={<Loading />}>
    <Component {...props} />
  </Suspense>
);

const Recommend = SuspenseComponent(lazy(() => import("./page/Recommend")));
const Singers = SuspenseComponent(lazy(() => import("./page/Singers")));
const Rank = SuspenseComponent(lazy(() => import("./page/Rank")));

const routes = [
  {
    key: "recommend",
    path: "recommend",
    component: Recommend,
  },
  {
    key: "singers",
    path: "singers",
    component: Singers,
  },
  {
    key: "rank",
    path: "rank",
    component: Rank,
  },
];

interface RoutesType {
  key: string;
  path: string;
  component: React.FC;
}

const renderRouter = (routes: any) => {
  return (
    <Switch>
      <Route
        path="/"
        render={() => (
          <Layout>
            <Route path="/recommend" render={() => <Recommend />} />
            <Route path="/singers" render={() => <Singers />} />
            <Route path="/rank" render={() => <Rank />} />
            <Redirect to="/singers" />
            {/* <Switch>
              {routes.map((item: RoutesType) => {
                return (
                  <Route
                    path={item.path}
                    key={item.key}
                    component={item.component}
                    // render={() => <item.component />}
                  />
                );
              })}
            </Switch> */}
          </Layout>
        )}
      ></Route>
    </Switch>
  );
};

const RouterConfig = () => {
  return <Router>{renderRouter(routes)}</Router>;
};

export default RouterConfig;
