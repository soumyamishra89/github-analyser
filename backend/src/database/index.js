import lokijs from 'lokijs';

// this module provides the database to persist data. LokiJS is a no sql in memory database that stores data as json
const db = new lokijs('githubAnalyserDB');

export default db;