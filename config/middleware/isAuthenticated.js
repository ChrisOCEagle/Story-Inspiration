/* this middleware is for restricting routes a user is not allowed to visit if not logged in */
module.exports = function(req, res, next) {
    // if the user is logged in,
    if (req.user) {
        // continue with the request to the restricted route
        return next();
    } else {
        // otherwise redirect the user to the index page
        return res.json(req.user);
    }
};
