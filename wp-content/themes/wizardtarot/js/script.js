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
        tarot_devil_cell,
        tarot_cur_card = 0,
        tarot_devil_status = 0,
        tarot_cur_cell,
        tarot,
        prot_card,
        pointsStatus = true,
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
                    tarot_cur_card = (Math.round(Math.random() * (37 - 0)));
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
    //Перетягивание элементов
    jQuery( ".draggable" ).draggable({ 
        snap: false
    });
    // Клик по ячейке
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
    // Переход к загрузке фото
    jQuery('.tarot_sucess').on('click', function(event) {
        jQuery('.first_slide, .tarot_to_photo').addClass('hidden');
        jQuery('.second_slide').removeClass('hidden');
    });
    // Если фото уже загружено
    if(jQuery('.tarot_returned_img')){
        jQuery('.third_slide').removeClass('hidden');
        jQuery('.tarot_prot_returned').css('background', 'url('+jQuery(".tarot_returned_img").attr('src')+') no-repeat top left/100%');
        //Получение данных из локального хранилища
        if(supportsStorage && localStorage.getItem('prot_card')){
            prot_card = localStorage.getItem('prot_card');
        }
        console.log(prot_card);
        jQuery('.tarot_prot_cell_1, .tarot_prot_cell_2, .tarot_prot_cell_4, .tarot_prot_cell_5').css('background', 'url('+prot_card+') no-repeat top left/100%');
    }
    tarot = function(){
    //фаза 1
        reloadTime = 0;
        reloadTime1 = 0;
        d12Val = 0;
        cur_animation_val = 0;
        count_animation = 1;
        phaseOne = setInterval(function(){
            if (count_animation <= 344){                                                                         //90
                jQuery('#draggableD12')
                    .css({
                        opacity: 0.8,
                        transform: 'scale(1)',
                        background: '#fff url(/wp-content/themes/wizardtarot/images/lovushka.jpg) 0 0/100% no-repeat',
                        transform: 'rotate(-'+d12Val+'deg)',
                        borderColor: 'transparent'
                    });
                jQuery('.itemZone')
                    .addClass('hidden')
                    .css({
                        color: 'transparent',
                        borderColor: 'transparent'
                    });
                count_animation += 1;
                console.log(count_animation);
                if(count_animation <= 117){
                    if(count_animation > 15){
                        jQuery('#draggableD12').removeClass('hidden');
                    }
                    cur_animation_val += 1.5;
                    d12Val+= 9;
                    jQuery('.box_rounded').css('transform', 'rotate('+cur_animation_val+'deg) scale(1)');
                } else if (count_animation >= 117 && count_animation <= 228){
                    cur_animation_val -= 1.5;
                    d12Val+= 9;
                    jQuery('#draggableD12').css('transform', 'rotate(-'+d12Val+'deg)');
                    jQuery('.box_rounded').css('transform', 'rotate('+cur_animation_val+'deg) scale(1)');
                } else if (count_animation >= 228 && count_animation <= 292){
                    if(count_animation > 225){
                        jQuery('#draggableD12').addClass('hidden')
                    }
                    cur_animation_val -= 1.5;
                    d12Val+= 9;
                    jQuery('.box_rounded').css('transform', 'rotate('+cur_animation_val+'deg) scale(1)');
                    jQuery('#draggableD12').css('transform', 'rotate('+d12Val+'deg)');
                    jQuery('#draggableD12').css('background', '#fff url(/wp-content/themes/wizardtarot/images/daemon.png) 0 0/100% no-repeat');
                } else if (count_animation >= 292 && count_animation <= 344){
                    cur_animation_val += 1.5;
                    d12Val+= 9;
                    jQuery('.box_rounded').css('transform', 'rotate('+cur_animation_val+'deg) scale(1)');
                    jQuery('#draggableD12').css('transform', 'rotate('+d12Val+'deg)');
                    jQuery('#draggableD12').css('background', '#fff url(/wp-content/themes/wizardtarot/images/daemon.png) 0 0/100% no-repeat');
                } else {
                    d12Val+= 9;
                    cur_animation_val += 1.5;
                    jQuery('.box_rounded').css('transform', 'rotate('+cur_animation_val+'deg) scale(1)');
                    jQuery('#draggableD12').css('transform', 'rotate('+d12Val+'deg)');
                    jQuery('#draggableD12').css('background', '#fff url(/wp-content/themes/wizardtarot/images/daemon.png) 0 0/100% no-repeat');
                }
            } else {
                clearInterval(phaseOne);
                count_animation = 1;
                // jQuery('#draggableD12').addClass('hidden');
            }
        }, 250);
    };
    jQuery('.tarot_start').on('click', function(event) {
        checkPoints()
        if(pointsStatus == false){
            swal("Не все зоны перенесены", "Перед началом процедуры необходимо перенести все зоны", "info")
        } else {
            tarot();
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
