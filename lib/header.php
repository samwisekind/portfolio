<?php

	require_once 'common.php';

?>

<html lang="en">

	<head>
		<meta charset="utf-8" />
		<link href="<?php echo $directory; ?>css/min/styleGlobal.min.css" rel="stylesheet" type="text/css" />
		<link href="<?php echo $directory; ?>css/min/style<?php echo ucfirst($page); ?>.min.css" rel="stylesheet" type="text/css" />
		<script src="<?php echo $directory; ?>js/scriptsGlobal.js" type="text/javascript"></script>

		<?php if ($page == 'index') { ?>

			<title>Flamov.com</title>

		<?php } else if ($page == 'work') { ?>

			<title>Flamov.com - Work</title>
			<script src="<?php echo $directory; ?>js/scriptsWork.js" type="text/javascript"></script>

		<?php } else if ($page == 'project') { ?>

			<title>Flamov.com - <?php echo $meta_title; ?> Project</title>
			<script src="<?php echo $directory; ?>js/scriptsProject.js" type="text/javascript"></script>

		<?php } else if ($page == 'album') { ?>

			<title>Flamov.com - <?php echo $meta_title; ?> Album</title>
			<script src="<?php echo $directory; ?>js/scriptsAlbum.js" type="text/javascript"></script>

		<?php } else if ($page == 'about') { ?>

			<title>Flamov.com - About</title>
			<script src="<?php echo $directory; ?>js/scriptsAbout.js" type="text/javascript"></script>

		<?php }; ?>

	</head>

	<body>

		<div id="wrapper">

			<div id="content-overlay"></div>

			<div id="content">

				<header id="header">

					<h1><a href="<?php echo $directory; ?>">Sam's Portfolio</a></h1>

					<nav id="nav">

						<ul>
							<li <?php if ($page == 'index') echo 'class="current"'; ?>><a href="<?php echo $directory; ?>"><span>Home</span></a></li>
							<li <?php if ($page == 'work' || $page == 'project') echo 'class="current"'; ?>><a href="<?php echo $directory; ?>work"><span>Work</span></a></li>
								<li <?php if ($page == 'album') echo 'class="current"'; ?>><a href="<?php echo $directory; ?>photography"><span>Photography</span></a></li>
							<li <?php if ($page == 'about') echo 'class="current"'; ?>><a href="<?php echo $directory; ?>about"><span>About &amp; Contact</span></a></li>
						</ul>

						<div class="cf"></div>

					</nav>

					<div id="hamburger"><a href="#"></a></div>

				</header>

				<main class="main">