<!Doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Image Magnifier</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
	<div>
		<img id='img-1' class="magnified-img" src="https://www.kodifiretvstick.com/wp-content/uploads/2017/01/chewbacca-wookie-01.jpg" alt="" title="">
	</div>

	<div>
		<img id='img-2' class="magnified-img" src="https://upload.wikimedia.org/wikipedia/commons/1/11/Face_nord_de_la_Grande_Casse.JPG" alt="" title="">
	</div>

	<div>
		<img id='img-3' class="magnified-img" src="https://wallpaperaccess.com/full/1656025.jpg" alt="" title="">
	</div>
</body>
  <script src="magnifier.js"></script>
  <script type="text/javascript">
	magnifier = new ImageMagnifier();
	// TODO 
	// ajout du type d'appartition (onOver, onClick)
	// choix de la forme (cercle, carré)
	magnifier.init('magnified-img', 175, 2);
  </script>
</html>