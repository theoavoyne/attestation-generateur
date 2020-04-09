import { useEffect, useState } from 'react';

export default () => {
  const [pageHeight, setPageHeight] = useState(window.innerHeight);

  useEffect(() => {
    const onResize = () => { setPageHeight(window.innerHeight); };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return pageHeight;
};
