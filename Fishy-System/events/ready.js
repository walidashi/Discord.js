module.exports = async (client) => {
  console.log(`Logged in as ${client.user.username}`);
  await client.user.setActivity("-help", {
    type: "WATCHING",//can be LISTENING, WATCHING, PLAYING, STREAMING
  });
};
