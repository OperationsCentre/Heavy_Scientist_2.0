module.exports = {
  sendMessage: async function (client, channelId, message) {
    const channel = client.channels.cache.get(channelId);
    return await channel.send(message);
  },
  deleteMessage: async function (client, channelId, messageId) {
    const channel = client.channels.cache.get(channelId);
    channel.messages.delete(messageId);
  },
  dmUser: async function (client, userId, message) {
    const user = await client.users.fetch(userId);
    user.send(message);
  },
};
