const numRegex = /^\d+$/;
const digitToNum = str =>
  typeof str === "string" && numRegex.test(str) ? Number(str) : str;

export default async function unknownRouteResolve(opts) {
  const { route, baseApi } = opts;

  if (!unknownRouteResolve.preloadDone) {
    unknownRouteResolve.preloadDone = true;

    const preloadAttrs = document.body.dataset;

    if (preloadAttrs && preloadAttrs.modelType) {
      return {
        type: preloadAttrs.modelType,
        id: digitToNum(preloadAttrs.modelId)
      };
    }

    const preloadScript = document.getElementById("url-resolver");
    if (preloadScript) {
      try {
        const preload = JSON.parse(preloadScript.textContent);
        return {
          type: preload.type,
          id: digitToNum(preload.id)
        };
      } catch (e) {
        if (process.env.NODE_ENV === "development") {
          console.error("unable to read preload!", preload.textContent, e);
        }
      }
    }
  }

  return remotelyResolveRoute(route, baseApi);
}

function remotelyResolveRoute(opts) {
  let urlResolve = localStorage.getItem("urlResolve");
  urlResolve = JSON.parse(urlResolve);
  if ((urlResolve && urlResolve[opts.route]) || !navigator.onLine) {
    if (urlResolve && urlResolve[opts.route]) {
      return Promise.resolve(urlResolve[opts.route].data.urlResolve);
    } else {
      return Promise.resolve({ type: "NOTFOUND", id: -1 });
    }
  } else {
    return fetchRoute(opts);
  }
}

function fetchRoute(opts) {
  const url = new URL("/graphql", opts.baseApi);
  return fetch(url, {
    method: "POST",
    credentials: "include",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      query: `{
          urlResolver(url:"${opts.route}"){
            type
            id
          }
      }`.trim()
    })
  })
    .then(res => res.json())
    .then(res => {
      storeUrlResolveResult(res, opts);
      return res.data.urlResolver;
    });
}

function storeUrlResolveResult(res, opts) {
  const storedRoute = localStorage.getItem("urlResolve");
  const item = JSON.parse(storedRoute) || {};
  item[opts.route] = res;
  localStorage.setItem("urlResolve", JSON.stringify(item));
}
