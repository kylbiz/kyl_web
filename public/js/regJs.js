Template.RegistrationHandle.onRendered(function(){
	for (var i = RegistrationLists.length - 1; i >= 0; i--) {
	var $x1 = RegistrationLists[i];
	var $label = $x1.label,
		$payment = 0,
		$message = '',
		$regions = '';
	var $labelLi = document.createElement('li');
	var $serviceList = document.createElement('ul');

	$labelLi.innerHTML = $label;
	$("#typeSelector").append($labelLi);

	for (var j = RegistrationLists[i].services.length - 1; j >= 0; j--) {
		var $zoneInfo = document.createElement('li');
		$message = {
			{
				RegistrationLists
			}
		}[i].services[j].message;
		$payment = RegistrationLists[i].services[j].payment;
		$regions = RegistrationLists[i].services[j].zone;
		$zoneInfo.innerHTML = $regions;
		$zoneInfo.setAttribute('message', $message);
		$zoneInfo.setAttribute('payment', $payment);
		$serviceList.appendChild($zoneInfo);
	}

	// $("#typeSelector").append($labelLi);
	// console.log($regions);
	$('#zoneSelect').append($serviceList);
}



$('#zoneSelect ul').hide();
$("#typeSelector li").click(function() {

	$(this).addClass("active");
	$(this).siblings().removeClass("active");
	$('#zoneSelect').children().removeClass('active');
	$("#moneyAmount").text('');
	$('.oput .value').text('');

	$("#typeSelector li").each(function(index) {
		if ($(this).hasClass("active")) {
			console.log(index);
			$('#zoneSelect ul').hide().eq(index).show();
		}
	});
});

$("#zoneSelect li").click(function() {
	$(this).addClass("active");
	$(this).siblings().removeClass("active");
	$("#moneyAmount").text($(this).attr('payment'));
	$('.oput .value').text($(this).attr('message'));

});
})
