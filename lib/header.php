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
	<title>Personal</title>
	<link href="//fonts.googleapis.com/css?family=Lato:300,400,700|Oxygen:300,400" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="<?php echo $directory; ?>css/style_global.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo $directory; ?>css/style_<?php echo $page; ?>.css" />
	<script type="text/javascript" src="<?php echo $directory; ?>js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="<?php echo $directory; ?>js/scripts_global.js"></script>
	<script type="text/javascript" src="<?php echo $directory; ?>js/scripts_<?php echo $page; ?>.js"></script>

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
					<li <?php if ($page == "index") echo 'class="current"'; ?>><a href="<?php echo $directory; ?>"><span>Home</span></a></li>
					<li <?php if ($page == "work" || $page == "project" || $page == "album") echo 'class="current"'; ?>><a href="<?php echo $directory; ?>work.php"><span>Work</span></a></li>
					<li <?php if ($page == "about") echo 'class="current"'; ?>><a href="<?php echo $directory; ?>about/"><span>About &amp; Contact</span></a></li>
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
						<li <?php if ($page == "about") echo 'class="current"'; ?>><a href="<?php echo $directory; ?>about/"><span>About &amp; Contact</span></a></li>
					</ul>

					<div class="cf"></div>

				</nav>

				<div id="hamburger"><a href="#"></a></div>

			</header>

			<main id="<?php echo $page; ?>" class="main">

			<?php if ($page == "project") { ?>

				<div id="intro">

					<h2><?php echo $project[$project_name][1]; ?></h2>
					<h3><?php echo $project[$project_name][2]; if (isset($project[$project_name][6]) == true) { echo " <a href='" . $project[$project_name][6] . "' class='site-link'>View Site <span>&#10095;</span></a>"; }; ?></h3>

					<ul id="details">
						<li id="details-responsibilities"><span>Responsibilities:</span> <?php echo $project[$project_name][3]; ?></li>
						<li id="details-technology"><span>Technology:</span> <?php echo $project[$project_name][4]; ?></li>
						<li id="details-timeframe"><span>Timeframe:</span> <?php echo $project[$project_name][5]; ?></li>
					</ul>

					<div class="cf"></Div>

				</div>

			<?php }; ?>