export type Area = (
  | ({
      type: "destination";
    } & { name: string })
  | { type: "crossroad" }
) & { x: number; z: number; neighbors: number[] };

export const areas: Area[] = [
  {
    name: "Entrance",
    type: "destination",
    x: 2065,
    z: 384,
    neighbors: [1],
  },
  {
    type: "crossroad",
    x: 1870,
    z: 384,
    neighbors: [2, 3, 4, 0],
  },
  {
    name: "Play Area",
    type: "destination",
    x: 1310,
    z: 390,
    neighbors: [1, 5],
  },
  {
    name: "Technology Center",
    type: "destination",
    x: 1870,
    z: -600,
    neighbors: [1],
  },
  {
    name: "Alahly ATM",
    type: "destination",
    x: 1854,
    z: 1020,
    neighbors: [1],
  },
  {
    type: "crossroad",
    x: 801,
    z: 380,
    neighbors: [2, 6, 7],
  },
  {
    name: "Masr Bank ATM",
    type: "destination",
    x: 801,
    z: 1020,
    neighbors: [5],
  },
  {
    name: "CIB ATM",
    type: "destination",
    x: 804,
    z: -550,
    neighbors: [5],
  },
];
