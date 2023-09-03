const wordAction = (value) => {
    return{
        type:'ADDWORD',
        payload:value,
    };
}
export default wordAction;