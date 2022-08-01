import type { NextPage } from "next";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import CardGrid from "../components/CardGrid.component";

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

const Home: NextPage<Props> = ({ characters }) => {
  return (
    <div>
      <CardGrid characters={characters} />
    </div>
  );
};

export default Home;

// Fetch the characters from the GraphQL API and pass them to the CardGrid component

interface CharacterQuery {
  allPeople: {
    people: Character[];
  };
}
export async function getStaticProps() {
  const { data } = await client.query<CharacterQuery>({
    query: gql`
      query Characters {
        allPeople(first: 10) {
          people {
            name
            birthYear
            gender
            eyeColor
            hairColor
            id
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.allPeople.people,
    },
  };
}
