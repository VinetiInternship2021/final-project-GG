class ActiveDriversChannel < ApplicationCable::Channel
  def subscribed
    stream_from "active_drivers"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
