import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Icon } from "@iconify/react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import EmojiPicker from "emoji-picker-react";
import CircularProgress from "@mui/material/CircularProgress";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

export default function CommentsSideBar({ isOpen, closeSidebar }) {
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerReply, setShowPickerReply] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingReply, setLoadingReply] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [repiles, setReplies] = useState(false);
  const [Like, SetLike] = useState(false);
  const [replyShow, setReplyShow] = useState(false);
  const handleEmojiSelect = (event, emojiObject) => {
    console.log("Selected Emoji Object:", emojiObject);
    setSelectedEmoji(emojiObject.emoji);
  };

  const handleShowPicker = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPicker(!showPicker);
    }, 500);
  };

  const handleShowPickerReply = () => {
    setLoadingReply(true);
    setTimeout(() => {
      setLoadingReply(false);
      setShowPickerReply(!showPickerReply);
    }, 500);
  };
  return (
    <div
      className={`fixed top-0 right-0 lg:w-[35%] md:w-[50%] w-[100%] h-screen overflow-hidden outline-none bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div className="flex items-center justify-between py-4 px-6">
          <h2 className="text-xl font-Poppins font-semibold">Responses (7)</h2>
          <button
            onClick={closeSidebar}
            className="text-gray-600 cursor-pointer"
          >
            <Icon icon="akar-icons:cross" className="text-xl" />
          </button>
        </div>
        <hr />

        <div className="p-4 w-full h-full">
          <div className="w-full h-auto p-2 shadow-md bg-white rounded-xl">
            <div className="flex gap-2 items-center">
              <Avatar sx={{ bgcolor: deepOrange[500], width: 36, height: 36 }}>
                N
              </Avatar>
              <h5 className="text-gray-800 font-Poppins text-lg">
                Naveed Abbasi
              </h5>
            </div>
            <div className="w-full mt-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What are your thoughts?"
                className="w-full h-24 p-3 font-poppins outline-none border rounded-lg shadow-sm resize-none"
              ></textarea>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={handleShowPicker}
                  className="p-2  text-white rounded-lg hover:bg-[#4CA38A]"
                >
                  😀
                </button>
                <button className="px-4 py-2 bg-[#5EC1A1] text-white rounded-lg hover:bg-[#4CA38A]">
                  Respond
                </button>
              </div>

              {loading && (
                <div className="flex justify-center items-center mt-2">
                  <CircularProgress size={24} />
                </div>
              )}

              {/* Emoji picker */}
              {showPicker && !loading && (
                <div className="w-full mt-3 h-auto bg-white">
                  <EmojiPicker
                    onSelect={handleEmojiSelect}
                    width={420}
                    height={400}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-12">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <Avatar sx={{ width: 34, height: 34 }}>A</Avatar>
                <div className="flex flex-col">
                  <h5 className="text-gray-800 font-Poppins leading-none text-sm">
                    {" "}
                    Abbasi
                  </h5>
                  <span className="text-[#6b6b6b] text-xs">21 Days Ago</span>
                </div>
              </div>

              <Menu>
                <MenuButton>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M4.385 12c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41m5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59s-.58.86-.58 1.41m5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59s1.03-.2 1.42-.59.58-.86.58-1.41-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59s-.58.86-.58 1.41"
                    ></path>
                  </svg>
                </MenuButton>

                <MenuItems className="w-40 origin-top-right shadow-lg rounded-xl bg-white p-1 text-sm">
                  <MenuItem>
                    <button className="flex w-full items-center gap-2 rounded-lg py-1 px-3 hover:bg-gray-100">
                      Report
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>

            <p className="font-Poppins text-[#6b6b6b] text-[14px] p-4">
              Liked the article! I always stocked to a rule of thumb for placing
              input instructions, which is instructions & needed information as
              a hint (under the input), and example as a placeholder.
            </p>

            <div className="border-b border-t mt-6  mb-8 gap-4  flex justify-between py-2">
              {/* LikeAndComment */}
              <div className="flex  gap-2 ">
                {/* like */}
                <div className="flex items-center gap-2">
                  {Like ? (
                    <svg
                      onClick={() => SetLike(false)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      aria-label="clap"
                      className="cursor-pointer "
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.37.828 12 3.282l.63-2.454zM15.421 1.84l-1.185-.388-.338 2.5zM9.757 1.452l-1.184.389 1.523 2.112zM20.253 11.84 17.75 7.438c-.238-.353-.57-.584-.93-.643a.96.96 0 0 0-.753.183 1.13 1.13 0 0 0-.443.695c.014.019.03.033.044.053l2.352 4.138c1.614 2.95 1.1 5.771-1.525 8.395a7 7 0 0 1-.454.415c.997-.13 1.927-.61 2.773-1.457 2.705-2.704 2.517-5.585 1.438-7.377M12.066 9.01c-.129-.687.08-1.299.573-1.773l-2.062-2.063a1.123 1.123 0 0 0-1.555 0 1.1 1.1 0 0 0-.273.521z"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        d="M14.741 8.309c-.18-.267-.446-.455-.728-.502a.67.67 0 0 0-.533.127c-.146.113-.59.458-.199 1.296l1.184 2.503a.448.448 0 0 1-.236.755.445.445 0 0 1-.483-.248L7.614 6.106A.816.816 0 1 0 6.459 7.26l3.643 3.644a.446.446 0 1 1-.631.63L5.83 7.896l-1.03-1.03a.82.82 0 0 0-1.395.577.81.81 0 0 0 .24.576l1.027 1.028 3.643 3.643a.444.444 0 0 1-.144.728.44.44 0 0 1-.486-.098l-3.64-3.64a.82.82 0 0 0-1.335.263.81.81 0 0 0 .178.89l1.535 1.534 2.287 2.288a.445.445 0 0 1-.63.63l-2.287-2.288a.813.813 0 0 0-1.393.578c0 .216.086.424.238.577l4.403 4.403c2.79 2.79 5.495 4.119 8.681.931 2.269-2.271 2.708-4.588 1.342-7.086z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      onClick={() => SetLike(true)}
                      className="text-text-[#191919] cursor-pointer  hover:text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      aria-label="clap"
                    >
                      <path
                        fill="currentColor"
                        d="M11.37.828 12 3.282l.63-2.454zM13.916 3.953l1.523-2.112-1.184-.39zM8.589 1.84l1.522 2.112-.337-2.501zM18.523 18.92c-.86.86-1.75 1.246-2.62 1.33a6 6 0 0 0 .407-.372c2.388-2.389 2.86-4.951 1.399-7.623l-.912-1.603-.79-1.672c-.26-.56-.194-.98.203-1.288a.7.7 0 0 1 .546-.132c.283.046.546.231.728.5l2.363 4.157c.976 1.624 1.141 4.237-1.324 6.702m-10.999-.438L3.37 14.328a.828.828 0 0 1 .585-1.408.83.83 0 0 1 .585.242l2.158 2.157a.365.365 0 0 0 .516-.516l-2.157-2.158-1.449-1.449a.826.826 0 0 1 1.167-1.17l3.438 3.44a.363.363 0 0 0 .516 0 .364.364 0 0 0 0-.516L5.293 9.513l-.97-.97a.826.826 0 0 1 0-1.166.84.84 0 0 1 1.167 0l.97.968 3.437 3.436a.36.36 0 0 0 .517 0 .366.366 0 0 0 0-.516L6.977 7.83a.82.82 0 0 1-.241-.584.82.82 0 0 1 .824-.826c.219 0 .43.087.584.242l5.787 5.787a.366.366 0 0 0 .587-.415l-1.117-2.363c-.26-.56-.194-.98.204-1.289a.7.7 0 0 1 .546-.132c.283.046.545.232.727.501l2.193 3.86c1.302 2.38.883 4.59-1.277 6.75-1.156 1.156-2.602 1.627-4.19 1.367-1.418-.236-2.866-1.033-4.079-2.246M10.75 5.971l2.12 2.12c-.41.502-.465 1.17-.128 1.89l.22.465-3.523-3.523a.8.8 0 0 1-.097-.368c0-.22.086-.428.241-.584a.847.847 0 0 1 1.167 0m7.355 1.705c-.31-.461-.746-.758-1.23-.837a1.44 1.44 0 0 0-1.11.275c-.312.24-.505.543-.59.881a1.74 1.74 0 0 0-.906-.465 1.47 1.47 0 0 0-.82.106l-2.182-2.182a1.56 1.56 0 0 0-2.2 0 1.54 1.54 0 0 0-.396.701 1.56 1.56 0 0 0-2.21-.01 1.55 1.55 0 0 0-.416.753c-.624-.624-1.649-.624-2.237-.037a1.557 1.557 0 0 0 0 2.2c-.239.1-.501.238-.715.453a1.56 1.56 0 0 0 0 2.2l.516.515a1.556 1.556 0 0 0-.753 2.615L7.01 19c1.32 1.319 2.909 2.189 4.475 2.449q.482.08.971.08c.85 0 1.653-.198 2.393-.579.231.033.46.054.686.054 1.266 0 2.457-.52 3.505-1.567 2.763-2.763 2.552-5.734 1.439-7.586z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  )}{" "}
                  <span className="text-[#191919] text-[13px] font-Poppins ">
                    6,061
                  </span>
                </div>
                {/* Comments */}
                <div>
                  <div
                    onClick={() => setReplies((prev) => !prev)}
                    className="flex items-center gap-2"
                  >
                    {repiles ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="text-[#6b6b6b] cursor-pointer"
                        >
                          <path
                            fill="currentColor"
                            d="M18.006 16.803c1.533-1.456 2.234-3.325 2.234-5.321C20.24 7.357 16.709 4 12.191 4S4 7.357 4 11.482c0 4.126 3.674 7.482 8.191 7.482.817 0 1.622-.111 2.393-.327.231.2.48.391.744.559 1.06.693 2.203 1.044 3.399 1.044.224-.008.4-.112.486-.287a.49.49 0 0 0-.042-.518c-.495-.67-.845-1.364-1.04-2.057a4 4 0 0 1-.125-.598zm-3.122 1.055-.067-.223-.315.096a8 8 0 0 1-2.311.338c-4.023 0-7.292-2.955-7.292-6.587 0-3.633 3.269-6.588 7.292-6.588 4.014 0 7.112 2.958 7.112 6.593 0 1.794-.608 3.469-2.027 4.72l-.195.168v.255c0 .056 0 .151.016.295.025.231.081.478.154.733.154.558.398 1.117.722 1.659a5.3 5.3 0 0 1-2.165-.845c-.276-.176-.714-.383-.941-.59z"
                          ></path>
                        </svg>
                        <span className="text-[#191919] text-[13px] font-Poppins">
                          Hide Replies
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="text-[#6b6b6b] cursor-pointer"
                        >
                          <path
                            fill="currentColor"
                            d="M18.006 16.803c1.533-1.456 2.234-3.325 2.234-5.321C20.24 7.357 16.709 4 12.191 4S4 7.357 4 11.482c0 4.126 3.674 7.482 8.191 7.482.817 0 1.622-.111 2.393-.327.231.2.48.391.744.559 1.06.693 2.203 1.044 3.399 1.044.224-.008.4-.112.486-.287a.49.49 0 0 0-.042-.518c-.495-.67-.845-1.364-1.04-2.057a4 4 0 0 1-.125-.598zm-3.122 1.055-.067-.223-.315.096a8 8 0 0 1-2.311.338c-4.023 0-7.292-2.955-7.292-6.587 0-3.633 3.269-6.588 7.292-6.588 4.014 0 7.112 2.958 7.112 6.593 0 1.794-.608 3.469-2.027 4.72l-.195.168v.255c0 .056 0 .151.016.295.025.231.081.478.154.733.154.558.398 1.117.722 1.659a5.3 5.3 0 0 1-2.165-.845c-.276-.176-.714-.383-.941-.59z"
                          ></path>
                        </svg>
                        <span className="text-[#191919] text-[13px] font-Poppins">
                          47
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div
                onClick={() => setReplyShow((prev) => !prev)}
                className="flex cursor-pointer hover:underline gap-4 text-[#191919] text-[14px] font-Poppins"
              >
                Reply
              </div>
            </div>

            {repiles && (
              <div className="mb-10">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Avatar sx={{ width: 34, height: 34 }}>N</Avatar>
                    <div className="flex flex-col">
                      <h5 className="text-gray-800 font-Poppins leading-none text-sm">
                        Naveed Abbasi
                      </h5>
                      <span className="text-[#6b6b6b] text-xs">
                        21 Days Ago
                      </span>
                    </div>
                    <span className="py-1 px-3 bg-green-600 text-white rounded-full text-xs font-medium -mt-4">
                      Author
                    </span>
                  </div>

                  <Menu>
                    <MenuButton>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M4.385 12c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41m5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59s-.58.86-.58 1.41m5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59s1.03-.2 1.42-.59.58-.86.58-1.41-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59s-.58.86-.58 1.41"
                        ></path>
                      </svg>
                    </MenuButton>

                    <MenuItems className="w-40 origin-top-right shadow-lg rounded-xl bg-white p-1 text-sm">
                      <MenuItem>
                        <button className="flex w-full items-center gap-2 rounded-lg py-1 px-3 hover:bg-gray-100">
                          Report
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
                <p className="font-Poppins text-[#6b6b6b] text-[14px] p-4">
                  Liked the article! I always stocked to a rule of thumb for
                  placing input instructions, which is instructions & needed
                  information as a hint (under the input), and example as a
                  placeholder. I saw you didn’t recommend placing also the
                  examples in the placeholders, so I’m curious to hear your
                  thoughts about it (what do you use the placeholder for) Great
                  article 😄
                </p>
              </div>
            )}

            {replyShow && (
              <div className="w-[90%] h-full mt-5 mb-10 ml-10">
                <div className="w-full h-auto p-2 shadow-md bg-white rounded-xl">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <Avatar sx={{ width: 34, height: 34 }}>N</Avatar>
                      <div className="flex flex-col">
                        <h5 className="text-gray-800 font-Poppins leading-none text-sm">
                          Naveed Abbasi
                        </h5>
                        <span className="text-[#6b6b6b] text-xs">
                          21 Days Ago
                        </span>
                      </div>
                      <span className="py-1 px-3 bg-green-600 text-white rounded-full text-xs font-medium -mt-4">
                        Author
                      </span>
                    </div>

                    <Menu>
                      <MenuButton>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M4.385 12c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41m5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59s-.58.86-.58 1.41m5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59s1.03-.2 1.42-.59.58-.86.58-1.41-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59s-.58.86-.58 1.41"
                          ></path>
                        </svg>
                      </MenuButton>

                      <MenuItems className="w-40 origin-top-right shadow-lg rounded-xl bg-white p-1 text-sm">
                        <MenuItem>
                          <button className="flex w-full items-center gap-2 rounded-lg py-1 px-3 hover:bg-gray-100">
                            Report
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                  <div className="w-full h-full mt-4">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="What are your thoughts?"
                      className="w-full h-24 p-3 font-poppins outline-none border rounded-lg shadow-sm resize-none"
                    ></textarea>
                    <div className="flex items-center justify-between mt-2">
                      <button
                        onClick={handleShowPickerReply}
                        className="p-2  text-white rounded-lg hover:bg-[#4CA38A]"
                      >
                        😀
                      </button>
                      <button className="px-4 py-2 bg-[#5EC1A1] text-white rounded-lg hover:bg-[#4CA38A]">
                        Respond
                      </button>
                    </div>

                    {loading && (
                      <div className="flex justify-center items-center mt-2">
                        <CircularProgress size={24} />
                      </div>
                    )}

                    {/* Emoji picker */}
                    {showPickerReply && !loadingReply && (
                      <div className="w-full mt-3 h-auto bg-white">
                        <EmojiPicker
                          onSelect={handleEmojiSelect}
                          width={420}
                          height={400}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SimpleBar>
    </div>
  );
}
