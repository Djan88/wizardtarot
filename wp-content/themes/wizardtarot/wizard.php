<!-- gallery start -->
<div class="content homepage" id="menu-1">
        <?php if(is_user_logged_in()){ ?>

            <?php
                if($_POST['mci_magic']){
                    $sImage = uploadImageFile();
                    echo '<img class="tarot_returned_img hidden" src="'.$sImage.'" />';
                }
                $user = get_current_user_id();
                $cur_user_data = get_userdata($user);
                $user_reg = $cur_user_data->get('user_registered');
                $user_login = $cur_user_data->get('user_login');
                $user_mail = $cur_user_data->get('user_email');
                $year_val = 31536000;
                $regtime = strtotime($user_reg);
                $cur_data = time();
                $ratio =($cur_data - $regtime) - $year_val;
            ?>

            <?php if(current_user_can('contributor') && $ratio > 0) { ?>
                <div class="machine_screen clearfix" style="text-align:center;">
                    <h2 class="heading heading_dashboard">Срок действия вашей лицензии истек</h2>
                    <h3 class="heading">Информация по вашему аккаунту</h3>
                    <table class="user_info">
                      <tr>
                        <th>Ваш логин</th><td><?php echo $user_login; ?></td>
                      </tr>
                      <tr>
                        <th>Ваш email </th><td><?php echo $user_mail; ?></td>
                      </tr>
                      <tr>
                        <th>Дата активации лицензии</th><td><?php echo $user_reg; ?></td>
                      </tr>
                    </table>
                    <h3 class="heading">Вы можете продлить лицензию на 1 год со скидкой 50%</h3>
                    <a href="#contact_form_pop" class="btn btn_lg btn_success btn_licens fancybox">Продлить лицензию</a>
                    <h6 style="color:red;">Не сообщайте посторонним лицам ваш пароль на вход в программу.<br>Администрация проекта никогда не попросит его!</h6>
                    <div class="fancybox-hidden" style="display: none;">
                      <div id="contact_form_pop">
                        <h5 class="heading">Заполните форму</h5>
                        <h6 class="heading">Внесите данные по вашему аккаунту из таблицы выше</h6>
                        <hr>
                        <?php echo do_shortcode('[contact-form-7 id="111" title="Продление лицензии"]'); ?>
                        <h5 class="heading">или позвоните по телефону</h5>
                        <hr>
                        <h3 class="heading">+7 (495) 255-05-61 — Роман</h3>
                      </div>
                    </div>
                </div>
            <?php } else if(current_user_can('contributor') || current_user_can('administrator')) { ?>
                <div class="third_slide container animated fadeInDown hidden">
                    <div class="well tarot_to_prev">
                      <button type="button" class="btn btn-primary btn-lg btn-block tarot_back">Назад</button>
                    </div>
                    <div class="tarot_zones well">
                        <div id="draggable0" class="itemlist_item itemZone item_list__mid draggable" style="left: 6px; top: 6px;">D++</div>
                        <div id="draggable1" class="itemlist_item itemZone item_list__mid draggable" style="left: 71px; top: 6px;">D+</div>
                        <div id="draggable2" class="itemlist_item itemZone item_list__mid draggable" style="left: 136px; top: 6px;">S++</div>
                        <div id="draggable3" class="itemlist_item itemZone item_list__mid draggable" style="left: 202px; top: 6px;">S+</div>
                        <!-- <div id="draggable4" class="itemlist_item itemZone item_list__mid draggable" style="left: 210px; top: 10px;">V0</div> -->
                        <div id="draggable5" class="itemlist_item itemZone item_list__mid draggable" style="left: 268px; top: 6px;">V1</div>
                        <div id="draggable6" class="itemlist_item itemZone item_list__mid draggable" style="left: 334px; top: 6px;">V2</div>
                        <div id="draggable7" class="itemlist_item itemZone item_list__mid draggable" style="left: 400px; top: 6px;">V3</div>
                        <div id="draggable8" class="itemlist_item itemZone item_list__mid draggable" style="left: 466px; top: 6px;">V4</div>
                    </div>
                    <div class="chart" data-percent="0"><span>0</span>%</div>
                    <div class="tarot_prot_cell tarot_prot_cell_1"></div>
                    <div class="tarot_prot_cell tarot_prot_cell_2"></div>
                    <div class="tarot_prot_cell tarot_prot_cell_3 tarot_prot_returned"></div>
                    <div class="tarot_prot_cell tarot_prot_cell_4"></div>
                    <div class="tarot_prot_cell tarot_prot_cell_5"></div>
                    <!-- <div class="box_rounded">
                        <li id="draggableD12" class="itemlist_item item_list__mid draggable hidden" style="left: 45%; top: 5px;"></li>
                    </div> -->
                    <div class="well tarot_to_photo">
                      <button type="button" class="btn btn-primary btn-lg btn-block tarot_start">Старт</button>
                    </div>
                </div>
                <div class="four_slide container animated fadeInDown hidden">
                  <div class="container">
                    <div class="col-xs-1"></div>
                    <div class="col-xs-4 elems_devil elems_devil-devil" id="elems_devil-devil">
                      <div class="devil_move" id="devil_move"></div>
                    </div>
                    <div class="col-xs-2 elems_graph"></div>
                    <div class="col-xs-4 elems_devil elems_devil-client"></div>
                    <div class="col-xs-1"></div>
                  </div>
                  <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-md-4 col-md-offset-4 elem_prots">
                              <h2>Выберите протокол</h2>
                              <div class="btn-group">
                                <button type="button" class="btn btn-default btn-lg elem-choice-item btn-default" data-elem="jezl">2</button>
                                <button type="button" class="btn btn-default btn-lg elem-choice-item btn-default" data-elem="sword">3</button>
                                <button type="button" class="btn btn-default btn-lg elem-choice-item btn-default" data-elem="cup">4</button>
                                <button type="button" class="btn btn-default btn-lg elem-choice-item btn-default" data-elem="pentacle">5</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div class="five_slide container animated fadeInDown hidden">
                  <div class="container">
                    <div class="row">
                      <div class="col-xs-12 top_imgs">
                        <div class="col-xs-1">
                          <button type="button" class="btn btn-default btn-lg to_devil_screen btn-default pull-left">Назад</button>
                          <div class="tarot_zones well">
                            <div id="draggable21" class="itemlist_item itemZone item_list__mid draggable ui-draggable ui-draggable-handle elems_zone" style="left: 6px; top: 6px;">V2</div>
                            <div id="draggable31" class="itemlist_item itemZone item_list__mid draggable ui-draggable ui-draggable-handle elems_zone" style="left: 6px; top: 45px;">V3</div>
                            <div id="draggable41" class="itemlist_item itemZone item_list__mid draggable ui-draggable ui-draggable-handle elems_zone" style="left: 6px; top: 84px;">V4</div>
                            <div id="draggable51" class="itemlist_item itemZone item_list__mid draggable ui-draggable ui-draggable-handle elems_zone" style="left: 6px; top: 123px;">V5</div>
                        </div>
                        </div>
                        <div class="col-xs-10">
                          <div class="row">
                            <!-- <div class="col-xs-1 elems_prot_screen elem_card_place"></div> -->
                          </div>
                        </div>
                        <div class="col-xs-1">
                          <button type="button" class="btn btn-default btn-lg elem_prot_start btn-default pull-right">Старт</button>
                          <div class="chart" data-percent="0"><span>0</span>%</div>
                        </div>
                      </div>
                      <div class="col-xs-3 col-xs-offset-2 elems_prot_screen elems_returned_img"></div>
                      <div class="col-xs-5">
                        <div class="row">
                          <div class="first_cards cards_wrapper  animated fadeInRight hidden col-xs-12">
                            <div class="col-xs-2 elem_card_place elem_card_1" style="margin-left: 10px"></div>
                            <div class="col-xs-2 elem_card_place elem_card_2" style="margin-left: 10px"></div>
                            <div class="col-xs-2 elem_card_place elem_card_3" style="margin-left: 10px"></div>
                            <div class="col-xs-2 elem_card_place elem_card_4" style="margin-left: 10px"></div>
                            <div class="col-xs-2 elem_card_place" style="margin-left: 10px; background: #fff url(/wp-content/themes/wizardtarot/images/gallery/solar.png) 0 0/100% no-repeat;"></div>
                          </div>
                          <div class="second_cards cards_wrapper  animated fadeInRight hidden col-xs-12">
                            <div class="col-xs-2 elem_card_place elem_card_4" style="margin-left: 10px"></div>
                            <div class="col-xs-2 elem_card_place elem_card_3" style="margin-left: 10px"></div>
                            <div class="col-xs-2 elem_card_place elem_card_2" style="margin-left: 10px"></div>
                            <div class="col-xs-2 elem_card_place elem_card_1" style="margin-left: 10px"></div>
                            <div class="col-xs-2 elem_card_place" style="margin-left: 10px; background: #fff url(/wp-content/themes/wizardtarot/images/gallery/solar.png) 0 0/100% no-repeat;"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            <?php } else { ?>
                <div style="text-align: center">Вы видите это сообщение, потому, что зашли на сайт проекта <a href="http://wizardtarot.ru/">WizardTarot</a>. По всем вопросам обращаться на <a href="mailto:info@chikurov.com">info@chikurov.com</a></div>
            <?php } ?>
        <?php } else { ?>
            <div class="login__form">
                <form name="loginform" id="loginform" action="<?php echo esc_url( site_url( 'wp-login.php', 'login_post' ) ); ?>" method="post">
                    <p>
                        <label for="user_login"><?php _e('Username') ?><br />
                        <input type="text" name="log" id="user_login" class="input" value="<?php echo esc_attr($user_login); ?>" size="20" /></label>
                    </p>
                    <p>
                        <label for="user_pass"><?php _e('Password') ?><br />
                        <input type="password" name="pwd" id="user_pass" class="input" value="" size="20" /></label>
                    </p>
                    <?php
                    /**
                     * Fires following the 'Password' field in the login form.
                     *
                     * @since 2.1.0
                     */
                    do_action( 'login_form' );
                    ?>
                    <!-- <p class="note_small">Что бы получить доступ </p> -->
                    <p class="forgetmenot"><label for="rememberme"><input name="rememberme" type="checkbox" id="rememberme" value="forever" <?php checked( $rememberme ); ?> /> <?php esc_attr_e('Remember Me'); ?></label></p>
                    <p class="submit">
                        <input type="submit" name="wp-submit" id="wp-submit" class="button button-primary button-large" value="<?php esc_attr_e('Log In'); ?>" />
                <?php   if ( $interim_login ) { ?>
                        <input type="hidden" name="interim-login" value="1" />
                <?php   } else { ?>
                        <input type="hidden" name="redirect_to" value="<?php echo esc_attr($redirect_to); ?>" />
                <?php   } ?>
                <?php   if ( $customize_login ) : ?>
                        <input type="hidden" name="customize-login" value="1" />
                <?php   endif; ?>
                        <input type="hidden" name="testcookie" value="1" />
                    </p>
                </form>
            </div>
        <?php } ?>









