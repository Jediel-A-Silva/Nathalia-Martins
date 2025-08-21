<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = strip_tags(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);
    $assunto = strip_tags(trim($_POST["assunto"])) ?: "Mensagem pelo formulário do site";
    $mensagem = trim($_POST["mensagem"]);

    if (!$nome || !$email || !$mensagem) {
        echo "Por favor, preencha os campos obrigatórios.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Configuração SMTP Brevo
        $mail->isSMTP();
        $mail->Host       = 'smtp-relay.brevo.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = '946b86001@smtp-brevo.com'; // seu usuário SMTP Brevo
        $mail->Password   = 'O8EZjcU3tqBMpws4';          // sua senha SMTP Brevo
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Remetente e destinatário
        $mail->setFrom('andradejediel70@gmail.com', $nome);
        $mail->addAddress('dra.nathalia.enfobstetra@gmail.com', 'Nathalia Martins');

        // Conteúdo do e-mail
        $mail->isHTML(true);
        $mail->Subject = $assunto;
        $mail->Body    = nl2br("Nome: $nome\nEmail: $email\n\nMensagem:\n$mensagem");
        $mail->AltBody = "Nome: $nome\nEmail: $email\n\nMensagem:\n$mensagem";

        $mail->send();
        echo "Mensagem enviada com sucesso!";
    } catch (Exception $e) {
        echo "Erro ao enviar a mensagem: {$mail->ErrorInfo}";
    }
} else {
    echo "Método inválido.";
}
?>
