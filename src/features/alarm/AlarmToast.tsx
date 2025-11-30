import React from "react";
import { toast, type Toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

interface AlarmToastProps {
  t: Toast;
  title?: string;
  message?: string;
  isTest?: boolean;
}

const AlarmToast: React.FC<AlarmToastProps> = ({
  t,
  title = "기상 시간입니다!",
  message = "어젯밤 어떤 꿈을 꾸셨나요? 잊어버리기 전에 기록해보세요.",
  isTest = false,
}) => {
  const navigate = useNavigate();

  const handleRecord = () => {
    toast.remove(t.id);
    navigate("/record");
  };

  const handleClose = () => {
    toast.remove(t.id);
  };

  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="shrink-0 pt-0.5">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Bell className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleRecord}
                className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                지금 기록하기
              </button>
              <button
                onClick={handleClose}
                className="flex-1 bg-white text-gray-700 px-3 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                {isTest ? "닫기" : "나중에"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmToast;
