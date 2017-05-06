@extends ('layouts.project')

@section ('project-content')

	<h3>The Idea</h3>

	<p>Joyce is one of Hong Kong's most famous and respected luxury retailers, and they needed a new online identity. The task was to redesign their website from the ground-up for the modern internet, using a unique responsive design and extensive cross-browser compatibility, all driven by a powerful backend.</p>

	<h3>Challenges</h3>

	<p>Most modern fashion websites feature full-screen videos or carousels on their home page. While the result can be eye-catching, it can also suffer from various problems. Full-screen home pages are usually limited to displaying only one piece of content at a time, particularly with carousels where additional content is hidden behind user-input. Full-screen videos have also become more popular, and while they can be very engaging they can also have a significant impact on network and CPU/GPU performance, making viewing and using the website an unpleasant experience.</p>

	<p>Joyce is made up of three primary departments; fashion, beauty, and art. Each of these department’s content are equally as important as each other, meaning that using a full-screen home page design would hinder all three departments from being shown together. Figuring out a way to feature content from each of these departments evenly, while presenting it in a graceful and interesting manner without hindering user experience was a significant design challenge. Furthermore, content from each department all have a unique focus (e.g. content from Beauty would focus on beauty products, whereas Art content would focus on exhibitions), therefore different styles for each department would have to be developed while keeping them consistent with the design language of the overall website.</p>

	<p>Another challenge was the approach to creating an easy-to-use system for searching through the many stores and brands that Joyce manages. For users, the system had to be intuitive and fast, making it easy to search and filter through a long list of stores and brands without much effort. For the CMS, managing the stores and brands, as well as their connections, had to be simple and easy to manage.</p>

	<p>Lastly but equally as important, support for cross-browser compatibility was vital to the project. Although Joyce's influence spans the world, its roots come from Hong Kong. At the time of development, <a href="https://tongji.baidu.com/data/browser" target="_blank" rel="noopener noreferrer">up to 30% of users in China still used Internet Explorer 8</a>, therefore solid cross-browser support was a fundamental goal of the project.</p>

	<h3>Result</h3>

	<p>In order to overcome the problem of featuring content from the different departments of Joyce evenly, the front page features a large grid. Each grid cell can feature its own image or video or a single image stretched across multiple cells. Each cell can also include its own hyperlink, and cells that include the same hyperlink all darken at the same time when hovering over any one of them.</p>

	<p>Allowing each cell to be customised individually can result in some very engaging and eye-catching images, particularly thanks to Joyce's talented photographers and illustrators. The black bars in-between each cell gives the illusion of peering through a window, as well as giving a consistent, coherent visual structure to the entire grid; it holds the users' attention for long enough without creating too much visual noise or confusion.</p>

	<p>The use of a grid-based layout allows the home page to highlight a variety of different content without creating a chaotic and confusing visual hierarchy. Furthermore, being able to contain a number of different images and videos in one single structure overcomes the problems faced by carousel and full-screen designs.</p>

	@component("components.project-image")
		@slot("image", "/img/projects/joyce/joyce-image-1.jpg")
		@slot("caption", "CSS media queries adjust the number of stories displayed on each row depending on the viewport width.")
	@endcomponent

	<p>The landing pages for the Fashion, Beauty, and Art sections feature their own fully customisable header grids, similar to that on the home page. Each department can contain different types of stories, such as news and guestbooks, features for Fashion and Beauty, and exhibition locations for Art, all of which can be filtered and searched through. "Infinite scrolling" is used to dynamically load in new stories as the user nears the bottom of the page.</p>

	@component("components.project-image")
		@slot("image", "/img/projects/joyce/joyce-image-2.jpg")
		@slot("caption", "All videos on the website use native HTML5 video APIs, and automatically fallback to a lightweight Flash-based video player for unsupported formats or older browsers.")
	@endcomponent

	<p>Each different type of story uses a unique design depending on the department that it originates from. This is done in order to emphasise particular content that is important to each department, while staying within the design language of the website. For instance, Fashion stories use full-width images, videos, and wide paragraphs to present content in an editorial fashion. Beauty stories use large carousels to highlight multiple beauty products. Art stories feature interactive image galleries to preview exhibitions.</p>

	@component("components.project-image")
		@slot("image", "/img/projects/joyce/joyce-image-3.jpg")
		@slot("caption", "Stores and brands are inter-connected throughout the website. The directory page features live-searching where results on the right fade out as the user types. The grid of letters on the left also fades out in real-time corresponding to filtered results.")
	@endcomponent

	<p>To tackle the stores and brands part of the website, we developed a WordPress plugin that creates global relationships between defined stores and brands. Users can click on a brand to reveal which stores it is currently stocked in, and clicking on a store will take the user to the store’s individual page. Alternatively, users can also browse stores by their locations and type.</p>

	<p>The directory page also includes live searching by using some simple client-side <code>regex</code> testing. As the user types, results from the list become hidden in real-time, and when a letter's row has no results to show, the row hides automatically. At the same time, letters in the the letter grid on the sidebar (which when clicked scroll the user to the letter's respective row) fade out, showing the user which rows are currently being hidden. We found this incredibly useful in improving the user experience, showing users which rows were still visible beyond the view of the current viewport.</p>

	@component("components.project-image")
		@slot("image", "/img/projects/joyce/joyce-image-4.jpg")
		@slot("caption", "Small details, such as how switching between a sun or moon icon depending on the time of day, add personality to the website without intruding on the user experience.")
	@endcomponent

	<p>Individual store pages contain important information such as telephone numbers, addresses, opening/closing times, and coordinates for the Google Maps API-powered map. Brands that have been defined in the CMS can be linked with any of the created stores, and these links will persist throughout the entire website and are automatically managed across the different website languages.</p>

	<p>The Joyce Card, Joyce Gift Card, Joyce eShop, and Joyce Careers sections also received a design overhaul. Due to time constraints we were unable to modify the Magento installation directly, and as such we were limited to only being able to attach customised stylesheets. This was quite a challenging task, due to having to support cross-browser compatibility without being able to change the HTML or include JavaScript files, but in the end it was very rewarding having achieved this under such challenging constraints. Furthermore, I also worked on some preliminary Joyce eShop mockups.</p>

	@component("components.project-image")
		@slot("image", "/img/projects/joyce/joyce-image-5.jpg")
		@slot("caption", "Joyce eShop Mockup.")
	@endcomponent

	@component("components.project-image")
		@slot("image", "/img/projects/joyce/joyce-image-6.jpg")
		@slot("caption", "A global cart was designed to be integrated globally across all pages on the site.")
	@endcomponent

	<h4>Cross-Browser Compatibility</h4>

	<p>Cross-browser compatibility was handled in two ways. First was handling the responsiveness of the website; most users who use older browsers, such as Internet Explorer 8, also tend to use smaller display resolutions, meaning that the responsive design of the website would not function correctly as older browsers do not support CSS media queries or <code>calc</code> sizes. To overcome this, two fantastic JavaScript plugins, <a href="https://www.github.com/scottjehl/Respond" target="_blank" rel="noopener noreferrer">Respond</a> and <a href="https://www.github.com/keithclark/selectivizr" target="_blank" rel="noopener noreferrer">Selectivizr</a>, were used to tackle CSS media queries and integer/operator-based <code>nth-child</code> selectors. Second was making sure older browsers had graceful fallbacks, such as making sure SVGs were replaced with other image formats, and that <code>calc</code> sizes were replaced with either fixed or fluid-width sizes.</p>

	<h3>Conclusion</h3>

	<p>Overall, the Joyce project was one of my favourites. Being an immense learning experience, it was also a massive undertaking, having been personally responsible for all aspects of design &mdash; including mockups, front-end demos, all CSS and JavaScript development, and UAT &mdash; as well as delving into WordPress and Magento. A lot was learnt about cross-browser compatibility, as having so many different pages with varying layouts and features initially resulted in a lot of interesting problems. Furthermore, it was quite eye-opening being able to work with a variety of different people from the fashion industry, ranging from artists to marketing gurus, and learning how they all view and understand web design, as well as sharing my knowledge and expertise.</p>

@endsection
