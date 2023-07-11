import { LoaderArgs, type V2_MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
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

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Movie details" },
    { name: "description", content: "Welcome to movie details!" },
  ];
};
export default function MovieId() {
  const data = useLoaderData();
  return (
    <div className=" min-h-screen max-w-screen-2xl px-4 md:px-10">
      <div className="grid  md:grid-cols-2 gap-8 mt-10">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
            alt={data.title}
            className="h-[70vh] object-cover w-full rounded-lg"
          />
        </div>
        <div className=" flex flex-col gap-3">
          <h1 className=" text-xl md:text-3xl font-bold">{data.title}</h1>

          <p className="text-gray-500">
            <span className=" text-black">Overview:</span> {data.overview}
          </p>
          <p className="text-gray-500">
            <span className=" text-black">Release date:</span>{" "}
            {data.release_date}
          </p>
          <p className="text-black mb-6 ">
            Genres:{" "}
            {data.genres.map((item: any) => (
              <span key={item.name} className="text-gray-500 ">{item.name}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
