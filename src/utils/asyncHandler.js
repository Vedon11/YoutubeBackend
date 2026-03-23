const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;
/* this is was about when async block runs and we apply try catch 
const asyncHandler =( fn )=> async (req,res,next)=>{
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code|| 404).json({
            success:false,
            message: error.message
        })
    }
}*/
