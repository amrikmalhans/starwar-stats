import { NextPage } from "next/types";
import List from "./List.component";

interface Props {
  homeworld: Homeworld;
}

interface Homeworld {
  name: string;
  population: number;
  diameter: number;
}

const Popover: NextPage<Props> = ({ homeworld }) => {
  return (
    <div>
      <div className=" absolute flex flex-col justify-center items-center max-w-sm rounded overflow-hidden shadow-lg bg-slate-100">
        <div className="bg-white w-full p-5">
          <List field="Name" value={homeworld.name} />
          <List field="Population" value={homeworld.population} />
          <List field="Diameter" value={homeworld.diameter} />
        </div>
      </div>
    </div>
  );
};

export default Popover;
