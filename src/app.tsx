import React, { useState } from 'react';
import Hello from './components/hello/index';
import Header from './components/header/index'
import Btn from './components/btn/index';

const App = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<span>hello world</span>
			<Hello />
			<Header />
			<Btn onClick={() => setCount(count + 1)} title='count'/>
			<span>{count}</span>
		</div>
	)
}

export default App;
