jQuery(function() {
    var tarot_cards = {
            0: '/images/gallery/15-Major-Devil-min.png',
            2: '/images/gallery/76-Minor-Wands-Queen.png',
            3: '/images/gallery/62-Minor-Cups-Queen-min.png',
            4: '/images/gallery/48-Minor-Swords-Queen-min.png',
            5: '/images/gallery/34-Minor-Discs-Queen-min.png',
            6: '/images/gallery/77-Minor-Wands-King-min.png',
            7: '/images/gallery/63-Minor-Cups-King-min.png',
            8: '/images/gallery/49-Minor-Swords-King-min.png',
            9: '/images/gallery/35-Minor-Discs-King-min.png',
            10: '/images/gallery/75-Minor-Wands-Knight-min.png',
            11: '/images/gallery/61-Minor-Cups-Knight-min.png',
            12: '/images/gallery/47-Minor-Swords-Knight-min.png',
            13: '/images/gallery/33-Minor-Discs-Knight-min.png',
            14: '/images/gallery/74-Minor-Wands-Page-min.png',
            15: '/images/gallery/60-Minor-Cups-Page-min.png',
            16: '/images/gallery/46-Minor-Swords-Page-min.png',
            17: '/images/gallery/32-Minor-Discs-Page-min.png',
            18: '/images/gallery/21-Major-World-min.png',
            19: '/images/gallery/20-Major-Judgement-min.png',
            20: '/images/gallery/19-Major-Sun-min.png',
            21: '/images/gallery/18-Major-Moon-min.png',
            22: '/images/gallery/17-Major-Star-min.png',
            23: '/images/gallery/16-Major-Tower-min.png',
            24: '/images/gallery/14-Major-Temperance-min.png',
            25: '/images/gallery/13-Major-Death-min.png',
            26: '/images/gallery/12-Major-Hanged-min.png',
            27: '/images/gallery/11-Major-Strenght-min.png',
            28: '/images/gallery/10-Major-Fortune-min.png',
            29: '/images/gallery/09-Major-Hermit-min.png',
            30: '/images/gallery/08-Major-Justice-min.png',
            31: '/images/gallery/07-Major-Chariot-min.png',
            32: '/images/gallery/06-Major-Lovers-min.png',
            33: '/images/gallery/05-Major-Hierophant-min.png',
            34: '/images/gallery/04-Major-Emperor-min.png',
            35: '/images/gallery/03-Major-Empress-min.png',
            36: '/images/gallery/02-Major-Priestess-min.png',
            37: '/images/gallery/01-Major-Magician-min.png',
            38: '/images/gallery/00-Major-Fool-min.png',
        },
        tarot_cur_card,
        tarot_randomizer = function(){
            console.log(Math.round(Math.random() * (38 - 0)));
        }
    phaseOne = setInterval(function(){
        tarot_randomizer();
        console.log(tarot_cards());
    }, 1000);   
});
