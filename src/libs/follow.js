module.exports = function follow(api, rootPath, relArray) {
  let root = api({
    method: 'GET',
    path: rootPath
  });

  return relArray.reduce(function(root, arrayItem) {
    const rel = typeof arrayItem === 'string' ? arrayItem : arrayItem.rel;
    return traverseNext(root, rel, arrayItem);
  }, root);

  function traverseNext(root, rel, arrayItem) {
    return root.then(function(response) {
      window.console.log(rel);
      //for some reason, this is not being parsed correctly
      response.entity = JSON.parse(response.entity);
      window.console.log(response.entity);
      if (hasEmbeddedRel(response.entity, rel)) {
        window.console.log('has rel');
        return response.entity._embedded[rel];
      }

      if (!response.entity._links) {
        return [];
      } else {
        window.console.log('has links');
      }

      if (typeof arrayItem === 'string') {
        return api({
          method: 'GET',
          path: response.entity._links[rel].href
        });
      } else {
        return api({
          method: 'GET',
          path: response.entity._links[rel].href,
          params: arrayItem.params
        });
      }
    });
  }

  function hasEmbeddedRel(entity, rel) {
    return entity._embedded && entity._embedded.hasOwnProperty(rel);
  }
};
