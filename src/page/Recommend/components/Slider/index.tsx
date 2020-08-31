/*
 * @Author: Shabby申
 * @Date: 2020-05-18 18:29:26
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-31 18:44:03
 * @Description: 轮播图组件 也可以使用antd的走马灯
 */
import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import { IBannerList } from "../../store/reducer";
import "swiper/css/swiper.css";
import styles from "./style.less";

type SliderProps = {
  bannerList: IBannerList;
};

const Slider: React.FC<SliderProps> = ({ bannerList }) => {
  const [sliderSwiper, setSliderSwiper] = useState<Swiper>();

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let sliderSwiper = new Swiper("#sliderContainer", {
        loop: true,
        autoplay: {
          delay: 3000,
          //户操作swiper之后，是否禁止autoplay。默认为true：停止。
          disableOnInteraction: false,
        },
        pagination: { el: ".swiper-pagination" },
      });
      setSliderSwiper(sliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);

  return (
    <div className={styles.sliderWrap}>
      {/* 下拉的遮罩 在轮播图上面给个主题色的背景 防止往下滑出现白色背景 */}
      <div className={styles.before}></div>
      <div id="sliderContainer" className={styles.sliderContainer}>
        <div className="swiper-wrapper">
          {bannerList.map((item, index) => {
            return (
              <div className="swiper-slide" key={index}>
                <div className={styles.sliderNav}>
                  <img
                    src={item.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default Slider;
