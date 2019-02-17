const { asciiToTrytes } = require('@iota/converter');
const seedGenerater = require('iota-generate-seed');
const Mam = require('@iota/mam');

const provider = 'https://node0.capjupiter.com:14267';
const index = 0;

const publish = async (packet) => {
  // Initialise MAM State
  const seed = seedGenerater();
  const mamState = await Mam.init(provider, seed);
  mamState.channel.start = index;

  // Create MAM Payload - STRING OF TRYTES
  const trytes = asciiToTrytes(JSON.stringify(packet));
  const message = await Mam.create(mamState, trytes);

  // Attach message to the MAM channel
  await Mam.attach(message.payload, message.address);

  return [seed, message.root];
};

const messageContent = { message: 'JWISHUNGRY' };

publish(messageContent)
  .then(MAMObject => console.log(`Seed : ${MAMObject[0]}\nMAM Root : ${MAMObject[1]}`));
