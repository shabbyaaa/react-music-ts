import React, { lazy, Suspense, LazyExoticComponent } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Layout from "./layout";
import Loading from "./components/Loading1";

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
const Album = SuspenseComponent(lazy(() => import("./page/Album")));
const Singer = SuspenseComponent(lazy(() => import("./page/Singer")));
const Search = SuspenseComponent(lazy(() => import("./page/Search")));

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/recommend",
        component: Recommend,
        children: [
          {
            path: "/recommend/:id",
            component: Album,
          },
        ],
      },
      {
        path: "/singers",
        component: Singers,
        children: [
          {
            path: "/singers/:id",
            component: Singer,
          },
        ],
      },
      {
        path: "/rank",
        component: Rank,
        children: [
          {
            path: "/rank/:id",
            component: Album,
          },
        ],
      },
      {
        path: "/search",
        component: Search,
      },
      // 增加 album 路由，用来显示歌单
      {
        path: "/album/:id",
        component: Album,
      },
      { path: "/", exact: true, redirect: "/recommend" },
    ],
  },
];

const renderRouter = (routers: any) => {
  if (!Array.isArray(routers)) return null;
  return (
    <Switch>
      {routers.map((route, index) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.path || index}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
            />
          );
        }

        return (
          <Route
            key={route.key || index}
            exact={route.exact}
            strict={route.exact}
            path={route.path}
            render={() => {
              const renderChildRoutes = renderRouter(route.children);
              if (route.component) {
                return (
                  <route.component route={route}>
                    {renderChildRoutes}
                  </route.component>
                );
              }
              return renderChildRoutes;
            }}
          />
        );
      })}
    </Switch>
    // <Switch>
    //   <Route
    //     path="/"
    //     render={() => (
    //       <Layout>
    //         <Route
    //           path="/recommend"
    //           exact
    //           render={() => (
    //             <Switch>
    //               <Route path="/" render={() => <Recommend />} />
    //               <Route path="/recommend/:id" render={() => <Album />} />
    //             </Switch>
    //           )}
    //         ></Route>
    //         <Route path="/singers" render={() => <Singers />} />
    //         <Route path="/rank" render={() => <Rank />} />
    //         <Redirect to="/recommend" />
    //       </Layout>
    //     )}
    //   ></Route>
    // </Switch>
  );
};

const RouterConfig = () => {
  return <Router>{renderRouter(routes)}</Router>;
};

export default RouterConfig;
