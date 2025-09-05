export function getFarewellText(language) {
  const options = [
    `Farewell, ${language}`,
    `Adios, ${language}`,
    `R.I.P., ${language}`,
    `We'll miss you, ${language}`,
    `Oh no, not ${language}!`,
    `${language} bites the dust`,
    `Gone but not forgotten, ${language}`,
    `The end of ${language} as we know it`,
    `Off into the sunset, ${language}`,
    `${language}, it's been real`,
    `${language}, your watch has ended`,
    `${language} has left the building`,
    `The ${language} language is resting`,
    `${language} is stone dead`,
    `This ${language} is not pinning for the fjords`,
    `The ${language} language is passed on`,
    `${language} is no more`,
    `${language} has ceased to be`,
    `${language} has expired`,
    `${language} has gone to meet its maker`,
    `${language}'s metabolic processes are now history`,
    `The ${language} language is off the twig`,
    `${language} has kicked the bucket`,
    `${language} has shuffled off its mortal coil`,
    `${language} has run down the curtain`,
    `${language} has joined the bleeding choir invisible`,
    `This ${language} language is an ex-language`
  ];

  const randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex];
}
