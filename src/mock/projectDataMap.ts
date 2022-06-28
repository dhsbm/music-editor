// 项目假数据
const project1 =
  '{"id":1234,"title":"默认项目","describe":"","author":"","trackId":0,"trackMap":{},"patternId":0,"patternMap":{},"noteDataId":0,"noteDataMap":{},"envelopeId":0,"envelopeMap":{},"dotDataId":0,"dotDataMap":{}}'

const project2 =
  '{"id":4786,"title":"测试项目","describe":"","author":"","trackId":3,"trackMap":{"1":{"trackId":1,"color":"#DF71F6","name":"音轨1","volume":50,"source":1,"patternIdSet":[1],"envelopeIdSet":[],"envelopeIdList":[1]},"2":{"trackId":2,"color":"#FFC254","name":"音轨2","volume":50,"source":1,"patternIdSet":[],"envelopeIdSet":[1],"envelopeIdList":[]},"3":{"trackId":3,"color":"#A37AF5","name":"音轨3","volume":50,"source":1,"patternIdSet":[2,3],"envelopeIdSet":[],"envelopeIdList":[]}},"patternId":3,"patternMap":{"1":{"trackId":1,"patternId":1,"noteDataId":1,"start":4,"end":8,"offsetX":4,"volume":50},"2":{"trackId":3,"patternId":2,"noteDataId":2,"start":0,"end":2,"offsetX":0,"volume":50},"3":{"trackId":3,"patternId":3,"noteDataId":3,"start":4,"end":6,"offsetX":4,"volume":50}},"noteDataId":3,"noteDataMap":{"1":{"noteDataId":1,"patternIdSet":[1],"noteMap":{"59":[{"row":59,"start":1,"end":3,"volume":50}],"79":[{"row":79,"start":1.5,"end":2.5,"volume":50}]}},"2":{"noteDataId":2,"patternIdSet":[2],"noteMap":{}},"3":{"noteDataId":3,"patternIdSet":[3],"noteMap":{}}},"envelopeId":1,"envelopeMap":{"1":{"trackId":2,"envelopeId":1,"dotDataId":1,"actTrackId":1,"start":4,"end":8,"offsetX":4}},"dotDataId":1,"dotDataMap":{"1":{"dotDataId":1,"type":4,"category":1,"envelopeIdSet":[1],"dotList":[{"x":1.003907,"y":0.2},{"x":2,"y":1},{"x":2.996094,"y":0.2}]}}}'

