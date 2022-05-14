import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "./index.css";

interface sProps {
  urls: any;
  close: Function;
}

const Swip: React.FC<sProps> = ({ urls, close }) => {
  return (
    <>
      <Swiper className="mySwiper">
        <SwiperSlide>
          {" "}
          <img
            src={urls}
            alt="img"
            onClick={() => close()}
            // className={`${!reveal ? "blur" : ""} img`}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Swip;
