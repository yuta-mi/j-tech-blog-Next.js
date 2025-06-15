const qiitaQuery = {
  user: "miu-Y",
};

const qiitaQueryString = () => {
  return Object.entries(qiitaQuery)
  .map(([k, v]) => `${k}:${v}`)
  .join('+');
}

const getQiitaOptions = ({page = 1, per_page = 9}: {page?: number, per_page?: number}) => {
  return {
    page: page.toString(),
    per_page: per_page.toString(),
    query: qiitaQueryString(),
  }
}

export default getQiitaOptions;
