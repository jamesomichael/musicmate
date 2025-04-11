import { useState, useCallback } from 'react';

const useToggle = (initial = false) => {
	const [value, setValue] = useState(initial);
	const toggle = useCallback(() => setValue((v) => !v), []);
	const setOn = useCallback(() => setValue(true), []);
	const setOff = useCallback(() => setValue(false), []);
	return { value, toggle, setOn, setOff };
};

export default useToggle;
