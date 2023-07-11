import { Link, useLoaderData } from "@remix-run/react";
import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Result page" },
    { name: "description", content: "Welcome to result page!" },
  ];
};
export async function loader({ params }: LoaderArgs) {
  const url = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${params.query}&include_adult=false&language=en-US&page=1`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmYwZmRlY2U4NGJiZGI1YTFiZmM2MjgxYjNlOGIxNCIsInN1YiI6IjVkNmI5OTIxNjU2ODZlNmQ3ZDg4MWU4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZyKIA0uXsqm2ouxV0QOY9aNjZOfSQLm7evuhMMzGSCI",
      },
    }
  );
  return json(await url.json());
}
export default function MovieList() {
  const data = useLoaderData();
  return (
    <>
      <div className=" bg-white py-6 sm:py-8 lg:py-12 ">
        <div className=" max-w-screen-2xl m-auto px-4 md:px-10">
          {data.results.length ? (
            <div className=" grid gap-4 sm:grid-cols-2 md:gap-6  lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 ">
              {data?.results?.map((movie: any) => (
                <div
                  key={movie.id}
                  className="flex flex-col overflow-hidden rounded-lg  border bg-white"
                >
                  <Link
                    className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
                    to={`/${movie.id}/details`}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-2ßß group-hover:scale-110"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <h2 className="mb-2 text-lg font-semibold text-gray-800">
                      <Link
                        to={`/${movie.id}/details`}
                        prefetch="intent"
                        className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                      >
                        {movie.title}
                      </Link>
                    </h2>

                    <p className="text-gray-500 line-clamp-3">
                      <span className=" text-black">Release date:</span>{" "}
                      {movie.release_date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className=" text-center">
              <h3 className=" text-2xl">
                The result not found return to{" "}
                <Link to="/" className=" underline">
                  search page
                </Link>
              </h3>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
