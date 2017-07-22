@extends ('layouts.project')

@section ('project-content')

	<p>We were commissioned to develop a Facebook Page app where users could upload their photos, edit and decorate them, and then submit them to a galley, for both desktop and mobile devices.</p>

	@component('components.projects.project-image', ['size' => 'small', 'alt' => 'The Steve Madden app'])
		@slot('image', '/images/projects/stevemadden/stevemadden-image-1.jpg')
	@endcomponent

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/stevemadden/stevemadden-image-2.jpg')
		@slot('caption')
			Users could upload images which were previewed on the front-end by using the <code>new FileReader</code> API and <code>readAsDataURL</code> method.
		@endslot
	@endcomponent

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/stevemadden/stevemadden-image-3.jpg')
		@slot('caption')
			Photos could be rotated, scaled, and decorated with a selection of frames on the front-end. Once submitted, the front-end would pass image manipulation values to the PHP back-end, which would use methods such as <code>imagealphablending</code> and <code>imagefill</code> in order to render the final bitmap image file.
		@endslot
	@endcomponent

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/stevemadden/stevemadden-image-4.jpg')
		@slot('caption', 'The gallery showed the uploaded images. Users could \'Like\' and share the images using the Facebook Graph API.')
	@endcomponent

@endsection
