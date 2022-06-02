import React, { Component } from 'react';
import img404 from '@/img/404.png';
import styles from './404.css';

class ErrorPage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <img className={styles.img_404} src={img404} alt="404" />
        <div className={styles.title}>权限不足</div>
        <div className={styles.content}>请联系管理员开通相关权限</div>
        <a className={styles.read} href="">
          返回
        </a>
      </div>
    );
  }
}

export default ErrorPage;
