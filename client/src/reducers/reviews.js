const state = {  
    userInfo:{},
    message:'',
    reviews:[],
    createdReview:{}
}
 const  review =(initialState = state, action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return {
                ...state,
                reviews:action.payload
            };
        case 'SIGNUP':
            return{
                ...state,
                userInfo: {}
        
            };
        case 'SIGNIN':
            return {
                ...state,
                userInfo: action.payload

            };
        case 'CREATE_REVIEW':
            return {
                ...state,
                createdReview:action.payload
            };
        default:
            return state;
    }
}

export default review
