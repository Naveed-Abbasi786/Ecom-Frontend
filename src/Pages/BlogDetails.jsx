import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Blog from "../assets/img/news-1.jpg";
import Blog2 from "../assets/img/news-2.jpg";
import Blog3 from "../assets/img/news-3.jpg";
import Footer from "../Components/Footer";
import CommentsSideBar from "../Components/CommentsSideBar";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import BlogSlides from "../Components/BlogSlides";
import PageHeader from "../Components/PageHeader";
import axios from "axios";
import CardStyle from "../Components/CardStyle";
export default function BlogDetails() {
  const [Save, SetSave] = useState(false);
  const [Like, SetLike] = useState(false);
  const [blog, SetBlog] = useState({});
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const token = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(false);
  const BlogData = [
    {
      by: "by Hồng Lưu Xuân",
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      subHeading: "in Blog Grid 2 Columns",
      dis: "Sed pretium, ligula sollicitudin eget blandit nunc tortor eu nibh. laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.igula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti viverra, tort...",
      profilePic: Blog,
    },
    {
      by: "by Hồng Lưu Xuân",
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      subHeading: "in Blog Grid 2 Columns",
      dis: "Sed pretium, ligula sollicitudin eget blandit nunc tortor eu nibh. laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.igula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti viverra, tort...",
      profilePic: Blog,
    },
    {
      by: "by Hồng Lưu Xuân",
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      subHeading: "in Blog Grid 2 Columns",
      dis: "Sed pretium, ligula sollicitudin eget blandit nunc tortor eu nibh. laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.igula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti viverra, tort...",
      profilePic: Blog,
    },
    {
      by: "by Hồng Lưu Xuân",
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      subHeading: "in Blog Grid 2 Columns",
      dis: "Sed pretium, ligula sollicitudin eget blandit nunc tortor eu nibh. laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.igula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti viverra, tort...",
      profilePic: Blog,
    },
  ];
  const Guides = [
    {
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      profilePic: Blog,
    },
    {
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      profilePic: Blog,
    },
    {
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      profilePic: Blog,
    },
    {
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      profilePic: Blog,
    },
    {
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      profilePic: Blog,
    },
  ];

  const { id } = useParams();
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${API_URL}/api/blog/`,
          { blogId: id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        SetBlog(response.data.blog);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCommentsSidebar, setisCommentsSidebar] = useState(false);
  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Header />
      {/* <CardStyle/> */}
      <div>
        <PageHeader
          title="Blog Detsils"
          subtitle="Blog"
          breadcrumbs={[
            { label: "Home", link: "/" },
            { label: "Blog Listing", link: "/blog-listing" },
            { label: "Blog Details", link: "/blog-details" },
          ]}
        />
      </div>
      <div className="w-[90%] h-full mb-5 flex ml-[5%] mt-4 border-t border-1">
        <div className="w-[80%] h-full mx-auto mt-10">
          <div className="w-[100%] h-[70vh]">
            <img
              alt=""
              src={`${API_URL}${blog?.images}`}
              className="w-full h-full object-cover"
            />
          </div>
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
                <span className="text-[#191919] text-[13px] font-SohneNormal ">
                  6,061
                </span>
              </div>
              {/* Comments */}
              <div>
                {/* Backdrop */}
                {isSidebarOpen && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
                    onClick={handleCloseSidebar}
                  ></div>
                )}

                {/* Sidebar */}
                <CommentsSideBar
                  blogId={id}
                  blogComments={blog.comments}
                  isOpen={isSidebarOpen}
                  closeSidebar={handleCloseSidebar}
                />

                {/* Sidebar Toggle Button */}
                <div
                  onClick={handleOpenSidebar}
                  className="flex items-center gap-2"
                >
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
                  <span className="text-[13px] font-SohneNormal text-[#156d12]">
                    {/* 47 */}
                    {blog.comments?.length === 0
                      ? "No Comments"
                      : blog.comments?.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {Save ? (
                <>
                  <svg
                    onClick={() => SetSave(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="cursor-pointer"
                  >
                    <path
                      fill="#000"
                      d="M7.5 3.75a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-14a2 2 0 0 0-2-2z"
                    ></path>
                  </svg>
                </>
              ) : (
                <svg
                  onClick={() => SetSave(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-[#6b6b6b] hover:text-black cursor-pointer"
                >
                  <path
                    fill="currentColor"
                    d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4z"
                  ></path>
                </svg>
              )}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="text-[#6b6b6b] hover:text-black cursor-pointer"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0m9-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m3.376 10.416-4.599 3.066a.5.5 0 0 1-.777-.416V8.934a.5.5 0 0 1 .777-.416l4.599 3.066a.5.5 0 0 1 0 .832"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="text-[#6b6b6b] hover:text-black cursor-pointer"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M15.218 4.931a.4.4 0 0 1-.118.132l.012.006a.45.45 0 0 1-.292.074.5.5 0 0 1-.3-.13l-2.02-2.02v7.07c0 .28-.23.5-.5.5s-.5-.22-.5-.5v-7.04l-2 2a.45.45 0 0 1-.57.04h-.02a.4.4 0 0 1-.16-.3.4.4 0 0 1 .1-.32l2.8-2.8a.5.5 0 0 1 .7 0l2.8 2.79a.42.42 0 0 1 .068.498m-.106.138.008.004v-.01zM16 7.063h1.5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11c-1.1 0-2-.9-2-2v-10a2 2 0 0 1 2-2H8a.5.5 0 0 1 .35.15.5.5 0 0 1 .15.35.5.5 0 0 1-.15.35.5.5 0 0 1-.35.15H6.4c-.5 0-.9.4-.9.9v10.2a.9.9 0 0 0 .9.9h11.2c.5 0 .9-.4.9-.9v-10.2c0-.5-.4-.9-.9-.9H16a.5.5 0 0 1 0-1"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <Menu>
                <MenuButton>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-[#6b6b6b] hover:text-black cursor-pointer"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M4.385 12c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41m5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59s-.58.86-.58 1.41m5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59s1.03-.2 1.42-.59.58-.86.58-1.41-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59s-.58.86-.58 1.41"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  {/* <ChevronDownIcon className="size-4 fill-white/60" /> */}
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="w-52 origin-top-right shadow-lg rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 text-black rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200">
                      {/* <PencilIcon className="size-4 fill-black" /> */}
                      Edit
                      <kbd className="ml-auto hidden font-sans text-xs text-black group-data-[focus]:inline">
                        ⌘E
                      </kbd>
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center  text-black gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200">
                      {/* <Square2StackIcon className="size-4 fill-black" /> */}
                      Duplicate
                      <kbd className="ml-auto hidden font-sans text-xs text-black group-data-[focus]:inline">
                        ⌘D
                      </kbd>
                    </button>
                  </MenuItem>
                  <div className="my-1 h-px bg-gray-200" />
                  <MenuItem>
                    <button className="group flex w-full items-center  text-black gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200">
                      {/* <ArchiveBoxXMarkIcon className="size-4 fill-black" /> */}
                      Archive
                      <kbd className="ml-auto hidden font-sans text-xs text-black group-data-[focus]:inline">
                        ⌘A
                      </kbd>
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 text-black rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200">
                      {/* <TrashIcon className="size-4 fill-black" /> */}
                      Delete
                      <kbd className="ml-auto hidden font-sans text-xs text-black group-data-[focus]:inline">
                        ⌘D
                      </kbd>
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
          <div>
            <div className="flex gap-2 mt-2">
              <p className="text-gray-500 text-sm lg:text-base font-Poppins">
                {blog?.author?.username}
              </p>
              <span className="text-gray-500 text-sm lg:text-base font-Poppins">
                |
              </span>
              <p className="text-gray-500 text-sm lg:text-base font-Poppins">
                {new Date(blog?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <h3 className="text-gray-800 cursor-pointer hover:text-[#5EC1A1] text-lg lg:text-2xl font-bold leading-6 lg:leading-8">
              {blog?.title}
            </h3>

            <p className="text-gray-600 text-sm lg:text-base mt-2">
              Blog Grid 2 Columns
            </p>
            <p
              dangerouslySetInnerHTML={{ __html: blog?.content }}
              className="text-[#6b6b6b] text-sm lg:text-base leading-6 mt-3"
            ></p>
            <p className="text-[#6b6b6b]  text-sm lg:text-base leading-6 mt-3">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
              neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium,
              ligula sollicitudin laoreet viverra, tortor libero sodales leo,
              eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo.
              Suspendisse potenti. adipiscing elit. Phasellus hendrerit.
              Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel,
              dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
              laoreet viverra, tortor libero sodales leo, eget blandit nunc
              tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.
            </p>

            <div className="flex lg:flex-row flex-col w-full lg:h-[60vh] h-full mt-8">
              <div className="lg:w-[36%] w-full h-full">
                <img src={Blog} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="lg:w-[64%] w-full ml-8">
                <h3 className="text-[24px] text-gray-800">
                  Quisque volutpat mattiseros.
                </h3>
                <ul className="list-disc h-full pl-5  mt-5">
                  <li className="text-[#6b6b6b] text-sm lg:text-base py-3 leading-6">
                    Sed pretium, ligula sollicitudin laoreet viverra, tortor
                    libero sodales leo, eget blandit nunc tortor eu nibh. Nullam
                    mollis. Ut justo. Suspendisse potenti.
                  </li>
                  <li className="text-[#6b6b6b] text-sm lg:text-base  py-3 leading-6">
                    Sed egestas, ante et vulputate volutpat, eros pede semper
                    est, vitae luctus metus libero eu augue. Morbi purus libero,
                    faucibus adipiscing, commodo quis, gravida id, est..
                  </li>
                  <li className="text-[#6b6b6b] text-sm lg:text-base  py-3 leading-6">
                    Sed lectus. Praesent elementum hendrerit tortor. Sed semper
                    lorem at felis. Vestibulum volutpat, lacus a ultrices
                    sagittis, mi neque euismod dui, eu pulvinar nunc sapien
                    ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et,
                    dapibus sed, urna.
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-[#6b6b6b] text-md  leading-8 mt-8">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
              neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium,
              ligula sollicitudin laoreet viverra, tortor libero sodales leo,
              eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo.
              Suspendisse potenti. adipiscing elit.{" "}
              <span className="underline cursor-pointer hover:text-gray-800">
                mattis vel,
              </span>{" "}
              Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
              neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium,
              ligula sollicitudin laoreet viverra, tortor libero sodales leo,
              eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo.
              Suspendisse potenti.
            </p>

            <h3 className="text-[24px] text-gray-800 mt-5">
              Morbi interdum mollis sapien.
            </h3>
            <div className="w-full h-[55vh] lg:mt-0 mt-3  gap-4 flex lg:flex-row flex-col">
              <img
                src={Blog2}
                alt=""
                className="lg:w-[60%] w-full h-full object-cover"
              />
              <img
                src={Blog3}
                alt=""
                className="lg:w-[30%] w-full h-full object-cover"
              />
            </div>

            <p className="text-[#6b6b6b] text-md leading-8 mt-8">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
              neque, aliquet vel, dapibus id,{" "}
              <span className="underline cursor-pointer hover:text-gray-800">
                mattis vel,
              </span>{" "}
              nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor
              libero sodales leo, eget blandit nunc tortor eu nibh. Nullam
              mollis. Ut justo. Suspendisse potenti. adipiscing elit. Phasellus
              hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque,
              aliquet vel, dapibus id, mattis vel, ligula laoreet viverra,
              tortor libero sodales leo, eget blandit nunc{" "}
              <span className="underline cursor-pointer hover:text-gray-800">
                {" "}
                sollicitudin,
              </span>{" "}
              nisi. Sed pretium, torto
            </p>
            <p className="text-[#6b6b6b] text-md leading-8 mt-8">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
              neque, aliquet vel, dapibus id, nisi. Sed pretium, ligula
              sollicitudin laoreet viverra, tortor libero sodales leo, eget
              blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse
              potenti. adipiscing elit.{" "}
              <span className="underline cursor-pointer hover:text-gray-800">
                {" "}
                Phasellus hendrerit.
              </span>
              Pellentesque aliquet nibh nec urna. torto
            </p>

            <div className="flex items-center gap-4 mt-8">
              {" "}
              <h4 className="text-gray-800">Tags :</h4>
              <span className="bg-[#FFFFFF] text-gray-400 border px-3 py-1  text-[14px]">
                Phtography
              </span>
              <span className="bg-[#FFFFFF] text-gray-400 border px-3 py-1  text-[14px]">
                Style
              </span>
              <span className="bg-[#FFFFFF] text-gray-400 border px-3 py-1  text-[14px]">
                Camera
              </span>
            </div>

            <BlogSlides />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
