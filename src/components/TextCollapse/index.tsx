import React, { ReactElement, useLayoutEffect, useRef, useState } from 'react';
import { Container } from './styles';

type IProps = {
  text: string;
  line: number;
  lineHeight: number;
  textClass: string;
  collapseBtn: ReactElement;
  onCollapse: (collapse: boolean) => void;
};

const TextCollapse: React.FC<IProps> = ({
  text,
  line,
  lineHeight,
  textClass,
  collapseBtn,
  onCollapse
}) => {
  const boxRef = useRef();
  const [hasCollapse, setHasCollapse] = useState(false);
  const [splitPoint, setSplitPoint] = useState(0);
  const [collapse, setCollapse] = useState(false);
  const fullHeight = useRef(0);
  const fullPreSplit = useRef(0);
  const collapsePreSplit = useRef(0);

  const getMaxStr = (el: HTMLDivElement, maxHeight: number) => {
    let start = 0;
    let end = text.length;
    while (Math.abs(start - end) > 1) {
      const middle = Math.ceil((start + end) / 2);
      el.innerText = text.slice(0, middle);
      if (el.clientHeight > maxHeight) {
        end = middle;
      } else {
        start = middle;
      }
    }
    return text.slice(0, start);
  };

  const getSplitSubStr = (el: HTMLDivElement, splitLineHeight: number, splitStr: string) => {
    el.innerText = splitStr;
    let final = '';
    if (el.clientHeight > splitLineHeight) {
      for (let i = 1; i < 100; i++) {
        el.innerText = text.slice(0, splitStr.length - i);
        if (el.clientHeight === splitLineHeight) {
          final = text.slice(0, splitStr.length - i);
          break;
        }
      }
    } else {
      for (let i = 1; i < 100; i++) {
        el.innerText = text.slice(0, splitStr.length + i);
        if (el.clientHeight === splitLineHeight + lineHeight) {
          final = text.slice(0, splitStr.length + i - 1);
          break;
        }
      }
    }
    return final;
  };

  const handleCollapse = () => {
    const box = boxRef.current as HTMLDivElement;
    if (collapse) {
      if (fullPreSplit.current > 0) {
        setSplitPoint(fullPreSplit.current);
        box.innerText = text.slice(0, fullPreSplit.current);
      } else {
        const maxStr = getMaxStr(box, fullHeight.current - lineHeight);
        const splitStr = getSplitSubStr(box, fullHeight.current - lineHeight, maxStr);
        box.innerText = splitStr;
        fullPreSplit.current = splitStr.length;
        setSplitPoint(splitStr.length);
      }
      onCollapse(false);
    } else {
      box.innerText = text.slice(0, collapsePreSplit.current);
      setSplitPoint(collapsePreSplit.current);
      onCollapse(true);
    }

    setCollapse(!collapse);
  };

  useLayoutEffect(() => {
    const box = boxRef.current as HTMLDivElement;
    box.innerText = text;
    const maxHeight = line * lineHeight;
    fullHeight.current = box.clientHeight;
    if (box.clientHeight > maxHeight) {
      const preOverLineHeight = maxHeight - lineHeight;
      const maxStr = getMaxStr(box, preOverLineHeight);
      const splitStr = getSplitSubStr(box, preOverLineHeight, maxStr);
      box.innerText = splitStr;
      setHasCollapse(true);
      setSplitPoint(splitStr.length);
      setCollapse(true);
      onCollapse(true);
      collapsePreSplit.current = splitStr.length;
    }
  }, []);
  const isCollapse = hasCollapse && collapse;
  return (
    <Container>
      <div className={textClass || ''} ref={boxRef}></div>
      {hasCollapse && (
        <div className={isCollapse ? 'collapse-wrap' : ''}>
          <span className={`${textClass || ''} ${isCollapse ? 'collapse-ellipse' : ''}`}>
            {text.slice(splitPoint, text.length)}
          </span>
          <span
            className={`${textClass || ''} ${isCollapse ? 'collapse-text-btn' : ''}`}
            onClick={handleCollapse}
          >
            {collapseBtn}
          </span>
        </div>
      )}
    </Container>
  );
};

export default TextCollapse;
