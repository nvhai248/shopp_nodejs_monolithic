module.exports = (req,res, next) => {
    try {
        const signature = req.get("Authorization");
        console.log(signature);
        const token = signature.split(" ")[1];
        const payload = await jwt.verify(token, APP_SECRET);
        req.user = payload;
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
}

const validateSignature = async (req) => {
  
};
