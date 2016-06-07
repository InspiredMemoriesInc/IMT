<?php

require_once('phpmailer/class.phpmailer.php');

$mail = new PHPMailer();

if( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
    if( $_POST['quick-contactform-name'] != '' AND $_POST['quick-contactform-email'] != '' AND $_POST['quick-contactform-message'] != '' ) {

        $name = $_POST['qcf-name'];
        $email = $_POST['qcf-email'];
        $message = $_POST['qcf-message'];

        $subject = 'New Message From Quick Contact Form'; // Enter the subject here.

        $toemail = 'your@email.com'; // Enter your mail addres here.
        $toname = 'Your Name'; // Enter your name here.

		$mail->SetFrom( $email , $name );
		$mail->AddReplyTo( $toemail , $toname );
		$mail->AddAddress( $toemail , $toname );
		$mail->Subject = $subject;

		$name = isset($name) ? "Name: $name<br><br>" : '';
		$email = isset($email) ? "Email: $email<br><br>" : '';
		$message = isset($message) ? "Message: $message<br><br>" : '';

		$referrer = $_SERVER['HTTP_REFERER'] ? '<br><br><br>This Form was submitted from: ' . $_SERVER['HTTP_REFERER'] : '';

		$body = "$name $email $message $referrer";

		$mail->MsgHTML( $body );
		$sendEmail = $mail->Send();

		if( $sendEmail == true ):
			echo 'Message sent!';
		else:
			echo 'Email could not be sent. Please Try Again later.<br /><br />Reason:<br />' . $mail->ErrorInfo . '';
		endif;
        
    } else {
        echo 'Please Fill up all the Fields and Try Again.';
    }
} else {
    echo 'An unexpected error occured. Please Try Again later.';
}

?>