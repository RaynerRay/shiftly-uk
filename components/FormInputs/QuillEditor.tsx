// "use client";
// import React from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// export default function QuillEditor({
//   label,
//   // className = "w-full bg-green-500",
//   value,
//   onChange,
// }: {
//   label: string;
//   className: string;
//   value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
//   onChange: any; // eslint-disable-line @typescript-eslint/no-explicit-any
// }) {
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "color", "image"],
//       [{ "code-block": true }],
//       ["clean"],
//     ],
//   };
//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "link",
//     "indent",
//     "image",
//     "code-block",
//     "color",
//   ];
//   return (
//     <div className="w-[500px]">
//       <label
//         htmlFor="content"
//         className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
//       >
//         {label}
//       </label>
//       <ReactQuill
//         theme="snow"
//         value={value}
//         onChange={onChange}
//         modules={modules}
//         formats={formats}
//       />
//     </div>
//   );
// }
