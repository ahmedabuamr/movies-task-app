import { ActionArgs, type V2_MetaFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Movies App" },
    { name: "description", content: "Welcome to movies app!" },
  ];
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const query = formData.get("query") as string;
  if (query.length == 0) {
    return redirect(`/`);
  } else {
  }
  return redirect(`movie/${query}/search`);
}

export default function Index() {
  return (
    <div className=" bg-white py-6 sm:py-8 lg:py-12 ">
      <div className=" max-w-screen-2xl m-auto px-4 md:px-10">
        <div className=" mb-10 mt-12 md:mb-16 text-center">
          <h1 className=" mb-4 text-center text-2xl fotn-bold text-gray-800 md:mb-6 lg:text-3xl">
            Movies App
          </h1>
          <Form method="POST">
            <div className="flex justify-center items-center gap-2 ">
              <input
                type="text"
                placeholder="Search movie"
                name="query"
                className="w-[60%] border border-teal-500 rounded-lg p-2"
              />
              <button
                type="submit"
                className="bg-teal-500 px-4 py-2 rounded-lg text-white"
              >
                Search
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
