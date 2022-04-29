import React, { useState } from 'react';
import Hello from './components/hello/index';
import Header from './components/header/index'
import Btn from './components/btn/index';

import get from 'lodash/get'
import join from 'lodash/join'

const App = () => {
	const [count, setCount] = useState(0);
	const arr = join(['a', 'b', 'c'], '~');
	get({a: 'a'}, 'a');
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
