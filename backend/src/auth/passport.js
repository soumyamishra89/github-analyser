import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github';

// the client id and secret are to be set as environment variables
const { CLIENTID, CLIENTSECRET } = process.env;
// setups guthub passport strategy
passport.use(new GithubStrategy({
    clientID: CLIENTID,
    clientSecret: CLIENTSECRET,
        // scopes: ['repo:invite', 'user:email'],
    callbackURL: '/auth/github-oauth-callback'
}, function(accessToken, refreshToken, profile, callback) {s
        callback(null, profile);
    })
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
})

export default passport;