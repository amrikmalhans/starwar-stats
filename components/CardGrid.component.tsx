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
    <section className="bg-slate-200 m-2 p-5 lg:m-10 lg:p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10">
      {characters &&
        characters.map((character, index) => (  
          <Card key={character.id} character={character} index={index} />
        ))}
    </section>
  );
};

export default CardGrid;
