import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import ActivityDemoPage from "./app/pages/ActivityDemo/ActivityDemoPage";
import PokemonAsyncReactPage from "./app/pages/PokemonAsyncReact/PokemonAsyncReactPage";
import { NotInMyBackyardPage } from "./app/pages/NotInMyBackyard/NotInMyBackyardPage";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  render(Document, [route("/", Home)]),
  route("/activityDemo", [ActivityDemoPage]),
  route("/pokemonAsyncReact", [PokemonAsyncReactPage]),
  route("/notInMyBackyard", [NotInMyBackyardPage])
]);
