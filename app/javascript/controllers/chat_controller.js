import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
	static targets = ["name", "message", "output"]

	connect(){
		this.chatChannel = this.application.consumer.subscriptions.create({channel: "ChatChannel", room: "Smarties"}, {
			received(data) {
				this.renderMessage(data)
			}, 
			renderMessage(data){
				const messageList = document.getElementById("messages")
				const messageBox = document.createElement("div")
				messageBox.classList.add("text-xl")
				messageBox.classList.add("flex")
				const userMessage = document.createTextNode(`${this.getTimestamp()} -- ${data.sent_by} says: ${data.body}`)
				messageBox.append(userMessage)
				messageList.append(messageBox)
			},
			getTimestamp () {
				const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
				const d = new Date();

				return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
			}

		})
	}
	// https://stackoverflow.com/questions/5416920/timestamp-to-human-readable-format

	disconnect(){
		this.channel.unsubscribe()
	}


	send_message(){
		const message = this.messageTarget
		// don't send blank messages pls
		if(message.value === "") {
			return;
		}
		this.chatChannel.send({ sent_by: this.nameTarget.value, body: message.value })
		message.value = ""
	}
}
