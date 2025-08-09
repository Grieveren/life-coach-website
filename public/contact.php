<?php
// contact.php - Server-side contact form handler for cPanel
// - Validates input
// - Honeypot spam protection
// - Sends via PHPMailer SMTP if available and configured, otherwise falls back to mail()
// - Returns JSON

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'error' => 'Method not allowed']);
  exit;
}

// Parse JSON body
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  // Fallback to form-encoded
  $data = $_POST;
}

// Honeypot: reject if hidden field is filled
if (!empty($data['website'])) {
  http_response_code(200);
  echo json_encode(['success' => true]);
  exit;
}

// Validate inputs
$fromName = trim($data['from_name'] ?? $data['name'] ?? '');
$fromEmail = trim($data['from_email'] ?? $data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$message = trim($data['message'] ?? '');
$service = trim($data['service_interest'] ?? '');

if ($fromName === '' || $fromEmail === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Missing required fields']);
  exit;
}

if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Invalid email']);
  exit;
}

// Recipient and subject
$to = getenv('CONTACT_TO') ?: 'coaching@andreagray.de';
$subject = 'New website enquiry';

// Build message
$bodyText = "New contact form submission\n\n"
  . "Name: {$fromName}\n"
  . "Email: {$fromEmail}\n"
  . "Phone: " . ($phone !== '' ? $phone : 'Not provided') . "\n"
  . "Service interest: " . ($service !== '' ? $service : 'Not specified') . "\n\n"
  . "Message:\n{$message}\n";

$fromAddress = getenv('MAIL_FROM') ?: $fromEmail; // try to use sender, can be overridden
$fromLabel = getenv('MAIL_FROM_NAME') ?: $fromName;

$sent = false;
$error = null;

// Try PHPMailer if available and SMTP configured
if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
  try {
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $smtpHost = getenv('SMTP_HOST');
    $smtpUser = getenv('SMTP_USER');
    $smtpPass = getenv('SMTP_PASS');
    $smtpPort = getenv('SMTP_PORT') ?: 587;
    $smtpSecure = getenv('SMTP_SECURE') ?: PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;

    if ($smtpHost && $smtpUser && $smtpPass) {
      $mail->isSMTP();
      $mail->Host = $smtpHost; // e.g., smtp.office365.com
      $mail->SMTPAuth = true;
      $mail->Username = $smtpUser; // coaching@andreagray.de
      $mail->Password = $smtpPass; // app password if MFA enabled
      $mail->Port = (int)$smtpPort;
      $mail->SMTPSecure = $smtpSecure;
    }

    $mail->setFrom($fromAddress, $fromLabel);
    $mail->addAddress($to);
    $mail->addReplyTo($fromEmail, $fromName);
    $mail->Subject = $subject;
    $mail->Body = $bodyText;
    $mail->AltBody = $bodyText;

    $sent = $mail->send();
  } catch (Throwable $e) {
    $error = $e->getMessage();
    $sent = false;
  }
}

// Fallback to mail()
if (!$sent) {
  $headers = [];
  $headers[] = 'From: ' . sprintf('%s <%s>', $fromLabel, $fromAddress);
  $headers[] = 'Reply-To: ' . $fromEmail;
  $headers[] = 'Content-Type: text/plain; charset=UTF-8';
  $headers[] = 'X-Mailer: PHP/' . phpversion();

  $sent = @mail($to, $subject, $bodyText, implode("\r\n", $headers));
}

if ($sent) {
  echo json_encode(['success' => true, 'message' => 'Message sent']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => $error ?: 'Failed to send message']);
}


