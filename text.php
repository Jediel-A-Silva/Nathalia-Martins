<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = strip_tags(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);
    $assunto = strip_tags(trim($_POST["assunto"]));
    $mensagem = trim($_POST["mensagem"]);

    if (!$nome || !$email || !$mensagem) {
        // Campos obrigatórios faltando
        echo "Por favor, preencha os campos obrigatórios.";
        exit;
    }

    // Destino do e-mail (e-mail da sua cliente)
    $para = "andradejediel70@gmail.com";  // <<<<< TROQUE AQUI PELO E-MAIL REAL

    // Assunto do e-mail
    $assunto_email = $assunto ?: "Mensagem pelo formulário do site";

    // Corpo do e-mail
    $corpo = "Você recebeu uma nova mensagem do site:\n\n";
    $corpo .= "Nome: $nome\n";
    $corpo .= "Email: $email\n";
    $corpo .= "Assunto: $assunto_email\n";
    $corpo .= "Mensagem:\n$mensagem\n";

    // Cabeçalho
    $headers = "From: $nome <$email>";

    // Enviar e-mail
    if (mail($para, $assunto_email, $corpo, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem. Tente novamente.";
    }
} else {
    echo "Método inválido.";
}
?>
