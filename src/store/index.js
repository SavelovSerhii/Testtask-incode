import { configureStore } from "@reduxjs/toolkit";
import { CHOOSE_REPO, TOGGLE_ERROR, TOGGLE_MOVING, CHANGE_URL, CHANGE_STARGAZERS, CHANGE_SELECTED_ISSUE, CHANGE_REPO_LIST } from './actions';

const initialState = {
    currentRepo: '',
    isError: false,
    isMoving: false,
    url: 'https://github.com/facebook/react',
    stargazersList: {},
    selectedIssue: {},
    repoList: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHOOSE_REPO:
            return {
                ...state,
                currentRepo: action.payload
            };

        case TOGGLE_ERROR:
            return {
                ...state,
                isError: action.payload
            };

        case TOGGLE_MOVING:
            return {
                ...state,
                isMoving: action.payload
            };
    
        case CHANGE_URL:
            return {
                ...state,
                url: action.payload
            };

        case CHANGE_STARGAZERS:
            return {
                ...state,
                stargazersList: {...action.payload}
            };

        case CHANGE_SELECTED_ISSUE:
            return {
                ...state,
                selectedIssue: {...action.payload}
            };

        case CHANGE_REPO_LIST:
            return {
                ...state,
                repoList: {...action.payload}
            };

        default:
            return state;
    }
}

const store = configureStore({ reducer });

export default store