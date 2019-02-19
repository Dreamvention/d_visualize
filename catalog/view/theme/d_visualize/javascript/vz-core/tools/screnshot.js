function takeScreenShot(opts, resolution) {
	if (typeof html2canvas == 'function') {
		html2canvas(document.body,opts).then(canvas => {
			//debug
			// $('body').append(canvas)
			var imgData = canvas.toDataURL('image/png');
			$.ajax({
				url: 'index.php?route=extension/d_visualize/event/saveScrenshot',
				type: 'post',
				dataType: 'text',
				data: {
					base64data: imgData,
					type: resolution
				}
			}).success(function (json) {
				console.log('success save screnshot at ')
			}).fail(function () {
			}).done(function () {
			})
		})

	}
}

$(document).ready(function () {
    setTimeout(function () {
        takeScreenShot({}, 'desktop');
    }, 100)
    setTimeout(function () {
        takeScreenShot({'logging': false, width: 350, windowWidth: 350, windowHeight: 605}, 'mobile');
    }, 200)
})
