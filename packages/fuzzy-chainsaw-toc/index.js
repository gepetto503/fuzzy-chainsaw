const template = require('./dist/template');

const structureArchiveData = require('fuzzy-chainsaw-shared/lib/structure-archive-data');

const tableOfContents = (rawArchive, config) => {
  const data = structureArchiveData(rawArchive);
  Object.assign(data, {
    config: Object.assign({
      headerFontSize: '1.25em',
      groupHeaderFontSize: '1em',
      padding: '1.25em'
    }, config)
  });

  return template(data);
};

module.exports = tableOfContents;
