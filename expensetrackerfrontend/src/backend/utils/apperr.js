class Apperr extends Error 
{
    constructor(message,statuscode)
    {
         super(message);
         this.statuscode=statuscode;
         this.status="failed";
    }
}

const apperr = (message,statusCode)=>{
     let error = new Error(message);
     error.statusCode=statusCode;
     return apperr;
}

module.exports = {
    Apperr,
    apperr
};