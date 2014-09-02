<?php

// Serverminds FastDeploy Service (http://www.fastdeploy.com) 
// see here for the copyright / licensing notification for this script:
//   http://www.fastdeploy.com/copyright 

require_once('includes/common.php');

$oses = array ("centos" => "1", // choose which OSes you want to enable the download
	"fedora" => "1",
	"debian" => "0", 
	"ubuntu" => "1",
	"slackware" => "1"); 
	
$CENTOS_EX="--exclude x86_64/ --exclude *.x86_64.rpm --exclude ia64/ --exclude *.ia64.rpm --exclude ppc/ --exclude *.ppc.rpm --exclude alpha/ --exclude *.alpha.rpm --exclude s390/ --exclude *.s390.rpm --exclude s390x/ --exclude *.s390x.rpm --exclude SRPMS/ --exclude *.src.rpm";
$CENTOS_ARCH="i386";
$DEBIAN_EX="--exclude disks-alpha/ --exclude disks-arm/ --exclude disks-hppa/ --exclude disks-hurd-i386/ --exclude disks-ia64/ --exclude disks-m68k/ --exclude disks-mips/ --exclude disks-mipsel/ --exclude disks-powerpc/ ";
$DEBIAN_EXCL_ARCH=array("alpha","amd64","arm","hppa","hurd-i386","ia64","m68k","mips","mipsel","powerpc","s390","sparc");
$DEBIAN_INCL_ARCH=array("i386");

for ($i=0; $i<sizeof($DEBIAN_EXCL_ARCH); $i++) {  
	$DEBIAN_EX .= "--exclude *_$DEBIAN_EXCL_ARCH[$i].deb "; 
}
$SUSE_ARCH="i586 x86_64 noarch";
$FEDORA_CORES=array("4","5","6","7"); 
$CENTOS_VERS=array("4","5"); 
//$CENTOS_MIRROR_VERS=array("4","5"); 

$centos_arch = explode(" ", $CENTOS_ARCH); 
$centos_excl = explode(" ", $CENTOS_EX); 
$debian_arch = explode(" ", $DEBIAN_ARCH);
$debian_excl = explode(" ", $DEBIAN_EX);

if ($oses['centos']) { 
	for ($a = 0; $a < sizeof($centos_arch); $a++) {
		for ($b = 0; $b < sizeof($CENTOS_VERS); $b++) { 
			if ($CENTOS_VER[$b] == "4") { 
				$trans_ver = "4_5"; 	
			}
			elseif ($CENTOS_VER[$b] = "5") { 
				$trans_ver = "5"; 	
			}
			print "Mirror: ". MIRROR_DIR; 
			print "Downloading : CentOS ". $CENTOS_VERS[$b] ." ". $centos_arch[$a] ."...."; 	
		
			system ('mkdir -p '. MIRROR_DIR .'/CentOS/'. $trans_ver .'/'. $centos_arch[$a]); 
			system ('mkdir -p '. TFTPBOOT .'/installer/'. $centos_arch[$a] .'/CentOS/'. $trans_ver); 
			system ('rsync -azvH '. $CENTOS_EX .' rsync://mirrors.kernel.org/centos/'. $CENTOS_VERS[$b] .'/os/'. $centos_arch[$a] .' '. MIRROR_DIR .'/CentOS/'. $trans_ver .'/');
			system ('cp -af '. MIRROR_DIR .'/CentOS/'. $trans_ver .'/'. $centos_arch[$a] .'/images/pxeboot/* '. TFTPBOOT .'/installer/'. $centos_arch[$a] .'/CentOS/'. $trans_ver .'/');
		}
	}
}

if ($oses['fedora']) {
	for ($a = 0; $a < sizeof($centos_arch); $a++) {
		for ($b = 0; $b < sizeof($FEDORA_CORES); $b++) {
			print "Downloading : Fedora Core ". $FEDORA_CORES[$b] ." ". $centos_arch[$a] .".... "; 			
			system ('rsync -azvH '. $CENTOS_EX .' rsync://mirrors.kernel.org/fedora/core/'. $FEDORA_CORES[$b]. '/'. $centos_arch[$a] .'/os/ '. MIRROR_DIR .'/Fedora/'. $FEDORA_CORES[$b] .'/i386/');
			system ('cp -af '. MIRROR_DIR .'/Fedora/'. $FEDORA_CORES[$b] .'/'. $centos_arch[$a] .'/os/images/pxeboot/* '. TFTPBOOT .'/installer/'. $centos_arch[$a] .'/Fedora/'. $FEDORA_CORES[$b] .'/');
		}	
	}
	print "Downloading : Fedora 7 i386.... "; 			
	system ('mkdir -p '. TFTPBOOT .'/installer/i386/Fedora/7'); 
	system ('mkdir -p '. TFTPBOOT .'/installer/x86_64/Fedora/7'); 
	system ('mkdir -p '. MIRROR_DIR .'/Fedora/7/i386'); 
	system ('mkdir -p '. MIRROR_DIR .'/Fedora/7/x86_64'); 
	system ('rsync -azvH '. $CENTOS_EX .' rsync://mirrors.kernel.org/fedora/releases/7/Fedora/i386/os '. MIRROR_DIR .'/Fedora/7/i386');
	system ('cp -af '. MIRROR_DIR .'/Fedora/7/images/pxeboot/* '. TFTPBOOT .'/installer/i386/Fedora/7');
	
}

if ($oses['debian']) { 
	for ($a = 0; $a <= sizeof($debian_arch); $a++) {
		print "Downloading : Debian ". $debian_arch[$a] .".... "; 	
		system ('rsync --recursive --times --links --hard-links '. $DEBIAN_EX .' ftp.us.debian.org::debian/pool '. MIRROR_DIR .'/Debian/pool/');
		system ('rsync --recursive --times --links --hard-links '. $DEBIAN_EX .' ftp.us.debian.org::debian/ '. MIRROR_DIR .'/Debian/');
		echo $DEBIAN_EX ."\n";
	
	}
}

if ($oses['slackware']) {
		print "Downloading: Slackware ..."; 
		system(' wget -q -r ftp://slackware.cs.utah.edu/pub/slackware/slackware-10.2/* '. MIRROR_DIR .'/Slackware'); 
}


?>	