const project3 =
  '{"id":5678,"title":"项目1","describe":"","author":"","trackId":3,"trackMap":{"1":{"trackId":1,"color":"#2283F6","name":"音轨1","volume":50,"source":1,"patternIdSet":[1],"envelopeIdSet":[],"envelopeIdList":[]},"2":{"trackId":2,"color":"#FFC254","name":"音轨2","volume":50,"source":1,"patternIdSet":[2],"envelopeIdSet":[],"envelopeIdList":[]},"3":{"trackId":3,"color":"#DF71F6","name":"音轨3","volume":50,"source":1,"patternIdSet":[3],"envelopeIdSet":[],"envelopeIdList":[]}},"patternId":3,"patternMap":{"1":{"trackId":1,"patternId":1,"noteDataId":1,"start":0,"end":4,"offsetX":0,"volume":50},"2":{"trackId":2,"patternId":2,"noteDataId":2,"start":0,"end":4,"offsetX":0,"volume":50},"3":{"trackId":3,"patternId":3,"noteDataId":3,"start":0,"end":4,"offsetX":0,"volume":50}},"noteDataId":3,"noteDataMap":{"1":{"noteDataId":1,"patternIdSet":[1],"noteMap":{"40":[{"row":40,"start":0,"end":0.125,"volume":50},{"row":40,"start":1.875,"end":2.125,"volume":50},{"row":40,"start":3.875,"end":4,"volume":50}],"41":[{"row":41,"start":0.125,"end":0.25,"volume":50},{"row":41,"start":1.75,"end":1.875,"volume":50},{"row":41,"start":2.125,"end":2.25,"volume":50},{"row":41,"start":3.75,"end":3.875,"volume":50}],"42":[{"row":42,"start":0.25,"end":0.375,"volume":50},{"row":42,"start":1.625,"end":1.75,"volume":50},{"row":42,"start":2.25,"end":2.375,"volume":50},{"row":42,"start":3.625,"end":3.75,"volume":50}],"43":[{"row":43,"start":0.375,"end":0.5,"volume":50},{"row":43,"start":1.5,"end":1.625,"volume":50},{"row":43,"start":2.375,"end":2.5,"volume":50},{"row":43,"start":3.5,"end":3.625,"volume":50}],"44":[{"row":44,"start":0.5,"end":0.625,"volume":50},{"row":44,"start":1.375,"end":1.5,"volume":50},{"row":44,"start":2.5,"end":2.625,"volume":50},{"row":44,"start":3.375,"end":3.5,"volume":50}],"45":[{"row":45,"start":0.625,"end":0.75,"volume":50},{"row":45,"start":1.25,"end":1.375,"volume":50},{"row":45,"start":2.625,"end":2.75,"volume":50},{"row":45,"start":3.25,"end":3.375,"volume":50}],"46":[{"row":46,"start":0.75,"end":0.875,"volume":50},{"row":46,"start":1.125,"end":1.25,"volume":50},{"row":46,"start":2.75,"end":2.875,"volume":50},{"row":46,"start":3.125,"end":3.25,"volume":50}],"47":[{"row":47,"start":0.875,"end":1.125,"volume":50},{"row":47,"start":2.875,"end":3.125,"volume":50}]}},"2":{"noteDataId":2,"patternIdSet":[2],"noteMap":{"60":[{"row":60,"start":1.5,"end":2.5,"volume":50},{"row":60,"start":0,"end":1,"volume":50},{"row":60,"start":3,"end":4,"volume":50}],"68":[{"row":68,"start":0.5,"end":1.5,"volume":50},{"row":68,"start":2.5,"end":3.5,"volume":50}],"78":[{"row":78,"start":1.5,"end":2.5,"volume":50},{"row":78,"start":3,"end":4,"volume":50},{"row":78,"start":0,"end":1,"volume":50}]}},"3":{"noteDataId":3,"patternIdSet":[3],"noteMap":{"86":[{"row":86,"start":0.75,"end":1,"volume":50},{"row":86,"start":1.75,"end":2,"volume":50},{"row":86,"start":2.75,"end":3,"volume":50},{"row":86,"start":3.75,"end":4,"volume":50}],"88":[{"row":88,"start":0.5,"end":0.75,"volume":50},{"row":88,"start":1.5,"end":1.75,"volume":50},{"row":88,"start":2.5,"end":2.75,"volume":50},{"row":88,"start":3.5,"end":3.75,"volume":50}],"90":[{"row":90,"start":0.25,"end":0.5,"volume":50},{"row":90,"start":1.25,"end":1.5,"volume":50},{"row":90,"start":2.25,"end":2.5,"volume":50},{"row":90,"start":3.25,"end":3.5,"volume":50}],"92":[{"row":92,"start":0,"end":0.25,"volume":50},{"row":92,"start":1,"end":1.25,"volume":50},{"row":92,"start":2,"end":2.25,"volume":50},{"row":92,"start":3,"end":3.25,"volume":50}]}}},"envelopeId":0,"envelopeMap":{},"dotDataId":0,"dotDataMap":{}}'

