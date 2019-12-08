import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github';
import usersService from '../services/dataservices/usersService';

if (process.env.NODE_ENV !== 'test') {
    // the client id and secret are to be set as environment variables
    const { CLIENTID, CLIENTSECRET } = process.env;
    // setups guthub passport strategy
    passport.use(new GithubStrategy({
        clientID: CLIENTID,
        clientSecret: CLIENTSECRET,
        scope: [ 'read:user', 'public_repo', 'user:email' ],
        callbackURL: '/auth/github-oauth-callback'
    }, async function(accessToken, refreshToken, profile, callback) {
            if (profile) {
                // creates an user from the profile
                const user = {
                    id: profile.id,
                    name: profile.username,
                    email: profile.emails[0].value,
                    access_token: accessToken
                }
                
                // stores the user in the database
                const success = await usersService.insertOrUpdateUser(user);
                
                if (success) {
                    callback(null, user);
                    return;
                }            
            }
            callback(null, null);
        })
    );

    passport.serializeUser(function(user, done) {
        if (user) {
            done(null, user.id);
        } else {
            done(null, null);
        }    
    });

    passport.deserializeUser(async function(userId, done) {
        // find the user for the id that was serialised
        const user = await usersService.getUserForId(userId);
        done(null, user);
    })
}
export default passport;