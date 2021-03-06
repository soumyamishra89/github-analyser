/**
 * Abstract model (collection) defines the methods for accessing the data
 */
export default class AbstractDBCollection {
    constructor(dbCollection) {
        this.dbCollection = dbCollection;
        if (this.constructor == AbstractDBCollection) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    
    insert() {
        throw new Error('Missing implementation');
    }

    insertOrUpdate() {
        throw new Error('Missing implementation');
    }

    findById() {
        throw new Error('Missing implementation');
    }

    removeAll() {
        throw new Error('Missing implementation');
    }
}
