import users from "../../models/users";
import log from "../../utils/logging";

/**
 * This module handles user related database queries
 */

/**
 * adds or updates an user to the database and returns true if successful
 * @param {*} user 
 */
async function createOrUpdateUser(user) {
    log.info('createOrUpdateUser');
    try {
        await users.createOrUpdate(user);
        return true;
    } catch(err) {
        log.error(err);
        return false;
    }
}

/**
 * Finds the user for the id provided. returns null if not found
 * @param {*} userId 
 */
async function getUserForId(userId) {
    log.info('getUserForId');
   
    return users.findById(userId);
}

export default {
    createOrUpdateUser,
    getUserForId
}