const project4 =
  '{"id":7823,"title":"项目2","describe":"","author":"","trackId":3,"trackMap":{"1":{"trackId":1,"color":"#A37AF5","name":"音轨1","volume":50,"source":1,"patternIdSet":[1],"envelopeIdSet":[],"envelopeIdList":[]},"2":{"trackId":2,"color":"#16BDDE","name":"音轨2","volume":50,"source":1,"patternIdSet":[2],"envelopeIdSet":[],"envelopeIdList":[]},"3":{"trackId":3,"color":"#F8E71D","name":"音轨3","volume":50,"source":1,"patternIdSet":[3],"envelopeIdSet":[],"envelopeIdList":[]}},"patternId":3,"patternMap":{"1":{"trackId":1,"patternId":1,"noteDataId":1,"start":0,"end":4,"offsetX":0,"volume":50},"2":{"trackId":2,"patternId":2,"noteDataId":2,"start":0,"end":4,"offsetX":0,"volume":50},"3":{"trackId":3,"patternId":3,"noteDataId":3,"start":0,"end":4,"offsetX":0,"volume":50}},"noteDataId":3,"noteDataMap":{"1":{"noteDataId":1,"patternIdSet":[1],"noteMap":{"60":[{"row":60,"start":1.5,"end":2.5,"volume":50},{"row":60,"start":0,"end":1,"volume":50},{"row":60,"start":3,"end":4,"volume":50}],"68":[{"row":68,"start":0.5,"end":1.5,"volume":50},{"row":68,"start":2.5,"end":3.5,"volume":50}],"78":[{"row":78,"start":1.5,"end":2.5,"volume":50},{"row":78,"start":3,"end":4,"volume":50},{"row":78,"start":0,"end":1,"volume":50}]}},"2":{"noteDataId":2,"patternIdSet":[2],"noteMap":{"40":[{"row":40,"start":0,"end":0.125,"volume":50},{"row":40,"start":1.875,"end":2.125,"volume":50},{"row":40,"start":3.875,"end":4,"volume":50}],"41":[{"row":41,"start":0.125,"end":0.25,"volume":50},{"row":41,"start":1.75,"end":1.875,"volume":50},{"row":41,"start":2.125,"end":2.25,"volume":50},{"row":41,"start":3.75,"end":3.875,"volume":50}],"42":[{"row":42,"start":0.25,"end":0.375,"volume":50},{"row":42,"start":1.625,"end":1.75,"volume":50},{"row":42,"start":2.25,"end":2.375,"volume":50},{"row":42,"start":3.625,"end":3.75,"volume":50}],"43":[{"row":43,"start":0.375,"end":0.5,"volume":50},{"row":43,"start":1.5,"end":1.625,"volume":50},{"row":43,"start":2.375,"end":2.5,"volume":50},{"row":43,"start":3.5,"end":3.625,"volume":50}],"44":[{"row":44,"start":0.5,"end":0.625,"volume":50},{"row":44,"start":1.375,"end":1.5,"volume":50},{"row":44,"start":2.5,"end":2.625,"volume":50},{"row":44,"start":3.375,"end":3.5,"volume":50}],"45":[{"row":45,"start":0.625,"end":0.75,"volume":50},{"row":45,"start":1.25,"end":1.375,"volume":50},{"row":45,"start":2.625,"end":2.75,"volume":50},{"row":45,"start":3.25,"end":3.375,"volume":50}],"46":[{"row":46,"start":0.75,"end":0.875,"volume":50},{"row":46,"start":1.125,"end":1.25,"volume":50},{"row":46,"start":2.75,"end":2.875,"volume":50},{"row":46,"start":3.125,"end":3.25,"volume":50}],"47":[{"row":47,"start":0.875,"end":1.125,"volume":50},{"row":47,"start":2.875,"end":3.125,"volume":50}]}},"3":{"noteDataId":3,"patternIdSet":[3],"noteMap":{"86":[{"row":86,"start":0.75,"end":1,"volume":50},{"row":86,"start":1.75,"end":2,"volume":50},{"row":86,"start":2.75,"end":3,"volume":50},{"row":86,"start":3.75,"end":4,"volume":50}],"88":[{"row":88,"start":0.5,"end":0.75,"volume":50},{"row":88,"start":1.5,"end":1.75,"volume":50},{"row":88,"start":2.5,"end":2.75,"volume":50},{"row":88,"start":3.5,"end":3.75,"volume":50}],"90":[{"row":90,"start":0.25,"end":0.5,"volume":50},{"row":90,"start":1.25,"end":1.5,"volume":50},{"row":90,"start":2.25,"end":2.5,"volume":50},{"row":90,"start":3.25,"end":3.5,"volume":50}],"92":[{"row":92,"start":0,"end":0.25,"volume":50},{"row":92,"start":1,"end":1.25,"volume":50},{"row":92,"start":2,"end":2.25,"volume":50},{"row":92,"start":3,"end":3.25,"volume":50}]}}},"envelopeId":0,"envelopeMap":{},"dotDataId":0,"dotDataMap":{}}'

