<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$arquivo = __DIR__ . '/contador.txt';

// Lê o valor atual
$atual = 0;
if (file_exists($arquivo)) {
    $atual = (int) file_get_contents($arquivo);
}

// Incrementa e salva
$proximo = $atual + 1;
file_put_contents($arquivo, $proximo, LOCK_EX);

echo json_encode(['numero' => str_pad($proximo, 3, '0', STR_PAD_LEFT)]);
