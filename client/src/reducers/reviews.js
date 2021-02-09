export default (reviews = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return reviews;
        default:
            return reviews;
    }
}