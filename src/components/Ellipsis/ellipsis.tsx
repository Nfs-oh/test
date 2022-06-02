import React, { memo, useEffect, useRef, useState } from 'react';

type IProps = {
  text: string;
  lineHeight?: number;
  textStyle?: Record<string, number | string>;
  size?: number;
  textClass?: string;
  line?: number;
  moreText?: string;
  folderText?: string;
};

const Ellipsis: React.FC<IProps> = ({
  text,
  lineHeight = 24,
  textStyle,
  size = 14,
  textClass,
  line = 3,
  moreText = '展开',
  folderText = '收起'
}) => {
  const textRef = useRef();
  const containerRef = useRef();
  const moreRef = useRef();
  const folderRef = useRef();
  const [oversize] = useState('none');
  const [isLimitHeight, setisLimitHeight] = useState(true);
  const initText = (data) => {
    const more = moreRef.current && moreRef.current;
    const folder = folderRef.current && folderRef.current;
    more.style.display = 'none';
    folder.style.display = 'none';
    if (isLimitHeight) {
      limitShow(data);
    }
  };
  const limitShow = (data) => {
    if (textRef.current) {
      const textDom = textRef.current;
      const title = containerRef.current;
      const more = moreRef.current;
      let n = Math.min(parseInt(((title.offsetWidth * 2) / size) * line, 10) - 4, text.length);
      if (textDom) {
        if (title.offsetHeight > lineHeight * line) {
          more.style.display = 'inline-block';
          while (title.offsetHeight > lineHeight * line && n > 0) {
            textDom.innerText = data = data.substring(0, n - 1);
            n--;
          }
        }
      }
    }
  };
  const more = () => {
    setisLimitHeight(false);
    const more = moreRef.current && moreRef.current;
    const folder = folderRef.current;
    more.style.display = 'none';
    folder.style.display = 'inline-block';
    const textDom = textRef.current;
    textDom.innerText = text;
  };
  const folder = () => {
    setisLimitHeight(true);
    const folder = folderRef.current && folderRef.current;
    folder.style.display = 'none';
    limitShow(text);
  };
  useEffect(() => {
    initText(text);
  }, [text]);
  return (
    <div className={'text-ellipsis'} ref={containerRef}>
      <span style={textStyle} className={textClass} content={text}>
        <span className="text-ellipsis-limit-text" ref={textRef}>
          {text}
        </span>
        <span
          style={{ display: oversize }}
          className="text-ellipsis-more"
          ref={moreRef}
          onClick={() => more()}
        >
          <span>...</span>
          <span className="text-link">{moreText}</span>
        </span>
      </span>
      <span ref={folderRef} className="text-ellipsis-after" onClick={() => folder()}>
        <span className="text-link">{folderText}</span>
      </span>
    </div>
  );
};

export default memo(Ellipsis);
