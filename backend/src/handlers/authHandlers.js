
/**
 * This module contains handlers for allowing users to login to third party services.
 * In this case it will be with github oauth app
 */


/**
 * After successfull login, this handler will receive the access token from github.
 * @param {*} req 
 * @param {*} res 
 */
export function githubCallbackHandler(req, res) {
    res.redirect('/');
}

/**
 * Checks if the user is logged in
 * @param {*} req 
 * @param {*} res 
 */
export function loginstatusHandler(req, res) {
    if (req.user && req.user.id) {
        res.status(200).end();
    } else {
        res.status(401).end();
    }
}