jQuery(function() {
    var tarot_cards = {
            0: '/images/gallery/15-Major-Devil',
            1: '/images/gallery/00-Major-Fool',
            2: '/images/gallery/76-Minor-Wands-Queen',
            3: '/images/gallery/62-Minor-Cups-Queen',
            4: '/images/gallery/48-Minor-Swords-Queen',
            5: '/images/gallery/34-Minor-Discs-Queen',
            6: '/images/gallery/77-Minor-Wands-King',
            7: '/images/gallery/63-Minor-Cups-King',
            8: '/images/gallery/49-Minor-Swords-King',
            9: '/images/gallery/35-Minor-Discs-King',
            10: '/images/gallery/75-Minor-Wands-Knight',
            11: '/images/gallery/61-Minor-Cups-Knight',
            12: '/images/gallery/47-Minor-Swords-Knight',
            13: '/images/gallery/33-Minor-Discs-Knight',
            14: '/images/gallery/74-Minor-Wands-Page',
            15: '/images/gallery/60-Minor-Cups-Page',
            16: '/images/gallery/46-Minor-Swords-Page',
            17: '/images/gallery/32-Minor-Discs-Page',
            18: '/images/gallery/21-Major-World',
            19: '/images/gallery/20-Major-Judgement',
            20: '/images/gallery/19-Major-Sun',
            21: '/images/gallery/18-Major-Moon',
            22: '/images/gallery/17-Major-Star',
            23: '/images/gallery/16-Major-Tower',
            24: '/images/gallery/14-Major-Temperance',
            25: '/images/gallery/13-Major-Death',
            26: '/images/gallery/12-Major-Hanged',
            27: '/images/gallery/11-Major-Strenght',
            28: '/images/gallery/10-Major-Fortune',
            29: '/images/gallery/09-Major-Hermit',
            30: '/images/gallery/08-Major-Justice',
            31: '/images/gallery/07-Major-Chariot',
            32: '/images/gallery/06-Major-Lovers',
            33: '/images/gallery/05-Major-Hierophant',
            34: '/images/gallery/04-Major-Emperor',
            35: '/images/gallery/03-Major-Empress',
            36: '/images/gallery/02-Major-Priestess',
            37: '/images/gallery/01-Major-Magician',
        },
        tarot_cards_count = 1,
        tarot_cur_card = 0,
        tarot_devil_status = 0,
        tarot_cur_cell,
        tarot_themplate_url = 'url(http://wizardtarot.ru/wp-content/themes/wizardtarot/';
        // Функция вывода карт в ячейки
        tarot_randomizer = function(tarot_cell){
            // Если карт в колоде больше нет
            if(Object.keys(tarot_cards).length === 0){
                console.log('empty');
            } else {
                // Вывод первой карты
                if(tarot_devil_status == 0){
                    tarot_cell.find('.hexagon-in2').removeClass('tarot_empty_cell').css('backgroundImage', tarot_themplate_url+tarot_cards[tarot_cur_card]+'-min.png)');
                    tarot_cell.find('.overlay').find('a').attr('href', tarot_themplate_url+tarot_cards[tarot_cur_card]+'.png)');
                    delete tarot_cards[tarot_cur_card];
                    tarot_devil_status = 1;
                    tarot_cards_count ++;
                // Вывод остальных карт
                } else {
                    tarot_cur_card = (Math.round(Math.random() * (37 - 0)));
                    if(tarot_cards[tarot_cur_card]){
                        tarot_cell.find('.hexagon-in2').removeClass('tarot_empty_cell').addClass('tarot_full_cell').css('backgroundImage', tarot_themplate_url+tarot_cards[tarot_cur_card]+'-min.png)');
                        tarot_cell.find('.overlay').find('a').attr('href', tarot_themplate_url+tarot_cards[tarot_cur_card]+'.png)');
                        delete tarot_cards[tarot_cur_card];
                        console.log('right—'+tarot_cur_card);
                        console.log(tarot_cards);
                    } else {
                        console.log('wrong—'+tarot_cur_card);
                        tarot_randomizer(tarot_cur_cell);
                    }
                }
            }
        };
    // Клик по ячейке
    jQuery('.hex.tarot_cell_item').on('click', function(event) {
        // Если выложены все карты
        if(jQuery(this).hasClass('tarot_has_card') && Object.keys(tarot_cards).length === 0){
            // Если открыто менее 3 карт открываем следующую карту
            if (tarot_cards_count <= 3) {
                tarot_cards_count ++;
                jQuery(this).removeClass('tarot_card_reject')
                jQuery(this).find('.hexagon-in2').removeClass('tarot_full_cell');
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
});
