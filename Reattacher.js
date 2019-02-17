const { composeAPI } = require('@iota/core');

const iota = composeAPI({ provider: 'https://node0.capjupiter.com:14267' });

const MAMroot = process.argv[2];

const getMAMLatestBundleHash = async (root) => {
  let addressTransactions = await iota.findTransactionObjects({ addresses: [root] });
  addressTransactions = addressTransactions.sort((a, b) => (a.attachmentTimestamp < b.attachmentTimestamp ? 1 : -1));
  return addressTransactions[0].bundle;
};

const getTransactionTailHash = async (bunldeHash) => {
  const bundleObject = await iota.findTransactionObjects({ bundles: [bunldeHash] });
  const tailHash = [];
  for (let index = 0; index < bundleObject.length; index += 1) {
    if (bundleObject[index].currentIndex === 0) {
      tailHash.push(bundleObject[index].hash);
    }
  }
  return tailHash;
};

const checkReattachable = async (tailHash) => {
  let reattachable = null;
  const status = await iota.getLatestInclusion(tailHash);
  if (status.indexOf(true) === -1) {
    reattachable = true;
  } else {
    reattachable = false;
  }
  return [reattachable, tailHash];
};

const reattach = async (tailHash) => {
  let result = null;
  const reattachable = checkReattachable(tailHash);
  if (reattachable) {
    result = await iota.replayBundle(tailHash[0], 3, 14);
  } else {
    result = 'Already be confirmed.';
  }
  return result;
};

getMAMLatestBundleHash(MAMroot)
  .then(bunldeHash => getTransactionTailHash(bunldeHash))
  .then(tailHash => reattach(tailHash))
  .then(result => console.log(result))
  .catch(err => console.log(err));
