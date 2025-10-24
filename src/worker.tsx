import { layout, prefix, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import ActivityDemoPage from "./app/pages/ActivityDemo/ActivityDemoPage";
import PokemonAsyncReactPage from "./app/pages/PokemonAsyncReact/PokemonAsyncReactPage";
import { NotInMyBackyardPage as Session1 } from "./app/pages/TakeFlightGames/Session 1/NotInMyBackyard/NotInMyBackyardPage";;
import { NotInMyBackyardPage as Session2 } from "./app/pages/TakeFlightGames/Session 2/NotInMyBackyard/NotInMyBackyardPage";
import { NotInMyBackyardPage as Session3 } from "./app/pages/TakeFlightGames/Session 3/NotInMyBackyard/NotInMyBackyardPage";;
import { NotInMyBackyardPage as Session4 } from "./app/pages/TakeFlightGames/Session 4/NotInMyBackyard/NotInMyBackyardPage";;
import { NotInMyBackyardPage as Session5 } from "./app/pages/TakeFlightGames/Session 5/NotInMyBackyard/NotInMyBackyardPage";

import { TakeFlightLayout } from "./app/pages/TakeFlightGames/TakeFlightLayout";
import TakeFlightHome from "./app/pages/TakeFlightGames/TakeFlightHome";

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
    prefix("/takeFlight", [
        route("/", TakeFlightHome),
        layout(TakeFlightLayout, [
        route("/session1", Session1),
        route("/session2", Session2),
        route("/session3", Session3),
        route("/session4", Session4),
        route("/session5", Session5),
      ])
    ])])
]);
