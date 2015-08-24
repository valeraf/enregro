  $(function(){
  var app = {};
  app = {
    init: function(){
      $('.slide').height(window.innerHeight);
      this.resizeSlide();
      this.createSlidesNav();
      this.bind();
      this.clickSlideNav();
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
    },
    resizeSlide : function(){
      $(window).resize(function(){
        $('.slide').height(window.innerHeight);
      });
    },
    createSlidesNav: function(){
      var div;
      for (var i = $('.slide').length - 1; i >= 0; i--) {
        div = document.createElement('div');
        $(div).data('target', '#'+$('.slide').eq(i).attr('id'));
        $('.slides_nav').prepend(div);
      };
      $('.slides_nav div').eq(0).addClass('active');
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