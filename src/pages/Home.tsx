// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../styles/swiper-custom.css'
import SlideContent from "../components/SlideContent"

//  gitHubへデプロイする時の対策
const images = [
  `${import.meta.env.BASE_URL}images/sky.jpg`,
  `${import.meta.env.BASE_URL}images/field.jpg`,
  `${import.meta.env.BASE_URL}images/wave.jpg`,
  `${import.meta.env.BASE_URL}images/way.jpg`,
]

const Home =()=>{
  return(
    <>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        autoplay={{
          delay: 3000,                  // 3秒ごとにスライド
          disableOnInteraction: false,  // ユーザー操作後も自動再開
        }}
        loop={true}                     // 無限ループ
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <SlideContent backgroundImage={img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
export default Home