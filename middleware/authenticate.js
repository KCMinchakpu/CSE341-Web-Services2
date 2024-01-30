const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) 
    {
        return res.status(481).json("You do NOT have access!");
    } next();
};

module.exports = {
    isAuthenticated
}