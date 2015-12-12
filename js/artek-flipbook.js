function glow(that){
	$(that).fadeOut(1000, function(){
		$(that).fadeIn(1000, function(){
			glow(that);
		});
	});
}

function slide_forward(that, target, zindex){
	var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
	if($(that).is(target)){
		var the_active = $('ul.imageGallery li.active');
		setTimeout(function(){
			$(the_active).removeClass('active');
		}, 650);
		$(target).addClass('active').removeClass('target');
	} else {
		setTimeout(function(){
			$(that).css('z-index',zindex).show().animate({
				left: '+=' + imageWidth
			}, 600, function(){
				$(that).css('display','').css('z-index','');
			});
			var new_zindex = zindex-100;
			var next = $(that).next('li');
			slide_forward(next, target, new_zindex);
		},50);
	}
}
function slide_backward(that, target, zindex){
	var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
	if($(that).is(target)){
		var the_active = $('ul.imageGallery li.active');
		setTimeout(function(){
			$(that).css('z-index',zindex).show().animate({
				left: '-=' + imageWidth
			}, 600, function(){
				$(that).css('display','').css('z-index','');
			});
		}, 50);
		setTimeout(function(){
			$(the_active).removeClass('active').css('display','');
		}, 650);
		$(target).addClass('active').removeClass('target');
	} else {
		setTimeout(function(){
			$(that).css('z-index',zindex).show().animate({
				left: '-=' + imageWidth
			}, 600, function(){
				$(that).css('display','').css('z-index','');
			});
			var new_zindex = zindex+100;
			var next = $(that).prev('li');
			slide_backward(next, target, new_zindex);
		}, 50);
	}
}

$( window ).load(function() {
  var maxHeight = -1;

	$('ul.imageGallery li').each(function() {
	 maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
	});

	$('ul.imageGallery').each(function() {
	 $(this).height(maxHeight);
	});
	$('ul.imageGallery li').each(function() {
	 $(this).height(maxHeight);
	});
});

$(function(){
	$.fn.isAfter = function(sel){
        return this.prevAll().filter(sel).length !== 0;
    };

    $.fn.isBefore= function(sel){
        return this.nextAll().filter(sel).length !== 0;
    };

	$('ul.imageGallery li:first-of-type').addClass('active');
	$('.theDots li:first-of-type').addClass('active');
	
	$('.gallery_controls .prev').click(function(){
		$('.overlay:visible').fadeOut(300);
		var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
		var active = $('ul.imageGallery li.active');
		var prev = $(active).prev('li');
		if($(active).prev('li').length){
			$(active).removeClass('active').show();
			$(prev).show().addClass('active').addClass('moving');
			$(prev).animate({
				left: '-=' + imageWidth
			}, 300, function(){
				$(active).css('display','');
				var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
				$('.theDots li.active').removeClass('active');
				$(theDot).addClass('active');
				$(prev).removeClass('moving');
			});
		} else {
//			$('ul.imageGallery').animate({
				// left: '-=' + imageWidth
//			}, 300, function(){
//				$('ul.imageGallery li.active').removeClass('active');
//				$('ul.imageGallery li:last-of-type').addClass('active');
//				var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
//				$('.theDots li.active').removeClass('active');
//				$(theDot).addClass('active');
//			});
		}
	});
	$('.gallery_controls .next').click(function(){
		$('.overlay:visible').fadeOut(300);
		var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
		var active = $('ul.imageGallery li.active');
		var next = $(active).next('li');
		if($(active).next('li').length){
			$(active).removeClass('active').addClass('moving');
			$(next).addClass('active');
			$(next).show();
			$(active).animate({
				left: '+=' + imageWidth
			}, 300, function(){
				$(active).css('display','').removeClass('moving');
				var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
				$('.theDots li.active').removeClass('active');
				$(theDot).addClass('active');
			});
		} else {
//			$('ul.imageGallery').animate({
				// left: '-=' + imageWidth
//			}, 300, function(){
//				$('ul.imageGallery li.active').removeClass('active');
//				$('ul.imageGallery li:first-of-type').addClass('active');
//				var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
//				$('.theDots li.active').removeClass('active');
//				$(theDot).addClass('active');
//			});
		}
	});

	$('.theDots li').click(function(){
		$('.overlay:visible').fadeOut(300);
		// var index = $(this).index();
		// var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
		// var scrollTo = 	imageWidth * index;
		var theDot = '#' + $(this).attr('id');
		$('.theDots li.active').removeClass('active');
		$(this).addClass('active');
		$('ul.imageGallery').find(theDot).addClass('target');
		var that = $('ul.imageGallery li.active');
		var target = $('li.target');
		if($(that).isBefore($(target)) === true){
			slide_forward(that, target, 100000);
		} else if ($(that).isAfter($(target)) === true){
			var that = that.prev('li');
			slide_backward(that, target, 100000);
		}
	});

	$('.hotspot').each(function(){
		glow(this);
	});
	$('.hotspot').click(function(){
		$('.overlay:visible').fadeOut(300);
		var hotspot = $(this);
		var overlay = $(this).next('.overlay');
		var hotspot_left = $(hotspot).css('left').replace('px', '');
		var gallery_width = $('.gallery').width();
		var percent_left = hotspot_left / gallery_width * 100;
		if(percent_left < 50){
			$(overlay).css('left', '50%');
			$(overlay).find('.overlay_container').css('left','initial').css('right','7.5%');
		} else {
		}
		var hotspot_top = $(hotspot).css('top').replace('px', '');
		var gallery_height = $('.gallery').height();
		var percent_top = hotspot_top / gallery_height * 100;
		
		if(percent_top > 44){
			$(overlay).find('.overlay_container').css('top','initial').css('bottom','60px');
		} else {
		}
		$(overlay).fadeIn(300);
	});
	$('.close').click(function(){
		$(this).parent().parent().fadeOut(300);
	});
});