<!-- <div class="container">
  <div class="row">
      <div class="templatemo_loadmore">
   <button class="gallery_more" id="button" onClick="showhide()">Показать больше</button>
        </div>
    </div>
</div> -->
</div>
  <!-- gallery end -->
<!-- contact end -->
<!-- team start -->
<div class="content team" id="menu-2">
 <div class="templatemo_ourteam">
    <div class="container templatemo_hexteam">
          <div class="row">
              <div class="col-md-3 col-sm-4">
               <div class="hexagon hexagonteam gallery-item">
                   <div class="hexagon-in1">
                    <div class="hexagon-in2" style="background-image: url(<?php bloginfo('template_url'); ?>/images/team/1.jpg);">
                    <div class="overlay templatemo_overlay1">
                      <a href="#">
                         <div class="smallhexagon">
                           <span class="fa fa-facebook"></span>
                        </div>
                        </a>
                    </div>
                    <div class="overlay templatemo_overlay2">
                      <a href="#">
                         <div class="smallhexagon">
                           <span class="fa fa-twitter"></span>
                        </div>
                        </a>
                    </div>
                    <div class="overlay templatemo_overlay3">
                      <a href="#">
                         <div class="smallhexagon">
                           <span class="fa fa-linkedin"></span>
                        </div>
                        </a>
                    </div>
                    <div class="overlay templatemo_overlay4">
                      <a href="#">
                         <div class="smallhexagon">
                           <span class="fa fa-rss"></span>
                        </div>
                        </a>
                    </div>
                    <div class="clear"></div>
                    <div class="overlay templatemo_overlaytxt">Phasellus interdum</div>
                    </div>
                </div>
              </div>
           </div>
                <div class="col-md-3 col-sm-8 templatemo_servicetxt" >
                  <h2>Free Template</h2>
                    <p>Polygon is free HTML5 template by <span class="blue">template</span><span class="green">mo</span> that can be used for any purpose. You can remove any credit link. Please tell your friends about our website. Cras lobortis, ligula ut hendrerit condimentum, magna lorem lobortis nisi, ac suscipit nunc est vitae turpis.</p>
                </div>
                <div class="templatemo_servicecol2">
                <div class="col-md-3 col-sm-4">
                       <div class="hexagon hexagonteam gallery-item">
                           <div class="hexagon-in1">
                            <div class="hexagon-in2" style="background-image: url(<?php bloginfo('template_url'); ?>/images/team/2.jpg);">
                            <div class="overlay templatemo_overlay1">
                              <a href="#">
                                 <div class="smallhexagon">
                                   <span class="fa fa-facebook"></span>
                                </div>
                                </a>
                            </div>
                            <div class="overlay templatemo_overlay2">
                              <a href="#">
                                 <div class="smallhexagon">
                                   <span class="fa fa-twitter"></span>
                                </div>
                                </a>
                            </div>
                            <div class="overlay templatemo_overlay3">
                              <a href="#">
                                 <div class="smallhexagon">
                                   <span class="fa fa-linkedin"></span>
                                </div>
                                </a>
                            </div>

                            <div class="overlay templatemo_overlay4">
                              <a href="#">
                                 <div class="smallhexagon">
                                   <span class="fa fa-rss"></span>
                                </div>
                                </a>
                            </div>
                            <div class="clear"></div>
                            <div class="overlay templatemo_overlaytxt">Cras interdum accumsan diam</div>
                            </div>
                        </div>
                      </div>
           </div>
                <div class="col-md-3 col-sm-8 templatemo_servicetxt">
                  <h2>Responsive Design</h2>
                    <p>This is free mobile template which is compatible with tablets and mobile phones. Mauris eget neque at sapien faucibus egestas vel vitae mi. Maecenas commodo augue risus, sed placerat neque feugiat vel. Fusce augue urna, faucibus et nulla bibendum, luctus porttitor nulla.</p>
                </div>
                </div>
           </div>
        </div>
        <div class="clear"></div>
        <div class="container templatemo_hexteam s_top">
          <div class="row">
              <div class="col-md-3 col-sm-4">
                       <div class="hexagon hexagonteam gallery-item">
                           <div class="hexagon-in1">
                            <div class="hexagon-in2" style="background-image: url(<?php bloginfo('template_url'); ?>/images/team/3.jpg);">
                            <div class="overlay templatemo_overlay1">
                              <a href="#">
                                 <div class="smallhexagon">
                                   <span class="fa fa-facebook"></span>
                                </div>
                                </a>
                            </div>
                            <div class="overlay templatemo_overlay2">
                              <a href="#">
                                 <div class="smallhexagon">
                                   <span class="fa fa-twitter"></span>
                                </div>
                                </a>
                            </div>
                            <div class="overlay templatemo_overlay3">
                              <a href="#">
                                 <div class="smallhexagon">
                                   <span class="fa fa-linkedin"></span>
                                </div>
                                </a>
                            </div>
                            <div class="overlay templatemo_overlay4">
                              <a href="#">
                                 <div class="smallhexagon">
                                   <span class="fa fa-rss"></span>
                                </div>
                                </a>
                            </div>
                            <div class="clear"></div>
                            <div class="overlay templatemo_overlaytxt">Morbi pulvinar</div>
                            </div>
                        </div>
                      </div>
           </div>
                <div class="col-md-3 col-sm-8 templatemo_servicetxt" >
                  <h2>Mobile Ready</h2>
                    <p>Sed laoreet, enim quis euismod egestas, risus tortor tincidunt lacus, in iaculis mauris lectus at augue. Donec luctus nibh nec ullamcorper feugiat. Phasellus felis urna, lobortis vitae lacus sit amet, tristique consectetur nibh.</p>
                </div>
                <div class="templatemo_servicecol2">
                <div class="col-md-3 col-sm-4">
                       <div class="hexagon hexagonteam gallery-item">
                           <div class="hexagon-in1">
                            <div class="hexagon-in2" style="background-image: url(<?php bloginfo('template_url'); ?>/images/team/4.jpg);">
                            <div class="overlay templatemo_overlay1">
                              <a href="#">
                                 <div class="smallhexagon">
                                   <span class="fa fa-facebook"></span>
                                </div>
                                </a>
                            </div>
                            <div class="overlay templatemo_overlay2">
                              <a href="#">
                                 <div class="smallhexagon">
                                   <span class="fa fa-twitter"></span>
                                </div>
                                </a>
                            </div>
                            <div class="overlay templatemo_overlay3">
                              <a href="#">
                                 <div class="smallhexagon">
                                   <span class="fa fa-linkedin"></span>
                                </div>
                                </a>
                            </div>
                            <div class="overlay templatemo_overlay4">
                              <a href="#">
                                 <div class="smallhexagon">
                                   <span class="fa fa-rss"></span>
                                </div>
                                </a>
                            </div>
                            <div class="clear"></div>
                            <div class="overlay templatemo_overlaytxt">Sed nonummy</div>
                            </div>
                        </div>
                      </div>
           </div>
                <div class="col-md-3 col-sm-8 templatemo_servicetxt">
                  <h2>HTML5 CSS3</h2>
                    <p>Phasellus sodales magna orci, id scelerisque lectus faucibus a. Vivamus varius tincidunt sem. Etiam ultricies orci sit amet sem egestas varius vitae at lacus. Nunc blandit elit in mauris semper, id iaculis felis condimentum.</p>
                </div>
                </div>
           </div>
        </div>
        
 </div>
 </div>
