import fs from "fs/promises";
import path from "path";
import Image from "next/image";

const HomePage = (props) => {
	const { girls } = props;

	return (
		<ul>
			{girls.map((girl) => (
				<div key={girl.id}>
					<li>
						{girl.title} - {girl.description}
					</li>
					<Image
						width={400}
						height={400}
						src={girl.image}
						alt={`Image of ${girl.title}`}
					/>
				</div>
			))}
		</ul>
	);
};

/* 
getStaticProps() is a NextJS built-in method and isexecuted on the server side only 
and any code inside of it is not visible to the client, and could even include database 
credentials and other secrets that are normally saved only on the server (though they should 
still be kept in environment variables and encrypted). In order to use server methods
like "fs" and "path", they need to be used only inside of getStaticProps()
*/
export async function getStaticProps() {
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);
	// Must always return an object with a props key that takes an object as the value
	// The data inside the props object can be whatever, usually an array
	return {
		props: {
			girls: data.girls,
		},
	};
}

export default HomePage;
