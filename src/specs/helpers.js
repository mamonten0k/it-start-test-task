export const getXAxisData = (data, attr) => {
  const res = {};

  for (const el of data) {
    res[el[attr]] = '';
  }

  return Object.keys(res);
};

export const getDistinctAttributeValues = (data, attr) => {
  const res = {};

  for (const el of data) {
    res[el[attr]] = '';
  }

  return Object.keys(res);
};

export const getValuesByAttribute = (data, attr, attrVal) => {
  return data.reduce(
    (res, cur) => (cur[attr] === attrVal ? [...res, cur.value] : res),
    []
  );
};

export const getSeries = (data, attr, bars) => {
  const res = {};

  for (let bar of bars) {
    res[bar] = getValuesByAttribute(data, attr, bar);
  }

  return res;
};

/**
 * Мне надоело и я не буду делать супер универсальные методы
 */
export const tooltipFormatter = (params) => {
  const axisName = params[0].axisValue;
  const sumAll = params.reduce((sum, { value }) => value + sum, 0);

  const first = params.filter(
    (param) =>
      param.seriesName === 'В программе ЦП' || param.seriesName === 'В программе ИТ'
  );

  const second = params.filter(
    (param) =>
      param.seriesName === 'Вне программ ЦП' || param.seriesName === 'Вне программ ИТ'
  );

  return `<div style=\'font-size:14px;display:flex;flex-direction:column;row-gap:8px;color:black;\'>
            <span style=\'font-weight:900;\'>${axisName}</span>
            ${getSectionMarkup(first, 'В программе', sumAll)}
            ${getSectionMarkup(second, 'Вне программ', sumAll)}
          </div>`;
};

const getSectionMarkup = (params, title, sumAll) => {
  const sum = params.reduce((sum, { value }) => value + sum, 0);
  return `<span style=\'display:flex;flex-direction:column;column-gap:16px\'>
            <span style=\'font-weight:bold;display:flex;justify-content:space-between;align-items:center;column-gap:16px\'>
              <span>${title}</span>
              <span>${Math.round((sum / sumAll) * 100)}% | ${sum} шт.</span>
            </span>
            <span style=\'margin-top:2px\'>
              ${params.reduce((res, param) => getLabelMarkup(param) + res, '')}
            </span>
          </span>`;
};

const getLabelMarkup = (label) => {
  return label
    ? `<span style=\'display:flex;justify-content:space-between;align-items:center\'>
        <span style=\'display:flex;justify-content:space-between;align-items:center;column-gap:4px\'>
          ${label.marker}
          Проекты ИТ
        </span>
        <span style=\'font-weight:bold;\'>
          ${label.value} шт.
        </span>
      </span>`
    : '';
};
