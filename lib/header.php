<?php

	if ($page == "index" || $page == "work") {

		require_once "projects.php";
		require_once "albums.php";

	}

	else if ($page == "project") {

		require_once "projects.php";

	};

	require_once "common.php";

?>

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi" />
	<link href="//fonts.googleapis.com/css?family=Lato:300,400,700|Oxygen:300,400" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="<?php echo $directory; ?>css/style_global.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo $directory; ?>css/style_<?php echo $page; ?>.css" />
	<script type="text/javascript" src="<?php echo $directory; ?>js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="<?php echo $directory; ?>js/scripts_global.js"></script>

	<?php if ($page == "index") { ?>

		<title>Flamov.com</title>

	<?php } else if ($page == "work") { ?>

		<title>Flamov.com - Work</title>
		<script type="text/javascript" src="<?php echo $directory; ?>js/scripts_work.js"></script>

	<?php } else if ($page == "project") { ?>

		<title>Flamov.com - Project: <?php echo $project[$project_name][1]; ?></title>
		<script type="text/javascript" src="<?php echo $directory; ?>js/scripts_project.js"></script>

	<?php } else if ($page == "album") { ?>

		<title>Flamov.com - Album: <?php echo $album[$album_current][1]; ?></title>
		<script type="text/javascript" src="<?php echo $directory; ?>js/scripts_album.js"></script>
		<script type="text/javascript" src="js/jquery.scrollTo.min.js"></script>
		<script type="text/javascript" src="js/hammer.min.js"></script>
		<script type="text/javascript" src="js/jquery.hammer.js"></script>

	<?php } else if ($page == "about") { ?>

		<title>Flamov.com - About</title>
		<script type="text/javascript" src="<?php echo $directory; ?>js/scripts_about.js"></script>
		<script type="text/javascript" src="<?php echo $directory; ?>js/parsley.min.js"></script>

	<?php }; ?>

</head>



<body id="page-<?php echo $page; ?>">

	<div id="wrapper">

		<nav id="nav-outer">

			<div id="nav-outer-wrapper">

				<ul>
					<li <?php if ($page == "index") echo 'class="current"'; ?>><a href="<?php echo $directory; ?>"><span>Home</span></a></li>
					<li <?php if ($page == "work" || $page == "project" || $page == "album") echo 'class="current"'; ?>><a href="<?php echo $directory; ?>work.php"><span>Work</span></a></li>
					<li <?php if ($page == "about") echo 'class="current"'; ?>><a href="<?php echo $directory; ?>about.php"><span>About &amp; Contact</span></a></li>
				</ul>

			</div>

		</nav>

		<div id="content-overlay"></div>

		<div id="content">

			<header id="header">
					
				<h1><a href="<?php echo $directory; ?>">Sam's Portfolio</a></h1>

				<nav id="nav">
						
					<ul>
						<li <?php if ($page == "index") echo 'class="current"'; ?>><a href="<?php echo $directory; ?>"><span>Home</span></a></li>
						<li <?php if ($page == "work" || $page == "project" || $page == "album") echo 'class="current"'; ?>><a href="<?php echo $directory; ?>work.php"><span>Work</span></a></li>
						<li <?php if ($page == "about") echo 'class="current"'; ?>><a href="<?php echo $directory; ?>about.php"><span>About &amp; Contact</span></a></li>
					</ul>

					<div class="cf"></div>

				</nav>

				<div id="hamburger"><a href="#"></a></div>

			</header>

			<main id="<?php echo $page; ?>" class="main">

			<?php if ($page == "project") { ?>

				<div id="intro">

					<h2><?php echo $project[$project_name][1]; ?></h2>
					<h3><span><?php echo $project[$project_name][2]; ?></span><?php if (isset($project[$project_name][6]) == true) { echo " <a href='" . $project[$project_name][6] . "' class='title-link'>View Site <span>&#10095;</span></a>"; }; ?><span class="cf"></span></h3>

					<ul id="details">
						<li id="details-responsibilities"><span class="title">Responsibilities:</span> <span class="content"><?php echo $project[$project_name][3]; ?></span></li>
						<li id="details-technology"><span class="title">Technology:</span> <span class="content"><?php echo $project[$project_name][4]; ?></span></li>
						<li id="details-timeframe"><span class="title">Timeframe:</span> <span class="content"><?php echo $project[$project_name][5]; ?></span></li>
					</ul>

					<div class="cf"></Div>

				</div>

			<?php }; ?>