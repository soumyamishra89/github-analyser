import schema from 'schm';
import db from "../database";
import AbstractDBCollection from './abstractDBCollection';
import log from '../utils/logging';


/**
 * Defines an user schema to validate user before storing
 */
const userSchema = schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    access_token: String
})

/**
 * User collection 
 */
class Users extends AbstractDBCollection {
    constructor() {
        super(db.addCollection('users', {indices: ['id', 'email']}));        
    }

    async insertOrUpdate(user) {
        try {
            // validates the user schema else throws an error
            await userSchema.validate(user);
            const newUser = userSchema.parse(user);
            const existingUser = this.findById(newUser.id);
            if (existingUser) {
                existingUser.access_token = user.access_token;
                this.dbCollection.update(existingUser);
                return existingUser;
            } else {
                return this.dbCollection.insert(newUser);
            }
        } catch(err) {
            log.error(err);
            throw Error('Invalid user schema');
        }
    }

    findById(userId) {
        return this.dbCollection.findOne({id: userId});
    }

    removeAll() {
        this.dbCollection.chain().find().remove();
    }
}

export default new Users();