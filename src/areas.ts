export type Area = (
  | ({
      type: "destination";
    } & { name: string })
  | { type: "crossroad" }
) & { x: number; z: number; neighbors: number[] };

export const areas: Area[] = [
  {
    name: "Crave",
    type: "destination",
    x: 350,
    z: 1250,
    neighbors: [1],
  },
  {
    type: "crossroad",
    x: -370,
    z: 1250,
    neighbors: [0, 2],
  },
  {
    type: "crossroad",
    x: -370,
    z: 1100,
    neighbors: [1, 3],
  },
  {
    name: "Magrabi",
    type: "destination",
    x: -1100,
    z: 1100,
    neighbors: [2],
  },
  // {
  //   name: "Technology Center",
  //   type: "destination",
  //   x: 1870,
  //   z: -600,
  //   neighbors: [1],
  // },
  // {
  //   name: "Alahly ATM",
  //   type: "destination",
  //   x: 1854,
  //   z: 1020,
  //   neighbors: [1],
  // },
  // {
  //   type: "crossroad",
  //   x: 801,
  //   z: 380,
  //   neighbors: [2, 6, 7],
  // },
  // {
  //   name: "Masr Bank ATM",
  //   type: "destination",
  //   x: 801,
  //   z: 1020,
  //   neighbors: [5],
  // },
  // {
  //   name: "CIB ATM",
  //   type: "destination",
  //   x: 804,
  //   z: -550,
  //   neighbors: [5],
  // },
];
