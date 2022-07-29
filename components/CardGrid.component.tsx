import { NextPage } from "next";
import Card from "./Card.component";

interface Character {
  name: string;
  birthYear: string;
  gender: string;
  eyeColor: string;
  hairColor: string;
  id: string;
}

interface Props {
  characters: Character[];
}

const CardGrid: NextPage<Props> = ({ characters }) => {
  return (
    <div className="bg-slate-200 m-10 p-20 grid grid-cols-3 justify-center items-center gap-10">
      {characters &&
        characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
    </div>
  );
};

export default CardGrid;
