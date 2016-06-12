<?php 
	
	$name = $_POST[ 'contact-name' ];
	$email = $_POST[ 'contact-email' ];
	$subject = $_POST[ 'contact-subject' ];
	$message = $_POST[ 'contact-message' ];
	$mail_subject = $subject . "(Visitor Contact)";
	$message = "Name: ".$name." || Email: ".$email." || Subject: ".$subject." || Message: ".$message."";
	
	/* Replace YOUR_MAIL With Your Mail Address inside '' */
	if ( mail( 'support@inspiredmemories.in', $mail_subject, $message, "From:" . $email ) ) {
		echo "Thank you <strong>$name</strong> for contacting with us !!!";
	} else {
		echo "Error in sending message !!! Please try again";
	}
	
 ?>