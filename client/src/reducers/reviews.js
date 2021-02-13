export default (reviews = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'SIGNUP':
            return [...reviews, action.payload];
        case 'SIGNIN':
            return [...reviews, action.payload];
        case 'CREATE_REVIEW':
            return [...reviews, action.payload];
        default:
            return reviews;
    }
}