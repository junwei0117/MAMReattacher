const { trytesToAscii } = require('@iota/converter');
const Mam = require('./mam.client.js/lib/mam.client.js');

const mode = 'public';
const provider = 'https://node0.capjupiter.com:14267';

const MAMroot = process.argv[2];

const fetch = async (packet) => {
  // Initialise MAM State
  await Mam.init(provider);

  // Fetch message on the MAM channel
  const result = await Mam.fetch(packet, mode);

  // Conver Trytes to String
  const message = trytesToAscii(result.messages[0]);

  return [packet, message];
};

fetch(MAMroot)
  .then(message => console.log(`MAM Root : ${message[0]}\nDecoded Message : ${message[1]}`));
