<?php

//Get the raw html.
$furl=trim($_GET["furl"]);
$opts = array('http'=>array('header' => "User-Agent:MyAgent/1.0\r\n")); 
//Basically adding headers to the request
$context = stream_context_create($opts);
$raw = file_get_contents($furl,false,$context);

$raw=str_replace("</head>","<script>console.clear = () => {};</script></head>",$raw);
$raw=str_replace("<body>","<body>",$raw);

$tc = explode("var tc = '",$raw)[1];
$tc = explode("';",$tc)[0];

$token = explode("\"_token\": \"",$raw)[1];
$token = explode("\",",$token)[0];

echo "<br><script>window.tc = '".$tc."'; window.token = '".$token."'; window.xtoken = encrypt(tc); go = window.location.href = 'watch.php?tc='+tc+'&token='+token+'&xtoken='+xtoken; function encrypt(s) { var _14x34l = s;var _83Wxx103 = _14x34l.slice(4,12);var _968Mx71 = _87x764D(_83Wxx103);            var _1x46T = _Q99xQ9(_968Mx71); return _46qx57(_1x46T) + \"12\"+\"464836\";           }           function _87x764D(s){return s.split(\"\");}function _Q99xQ9(r){return  r.reverse();}function _46qx57(n){return n.join(\"\");}</script>".$token;

?>