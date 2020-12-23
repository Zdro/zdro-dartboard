import React, {useRef} from "react";
import Slider from "react-slick";
import {Card} from "react-bootstrap";

//import 'swiper/swiper.min.css'
import 'swiper/swiper.less';

import {Swiper,SwiperSlide} from "swiper/react";

function X01ScoreLandscape (){
    const slider = useRef(null);
    return (
        <Swiper
            slidesPerView={2}
            direction={'vertical'}
            pagination={false}
            scrollbar={false}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            <SwiperSlide><Card body>Slide 1</Card></SwiperSlide>
            <SwiperSlide><Card body>Slide 2</Card></SwiperSlide>
            <SwiperSlide><Card body>Slide 3</Card></SwiperSlide>
            <SwiperSlide><Card body>Slide 4</Card></SwiperSlide>
        </Swiper>
    )
}

export default X01ScoreLandscape;