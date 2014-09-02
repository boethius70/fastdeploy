#!/bin/sh

cd /tftpboot

cabextract /home/mirrors/windows/w2k3st/I386/STARTROM.N1_
sed -i -e 's/NTLDR/W2K3L/gi' startrom.n12
cp /tftpboot/startrom.n12 /tftpboot/w2k3.0
cabextract /home/mirrors/windows/w2k3st/I386/SETUPLDR.EX_
sed -i -e 's/winnt\.sif/wi2k3\.sif/gi' setupldr.exe
sed -i -e 's/ntdetect\.com/ntdetect\.2k3/gi' setupldr.exe
cp /tftpboot/setupldr.exe W2K3L
cp /home/mirrors/windows/w2k3st/I386/NTDETECT.COM /tftpboot/ntdetect.2k3
