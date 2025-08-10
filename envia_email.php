<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = strip_tags(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);
    $assunto = strip_tags(trim($_POST["assunto"]));
    $mensagem = trim($_POST["mensagem"]);

    if (!$nome || !$email || !$mensagem) {
        echo "Por favor, preencha os campos obrigatórios.";
        exit;
    }

    $para = "andradejediel70@gmail.com"; // seu e-mail aqui
    $assunto_email = $assunto ?: "Mensagem pelo formulário do site";

    $corpo = "Você recebeu uma nova mensagem do site:\n\n";
    $corpo .= "Nome: $nome\n";
    $corpo .= "Email: $email\n";
    $corpo .= "Assunto: $assunto_email\n";
    $corpo .= "Mensagem:\n$mensagem\n";

    // Ajuste do header para evitar problemas de spam
    $headers = "From: contato@seudominio.com.br\r\n"; // email do seu domínio
    $headers .= "Reply-To: $nome <$email>\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    if (mail($para, $assunto_email, wordwrap($corpo, 70), $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem. Tente novamente.";
    }
} else {
    echo "Método inválido.";
}
?>
