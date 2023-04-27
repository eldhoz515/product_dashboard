const appState = { config: {} };

function Reducer(state = appState, action) {
    console.log(action);
    switch (action.type) {
        case 'putData':
            return { ...state, ...action.data };
        case 'ytHeight':
            return { ...state, ytHeight: action.data };
        case 'putDesc':
            return { ...state, description: action.data };
        case 'delCategory':
            return { ...state, categories: state.categories.filter((value) => value.name != action.data) };
        case 'addCategory':
            if (action.data.length < 1)
                return state;
            return { ...state, categories: [...state.categories.filter((value) => value.name != action.data), { 'id': '', 'name': action.data }] };
        case 'delBM':
            return { ...state, businessModels: state.businessModels.filter((value) => value.name != action.data) };
        case 'addBM':
            if (action.data.length < 1)
                return state;
            return { ...state, businessModels: [...state.businessModels.filter((value) => value.name != action.data), { 'id': '', 'name': action.data }] };
        case 'putTRL':
            return { ...state, trls: action.data };
        case 'putConfig':
            return { ...state, config: action.data };
        default:
            return state;
    }
}

export default Reducer;