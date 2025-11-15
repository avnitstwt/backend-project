class Apierror extends Error{
    constructor(
        statusCode,
        message = "Something wen wrong",
        errors = [],
        stack ="",
    ){
        super( )
    }
}