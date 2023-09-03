import { createStore } from "redux";

import wordReducer from "./wordReducer";

const store = createStore(wordReducer);

export default store;