  $(function(){
  var app = {};
  app = {
    init: function(){
      var jspApi;
      $('.slide, .slide-item').height(window.innerHeight);
      this.resizeSlide();
      this.createSlidesNav();
      if (window.innerWidth < 1024 && window.innerWidth > 768){
        app.newsListItemWidth(3)
      }else if(window.innerWidth < 768 && window.innerWidth > 480){
        app.newsListItemWidth(2)
      }else if(window.innerWidth < 480){
        app.newsListItemWidth(1)
      }else if (window.innerWidth > 1024){
        app.newsListItemWidth(4);
      }
      this.bind();
      this.clickSlideNav();
      this.scrollSwitchSlideNav();
      this.checkpoints();
      this.categNavUpdate($('.subcategory_list_select'));
      this.categNavUpdate($('.mobile-sidenav'));
      this.hideSearchForm();
      this.sideNavUpdate();
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
        setTimeout(function(){
          app.contactsInfoPosition($('.contacts-ru'), $('.c_first-checkpoint'));
          app.contactsInfoPosition($('.contacts-au'), $('.c_second-checkpoint'));
        },500)
        if((window.innerWidth < 768 || window.innerHeight < 768) && !$('html').hasClass('hide-scroll')){
          $('html').addClass('hide-scroll');
        }else if((window.innerWidth > 768 || window.innerHeight > 768)){
          $('html').removeClass('hide-scroll');
        }
        return false;
      });
      $('#contacts .close').click(function(){
        app.hideAuth($('#contacts'));
        $('html').removeClass('hide-scroll');
      });
      var owl = $(".main_carousel, .solutions_carousel");
      owl.on('initialized.owl.carousel change.owl.carousel changed.owl.carousel', function(e) { 
        if (!e.namespace || e.type != 'initialized' && e.property.name != 'position') return;
        
        var current = e.item.index;
        var img = $(e.target).find(".owl-item").eq(current).find("img");
        app.updateImageSize(img);
      });
      owl.owlCarousel({
        loop:false,
        margin:0,
        autoplay:true,
        autoplayTimeout:10000,
        nav:false,
        items: 1,
        onInitialized: function(){
          $(this._items).each(function(i,e){
            setTimeout(function(){
              app.updateImageSize(e.find('img'));
            },500)
          })
        },
        onResized: function(){
          $(this._items).each(function(i,e){
            setTimeout(function(){
              app.updateImageSize(e.find('img'));
            },500)
          })
        }
      });
      
      $('.product_images ul').owlCarousel({
        loop:false,
        margin:0,
        nav:true,
        items: 1
      });

      if($('.news-list-jsp').length > 0){
        jspApi = $('.news-list-jsp').jScrollPane({
          autoReinitialise: true
        }).data().jsp;
      }
      
      $(window).resize(function(){
        var t;
        clearTimeout(t);
        t = setTimeout(function(){
          if (window.innerWidth < 1024 && window.innerWidth > 768){
            app.newsListItemWidth(3)
          }else if(window.innerWidth < 768 && window.innerWidth > 480){
            app.newsListItemWidth(2);
          }else if(window.innerWidth < 480){
            app.newsListItemWidth(1)
          }else if (window.innerWidth > 1024){
            app.newsListItemWidth(4);
          }
        }, 400);
        setTimeout(function(){
          app.contactsInfoPosition($('.contacts-ru'), $('.c_first-checkpoint'));
          app.contactsInfoPosition($('.contacts-au'), $('.c_second-checkpoint'));
        },500)
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
      $('<div class="togle-menu">').insertAfter('.top-menu-wrapper');
      $('body').on('click','.togle-menu', function(){
        if($(this).hasClass('active')){
          $(this).removeClass('active');
          $('.top-menu-wrapper').removeClass('show');
          $('.logo').removeClass('active')
        }else{
          $('.top-menu-wrapper').addClass('show');
          $(this).addClass('active');
          $('.logo').addClass('active')
        }
      });

      $('.package h2').click(function(){
        app.showMoreOnSmallScreens($(this));
      });
    },
    destroy: function(){
      jspApi.destroy();
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
        if (scrolltop >= ($(this).position().top - 300) && ($(this).position().top + $(this).height() + 300) >= scrolltop && $(this).attr('id') != 'contacts' ){
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
          if (scrolltop >= ($(this).position().top - 300) && ($(this).position().top + $(this).height() + 300) >= scrolltop && $(this).attr('id') != 'contacts' ){
            $('.slides_nav div').removeClass('active');
            $('.slides_nav div').eq(i).addClass('active');
          }
        });
      });
    },
    checkpoints: function(){
      if ($('.checkpoint').length > 0){
        app.showTooltip($('.austria'), $('.second-checkpoint'));
      }

      $('.first-checkpoint').click(function(){
        $('.second-checkpoint').attr('transform', 'translate(61, 147), scale(.016)');
        this.setAttribute('transform', 'translate(120, 110), scale(.02)');
        app.showTooltip($('.moscow'), $(this));
      })

      $('.second-checkpoint').click(function(){
        $('.first-checkpoint').attr('transform', 'translate(123, 114), scale(.016)');
        this.setAttribute('transform', 'translate(58, 144), scale(.02)')
        app.showTooltip($('.austria'), $(this));
      });

    },
    showTooltip: function($tooltip, $checkpoint){
      $('.tooltip').hide();
      if($checkpoint.is('.second-checkpoint')){
        $tooltip.css({
          top: $checkpoint.offset().top + 50,
          left: $checkpoint.offset().left - $tooltip.outerWidth()/2 + 10
        }).show();
      }else{
        $tooltip.css({
          top: $checkpoint.offset().top - $tooltip.outerHeight() - 13,
          left: $checkpoint.offset().left - $tooltip.outerWidth()/2 + 10
        }).show();
      }
    },
    contactsInfoPosition: function($block, $checkpoint){
      $block.hide();
      if ($block.is('.contacts-au')){
        $block.css({
          top: $checkpoint.offset().top + 10,
          left: $checkpoint.offset().left - $block.width()
        }).show();
      }else{
        $block.css({
          top: $checkpoint.offset().top + 10,
          left: $checkpoint.offset().left + 40
        }).show();
      }
    },
    newsListItemWidth: function(visibleItems){
      $('.new-list-wrapper').width(window.innerWidth - 80);
      var d = visibleItems ? visibleItems : 4;
      var w = $('.new-list-wrapper').width()/d;
      var p = (window.innerWidth > 480) ? 40 : 0;
      if ($('.new-list-wrapper').length > 0){
        $('.news-list li').width( w - p );
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
      if($(window).width() < 1000){
        if($(this).hasClass('active') && $('.product_tabs_nav').hasClass('opened')){
          $('.product_tabs_nav').removeClass('opened')
        }else if(!$(this).hasClass('active') && $('.product_tabs_nav').hasClass('opened')){
          $('.product_tabs_nav').removeClass('opened');
        }else if(!$(this).hasClass('active') && !$('.product_tabs_nav').hasClass('opened')){
          $('.product_tabs_nav').addClass('opened')
        }
      }
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
    },
    hideSearchForm: function(){
      $(document).mouseup(function (e){
        var container = $(".catalog_search");

        if (container.has(e.target).length === 0 && container.is(':visible')){
          container.removeClass('active');
        }
      });
    },
    updateImageSize: function(image) {      
      var ratio_cont = $(window).width()/$(window).height();
      var $img = $(image);
      var ratio_img = $img.width()/$img.height();
      if (ratio_cont > ratio_img){
        $img.css({"width": "100%", "height": "auto"});
      }
      else if (ratio_cont < ratio_img){
        $img.css({"width": "auto", "height": "100%"});
      }
    },
    categNavUpdate: function($wrapper){
      var $text = $wrapper.find('span'),
          $select = $wrapper.find('select');
      $select.on('change', function(){
        $text.html($("option:selected", this).text());
        document.location = this.value;
      });
    },
    sideNavUpdate: function(){
      var el = $('.sidenav').find('li.active a');
      $('.mobile-sidenav span').text(el.text());
      $('.mobile-sidenav select').val(el.attr('href'));
    },
    showMoreOnSmallScreens: function($element){
      var $target = $element.next();
      $target.slideToggle('400', function(){
        $target.removeAttr('style');
        $target.toggleClass('show');
      });
    }
  };

  app.init();
});