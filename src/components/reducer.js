export const initialState = {
    user: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.user };
        case "REMOVE_USER":
            return { ...state, user: null };
        default: throw new Error();
    }
};

export default reducer;