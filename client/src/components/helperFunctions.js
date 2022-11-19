let helperFunctions = {
  getIDFromURL: () => {
    let localURL = window.location.href.split('/')
    let id = localURL[localURL.length - 1];

    return id;
  }
}

export default helperFunctions;