const state = {  
    userInfo:{},
    message:'',
    // reviews:[],
    createdReview:{},
    signupSuccess:false,
    loggedIn:false ,
    userT:{}
}
 const  review =(initialState = state, action) => {
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
                userInfo: action.payload,
                loggedIn:true
            };
        case 'SIGNINFAILS':
            return {
                ...state,
                message: action.payload
            };
        case 'SET_CURRENT_USER':
            return {
                ...state,
                userInfo:action.payload,
                loggedIn:true
            };
        case 'LOGOUT':
            return {
                ...state,
                loggedIn:false
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
