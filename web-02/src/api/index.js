import intersection from "lodash.intersection";

const nevItems = [
  {
    key: "_dashboard",
    label: "Dashboard",
    url: "/dashboard",
    children: []
  },
  {
    key: "_workflow",
    label: "Workflow",
    url: "/workflow",
    view: "none",
    children: [
      {
        key: "97wwe4wer977e",
        label: "W1",
        view: "TabView"
      },
      {
        key: "987ww97987yee",
        label: "W2",
        view: "TabView"
      }
    ]
  },
  {
    key: "_manage",
    label: "Manage",
    url: "/manage",
    children: []
  }
];

const fetchNevItems = () => {
  return fakeRequest(nevItems);
};

const fakeRequest = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, Math.random() * 100);
  });
};

export default { fetchNevItems };
