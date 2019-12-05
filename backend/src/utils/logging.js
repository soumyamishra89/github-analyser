
const log = {
    debug: function() {
      console.log("DEBUG: ", ...arguments);
    },
    info: function() {
      console.log("INFO: ", ...arguments);
    },
    warn: function() {
      console.log("WARNING: ", ...arguments);
    },
    error: function() {
      console.log("ERROR: ", ...arguments);
    }
  };
  
  export default log;