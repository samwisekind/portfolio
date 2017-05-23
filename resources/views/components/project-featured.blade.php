@foreach ($projects as $project)

	@if ($project->key === $featured)

		<div class="featured">

			<div class="container">

				<h2><a href="#">{{ $project->title }}</a></h2>

				<a href="#" class="image">
					<img src="/images/projects/joyce/joyce-featured.png" alt="" />
				</a>

			</div>

			<p>{{ $project->description }}</p>

		</div>

		@break

	@endif

@endforeach