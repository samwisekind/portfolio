<?php

	if ($page == "index" || $page == "work") {

		require "projects.php";
		require "albums.php";

	};

	require "common.php";

?>

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi" />
	<title>Personal</title>
	<link href="//fonts.googleapis.com/css?family=Lato:300,400,700|Oxygen:300,400" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="css/style_global.css" />
	<link rel="stylesheet" type="text/css" href="css/style_<?php echo $page; ?>.css" />
	<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="js/scripts_global.js"></script>
	<script type="text/javascript" src="js/scripts_<?php echo $page; ?>.js"></script>

	<?php if ($page == "index") { ?>

		<title>Index</title>

	<?php } else if ($page == "work") { ?>

		<title>Work</title>

	<?php } else if ($page == "project") { ?>

		<title>Project</title>

	<?php } else if ($page == "album") { ?>

		<title>Album</title>
		<script type="text/javascript" src="js/jquery.scrollTo.min.js"></script>
		<script type="text/javascript" src="js/hammer.min.js"></script>
		<script type="text/javascript" src="js/jquery.hammer.js"></script>

	<?php }; ?>

</head>



<body id="<?php echo $page; ?>">

	<div id="wrapper">

		<nav id="nav-outer">

			<div id="nav-outer-wrapper">

				<ul>
					<li <?php if ($page == "index") echo 'class="current"'; ?>><a href="index.php"><span>Home</span></a></li>
					<li <?php if ($page == "work" || $page == "project" || $page == "album") echo 'class="current"'; ?>><a href="work.php"><span>Work</span></a></li>
					<li <?php if ($page == "about") echo 'class="current"'; ?>><a href="#"><span>About &amp; Contact</span></a></li>
				</ul>

			</div>

		</nav>

		<div id="content-overlay"></div>

		<div id="content">

			<header id="header">
					
				<h1><a href="./">Sam's Portfolio</a></h1>

				<nav id="nav">
						
					<ul>
						<li <?php if ($page == "index") echo 'class="current"'; ?>><a href="./"><span>Home</span></a></li>
						<li <?php if ($page == "work" || $page == "project" || $page == "album") echo 'class="current"'; ?>><a href="work.php"><span>Work</span></a></li>
						<li <?php if ($page == "about") echo 'class="current"'; ?>><a href="#"><span>About &amp; Contact</span></a></li>
					</ul>

					<div class="cf"></div>

				</nav>

				<div id="hamburger"><a href="#"></a></div>

			</header>

			<main id="<?php echo $page; ?>" class="main">