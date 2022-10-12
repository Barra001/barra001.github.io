<?php
$servername = "localhost";
$username = "admin";
$password = "admin";

try {
  $conn = new PDO("mysql:host=$servername;dbname=prueba", $username, $password);
  $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $getPass = "SELECT * from administrador;";
  $habilitado = false;
  foreach ($conn->query($getPass) as $fila) {
    if ($fila["nombreUsuario"] == $_POST["user"]) {
      if ($fila["contrasena"] == hash("sha256", $_POST["password"])) {
        $habilitado = true;
        break;
      }
    }
  }
  if ($habilitado) {
    $borrar = "DELETE FROM promo";
    $conn->query($borrar);
    for ($i = 1; $i <= $_POST["cant"]; $i = $i + 1) {
      $subirPromo = $conn->prepare("INSERT  into Promo values (:titulo, :tipo, :validez, null);");
      $subirPromo->execute([ 'titulo' => $_POST["titulo".$i], 'tipo' => $_POST["tipo".$i], 'validez' => $_POST["validez".$i] ]);

    }
   
    echo "tute bien.";
  } else {
    echo "Usuario o Contraseña no coinciden.";
  }



  $conn = null;
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
?>