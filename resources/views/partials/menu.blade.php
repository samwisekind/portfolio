<ul class="nav">
	<li class="@if ($page_section === 'home' || $page_section === 'project') current @endif">
		<a href="{{ route('home') }}">
			<span>Projects</span>
		</a>
	</li>
	<li class="@if ($page_section === 'photography') current @endif">
		<a href="{{ route('photography') }}">
			<span>Photography</span>
		</a>
	</li>
	<li class="@if ($page_section === 'about') current @endif">
		<a href="{{ route('about') }}">
			<span>About</span>
		</a>
	</li>
</ul>

<ul class="links">
	<li class="github">
		<a href="https://github.com/Flamov" target="_blank" rel="noopener noreferrer">
			<span>GitHub</span>
		</a>
	</li>
	<li class="codepen">
		<a href="https://codepen.io/Flamov" target="_blank" rel="noopener noreferrer">
			<span>Codepen</span>
		</a>
	</li>
</ul>
