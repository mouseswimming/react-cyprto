import { Spin } from "antd";

export default function Loader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spin />
    </div>
  );
}
