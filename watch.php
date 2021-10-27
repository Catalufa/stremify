<?php
$tc=trim($_GET["tc"]);
$token=trim($_GET["token"]);
$xtoken=trim($_GET["xtoken"]);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,"https://123moviesplayer.com/decoding_v3.php");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS,
            "tokenCode=".$tc."&_token=".$token);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('x-token: '.$xtoken)); 

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec($ch);

$player = file_get_contents('player.html');
echo "<!DOCTYPE html><html><head><script>window.sources=".$server_output."</script></head><body style='margin: 0 !important;' onload='watch();'>".$player."</body></html>";

curl_close ($ch);


?>