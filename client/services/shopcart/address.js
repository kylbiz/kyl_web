Template.shopcart.events({
	"click button.btn-add": function () {
		$("#addressError").hide();
		$("#addTpl").modal({
			onHide: function () {
				$('input,textarea').val("");
			},
			onDeny: function () {},
			onApprove: function () {
				var address = $('#address').val() || "";
				var receiver = $('#receiver').val() || "";
				var phone = $('#phone').val() || "";
				var tel = $('#tel').val() || "";
				var zipcode = $('#zipcode').val() || "";
				if (address && receiver && (phone || tel) && (phone.length === 11 || tel.length === 11)) {
					var addressOptions = {
						address: address,
						receiver: receiver,
						phone: phone,
						tel: tel,
						zipcode: zipcode
					};

					Meteor.call('userAddressAdd', addressOptions);
				} else {
					console.log("信息不完整,添加用户信息失败!");
				}

			}
		}).modal('show');
	},
	
	
	"click a.update": function (event) {
		if ($("#updateTpl").html() !== "")
			return false;
		var object = event.currentTarget;
		var tr = $(object).closest("tr");
		var address = tr.find(".dr1").first().text().trim();
		var zipcode = tr.find(".zipcode").first().text().trim().trim();
		var addressId = tr.find(".addressId").first().text().trim();
		var receiver = tr.find(".dname").first().text().trim();
		var phone = tr.find(".phone").first().text().trim();
		var tel = tr.find(".tel").first().text().trim();
		var data = {
			addressIdL: addressId,
			addressL: address,
			receiverL: receiver,
			phoneL: phone,
			zipcodeL: zipcode
		}

		var view = Blaze.toHTMLWithData(Template.addressChangeTpl, data);
		$("#updateTpl").html(view);
	},
	
	"click .btn-cancel": function () {
		$("#updateTpl").empty();
	}
});


Template.addressItem.rendered = function () {
	$(".ui.dropdown").dropdown();
	$(".addressInfo").click(function (e) {
		$("#addressError").hide();
		var checkbox = $(this).find("input").first();
		var checklist = $("#addressTable").find("input");
		var smart = checkbox.prop("checked");
		if (!smart) {
			checklist.prop('checked', false);
			checkbox.prop("checked", true);
			e.stopPropagation();
		};
		var addressId = $(this).find(".addressId").html();
		Session.set('addressId', addressId)
		
	});
}




Template.shopcart.events({
	"click .save": function (event) {
		var addressIdL = $('#addressIdL').html().trim() || "";
		var addressL = $('#addressL').val().trim() || "";
		var zipcodeL = $('#zipcodeL').val().trim() || "";
		var receiverL = $('#receiverL').val().trim() || "";
		var phoneL = $('#phoneL').val().trim() || "";
		var telL = $('#telL').val().trim() || "";
		if (addressIdL && addressL && receiverL && (phoneL || telL)) {
			var addressOptions = {
				addressId: addressIdL,
				address: addressL,
				receiver: receiverL,
				zipcode: zipcodeL,
				phone: phoneL,
				tel: telL
			};

			Meteor.call('updateUserAddress', addressOptions);
			$("#updateTpl").empty();
		}
	}
});



	function setFirstAddress() {
		var addressHtm = $('tr').first().find('td').first().find('input');
		if (addressHtm.attr('name') === 'addressName') {
			var addressId = $('tr').first().find('td').find('.addressId').html();
			$('tr').first().find('td').first().find('input').prop('checked', true);
			Session.set('addressId', addressId);
		} else {
			setTimeout(setFirstAddress, 100);
		}
	}

Template.addressInformation.rendered = function() {
	setFirstAddress();
}



Template.addressItem.events({
	"click .delete": function(event, template) {
		var parentObj = $(event.currentTarget).closest(".glist");
		var addressId = parentObj.find(".addressId").first().html();
		if(Meteor.userId() && addressId) {
			Meteor.call("deleteAddress", addressId, function(err) {
				setFirstAddress();
			});
		}
	}
})