const project5 =
  '{"id":7456,"title":"项目3","describe":"","author":"","trackId":3,"trackMap":{"1":{"trackId":1,"color":"#A37AF5","name":"音轨1","volume":50,"source":1,"patternIdSet":[1],"envelopeIdSet":[],"envelopeIdList":[]},"2":{"trackId":2,"color":"#16BDDE","name":"音轨2","volume":50,"source":1,"patternIdSet":[2],"envelopeIdSet":[],"envelopeIdList":[]},"3":{"trackId":3,"color":"#F8E71D","name":"音轨3","volume":50,"source":1,"patternIdSet":[3],"envelopeIdSet":[],"envelopeIdList":[]}},"patternId":3,"patternMap":{"1":{"trackId":1,"patternId":1,"noteDataId":1,"start":0,"end":4,"offsetX":0,"volume":50},"2":{"trackId":2,"patternId":2,"noteDataId":2,"start":0,"end":4,"offsetX":0,"volume":50},"3":{"trackId":3,"patternId":3,"noteDataId":3,"start":0,"end":4,"offsetX":0,"volume":50}},"noteDataId":3,"noteDataMap":{"1":{"noteDataId":1,"patternIdSet":[1],"noteMap":{"86":[{"row":86,"start":0.75,"end":1,"volume":50},{"row":86,"start":1.75,"end":2,"volume":50},{"row":86,"start":2.75,"end":3,"volume":50},{"row":86,"start":3.75,"end":4,"volume":50}],"88":[{"row":88,"start":0.5,"end":0.75,"volume":50},{"row":88,"start":1.5,"end":1.75,"volume":50},{"row":88,"start":2.5,"end":2.75,"volume":50},{"row":88,"start":3.5,"end":3.75,"volume":50}],"90":[{"row":90,"start":0.25,"end":0.5,"volume":50},{"row":90,"start":1.25,"end":1.5,"volume":50},{"row":90,"start":2.25,"end":2.5,"volume":50},{"row":90,"start":3.25,"end":3.5,"volume":50}],"92":[{"row":92,"start":0,"end":0.25,"volume":50},{"row":92,"start":1,"end":1.25,"volume":50},{"row":92,"start":2,"end":2.25,"volume":50},{"row":92,"start":3,"end":3.25,"volume":50}]}},"2":{"noteDataId":2,"patternIdSet":[2],"noteMap":{"58":[{"row":58,"start":1,"end":1.5,"volume":50},{"row":58,"start":0,"end":0.5,"volume":50},{"row":58,"start":2,"end":2.5,"volume":50},{"row":58,"start":3,"end":3.5,"volume":50}],"61":[{"row":61,"start":0.5,"end":1,"volume":50},{"row":61,"start":1.5,"end":2,"volume":50},{"row":61,"start":2.5,"end":3,"volume":50},{"row":61,"start":3.5,"end":4,"volume":50}]}},"3":{"noteDataId":3,"patternIdSet":[3],"noteMap":{"40":[{"row":40,"start":0,"end":0.125,"volume":50},{"row":40,"start":1.875,"end":2.125,"volume":50},{"row":40,"start":3.875,"end":4,"volume":50}],"41":[{"row":41,"start":0.125,"end":0.25,"volume":50},{"row":41,"start":1.75,"end":1.875,"volume":50},{"row":41,"start":2.125,"end":2.25,"volume":50},{"row":41,"start":3.75,"end":3.875,"volume":50}],"42":[{"row":42,"start":0.25,"end":0.375,"volume":50},{"row":42,"start":1.625,"end":1.75,"volume":50},{"row":42,"start":2.25,"end":2.375,"volume":50},{"row":42,"start":3.625,"end":3.75,"volume":50}],"43":[{"row":43,"start":0.375,"end":0.5,"volume":50},{"row":43,"start":1.5,"end":1.625,"volume":50},{"row":43,"start":2.375,"end":2.5,"volume":50},{"row":43,"start":3.5,"end":3.625,"volume":50}],"44":[{"row":44,"start":0.5,"end":0.625,"volume":50},{"row":44,"start":1.375,"end":1.5,"volume":50},{"row":44,"start":2.5,"end":2.625,"volume":50},{"row":44,"start":3.375,"end":3.5,"volume":50}],"45":[{"row":45,"start":0.625,"end":0.75,"volume":50},{"row":45,"start":1.25,"end":1.375,"volume":50},{"row":45,"start":2.625,"end":2.75,"volume":50},{"row":45,"start":3.25,"end":3.375,"volume":50}],"46":[{"row":46,"start":0.75,"end":0.875,"volume":50},{"row":46,"start":1.125,"end":1.25,"volume":50},{"row":46,"start":2.75,"end":2.875,"volume":50},{"row":46,"start":3.125,"end":3.25,"volume":50}],"47":[{"row":47,"start":0.875,"end":1.125,"volume":50},{"row":47,"start":2.875,"end":3.125,"volume":50}]}}},"envelopeId":0,"envelopeMap":{},"dotDataId":0,"dotDataMap":{}}'

