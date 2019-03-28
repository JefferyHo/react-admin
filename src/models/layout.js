export default {
    namespace: 'layout',

    state: {
        mode: 'inline',
        theme: 'dark'
    },

    reducers: {
        changeMode(state, { payload }) {
            return {
                ...state,
                mode: payload,
            }
        },
        changeTheme(state, {payload}) {
            return {
                ...state,
                theme: payload,
            }
        }
    }
}