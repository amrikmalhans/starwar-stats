import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  height: number;
  base_experience: number;
  id: number;
  weight: number;
};

export default async function pikachuHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const { base_experience, height, id, name, weight } =
    (await data.json()) as Data;

  res.status(200).json({
    name,
    height,
    base_experience,
    id,
    weight,
  });
}
