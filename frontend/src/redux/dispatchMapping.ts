import { ThunkDispatch } from "redux-thunk";
import api from "../services/remote/api";
import { AppState } from "../types";

export const mapGithubDispatchToProps = (dispatch: ThunkDispatch<AppState, any, any>) => ({
    loadGithubRepos: () => dispatch(api.loadGithubRepos())
});