<!--team end-->
<div class="clear"></div>
<!-- service start -->
<div class="content services" id="menu-3">
<div class="container">
  <div class="row templatemo_servicerow">
      <div class="templatemo_hexservices col-sm-6">
          <div class="blok text-center">
              <div class="hexagon-a">
                 <a class="hlinktop" href="#">
                   <div class="hexa-a">
                      <div class="hcontainer-a">
                      <div class="vertical-align-a">
                        <span class="texts-a"><i class="fa fa-bell"></i></span>
                      </div>
                    </div>
                     </div>
                 </a>
              </div>  
                 <div class="hexagonservices">
                  <a class="hlinkbott" href="#">
                    <div class="hexa">
                      <div class="hcontainer">
                      <div class="vertical-align">
                      <span class="texts"></span>
                      </div>
                    </div>
                  </div>
                    </a>
                 </div>
                 </div>
                 <div class="templatemo_servicetext">
                <h3>Etiam vulputate</h3>
                <p>Vestibulum diam lorem, aliquet et sagittis ac, facilisis nec massa. Suspendisse sagittis leo diam, sed dapibus eros vehicula eu. Aenean nulla magna, gravida at dui in, fringilla vestibulum massa.</p>
                </div>
          </div>
          <div class="templatemo_hexservices col-sm-6">
          <div class="blok text-center">
              <div class="hexagon-a">
                 <a class="hlinktop" href="#">
                   <div class="hexa-a">
                      <div class="hcontainer-a">
                      <div class="vertical-align-a">
                        <span class="texts-a"><i class="fa fa-briefcase"></i></span>
                      </div>
                    </div>
                     </div>
                 </a>
              </div>  
                 <div class="hexagonservices">
                  <a class="hlinkbott" href="#">
                    <div class="hexa">
                      <div class="hcontainer">
                      <div class="vertical-align">
                      <span class="texts"></span>
                      </div>
                    </div>
                  </div>
                    </a>
                 </div>
                 </div>
                 <div class="templatemo_servicetext">
                <h3>Aliquam faucibus</h3>
                <p>Vivamus a purus vel ante fermentum bibendum. Sed laoreet, enim quis euismod egestas, risus tortor tincidunt lacus, in iaculis mauris lectus at augue. Donec luctus nibh nec ullamcorper feugiat.</p>
                </div>
          </div>
          <div class="templatemo_hexservices col-sm-6">
          <div class="blok text-center">
              <div class="hexagon-a">
                 <a class="hlinktop" href="#">
                   <div class="hexa-a">
                      <div class="hcontainer-a">
                      <div class="vertical-align-a">
                        <span class="texts-a"><i class="fa fa-mobile"></i></span>
                      </div>
                    </div>
                     </div>
                 </a>
              </div>  
                 <div class="hexagonservices">
                  <a class="hlinkbott" href="#">
                    <div class="hexa">
                      <div class="hcontainer">
                      <div class="vertical-align">
                      <span class="texts"></span>
                      </div>
                    </div>
                  </div>
                    </a>
                 </div>
                 </div>
                 <div class="templatemo_servicetext">
                <h3>Donec sagittis</h3>
                <p>Phasellus sodales magna orci, id scelerisque lectus faucibus a. Vivamus varius tincidunt sem. Etiam ultricies orci sit amet sem egestas varius vitae at lacus. Nunc blandit elit in mauris semper, id iaculis felis condimentum.</p>
                </div>
          </div>
          <div class="templatemo_hexservices col-sm-6">
          <div class="blok text-center">
              <div class="hexagon-a">
                 <a class="hlinktop" href="#">
                   <div class="hexa-a">
                      <div class="hcontainer-a">
                      <div class="vertical-align-a">
                        <span class="texts-a"><i class="fa fa-trophy"></i></span>
                      </div>
                    </div>
                     </div>
                 </a>
              </div>  
                 <div class="hexagonservices">
                  <a class="hlinkbott" href="#">
                    <div class="hexa">
                      <div class="hcontainer">
                      <div class="vertical-align">
                      <span class="texts"></span>
                      </div>
                    </div>
                  </div>
                    </a>
                 </div>
                 </div>
                 <div class="templatemo_servicetext">
                <h3>Integer tempus</h3>
                <p>Maecenas porttitor erat et enim dapibus, sit amet accumsan velit tincidunt. Etiam sapien urna, suscipit ut purus ac, convallis pulvinar tellus. In eu neque purus. Donec cursus dictum pulvinar.</p>
                </div>
          </div>
          <div class="templatemo_hexservices col-sm-6">
          <div class="blok text-center">
              <div class="hexagon-a">
                 <a class="hlinktop" href="#">
                   <div class="hexa-a">
                      <div class="hcontainer-a">
                      <div class="vertical-align-a">
                        <span class="texts-a"><i class="fa fa-thumb-tack"></i></span>
                      </div>
                    </div>
                     </div>
                 </a>
              </div>  
                 <div class="hexagonservices">
                  <a class="hlinkbott" href="#">
                    <div class="hexa">
                      <div class="hcontainer">
                      <div class="vertical-align">
                      <span class="texts"></span>
                      </div>
                    </div>
                  </div>
                    </a>
                 </div>
                 </div>
                 <div class="templatemo_servicetext">
                <h3>Aliquam pellentesque</h3>
                <p>Nam auctor elementum dolor. Donec euismod, justo sed convallis blandit, ipsum erat mattis lectus, vel pharetra neque enim tristique risus. Ut consequat nisi vel justo. Curabitur in orci vel enim congue cursus.</p>
                </div>
          </div>
          
    </div>
