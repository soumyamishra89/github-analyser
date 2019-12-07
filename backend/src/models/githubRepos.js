import schema from 'schm';
import db from "../database";
import AbstractDBCollection from './abstractDBCollection';
import log from '../utils/logging';


/**
 * Defines an user schema to validate user before storing
 */
const githubRepoSchema = schema({
    owner: {type: String, required: true},
    name: {type: String, required: true},
    url: {type: String, required: true},
    commits: {type: Number, required: true},
    openPullRequests: {type: Number, required: true},
    readme: {type: String, required: true},
    requesterId: {type: String, required: true}, // id of the user who requested to fetch this data
    requestedOn: {type: Date, required: true}
})

/**
 * Guthub repo collection 
 * contains the details of the requested repo
 */
class GithubRepos extends AbstractDBCollection {
    constructor() {
        super(db.addCollection('githubRepos', {indices: ['owner', 'requesterId']}));        
    }

    async createOrUpdate(githubRepo) {
        // adds a date if not already present
        if (!githubRepo.requestedOn) {
            githubRepo.requestedOn = new Date();
        }
        try {
             // validates the github repo schema else throws an error
            await githubRepoSchema.validate(githubRepo);
            const newGithubRepo = userSchema.parse(githubRepo);
            return this.dbCollection.insert(newGithubRepo);            
        } catch(err) {
            log.error(err);
            throw Error('Invalid github repo schema');
        }
    }

    findByRequesterId(requesterId) {
        return this.dbCollection.find({requesterId});
    }
}

export default new GithubRepos();