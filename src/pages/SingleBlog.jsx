import { useCallback, useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import useAxios from "../hooks/useAxios";

import { useParams } from "react-router-dom";
import formatDate from "../utils/formateDate";

// {
//   "id": "4321b782f360f58c8c85",
//   "title": "Scope and Scope Chain in JavaScript",
//   "content": "In Simple, we can assume Scope as the area, where our program can access our declared variables. Simple is that. There is no Rocket Science behind this to get confused.\n\nBut there are some types of Scope, and we need to understand the differences and how it works. Cause, In larger projects it will help us to avoid collisions.\n\nSo there are 3 types of Scope in JavaScript:\n\n1. Global Scope\n\n2. Function Scope\n\n3. Block Scope.\n\nGlobal Scope:\n\nGlobal Scope is a global area of our JavaScript Codes. It is a default Scope. Any Variable or function that’s not inside any function or block, is inside the global scope by default. So everything we write in our code is into the Global Scope or Globally accessible.\n\nLet’s See an Example:\n\n\nSo, in the example, we declared the name variable and the showName() function in the Global Scope. We can get the value of the name and invoke showName() function from anywhere. That’s we are able to access the name variable from inside the showName() function.\n\nFunctional Scope:\n\nFunctional scope is also known as Local Scope. In functional Scope, variables are declared into a function which means between the curly brackets. And most importantly those variables are only accessible into the function. We can access those variables outside of the function.\n\nLet’s see an example:\n\n\nSo, We can see that we cannot access the variables which are declared in the functional scope outside of that function. And also we can see that functional scope creates its own environment and it doesn’t modify the global variables (name variable remains ‘Tamim’ )\n\nBlock Scope:\n\nSo, Block Scope is almost similar to Function Scope but just applicable for let and const. The area between if/else, loop or switch case is considered as block scope. The declared let/const variables can only be accessed into the scope. But It differs when it comes to the var. We can access the ‘var’ variables outside of the block scopes.\n\nLet’s see an Example:\n\n\nScope Chaining:\n\nScope Chaining is another important concept in JavaScript. Actually, It’s the behavior of JavaScript, how the program will act, or which variable will javaScript pick at a certain point. As we know till now about the three scopes, When JavaScript runs, the browser scope tries to find a variable value in the current scope. If it could not find the value, It tries to go outside of the current scope to find out the value. And it will continue this process until it finds out the variable value or it reaches the Global Scope. In the end, if It fails to find out the value of the variable it will throw a ‘ReferenceError’ or print undefined. And try to relate it by yourself.",
//   "thumbnail": "thumbnail-1708765297564-606798153.png",
//   "author": {
//       "id": "3d2dde4b6548275fb066",
//       "firstName": "Saad",
//       "lastName": "Hasan",
//       "avatar": "avatar-1708764856675-623317122.jpg"
//   },
//   "tags": "JavaScript, Async, Scope",
//   "likes": [
//       {
//           "id": "346d7a36b3c41f3fbfa2"
//       }
//   ],
//   "comments": [
//       {
//           "id": "19becccf4ebf3e6cf385",
//           "content": "অনেক সুন্দর হয়েছে",
//           "author": {
//               "id": "346d7a36b3c41f3fbfa2",
//               "firstName": "Tapas",
//               "lastName": "Adhikary",
//               "avatar": "avatar-1708764766479-243448656.png"
//           }
//       }
//   ],
//   "createdAt": "2024-02-24T09:01:37.581Z",
//   "isFavourite": false
// }

export default function SingleBlog() {
  const { api } = useAxios();
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  const fetchSingleBlog = useCallback(
    async (blogId) => {
      const res = await api.get(`/blogs/${blogId}`);
      if (res.status === 200) {
        setBlog(res.data);
      }
    },
    [api]
  );

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchSingleBlog(id);
    }

    return () => {
      ignore = true;
    };
  }, [fetchSingleBlog, id]);

  const firstLetter = blog?.author?.firstName[0];
  const date = formatDate(blog.createdAt);

  return (
    <Layout>
      {/* Begin Blogs */}
      <section>
        <div className="container text-center py-8">
          <h1 className="font-bold text-3xl md:text-5xl">{blog?.title}</h1>
          <div className="flex justify-center items-center my-4 gap-4">
            <div className="flex items-center capitalize space-x-2">
              <div className="avater-img bg-indigo-600 text-white">
                <span className="">{firstLetter}</span>
              </div>
              <h5 className="text-slate-500 text-sm">
                {blog?.author?.firstName} {blog?.author?.lastName}
              </h5>
            </div>
            <span className="text-sm text-slate-700 dot">{date}</span>
            <span className="text-sm text-slate-700 dot">
              {" "}
              {blog?.likes?.length} {blog?.likes?.length > 1 ? "Likes" : "Like"}
            </span>
          </div>
          <img
            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
              blog?.thumbnail
            }`}
            alt="thumbnail"
          />
          {/* Tags */}
          <ul className="tags">
            {blog?.tags?.split(", ")?.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {/* Content */}
          <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
            {blog?.content}
          </div>
        </div>
      </section>
      {/* End Blogs */}
      {/* Begin Comments */}
      <section id="comments">
        <div className="mx-auto w-full md:w-10/12 container">
          <h2 className="text-3xl font-bold my-8">
            Comments ({blog?.comments?.length})
          </h2>
          <div className="flex items -center space-x-4">
            <div className="avater-img bg-indigo-600 text-white">
              <span className="">S</span>
            </div>
            <div className="w-full">
              <textarea
                className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                placeholder="Write a comment"
                defaultValue={""}
              />
              <div className="flex justify-end mt-4">
                <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                  Comment
                </button>
              </div>
            </div>
          </div>
          {/* Comment One */}
          <div className="flex items-start space-x-4 my-8">
            <div className="avater-img bg-orange-600 text-white">
              <span className="">S</span>
            </div>
            <div className="w-full">
              <h5 className="text-slate -500 font-bold">Saad Hasan</h5>
              <p className="text-slate-300">
                Today I was mob programming with Square&apos;s Mobile &amp;
                Performance Reliability team and we toyed with an interesting
                idea. Our codebase has classes that represent screens a user can
                navigate to. These classes are defined in modules, and these
                modules have an owner team defined. When navigating to a screen,
                we wanted to have the owner team information available, at
                runtime. We created a build tool that looks at about 1000 Screen
                classes, determines the owner team, and generates a class to do
                the lookup at runtime. The generated code looked like this:
              </p>
            </div>
          </div>
          {/* Comment Two */}
          <div className="flex items-start space-x-4 my-8">
            <div className="avater-img bg-green-600 text-white">
              <span className="">S</span>
            </div>
            <div className="w-full">
              <h5 className="text-slate -500 font-bold">Saad Hasan</h5>
              <p className="text-slate-300">
                Today I was mob programming with Square&apos;s Mobile &amp;
                Performance Reliability team and we toyed with an interesting
                idea. Our codebase has classes that represent screens a user can
                navigate to. These classes are defined in modules, and these
                modules have an owner team defined. When navigating to a screen,
                we wanted to have the owner team information available, at
                runtime. We created a build tool that looks at about 1000 Screen
                classes, determines the owner team, and generates a class to do
                the lookup at runtime. The generated code looked like this:
              </p>
            </div>
          </div>
          {/* Comment Three */}
          <div className="flex items-start space-x-4 my-8">
            <div className="avater-img bg-indigo-600 text-white">
              <span className="">S</span>
            </div>
            <div className="w-full">
              <h5 className="text-slate -500 font-bold">Saad Hasan</h5>
              <p className="text-slate-300">
                Today I was mob programming with Square&apos;s Mobile &amp;
                Performance Reliability team and we toyed with an interesting
                idea. Our codebase has classes that represent screens a user can
                navigate to. These classes are defined in modules, and these
                modules have an owner team defined. When navigating to a screen,
                we wanted to have the owner team information available, at
                runtime. We created a build tool that looks at about 1000 Screen
                classes, determines the owner team, and generates a class to do
                the lookup at runtime. The generated code looked like this:
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
