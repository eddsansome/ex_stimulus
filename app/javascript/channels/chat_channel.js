import consumer from "channels/consumer"

export const sub = consumer.subscriptions.create({channel: "ChatChannel", room: "Smarties"}, {
  connected() {
  },

  disconnected() {
  },

  received(data) {
  }

});
