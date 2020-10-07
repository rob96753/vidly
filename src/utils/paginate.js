import lodash from "lodash";

const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return lodash(items).slice(startIndex).take(pageSize).value();
};

export default paginate;
