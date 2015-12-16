<!DOCTYPE html>
  <head>
    <title><?php wp_title(); ?></title>
    <meta name="keywords" content="" />
  <meta name="description" content="" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Bootstrap -->
    <link href="<?php bloginfo('template_url'); ?>/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php bloginfo('template_url'); ?>/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/templatemo_misc.css">
    <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/sweet-alert.css">
    <link href='http://fonts.googleapis.com/css?family=Raleway:400,100,600' rel='stylesheet' type='text/css'>
    <link href="<?php bloginfo('template_url'); ?>/style.css" rel="stylesheet">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/images/favicon.ico">
    <?php wp_head(); ?>  
    <script src="<?php bloginfo('template_url'); ?>/js/jquery-1.10.2.min.js"></script> 
    <script src="<?php bloginfo('template_url'); ?>/js/jquery.lightbox.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/templatemo_custom.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/sweet-alert.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/script.js"></script>
    <script>
    function showhide()
    {
      var div = document.getElementById("newpost");
      if (div.style.display !== "none")
      {
        div.style.display = "none";
      }
      else {
        div.style.display = "block";
      }
    }
    </script>

  </head>
  <body>
    <div class="site-header">
    <div class="main-navigation">
      <div class="responsive_menu">
        <ul>
          <li><a class="show-1 templatemo_home" href="/">Wizard Tarot</a></li>
          <li><a class="show-2 templatemo_page2" href="/">Wizard Machine</a></li>
          <li><a class="show-3 templatemo_page3" href="/">Wizard Duos</a></li>
          <li><a class="show-5 templatemo_page5" href="/">Braincleaner</a></li>
        </ul>
      </div>
      <div class="container">
        <div class="row templatemo_gallerygap">
          <div class="col-md-12 responsive-menu">
            <a href="#" class="menu-toggle-btn">
                    <i class="fa fa-bars"></i>
                </a>
          </div> <!-- /.col-md-12 -->
                    <div class="col-md-3 col-sm-12">
                      <a href="/"><img src="<?php bloginfo('template_url'); ?>/images/logo.png" alt="<?php wp_title(); ?>"></a>
                    </div>
          <div class="col-md-9 main_menu">
            <ul>
              <li><a class="show-1 templatemo_home" href="#">
                              <span class="fa fa-camera"></span>
                                Wizard Tarot</a></li>
              <li><a class="show-2 templatemo_page2" href="#">
                              <span class="fa fa-users"></span>
                                Wizard Machine</a></li>
              <li><a class="show-3 templatemo_page3" href="#">
                              <span class="fa fa-cogs"></span>
                                Wizard Duos</a></li>
              <li><a class="show-5 templatemo_page5" href="#">
                              <span class="fa fa-envelope"></span>
                                Braincleaner</a></li>
            </ul>
          </div> <!-- /.col-md-12 -->
        </div> <!-- /.row -->
      </div> <!-- /.container -->
    </div> <!-- /.main-navigation -->
  </div> <!-- /.site-header -->
  <div id="menu-container">
  <?php if(is_front_page()) { ?>
    <?php include(TEMPLATEPATH . '/frontpage.php'); ?>
  <?php } else if(is_page('6')) { ?>
    <?php include(TEMPLATEPATH . '/wizard.php'); ?>
  <?php } ?>
    </div>
  <!-- footer start -->
    <div class="templatemo_footer">
      <div class="container">
      <div class="row">
          <div class="col-md-9 col-sm-12">Все права защищены &copy; 2015 Wizard Tarot</div>
            <div class="col-md-3 col-sm-12 templatemo_rfooter">
                <a href="#">
                  <div class="hex_footer">
          <span class="fa fa-facebook"></span>
          </div>
                  </a>
                  <a href="#">
                    <div class="hex_footer">
           <span class="fa fa-twitter"></span>
          </div>
                    </a>
                  <a href="#">
                  <div class="hex_footer">
           <span class="fa fa-linkedin"></span>
          </div>
                 </a>
                <a href="#">
                  <div class="hex_footer">
           <span class="fa fa-rss"></span>
          </div>
                </a>
            </div>
        </div>
        </div>
    </div>
    <!-- footer end -->    
  <script>
  $('.gallery_more').click(function(){
    var $this = $(this);
    $this.toggleClass('gallery_more');
    if($this.hasClass('gallery_more')){
      $this.text('Показать больше');      
    } else {
      $this.text('Показать меньше');
    }
  });
    </script>
<!-- templatemo 400 polygon -->
  <?php wp_footer(); ?>
  </body>
</html>
