# PHP ile MSSQL Bağlantısında `sqlsrv_connect()` Hatası Çözümü  
*(Windows + AppServ / XAMPP)*
> **Hata:**  
> `Fatal error: Uncaught Error: Call to undefined function sqlsrv_connect()`  

PHP ile MSSQL’e bağlanmaya çalışırken bu hatayı alıyorsan, sorun kodunda değil:  
PHP kurulumunda **SQL Server sürücüsü (`sqlsrv` / `pdo_sqlsrv`) yüklü değil**.

PHP Sürümü ve Mimariyi Öğren (phpinfo())

Önce hangi PHP versiyonunu ve mimariyi kullandığını bilmelisin.

Tarayıcıdan aç:

http://localhost/phpinfo.php

Açılan sayfada şunlara bak:

PHP Version → örn: 8.2.12

Architecture → x64 mü, x86 mı

Thread Safety → enabled (TS) mi, disabled (NTS) mi

Bu bilgiler, indireceğin DLL dosyasının adını belirleyecek.

  ```php
  <?php
  phpinfo();
  ?>

