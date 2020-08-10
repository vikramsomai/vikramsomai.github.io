<?php 
include('../header.php');

?>
<div class="container">
<div class="left-side">
	<h1>php tutorial</h1>
	<ul>

		<li><a href="php-syntax.php">php syntax</a></li>
		<li>php echo</li>
		<li>php print</li>
		<li>php variables</li>
		<li>php constant</li>
		<li>php data types</li>
		<li>php comments</li>
		
	</ul>
	</div>
	
<div class="content">
<h1>what is php</h1>
<p>
	PHP is an open-source, interpreted, and object-oriented scripting language that can be executed at the server-side. PHP is well suited for web development. Therefore, it is used to develop web applications (an application that executes on the server and generates the dynamic page.).
</p>
<p>
	PHP was created by Rasmus Lerdorf in 1994 but appeared in the market in 1995. PHP 7.4.0 is the latest version of PHP, which was released on 28 November. Some important points need to be noticed about PHP are as followed:
</p>
<ul type="circle">
	<li>PHP stands for Hypertext Preprocessor.</li>
</ul>
<h1>why use php</h1>
<h1>php features</h1>

<h3>Performance:</h3>

<p>PHP script is executed much faster than those scripts which are written in other languages such as JSP and ASP. PHP uses its own memory, so the server workload and loading time is automatically reduced, which results in faster processing speed and better performance.
</p>
<h3>Open Source:</h3>

<p>PHP source code and software are freely available on the web. You can develop all the versions of PHP according to your requirement without paying any cost. All its components are free to download and use.</p>

<div class="navigate" style="border-bottom: 2px solid #ccc;border-top:2px solid #CCC;height: 60px;padding: 10px">
	<span style="float: left;font-size: 28px"><a href="#">previous</a></span><span style="float: right;font-size: 28px"><a href="php-syntax.php">next</a></span>
</div>

	</div>
	     </div>

	<?php include('../footer.php'); ?>
	<style>
		
		.container{
			display: flex;
			//justify-content: space-around;
			//align-items: center;
		}
		.left-side{
			max-width: 20%;
			padding: 10px;
			color:#000;
		}
		.left-side a{
			color:#000;
		}
		.content{
			padding: 10px;
			max-width: 60%;
		}
		.content h1{
			font-weight: bold;
			color: #56556e;
			margin: 10px;
		}
		.content p{
			word-spacing: 5px;
			margin: 10px;
			line-height: 25px;
		}
		.content h3{
			margin: 10px;
		}
		.content ul li{
			margin: 10px;
		
		}
		.left-side ul li{
			padding: 10px;
			font-weight: bold;
			font-size: 16px;
		}
		@media(max-width: 768px)
		{
			.content{
				max-width: 100%;
			}
			.navigate{
				display: none;
			}
		}
	</style>