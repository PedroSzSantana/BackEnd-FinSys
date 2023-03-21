class BadRequestError extends Error{
    constructor(message:any){
        super(message);
        this.name="BadRequestError";
        this.message=message
    }
}
export {BadRequestError}