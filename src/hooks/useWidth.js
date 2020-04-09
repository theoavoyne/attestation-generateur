import { useEffect, useState } from 'react';

export default () => {
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => { setPageWidth(window.innerWidth); };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return pageWidth;
};
