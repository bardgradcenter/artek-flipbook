function glow(that){
	$(that).animate({
		'borderColor' : 'rgba(213,28,56,0)'
	}, 1000, function(){
		$(that).animate({
			'borderColor' : 'rgba(213,28,56,1)'
		}, 1000, function(){
			setTimeout(function(){
				$(that).animate({
					'borderColor' : 'rgba(213,28,56,0)'
				}, 1000);
			},1000);
		});
	});
}

function slide_forward(that, target, zindex){
	var imageWidth = -870;
	if($(that).is(target)){
		var the_active = $('ul.imageGallery li.active');
		setTimeout(function(){
			$(the_active).removeClass('active');
			$('#container').removeClass('wait');
		}, 350);
		$(target).addClass('active').removeClass('target');
		$(target).find('.hotspot').each(function(){
			glow(this);
		});
	} else {
		setTimeout(function(){
			$(that).animate({
				left: '+=' + imageWidth
			}, 300, function(){
			});
			var new_zindex = zindex-100;
			var next = $(that).next('li');
			slide_forward(next, target, new_zindex);
		},50);
	}
}
function slide_backward(that, target, zindex){
	var imageWidth = -870;
	if($(that).is(target)){
		var the_active = $('ul.imageGallery li.active');
		setTimeout(function(){
			$(that).animate({
				left: '-=' + imageWidth
			}, 300, function(){
			});
		}, 50);
		setTimeout(function(){
			$(the_active).removeClass('active');
			$('#container').removeClass('wait');
		}, 350);
		$(target).addClass('active').removeClass('target');
		$(target).find('.hotspot').each(function(){
			glow(this);
		});
	} else {
		setTimeout(function(){
			$(that).animate({
				left: '-=' + imageWidth
			}, 300, function(){
			});
			var new_zindex = zindex+100;
			var next = $(that).prev('li');
			slide_backward(next, target, new_zindex);
		}, 50);
	}
}
$( window ).load(function() {
  var maxHeight = -1;

	$('ul.imageGallery li.single_image').each(function() {
	 maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
	});

	$('ul.imageGallery').each(function() {
	 $(this).height(maxHeight);
	});
	$('ul.imageGallery li.single_image').each(function() {
	 $(this).height(maxHeight);
	});
});
function gohome(){
	if($('.intro_screen').hasClass('visible')){

	} else {
		if($('.imageGallery #image01').hasClass('active')){
			$('.gallery_controls .prev').trigger('click');
		} else {
			$('.theDots ul li#image01').trigger('click');
			setTimeout(function(){
				gohome();
			}, 1500);
		}
	}
}

