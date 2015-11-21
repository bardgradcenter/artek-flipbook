function positionDots () {
	var dotsULWidth = $('.theDots ul').width();
	var dotWidth = $('.theDots li.active').width();
	var dotWidthPercent = (dotWidth/dotsULWidth)*100;
	var dotsAfter = ($('.theDots li.active').nextAll('li').length) * 2;
	var dotsPrev = $('.theDots li.active').prevAll('li').length;
	var dotsAfterSpacing = 100/dotsAfter;
	var dotsPrevSpacing = 50/dotsPrev;
	$('.theDots li.active').animate({
			left: '50%',
	}, 1000);
	var $a = 2;
	var $p = 1;
	$('.theDots li.active').prevAll('li').each(function(){
		var thisSpacing = 50-(dotsPrevSpacing * $p);
		$(this).animate({
			left: thisSpacing + '%',
		}, 1000);
		$p++;
	});
	$('.theDots li.active').nextAll('li').each(function(){
		var thisSpacing = dotsAfterSpacing * $a + 50 - dotWidthPercent;
		$(this).animate({
			left: thisSpacing + '%',
		}, 1000);
		$a++;
	});
}
$(function(){
	$('ul.imageGallery li:first-of-type').addClass('active');
	$('.theDots li:first-of-type').addClass('active');
	
	$('.gallery_controls .prev').click(function(){
		var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
		if($('ul.imageGallery li.active').prev('li').length){
			$('ul.imageGallery').animate({
				left: '-=' + imageWidth
			}, 300, function(){
				$('ul.imageGallery li.active').removeClass('active').prev('li').addClass('active');
				var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
				$('.theDots li.active').removeClass('active');
				$(theDot).addClass('active');
				positionDots();
			});
		}
	});
	$('.gallery_controls .next').click(function(){
		var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
		if($('ul.imageGallery li.active').next('li').length){
			$('ul.imageGallery').animate({
				left: '+=' + imageWidth
			}, 300, function(){
				$('ul.imageGallery li.active').removeClass('active').next('li').addClass('active');
				var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
				$('.theDots li.active').removeClass('active');
				$(theDot).addClass('active');
				positionDots();
			});
		}
	});

	$('.theDots li').click(function(){
		var index = $(this).index();
		var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
		var scrollTo = 	imageWidth * index;
		var theDot = '#' + $(this).attr('id');
		$('.theDots li.active').removeClass('active');
		$(this).addClass('active');
		$('ul.imageGallery').animate({
			left: scrollTo
		}, 300, function(){
			$('ul.imageGallery li.active').removeClass('active');
			$('ul.imageGallery').find(theDot).addClass('active');
		});
		positionDots();
	});
	positionDots();
});