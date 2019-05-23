import React, { Component } from "react";
import { func, shape, string } from "prop-types";

import unknownRouteResolve from "./unknownRouteResolve";

const InternalError = Symbol("InternalError");
const NotFound = Symbol("NotFound");
const mountedInstances = new WeakSet();

export default class RouteHandler extends Component {
  static propTypes = {
    baseApi: string.isRequired,
    children: func,
    location: shape({ pathname: string.isRequired }).isRequired
  };

  state = {
    componentMap: new Map(),
    errorState: {
      harError: false,
      internalError: false,
      notFound: false
    }
  };

  async addToCache(urls) {
    if (!window.caches) {
      throw new Error(
        "Current environment dose not support cache storage at window.cache"
      );
    }
    const rCache = await window.caches.open(
      `workbox-runtime-${location.origin}/`
    );
    await rCache.addAll(urls);
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    const isSearch = pathname === "/search.html";

    mountedInstances.add(this);
    if (!isSearch) {
      this.getRouteComponent(pathname);
    }
  }

  componentDidUpdate() {
    const { props, state } = this;
    const { pathname } = props.location;
    const isKnown = state.componentMap.has(pathname);
    const isSearch = pathname === "/search.html";

    const isNotFoundComponent = isKnown
      ? state.componentMap.get(pathname).id === -1
      : false;

    const shouldReloadRoute = isNotFoundComponent && navigator.onLine;

    if ((!isKnown && !isSearch) || shouldReloadRoute) {
      this.getRouteComponent();
    }
  }

  componentWillUnmount() {
    mountedInstances.delete(this);
  }

  async getRouteComponent() {
    const {
      baseApi,
      location: { pathname }
    } = this.props;

    const fetchRoot =
      "default" in fetchRootComponent
        ? fetchRootComponent.default
        : fetchRootComponent;

    try {
      const resolvedRoute = await unknownRouteResolve({
        baseApi,
        route: pathname
      });

      const { type, id } = resolvedRoute;
      if (!type || !id) {
        throw new Error("404");
      }

      const RootComponent = await fetchRoot(type);

      this.setRootComponent(pathname, RootComponent, { id });
    } catch ({ message }) {
      const symbol = message === "404" ? NotFound : InternalError;
      this.setRootComponent(pathname, symbol);
    }
  }

  setRootComponent(pathname, RootComponent, meta) {
    if (!mountedInstances.has(this)) {
      return;
    }
    this.addToCache([pathname]).catch(e => {
      if (process.env.NODE_ENV === "development") {
        console.warn(`could not add ${pathname} to cache`, e);
      }
    });

    this.setState(({ componentMap }) => ({
      componentMap: new Map(componentMap).set(pathname, {
        RootComponent,
        ...meta
      }),
      errorState: {
        hasError: typeof RootComponent === "symbol",
        internalError: RootComponent === InternalError,
        notFound: RootComponent === NotFound
      }
    }));
  }

  renderChildren(loading) {
    const { props, state } = this;
    const { children } = props;
    const { errorState } = state;

    return typeof children === "function"
      ? children({ ...errorState, loading })
      : null;
  }

  render() {
    const { props, state } = this;
    const { pathname } = props.location;
    const { componentMap, errorState } = state;

    if (!componentMap.has(pathname)) {
      return this.renderChildren(true);
    }
    if (errorState.harError) {
      return this.renderChildren(false);
    }

    const { RootComponent, ...routeProps } = componentMap.get(pathname);

    return <RootComponent {...routeProps} key={pathname} />;
  }
}
