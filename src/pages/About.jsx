import {Link} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
function About() {
	return (
		<div className="hero">
			<div className="text-center hero-content">
				<div className="mx-w-lg">
					<h1 className="text-8xl font-bold mb-8">About App</h1>
					<p className="text-3xl mb-8">This Is A 3rd party github user finder app with cool User Interface</p>
					<Link to="/" className="btn btn-primary btn-lg">
						<FaHome className="mr-2" />
						Back To Home
					</Link>
				</div>
			</div>
		</div>
	)
}

export default About
