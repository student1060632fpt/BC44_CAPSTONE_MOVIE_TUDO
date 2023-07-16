import React, { useEffect, useState } from "react";
import { https } from "../../../service/config";
import { Tabs } from "antd";
import moment from "moment/moment";
const onChange = (key) => {
  console.log(key);
};

export default function TabsMovie() {
  const [heThongRap, setHeThongRap] = useState([]);
  // /api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01
  useEffect(() => {
    https
      .get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP08")
      .then((res) => {
        setHeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  let renderDsPhim = (danhSachPhim) => {
    return danhSachPhim.map((phim) => {
      return (
        <div key={phim.maPhim} className="p-5 grid grid-cols-5 gap-3">
          <img
            src={phim.hinhAnh}
            className="h-40 w-32 object-cover col-span-1"
            alt=""
          />
          <div className="col-span-4">
            <div className="grid grid-cols-4 w-full gap-3">
              {phim.lstLichChieuTheoPhim.slice(0, 8).map((lichChieu) => {
                //moment js
                return (
                  <div
                    key={lichChieu.maLichChieu}
                    className=" bg-green-400 text-white rounded h-10 leading-10 text-center "
                  >
                    {moment(lichChieu.ngayChieuGioChieu).format(
                      "DD/MM/YY-hh:mm"
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
  };

  let renderHeThongRap = () => {
    return heThongRap.map((heThong, index) => {
      return {
        key: index,
        label: <img className="w-10" src={heThong.logo} alt="" />,
        children: (
          <Tabs
            tabPosition="left"
            defaultActiveKey="1"
            items={heThong.lstCumRap.map((cumRap, index) => {
              return {
                key: index,
                label: (
                  <div className="text-left w-60 whitespace-normal">
                    <p className="text-green-600 font-bold">
                      {cumRap.tenCumRap}
                    </p>
                    <p className="truncate">{cumRap.diaChi}</p>
                  </div>
                ),
                children: renderDsPhim(cumRap.danhSachPhim),
              };
            })}
          ></Tabs>
        ),
      };
    });
  };
  return (
    <div className="container">
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        items={renderHeThongRap()}
        onChange={onChange}
      />
    </div>
  );
}
