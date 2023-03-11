import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getResouceList } from "@/api/list";
import "./CouponBanner.less";
import Girl from "@Img/girl.png";
import BackImgTwo from "@Img/BackImgTwo.png";
import Mobile_Girl from "@Img/Mobile_girl.png";
import DescribeContent from "@Img/describeContent.png";
import Mobile_DescribeContent from "@Img/Mobile_describeContent.png";

const CouponBanner: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(24);

  // 使用rem配置 大小 随设备宽度变化
  const handleSetSize = () => {
    const docEl = document.documentElement;
    function setRemUnit() {
      let rem = docEl.clientWidth / 7.68;
      docEl.style.fontSize = rem + "px";
    }
    setRemUnit();
    window.addEventListener("resize", setRemUnit);
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) {
        setRemUnit();
      }
    });
  };
  const handleGetResourceList = () => {
    getResouceList().then((res) => {
      console.log("res", res);
    });
  };
  document.documentElement.clientWidth < 769 && handleSetSize();
  useEffect(() => {
    // 执行倒计时逻辑
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            clearInterval(countdownInterval);
          }
        }
      }
    }, 1000);

    // 在组件卸载或更新时停止倒计时
    return () => clearInterval(countdownInterval);
  }, [seconds, minutes, hours]);

  // 在组件渲染时手动执行一次倒计时逻辑
  useEffect(() => {
    const delay = setTimeout(() => {
      if (seconds === 0 && minutes === 0 && hours === 24) {
        setSeconds(59);
        setMinutes(59);
        setHours(23);
      }
    }, 0);
    return () => clearTimeout(delay);
  }, []);
  // 补0
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedHours = hours < 10 ? "0" + hours : hours;
  return (
    <div className="container">
      {/* 语言切换 */}
      {/* <button
        onClick={() => i18n.changeLanguage(i18n.language == "en" ? "zh" : "en")}
      >
        {i18n.language == "en" ? "zh" : "en"}
      </button> 
      <span>{t("login.confirm")}</span>*/}
      {/* <button onClick={handleGetResourceList}>获取Mock数据</button> */}
      <div className="PCBlock">
        <div className="PCBlock_brandsBlock">
          <div className="PCBlock_brandsBlock_LB">
            <div className="PCBlock_backImg">
              <img src={Girl} />
            </div>
            <div className="PCBlock_brandsBlock_LB_textContent">
              <span>Enjoy now your favorite brands with</span>
              <span>30% 0ff</span>
            </div>
          </div>
          <div className="PCBlock_brandsBlock_RB">
            <div className="countDownContext">
              Ends in<span>{formattedHours}</span>h
              <span>{formattedMinutes}</span>m<span>{formattedSeconds}</span>s
            </div>
            <img src={DescribeContent} />
          </div>
        </div>
      </div>
      <div className="MobileBlock">
        <div className="MobileBlock_innerBlock">
          <div className="MobileBlock_brandsBlock_LB_textContent">
            <span>Enjoy now your favorite brands with</span>
            <span>30% 0ff</span>
          </div>
          <div className="MobileBlock_countBlock">
            <div className="Mobile_countDownContext">
              Ends in<span>{formattedHours}</span>h
              <span>{formattedMinutes}</span>m<span>{formattedSeconds}</span>s
            </div>
            <div className="MobileImg_box">
              <img src={Mobile_DescribeContent} />
            </div>
          </div>
          <img className="MobileBlock_backImgTWo" src={BackImgTwo} />
          <img className="MobileBlock_Girl" src={Mobile_Girl} />
        </div>
      </div>
    </div>
  );
};

export default CouponBanner;