</div>
</div>
<!-- service end -->
<!-- contact start -->
<div class="content contact" id="menu-5">
<div class="container">
  <div class="row">
      <div class="col-md-4 col-sm-12">
          <div class="templatemo_contactmap">
      <div id="templatemo_map"></div>
            <img src="images/templatemo_contactiframe.png" alt="contact map">
            </div>
            </div>
        <div class="col-md-3 col-sm-12 leftalign">
          <div class="templatemo_contacttitle">Contact Information</div>
            <div class="clear"></div>
            <p>Integer eu neque sed mi fringilla pellentesque a eget leo. Duis ornare diam lorem, sit amet tempor mauris fringilla in. Etiam semper tempus augue, at vehicula metus. Nam vestibulum tortor nec congue ornare.</p>
            <div class="templatemo_address">
              <ul>
              <li class="left fa fa-map-marker"></li>
                <li class="right">Nulla ut tellus, sit amet urna, <br>scelerisque pretium 10560</li>
                <li class="clear"></li>
                <li class="left fa fa-phone"></li>
                <li class="right">010-040-0260</li>
                <li class="clear"></li>
                <li class="left fa fa-envelope"></li>
                <li class="right">info@company.com</li>
                </ul>
            </div>
        </div>
        <div class="col-md-5 col-sm-12">
          <form role="form">
            <div class="templatemo_form">
              <input name="fullname" type="text" class="form-control" id="fullname" placeholder="Your Name" maxlength="40">
            </div>
            <div class="templatemo_form">
              <input name="email" type="text" class="form-control" id="email" placeholder="Your Email" maxlength="40">
            </div>
            <div class="templatemo_form">
              <input name="subject" type="text" class="form-control" id="subject" placeholder="Subject" maxlength="40">
            </div>
            <div class="templatemo_form">
            <textarea name="message" rows="10" class="form-control" id="message" placeholder="Message"></textarea>
            </div>
            <div class="templatemo_form"><button type="button" class="btn btn-primary">Send Message</button></div>
        </form>
        </div>
    </div> 
  </div>
  </div>

