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
		$('ul.imageGallery li.active').removeClass('active');
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
		setTimeout(function(){
			$(that).css('z-index',zindex).show().animate({
				left: '-=' + imageWidth
			}, 600, function(){
				$(that).css('display','').css('z-index','');
			});
		}, 50);
		$('ul.imageGallery li.active').removeClass('active').css('display','');
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

$(function(){
	$.fn.isAfter = function(sel){
        return this.prevAll().filter(sel).length !== 0;
    };

    $.fn.isBefore= function(sel){
        return this.nextAll().filter(sel).length !== 0;
    };

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

	$('ul.imageGallery li:first-of-type').addClass('active');
	$('.theDots li:first-of-type').addClass('active');
	
	$('.gallery_controls .prev').click(function(){
		var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
		if($('ul.imageGallery li.active').prev('li').length){
			$('ul.imageGallery li.active').prev('li').show().addClass('moving');
			$('ul.imageGallery li.active').prev('li').animate({
				left: '-=' + imageWidth
			}, 300, function(){
				$('ul.imageGallery li.active').removeClass('active').css('display','').prev('li').addClass('active');
				var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
				$('.theDots li.active').removeClass('active');
				$(theDot).addClass('active');
				$('ul.imageGallery li.active').removeClass('moving');
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
		var imageWidth = ($('ul.imageGallery li.active').width())*(-1);
		if($('ul.imageGallery li.active').next('li').length){
			$('ul.imageGallery li.active').next('li').show();
			$('ul.imageGallery li.active').animate({
				left: '+=' + imageWidth
			}, 300, function(){
				$('ul.imageGallery li.active').removeClass('active').css('display','').next('li').addClass('active');
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
		$(this).next('.overlay').fadeIn(300);
	});
	$('.close').click(function(){
		$(this).parent().parent().fadeOut(300);
	});
});