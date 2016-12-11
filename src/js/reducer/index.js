"use strict";
import {handleActions} from "redux-actions";

const reducer = handleActions(
  {},
  {
    pins         : [],
    repositories : [],
    organizations: []
  }
);

export default reducer;
