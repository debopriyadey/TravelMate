const initialState = {  
    userInfo: JSON.parse(localStorage.getItem("users")) === null ? {} : JSON.parse(localStorage.getItem("users")),
    message:'',
    signupMessage:'',
    // reviews:[],
    createdReview:{},
    signupSuccess:false,
    loggedIn:false ,
    myreviews:[],
    allreviews:[],
    currentReview: null,
}
 const  review =(state = initialState , action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return {
                ...state,
                allreviews:action.payload[1],
                myreviews:action.payload[0]
            };
        case 'SIGNUP':
            return{
                ...state,
                userInfo: [],
                signupSuccess:true
                
            };
        case 'SIGNUPFAILS':
            return{
                ...state,
                signupMessage: action.payload
            };
        case 'SIGNUPTOLOGIN':
            return{
                ...state,
                signupSuccess:false
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
                myreviews: state.myreviews.push(action.payload)
            };
        case 'CURRENT_REVIEW':
            return {
                ...state,
                currentReview: action.payload
            };
        default:
            return state;
    }
}

export default review
