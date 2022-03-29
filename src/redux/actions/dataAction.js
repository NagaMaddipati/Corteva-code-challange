import axios from "axios";


export const fetchData = () => async (dispatch) => {
    dispatch({
        type: "GET",
        payload: true,
    });

    axios.get("https://jsonplaceholder.typicode.com/todos/1")
        .then(res => dispatch({
            type: "GET",
            payload: res.data,
        })).catch(e => console.log(e))

};

