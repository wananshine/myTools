function Slider() {
  this.oParent = null;
  this.oSlider = null;
  this.slider_item = null;
  this.btn_prev = null;
  this.btn_next = null;
  this.btn_item = null;
  this.slider_title = null;

  this.iNow = 0;
  this.iNow2 = 0;
  this.b_state = true;
  this.slider_w = 0;
  this.slider_h = 0;
  this.decideDir = '';
  this.timer = null;

  this.settings = {
    slider_num: 4,
    w: 1200,
    h: 500,
    sliderDir: 'horizontal'
  };
};

Slider.prototype = {
  // ===== options =====
  setOpacity: function (index, fn) {
    this.slider_item.fadeOut('slow');
    this.slider_item.eq(index).fadeIn('slow', function () {
      fn && fn();
    });
  },

  prevClick: function () { // 上一张切换
    var self = this;
    var slider_len = self.slider_item.length;

    if (this.b_state) {
      this.b_state = false;

      if (this.settings.sliderDir === 'vertical' || this.settings.sliderDir === 'horizontal') {
        if (this.iNow === 0) {
          this.iNow = slider_len - 1;

          this.slider_item.eq(slider_len - 1).css({
            position: 'relative',
            [this.decideDir]: this.setDirection() * slider_len
          });
        } else {
          this.iNow --;
        }

        this.iNow2 --;

        this.oSlider.animate({[this.decideDir]: this.setDirection() * this.iNow2}, function () {
          if (self.iNow === slider_len - 1) {
            self.iNow2 = slider_len - 1;

            self.oSlider.css({[self.decideDir]: self.setDirection() * (slider_len - 1)});
            self.slider_item.eq(slider_len - 1).css({position: 'static'});
          }

          self.b_state = true;
        });
      } else {
        (this.iNow === 0) ? this.iNow = slider_len - 1 : this.iNow --;

        this.setOpacity(this.iNow, function () {
          self.b_state = true;
        });
      }

      this.setInfo(this.iNow);
    }
  },

  nextClick: function () { // 下一张切换
    var self = this;
    var slider_len = self.slider_item.length;

    if (this.b_state) {
      this.b_state = false;

      if (this.settings.sliderDir === 'vertical' || this.settings.sliderDir === 'horizontal') {
        if (this.iNow === slider_len - 1) {
          this.iNow = 0;

          this.slider_item.eq(0).css({
            position: 'relative',
            [this.decideDir]: -this.setDirection() * slider_len
          });
        } else {
          this.iNow ++;
        }

        this.iNow2 ++;

        this.oSlider.animate({[this.decideDir]: this.setDirection() * this.iNow2}, function () {
          if (self.iNow === 0) {
            self.iNow2 = 0;

            self.oSlider.css({[self.decideDir]: 0});
            self.slider_item.css({position: 'static'});
          }

          self.b_state = true;
        });
      } else {
        (this.iNow === slider_len - 1) ? this.iNow = 0 : this.iNow ++;
        
        this.setOpacity(this.iNow, function () {
          self.b_state = true;
        });
      }

      this.setInfo(this.iNow);
    }
  },

  setInfo: function (index) { // 圆点&标题
    this.btn_item.removeClass('btn-item__cur');
    this.btn_item.eq(index).addClass('btn-item__cur');

    var aTitle = this.slider_item.eq(index).attr('imgTitle');
    this.slider_title.text(aTitle);
  },

  setData: function () { // 设置幻灯片属性
    var sliderBox_w = this.settings.w * this.slider_item.length;
    var sliderBox_h = this.settings.h * this.slider_item.length;

    this.oParent.css({width: this.settings.w, height: this.settings.h});
    this.slider_item.css({width: this.settings.w, height: this.settings.h});

    if (this.settings.sliderDir === 'vertical') {
      this.oSlider.css({width: this.settings.w, height: sliderBox_h});
    } else if (this.settings.sliderDir === 'horizontal') {
      this.oSlider.css({width: sliderBox_w, height: this.settings.h});
    } else {
      this.slider_item.css({position: 'absolute', display: 'none'});
      this.slider_item.eq(0).css({display: 'block'});
    }

    this.setInfo(0);
  },

  createElem: function (oParent) { // 向页面添加元素
    var createSlider = document.createElement('div');
    var imgStr = '';
    var btnStr = '';

    for (var i = 0; i < this.settings.slider_num; i ++) {
      imgStr += '<a href="#" imgTitle="Picture'+(i + 1)+'" class="slider-item"><img src="images/'+(i + 1)+'.jpg" alt="#"></a>';
      btnStr += '<a href="javascript:;" class="btn-item"></a>';
    }
    
    $(createSlider).attr({id: oParent, class: 'slider-box'});
    $(createSlider).html('<div class="slider">'+imgStr+'</div><a href="javascript:;" class="btn btn-prev"></a><a href="javascript:;" class="btn btn-next"></a><div class="slider-title"><p>Picture 1</p></div><div class="btn-box">'+btnStr+'</div>');

    $(document.body).append(createSlider);
  },

  inital: function (oParent, opt) { // 初始化
    var self = this;

    $.extend(this.settings, opt);

    this.createElem(oParent);

    this.oParent = $('#'+oParent+'');
    this.oSlider = this.oParent.find('.slider');
    this.slider_item = this.oSlider.find('.slider-item');
    this.btn_prev = this.oParent.find('.btn-prev');
    this.btn_next = this.oParent.find('.btn-next');
    this.btn_item = this.oParent.find('.btn-item');
    this.slider_title = this.oParent.find('.slider-title').find('p');

    this.setData();

    this.slider_w = this.slider_item.eq(0).width();
    this.slider_h = this.slider_item.eq(0).height();
    this.decideDir = this.setMethod();

    this.btn_item.click(function () {
      var index = $(this).index();

      if (self.settings.sliderDir === 'vertical' || self.settings.sliderDir === 'horizontal') {
        self.oSlider.animate({[self.decideDir]: index * self.setDirection()});
      } else {
        self.setOpacity(index);
      }

      self.setInfo(index);

      self.iNow = $(this).index();
      self.iNow2 = $(this).index();
    });

    this.btn_prev.click(function () {
      self.prevClick();
    });

    this.btn_next.click(function () {
      self.nextClick();
    });

    this.oParent.hover(function () {
      $(self).trigger('showBtn');
    }, function () {
      $(self).trigger('hideBtn');
    });
  },

  // ===== Methods =====
  autoPlay: function () { // 自动播放
    var self = this;

    clearInterval(self.timer);
    self.timer = setInterval(function () {
      self.nextClick();
    }, 3000);

    this.oParent.hover(function () {
      clearInterval(self.timer);
    }, function () {
      self.timer = setInterval(function () {
        self.nextClick();
      }, 3000);
    });
  },


  // ===== 小方法 =====
  setMethod: function () {
    if (this.settings.sliderDir === 'vertical') {
      return 'top';
    } else if (this.settings.sliderDir === 'horizontal') {
      return 'left';
    }
  },

  setDirection: function () {
    if (this.settings.sliderDir === 'vertical') {
      return -this.slider_h;
    } else if (this.settings.sliderDir === 'horizontal') {
      return -this.slider_w;
    }
  },

  constructor: Slider
};