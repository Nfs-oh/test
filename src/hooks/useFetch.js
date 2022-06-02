import { useState, useEffect } from 'react';

export default (api, options, defaultValue, onSuccess, onError) => {
  const [data, setData] = useState(defaultValue);

  const fetchData = () => {
    api(options).then(res => {
      if (res.resultCode === '00') {
        setData(res.data)
        onSuccess && onSuccess(res.data)
      } else {
        onError && onError(res)
      }
    }).catch(err => (onError && onError(err)));
  }

  useEffect(() => {
    fetchData();
  }, []);
  return [data, fetchData];
}