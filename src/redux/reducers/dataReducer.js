

const initialState = {
    data: null
};

export const dataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "GET":
            return { ...state, data: payload };

        default:
            return state;
    }
};