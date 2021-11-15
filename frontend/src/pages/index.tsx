export default function Home(): JSX.Element {
	return (
		<div>
			{fetch('/contributions')
				.then((response) => response.text())
				.then((data) => console.log(data))}
		</div>
	);
}
