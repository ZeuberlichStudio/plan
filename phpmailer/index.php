<?php
header("Access-Controll-Allow-Origin: *");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if($_SERVER['HTTP_REFERER'] === 'https://planagency.ru/'){

  require '../composer/vendor/autoload.php';

  $name = isset($_GET['name']) ? $_GET['name'] : null;
  $brand = isset($_GET['brand']) ? $_GET['brand'] : null;
  $mail = isset($_GET['mail']) ? $_GET['mail'] : null;
  $phone = isset($_GET['phone']) ? $_GET['phone'] : null;
  $comment = isset($_GET['comment']) ? $_GET['comment'] : null;

  $mail = new PHPMailer(true);

  try{
      $mail->isSMTP();                                            // Send using SMTP
      $mail->Host       = 'mail.hosting.reg.ru';                    // Set the SMTP server to send through
      $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
      $mail->Username   = 'form@planagency.ru';                     // SMTP username
      $mail->Password   = '9K6z3X4u';                               // SMTP password
      $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
      $mail->Port       = 465;                                    // TCP port to connect to

      //Recipients
      $mail->setFrom('form@planagency.ru', 'PLAN Contact Form');
      $mail->addAddress('goooglemaaan@gmail.com', 'GoogleMan');     // Add a recipient

      // Content
      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = 'Новая заявка на сайте PLAN';
      $mail->Body    = '<ul style="list-style: none;">';
      $mail->Body   .= '<li>'. $name  .'</li>';
      $mail->Body   .= '<li>'. $brand  .'</li>';
      $mail->Body   .=
      '<li><a href="mailto:'. $email  .'"></a>'. $email .'</li>';
      $mail->Body   .=  '<li>'. $phone  .'</li>';
      $mail->Body   .= '</ul>';

      $mail->AltBody = $name . "\r\n". $brand ."\r\n". $mail ."\r\n". $phone ;

      $mail->send();
      echo 'Message has been sent';
  } catch (Exception $e) {
      echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }
}else{
  header('HTTP/2.0 403 Forbidden');
  echo "access denied";
}
?>
