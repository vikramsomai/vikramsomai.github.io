<?php
session_start();
include('config.h');
$con=mysqli_connect("localhost","root","","login");
if($_POST['submit'])
{
	$id=$_POST['id'];
	$ch=$_POST['checks'];
	$dates=$_post['dates'];
	$sql="update employee set attain=(attain+1) where Id='$ch' ";
	$data=mysqli_query($con,$sql);
	if($data)
	{
		echo"update";
		}
		else
		{
			echo"no";
			}
	}
?>
<html>
<head>
	<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
<meta name="viewport" content="width=device-width, user-scalable=no" />
</head>
<body>
<div class="head">
<h2>employee management </h2>
</div>
<div class="nav">
	<ul>
<li><a href="home.php">home</a></li>
<li><a href="create.php">create</a></li>
<li><a href="check.php">check</a></li>
<li><a href="logout.php">logout</a></li>
<li><a href="debit.php">withdraw</a></li>
</ul>
</div>
<form action="#"method="post">
	<table>
<tr>
<th>id</th>
<th>name</th>
<th>dept.</th>
<th>per day income</th>
<th>attendance</th>
<th>present/not present</th>
<th>date</th>
</tr>
<?php $con=mysqli_connect("localhost","root","","login");

$query="select * from employee";
	$data=mysqli_query($con,$query);
while($results=mysqli_fetch_assoc($data))
{
	
	$id=$results['Id'];
	$name=$results['name'];
	$dept=$results['department'];
	$add=$results['address'];
	$incom=$results['income'];
	$querys="select * from employee where attain>0 and curdate()";
	$datas=mysqli_query($con,$querys);
	$result=mysqli_num_rows($datas);
if($result)
	{
		//$msg="present";
		}
		else
		{
			//$msg="not present";
			}
	echo"<tr><td>  $id </td><td>  $name </td><td>$dept</td><td> $incom </td><td><input type='checkbox'name='checks'value='$id'></td><td>$msg</td><td>$date</td></tr>";

}
?>
</table>
		<div class="update">
			<input type="date"name="dates">
		<input type="submit"name="submit"value="update">
		</div></form>

<style>
*{
	margin:0;
	padding:0;
	}
	.head{
		height:60px;
		width:100%;
		text-align:center;
		}
		 h2{
			text-align:center;
			margin-left:0px;
			padding-left:0px;
			}
 li{
 	float:left;
 list-style-type:none;
 width:20%;
 word-wrap:no-break;
 }
 a{
 	padding:9px;
 height:20px;
 width:80px;
 border:1px solid #ccc;
 text-decoration:none;
 margin-bottom:20px;
 background:#00F0FF;
 	}
 
 
 
 input[type="submit"]
 {
 	padding:20px;
 margin-top:80px;
 margin-left:100px;
 border:none;
 background:#00FFFB;
 }
 .update{
 	margin:auto;
 padding:auto;
 height:auto;
 width:100%;
 	}
 table{
		text-align:center;
		color:blue;
		font-size:20px;
		margin-top:30px;
		text-transform:capitalize;
		}
		th,tr{
		padding:15px;
		text-align:center;
		border:1px solid #ccc;
		}
		td{
			color:red;
			padding:10px;
			width:60px;
			
		border:1px solid #ccc;
		}
 input[type="date"]
 {
 	width:100px;
 height:40px;
 border:none;
 margin-left:20px;
 	}
</style>
<script>
	/*fetch_user();
	function fetch_user()
	{
		var action='fetch_user';
		$.ajax({
			url:'action_employee.php',
			method:'post',
			data:{action_emp:action},
			success:function(data){
				$('.attain').html(data);
				} 
				
				});
				}*/
	</script>
</body>
</html>