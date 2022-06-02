const state = {
  code: '',
  name: '',
  companyHE: {},
  overview: {
    companyInfo: {},
    regular: [],
    irregular: [],
    viewpoints: [],
    list: [],
    rankings: {},
    notice: [],
    classifyTaking: {},
    type: 0
  },
  finance: {
    type: 0,
    summaryList: [],
    taking: {},
    jdjlr: {},
    profit: {},
    cost: {},
    fuzai: {},
    lilv: {},
    top5: {},
    gykh: {},
    showkh: false,
    showGy: false,
    cash: {},
    free_cash: {},
    finanData: {},
    yyq: {}
  },
  industryData: {
    industry: {},
    type: 0,
    pettm: {},
    price: {},
    industryIndex: {}
  },
  gudongData: {
    type: 0,
    gudong: {},
    gdhs: [],
    jgNum: [],
    jgInfo: []
  },
  otherData: {
    type: 0,
    zi_comp: {},
    yyq: {},
    zdht: [],
    important: [],
    bond: []
  }
};

export default state;
