export async function reportMeshChannel({ client, message }) {
  const channel = client.channels.cache.get("1108628275749720095");
  if (channel) {
    channel.send(message);
  }
}
