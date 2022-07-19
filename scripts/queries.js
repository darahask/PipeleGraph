const axios = require("axios").default;

let URL = "https://api.thegraph.com/subgraphs/name/darahask/pipe";

let getIdofFileQuery = (cid) => `{
    pipeleEntities(
      where: {cid: "${cid}"}
    ) {
      id,
      owner
    }
  }`;

let getSharedofOwnerQuery = (owner) => `{
    pipeleEntities(where: {owner: "${owner}"}) {
      shared,
      id
      cid,
    }
  }`;

let getAccessibleFiles = (
  addr
) => `{pipeleEntities(where: {shared_contains: ["${addr}"]}) {
  id,
  cid,
  owner
}}`;

let getData = async (func, val) => {
  let query = func(val);
  let res = await axios.post(URL, { query });
  console.log(res.data.data);
};

/* uncomment to test */

// getData(
//   getSharedofOwnerQuery,
//   "0xdd372842cb80c1892243d20ee4ad0979c293cad5"
// ).catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// getData(
//   getIdofFileQuery,
//   "bafybeibhirdk3junquvmanfrfknedqqx5uwkdbmuo24fssxpuviicjpm4u"
// ).catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

getData(
  getAccessibleFiles,
  "0xdd372842cb80c1892243d20ee4ad0979c293cad5"
).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});