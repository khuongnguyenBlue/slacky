export default () => {
  const dbHost = process.env.DB_HOST || 'database';
  const dbPort = parseInt(process.env.DB_PORT, 10) || 5432;
  const dbName = process.env.DB_NAME;
  const dbUsername = process.env.DB_USER;
  const dbPassword = encodeSpecialChars(process.env.DB_PASSWORD);
  const connectionString = `mysql://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    db: {
      url: connectionString,
    },
  };
};

function encodeSpecialChars(inputString) {
  const specialChars = [
    ':',
    '/',
    '?',
    '#',
    '[',
    ']',
    '@',
    '!',
    '$',
    '&',
    "'",
    '(',
    ')',
    '*',
    '+',
    ',',
    ';',
    '=',
    '%',
  ];

  let encodedString = '';
  for (let i = 0; i < inputString.length; i++) {
    if (specialChars.includes(inputString[i])) {
      const charCode = inputString.charCodeAt(i).toString(16);
      encodedString += `%${charCode}`;
    } else {
      encodedString += inputString[i];
    }
  }
  return encodedString;
}
