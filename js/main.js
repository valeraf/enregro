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
      this.checkpoints();
    },
    bind: function(){
      var me = this;
      $('.login, .reg_login').click(function(){
        app.showAuth($('.auth_wrapper'));
        $('.auth-overlay').fadeIn();
        return false;
      });
      $('.auth_wrapper .close, .auth-overlay').click(function(){
        app.hideAuth($('.auth_wrapper'));
        $('.auth-overlay').fadeOut();
        return false;
      });
      $('.contacts').click(function(){
        app.showAuth($('#contacts'));
        return false;
      });
      $('#contacts .close').click(function(){
        app.hideAuth($('#contacts'));
      });
      $(".main_carousel, .solutions_carousel").owlCarousel({
        loop:false,
        margin:0,
        nav:false,
        items: 1
      });
      $('.product_images ul').owlCarousel({
        loop:false,
        margin:0,
        nav:true,
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

      $('body').on('click','.product_tabs_nav a', function(){
        app.switchTab($(this));
        return false;
      });

      $('.catalog_search').click(function(){
        app.showSearchForm();
      });

      $('.how-to_country').on('change', app.enableSelect);

      setTimeout(function(){$('#news > .va-middle').addClass('va-middle-table');}, 300);
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
    checkpoints: function(){
      $('.first-checkpoint').hover(
        function () {
          this.setAttribute('transform', 'translate(105, 100), scale(.04)')
        },
        function () {
          this.setAttribute('transform', 'translate(115, 110), scale(.03)')
        }
      )

      $('.second-checkpoint').hover(
        function () {
          this.setAttribute('transform', 'translate(40, 132), scale(.04)')
        },
        function () {
          this.setAttribute('transform', 'translate(50, 142), scale(.03)')
        }
      )

      $('.first-checkpoint').click(function(){
        console.log('first clicked')
      })

      $('.second-checkpoint').click(function(){
        console.log('second clicked')
      })
    },
    newsListItemWidth: function(visibleItems){
      var d = visibleItems ? visibleItems : 4;
      var w = $('.new-list-wrapper').width()/d;
      if ($('.new-list-wrapper').length > 0){
        $('.news-list li').width( w-40 );
        $('.news-list').width($('.news-list li').length*w);
      }
    },
    showAuth: function($element){
      if($element.hasClass('show')){
        this.hideAuth();
      }else{
        $element.addClass('show');
      }
    },
    hideAuth: function($element){
      $element.removeClass('show');
    },
    switchTab: function($element){
      $('.product_tabs_nav a').removeClass('active')
      $element.addClass('active');
      $('.product_tabs_content_item').hide()
      $("[data-content="+$element.attr('href').replace('#', '')+"]").show();
    },
    enableSelect: function(){
      if($('.how-to_country').val().length > 0){
        $('.how-to_city').removeAttr('disabled');
      }else{
        $('.how-to_city').attr('disabled','disabled');
      }
    },
    showSearchForm: function(){
      if(!$('.catalog_search').hasClass('active')){
        $('.catalog_search').addClass('active')
      }
    }
  };

  app.init();
});