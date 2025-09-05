export const restrictTo = (...roles) =>  // ['user', 'admin, 'sales-man'] or ['admin']
{

    return (req, res, next) => {
        if (!roles.includes(req.role)) {
            return res.status(404).json({
                message: "you are not authorized"
            });
        }
        else {
            next();
        }
    }


}