const project6 =
  '{"id":7343,"title":"项目4","describe":"","author":"","trackId":3,"trackMap":{"1":{"trackId":1,"color":"#F5606E","name":"音轨1","volume":50,"source":1,"patternIdSet":[1],"envelopeIdSet":[],"envelopeIdList":[]},"2":{"trackId":2,"color":"#89EB28","name":"音轨2","volume":50,"source":1,"patternIdSet":[2],"envelopeIdSet":[],"envelopeIdList":[]},"3":{"trackId":3,"color":"#A37AF5","name":"音轨3","volume":50,"source":1,"patternIdSet":[3],"envelopeIdSet":[],"envelopeIdList":[]}},"patternId":3,"patternMap":{"1":{"trackId":1,"patternId":1,"noteDataId":1,"start":0,"end":4,"offsetX":0,"volume":50},"2":{"trackId":2,"patternId":2,"noteDataId":2,"start":0,"end":4,"offsetX":0,"volume":50},"3":{"trackId":3,"patternId":3,"noteDataId":3,"start":0,"end":4,"offsetX":0,"volume":50}},"noteDataId":3,"noteDataMap":{"1":{"noteDataId":1,"patternIdSet":[1],"noteMap":{"86":[{"row":86,"start":0.75,"end":1,"volume":50},{"row":86,"start":1.75,"end":2,"volume":50},{"row":86,"start":2.75,"end":3,"volume":50},{"row":86,"start":3.75,"end":4,"volume":50}],"88":[{"row":88,"start":0.5,"end":0.75,"volume":50},{"row":88,"start":1.5,"end":1.75,"volume":50},{"row":88,"start":2.5,"end":2.75,"volume":50},{"row":88,"start":3.5,"end":3.75,"volume":50}],"90":[{"row":90,"start":0.25,"end":0.5,"volume":50},{"row":90,"start":1.25,"end":1.5,"volume":50},{"row":90,"start":2.25,"end":2.5,"volume":50},{"row":90,"start":3.25,"end":3.5,"volume":50}],"92":[{"row":92,"start":0,"end":0.25,"volume":50},{"row":92,"start":1,"end":1.25,"volume":50},{"row":92,"start":2,"end":2.25,"volume":50},{"row":92,"start":3,"end":3.25,"volume":50}]}},"2":{"noteDataId":2,"patternIdSet":[2],"noteMap":{"40":[{"row":40,"start":0,"end":0.125,"volume":50},{"row":40,"start":1.875,"end":2.125,"volume":50},{"row":40,"start":3.875,"end":4,"volume":50}],"41":[{"row":41,"start":0.125,"end":0.25,"volume":50},{"row":41,"start":1.75,"end":1.875,"volume":50},{"row":41,"start":2.125,"end":2.25,"volume":50},{"row":41,"start":3.75,"end":3.875,"volume":50}],"42":[{"row":42,"start":0.25,"end":0.375,"volume":50},{"row":42,"start":1.625,"end":1.75,"volume":50},{"row":42,"start":2.25,"end":2.375,"volume":50},{"row":42,"start":3.625,"end":3.75,"volume":50}],"43":[{"row":43,"start":0.375,"end":0.5,"volume":50},{"row":43,"start":1.5,"end":1.625,"volume":50},{"row":43,"start":2.375,"end":2.5,"volume":50},{"row":43,"start":3.5,"end":3.625,"volume":50}],"44":[{"row":44,"start":0.5,"end":0.625,"volume":50},{"row":44,"start":1.375,"end":1.5,"volume":50},{"row":44,"start":2.5,"end":2.625,"volume":50},{"row":44,"start":3.375,"end":3.5,"volume":50}],"45":[{"row":45,"start":0.625,"end":0.75,"volume":50},{"row":45,"start":1.25,"end":1.375,"volume":50},{"row":45,"start":2.625,"end":2.75,"volume":50},{"row":45,"start":3.25,"end":3.375,"volume":50}],"46":[{"row":46,"start":0.75,"end":0.875,"volume":50},{"row":46,"start":1.125,"end":1.25,"volume":50},{"row":46,"start":2.75,"end":2.875,"volume":50},{"row":46,"start":3.125,"end":3.25,"volume":50}],"47":[{"row":47,"start":0.875,"end":1.125,"volume":50},{"row":47,"start":2.875,"end":3.125,"volume":50}]}},"3":{"noteDataId":3,"patternIdSet":[3],"noteMap":{"60":[{"row":60,"start":1.5,"end":2.5,"volume":50},{"row":60,"start":0,"end":1,"volume":50},{"row":60,"start":3,"end":4,"volume":50}],"68":[{"row":68,"start":0.5,"end":1.5,"volume":50},{"row":68,"start":2.5,"end":3.5,"volume":50}],"78":[{"row":78,"start":1.5,"end":2.5,"volume":50},{"row":78,"start":3,"end":4,"volume":50},{"row":78,"start":0,"end":1,"volume":50}]}}},"envelopeId":0,"envelopeMap":{},"dotDataId":0,"dotDataMap":{}}'

