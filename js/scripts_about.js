var contact_cache;


function contact_validate () {

	if ($("#contact-form").parsley().validate() == false) {

		return false;

	}

	else if ($("#contact-form").parsley().validate() == true) {

		contact_cache.addClass("disabled");
		contact_cache.inputs.prop("disabled", true);

		contact_send();

	};

};



function contact_send () {

	$.ajax({

		type: "POST",
		url: "https://mandrillapp.com/api/1.0/messages/send.js",
		data: {
			"key": "rESch3-B5EW7d5-EpgodaQ",
			"message": {
				"from_email": contact_cache.email.val(),
				"from_name": contact_cache.name.val(),
				"to": [{"email": "enicarswiss@gmail.com"}, {"email": "1931368316@qq.com"}],
				"autotext": "true",
				"subject": "Message from " + contact_cache.name.val() + " (" + contact_cache.email.val() + ") via Enicar.com Contact Form",
				"html": contact_cache.message.val()
			}
		}, error: function() {

			alert(contact_error_message);

			contact_cache.removeClass("disabled");
			contact_cache.inputs.prop("disabled", false);

			return false;

		}, success: function() {

			alert(contact_success_messsage);

			contact_cache.removeClass("disabled");
			contact_cache.inputs.prop("disabled", false);
			contact_cache.fields.val("");
		}

	});

};



$(document).ready(function() {

	contact_cache = $("#contact");
	contact_cache.inputs = contact_cache.find("input, textarea");
	contact_cache.fields = contact_cache.find(".contact-field");
	contact_cache.name = $("#contact").find("#contact-name");
	contact_cache.email = $("#contact").find("#contact-email");
	contact_cache.message = $("#contact").find("#contact-message");

	$("#contact-form").parsley();

	$("#contact-submit").bind("click", function(event) {

		event.preventDefault();
		contact_validate();

	});

});