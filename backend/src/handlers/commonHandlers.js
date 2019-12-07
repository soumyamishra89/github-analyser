import errorMessages from "../utils/errorMessages";

/**
 * This module contains modules that will be accessed from other modules, 
 * thus implementing common logic like checking for user data.
 */

 export function verifyLoggedUser(req, res, next) {
    if (req.user && req.user.id && req.user.access_token) {
        next();
    } else {
        res.status(401).json({
            error: errorMessages.unauthorised
        });
    }
 }