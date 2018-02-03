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
  prot_type,
  elem_type,
  prot_card,
  pointsStatus = true,
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
  
  jQuery( ".btn-elements" ).click(function() {
    localStorage.setItem('backStatus', 'false');
    toElemChoice('.prot-choice', function() {
      jQuery( '.elem-choice' ).removeClass('hidden').addClass('animated fadeInDown');
      localStorage.setItem('prot_type', 'elements');
    });
  });
  jQuery('.home').on('click', function(event) {
    localStorage.setItem('backStatus', 'false');
  });
  jQuery( ".btn-tarot" ).click(function() {
    localStorage.setItem('backStatus', 'false');
    toElemChoice('.prot-choice', function() {
      jQuery( '.tarot-choice' ).removeClass('hidden').addClass('animated fadeInDown');
      localStorage.setItem('prot_type', 'tarot');
    });
  });
  jQuery( ".btn-tarot_open" ).click(function() {
    localStorage.setItem('backStatus', 'false');
    toElemChoice('.prot-choice', function() {
      jQuery( '.tarot-choice_open' ).removeClass('hidden').addClass('animated fadeInDown');
      localStorage.setItem('prot_type', 'tarot');
    });
  });
  jQuery( ".elem-choice-item" ).on('click', function(event) {
    elem_type = jQuery(this).data('elem');
    console.log('Элемент '+ jQuery(this).data('elem'));
    localStorage.setItem('elem_type', elem_type);
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
      if (tarot_cards_count <= 3 && jQuery(this).hasClass('tarot_card_reject')) {
        tarot_cards_count ++;
        jQuery(this).removeClass('tarot_card_reject');
        jQuery(this).find('.hexagon-in2').removeClass('tarot_full_cell');
        tarot_devil_cell.find('.hexagon-in2').removeClass('tarot_devil_cell');
        // Показ кнопки перехода к загрузке фото
        if (tarot_cards_count == 4) {
          jQuery('.tarot_to_photo').removeClass('hidden');
          prot_card = jQuery(this).find('.hexagon-in2').find('a').attr('href');
          localStorage.setItem('prot_card', prot_card);
        };
      // Если открыто 3 карты запрещаем дальнейшее открытие карт
      // Открываем доступ к следующему этапу и запоминаем карту выбранную последней
      } else {
        if(jQuery(this).hasClass('tarot_card_reject')){
          sweetAlert("Открыто 2 карты", "Разрешается открыть только 2 карты на поле!", "info");
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
      console.log(prot_card);
      localStorage.setItem('prot_card', prot_card);
  }); 
  // Переход к загрузке фото
  jQuery( ".tarot_sucess, .elem-to-load, .tarot_open_item" ).click(function() {
    toElemChoice('.first_slide, .tarot_to_photo, .elem-choice', function() {
      jQuery( '.second_slide' ).removeClass('hidden').addClass('animated fadeInDown');
    });
  });
  // Если фото уже загружено
  if(jQuery('.tarot_returned_img')){
    //Получение данных из локального хранилища
    if(supportsStorage && localStorage.getItem('prot_card')){
      prot_card = localStorage.getItem('prot_card');
      prot_type = localStorage.getItem('prot_type');
      elem_type = localStorage.getItem('elem_type');
    }
    console.log(prot_card);
    if(prot_type == 'tarot'){
      jQuery('.third_slide').removeClass('hidden');
      jQuery('.tarot_prot_returned').css('background', 'url('+jQuery(".tarot_returned_img").attr('src')+') no-repeat top left/100%');
      jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url('+prot_card+') no-repeat top left/100%');
    } else if(prot_type == 'elements') {
      jQuery('.four_slide').removeClass('hidden');
      jQuery('.elems_devil-client').css('background', 'url('+jQuery(".tarot_returned_img").attr('src')+') no-repeat top left/100%');
      // if(elem_type == 'F'){
      //   jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url(/wp-content/themes/wizardtarot/images/gallery/62-Minor-Cups-Queen.png) no-repeat top left/100%');
      // } else if (elem_type == 'W'){
      //   jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url(/wp-content/themes/wizardtarot/images/gallery/76-Minor-Wands-Queen.png) no-repeat top left/100%');
      // } else if (elem_type == 'A'){
      //   jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url(/wp-content/themes/wizardtarot/images/gallery/34-Minor-Discs-Queen.png) no-repeat top left/100%');
      // } else if (elem_type == 'E'){
      //   jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url(/wp-content/themes/wizardtarot/images/gallery/48-Minor-Swords-Queen.png) no-repeat top left/100%');
      // };
    }
    var devil_w = parseInt(jQuery('.elems_devil-client').css('width'));
    jQuery('.elems_devil-client, .elems_devil-devil').css('height', (devil_w * 1.5)+'px');
  }
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
    phaseOne = setInterval(function(){
      if (count_animation <= 960){                                                                         //90
        count_animation += 1;
        cur_animation_val += 6;
        jQuery('#draggable1, #draggable0, #draggable2, #draggable3').css({
          borderColor: 'transparent',
          zIndex: '1000',
          color: 'transparent'
        });
        jQuery('#draggable2, #draggable3').css({
          transform: 'rotate('+cur_animation_val+'deg)',
          background: '#fff url(/wp-content/themes/wizardtarot/images/superdisfunction.png) 0 0/100% no-repeat'
        });
        jQuery('.chart').data('easyPieChart').update(20);
        jQuery('.chart').find('span').text('20');
        cur_let = Math.round(Math.random() * (7 - 0))
        jQuery('#draggable1').text(letters[cur_let]);
        jQuery('#draggable1').css({
          background: 'url(/wp-content/themes/wizardtarot/images/oct_2.png) 0 0/100% no-repeat',
          color: '#000',
          transform: 'scale(1.3) rotateY(180deg)',
          paddingTop: '15px'
        });
        jQuery('#draggable0').css({
          transform: 'rotate('+cur_animation_val+'deg)',
          background: '#fff url(/wp-content/themes/wizardtarot/images/daemon.png) 0 0/100% no-repeat'
        });
    } else {
        clearInterval(phaseOne);
        jQuery('#draggable1, #draggable0, #draggable2, #draggable3').css({
          background: 'rgba(255,255,255, 0.5)',
          color: 'crimson',
          borderColor: 'crimson',
          zIndex: '1',
          transform: 'scale(1)',
          paddingTop: '14px'
        });
        jQuery('#draggable1').text('D+');
        jQuery('.chart').data('easyPieChart').update(50);
        jQuery('.chart').find('span').text('50');
    //фаза 2
        reloadTime1 = 0;
        cur_animation_val = 0;
        count_animation = 1;
        phaseOne = setInterval(function(){
          if (count_animation <= 960){                                                                         //90
            count_animation += 1;
            cur_animation_val += 6;
            jQuery('#draggable6, #draggable5, #draggable8').css({
              borderColor: 'transparent',
              zIndex: '1000',
              color: 'transparent'
            });
            jQuery('#draggable6').css({
              background: 'url(/wp-content/themes/wizardtarot/images/nerazd.png) center top / 90% no-repeat'
            });
            jQuery('#draggable8').css({
              background: 'url(/wp-content/themes/wizardtarot/images/nerazd_002.png) center top / 100% no-repeat'
            });
            jQuery('#draggable5').css({
              transform: 'rotate('+cur_animation_val+'deg)',
              background: '#fff url(/wp-content/themes/wizardtarot/images/superdisfunction.png) 0 0/100% no-repeat'
            });
            jQuery('.chart').data('easyPieChart').update(40);
            jQuery('.chart').find('span').text('40');
        } else {
            clearInterval(phaseOne);
            jQuery('#draggable6, #draggable5, #draggable8').css({
              background: 'rgba(255,255,255, 0.5)',
              color: 'crimson',
              borderColor: 'crimson',
              zIndex: '1'
            });
//фаза 3
        reloadTime1 = 0;
        cur_animation_val = 0;
        count_animation = 1;
        //Этап 3-1-1
            phaseSeven_one = setInterval(function(){
                if (count_animation <= 22){                                                                         //22
                    cur_animation_val += 1.5;
                    jQuery('#draggable8').css({
                        transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                        background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                        color: 'transparent',
                        borderColor: 'transparent',
                        opacity: 0.8,
                        borderWidth: '1px',
                        paddingTop: '14px',
                        zIndex: '1000'
                    });
                    count_animation += 1;
                } else if(count_animation <= 39) {                                                         //39
                    count_animation += 1;
                } else {
                    clearInterval(phaseSeven_one);
                    count_animation = 1;
                    jQuery('#draggable8').css({
                        transform: 'rotate(-'+0+'deg) scale(1)',
                        background: 'rgba(255,255,255, 0.5)',
                        color: 'red',
                        borderColor: 'red',
                        opacity: 1,
                        borderWidth: '1px',
                        paddingTop: '14px',
                        zIndex: '1'
                    });
                    jQuery('.chart').data('easyPieChart').update(47);
                    jQuery('.chart').find('span').text('47');
        //Этап 3-1-2
                    cur_animation_val = 10;
                    count_animation = 1;
                    phaseSeven_one = setInterval(function(){
                        if (count_animation <= 53){                                                                         //53
                            cur_animation_val += 1.5;
                            jQuery('#draggable8').css({
                                transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                color: 'transparent',
                                borderColor: 'transparent',
                                opacity: 0.8,
                                borderWidth: '1px',
                                paddingTop: '14px',
                                zIndex: '1000'
                            });
                            count_animation += 1;
                        } else if(count_animation <= 70) {                                                         //70
                            count_animation += 1;
                        } else {
                            clearInterval(phaseSeven_one);
                            count_animation = 1;
                            jQuery('#draggable8').css({
                                transform: 'rotate(-'+0+'deg) scale(1)',
                                background: 'rgba(255,255,255, 0.5)',
                                color: 'red',
                                borderColor: 'red',
                                opacity: 1,
                                borderWidth: '1px',
                                paddingTop: '14px',
                                zIndex: '1'
                            });
                            jQuery('.chart').data('easyPieChart').update(54);
                            jQuery('.chart').find('span').text('54');
        //Этап 3-1-3
                            cur_animation_val = 270;
                            count_animation = 1;
                            phaseSeven_one = setInterval(function(){
                                if (count_animation <= 60){                                                                         //60
                                    cur_animation_val += 1.5;
                                    jQuery('#draggable8').css({
                                        transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                        background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                        color: 'transparent',
                                        borderColor: 'transparent',
                                        opacity: 0.8,
                                        borderWidth: '1px',
                                        paddingTop: '14px',
                                        zIndex: '1000'
                                    });
                                    count_animation += 1;
                                } else if(count_animation <= 77) {                                                         //77
                                    count_animation += 1;
                                } else {
                                    clearInterval(phaseSeven_one);
                                    count_animation = 1;
                                    jQuery('#draggable8').css({
                                        transform: 'rotate(-'+0+'deg) scale(1)',
                                        background: 'rgba(255,255,255, 0.5)',
                                        color: 'red',
                                        borderColor: 'red',
                                        opacity: 1,
                                        borderWidth: '1px',
                                        paddingTop: '14px',
                                        zIndex: '1'
                                    });
                                    jQuery('.chart').data('easyPieChart').update(61);
                                    jQuery('.chart').find('span').text('61');
        //Этап 3-1-4
                                    cur_animation_val = 300;
                                    count_animation = 1;
                                    phaseSeven_one = setInterval(function(){
                                        if (count_animation <= 40){                                                                         //40
                                            cur_animation_val += 1.5;
                                            jQuery('#draggable8').css({
                                                transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                color: 'transparent',
                                                borderColor: 'transparent',
                                                opacity: 0.8,
                                                borderWidth: '1px',
                                                paddingTop: '14px',
                                                zIndex: '1000'
                                            });
                                            count_animation += 1;
                                        } else if(count_animation <= 57) {                                                         //57
                                            count_animation += 1;
                                        } else {
                                            clearInterval(phaseSeven_one);
                                            count_animation = 1;
                                            jQuery('#draggable8').css({
                                                transform: 'rotate(-'+0+'deg) scale(1)',
                                                background: 'rgba(255,255,255, 0.5)',
                                                color: 'red',
                                                borderColor: 'red',
                                                opacity: 1,
                                                borderWidth: '1px',
                                                paddingTop: '14px',
                                                zIndex: '1'
                                            });
                                            jQuery('.chart').data('easyPieChart').update(68);
                                            jQuery('.chart').find('span').text('68');
        //Этап 3-2-1
                                            cur_animation_val = 55;
                                            count_animation = 1;
                                            phaseSeven_one = setInterval(function(){
                                                if (count_animation <= 22){                                                                         //22
                                                    cur_animation_val += 1.5;
                                                    jQuery('#draggable6').css({
                                                        transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                        background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                        color: 'transparent',
                                                        borderColor: 'transparent',
                                                        opacity: 0.8,
                                                        borderWidth: '1px',
                                                        paddingTop: '14px',
                                                        zIndex: '1000'
                                                    });
                                                    count_animation += 1;
                                                } else if(count_animation <= 39) {                                                         //39
                                                    count_animation += 1;
                                                } else {
                                                    clearInterval(phaseSeven_one);
                                                    count_animation = 1;
                                                    jQuery('#draggable6').css({
                                                        transform: 'rotate(-'+0+'deg) scale(1)',
                                                        background: 'rgba(255,255,255, 0.5)',
                                                        color: 'red',
                                                        borderColor: 'red',
                                                        opacity: 1,
                                                        borderWidth: '1px',
                                                        paddingTop: '14px',
                                                        zIndex: '1'
                                                    });
                                                    jQuery('.chart').data('easyPieChart').update(75);
                                                    jQuery('.chart').find('span').text('75');
                                //Этап 3-2-2
                                                    cur_animation_val = 10;
                                                    count_animation = 1;
                                                    phaseSeven_one = setInterval(function(){
                                                        if (count_animation <= 53){                                                                         //53
                                                            cur_animation_val += 1.5;
                                                            jQuery('#draggable6').css({
                                                                transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                color: 'transparent',
                                                                borderColor: 'transparent',
                                                                opacity: 0.8,
                                                                borderWidth: '1px',
                                                                paddingTop: '14px',
                                                                zIndex: '1000'
                                                            });
                                                            count_animation += 1;
                                                        } else if(count_animation <= 70) {                                                         //70
                                                            count_animation += 1;
                                                        } else {
                                                            clearInterval(phaseSeven_one);
                                                            count_animation = 1;
                                                            jQuery('#draggable6').css({
                                                                transform: 'rotate(-'+0+'deg) scale(1)',
                                                                background: 'rgba(255,255,255, 0.5)',
                                                                color: 'red',
                                                                borderColor: 'red',
                                                                opacity: 1,
                                                                borderWidth: '1px',
                                                                paddingTop: '14px',
                                                                zIndex: '1'
                                                            });
                                                            jQuery('.chart').data('easyPieChart').update(82);
                                                            jQuery('.chart').find('span').text('82');
                                //Этап 3-2-3
                                                            cur_animation_val = 270;
                                                            count_animation = 1;
                                                            phaseSeven_one = setInterval(function(){
                                                                if (count_animation <= 60){                                                                         //60
                                                                    cur_animation_val += 1.5;
                                                                    jQuery('#draggable6').css({
                                                                        transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                        background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                        color: 'transparent',
                                                                        borderColor: 'transparent',
                                                                        opacity: 0.8,
                                                                        borderWidth: '1px',
                                                                        paddingTop: '14px',
                                                                        zIndex: '1000'
                                                                    });
                                                                    count_animation += 1;
                                                                } else if(count_animation <= 77) {                                                         //77
                                                                    count_animation += 1;
                                                                } else {
                                                                    clearInterval(phaseSeven_one);
                                                                    count_animation = 1;
                                                                    jQuery('#draggable6').css({
                                                                        transform: 'rotate(-'+0+'deg) scale(1)',
                                                                        background: 'rgba(255,255,255, 0.5)',
                                                                        color: 'red',
                                                                        borderColor: 'red',
                                                                        opacity: 1,
                                                                        borderWidth: '1px',
                                                                        paddingTop: '14px',
                                                                        zIndex: '1'
                                                                    });
                                                                    jQuery('.chart').data('easyPieChart').update(89);
                                                                    jQuery('.chart').find('span').text('89');
                                //Этап 3-2-4
                                                                    cur_animation_val = 300;
                                                                    count_animation = 1;
                                                                    phaseSeven_one = setInterval(function(){
                                                                        if (count_animation <= 40){                                                                         //40
                                                                            cur_animation_val += 1.5;
                                                                            jQuery('#draggable6').css({
                                                                                transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                color: 'transparent',
                                                                                borderColor: 'transparent',
                                                                                opacity: 0.8,
                                                                                borderWidth: '1px',
                                                                                paddingTop: '14px',
                                                                                zIndex: '1000'
                                                                            });
                                                                            count_animation += 1;
                                                                        } else if(count_animation <= 57) {                                                         //57
                                                                            count_animation += 1;
                                                                        } else {
                                                                            clearInterval(phaseSeven_one);
                                                                            count_animation = 1;
                                                                            jQuery('#draggable6').css({
                                                                                transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                background: 'rgba(255,255,255, 0.5)',
                                                                                color: 'red',
                                                                                borderColor: 'red',
                                                                                opacity: 1,
                                                                                borderWidth: '1px',
                                                                                paddingTop: '14px',
                                                                                zIndex: '1'
                                                                            });
                                                                            jQuery('.chart').data('easyPieChart').update(100);
                                                                            jQuery('.chart').find('span').text('100');
                                                                            count_animation = 1;
                                                                            onEnd();
                                                                        }
                                                                    }, 1000);
                                                                }
                                                            }, 1000);
                                                        }
                                                    }, 1000);
                                                }
                                            }, 1000);
                                        }
                                    }, 1000);
                                }
                            }, 1000);
                        }
                    }, 1000);
                }
            }, 1000);
          }
        }, 250);
      }
    }, 250);
  };
  elems = function(){
    if(elem_type == 'W'){
      e_one = '/wp-content/themes/wizardtarot/images/nerazd_002.png';
      e_two = '/wp-content/themes/wizardtarot/images/nerazd_002.png';
      e_dama = '/wp-content/themes/wizardtarot/images/gallery/62-Minor-Cups-Queen.png'
      e_king = '/wp-content/themes/wizardtarot/images/gallery/63-Minor-Cups-King.png'
      e_paje = '/wp-content/themes/wizardtarot/images/gallery/60-Minor-Cups-Page.png'
      e_knight = '/wp-content/themes/wizardtarot/images/gallery/61-Minor-Cups-Knight.png'
    } else if (elem_type == 'A'){
      e_one = '/wp-content/themes/wizardtarot/images/nerazd_002.png';
      e_two = '/wp-content/themes/wizardtarot/images/nerazd_002.png';
      e_dama = '/wp-content/themes/wizardtarot/images/gallery/76-Minor-Wands-Queen.png'
      e_king = '/wp-content/themes/wizardtarot/images/gallery/77-Minor-Wands-King.png'
      e_paje = '/wp-content/themes/wizardtarot/images/gallery/74-Minor-Wands-Page.png'
      e_knight = '/wp-content/themes/wizardtarot/images/gallery/75-Minor-Wands-Knight.png'
    } else if (elem_type == 'F'){
      e_one = '/wp-content/themes/wizardtarot/images/nerazd_002.png';
      e_two = '/wp-content/themes/wizardtarot/images/nerazd_002.png';
      e_dama = '/wp-content/themes/wizardtarot/images/gallery/34-Minor-Discs-Queen.png'
      e_king = '/wp-content/themes/wizardtarot/images/gallery/35-Minor-Discs-King.png'
      e_paje = '/wp-content/themes/wizardtarot/images/gallery/32-Minor-Discs-Page.png'
      e_knight = '/wp-content/themes/wizardtarot/images/gallery/33-Minor-Discs-Knight.png'
    } else if (elem_type == 'E'){
      e_one = '/wp-content/themes/wizardtarot/images/nerazd_002.png';
      e_two = '/wp-content/themes/wizardtarot/images/nerazd_002.png';
      e_dama = '/wp-content/themes/wizardtarot/images/gallery/48-Minor-Swords-Queen.png'
      e_king = '/wp-content/themes/wizardtarot/images/gallery/49-Minor-Swords-King.png'
      e_paje = '/wp-content/themes/wizardtarot/images/gallery/46-Minor-Swords-Page.png'
      e_knight = '/wp-content/themes/wizardtarot/images/gallery/47-Minor-Swords-Knight.png'
    };
//фаза 1
    jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url('+ e_dama +') no-repeat top left/100%');
    reloadTime1 = 0;
    cur_animation_val = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 480){                                                                         //90
        count_animation += 1;
        cur_animation_val += 6;
        jQuery('#draggable8, #draggable7, #draggable6').css({
          borderColor: 'transparent',
          zIndex: '1000',
          color: 'transparent'
        });
        if (count_animation <= 240){
          jQuery('#draggable8').css({
            background: 'url('+e_one+') 0 0/95% no-repeat',
            transform: 'scale(1.3)'
          });
        } else {
          jQuery('#draggable8').css({
            background: 'url('+e_two+') 0 0/95% no-repeat',
            transform: 'scale(1.3)'
          });
          jQuery('.chart').data('easyPieChart').update(3);
          jQuery('.chart').find('span').text('3');
        }
        jQuery('#draggable7').css({
          transform: 'rotate('+cur_animation_val+'deg)',
          background: '#fff url(/wp-content/themes/wizardtarot/images/superdisfunction.png) 0 0/100% no-repeat'
        });
        jQuery('#draggable6').css({
          background: 'url(/wp-content/themes/wizardtarot/images/nerazd.png) center top / 90% no-repeat'
        });
      } else {
        clearInterval(phaseOne);
        jQuery('#draggable8, #draggable7, #draggable6').css({
          background: 'rgba(255,255,255, 0.5)',
          color: 'crimson',
          borderColor: 'crimson',
          zIndex: '1',
          transform: 'scale(1)',
          paddingTop: '14px'
        });
        jQuery('.chart').data('easyPieChart').update(6);
        jQuery('.chart').find('span').text('6');
    //фаза 2
        reloadTime1 = 0;
        cur_animation_val = 0;
        count_animation = 1;
        phaseOne = setInterval(function(){
          if (count_animation <= 960){                                                                         //90
            count_animation += 1;
            cur_animation_val += 6;
            jQuery('#draggable1, #draggable0, #draggable2, #draggable3').css({
              borderColor: 'transparent',
              zIndex: '1000',
              color: 'transparent'
            });
            jQuery('#draggable2, #draggable3').css({
                transform: 'rotate('+cur_animation_val+'deg)',
                background: '#fff url(/wp-content/themes/wizardtarot/images/superdisfunction.png) 0 0/100% no-repeat'
            });
            jQuery('.chart').data('easyPieChart').update(7);
            jQuery('.chart').find('span').text('7');
            cur_let = Math.round(Math.random() * (7 - 0))
            jQuery('#draggable1').text(letters[cur_let]);
            jQuery('#draggable1').css({
              background: 'url(/wp-content/themes/wizardtarot/images/oct_2.png) 0 0/100% no-repeat',
              color: '#000',
              transform: 'scale(1.3) rotateY(180deg)',
              paddingTop: '14px'
            });
            jQuery('#draggable0').css({
              transform: 'rotate('+cur_animation_val+'deg)',
              background: '#fff url(/wp-content/themes/wizardtarot/images/daemon.png) 0 0/100% no-repeat'
            });
          } else {
            clearInterval(phaseOne);
            jQuery('#draggable1, #draggable0, #draggable2, #draggable3').css({
              background: 'rgba(255,255,255, 0.5)',
              color: 'crimson',
              borderColor: 'crimson',
              zIndex: '1',
              transform: 'scale(1)',
              paddingTop: '14px'
            });
            jQuery('#draggable1').text('D+');
            jQuery('.chart').data('easyPieChart').update(9);
            jQuery('.chart').find('span').text('9');
    //фаза 3
            reloadTime1 = 0;
            cur_animation_val = 0;
            count_animation = 1;
            //Этап 3-1-1
                phaseSeven_one = setInterval(function(){
                    if (count_animation <= 22){                                                                         //22
                        cur_animation_val += 1.5;
                        jQuery('#draggable8').css({
                            transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                            background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                            color: 'transparent',
                            borderColor: 'transparent',
                            opacity: 0.8,
                            borderWidth: '1px',
                            paddingTop: '14px',
                            zIndex: '1000'
                        });
                        count_animation += 1;
                    } else if(count_animation <= 39) {                                                         //39
                        count_animation += 1;
                    } else {
                        clearInterval(phaseSeven_one);
                        count_animation = 1;
                        jQuery('#draggable8').css({
                            transform: 'rotate(-'+0+'deg) scale(1)',
                            background: 'rgba(255,255,255, 0.5)',
                            color: 'red',
                            borderColor: 'red',
                            opacity: 1,
                            borderWidth: '1px',
                            paddingTop: '14px',
                            zIndex: '1'
                        });
                        jQuery('.chart').data('easyPieChart').update(11);
                        jQuery('.chart').find('span').text('11');
            //Этап 3-1-2
                        cur_animation_val = 10;
                        count_animation = 1;
                        phaseSeven_one = setInterval(function(){
                            if (count_animation <= 53){                                                                         //53
                                cur_animation_val += 1.5;
                                jQuery('#draggable8').css({
                                    transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                    background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                    color: 'transparent',
                                    borderColor: 'transparent',
                                    opacity: 0.8,
                                    borderWidth: '1px',
                                    paddingTop: '14px',
                                    zIndex: '1000'
                                });
                                count_animation += 1;
                            } else if(count_animation <= 70) {                                                         //70
                                count_animation += 1;
                            } else {
                                clearInterval(phaseSeven_one);
                                count_animation = 1;
                                jQuery('#draggable8').css({
                                    transform: 'rotate(-'+0+'deg) scale(1)',
                                    background: 'rgba(255,255,255, 0.5)',
                                    color: 'red',
                                    borderColor: 'red',
                                    opacity: 1,
                                    borderWidth: '1px',
                                    paddingTop: '14px',
                                    zIndex: '1'
                                });
                                jQuery('.chart').data('easyPieChart').update(13);
                                jQuery('.chart').find('span').text('13');
            //Этап 3-1-3
                                cur_animation_val = 270;
                                count_animation = 1;
                                phaseSeven_one = setInterval(function(){
                                    if (count_animation <= 60){                                                                         //60
                                        cur_animation_val += 1.5;
                                        jQuery('#draggable8').css({
                                            transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                            background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                            color: 'transparent',
                                            borderColor: 'transparent',
                                            opacity: 0.8,
                                            borderWidth: '1px',
                                            paddingTop: '14px',
                                            zIndex: '1000'
                                        });
                                        count_animation += 1;
                                    } else if(count_animation <= 77) {                                                         //77
                                        count_animation += 1;
                                    } else {
                                        clearInterval(phaseSeven_one);
                                        count_animation = 1;
                                        jQuery('#draggable8').css({
                                            transform: 'rotate(-'+0+'deg) scale(1)',
                                            background: 'rgba(255,255,255, 0.5)',
                                            color: 'red',
                                            borderColor: 'red',
                                            opacity: 1,
                                            borderWidth: '1px',
                                            paddingTop: '14px',
                                            zIndex: '1'
                                        });
                                        jQuery('.chart').data('easyPieChart').update(15);
                                        jQuery('.chart').find('span').text('15');
            //Этап 3-1-4
                                        cur_animation_val = 300;
                                        count_animation = 1;
                                        phaseSeven_one = setInterval(function(){
                                            if (count_animation <= 40){                                                                         //40
                                                cur_animation_val += 1.5;
                                                jQuery('#draggable8').css({
                                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                    background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                    color: 'transparent',
                                                    borderColor: 'transparent',
                                                    opacity: 0.8,
                                                    borderWidth: '1px',
                                                    paddingTop: '14px',
                                                    zIndex: '1000'
                                                });
                                                count_animation += 1;
                                            } else if(count_animation <= 57) {                                                         //57
                                                count_animation += 1;
                                            } else {
                                                clearInterval(phaseSeven_one);
                                                count_animation = 1;
                                                jQuery('#draggable8').css({
                                                    transform: 'rotate(-'+0+'deg) scale(1)',
                                                    background: 'rgba(255,255,255, 0.5)',
                                                    color: 'red',
                                                    borderColor: 'red',
                                                    opacity: 1,
                                                    borderWidth: '1px',
                                                    paddingTop: '14px',
                                                    zIndex: '1'
                                                });
                                                jQuery('.chart').data('easyPieChart').update(17);
                                                jQuery('.chart').find('span').text('17');
            //Этап 3-2-1
                                                cur_animation_val = 55;
                                                count_animation = 1;
                                                phaseSeven_one = setInterval(function(){
                                                    if (count_animation <= 22){                                                                         //22
                                                        cur_animation_val += 1.5;
                                                        jQuery('#draggable6').css({
                                                            transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                            background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                            color: 'transparent',
                                                            borderColor: 'transparent',
                                                            opacity: 0.8,
                                                            borderWidth: '1px',
                                                            paddingTop: '14px',
                                                            zIndex: '1000'
                                                        });
                                                        count_animation += 1;
                                                    } else if(count_animation <= 39) {                                                         //39
                                                        count_animation += 1;
                                                    } else {
                                                        clearInterval(phaseSeven_one);
                                                        count_animation = 1;
                                                        jQuery('#draggable6').css({
                                                            transform: 'rotate(-'+0+'deg) scale(1)',
                                                            background: 'rgba(255,255,255, 0.5)',
                                                            color: 'red',
                                                            borderColor: 'red',
                                                            opacity: 1,
                                                            borderWidth: '1px',
                                                            paddingTop: '14px',
                                                            zIndex: '1'
                                                        });
                                                        jQuery('.chart').data('easyPieChart').update(19);
                                                        jQuery('.chart').find('span').text('19');
                                    //Этап 3-2-2
                                                        cur_animation_val = 10;
                                                        count_animation = 1;
                                                        phaseSeven_one = setInterval(function(){
                                                            if (count_animation <= 53){                                                                         //53
                                                                cur_animation_val += 1.5;
                                                                jQuery('#draggable6').css({
                                                                    transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                    background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                    color: 'transparent',
                                                                    borderColor: 'transparent',
                                                                    opacity: 0.8,
                                                                    borderWidth: '1px',
                                                                    paddingTop: '14px',
                                                                    zIndex: '1000'
                                                                });
                                                                count_animation += 1;
                                                            } else if(count_animation <= 70) {                                                         //70
                                                                count_animation += 1;
                                                            } else {
                                                                clearInterval(phaseSeven_one);
                                                                count_animation = 1;
                                                                jQuery('#draggable6').css({
                                                                    transform: 'rotate(-'+0+'deg) scale(1)',
                                                                    background: 'rgba(255,255,255, 0.5)',
                                                                    color: 'red',
                                                                    borderColor: 'red',
                                                                    opacity: 1,
                                                                    borderWidth: '1px',
                                                                    paddingTop: '14px',
                                                                    zIndex: '1'
                                                                });
                                                                jQuery('.chart').data('easyPieChart').update(21);
                                                                jQuery('.chart').find('span').text('21');
                                    //Этап 3-2-3
                                                                cur_animation_val = 270;
                                                                count_animation = 1;
                                                                phaseSeven_one = setInterval(function(){
                                                                    if (count_animation <= 60){                                                                         //60
                                                                        cur_animation_val += 1.5;
                                                                        jQuery('#draggable6').css({
                                                                            transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                            background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                            color: 'transparent',
                                                                            borderColor: 'transparent',
                                                                            opacity: 0.8,
                                                                            borderWidth: '1px',
                                                                            paddingTop: '14px',
                                                                            zIndex: '1000'
                                                                        });
                                                                        count_animation += 1;
                                                                    } else if(count_animation <= 77) {                                                         //77
                                                                        count_animation += 1;
                                                                    } else {
                                                                        clearInterval(phaseSeven_one);
                                                                        count_animation = 1;
                                                                        jQuery('#draggable6').css({
                                                                            transform: 'rotate(-'+0+'deg) scale(1)',
                                                                            background: 'rgba(255,255,255, 0.5)',
                                                                            color: 'red',
                                                                            borderColor: 'red',
                                                                            opacity: 1,
                                                                            borderWidth: '1px',
                                                                            paddingTop: '14px',
                                                                            zIndex: '1'
                                                                        });
                                                                        jQuery('.chart').data('easyPieChart').update(23);
                                                                        jQuery('.chart').find('span').text('23');
                                    //Этап 3-2-4
                                                                        cur_animation_val = 300;
                                                                        count_animation = 1;
                                                                        phaseSeven_one = setInterval(function(){
                                                                            if (count_animation <= 40){                                                                         //40
                                                                                cur_animation_val += 1.5;
                                                                                jQuery('#draggable6').css({
                                                                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                    background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                    color: 'transparent',
                                                                                    borderColor: 'transparent',
                                                                                    opacity: 0.8,
                                                                                    borderWidth: '1px',
                                                                                    paddingTop: '14px',
                                                                                    zIndex: '1000'
                                                                                });
                                                                                count_animation += 1;
                                                                            } else if(count_animation <= 57) {                                                         //57
                                                                                count_animation += 1;
                                                                            } else {
                                                                                clearInterval(phaseSeven_one);
                                                                                count_animation = 1;
                                                                                jQuery('#draggable6').css({
                                                                                    transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                    background: 'rgba(255,255,255, 0.5)',
                                                                                    color: 'red',
                                                                                    borderColor: 'red',
                                                                                    opacity: 1,
                                                                                    borderWidth: '1px',
                                                                                    paddingTop: '14px',
                                                                                    zIndex: '1'
                                                                                });
                                                                                jQuery('.chart').data('easyPieChart').update(25);
                                                                                jQuery('.chart').find('span').text('25');
                                                                                count_animation = 1;
                                                                            //фаза 1
                                                                                jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url('+ e_king +') no-repeat top left/100%');
                                                                                reloadTime1 = 0;
                                                                                cur_animation_val = 0;
                                                                                count_animation = 1;
                                                                                phaseOne = setInterval(function(){
                                                                                  if (count_animation <= 480){                                                                         //90
                                                                                    count_animation += 1;
                                                                                    cur_animation_val += 6;
                                                                                    jQuery('#draggable8, #draggable7, #draggable6').css({
                                                                                      borderColor: 'transparent',
                                                                                      zIndex: '1000',
                                                                                      color: 'transparent'
                                                                                    });
                                                                                    if (count_animation <= 240){
                                                                                      jQuery('#draggable8').css({
                                                                                        background: 'url('+e_one+') 0 0/95% no-repeat',
                                                                                        transform: 'scale(1.3)'
                                                                                      });
                                                                                    } else {
                                                                                      jQuery('#draggable8').css({
                                                                                        background: 'url('+e_two+') 0 0/95% no-repeat',
                                                                                        transform: 'scale(1.3)'
                                                                                      });
                                                                                      jQuery('.chart').data('easyPieChart').update(28);
                                                                                      jQuery('.chart').find('span').text('28');
                                                                                    }
                                                                                    jQuery('#draggable7').css({
                                                                                      transform: 'rotate('+cur_animation_val+'deg)',
                                                                                      background: '#fff url(/wp-content/themes/wizardtarot/images/superdisfunction.png) 0 0/100% no-repeat'
                                                                                    });
                                                                                    jQuery('#draggable6').css({
                                                                                      background: 'url(/wp-content/themes/wizardtarot/images/nerazd.png) center top / 90% no-repeat'
                                                                                    });
                                                                                  } else {
                                                                                    clearInterval(phaseOne);
                                                                                    jQuery('#draggable8, #draggable7, #draggable6').css({
                                                                                      background: 'rgba(255,255,255, 0.5)',
                                                                                      color: 'crimson',
                                                                                      borderColor: 'crimson',
                                                                                      zIndex: '1',
                                                                                      transform: 'scale(1)',
                                                                                      paddingTop: '14px'
                                                                                    });
                                                                                    jQuery('.chart').data('easyPieChart').update(31);
                                                                                    jQuery('.chart').find('span').text('31');
                                                                                //фаза 2
                                                                                    reloadTime1 = 0;
                                                                                    cur_animation_val = 0;
                                                                                    count_animation = 1;
                                                                                    phaseOne = setInterval(function(){
                                                                                      if (count_animation <= 960){                                                                         //90
                                                                                        count_animation += 1;
                                                                                        cur_animation_val += 6;
                                                                                        jQuery('#draggable1, #draggable0, #draggable2, #draggable3').css({
                                                                                          borderColor: 'transparent',
                                                                                          zIndex: '1000',
                                                                                          color: 'transparent'
                                                                                        });
                                                                                        jQuery('#draggable2, #draggable3').css({
                                                                                            transform: 'rotate('+cur_animation_val+'deg)',
                                                                                            background: '#fff url(/wp-content/themes/wizardtarot/images/superdisfunction.png) 0 0/100% no-repeat'
                                                                                        });
                                                                                        cur_let = Math.round(Math.random() * (7 - 0))
                                                                                        jQuery('#draggable1').text(letters[cur_let]);
                                                                                        jQuery('#draggable1').css({
                                                                                          background: 'url(/wp-content/themes/wizardtarot/images/oct_2.png) 0 0/100% no-repeat',
                                                                                          color: '#000',
                                                                                          transform: 'scale(1.3) rotateY(180deg)',
                                                                                          paddingTop: '14px'
                                                                                        });
                                                                                        jQuery('#draggable0').css({
                                                                                          transform: 'rotate('+cur_animation_val+'deg)',
                                                                                          background: '#fff url(/wp-content/themes/wizardtarot/images/daemon.png) 0 0/100% no-repeat'
                                                                                        });
                                                                                      } else {
                                                                                        clearInterval(phaseOne);
                                                                                        jQuery('#draggable1, #draggable0, #draggable2, #draggable3').css({
                                                                                          background: 'rgba(255,255,255, 0.5)',
                                                                                          color: 'crimson',
                                                                                          borderColor: 'crimson',
                                                                                          zIndex: '1',
                                                                                          transform: 'scale(1)',
                                                                                          paddingTop: '14px'
                                                                                        });
                                                                                        jQuery('#draggable1').text('D+');
                                                                                        jQuery('.chart').data('easyPieChart').update(34);
                                                                                        jQuery('.chart').find('span').text('34');
                                                                                //фаза 3
                                                                                        reloadTime1 = 0;
                                                                                        cur_animation_val = 0;
                                                                                        count_animation = 1;
                                                                                        //Этап 3-1-1
                                                                                            phaseSeven_one = setInterval(function(){
                                                                                                if (count_animation <= 22){                                                                         //22
                                                                                                    cur_animation_val += 1.5;
                                                                                                    jQuery('#draggable8').css({
                                                                                                        transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                        background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                        color: 'transparent',
                                                                                                        borderColor: 'transparent',
                                                                                                        opacity: 0.8,
                                                                                                        borderWidth: '1px',
                                                                                                        paddingTop: '14px',
                                                                                                        zIndex: '1000'
                                                                                                    });
                                                                                                    count_animation += 1;
                                                                                                } else if(count_animation <= 39) {                                                         //39
                                                                                                    count_animation += 1;
                                                                                                } else {
                                                                                                    clearInterval(phaseSeven_one);
                                                                                                    count_animation = 1;
                                                                                                    jQuery('#draggable8').css({
                                                                                                        transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                        background: 'rgba(255,255,255, 0.5)',
                                                                                                        color: 'red',
                                                                                                        borderColor: 'red',
                                                                                                        opacity: 1,
                                                                                                        borderWidth: '1px',
                                                                                                        paddingTop: '14px',
                                                                                                        zIndex: '1'
                                                                                                    });
                                                                                                    jQuery('.chart').data('easyPieChart').update(36);
                                                                                                    jQuery('.chart').find('span').text('36');
                                                                                        //Этап 3-1-2
                                                                                                    cur_animation_val = 10;
                                                                                                    count_animation = 1;
                                                                                                    phaseSeven_one = setInterval(function(){
                                                                                                        if (count_animation <= 53){                                                                         //53
                                                                                                            cur_animation_val += 1.5;
                                                                                                            jQuery('#draggable8').css({
                                                                                                                transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                color: 'transparent',
                                                                                                                borderColor: 'transparent',
                                                                                                                opacity: 0.8,
                                                                                                                borderWidth: '1px',
                                                                                                                paddingTop: '14px',
                                                                                                                zIndex: '1000'
                                                                                                            });
                                                                                                            count_animation += 1;
                                                                                                        } else if(count_animation <= 70) {                                                         //70
                                                                                                            count_animation += 1;
                                                                                                        } else {
                                                                                                            clearInterval(phaseSeven_one);
                                                                                                            count_animation = 1;
                                                                                                            jQuery('#draggable8').css({
                                                                                                                transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                background: 'rgba(255,255,255, 0.5)',
                                                                                                                color: 'red',
                                                                                                                borderColor: 'red',
                                                                                                                opacity: 1,
                                                                                                                borderWidth: '1px',
                                                                                                                paddingTop: '14px',
                                                                                                                zIndex: '1'
                                                                                                            });
                                                                                                            jQuery('.chart').data('easyPieChart').update(38);
                                                                                                            jQuery('.chart').find('span').text('38');
                                                                                        //Этап 3-1-3
                                                                                                            cur_animation_val = 270;
                                                                                                            count_animation = 1;
                                                                                                            phaseSeven_one = setInterval(function(){
                                                                                                                if (count_animation <= 60){                                                                         //60
                                                                                                                    cur_animation_val += 1.5;
                                                                                                                    jQuery('#draggable8').css({
                                                                                                                        transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                        background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                        color: 'transparent',
                                                                                                                        borderColor: 'transparent',
                                                                                                                        opacity: 0.8,
                                                                                                                        borderWidth: '1px',
                                                                                                                        paddingTop: '14px',
                                                                                                                        zIndex: '1000'
                                                                                                                    });
                                                                                                                    count_animation += 1;
                                                                                                                } else if(count_animation <= 77) {                                                         //77
                                                                                                                    count_animation += 1;
                                                                                                                } else {
                                                                                                                    clearInterval(phaseSeven_one);
                                                                                                                    count_animation = 1;
                                                                                                                    jQuery('#draggable8').css({
                                                                                                                        transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                        background: 'rgba(255,255,255, 0.5)',
                                                                                                                        color: 'red',
                                                                                                                        borderColor: 'red',
                                                                                                                        opacity: 1,
                                                                                                                        borderWidth: '1px',
                                                                                                                        paddingTop: '14px',
                                                                                                                        zIndex: '1'
                                                                                                                    });
                                                                                                                    jQuery('.chart').data('easyPieChart').update(40);
                                                                                                                    jQuery('.chart').find('span').text('40');
                                                                                        //Этап 3-1-4
                                                                                                                    cur_animation_val = 300;
                                                                                                                    count_animation = 1;
                                                                                                                    phaseSeven_one = setInterval(function(){
                                                                                                                        if (count_animation <= 40){                                                                         //40
                                                                                                                            cur_animation_val += 1.5;
                                                                                                                            jQuery('#draggable8').css({
                                                                                                                                transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                color: 'transparent',
                                                                                                                                borderColor: 'transparent',
                                                                                                                                opacity: 0.8,
                                                                                                                                borderWidth: '1px',
                                                                                                                                paddingTop: '14px',
                                                                                                                                zIndex: '1000'
                                                                                                                            });
                                                                                                                            count_animation += 1;
                                                                                                                        } else if(count_animation <= 57) {                                                         //57
                                                                                                                            count_animation += 1;
                                                                                                                        } else {
                                                                                                                            clearInterval(phaseSeven_one);
                                                                                                                            count_animation = 1;
                                                                                                                            jQuery('#draggable8').css({
                                                                                                                                transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                background: 'rgba(255,255,255, 0.5)',
                                                                                                                                color: 'red',
                                                                                                                                borderColor: 'red',
                                                                                                                                opacity: 1,
                                                                                                                                borderWidth: '1px',
                                                                                                                                paddingTop: '14px',
                                                                                                                                zIndex: '1'
                                                                                                                            });
                                                                                                                            jQuery('.chart').data('easyPieChart').update(42);
                                                                                                                            jQuery('.chart').find('span').text('42');
                                                                                        //Этап 3-2-1
                                                                                                                            cur_animation_val = 55;
                                                                                                                            count_animation = 1;
                                                                                                                            phaseSeven_one = setInterval(function(){
                                                                                                                                if (count_animation <= 22){                                                                         //22
                                                                                                                                    cur_animation_val += 1.5;
                                                                                                                                    jQuery('#draggable6').css({
                                                                                                                                        transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                        background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                        color: 'transparent',
                                                                                                                                        borderColor: 'transparent',
                                                                                                                                        opacity: 0.8,
                                                                                                                                        borderWidth: '1px',
                                                                                                                                        paddingTop: '14px',
                                                                                                                                        zIndex: '1000'
                                                                                                                                    });
                                                                                                                                    count_animation += 1;
                                                                                                                                } else if(count_animation <= 39) {                                                         //39
                                                                                                                                    count_animation += 1;
                                                                                                                                } else {
                                                                                                                                    clearInterval(phaseSeven_one);
                                                                                                                                    count_animation = 1;
                                                                                                                                    jQuery('#draggable6').css({
                                                                                                                                        transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                        background: 'rgba(255,255,255, 0.5)',
                                                                                                                                        color: 'red',
                                                                                                                                        borderColor: 'red',
                                                                                                                                        opacity: 1,
                                                                                                                                        borderWidth: '1px',
                                                                                                                                        paddingTop: '14px',
                                                                                                                                        zIndex: '1'
                                                                                                                                    });
                                                                                                                                    jQuery('.chart').data('easyPieChart').update(44);
                                                                                                                                    jQuery('.chart').find('span').text('44');
                                                                                                                //Этап 3-2-2
                                                                                                                                    cur_animation_val = 10;
                                                                                                                                    count_animation = 1;
                                                                                                                                    phaseSeven_one = setInterval(function(){
                                                                                                                                        if (count_animation <= 53){                                                                         //53
                                                                                                                                            cur_animation_val += 1.5;
                                                                                                                                            jQuery('#draggable6').css({
                                                                                                                                                transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                color: 'transparent',
                                                                                                                                                borderColor: 'transparent',
                                                                                                                                                opacity: 0.8,
                                                                                                                                                borderWidth: '1px',
                                                                                                                                                paddingTop: '14px',
                                                                                                                                                zIndex: '1000'
                                                                                                                                            });
                                                                                                                                            count_animation += 1;
                                                                                                                                        } else if(count_animation <= 70) {                                                         //70
                                                                                                                                            count_animation += 1;
                                                                                                                                        } else {
                                                                                                                                            clearInterval(phaseSeven_one);
                                                                                                                                            count_animation = 1;
                                                                                                                                            jQuery('#draggable6').css({
                                                                                                                                                transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                color: 'red',
                                                                                                                                                borderColor: 'red',
                                                                                                                                                opacity: 1,
                                                                                                                                                borderWidth: '1px',
                                                                                                                                                paddingTop: '14px',
                                                                                                                                                zIndex: '1'
                                                                                                                                            });
                                                                                                                                            jQuery('.chart').data('easyPieChart').update(46);
                                                                                                                                            jQuery('.chart').find('span').text('46');
                                                                                                                //Этап 3-2-3
                                                                                                                                            cur_animation_val = 270;
                                                                                                                                            count_animation = 1;
                                                                                                                                            phaseSeven_one = setInterval(function(){
                                                                                                                                                if (count_animation <= 60){                                                                         //60
                                                                                                                                                    cur_animation_val += 1.5;
                                                                                                                                                    jQuery('#draggable6').css({
                                                                                                                                                        transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                        background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                        color: 'transparent',
                                                                                                                                                        borderColor: 'transparent',
                                                                                                                                                        opacity: 0.8,
                                                                                                                                                        borderWidth: '1px',
                                                                                                                                                        paddingTop: '14px',
                                                                                                                                                        zIndex: '1000'
                                                                                                                                                    });
                                                                                                                                                    count_animation += 1;
                                                                                                                                                } else if(count_animation <= 77) {                                                         //77
                                                                                                                                                    count_animation += 1;
                                                                                                                                                } else {
                                                                                                                                                    clearInterval(phaseSeven_one);
                                                                                                                                                    count_animation = 1;
                                                                                                                                                    jQuery('#draggable6').css({
                                                                                                                                                        transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                        background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                        color: 'red',
                                                                                                                                                        borderColor: 'red',
                                                                                                                                                        opacity: 1,
                                                                                                                                                        borderWidth: '1px',
                                                                                                                                                        paddingTop: '14px',
                                                                                                                                                        zIndex: '1'
                                                                                                                                                    });
                                                                                                                                                    jQuery('.chart').data('easyPieChart').update(48);
                                                                                                                                                    jQuery('.chart').find('span').text('48');
                                                                                                                //Этап 3-2-4
                                                                                                                                                    cur_animation_val = 300;
                                                                                                                                                    count_animation = 1;
                                                                                                                                                    phaseSeven_one = setInterval(function(){
                                                                                                                                                        if (count_animation <= 40){                                                                         //40
                                                                                                                                                            cur_animation_val += 1.5;
                                                                                                                                                            jQuery('#draggable6').css({
                                                                                                                                                                transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                                                color: 'transparent',
                                                                                                                                                                borderColor: 'transparent',
                                                                                                                                                                opacity: 0.8,
                                                                                                                                                                borderWidth: '1px',
                                                                                                                                                                paddingTop: '14px',
                                                                                                                                                                zIndex: '1000'
                                                                                                                                                            });
                                                                                                                                                            count_animation += 1;
                                                                                                                                                        } else if(count_animation <= 57) {                                                         //57
                                                                                                                                                            count_animation += 1;
                                                                                                                                                        } else {
                                                                                                                                                            clearInterval(phaseSeven_one);
                                                                                                                                                            count_animation = 1;
                                                                                                                                                            jQuery('#draggable6').css({
                                                                                                                                                                transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                color: 'red',
                                                                                                                                                                borderColor: 'red',
                                                                                                                                                                opacity: 1,
                                                                                                                                                                borderWidth: '1px',
                                                                                                                                                                paddingTop: '14px',
                                                                                                                                                                zIndex: '1'
                                                                                                                                                            });
                                                                                                                                                            jQuery('.chart').data('easyPieChart').update(50);
                                                                                                                                                            jQuery('.chart').find('span').text('50');
                                                                                                                                                            count_animation = 1;
                                                                                                                                                        //фаза 1
                                                                                                                                                            jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url('+ e_paje +') no-repeat top left/100%');
                                                                                                                                                            reloadTime1 = 0;
                                                                                                                                                            cur_animation_val = 0;
                                                                                                                                                            count_animation = 1;
                                                                                                                                                            phaseOne = setInterval(function(){
                                                                                                                                                              if (count_animation <= 480){                                                                         //90
                                                                                                                                                                count_animation += 1;
                                                                                                                                                                cur_animation_val += 6;
                                                                                                                                                                jQuery('#draggable8, #draggable7, #draggable6').css({
                                                                                                                                                                  borderColor: 'transparent',
                                                                                                                                                                  zIndex: '1000',
                                                                                                                                                                  color: 'transparent'
                                                                                                                                                                });
                                                                                                                                                                if (count_animation <= 240){
                                                                                                                                                                  jQuery('#draggable8').css({
                                                                                                                                                                    background: 'url('+e_one+') 0 0/95% no-repeat',
                                                                                                                                                                    transform: 'scale(1.3)'
                                                                                                                                                                  });
                                                                                                                                                                } else {
                                                                                                                                                                  jQuery('#draggable8').css({
                                                                                                                                                                    background: 'url('+e_two+') 0 0/95% no-repeat',
                                                                                                                                                                    transform: 'scale(1.3)'
                                                                                                                                                                  });
                                                                                                                                                                  jQuery('.chart').data('easyPieChart').update(53);
                                                                                                                                                                  jQuery('.chart').find('span').text('53');
                                                                                                                                                                }
                                                                                                                                                                jQuery('#draggable7').css({
                                                                                                                                                                  transform: 'rotate('+cur_animation_val+'deg)',
                                                                                                                                                                  background: '#fff url(/wp-content/themes/wizardtarot/images/superdisfunction.png) 0 0/100% no-repeat'
                                                                                                                                                                });
                                                                                                                                                                jQuery('#draggable6').css({
                                                                                                                                                                  background: 'url(/wp-content/themes/wizardtarot/images/nerazd.png) center top / 90% no-repeat'
                                                                                                                                                                });
                                                                                                                                                              } else {
                                                                                                                                                                clearInterval(phaseOne);
                                                                                                                                                                jQuery('#draggable8, #draggable7, #draggable6').css({
                                                                                                                                                                  background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                  color: 'crimson',
                                                                                                                                                                  borderColor: 'crimson',
                                                                                                                                                                  zIndex: '1',
                                                                                                                                                                  transform: 'scale(1)',
                                                                                                                                                                  paddingTop: '14px'
                                                                                                                                                                });
                                                                                                                                                                jQuery('.chart').data('easyPieChart').update(56);
                                                                                                                                                                jQuery('.chart').find('span').text('56');
                                                                                                                                                            //фаза 2
                                                                                                                                                                reloadTime1 = 0;
                                                                                                                                                                cur_animation_val = 0;
                                                                                                                                                                count_animation = 1;
                                                                                                                                                                phaseOne = setInterval(function(){
                                                                                                                                                                  if (count_animation <= 960){                                                                         //90
                                                                                                                                                                    count_animation += 1;
                                                                                                                                                                    cur_animation_val += 6;
                                                                                                                                                                    jQuery('#draggable1, #draggable0, #draggable2, #draggable3').css({
                                                                                                                                                                      borderColor: 'transparent',
                                                                                                                                                                      zIndex: '1000',
                                                                                                                                                                      color: 'transparent'
                                                                                                                                                                    });
                                                                                                                                                                    jQuery('#draggable2, #draggable3').css({
                                                                                                                                                                        transform: 'rotate('+cur_animation_val+'deg)',
                                                                                                                                                                        background: '#fff url(/wp-content/themes/wizardtarot/images/superdisfunction.png) 0 0/100% no-repeat'
                                                                                                                                                                    });
                                                                                                                                                                    cur_let = Math.round(Math.random() * (7 - 0))
                                                                                                                                                                    jQuery('#draggable1').text(letters[cur_let]);
                                                                                                                                                                    jQuery('#draggable1').css({
                                                                                                                                                                      background: 'url(/wp-content/themes/wizardtarot/images/oct_2.png) 0 0/100% no-repeat',
                                                                                                                                                                      color: '#000',
                                                                                                                                                                      transform: 'scale(1.3) rotateY(180deg)',
                                                                                                                                                                      paddingTop: '14px'
                                                                                                                                                                    });
                                                                                                                                                                    jQuery('#draggable0').css({
                                                                                                                                                                      transform: 'rotate('+cur_animation_val+'deg)',
                                                                                                                                                                      background: '#fff url(/wp-content/themes/wizardtarot/images/daemon.png) 0 0/100% no-repeat'
                                                                                                                                                                    });
                                                                                                                                                                  } else {
                                                                                                                                                                    clearInterval(phaseOne);
                                                                                                                                                                    jQuery('#draggable1, #draggable0, #draggable2, #draggable3').css({
                                                                                                                                                                      background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                      color: 'crimson',
                                                                                                                                                                      borderColor: 'crimson',
                                                                                                                                                                      zIndex: '1',
                                                                                                                                                                      transform: 'scale(1)',
                                                                                                                                                                      paddingTop: '14px'
                                                                                                                                                                    });
                                                                                                                                                                    jQuery('#draggable1').text('D+');
                                                                                                                                                                    jQuery('.chart').data('easyPieChart').update(59);
                                                                                                                                                                    jQuery('.chart').find('span').text('59');
                                                                                                                                                            //фаза 3
                                                                                                                                                                    reloadTime1 = 0;
                                                                                                                                                                    cur_animation_val = 0;
                                                                                                                                                                    count_animation = 1;
                                                                                                                                                                    //Этап 3-1-1
                                                                                                                                                                        phaseSeven_one = setInterval(function(){
                                                                                                                                                                            if (count_animation <= 22){                                                                         //22
                                                                                                                                                                                cur_animation_val += 1.5;
                                                                                                                                                                                jQuery('#draggable8').css({
                                                                                                                                                                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                    background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                                                                    color: 'transparent',
                                                                                                                                                                                    borderColor: 'transparent',
                                                                                                                                                                                    opacity: 0.8,
                                                                                                                                                                                    borderWidth: '1px',
                                                                                                                                                                                    paddingTop: '14px',
                                                                                                                                                                                    zIndex: '1000'
                                                                                                                                                                                });
                                                                                                                                                                                count_animation += 1;
                                                                                                                                                                            } else if(count_animation <= 39) {                                                         //39
                                                                                                                                                                                count_animation += 1;
                                                                                                                                                                            } else {
                                                                                                                                                                                clearInterval(phaseSeven_one);
                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                jQuery('#draggable8').css({
                                                                                                                                                                                    transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                    background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                    color: 'red',
                                                                                                                                                                                    borderColor: 'red',
                                                                                                                                                                                    opacity: 1,
                                                                                                                                                                                    borderWidth: '1px',
                                                                                                                                                                                    paddingTop: '14px',
                                                                                                                                                                                    zIndex: '1'
                                                                                                                                                                                });
                                                                                                                                                                                jQuery('.chart').data('easyPieChart').update(61);
                                                                                                                                                                                jQuery('.chart').find('span').text('61');
                                                                                                                                                                    //Этап 3-1-2
                                                                                                                                                                                cur_animation_val = 10;
                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                phaseSeven_one = setInterval(function(){
                                                                                                                                                                                    if (count_animation <= 53){                                                                         //53
                                                                                                                                                                                        cur_animation_val += 1.5;
                                                                                                                                                                                        jQuery('#draggable8').css({
                                                                                                                                                                                            transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                            background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                                                            color: 'transparent',
                                                                                                                                                                                            borderColor: 'transparent',
                                                                                                                                                                                            opacity: 0.8,
                                                                                                                                                                                            borderWidth: '1px',
                                                                                                                                                                                            paddingTop: '14px',
                                                                                                                                                                                            zIndex: '1000'
                                                                                                                                                                                        });
                                                                                                                                                                                        count_animation += 1;
                                                                                                                                                                                    } else if(count_animation <= 70) {                                                         //70
                                                                                                                                                                                        count_animation += 1;
                                                                                                                                                                                    } else {
                                                                                                                                                                                        clearInterval(phaseSeven_one);
                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                        jQuery('#draggable8').css({
                                                                                                                                                                                            transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                            background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                            color: 'red',
                                                                                                                                                                                            borderColor: 'red',
                                                                                                                                                                                            opacity: 1,
                                                                                                                                                                                            borderWidth: '1px',
                                                                                                                                                                                            paddingTop: '14px',
                                                                                                                                                                                            zIndex: '1'
                                                                                                                                                                                        });
                                                                                                                                                                                        jQuery('.chart').data('easyPieChart').update(63);
                                                                                                                                                                                        jQuery('.chart').find('span').text('63');
                                                                                                                                                                    //Этап 3-1-3
                                                                                                                                                                                        cur_animation_val = 270;
                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                        phaseSeven_one = setInterval(function(){
                                                                                                                                                                                            if (count_animation <= 60){                                                                         //60
                                                                                                                                                                                                cur_animation_val += 1.5;
                                                                                                                                                                                                jQuery('#draggable8').css({
                                                                                                                                                                                                    transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                    background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                                                                    color: 'transparent',
                                                                                                                                                                                                    borderColor: 'transparent',
                                                                                                                                                                                                    opacity: 0.8,
                                                                                                                                                                                                    borderWidth: '1px',
                                                                                                                                                                                                    paddingTop: '14px',
                                                                                                                                                                                                    zIndex: '1000'
                                                                                                                                                                                                });
                                                                                                                                                                                                count_animation += 1;
                                                                                                                                                                                            } else if(count_animation <= 77) {                                                         //77
                                                                                                                                                                                                count_animation += 1;
                                                                                                                                                                                            } else {
                                                                                                                                                                                                clearInterval(phaseSeven_one);
                                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                                jQuery('#draggable8').css({
                                                                                                                                                                                                    transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                    background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                    color: 'red',
                                                                                                                                                                                                    borderColor: 'red',
                                                                                                                                                                                                    opacity: 1,
                                                                                                                                                                                                    borderWidth: '1px',
                                                                                                                                                                                                    paddingTop: '14px',
                                                                                                                                                                                                    zIndex: '1'
                                                                                                                                                                                                });
                                                                                                                                                                                                jQuery('.chart').data('easyPieChart').update(65);
                                                                                                                                                                                                jQuery('.chart').find('span').text('65');
                                                                                                                                                                    //Этап 3-1-4
                                                                                                                                                                                                cur_animation_val = 300;
                                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                                phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                    if (count_animation <= 40){                                                                         //40
                                                                                                                                                                                                        cur_animation_val += 1.5;
                                                                                                                                                                                                        jQuery('#draggable8').css({
                                                                                                                                                                                                            transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                            background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                                                                                            color: 'transparent',
                                                                                                                                                                                                            borderColor: 'transparent',
                                                                                                                                                                                                            opacity: 0.8,
                                                                                                                                                                                                            borderWidth: '1px',
                                                                                                                                                                                                            paddingTop: '14px',
                                                                                                                                                                                                            zIndex: '1000'
                                                                                                                                                                                                        });
                                                                                                                                                                                                        count_animation += 1;
                                                                                                                                                                                                    } else if(count_animation <= 57) {                                                         //57
                                                                                                                                                                                                        count_animation += 1;
                                                                                                                                                                                                    } else {
                                                                                                                                                                                                        clearInterval(phaseSeven_one);
                                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                                        jQuery('#draggable8').css({
                                                                                                                                                                                                            transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                            background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                            color: 'red',
                                                                                                                                                                                                            borderColor: 'red',
                                                                                                                                                                                                            opacity: 1,
                                                                                                                                                                                                            borderWidth: '1px',
                                                                                                                                                                                                            paddingTop: '14px',
                                                                                                                                                                                                            zIndex: '1'
                                                                                                                                                                                                        });
                                                                                                                                                                                                        jQuery('.chart').data('easyPieChart').update(67);
                                                                                                                                                                                                        jQuery('.chart').find('span').text('67');
                                                                                                                                                                    //Этап 3-2-1
                                                                                                                                                                                                        cur_animation_val = 55;
                                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                                        phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                            if (count_animation <= 22){                                                                         //22
                                                                                                                                                                                                                cur_animation_val += 1.5;
                                                                                                                                                                                                                jQuery('#draggable6').css({
                                                                                                                                                                                                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                                    background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                    color: 'transparent',
                                                                                                                                                                                                                    borderColor: 'transparent',
                                                                                                                                                                                                                    opacity: 0.8,
                                                                                                                                                                                                                    borderWidth: '1px',
                                                                                                                                                                                                                    paddingTop: '14px',
                                                                                                                                                                                                                    zIndex: '1000'
                                                                                                                                                                                                                });
                                                                                                                                                                                                                count_animation += 1;
                                                                                                                                                                                                            } else if(count_animation <= 39) {                                                         //39
                                                                                                                                                                                                                count_animation += 1;
                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                clearInterval(phaseSeven_one);
                                                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                                                jQuery('#draggable6').css({
                                                                                                                                                                                                                    transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                                    background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                    color: 'red',
                                                                                                                                                                                                                    borderColor: 'red',
                                                                                                                                                                                                                    opacity: 1,
                                                                                                                                                                                                                    borderWidth: '1px',
                                                                                                                                                                                                                    paddingTop: '14px',
                                                                                                                                                                                                                    zIndex: '1'
                                                                                                                                                                                                                });
                                                                                                                                                                                                                jQuery('.chart').data('easyPieChart').update(69);
                                                                                                                                                                                                                jQuery('.chart').find('span').text('69');
                                                                                                                                                                                            //Этап 3-2-2
                                                                                                                                                                                                                cur_animation_val = 10;
                                                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                                                phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                                    if (count_animation <= 53){                                                                         //53
                                                                                                                                                                                                                        cur_animation_val += 1.5;
                                                                                                                                                                                                                        jQuery('#draggable6').css({
                                                                                                                                                                                                                            transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                                            background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                            color: 'transparent',
                                                                                                                                                                                                                            borderColor: 'transparent',
                                                                                                                                                                                                                            opacity: 0.8,
                                                                                                                                                                                                                            borderWidth: '1px',
                                                                                                                                                                                                                            paddingTop: '14px',
                                                                                                                                                                                                                            zIndex: '1000'
                                                                                                                                                                                                                        });
                                                                                                                                                                                                                        count_animation += 1;
                                                                                                                                                                                                                    } else if(count_animation <= 70) {                                                         //70
                                                                                                                                                                                                                        count_animation += 1;
                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                        clearInterval(phaseSeven_one);
                                                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                                                        jQuery('#draggable6').css({
                                                                                                                                                                                                                            transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                                            background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                            color: 'red',
                                                                                                                                                                                                                            borderColor: 'red',
                                                                                                                                                                                                                            opacity: 1,
                                                                                                                                                                                                                            borderWidth: '1px',
                                                                                                                                                                                                                            paddingTop: '14px',
                                                                                                                                                                                                                            zIndex: '1'
                                                                                                                                                                                                                        });
                                                                                                                                                                                                                        jQuery('.chart').data('easyPieChart').update(71);
                                                                                                                                                                                                                        jQuery('.chart').find('span').text('71');
                                                                                                                                                                                            //Этап 3-2-3
                                                                                                                                                                                                                        cur_animation_val = 270;
                                                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                                                        phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                                            if (count_animation <= 60){                                                                         //60
                                                                                                                                                                                                                                cur_animation_val += 1.5;
                                                                                                                                                                                                                                jQuery('#draggable6').css({
                                                                                                                                                                                                                                    transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                                                    background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                                    color: 'transparent',
                                                                                                                                                                                                                                    borderColor: 'transparent',
                                                                                                                                                                                                                                    opacity: 0.8,
                                                                                                                                                                                                                                    borderWidth: '1px',
                                                                                                                                                                                                                                    paddingTop: '14px',
                                                                                                                                                                                                                                    zIndex: '1000'
                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                count_animation += 1;
                                                                                                                                                                                                                            } else if(count_animation <= 77) {                                                         //77
                                                                                                                                                                                                                                count_animation += 1;
                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                clearInterval(phaseSeven_one);
                                                                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                                                                jQuery('#draggable6').css({
                                                                                                                                                                                                                                    transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                                                    background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                                    color: 'red',
                                                                                                                                                                                                                                    borderColor: 'red',
                                                                                                                                                                                                                                    opacity: 1,
                                                                                                                                                                                                                                    borderWidth: '1px',
                                                                                                                                                                                                                                    paddingTop: '14px',
                                                                                                                                                                                                                                    zIndex: '1'
                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                jQuery('.chart').data('easyPieChart').update(73);
                                                                                                                                                                                                                                jQuery('.chart').find('span').text('73');
                                                                                                                                                                                            //Этап 3-2-4
                                                                                                                                                                                                                                cur_animation_val = 300;
                                                                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                                                                phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                                                    if (count_animation <= 40){                                                                         //40
                                                                                                                                                                                                                                        cur_animation_val += 1.5;
                                                                                                                                                                                                                                        jQuery('#draggable6').css({
                                                                                                                                                                                                                                            transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                                                            background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                                            color: 'transparent',
                                                                                                                                                                                                                                            borderColor: 'transparent',
                                                                                                                                                                                                                                            opacity: 0.8,
                                                                                                                                                                                                                                            borderWidth: '1px',
                                                                                                                                                                                                                                            paddingTop: '14px',
                                                                                                                                                                                                                                            zIndex: '1000'
                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                        count_animation += 1;
                                                                                                                                                                                                                                    } else if(count_animation <= 57) {                                                         //57
                                                                                                                                                                                                                                        count_animation += 1;
                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                        clearInterval(phaseSeven_one);
                                                                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                                                                        jQuery('#draggable6').css({
                                                                                                                                                                                                                                            transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                                                            background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                                            color: 'red',
                                                                                                                                                                                                                                            borderColor: 'red',
                                                                                                                                                                                                                                            opacity: 1,
                                                                                                                                                                                                                                            borderWidth: '1px',
                                                                                                                                                                                                                                            paddingTop: '14px',
                                                                                                                                                                                                                                            zIndex: '1'
                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                        jQuery('.chart').data('easyPieChart').update(75);
                                                                                                                                                                                                                                        jQuery('.chart').find('span').text('75');
                                                                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                                                                    //фаза 1
                                                                                                                                                                                                                                        jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url('+ e_knight +') no-repeat top left/100%');
                                                                                                                                                                                                                                        reloadTime1 = 0;
                                                                                                                                                                                                                                        cur_animation_val = 0;
                                                                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                                                                        phaseOne = setInterval(function(){
                                                                                                                                                                                                                                          if (count_animation <= 480){                                                                         //90
                                                                                                                                                                                                                                            count_animation += 1;
                                                                                                                                                                                                                                            cur_animation_val += 6;
                                                                                                                                                                                                                                            jQuery('#draggable8, #draggable7, #draggable6').css({
                                                                                                                                                                                                                                              borderColor: 'transparent',
                                                                                                                                                                                                                                              zIndex: '1000',
                                                                                                                                                                                                                                              color: 'transparent'
                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                            if (count_animation <= 240){
                                                                                                                                                                                                                                              jQuery('#draggable8').css({
                                                                                                                                                                                                                                                background: 'url('+e_one+') 0 0/95% no-repeat',
                                                                                                                                                                                                                                                transform: 'scale(1.3)'
                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                              jQuery('#draggable8').css({
                                                                                                                                                                                                                                                background: 'url('+e_two+') 0 0/95% no-repeat',
                                                                                                                                                                                                                                                transform: 'scale(1.3)'
                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                              jQuery('.chart').data('easyPieChart').update(78);
                                                                                                                                                                                                                                              jQuery('.chart').find('span').text('78');
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                            jQuery('#draggable7').css({
                                                                                                                                                                                                                                              transform: 'rotate('+cur_animation_val+'deg)',
                                                                                                                                                                                                                                              background: '#fff url(/wp-content/themes/wizardtarot/images/superdisfunction.png) 0 0/100% no-repeat'
                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                            jQuery('#draggable6').css({
                                                                                                                                                                                                                                              background: 'url(/wp-content/themes/wizardtarot/images/nerazd.png) center top / 90% no-repeat'
                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                          } else {
                                                                                                                                                                                                                                            clearInterval(phaseOne);
                                                                                                                                                                                                                                            jQuery('#draggable8, #draggable7, #draggable6').css({
                                                                                                                                                                                                                                              background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                                              color: 'crimson',
                                                                                                                                                                                                                                              borderColor: 'crimson',
                                                                                                                                                                                                                                              zIndex: '1',
                                                                                                                                                                                                                                              transform: 'scale(1)',
                                                                                                                                                                                                                                              paddingTop: '14px'
                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                            jQuery('.chart').data('easyPieChart').update(81);
                                                                                                                                                                                                                                            jQuery('.chart').find('span').text('81');
                                                                                                                                                                                                                                        //фаза 2
                                                                                                                                                                                                                                            reloadTime1 = 0;
                                                                                                                                                                                                                                            cur_animation_val = 0;
                                                                                                                                                                                                                                            count_animation = 1;
                                                                                                                                                                                                                                            phaseOne = setInterval(function(){
                                                                                                                                                                                                                                              if (count_animation <= 960){                                                                         //90
                                                                                                                                                                                                                                                count_animation += 1;
                                                                                                                                                                                                                                                cur_animation_val += 6;
                                                                                                                                                                                                                                                jQuery('#draggable1, #draggable0, #draggable2, #draggable3').css({
                                                                                                                                                                                                                                                  borderColor: 'transparent',
                                                                                                                                                                                                                                                  zIndex: '1000',
                                                                                                                                                                                                                                                  color: 'transparent'
                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                jQuery('#draggable2, #draggable3').css({
                                                                                                                                                                                                                                                    transform: 'rotate('+cur_animation_val+'deg)',
                                                                                                                                                                                                                                                    background: '#fff url(/wp-content/themes/wizardtarot/images/superdisfunction.png) 0 0/100% no-repeat'
                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                cur_let = Math.round(Math.random() * (7 - 0))
                                                                                                                                                                                                                                                jQuery('#draggable1').text(letters[cur_let]);
                                                                                                                                                                                                                                                jQuery('#draggable1').css({
                                                                                                                                                                                                                                                  background: 'url(/wp-content/themes/wizardtarot/images/oct_2.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                                                  color: '#000',
                                                                                                                                                                                                                                                  transform: 'scale(1.3) rotateY(180deg)',
                                                                                                                                                                                                                                                  paddingTop: '14px'
                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                jQuery('#draggable0').css({
                                                                                                                                                                                                                                                  transform: 'rotate('+cur_animation_val+'deg)',
                                                                                                                                                                                                                                                  background: '#fff url(/wp-content/themes/wizardtarot/images/daemon.png) 0 0/100% no-repeat'
                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                              } else {
                                                                                                                                                                                                                                                clearInterval(phaseOne);
                                                                                                                                                                                                                                                jQuery('#draggable1, #draggable0, #draggable2, #draggable3').css({
                                                                                                                                                                                                                                                  background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                                                  color: 'crimson',
                                                                                                                                                                                                                                                  borderColor: 'crimson',
                                                                                                                                                                                                                                                  zIndex: '1',
                                                                                                                                                                                                                                                  transform: 'scale(1)',
                                                                                                                                                                                                                                                  paddingTop: '14px'
                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                jQuery('#draggable1').text('D+');
                                                                                                                                                                                                                                                jQuery('.chart').data('easyPieChart').update(84);
                                                                                                                                                                                                                                                jQuery('.chart').find('span').text('84');
                                                                                                                                                                                                                                        //фаза 3
                                                                                                                                                                                                                                                reloadTime1 = 0;
                                                                                                                                                                                                                                                cur_animation_val = 0;
                                                                                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                                                                                //Этап 3-1-1
                                                                                                                                                                                                                                                    phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                                                                        if (count_animation <= 22){                                                                         //22
                                                                                                                                                                                                                                                            cur_animation_val += 1.5;
                                                                                                                                                                                                                                                            jQuery('#draggable8').css({
                                                                                                                                                                                                                                                                transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                                                                                background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                                                                color: 'transparent',
                                                                                                                                                                                                                                                                borderColor: 'transparent',
                                                                                                                                                                                                                                                                opacity: 0.8,
                                                                                                                                                                                                                                                                borderWidth: '1px',
                                                                                                                                                                                                                                                                paddingTop: '14px',
                                                                                                                                                                                                                                                                zIndex: '1000'
                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                            count_animation += 1;
                                                                                                                                                                                                                                                        } else if(count_animation <= 39) {                                                         //39
                                                                                                                                                                                                                                                            count_animation += 1;
                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                            clearInterval(phaseSeven_one);
                                                                                                                                                                                                                                                            count_animation = 1;
                                                                                                                                                                                                                                                            jQuery('#draggable8').css({
                                                                                                                                                                                                                                                                transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                                                                                background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                                                                color: 'red',
                                                                                                                                                                                                                                                                borderColor: 'red',
                                                                                                                                                                                                                                                                opacity: 1,
                                                                                                                                                                                                                                                                borderWidth: '1px',
                                                                                                                                                                                                                                                                paddingTop: '14px',
                                                                                                                                                                                                                                                                zIndex: '1'
                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                            jQuery('.chart').data('easyPieChart').update(86);
                                                                                                                                                                                                                                                            jQuery('.chart').find('span').text('86');
                                                                                                                                                                                                                                                //Этап 3-1-2
                                                                                                                                                                                                                                                            cur_animation_val = 10;
                                                                                                                                                                                                                                                            count_animation = 1;
                                                                                                                                                                                                                                                            phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                                                                                if (count_animation <= 53){                                                                         //53
                                                                                                                                                                                                                                                                    cur_animation_val += 1.5;
                                                                                                                                                                                                                                                                    jQuery('#draggable8').css({
                                                                                                                                                                                                                                                                        transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                                                                                        background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                                                                        color: 'transparent',
                                                                                                                                                                                                                                                                        borderColor: 'transparent',
                                                                                                                                                                                                                                                                        opacity: 0.8,
                                                                                                                                                                                                                                                                        borderWidth: '1px',
                                                                                                                                                                                                                                                                        paddingTop: '14px',
                                                                                                                                                                                                                                                                        zIndex: '1000'
                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                    count_animation += 1;
                                                                                                                                                                                                                                                                } else if(count_animation <= 70) {                                                         //70
                                                                                                                                                                                                                                                                    count_animation += 1;
                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                    clearInterval(phaseSeven_one);
                                                                                                                                                                                                                                                                    count_animation = 1;
                                                                                                                                                                                                                                                                    jQuery('#draggable8').css({
                                                                                                                                                                                                                                                                        transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                                                                                        background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                                                                        color: 'red',
                                                                                                                                                                                                                                                                        borderColor: 'red',
                                                                                                                                                                                                                                                                        opacity: 1,
                                                                                                                                                                                                                                                                        borderWidth: '1px',
                                                                                                                                                                                                                                                                        paddingTop: '14px',
                                                                                                                                                                                                                                                                        zIndex: '1'
                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                    jQuery('.chart').data('easyPieChart').update(88);
                                                                                                                                                                                                                                                                    jQuery('.chart').find('span').text('88');
                                                                                                                                                                                                                                                //Этап 3-1-3
                                                                                                                                                                                                                                                                    cur_animation_val = 270;
                                                                                                                                                                                                                                                                    count_animation = 1;
                                                                                                                                                                                                                                                                    phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                                                                                        if (count_animation <= 60){                                                                         //60
                                                                                                                                                                                                                                                                            cur_animation_val += 1.5;
                                                                                                                                                                                                                                                                            jQuery('#draggable8').css({
                                                                                                                                                                                                                                                                                transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                                                                                                background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                                                                                color: 'transparent',
                                                                                                                                                                                                                                                                                borderColor: 'transparent',
                                                                                                                                                                                                                                                                                opacity: 0.8,
                                                                                                                                                                                                                                                                                borderWidth: '1px',
                                                                                                                                                                                                                                                                                paddingTop: '14px',
                                                                                                                                                                                                                                                                                zIndex: '1000'
                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                            count_animation += 1;
                                                                                                                                                                                                                                                                        } else if(count_animation <= 77) {                                                         //77
                                                                                                                                                                                                                                                                            count_animation += 1;
                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                            clearInterval(phaseSeven_one);
                                                                                                                                                                                                                                                                            count_animation = 1;
                                                                                                                                                                                                                                                                            jQuery('#draggable8').css({
                                                                                                                                                                                                                                                                                transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                                                                                                background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                                                                                color: 'red',
                                                                                                                                                                                                                                                                                borderColor: 'red',
                                                                                                                                                                                                                                                                                opacity: 1,
                                                                                                                                                                                                                                                                                borderWidth: '1px',
                                                                                                                                                                                                                                                                                paddingTop: '14px',
                                                                                                                                                                                                                                                                                zIndex: '1'
                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                            jQuery('.chart').data('easyPieChart').update(90);
                                                                                                                                                                                                                                                                            jQuery('.chart').find('span').text('90');
                                                                                                                                                                                                                                                //Этап 3-1-4
                                                                                                                                                                                                                                                                            cur_animation_val = 300;
                                                                                                                                                                                                                                                                            count_animation = 1;
                                                                                                                                                                                                                                                                            phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                                                                                                if (count_animation <= 40){                                                                         //40
                                                                                                                                                                                                                                                                                    cur_animation_val += 1.5;
                                                                                                                                                                                                                                                                                    jQuery('#draggable8').css({
                                                                                                                                                                                                                                                                                        transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                                                                                                        background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                                                                                        color: 'transparent',
                                                                                                                                                                                                                                                                                        borderColor: 'transparent',
                                                                                                                                                                                                                                                                                        opacity: 0.8,
                                                                                                                                                                                                                                                                                        borderWidth: '1px',
                                                                                                                                                                                                                                                                                        paddingTop: '14px',
                                                                                                                                                                                                                                                                                        zIndex: '1000'
                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                    count_animation += 1;
                                                                                                                                                                                                                                                                                } else if(count_animation <= 57) {                                                         //57
                                                                                                                                                                                                                                                                                    count_animation += 1;
                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                    clearInterval(phaseSeven_one);
                                                                                                                                                                                                                                                                                    count_animation = 1;
                                                                                                                                                                                                                                                                                    jQuery('#draggable8').css({
                                                                                                                                                                                                                                                                                        transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                                                                                                        background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                                                                                        color: 'red',
                                                                                                                                                                                                                                                                                        borderColor: 'red',
                                                                                                                                                                                                                                                                                        opacity: 1,
                                                                                                                                                                                                                                                                                        borderWidth: '1px',
                                                                                                                                                                                                                                                                                        paddingTop: '14px',
                                                                                                                                                                                                                                                                                        zIndex: '1'
                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                    jQuery('.chart').data('easyPieChart').update(92);
                                                                                                                                                                                                                                                                                    jQuery('.chart').find('span').text('92');
                                                                                                                                                                                                                                                //Этап 3-2-1
                                                                                                                                                                                                                                                                                    cur_animation_val = 55;
                                                                                                                                                                                                                                                                                    count_animation = 1;
                                                                                                                                                                                                                                                                                    phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                                                                                                        if (count_animation <= 22){                                                                         //22
                                                                                                                                                                                                                                                                                            cur_animation_val += 1.5;
                                                                                                                                                                                                                                                                                            jQuery('#draggable6').css({
                                                                                                                                                                                                                                                                                                transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                                                                                                                background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                                                                                                color: 'transparent',
                                                                                                                                                                                                                                                                                                borderColor: 'transparent',
                                                                                                                                                                                                                                                                                                opacity: 0.8,
                                                                                                                                                                                                                                                                                                borderWidth: '1px',
                                                                                                                                                                                                                                                                                                paddingTop: '14px',
                                                                                                                                                                                                                                                                                                zIndex: '1000'
                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                            count_animation += 1;
                                                                                                                                                                                                                                                                                        } else if(count_animation <= 39) {                                                         //39
                                                                                                                                                                                                                                                                                            count_animation += 1;
                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                            clearInterval(phaseSeven_one);
                                                                                                                                                                                                                                                                                            count_animation = 1;
                                                                                                                                                                                                                                                                                            jQuery('#draggable6').css({
                                                                                                                                                                                                                                                                                                transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                                                                                                                background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                                                                                                color: 'red',
                                                                                                                                                                                                                                                                                                borderColor: 'red',
                                                                                                                                                                                                                                                                                                opacity: 1,
                                                                                                                                                                                                                                                                                                borderWidth: '1px',
                                                                                                                                                                                                                                                                                                paddingTop: '14px',
                                                                                                                                                                                                                                                                                                zIndex: '1'
                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                            jQuery('.chart').data('easyPieChart').update(94);
                                                                                                                                                                                                                                                                                            jQuery('.chart').find('span').text('94');
                                                                                                                                                                                                                                                                        //Этап 3-2-2
                                                                                                                                                                                                                                                                                            cur_animation_val = 10;
                                                                                                                                                                                                                                                                                            count_animation = 1;
                                                                                                                                                                                                                                                                                            phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                                                                                                                if (count_animation <= 53){                                                                         //53
                                                                                                                                                                                                                                                                                                    cur_animation_val += 1.5;
                                                                                                                                                                                                                                                                                                    jQuery('#draggable6').css({
                                                                                                                                                                                                                                                                                                        transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                                                                                                                        background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                                                                                                        color: 'transparent',
                                                                                                                                                                                                                                                                                                        borderColor: 'transparent',
                                                                                                                                                                                                                                                                                                        opacity: 0.8,
                                                                                                                                                                                                                                                                                                        borderWidth: '1px',
                                                                                                                                                                                                                                                                                                        paddingTop: '14px',
                                                                                                                                                                                                                                                                                                        zIndex: '1000'
                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                    count_animation += 1;
                                                                                                                                                                                                                                                                                                } else if(count_animation <= 70) {                                                         //70
                                                                                                                                                                                                                                                                                                    count_animation += 1;
                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                    clearInterval(phaseSeven_one);
                                                                                                                                                                                                                                                                                                    count_animation = 1;
                                                                                                                                                                                                                                                                                                    jQuery('#draggable6').css({
                                                                                                                                                                                                                                                                                                        transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                                                                                                                        background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                                                                                                        color: 'red',
                                                                                                                                                                                                                                                                                                        borderColor: 'red',
                                                                                                                                                                                                                                                                                                        opacity: 1,
                                                                                                                                                                                                                                                                                                        borderWidth: '1px',
                                                                                                                                                                                                                                                                                                        paddingTop: '14px',
                                                                                                                                                                                                                                                                                                        zIndex: '1'
                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                    jQuery('.chart').data('easyPieChart').update(96);
                                                                                                                                                                                                                                                                                                    jQuery('.chart').find('span').text('96');
                                                                                                                                                                                                                                                                        //Этап 3-2-3
                                                                                                                                                                                                                                                                                                    cur_animation_val = 270;
                                                                                                                                                                                                                                                                                                    count_animation = 1;
                                                                                                                                                                                                                                                                                                    phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                                                                                                                        if (count_animation <= 60){                                                                         //60
                                                                                                                                                                                                                                                                                                            cur_animation_val += 1.5;
                                                                                                                                                                                                                                                                                                            jQuery('#draggable6').css({
                                                                                                                                                                                                                                                                                                                transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                                                                                                                                background: '#fff url(/wp-content/themes/wizardtarot/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                                                                                                                color: 'transparent',
                                                                                                                                                                                                                                                                                                                borderColor: 'transparent',
                                                                                                                                                                                                                                                                                                                opacity: 0.8,
                                                                                                                                                                                                                                                                                                                borderWidth: '1px',
                                                                                                                                                                                                                                                                                                                paddingTop: '14px',
                                                                                                                                                                                                                                                                                                                zIndex: '1000'
                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                            count_animation += 1;
                                                                                                                                                                                                                                                                                                        } else if(count_animation <= 77) {                                                         //77
                                                                                                                                                                                                                                                                                                            count_animation += 1;
                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                            clearInterval(phaseSeven_one);
                                                                                                                                                                                                                                                                                                            count_animation = 1;
                                                                                                                                                                                                                                                                                                            jQuery('#draggable6').css({
                                                                                                                                                                                                                                                                                                                transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                                                                                                                                background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                                                                                                                color: 'red',
                                                                                                                                                                                                                                                                                                                borderColor: 'red',
                                                                                                                                                                                                                                                                                                                opacity: 1,
                                                                                                                                                                                                                                                                                                                borderWidth: '1px',
                                                                                                                                                                                                                                                                                                                paddingTop: '14px',
                                                                                                                                                                                                                                                                                                                zIndex: '1'
                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                            jQuery('.chart').data('easyPieChart').update(98);
                                                                                                                                                                                                                                                                                                            jQuery('.chart').find('span').text('98');
                                                                                                                                                                                                                                                                        //Этап 3-2-4
                                                                                                                                                                                                                                                                                                            cur_animation_val = 300;
                                                                                                                                                                                                                                                                                                            count_animation = 1;
                                                                                                                                                                                                                                                                                                            phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                                                                                                                                if (count_animation <= 40){                                                                         //40
                                                                                                                                                                                                                                                                                                                    cur_animation_val += 1.5;
                                                                                                                                                                                                                                                                                                                    jQuery('#draggable6').css({
                                                                                                                                                                                                                                                                                                                        transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                                                                                                                                        background: '#fff url(/wp-content/themes/wizardtarot/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                                                                                                                                                                                                        color: 'transparent',
                                                                                                                                                                                                                                                                                                                        borderColor: 'transparent',
                                                                                                                                                                                                                                                                                                                        opacity: 0.8,
                                                                                                                                                                                                                                                                                                                        borderWidth: '1px',
                                                                                                                                                                                                                                                                                                                        paddingTop: '14px',
                                                                                                                                                                                                                                                                                                                        zIndex: '1000'
                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                    count_animation += 1;
                                                                                                                                                                                                                                                                                                                } else if(count_animation <= 57) {                                                         //57
                                                                                                                                                                                                                                                                                                                    count_animation += 1;
                                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                                    clearInterval(phaseSeven_one);
                                                                                                                                                                                                                                                                                                                    count_animation = 1;
                                                                                                                                                                                                                                                                                                                    jQuery('#draggable6').css({
                                                                                                                                                                                                                                                                                                                        transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                                                                                                                                                                                                        background: 'rgba(255,255,255, 0.5)',
                                                                                                                                                                                                                                                                                                                        color: 'red',
                                                                                                                                                                                                                                                                                                                        borderColor: 'red',
                                                                                                                                                                                                                                                                                                                        opacity: 1,
                                                                                                                                                                                                                                                                                                                        borderWidth: '1px',
                                                                                                                                                                                                                                                                                                                        paddingTop: '14px',
                                                                                                                                                                                                                                                                                                                        zIndex: '1'
                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                    jQuery('.chart').data('easyPieChart').update(100);
                                                                                                                                                                                                                                                                                                                    jQuery('.chart').find('span').text('100');
                                                                                                                                                                                                                                                                                                                    count_animation = 1;
                                                                                                                                                                                                                                                                                                                    onEnd();
                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                            }, 1000);
                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                    }, 1000);
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                            }, 1000);
                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                    }, 1000);
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                            }, 1000);
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                    }, 1000);
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                            }, 1000);
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                    }, 1000);
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            }, 250);
                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                        }, 250);
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                }, 1000);
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                        }, 1000);
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                }, 1000);
                                                                                                                                                                                                            }
                                                                                                                                                                                                        }, 1000);
                                                                                                                                                                                                    }
                                                                                                                                                                                                }, 1000);
                                                                                                                                                                                            }
                                                                                                                                                                                        }, 1000);
                                                                                                                                                                                    }
                                                                                                                                                                                }, 1000);
                                                                                                                                                                            }
                                                                                                                                                                        }, 1000);
                                                                                                                                                                    }
                                                                                                                                                                }, 250);
                                                                                                                                                              }
                                                                                                                                                            }, 250);
                                                                                                                                                        }
                                                                                                                                                    }, 1000);
                                                                                                                                                }
                                                                                                                                            }, 1000);
                                                                                                                                        }
                                                                                                                                    }, 1000);
                                                                                                                                }
                                                                                                                            }, 1000);
                                                                                                                        }
                                                                                                                    }, 1000);
                                                                                                                }
                                                                                                            }, 1000);
                                                                                                        }
                                                                                                    }, 1000);
                                                                                                }
                                                                                            }, 1000);
                                                                                      }
                                                                                    }, 250);
                                                                                  }
                                                                                }, 250);
                                                                            }
                                                                        }, 1000);
                                                                    }
                                                                }, 1000);
                                                            }
                                                        }, 1000);
                                                    }
                                                }, 1000);
                                            }
                                        }, 1000);
                                    }
                                }, 1000);
                            }
                        }, 1000);
                    }
                }, 1000);
          }
        }, 250);
      }
    }, 250);
  };
    if(supportsStorage && localStorage.getItem('prot_type')){
        prot_type = localStorage.getItem('prot_type');
        elem_type = localStorage.getItem('elem_type');
        console.log(prot_type+' '+elem_type);
    }
    jQuery('.tarot_start').on('click', function(event) {
        checkPoints()
        if(pointsStatus == false){
            swal("Не все зоны перенесены", "Перед началом процедуры необходимо перенести все зоны", "info");
        } else {
            if(prot_type == 'tarot'){
                tarot();
                jQuery('.tarot_to_photo').addClass('hidden');
            } else {
                elems();
                jQuery('.tarot_to_photo').addClass('hidden');
                console.log('elements');
            }
        }
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
});
jQuery(window).resize(function(event) {
  devil_w = parseInt(jQuery('.elems_devil-client').css('width'));
  jQuery('.elems_devil-client, .elems_devil-devil').css('height', (devil_w * 1.5)+'px');
}
