/*
 * @Author: Shabby申
 * @Date: 2020-05-18 18:29:26
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-19 19:12:19
 * @Description: 轮播图组件
 */
import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css/swiper.css"
// import "swiper/swiper.less";
import { IBannerList } from "../../page/Recommend/store/reducer";
import styles from "./style.less";

type SliderProps = {
  bannerList: IBannerList;
};

const Slider: React.FC<SliderProps> = ({ bannerList = [] }) => {
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
