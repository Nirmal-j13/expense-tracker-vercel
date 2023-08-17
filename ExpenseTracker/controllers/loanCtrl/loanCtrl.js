
const Loan = require("../../model/loans")

//Create
const createctrl=async (req,res,next)=>{
   const type=req.body.type;
   const Minimumage = req.body.Minimumage;
   const Maximumage = req.body.Maximumage;
   const MinimumIncome = req.body.MinimumIncome;
   const Loanamount = req.body.Loanamount;
   const LoanTenure = req.body.LoanTenure;
    try{
        //1.Find the logged in user
       // const userfound = await User.findById(req.user);
        //if(!userfound)
      //  {
           // return next(new Apperr("User not found",404));
       // }
        //2.Create the account
        const loan = await Loan.create({
            type,
            Minimumage,
            Maximumage,
            MinimumIncome,
            Loanamount,
            LoanTenure
        })
        //3.push the accounts into users accounts fields
         // userfound.loan.push(loan._id);
        //4.Resave the user 
          //await userfound.save();
        res.json({
            status:"Success",
            data:loan,
        });
    }
    catch(err){
        return next(err);
    }    
};

const retriveallctrl=async (req,res)=>{
    try{
        const loans = await Loan.find();
        res.json(loans);
    }
    catch(err){
       res.json(err);
    }    
}

module.exports={
createctrl,
retriveallctrl
}