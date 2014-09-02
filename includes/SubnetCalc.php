<!--
PHP Subnet Calculator v1.3.
Copyright 06/25/2003 Raymond Ferguson ferguson_at_share-foo.com.
Released under GNU GPL.
Special thanks to krischan at jodies.cx for ipcalc.pl http://jodies.de/ipcalc
The presentation and concept was mostly taken from ipcalc.pl.
-->

<?php

function binnmtowm($binin){
	$binin=rtrim($binin, "0");
	if (!ereg("0",$binin) ){
		return str_pad(str_replace("1","0",$binin), 32, "1");
	} else return "1010101010101010101010101010101010101010";
}

function bintocdr ($binin){
	return strlen(rtrim($binin,"0"));
}

function bintodq ($binin) {
	if ($binin=="N/A") return $binin;
	$binin=explode(".", chunk_split($binin,8,"."));
	for ($i=0; $i<4 ; $i++) {
		$dq[$i]=bindec($binin[$i]);
	}
        return implode(".",$dq) ;
}

function bintoint ($binin){
        return bindec($binin);
}

function binwmtonm($binin){
	$binin=rtrim($binin, "1");
	if (!ereg("1",$binin)){
		return str_pad(str_replace("0","1",$binin), 32, "0");
	} else return "1010101010101010101010101010101010101010";
}

function cdrtobin ($cdrin){
	return str_pad(str_pad("", $cdrin, "1"), 32, "0");
}

function dotbin($binin,$cdr_nmask){
	// splits 32 bit bin into dotted bin octets
	if ($binin=="N/A") return $binin;
	$oct=rtrim(chunk_split($binin,8,"."),".");
	if ($cdr_nmask > 0){
		$offset=sprintf("%u",$cdr_nmask/8) + $cdr_nmask ;
		return substr($oct,0,$offset ) . "&nbsp;&nbsp;&nbsp;" . substr($oct,$offset) ;
	} else {
	return $oct;
	}
}

function dqtobin($dqin) {
        $dq = explode(".",$dqin);
        for ($i=0; $i<4 ; $i++) {
           $bin[$i]=str_pad(decbin($dq[$i]), 8, "0", STR_PAD_LEFT);
        }
        return implode("",$bin);
}

function inttobin ($intin) {
        return str_pad(decbin($intin), 32, "0", STR_PAD_LEFT);
}

?>
