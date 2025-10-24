import { layout, prefix, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import ActivityDemoPage from "./app/pages/ActivityDemo/ActivityDemoPage";
import PokemonAsyncReactPage from "./app/pages/PokemonAsyncReact/PokemonAsyncReactPage";
import { NotInMyBackyardPage as Session5 } from "./app/pages/TakeFlightGames/Session 5/NotInMyBackyard/NotInMyBackyardPage";
import { TakeFlightLayout } from "./app/pages/TakeFlightGames/TakeFlightLayout";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  render(Document, [
    route("/", Home),
    route("/activityDemo", [ActivityDemoPage]),
    route("/pokemonAsyncReact", [PokemonAsyncReactPage]),
    route("/notInMyBackyard", [Session5]),
    prefix("/takeFlight", [
      layout(TakeFlightLayout, [
        route("/session5", Session5),
      ])
    ])])
]);
