function glow(that){
	$(that).fadeOut(1000, function(){
		$(that).fadeIn(1000, function(){
			glow(that);
		});
	});
}

$(function(){
	$('ul.imageGallery li:first-of-type').addClass('active');
	$('.theDots li:first-of-type').addClass('active');
	
	$('.gallery_controls .prev').click(function(){
		// var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
		if($('ul.imageGallery li.active').prev('li').length){
			$('ul.imageGallery').animate({
				// left: '-=' + imageWidth
			}, 300, function(){
				$('ul.imageGallery li.active').removeClass('active').prev('li').addClass('active');
				var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
				$('.theDots li.active').removeClass('active');
				$(theDot).addClass('active');
			});
		} else {
			$('ul.imageGallery').animate({
				// left: '-=' + imageWidth
			}, 300, function(){
				$('ul.imageGallery li.active').removeClass('active');
				$('ul.imageGallery li:last-of-type').addClass('active');
				var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
				$('.theDots li.active').removeClass('active');
				$(theDot).addClass('active');
			});
		}
	});
	$('.gallery_controls .next').click(function(){
		// var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
		if($('ul.imageGallery li.active').next('li').length){
			$('ul.imageGallery').animate({
				// left: '+=' + imageWidth
			}, 300, function(){
				$('ul.imageGallery li.active').removeClass('active').next('li').addClass('active');
				var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
				$('.theDots li.active').removeClass('active');
				$(theDot).addClass('active');
			});
		} else {
			$('ul.imageGallery').animate({
				// left: '-=' + imageWidth
			}, 300, function(){
				$('ul.imageGallery li.active').removeClass('active');
				$('ul.imageGallery li:first-of-type').addClass('active');
				var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
				$('.theDots li.active').removeClass('active');
				$(theDot).addClass('active');
			});
		}
	});

	$('.theDots li').click(function(){
		// var index = $(this).index();
		// var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
		// var scrollTo = 	imageWidth * index;
		var theDot = '#' + $(this).attr('id');
		$('.theDots li.active').removeClass('active');
		$(this).addClass('active');
		$('ul.imageGallery').animate({
			// left: scrollTo
		}, 300, function(){
			$('ul.imageGallery li.active').removeClass('active');
			$('ul.imageGallery').find(theDot).addClass('active');
		});
	});

	$('.hotspot').each(function(){
		glow(this);
	});
	$('.hotspot').click(function(){
		$(this).next('.overlay').fadeIn(300);
	});
	$('.close').click(function(){
		$(this).parent().parent().fadeOut(300);
	});
});