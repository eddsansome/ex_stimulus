import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
	static targets = ["message", "output"]
	incoming_messages = []

	connect(){
		// on initial load we should connect to application cable
	}

	send_message(){
		const message = this.messageTarget
		// don't send blank messages pls
		if(message.value === "") {
			return;
		}
		console.log(message.value)
		message.value = ""
	}
}
