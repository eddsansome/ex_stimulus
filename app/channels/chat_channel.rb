class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_Smarties"
  end

  def receive(data)
    ActionCable.server.broadcast("chat_Smarties", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
