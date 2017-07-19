<div class="project-caption {{ $alignment }}">
	@if ($alignment === 'left')
		<figcaption class="text">{{ $caption }}</figcaption>
	@endif
		<div class="image">
			<img src="{{ $image }}" alt="" class="image-element" />
		</div>
	@if ($alignment === 'right')
		<figcaption class="text">{{ $caption }}</figcaption>
	@endif
</div>
