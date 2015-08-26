  $(function(){
  var app = {};
  app = {
    init: function(){
      $('.slide, .slide-item').height(window.innerHeight);
      this.resizeSlide();
      this.createSlidesNav();
      this.newsListItemWidth(4);
      this.bind();
      this.clickSlideNav();
      this.scrollSwitchSlideNav();
    },
    bind: function(){
      var me = this;
      $('.login').click(function(){
        app.showAuth();
        return false;
      });
      $('.auth_wrapper').click(function(){
        app.hideAuth();
        return false;
      });
      $(".main_carousel, .solutions_carousel").owlCarousel({
        loop:false,
        margin:0,
        nav:false,
        items: 1
      });
      $('.new-list-wrapper').jScrollPane({
        autoReinitialise: true
      });
      $(window).resize(function(){
        var t;
        clearTimeout(t);
        t = setTimeout(function(){
          app.newsListItemWidth(4);
        }, 400);
      });
    },
    resizeSlide : function(){
      $(window).resize(function(){
        $('.slide, .slide-item').height(window.innerHeight);
      });
    },
    createSlidesNav: function(){
      var div;
      for (var i = $('.slide').length - 1; i >= 0; i--) {
        div = document.createElement('div');
        $(div).data('target', '#'+$('.slide').eq(i).attr('id'));
        $('.slides_nav').prepend(div);
      };
      var scrolltop = $(document).scrollTop();
      $('.slide').each(function(i, e){
        if (scrolltop >= ($(this).position().top - 300) && ($(this).position().top + $(this).height() + 300) >= scrolltop ){
          $('.slides_nav div').removeClass('active');
          $('.slides_nav div').eq(i).addClass('active');
        }
      });;
    },
    scrollToSlide: function($element){
      $('html, body').animate({
        scrollTop: $element.offset().top
      });
    },
    clickSlideNav: function(){
      $(document).on('click', '.slides_nav div', function(){        
        $('.slides_nav div').removeClass('active');
        $(this).addClass('active');
        app.scrollToSlide($($(this).data('target')));
      });
    },
    scrollSwitchSlideNav: function(){
      $(document).scroll(function(){
        var scrolltop = $(this).scrollTop();
        $('.slide').each(function(i, e){
          if (scrolltop >= ($(this).position().top - 300) && ($(this).position().top + $(this).height() + 300) >= scrolltop ){
            $('.slides_nav div').removeClass('active');
            $('.slides_nav div').eq(i).addClass('active');
          }
        });
      });
    },
    newsListItemWidth: function(visibleItems){
      var d = visibleItems ? visibleItems : 4;
      var w = $('.new-list-wrapper').width()/d;
      $('.news-list li').width( w-40 );
      $('.news-list').width($('.news-list li').length*w);
    },
    showAuth: function(){
      if($('.auth_wrapper').hasClass('show')){
        this.hideAuth();
      }else{
        $('.auth_wrapper').addClass('show');
      }
    },
    hideAuth: function(){
      $('.auth_wrapper').removeClass('show');
    }
  };

  app.init();
});