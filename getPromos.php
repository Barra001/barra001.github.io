<?php
$servername = "localhost";
$username = "admin";
$password = "admin";

try {
  $conn = new PDO("mysql:host=$servername;dbname=prueba", $username, $password);

  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $sql = "SELECT * FROM promo";
  
  foreach ($conn->query($sql) as $fila) {
    echo $fila["titulo"]. "-" . $fila["tipoDeDescuento"]. "-" . $fila["valides"]. "*";
  }
  
  $conn = null;
  
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
?>