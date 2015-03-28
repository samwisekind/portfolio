var contact_cache;


function contact_validate () {

	if (contact_cache.parsley().validate() == false) {

		return false;

	}

	else if (contact_cache.parsley().validate() == true) {

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
				"to": [{"email": "sam@flamov.com"}],
				"autotext": "true",
				"subject": "Message from " + contact_cache.name.val() + " (" + contact_cache.email.val() + ") via Flamov.com Contact Form",
				"html": contact_cache.message.val()
			}
		}, error: function() {

			alert("error sending email");

			contact_cache.removeClass("disabled");
			contact_cache.inputs.prop("disabled", false);

			return false;

		}, success: function() {

			alert("email sent");

			contact_cache.removeClass("disabled");
			contact_cache.inputs.prop("disabled", false);
			contact_cache.fields.val("");
		}

	});

};



$(document).ready(function() {

	contact_cache = $("#contact-form");

	contact_cache.inputs = contact_cache.find("input, textarea");
	contact_cache.fields = contact_cache.find(".contact-field");

	contact_cache.name = contact_cache.find("#contact-name");
	contact_cache.email = contact_cache.find("#contact-email");
	contact_cache.message = contact_cache.find("#contact-message");

	contact_cache.parsley();

	$("#contact-submit").bind("click", function(event) {

		event.preventDefault();
		contact_validate();

	});

	$("#contact-reset").bind("click", function(event) {

		contact_cache.parsley().reset();

	});

});