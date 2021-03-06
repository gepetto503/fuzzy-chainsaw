export const pagesContext = require.context('@pages/', true, /^(?!.*\.test|.*\.example).*\.jsx$/);
export const atomsContext = require.context('@atoms/', true, /^(?!.*\.test|.*\.example).*\.jsx$/);
export const moleculesContext = require.context('@molecules/', true, /^(?!.*\.test|.*\.example).*\.jsx$/);
export const organismsContext = require.context('@organisms/', true, /^(?!.*\.test|.*\.example).*\.jsx$/);
export const templatesContext = require.context('@templates/', true, /^(?!.*\.test|.*\.example).*\.jsx$/);


const isRenderableModule = (key) => (
  key.indexOf('.jsx') !== -1 && // grab jsx files
  key.indexOf('.md') === -1 && // skip markdown files
  key.indexOf('.test.jsx') === -1 && // skip test files
  key.substr(0, 1) !== '_' // skip partial files
);


// builds a path:module object
// { './source/page.jsx': require('./source/page.jsx') }
const requireAllpages = () =>
  pagesContext.keys()
    .filter(isRenderableModule)
    .reduce((modules, key) => {
      const newKey = key.replace(/\.jsx$/, '.html');
      modules[newKey] = pagesContext(key).default;
      return modules;
    }, { });


const requireAll = (context, prefix) =>
  context.keys()
    .filter(isRenderableModule)
    .reduce((modules, key) => {
      const name = key.substr(2).split('/')[0];
      modules[prefix + name] = context(key).default;
      return modules;
    }, {});


const path2LinkList = (baseUrl = '') => (data) => {
  const normalPath = data.path.substr(
    0,
    data.path.lastIndexOf('.') !== -1
    ? data.path.lastIndexOf('.')
    : undefined
  );

  return {
    ...data,
    url: `${baseUrl}/${normalPath}.html`, // remove html on dev
    content:
      data.path
        .replace('.html', '')
        .split('/')
        .map((s) => s.substr(0, 1).toUpperCase() + s.substr(1))
        .join(' / ')
  };
};


const sortFoldersFirst = (a, b) =>
  a.path.split('/').length - b.path.split('/').length;


const sortAlphabetical = (a, b) => {
  const A = a.path.toLowerCase();
  const B = b.path.toLowerCase();

  if (A < B) return -1;
  if (A > B) return 1;
  return 0;
};


const groupData = (res, data) => {
  if (data.theme) {
    if (res.themes[data.theme] === undefined && res.themes[data.theme] !== null) {
      res.themes[data.theme] = [];
    }

    res.themes[data.theme].push(data);
  } else if (data.pageType === 'index') {
    res.indexes.push(data);
  } else {
    res.pages.push(data);
  }

  return res;
};


const pageData = requireAllpages(pagesContext);
export const allPagesIndexData =
  Object.keys(pageData)
    .map((p) => ({
      path: p.substr(2),
      pageType: pageData[p].pageType,
      theme: pageData[p].theme
    }))
    .reduce(groupData, {
      indexes: [],
      pages: [],
      themes: {}
    });


export const pagesIndexData =
  allPagesIndexData.pages
    .sort(sortFoldersFirst)
    .sort(sortAlphabetical)
    .map(path2LinkList(process.env.BASE_URL.slice(0, -1)));


export const indexesIndexData =
  allPagesIndexData.indexes
    .sort(sortFoldersFirst)
    .sort(sortAlphabetical)
    .map(path2LinkList(process.env.BASE_URL.slice(0, -1)));


export const themedPagesIndexData =
  Object.keys(allPagesIndexData.themes)
    .reduce((res, key) => {
      res[key] =
        allPagesIndexData.themes[key]
          .sort(sortFoldersFirst)
          .sort(sortAlphabetical)
          .map(path2LinkList(process.env.BASE_URL.slice(0, -1)));

      return res;
    }, { });

export const templatesIndexData =
  Object.keys(requireAll(templatesContext, '/styleguide/templates/'))
    .filter((p) => p.indexOf('/templates/') !== -1)
    .map((p) => ({
      path: p.substr(p.indexOf('/templates/') + '/templates/'.length)
    }))
    .map(path2LinkList(`${process.env.BASE_URL}styleguide/templates`));

export const organismsIndexData =
  Object.keys(requireAll(organismsContext, '/styleguide/organisms/'))
    .filter((p) => p.indexOf('/organisms/') !== -1)
    .map((p) => ({
      path: p.substr(p.indexOf('/organisms/') + '/organisms/'.length)
    }))
    .map(path2LinkList(`${process.env.BASE_URL}styleguide/organisms`));


export const moleculesIndexData =
  Object.keys(requireAll(moleculesContext, '/styleguide/molecules/'))
    .filter((p) => p.indexOf('/molecules/') !== -1)
    .map((p) => ({
      path: p.substr(p.indexOf('/molecules/') + '/molecules/'.length)
    }))
    .map(path2LinkList(`${process.env.BASE_URL}styleguide/molecules`));


export const atomsIndexData =
  Object.keys(requireAll(atomsContext, '/styleguide/atoms/'))
    .map((p) => ({
      path: p.substr(p.indexOf('/atoms/') + '/atoms/'.length)
    }))
    .map(path2LinkList(`${process.env.BASE_URL}styleguide/atoms`));
