export default {
    namespace: 'layout',

    state: {
        mode: 'horizontal',
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