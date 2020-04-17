export default {
    state: 0,
    reducers: {
        increment: (state, payload) => state + payload,
        decrease: (state, payload) => state - payload,
    },
}
