
<?php 
  
// PHP program to obtain IP address of 
// the server 
  
// Creating a variable to store the 
// server address 
$ip_server = $_SERVER['SERVER_ADDR']; 
  
// Printing the stored address 
echo "Server IP Address is: $ip_server"; 
$ip = $_SERVER['REMOTE_ADDR']; 
  
// Printing the stored address 
echo "IP Address is: $ip", "<br>"; 
  function getUserIpAddr(){
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){
        //ip from share internet
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        //ip pass from proxy
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }else{
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

echo 'User Real IP - '.getUserIpAddr();
echo"<br>";
ob_start();
system('ipconfig/all'); 
$mycom=ob_get_contents(); // Capture the output into a variable
ob_clean(); 
$findme = "Subnet Mask";
$pos = strpos($mycom, $findme);
$macp=substr($mycom,($pos+36),17);
echo "The mac id of this system is :".$macp;



$result = dns_get_record("www.google.com");
echo"<pre>";
print_r($result);
echo"</pre>";

  
?> 