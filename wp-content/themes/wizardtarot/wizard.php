<?php
    if($_POST['mci_magic']){
        $sImage = uploadImageFile();
        echo '<img src="'.$sImage.'" />';
    }
?>
