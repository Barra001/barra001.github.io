

<?php
$name = $_POST['Name'];
$mail = $_POST['Email'];
$phone = $_POST['Phone'];
$msj = $_POST['Message'];
$mensajeCompleto = "De: " .  $mail . ", Nombre: " . $name . ", Número: " . $phone . "\n" .  $msj;
$to = 'dentalmic3@gmail.com';
mail($to, $sujeto, $mensajeCompleto);
?>


