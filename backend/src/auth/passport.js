import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github';
import usersService from '../services/dataservices/usersService';

// the client id and secret are to be set as environment variables
const { CLIENTID, CLIENTSECRET } = process.env;
// setups guthub passport strategy
passport.use(new GithubStrategy({
    clientID: CLIENTID,
    clientSecret: CLIENTSECRET,
    scope: [ 'read:user', 'public_repo', 'user:email' ],
    callbackURL: '/auth/github-oauth-callback'
}, function(accessToken, refreshToken, profile, callback) {
        if (profile) {
            // creates an user from the profile
            const user = {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                access_token: accessToken
            }
            callback(null, user);
        } else {
            callback(null, null);
        }
    })
);

passport.serializeUser(async function(user, done) {
    if (user) {
        // stores the user in the database
        const success = await usersService.createOrUpdateUser(user);
        if (success) {
            done(null, user.id);
        } else {
            done(null, null);
        }
    }
});

passport.deserializeUser(async function(userId, done) {
    // find the user for the id that was serialised
    const user = await usersService.getUserForId(userId);
    done(null, user);
})

export default passport;