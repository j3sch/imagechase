import { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
	const [response, setResponse] = useState({});

	useEffect(() => {
		fetch('http://localhost:5000/contributions').then((response) =>
			setResponse(response),
		);
	}, []);

	return <div>{response}</div>;
}
