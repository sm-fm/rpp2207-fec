let helperFunctions = {
  getIDFromURL: (url) => {
    let localURL = url.split('/')
    let id = localURL[localURL.length - 1];

    return id;
  }
}

module.exports.helperFunctions = helperFunctions;