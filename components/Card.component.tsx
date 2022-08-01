import { NextPage } from "next";
import { useState } from "react";
import client from "../apollo-client";
import { gql } from "@apollo/client";
import Popover from "./Popover.component";
import List from "./List.component";
import Image from "next/image";

interface Props {
  character: Character;
  index: number;
}

interface Character {
  name: string;
  birthYear: string;
  gender: string;
  eyeColor: string;
  hairColor: string;
  id: string;
}

interface Homeworld {
  name: string;
  population: number;
  diameter: number;
}

interface HomeworldQuery {
  planet: Homeworld;
}

const Card: NextPage<Props> = ({ character, index }) => {
  const [homeWorldData, setHomeWorldData] = useState<Homeworld>();
  const [showPopover, setShowPopover] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch data for each character's homeworld from the GraphQL API
  const fetchHomeWorldData = async (id: string) => {
    setLoading(true);
    const { data } = await client.query<HomeworldQuery>({
      query: gql`
        query Homeworld($planetId: ID) {
          planet(id: $planetId) {
            name
            population
            diameter
          }
        }
      `,
      variables: {
        planetId: id,
      },
    });

    setHomeWorldData(data.planet);
    setShowPopover(!showPopover);
    setLoading(false);
  };

  const IMG_SRC = `https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`;

  return (
    <div className="h-[32rem] flex flex-col relative justify-center items-center max-w-sm rounded-xl overflow-hidden shadow-lg bg-slate-100">
      <picture className="h-full w-full">
        <Image
          loader={() => IMG_SRC}
          unoptimized={true}
          src={IMG_SRC}
          alt={character.name}
          width={300}
          height={300}
        />
      </picture>
      <section className="w-full rounded-t-3xl bg-white absolute inset-x-0 bottom-0 flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl font-bold p-4 font-Josefin">
          {character.name}
        </h1>
        <div className="p-4">
          <List field="Birth Year" value={character.birthYear} />
          <List field="Gender" value={character.gender} />
          <List field="Eye Color" value={character.eyeColor} />
          <List field="Hair Color" value={character.hairColor} />
        </div>
        <button
          onClick={() => fetchHomeWorldData(character.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        >
          {loading ? "Loading..." : "Show Homeworld"}
        </button>
        {showPopover && homeWorldData ? (
          <Popover homeworld={homeWorldData} />
        ) : null}
      </section>
    </div>
  );
};

export default Card;
