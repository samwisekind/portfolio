@extends ('layouts.project')

@section ('project-content')

	<h3>The Idea</h3>

	<p>After the controversial announcement of the video game <i>Left 4 Dead 2</i> in early June of 2009, I, along with two of my friends Brad and Saurabh, created the Steamchat podcast (formerly "Steamcast"). The show was born from community voices, and therefore it was created and dedicated to the community, and would focus its product and discussions around them.</p>

	<h3>Challenges</h3>

	<p>The main challenge was to create a podcast that differentiated itself from the majority of other video game-related podcasts, while still remaining interesting. The aim was to create a more listener-engaged show, where listeners would not only able to dictate the focus of the podcast but also contribute directly.</p>

	<p>Another challenge was to create an engaging website. Most podcast websites are designed as a simple directory, listing each podcast as they are released with only a title, description, and download link. Even though the majority of the work was focused on the podcast episode production, we felt it was important to create a unique website to make checking for new episodes exciting.</p>

	<h3>Result</h3>

	<p>The success of a podcast not only lies in how it is structured and the production quality, but also in the hosts themselves, in two aspects. The first aspect is the chemistry between the hosts, in that the conversation between the hosts has to feel natural and balanced. The second aspect is what the hosts themselves bring to the chemistry; in the case of Steamchat, all three hosts had a different attitude towards the subject matter. For instance, Brad brought an artistic view to discussions whereas Saurabh provided a more consumer-based perspective. This created a good balance between passion/emotion and objectivity/pragmatism. The unique chemistry between the hosts and their respective attitudes and personalities was a major factor in the success of Steamchat.</p>

	<p>Focusing the show on the community greatly helped its growth in the early stages. Having a commitment to community members and their thoughts meant that Steamchat grew a strong initial listenership, both unique and returning. As the show grew from there, community members would contribute content to the show that helped it grow, most notably the <a href="http://www.thesteamchat.com/episode.php?type=episode&number=9" target="_blank" rel="noopener noreferrer">first interview with Valve co-founder Gabe Newell</a>.</p>

	<p>The structure of the episodes were a key element in the quality of Steamchat episodes. Each episode started with reading listener emails, sharing their thoughts and answering their questions. We continually suggested listeners to send in their thoughts, as narratives would form over a number of episodes, resulting in a higher recurring listenership. The discussion moved on to the latest industry news and announcements, which served not only to update the listeners on the latest happenings in the industry, but also to provide unique discussions stemming from the chemistry of the hosts. The episodes would end with open-ended discussions about key subject matters, usually suggested by listeners.</p>

	<p>This community-contributed content helped the show grow exponentially over the next year. At the height of the show, we achieved a monthly listenership of over 15,000 and an annual viewership of over 4,000,000, in addition to publishing more interviews and exclusive features, including:</p>

	<ul>
		<li><a href="http://www.thesteamchat.com/episode.php?type=episode&number=47">Gabe Newell 2011 Interview</a></li>
		<li><a href="http://www.thesteamchat.com/episode.php?type=episode&number=9">Gabe Newell 2009 Interview</a></li>
		<li><a href="http://www.thesteamchat.com/episode.php?type=snack&number=3">Interview with Jonathan Coulton</a></li>
		<li><a href="http://www.thesteamchat.com/episode.php?type=snack&number=2">Interview with Harry Robins</a></li>
	</ul>

	@component("components.project-image")
		@slot("image", "/img/projects/steamchat/steamchat-image-1.jpg")
		@slot("caption", "The homepage featured a dramatic header image that also served as an interactive audio player for the latest episode. The header images were edited to overlay the navigation for dramatic eff")
	@endcomponent

	<p>The website helped improve the quality of the listening experience. The homepage featured a large header that served as an audio player for the latest episode. Users could click on the header from the edges of the screen to seek through the episode audio, or click on the episode's title to go directly to the episode page. This, combined with a large dramatic header image, guided users towards the latest episode without making it difficult for them to browse the archives.</p>

	<!-- Video goes here -->

	<p>Each episode was recorded live using the Twitch live-streaming service. A page was created on the website that featured a live countdown to the start of each episode. Two hours before the live episode recording, a looping video would play that featured the latest news and some interesting facts from the video game industry. The video was edited each week in Apple Motion.</p>

	<p>The website used two RSS feeds, one for MP3 files and one for M4A files. The MP3 files were first created in Adobe Soundbooth where the audio was cleaned and edited, and then the M4A files was created in Apple GarageBand in order to create iTunes and iOS-supported podcast chapters. Timestamps were also edited into the show notes after episode editing. This process usually took two to three days.</p>

	<h4>Conclusion</h4>

	<p>Steamchat was incredibly successful, and was also a massive learning experience. This was the first time I had personally undertaken a project of this manner, and I am incredibly proud of what Brad, Saurabh, and I were able to produce. A lot of the success was due to how we structured the show and the chemistry between the hosts. Furthermore however, and more importantly, it was also due to the contributions that our listeners had made to the show, both between and during episodes. Without structuring and building the podcast around its listeners, and without their passion and contributions, Steamchat would not have reached the success it had.</p>

	<p>Not only did I learn a lot regarding audio editing and website development, but I gained quite a bit of insight into managing and organising project of Steamchat's nature. The main lesson I learnt is that consistency and schedule is incredibly important for a podcast. Users and listeners can get accustomed to expecting new content on certain days of the week, and may even shape their daily routine around it. Many of our listeners emailed us explaining that they would listen to the podcast while at the gym or driving to work, so making sure we released episodes on time and on schedule was incredibly important for our listenership</p>

	<p>It also improved my communication skills. Firstly, it taught me how to deal with both positive and negative feedback, learning to politely praise those who praised us, but also listen to and understand feedback that listeners had given us in order to improve the show. Having a show structured around interactions with the community, it was very important that we communicated correctly and built a healthy and positive relationship with them. Secondly, it also taught me how to discuss a variety of different issues with two very different personalities. It improved my ability to communicate in a way that I was able to appreciate their opinions and perspectives, and not only provide interesting and provocative feedback and responses, but also in such a manner that was not only easy for the other hosts to understand, but also for the listeners.</p>

	<p>P.S. Extra-special thanks to Justin, Sebastian, Brett, Vic, Alex, Jeromy, Tanya, and Sasso for their invaluable help with making Steamchat what it was.</p>

@endsection
