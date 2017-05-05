@extends ('master')

@section ('title', $project->title)

@section ('css')

	<link href="/css/project.css" rel="stylesheet">

@endsection

@section ('content')

	{{ $project->title }}
	{{ $project->description }}

	@yield ('project-content')

@endsection