// 这个是4条
const project7 =
  '{"id":4509,"title":"全部项目","describe":"","author":"","trackId":4,"trackMap":{"1":{"trackId":1,"color":"#A37AF5","name":"音轨1","volume":50,"source":1,"patternIdSet":[1],"envelopeIdSet":[],"envelopeIdList":[]},"2":{"trackId":2,"color":"#16BDDE","name":"音轨2","volume":50,"source":1,"patternIdSet":[2],"envelopeIdSet":[],"envelopeIdList":[]},"3":{"trackId":3,"color":"#F8E71D","name":"音轨3","volume":50,"source":1,"patternIdSet":[3],"envelopeIdSet":[],"envelopeIdList":[]},"4":{"trackId":4,"color":"#FFC254","name":"音轨4","volume":50,"source":1,"patternIdSet":[4],"envelopeIdSet":[],"envelopeIdList":[]}},"patternId":4,"patternMap":{"1":{"trackId":1,"patternId":1,"noteDataId":1,"start":0,"end":4,"offsetX":0,"volume":50},"2":{"trackId":2,"patternId":2,"noteDataId":2,"start":0,"end":4,"offsetX":0,"volume":50},"3":{"trackId":3,"patternId":3,"noteDataId":3,"start":0,"end":4,"offsetX":0,"volume":50},"4":{"trackId":4,"patternId":4,"noteDataId":4,"start":0,"end":4,"offsetX":0,"volume":50}},"noteDataId":4,"noteDataMap":{"1":{"noteDataId":1,"patternIdSet":[1],"noteMap":{"61":[{"row":61,"start":0.5,"end":1,"volume":50},{"row":61,"start":1.5,"end":2,"volume":50},{"row":61,"start":2.5,"end":3,"volume":50},{"row":61,"start":3.5,"end":4,"volume":50}],"58":[{"row":58,"start":1,"end":1.5,"volume":50},{"row":58,"start":0,"end":0.5,"volume":50},{"row":58,"start":2,"end":2.5,"volume":50},{"row":58,"start":3,"end":3.5,"volume":50}]}},"2":{"noteDataId":2,"patternIdSet":[2],"noteMap":{"92":[{"row":92,"start":0,"end":0.25,"volume":50},{"row":92,"start":1,"end":1.25,"volume":50},{"row":92,"start":2,"end":2.25,"volume":50},{"row":92,"start":3,"end":3.25,"volume":50}],"90":[{"row":90,"start":0.25,"end":0.5,"volume":50},{"row":90,"start":1.25,"end":1.5,"volume":50},{"row":90,"start":2.25,"end":2.5,"volume":50},{"row":90,"start":3.25,"end":3.5,"volume":50}],"88":[{"row":88,"start":0.5,"end":0.75,"volume":50},{"row":88,"start":1.5,"end":1.75,"volume":50},{"row":88,"start":2.5,"end":2.75,"volume":50},{"row":88,"start":3.5,"end":3.75,"volume":50}],"86":[{"row":86,"start":0.75,"end":1,"volume":50},{"row":86,"start":1.75,"end":2,"volume":50},{"row":86,"start":2.75,"end":3,"volume":50},{"row":86,"start":3.75,"end":4,"volume":50}]}},"3":{"noteDataId":3,"patternIdSet":[3],"noteMap":{"40":[{"row":40,"start":0,"end":0.125,"volume":50},{"row":40,"start":1.875,"end":2.125,"volume":50},{"row":40,"start":3.875,"end":4,"volume":50}],"41":[{"row":41,"start":0.125,"end":0.25,"volume":50},{"row":41,"start":1.75,"end":1.875,"volume":50},{"row":41,"start":2.125,"end":2.25,"volume":50},{"row":41,"start":3.75,"end":3.875,"volume":50}],"42":[{"row":42,"start":0.25,"end":0.375,"volume":50},{"row":42,"start":1.625,"end":1.75,"volume":50},{"row":42,"start":2.25,"end":2.375,"volume":50},{"row":42,"start":3.625,"end":3.75,"volume":50}],"43":[{"row":43,"start":0.375,"end":0.5,"volume":50},{"row":43,"start":1.5,"end":1.625,"volume":50},{"row":43,"start":2.375,"end":2.5,"volume":50},{"row":43,"start":3.5,"end":3.625,"volume":50}],"44":[{"row":44,"start":0.5,"end":0.625,"volume":50},{"row":44,"start":1.375,"end":1.5,"volume":50},{"row":44,"start":2.5,"end":2.625,"volume":50},{"row":44,"start":3.375,"end":3.5,"volume":50}],"45":[{"row":45,"start":0.625,"end":0.75,"volume":50},{"row":45,"start":1.25,"end":1.375,"volume":50},{"row":45,"start":2.625,"end":2.75,"volume":50},{"row":45,"start":3.25,"end":3.375,"volume":50}],"46":[{"row":46,"start":0.75,"end":0.875,"volume":50},{"row":46,"start":1.125,"end":1.25,"volume":50},{"row":46,"start":2.75,"end":2.875,"volume":50},{"row":46,"start":3.125,"end":3.25,"volume":50}],"47":[{"row":47,"start":0.875,"end":1.125,"volume":50},{"row":47,"start":2.875,"end":3.125,"volume":50}]}},"4":{"noteDataId":4,"patternIdSet":[4],"noteMap":{"68":[{"row":68,"start":0.5,"end":1.5,"volume":50},{"row":68,"start":2.5,"end":3.5,"volume":50}],"78":[{"row":78,"start":1.5,"end":2.5,"volume":50},{"row":78,"start":3,"end":4,"volume":50},{"row":78,"start":0,"end":1,"volume":50}],"60":[{"row":60,"start":1.5,"end":2.5,"volume":50},{"row":60,"start":0,"end":1,"volume":50},{"row":60,"start":3,"end":4,"volume":50}]}}},"envelopeId":0,"envelopeMap":{},"dotDataId":0,"dotDataMap":{}}'

const projectDataMap: Map<number, string> = new Map()

projectDataMap.set(1234, project1)
projectDataMap.set(4786, project2)
projectDataMap.set(5678, project3)
projectDataMap.set(7823, project4)
projectDataMap.set(7456, project5)
projectDataMap.set(7343, project6)
projectDataMap.set(4509, project7)

export default projectDataMap
