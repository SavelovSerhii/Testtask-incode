export const CHOOSE_REPO = "CHOOSE_REPO";
export const TOGGLE_ERROR = "TOGGLE_ERROR";
export const TOGGLE_MOVING = "TOGGLE_MOVING";
export const CHANGE_URL = "CHANGE_URL";
export const CHANGE_STARGAZERS = "CHANGE_STARGAZERS";
export const CHANGE_SELECTED_ISSUE = "CHANGE_SELECTED_ISSUE";
export const CHANGE_REPO_LIST = "CHANGE_REPO_LIST";

export const chooseRepo = (payload) => ({
    type: CHOOSE_REPO,
    payload
})

export const toggleError = (payload) => ({
    type: TOGGLE_ERROR,
    payload
})

export const toggleMoving = (payload) => ({
    type: TOGGLE_MOVING,
    payload
})

export const changeUrl = (payload) => ({
    type: CHANGE_URL,
    payload
})

export const changeStargazers = (payload) => ({
    type: CHANGE_STARGAZERS,
    payload
})

export const changeSelectedIssue = (payload) => ({
    type: CHANGE_SELECTED_ISSUE,
    payload
})

export const changeRepoList = (payload) => ({
    type: CHANGE_REPO_LIST,
    payload
})