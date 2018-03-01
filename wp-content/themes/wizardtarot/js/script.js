jQuery(function() {
  var tarot_cards = {
    0: '/images/gallery/15-Major-Devil',
    1: '/images/gallery/00-Major-Fool',
    2: '/images/gallery/21-Major-World',
    3: '/images/gallery/20-Major-Judgement',
    4: '/images/gallery/19-Major-Sun',
    5: '/images/gallery/18-Major-Moon',
    6: '/images/gallery/17-Major-Star',
    7: '/images/gallery/16-Major-Tower',
    8: '/images/gallery/14-Major-Temperance',
    9: '/images/gallery/13-Major-Death',
    10: '/images/gallery/12-Major-Hanged',
    11: '/images/gallery/11-Major-Strenght',
    12: '/images/gallery/10-Major-Fortune',
    13: '/images/gallery/09-Major-Hermit',
    14: '/images/gallery/08-Major-Justice',
    15: '/images/gallery/07-Major-Chariot',
    16: '/images/gallery/06-Major-Lovers',
    17: '/images/gallery/05-Major-Hierophant',
    18: '/images/gallery/04-Major-Emperor',
    19: '/images/gallery/03-Major-Empress',
    20: '/images/gallery/02-Major-Priestess',
    21: '/images/gallery/01-Major-Magician',
  },
  tarot_cards_count = 1,
  tarot_devil_cell,
  tarot_cur_card = 0,
  tarot_devil_status = 0,
  tarot_cur_cell,
  tarot,
  e_one,
  e_two,
  e_dama,
  e_king,
  e_paje,
  e_knight,
  grafSt = 'graf',
  prot_type,
  elem_type,
  prot_card,
  knife,
  knifeDate,
  knifeDateOld = null,
  knifeDateDiff,
  knife_rate_class,
  knife_rate_class_dotted,
  pointsStatus = true,
  pointsStatusElems = true,
  toElemChoice,
  letters = {
      0: 'Б',
      1: 'Т',
      2: 'Н',
      3: 'М',
      4: 'Г',
      5: 'Р',
      6: 'В',
      7: 'Х',
  },
  onEnd = function(){
    swal({
        title: "Процедура окончена",   
        text: "Что вы хотите делать дальше?",   
        type: "success",   
        showCancelButton: true,   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "Повторить сессию",   
        cancelButtonText: "Выйти"
    },
    function(isConfirm){   
      if (isConfirm) {
        jQuery('.tarot_to_photo').removeClass('hidden');
        jQuery('.chart').data('easyPieChart').update(0);
        jQuery('.chart').find('span').text('0');
        jQuery('.chartTwo').data('easyPieChart').update(0);
        jQuery('.chartTwo').find('span').text('0');
      } else {
        var protocol = undefined;    
        jQuery(location).attr('href','/');
        if(supportsStorage && localStorage.getItem('protocolName')){
          localStorage.removeItem('protocolName')
          jQuery('.data-protocol-name').addClass('hidden');
          jQuery('.data-protocol-name').text('');
        }
      } 
    });
  },
  checkPoints = function(){
    jQuery('.itemZone').each(function() {
      if(parseFloat(jQuery(this).css('top')) < 200){
        pointsStatus = false;
        console.log(jQuery(this)+ ' status '+pointsStatus);
      } else {
        pointsStatus = true;
      }
    });
  },
  checkPointsElems = function(){
    jQuery('.elems_zone').each(function() {
      if(parseFloat(jQuery(this).css('left')) < 200){
        pointsStatusElems = false;
        console.log(jQuery(this)+ ' status '+ pointsStatusElems);
      } else {
        pointsStatusElems = true;
      }
    });
  },
  supportsStorage = function(){
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  },
  tarot_themplate_url = 'http://wizardtarot.ru/wp-content/themes/wizardtarot';
  // Функция вывода карт в ячейки
  tarot_randomizer = function(tarot_cell){
    // Если карт в колоде больше нет
    if(Object.keys(tarot_cards).length === 0){
    } else {
      // Вывод первой карты
      if(tarot_devil_status == 0){
        tarot_devil_cell = tarot_cell;
        tarot_cell.removeClass('tarot_card_reject').find('.hexagon-in2').removeClass('tarot_empty_cell').addClass('tarot_devil_cell').css('backgroundImage', 'url('+tarot_themplate_url+tarot_cards[tarot_cur_card]+'-min.png)');
        tarot_cell.find('.overlay').find('a').attr('href', tarot_themplate_url+tarot_cards[tarot_cur_card]+'.png');
        delete tarot_cards[tarot_cur_card];
        tarot_devil_status = 1;
        tarot_cards_count ++;
      // Вывод остальных карт
      } else {
        tarot_cur_card = (Math.round(Math.random() * (21 - 0)));
        if(tarot_cards[tarot_cur_card]){
          tarot_cell.find('.hexagon-in2').removeClass('tarot_empty_cell').addClass('tarot_full_cell').css('backgroundImage', 'url('+tarot_themplate_url+tarot_cards[tarot_cur_card]+'-min.png)');
          tarot_cell.find('.overlay').find('a').attr('href', tarot_themplate_url+tarot_cards[tarot_cur_card]+'.png');
          delete tarot_cards[tarot_cur_card];
        } else {
          tarot_randomizer(tarot_cur_cell);
        }
      }
    }
  };


if(supportsStorage && localStorage.getItem('backStatus')){
    var backStatus = localStorage.getItem('backStatus');
}

// Управление графиком ножа
if(supportsStorage && localStorage.getItem('grafSt')){
    grafSt = localStorage.getItem('grafSt');
    console.log(grafSt);
}
if(grafSt === 'graf'){
    // jQuery('.btn__graf').button('toggle');
    jQuery('.btn__clgraf').removeClass('disabled');
    jQuery('.btn__graf').addClass('active');
    jQuery('.btn__nograf').removeClass('active');
    console.log('1')
} else {
    // jQuery('.btn__nograf').button('toggle');
    jQuery('.btn__clgraf').addClass('disabled');
    jQuery('.btn__graf').removeClass('active');
    jQuery('.btn__nograf').addClass('active');
    console.log('2')
}
jQuery('.btn__clgraf').on('click', function (event) {
    if(!jQuery(this).hasClass('disabled')){
      jQuery('.knife_rate').detach();
    }
});
jQuery('.btn__graf').on('click', function (event) {
  grafSt = 'graf';
  localStorage.setItem('grafSt', grafSt);
  jQuery('.btn__clgraf').removeClass('disabled');
  jQuery('.btn__graf').addClass('active');
  jQuery('.btn__nograf').removeClass('active');
});
jQuery('.btn__nograf').on('click', function (event) {
  grafSt = 'nograf';
  localStorage.setItem('grafSt', grafSt);
  jQuery('.btn__clgraf').addClass('disabled');
  jQuery('.knife_rate').detach();
  jQuery('.btn__graf').removeClass('active');
  jQuery('.btn__nograf').addClass('active');
});

if (backStatus == 'true') {
  jQuery('.first_slide').addClass('hidden');
  jQuery('.second_slide').removeClass('hidden').addClass('animated fadeInDown');
}
// Обработчики переходов между экранами
  // Переход к выбору первоэлемента
  function toElemChoice(param1, callback) {
    jQuery( param1 ).addClass('hidden');
    callback();
  }
  
  jQuery( ".btn-elements" ).on('click', function(event) {
    toElemChoice('.prot-choice', function() {
      jQuery( '.elem-choice' ).removeClass('hidden').addClass('animated fadeInDown');
    });
    localStorage.setItem('prot_type', 'elements');
  });
  jQuery('.home').on('click', function(event) {
    localStorage.setItem('backStatus', 'false');
  });
  jQuery( ".btn-tarot" ).on('click', function(event) {
    localStorage.setItem('backStatus', 'false');
    toElemChoice('.prot-choice', function() {
      jQuery( '.tarot-choice' ).removeClass('hidden').addClass('animated fadeInDown');
    });
    localStorage.setItem('prot_type', 'tarot');
  });
  jQuery( ".btn-tarot_open" ).on('click', function(event) {
    localStorage.setItem('backStatus', 'false');
    toElemChoice('.prot-choice', function() {
      jQuery( '.tarot-choice_open' ).removeClass('hidden').addClass('animated fadeInDown');
      localStorage.setItem('prot_type', 'tarot');
    });
  });
  jQuery( ".elem-choice-item" ).on('click', function(event) {
    elem_type = jQuery(this).data('elem');
    localStorage.setItem('elem_type', elem_type);
    jQuery('.four_slide').addClass('hidden');
    jQuery('.five_slide').removeClass('hidden');
    jQuery('.prot_elem_name').text(jQuery(this).text())

    var card_img_w = parseInt(jQuery('.elem_card_place').css('width'));
    jQuery('.elem_card_place').css('height', (card_img_w * 1.5)+'px');
    var elem_img_w = parseInt(jQuery('.elems_returned_img').css('width'));
    jQuery('.elems_returned_img').css('height', (elem_img_w * 1.5)+'px');
  });
  jQuery( ".to_devil_screen" ).on('click', function(event) {
    jQuery('.five_slide').addClass('hidden');
    jQuery('.four_slide').removeClass('hidden');
  });
  //Перетягивание элементов
  jQuery( ".draggable" ).draggable({ 
    snap: false
  });
  // Клик по ячейке в стандартном режиме
  jQuery('.hex.tarot_cell_item').on('click', function(event) {
    // Если выложены все карты
    if(jQuery(this).hasClass('tarot_has_card') && Object.keys(tarot_cards).length === 0){
      // Если открыто менее 3 карт открываем следующую карту
      if (tarot_cards_count <= 4 && jQuery(this).hasClass('tarot_card_reject')) {
        tarot_cards_count ++;
        jQuery(this).removeClass('tarot_card_reject');
        jQuery(this).find('.hexagon-in2').removeClass('tarot_full_cell');
        tarot_devil_cell.find('.hexagon-in2').removeClass('tarot_devil_cell');
        // Показ кнопки перехода к загрузке фото
        if (tarot_cards_count == 5) {
          jQuery('.tarot_to_photo').removeClass('hidden');
          prot_card = jQuery(this).find('.hexagon-in2').find('a').attr('href');
          localStorage.setItem('prot_card', prot_card);
        };
      // Если открыто 4 карты запрещаем дальнейшее открытие карт
      // Открываем доступ к следующему этапу и запоминаем карту выбранную последней
      } else {
        if(jQuery(this).hasClass('tarot_card_reject')){
          sweetAlert("Открыто 3 карты", "Разрешается открыть только 3 карты на поле!", "info");
        }
      };
    // Если выложены не все карты выкладываем следующую карту
    } else if(jQuery(this).hasClass('tarot_has_card') && Object.keys(tarot_cards).length > 0){
      sweetAlert("Не все ячейки заполнены", "Перед открытием карт необходимо заполнить все ячейки!", "info");
    // Выкладка карты в ячейку
    } else {
      tarot_cur_cell = jQuery(this);
      jQuery(this).addClass('tarot_has_card');
      tarot_randomizer(tarot_cur_cell);
    }
  });
  // Клик по ячейке в режиме открытых карт
  jQuery('.hex.tarot_open_item').on('click', function(event) {
      prot_card = jQuery(this).find('.hexagon-in2').find('a').attr('href');
      // console.log(prot_card);
      localStorage.setItem('prot_card', prot_card);
  }); 
  // Переход к загрузке фото
  jQuery( ".tarot_sucess, .elem-to-load, .tarot_open_item" ).click(function() {
    toElemChoice('.first_slide, .tarot_to_photo, .elem-choice', function() {
      jQuery( '.second_slide' ).removeClass('hidden').addClass('animated fadeInDown');
    });
  });
  jQuery('.tarot_sucess').on('click', function(event) {
    jQuery('.cards_opened').modal('show');
  });
  // Если фото уже загружено
  if(jQuery('.tarot_returned_img')){
    //Получение данных из локального хранилища
    if(supportsStorage){
      prot_card = localStorage.getItem('prot_card');
      prot_type = localStorage.getItem('prot_type');
      elem_type = localStorage.getItem('elem_type');
    }
    console.log(prot_type);
    jQuery('.four_slide').removeClass('hidden');
    jQuery('.elems_devil-client, .elems_returned_img').css('background', 'url('+jQuery(".tarot_returned_img").attr('src')+') no-repeat top left/100%');
    if(prot_type == 'tarot'){
      // jQuery('.four_slide').removeClass('hidden');
      jQuery('.tarot_prots').removeClass('hidden');
    } else if(prot_type == 'elements') {
      // jQuery('.four_slide').removeClass('hidden');
      jQuery('.elem_prots').removeClass('hidden');
      jQuery('.elems_devil-client, .elems_returned_img').css('background', 'url('+jQuery(".tarot_returned_img").attr('src')+') no-repeat top left/100%');
      if(elem_type == 'F'){
        jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url(/wp-content/themes/wizardtarot/images/gallery/62-Minor-Cups-Queen.png) no-repeat top left/100%');
      } else if (elem_type == 'W'){
        jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url(/wp-content/themes/wizardtarot/images/gallery/76-Minor-Wands-Queen.png) no-repeat top left/100%');
      } else if (elem_type == 'A'){
        jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url(/wp-content/themes/wizardtarot/images/gallery/34-Minor-Discs-Queen.png) no-repeat top left/100%');
      } else if (elem_type == 'E'){
        jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url(/wp-content/themes/wizardtarot/images/gallery/48-Minor-Swords-Queen.png) no-repeat top left/100%');
      };
      var devil_w = parseInt(jQuery('.elems_devil-client').css('width'));
      jQuery('.elems_devil-client, .elems_devil-devil, .elems_graph').css('height', (devil_w * 1.5)+'px');
      // console.log("devil_w "+devil_w)
    }
  }

  jQuery('.tarot_from_devil').on('click', function(event) {
    jQuery('.four_slide').addClass('hidden');
    jQuery('.third_slide').removeClass('hidden');
    jQuery('.tarot_prot_returned').css('background', 'url('+jQuery(".tarot_returned_img").attr('src')+') no-repeat top left/100%');
    jQuery('.tarot_prot_card').css('background', 'url('+prot_card+') no-repeat top left/100%');
    var tarto_scene = parseInt(jQuery('.tarot_scene').css('width'));
    jQuery('.tarot_scene, .progress_wrap').css('height', (tarto_scene * 1.5)+'px');
    jQuery('.progress2').css('top', (tarto_scene * 1.5)/2-10+'px');
  });
  //На шаг назад
  jQuery('.tarot_back').on('click', function(event) {
      localStorage.setItem('backStatus', 'true');
      window.location.href = '/';
  });
  tarot = function(){
  //фаза 1
    reloadTime1 = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.progress').css('opacity', 1);
    phaseOne = setInterval(function(){
      if (count_animation <= 860){                                                                         //90
        count_animation += 1;
        jQuery('.chart').data('easyPieChart').update(count_animation / 8.6);
        jQuery('.chart').find('span').text(Math.round(count_animation / 8.6).toFixed(0));
    } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.chart').data('easyPieChart').update(100);
        jQuery('.chart').find('span').text('100');
        count_animation = 1;
        jQuery('.tarot_to_photo').removeClass('hidden');
        jQuery('.progress').css('opacity', 0);
        onEnd();
        }
    }, 1000);
  };
  elems = function(){
      e_solar = '#fff url(/wp-content/themes/wizardtarot/images/gallery/solar.png) 0 0/100% no-repeat'
    if(elem_type == 'cup'){
      e_one = jQuery('#draggable41');
      e_two = jQuery('#draggable31');
      e_dama = '#fff url(/wp-content/themes/wizardtarot/images/gallery/62-Minor-Cups-Queen.png) 0 0/100% no-repeat'
      e_king = '#fff url(/wp-content/themes/wizardtarot/images/gallery/63-Minor-Cups-King.png) 0 0/100% no-repeat'
      e_paje = '#fff url(/wp-content/themes/wizardtarot/images/gallery/60-Minor-Cups-Page.png) 0 0/100% no-repeat'
      e_knight = '#fff url(/wp-content/themes/wizardtarot/images/gallery/61-Minor-Cups-Knight.png) 0 0/100% no-repeat'
    } else if (elem_type == 'jezl'){
      e_one = jQuery('#draggable21');
      e_two = jQuery('#draggable51');
      e_dama = '#fff url(/wp-content/themes/wizardtarot/images/gallery/76-Minor-Wands-Queen.png) 0 0/100% no-repeat'
      e_king = '#fff url(/wp-content/themes/wizardtarot/images/gallery/77-Minor-Wands-King.png) 0 0/100% no-repeat'
      e_paje = '#fff url(/wp-content/themes/wizardtarot/images/gallery/74-Minor-Wands-Page.png) 0 0/100% no-repeat'
      e_knight = '#fff url(/wp-content/themes/wizardtarot/images/gallery/75-Minor-Wands-Knight.png) 0 0/100% no-repeat'
    } else if (elem_type == 'pentacle'){
      e_one = jQuery('#draggable51');
      e_two = jQuery('#draggable21');
      e_dama = '#fff url(/wp-content/themes/wizardtarot/images/gallery/34-Minor-Discs-Queen.png) 0 0/100% no-repeat'
      e_king = '#fff url(/wp-content/themes/wizardtarot/images/gallery/35-Minor-Discs-King.png) 0 0/100% no-repeat'
      e_paje = '#fff url(/wp-content/themes/wizardtarot/images/gallery/32-Minor-Discs-Page.png) 0 0/100% no-repeat'
      e_knight = '#fff url(/wp-content/themes/wizardtarot/images/gallery/33-Minor-Discs-Knight.png) 0 0/100% no-repeat'
    } else if (elem_type == 'sword'){
      e_one = jQuery('#draggable31');
      e_two = jQuery('#draggable41');
      e_dama = '#fff url(/wp-content/themes/wizardtarot/images/gallery/48-Minor-Swords-Queen.png) 0 0/100% no-repeat'
      e_king = '#fff url(/wp-content/themes/wizardtarot/images/gallery/49-Minor-Swords-King.png) 0 0/100% no-repeat'
      e_paje = '#fff url(/wp-content/themes/wizardtarot/images/gallery/46-Minor-Swords-Page.png) 0 0/100% no-repeat'
      e_knight = '#fff url(/wp-content/themes/wizardtarot/images/gallery/47-Minor-Swords-Knight.png) 0 0/100% no-repeat'
    };
//фаза 1
    reloadTime1 = 0;
    cur_animation_val = 0;
    count_animation = 1;
    console.log('test');
    phaseOne = setInterval(function(){
      if (count_animation <= 960){                                                                         //90
        if (count_animation == 1){
          e_one.css({
            background: '#fff url(/wp-content/themes/wizardtarot/images/life_vater.png) 0 0/100% no-repeat',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            zIndex: '1000'
          });
          // e_one.css('marginTop', parseInt(jQuery('#draggable31').css('top'))/2+'px');
          jQuery('.elem_card_5').css('background', e_dama);
          jQuery('.elem_card_4').css('background', e_king);
          jQuery('.elem_card_3').css('background', e_paje);
          jQuery('.elem_card_2').css('background', e_knight);
          jQuery('.elem_card_1').css('background', e_solar);
          jQuery('.first_cards_1').removeClass('hidden');
          var card_img_w = parseInt(jQuery('.first_cards_1').css('width'));
          jQuery('.elem_card_place').css('height', (card_img_w * 1.5)+'px');
          jQuery('.first_cards').css('width', (card_img_w * 5+80)+'px');
          jQuery('.first_cards').css('top', parseInt(e_one.css('top')) - (parseInt(jQuery('.first_cards').css('height'))/3.5) +'px');
        } else if (count_animation == 8) {
          jQuery('.first_cards_5').removeClass('hidden');
        } else if (count_animation == 16) {
          jQuery('.first_cards_4').removeClass('hidden');
        } else if (count_animation == 24) {
          jQuery('.first_cards_3').removeClass('hidden');
        } else if (count_animation == 32) {
          jQuery('.first_cards_2').removeClass('hidden');
          jQuery('.second_cards').css('width', jQuery('.first_cards').css('width')+'px');
          jQuery('.second_cards').css('width', (card_img_w * 5+80)+'px');
        } else if (count_animation == 480){
          e_one.css({
            background: 'rgba(255,255,255, 0.5)',
            color: 'crimson',
            borderColor: 'crimson',
            opacity: 1,
            borderWidth: '1px',
            zIndex: '1'
          });
          e_two.css({
            background: '#fff url(/wp-content/themes/wizardtarot/images/life_vater.png) 0 0/100% no-repeat',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            zIndex: '1000'
          });
          jQuery('.elem_card_place').css('height', (card_img_w * 1.5)+'px');
          jQuery('.second_cards')
            .removeClass('hidden')
            .css('top', parseInt(e_two.css('top')) - (parseInt(jQuery('.second_cards').css('height'))/3.5+35) +'px');
          jQuery('.first_cards_1, .first_cards_2, .first_cards_3, .first_cards_4, .first_cards_5').addClass('hidden');
          jQuery('.second_cards_2').removeClass('hidden');
        } else if (count_animation == 488) {
          jQuery('.second_cards_3').removeClass('hidden');
        } else if (count_animation == 496) {
          jQuery('.second_cards_4').removeClass('hidden');
        } else if (count_animation == 504) {
          jQuery('.second_cards_5').removeClass('hidden');
        } else if (count_animation == 512) {
          jQuery('.second_cards_1').removeClass('hidden');
        }
        count_animation += 1;
        jQuery('.chartTwo').data('easyPieChart').update(count_animation / 9.6);
        jQuery('.chartTwo').find('span').text(Math.round(count_animation / 9.6).toFixed(0));
      } else {
        e_two.css({
          background: 'rgba(255,255,255, 0.5)',
          color: 'crimson',
          borderColor: 'crimson',
          opacity: 1,
          borderWidth: '1px',
          zIndex: '1'
        });
        jQuery('.second_cards_1, .second_cards_2, .second_cards_3, .second_cards_4, .second_cards_5').addClass('hidden');
        clearInterval(phaseOne);
        onEnd();
        jQuery('.chartTwo').data('easyPieChart').update(100);
        jQuery('.chartTwo').find('span').text('100');
        jQuery('.elem_prot_stop').addClass('hidden');
        jQuery('.elem_prot_start').removeClass('hidden');
      }
    }, 250);
  };
  if(supportsStorage && localStorage.getItem('prot_type')){
      prot_type = localStorage.getItem('prot_type');
      elem_type = localStorage.getItem('elem_type');
      // console.log(prot_type+' '+elem_type);
  }
  jQuery('.tarot_start').on('click', function(event) {
      checkPoints()
      if(pointsStatus == false){
        swal("Не все зоны перенесены", "Перед началом процедуры необходимо перенести все зоны", "info");
      } else {
        if(prot_type == 'tarot'){
          tarot();
          jQuery('.tarot_to_photo').addClass('hidden');
        }
      }
  });
  jQuery('.elem_prot_start').on('click', function(event) {
      pointsStatusElems = false;
      checkPointsElems()
      if(pointsStatusElems == false){
        swal("Не все зоны перенесены", "Перед началом процедуры необходимо перенести все зоны", "info");
      } else {
        if(prot_type == 'elements'){
          jQuery(this).addClass('hidden');
          elems();
          jQuery('.elem_prot_stop').removeClass('hidden')
        }
      }
  });
  jQuery('.elem_prot_stop').on('click', function(event) {
      pointsStatusElems = false;
      clearInterval(phaseOne);
      jQuery(this).addClass('hidden');
      jQuery('.first_cards_1, .first_cards_2, .first_cards_3, .first_cards_4, .first_cards_5').addClass('hidden');
      jQuery('.second_cards_1, .second_cards_2, .second_cards_3, .second_cards_4, .second_cards_5').addClass('hidden');
      jQuery('.elem_prot_start').removeClass('hidden');
      jQuery('.cards_wrapper').addClass('hidden');
      jQuery('.chartTwo').data('easyPieChart').update(0);
      jQuery('.chartTwo').find('span').text('0');
      jQuery('.elems_zone').css({
        background: 'rgba(255,255,255, 0.5)',
        color: 'crimson',
        borderColor: 'crimson',
        opacity: 1,
        borderWidth: '1px',
        zIndex: '1'
      });
  });



//CROPPING SCRIPT
    // convert bytes into friendly format
    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB'];
        if (bytes == 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };

    // check for selected crop region
    function checkForm() {
        if (parseInt(jQuery('#w').val())) return true;
        jQuery('.error').html('Пожалуйста выделите область').show();
        return false;
    };

    // update info by cropping (onChange and onSelect events handler)
    function updateInfo(e) {
        jQuery('#x1').val(e.x);
        jQuery('#y1').val(e.y);
        jQuery('#x2').val(e.x2);
        jQuery('#y2').val(e.y2);
        jQuery('#w').val(e.w);
        jQuery('#h').val(e.h);
    };

    // clear info by cropping (onRelease event handler)
    function clearInfo() {
        jQuery('.info #w').val('');
        jQuery('.info #h').val('');
    };

    // Create variables (in this scope) to hold the Jcrop API and image size
    var jcrop_api, boundx, boundy;

    function fileSelectHandler() {

        // get selected file
        var oFile = jQuery('#image_file')[0].files[0];
        // console.log(oFile);
        // hide all errors
        jQuery('.error').hide();

        // check for image type (jpg and png are allowed)
        var rFilter = /^(image\/jpeg|image\/png)$/i;
        if (! rFilter.test(oFile.type)) {
            jQuery('.error').html('Доспустимы изображения только в формате ".jpg" и ".png"').show();
            return;
        }

        // check for file size
        if (oFile.size > 15 * 1024 * 1024) {
            jQuery('.error').html('Вы выбрали слишком большой файл, пожалуйста выберите изображение меньшего размера.').show();
            return;
        }

        // preview element
        var oImage = document.getElementById('preview');

        // prepare HTML5 FileReader
        var oReader = new FileReader();

        oReader.onload = function(e) {

            EXIF.getData(oFile, function(){

                var ort = this.exifdata.Orientation;

                // e.target.result contains the DataURL which we can use as a source of the image
                oImage.src = e.target.result;
                oImage.onload = function () {

                    var rotateImg = function(rad, rotateCanvas, cx, cy){
                        var canvas = document.createElement('canvas'),
//                        var canvas = document.getElementById('preview-canvas'),
                            ctx = canvas.getContext('2d');

                        if(rotateCanvas){
                            canvas.setAttribute('width', oImage.naturalHeight);
                            canvas.setAttribute('height', oImage.naturalWidth);
                        }else{
                            canvas.setAttribute('width', oImage.naturalWidth);
                            canvas.setAttribute('height', oImage.naturalHeight);
                        }

                        ctx.rotate(rad);
                        ctx.drawImage(oImage, cx, cy);

                        ort = 1;

                        oImage.src = canvas.toDataURL("image/png");
                    };

                    switch(ort){
                       case 6:
                           rotateImg(90 * Math.PI / 180, true, 0, oImage.naturalHeight * -1);
                           break;
                       case 3:
                           rotateImg(180 * Math.PI / 180, false, oImage.naturalWidth * -1, oImage.naturalHeight * -1);
                           break;
                       case 8:
                           rotateImg(-90 * Math.PI / 180, true, oImage.naturalWidth * -1, 0);
                           break;
                    }


                    // display step 2
                    jQuery('.step2').fadeIn(500);
                    jQuery('.btn__crop').removeClass('hidden');
                    // display some basic image info
                    var sResultFileSize = bytesToSize(oFile.size);
                    jQuery('#filesize').val(sResultFileSize);
                    jQuery('#filetype').val(oFile.type);
                    jQuery('#filedim').val(oImage.naturalWidth + ' x ' + oImage.naturalHeight);

                    // destroy Jcrop if it is existed
                    if (typeof jcrop_api != 'undefined') {
                        jcrop_api.destroy();
                        jcrop_api = null;
                        jQuery('#preview').width(oImage.naturalWidth);
                        jQuery('#preview').height(oImage.naturalHeight);
                    }

                    setTimeout(function(){
                        // initialize Jcrop
                        jQuery('#preview').Jcrop({
                            minSize: [32, 32],// keep aspect ratio 1:1
                            bgFade: true, // use fade effect
                            bgOpacity: .3, // fade opacity
                            aspectRatio: 1/1.5,
                            onChange: updateInfo,
                            onSelect: updateInfo,
                            onRelease: clearInfo
                        }, function(){

                            // use the Jcrop API to get the real image size
                            var bounds = this.getBounds();
                            boundx = bounds[0];
                            boundy = bounds[1];

                            // Store the Jcrop API in the jcrop_api variable
                            jcrop_api = this;
                        });
                    },3000);
                };
            });
        };
        // read selected file as DataURL
        oReader.readAsDataURL(oFile);
    }
    jQuery('#image_file').on('change', fileSelectHandler);
});
jQuery(function() {
  jQuery('.chart').easyPieChart({
     lineWidth: 3,
     size: 110
  });
  jQuery('.chartTwo').easyPieChart({
     lineWidth: 3,
     size: 110
  });
  knifeDateOld = new Date();
  jQuery( "#devil_move" ).draggable({ 
    containment: "#elems_devil-devil",
    axis: "y",
    drag: function() {
      if(jQuery('.btn__graf').hasClass('active')){
        knife = jQuery('.devil_move').css('top');
        knife = knife.substr(0, knife.length - 2);
        knifeDate = new Date();
        knifeDateDiff = knifeDate - knifeDateOld;
        knife_rate_class = 'knife_rate-'+knife;
        knife_rate_class_dotted = '.knife_rate-'+knife;
        jQuery('.elems_graph').append('<div class='+knife_rate_class+'></div>');
        jQuery(knife_rate_class_dotted).addClass('knife_rate').css({
            top: +knife+45+'px',
            width: knifeDateDiff*2+'px'
        });
        knifeDateOld = knifeDate;
      }
    }
  });
   
});


jQuery(window).resize(function(event) {
  devil_w = parseInt(jQuery('.elems_devil-client').css('width'));
  jQuery('.elems_devil-client, .elems_devil-devil, .elems_graph').css('height', (devil_w * 1.5)+'px');
  card_img_w = parseInt(jQuery('.elem_card_place').css('width'));
  jQuery('.elem_card_place').css('height', (card_img_w * 1.5)+'px');
  elem_img_w = parseInt(jQuery('.elems_returned_img').css('width'));
  jQuery('.elems_returned_img').css('height', (elem_img_w * 1.5)+'px');
  tarto_scene = parseInt(jQuery('.tarot_scene').css('width'));
  jQuery('.tarot_scene, .progress_wrap').css('height', (tarto_scene * 1.5)+'px');
  jQuery('.progress2').css('top', (tarto_scene * 1.5)/2-10+'px');
})