idleTime = 0;
function timerIncrement() {
	idleTime = idleTime + 1;
	if( idleTime > 1) {
		if($('.intro_screen').hasClass('visible')){

		} else {
			gohome();
		}
	}
}
$(function(){
	
	//Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 60000); // Half minute

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });


	$.fn.isAfter = function(sel){
        return this.prevAll().filter(sel).length !== 0;
    };

    $.fn.isBefore= function(sel){
        return this.nextAll().filter(sel).length !== 0;
    };
	
	$('.gallery_controls .prev').click(function(){
		if($('#container').hasClass('wait')){

		} else { 
			$('.overlay:visible').fadeOut(300);
			$('#overlays').fadeOut(300);
			var imageWidth = -870;
			var active = $('ul.imageGallery li.active');
			var prev = $(active).prev('li');
			if($(active).prev('li').length){
				var page_number = $(prev).attr('id').replace('image','');
				var image = 'images/AA-3438-' + page_number + '.png';
				$(prev).find('.the_page').html('<img src="' + image + '">');
				$(active).removeClass('active');
				$(prev).addClass('active').addClass('moving');
				$(prev).animate({
					left: '-=' + imageWidth
				}, 300, function(){
					var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
					$('.theDots li.active').removeClass('active');
					$(theDot).addClass('active');
					$(active).find('.the_page').html('<img src="images/AA-3438-filler.png">');
					$(prev).removeClass('moving');
					$('.active .hotspot').each(function(){
						glow(this);
					});
					if($(prev).is(':last-of-type')){
						$('.next').fadeOut(300);
					} else {
						if($('.next').is(':visible')){
						} else {
							$('.next').fadeIn(300);
						}
					}
					if($(theDot).hasClass('bookmark')){
						$(prev).find('.instructions').fadeIn(300);
					}
				});
			} else {
				var halfWidth = -435;
				$('.intro_screen').addClass('visible').animate({
					left:'-=' + halfWidth
				}, 300);
				$('.imageGallery').animate({
					left: 435
				}, 300);
				$('ul.imageGallery li.single_image:first-of-type').removeClass('active');
				$('.theDots li:first-of-type').removeClass('active');
				$('.prev').fadeOut(300);
			}
		}
	});
	$('.gallery_controls .next').click(function(){
		if($('.intro_screen').hasClass('visible')){
			$('.overlay:visible').fadeOut(300);
			$('#overlays').fadeOut(300);
			$('ul.imageGallery li.single_image:first-of-type').addClass('active');
			$('.theDots li:first-of-type').addClass('active');
			var halfWidth = -435;
			$('.intro_screen').removeClass('visible').animate({
				left:'+=' + halfWidth
			}, 300);
			$('.imageGallery').animate({
				left: 0
			}, 300);
			$('.prev').fadeIn(300);
		} else {
			if($('#container').hasClass('wait')){

			} else { 
				$('.overlay:visible').fadeOut(300);
				$('#overlays').fadeOut(300);
				var imageWidth = -870;
				var active = $('ul.imageGallery li.active');
				var next = $(active).next('li');
				if($(active).next('li').length){
					var page_number = $(next).attr('id').replace('image','');
					var image = 'images/AA-3438-' + page_number + '.png';
					$(next).find('.the_page').html('<img src="' + image + '">');
					$(active).removeClass('active').addClass('moving');
					$(next).addClass('active');
					$(active).animate({
						left: '+=' + imageWidth
					}, 300, function(){
						$(active).find('.the_page').html('<img src="images/AA-3438-filler.png">');
						$(active).removeClass('moving');
						var theDot = ('.theDots #') + ($('ul.imageGallery li.active').attr('id'));
						$('.theDots li.active').removeClass('active');
						$(theDot).addClass('active');
						$('.active .hotspot').each(function(){
							glow(this);
						});
						if($(next).is(':last-of-type')){
							$('.next').fadeOut(300);
						} else {
							if($('.next').is(':visible')){
							} else {
								$('.next').fadeIn(300);
							}
						}
						if($(theDot).hasClass('bookmark')){
							$(next).find('.instructions').fadeIn(300);
						}
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
			}
		}
	});

	$('.theDots li').click(function(){
		if($(this).hasClass('active')){

		} else {
			if($('.intro_screen').hasClass('visible')){
				$('ul.imageGallery li.single_image:first-of-type').addClass('active');
				$('.theDots li:first-of-type').addClass('active');
				var halfWidth = -435;
				$('.intro_screen').removeClass('visible').animate({
					left:'+=' + halfWidth
				}, 300);
				$('.imageGallery').animate({
					left: 0
				}, 300);
				$('.prev').fadeIn(300);
				
			}
			if($('#container').hasClass('wait')){

			} else { 
				var active = $('ul.imageGallery li.active');
				$('#container').addClass('wait');
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
				var page_number = $(target).attr('id').replace('image','');
				var image = 'images/AA-3438-' + page_number + '.png';
				$(target).find('.the_page').html('<img src="' + image + '">');
				if($(target).is(':last-of-type')){
					$('.next').fadeOut(300);
				} else {
					if($('.next').is(':visible')){
					} else {
						$('.next').fadeIn(300);
					}
				}
				if($(target).is(':first-of-type')){
					$(target).removeClass('target');
					$('#container').removeClass('wait');
				}
				if($(theDot).hasClass('bookmark')){
					$(target).find('.instructions').fadeIn(300);
				}
				if($(that).isBefore($(target)) === true){
					slide_forward(that, target, 100000);
				} else if ($(that).isAfter($(target)) === true){
					var that = that.prev('li');
					slide_backward(that, target, 100000);
				}
				setTimeout(function(){
					$(active).find('.the_page').html('<img src="images/AA-3438-filler.png">');
				}, 300);
			}
		}
	});

	$('.active .hotspot').each(function(){
		glow(this);
	});
	$('.hotspot').click(function(){
		$('.overlay:visible').fadeOut(300);
		var hotspot = $(this);
		var overlay_id = $(hotspot).attr('id');
		var overlay = $('.overlay.' + overlay_id);
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
		
		if(percent_top > 66){
			$(overlay).find('.overlay_container').css('bottom', '10%').css('top','auto');
		} else {
			$(overlay).find('.overlay_container').css('top', percent_top + '%');
		}
		$('#overlays').fadeIn(300);
		$(overlay).fadeIn(300);
	});
	$('.close').click(function(){
		$(this).parent().parent().fadeOut(300);
		$('#overlays').fadeOut(300);
	});
});