@extends ('master')

@section ('css')

	<link href="/css/articles.css" rel="stylesheet">

@endsection

@section ('content')

	<main class="other articles">

		<div class="wrapper">

			<h2>Articles</h2>

			<ul class="list">
				@foreach($articles as $article)
					<li>
						<h3>{{ $article->title }}</h3>
						<span class="date">Published {{ date('jS F Y', strtotime($article->published)) }}</span>
						@include('components.link', [
							'url' => $article->url,
							'icon' => 'external',
							'text' => 'Read article'
						])
					</li>
				@endforeach
			</ul>

		</div>

	</main>

@endsection
