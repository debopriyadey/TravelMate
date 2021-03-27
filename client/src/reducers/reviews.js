const initialState = {  
    userInfo: JSON.parse(localStorage.getItem("users")) === null ? [] : JSON.parse(localStorage.getItem("users")),
    message:'',
    // reviews:[],
    createdReview:{}
}
 const  review =(state = initialState , action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return {
                ...state,
                // reviews:action.payload
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
                createdReview: action.payload
            };
        default:
            return state;
    }
}

export default review
