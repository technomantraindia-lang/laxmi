<?php
/**
 * Laxmi En-Fab Pvt. Ltd. - Contact Form Processor
 * Handles direct, reliable email delivery to aac@laxmienfab.com
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($requestMethod !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Please submit via POST.'
    ]);
    exit;
}

// Support both JSON body and standard URL-encoded form submissions
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    $data = $_POST;
}

// Honeypot anti-spam check
if (!empty($data['_honey'])) {
    // Pretend success to silent drop spambots
    echo json_encode([
        'success' => true,
        'message' => 'Requirement submitted successfully.'
    ]);
    exit;
}

// Extract and sanitize input fields
$name        = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$company     = isset($data['company']) && trim($data['company']) !== '' ? trim(strip_tags($data['company'])) : 'Not provided';
$phone       = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$email       = isset($data['email']) && trim($data['email']) !== '' ? trim(strip_tags($data['email'])) : 'Not provided';
$requirement = isset($data['requirement']) && trim($data['requirement']) !== '' ? trim(strip_tags($data['requirement'])) : (isset($data['interest']) ? trim(strip_tags($data['interest'])) : 'General AAC Inquiry');
$message     = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

// Validate mandatory fields
if (empty($name) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please provide Name, Mobile number, and Brief requirement.'
    ]);
    exit;
}

// Destination email address
$to = 'aac@laxmienfab.com';
$subject = "New AAC Requirement: " . $name . " (" . $requirement . ")";

// Premium HTML Email Template
$emailContent = '
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>' . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . '</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(7,23,44,0.06); }
    .header { background: #07172c; color: #ffffff; padding: 26px 32px; border-bottom: 3px solid #0b3f78; }
    .header h1 { margin: 0; font-size: 21px; font-weight: 700; letter-spacing: 0.02em; }
    .header p { margin: 6px 0 0 0; font-size: 13px; color: #94a3b8; }
    .body { padding: 32px; }
    .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .detail-table th { text-align: left; padding: 12px 14px; background: #f8fafc; color: #475569; font-size: 13px; font-weight: 600; width: 35%; border-bottom: 1px solid #e2e8f0; }
    .detail-table td { padding: 12px 14px; color: #0f172a; font-size: 14px; border-bottom: 1px solid #e2e8f0; }
    .badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
    .message-title { font-size: 13px; color: #475569; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }
    .message-box { background: #f8fafc; border-left: 4px solid #0b3f78; padding: 18px 20px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #0f172a; white-space: pre-wrap; word-break: break-word; }
    .footer { background: #f8fafc; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New AAC Project Requirement</h1>
      <p>Submitted via Laxmi En-Fab Website Consultation Form</p>
    </div>
    <div class="body">
      <table class="detail-table">
        <tr>
          <th>Client Name</th>
          <td><strong>' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</strong></td>
        </tr>
        <tr>
          <th>Company</th>
          <td>' . htmlspecialchars($company, ENT_QUOTES, 'UTF-8') . '</td>
        </tr>
        <tr>
          <th>Mobile Number</th>
          <td><a href="tel:' . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . '" style="color:#0b3f78; font-weight:700; text-decoration:none;">' . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . '</a></td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td>' . (filter_var($email, FILTER_VALIDATE_EMAIL) ? '<a href="mailto:' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '" style="color:#0b3f78; text-decoration:none;">' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</a>' : htmlspecialchars($email, ENT_QUOTES, 'UTF-8')) . '</td>
        </tr>
        <tr>
          <th>Requirement Type</th>
          <td><span class="badge">' . htmlspecialchars($requirement, ENT_QUOTES, 'UTF-8') . '</span></td>
        </tr>
      </table>
      <div class="message-title">Brief Requirement / Message</div>
      <div class="message-box">' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</div>
    </div>
    <div class="footer">
      Laxmi En-Fab Pvt. Ltd. &bull; Odhav, Ahmedabad &bull; Kheda, Gujarat<br>
      Direct Inquiry sent to aac@laxmienfab.com on ' . date('d M Y, h:i A') . '
    </div>
  </div>
</body>
</html>';

// Email Headers for HTML email delivery
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Laxmi En-Fab Website <no-reply@laxmienfab.com>';
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $email;
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Check if running in a local development environment (localhost / 127.0.0.1)
$serverHost = $_SERVER['HTTP_HOST'] ?? ($_SERVER['SERVER_NAME'] ?? '');
$remoteAddr = $_SERVER['REMOTE_ADDR'] ?? '';
$isLocalDev = ($serverHost === 'localhost' || strpos($serverHost, 'localhost:') === 0 || strpos($serverHost, '127.0.0.1') === 0 || in_array($remoteAddr, ['127.0.0.1', '::1']));

// Send email using native mail()
$mailSent = @mail($to, $subject, $emailContent, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Requirement sent successfully! Our engineering team will review your details and get in touch shortly.'
    ]);
} elseif ($isLocalDev) {
    // On local Windows dev servers, native sendmail/SMTP is not configured by default.
    // Save to local_inquiries.log so developers can immediately verify the inquiry and data payload!
    $logEntry = "[" . date('Y-m-d H:i:s') . "] LOCAL TEST INQUIRY VERIFIED\n" .
                "Destination: " . $to . "\n" .
                "Subject: " . $subject . "\n" .
                "Client: " . $name . "\n" .
                "Company: " . $company . "\n" .
                "Mobile: " . $phone . "\n" .
                "Email: " . $email . "\n" .
                "Requirement: " . $requirement . "\n" .
                "Message: " . $message . "\n" .
                "--------------------------------------------------\n\n";
    @file_put_contents(__DIR__ . '/local_inquiries.log', $logEntry, FILE_APPEND);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Requirement verified successfully! (Local Test Mode: inquiry logged to local_inquiries.log).'
    ]);
} else {
    // If standard mail() failed on live production server
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server could not dispatch email. Please connect directly at aac@laxmienfab.com or +91 89808 00607.'
    ]);
}
