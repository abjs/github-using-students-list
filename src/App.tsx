import { useEffect, useState } from "react";
export default function App() {
  const [reviewData, setReviewData] = useState<ReviewComponentProps[] | []>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/abjs/github-using-students-list/main/data.json"
        );
        const { data } = await response.json();
        setReviewData(data);
      } catch (error: any) {
        console.log(error);
        if (error.message === "Unexpected token < in JSON at position 0") {
          alert("Please check your internet connection and try again");
        }
      }
    }
    fetchData();
  }, []);
  return (
    <div className="app__container">
      <div className="app__component">
        {reviewData?.map((user_data, index) => (
          <ReviewComponent {...user_data} key={index} />
        ))}
      </div>
    </div>
  );
}

interface ReviewComponentProps {
  name: string;
  github: string;
  college: string;
  department: string;
}

export const ReviewComponent = ({
  name,
  github,
  college,
  department,
}: ReviewComponentProps) => {
  console.log(name, github, college, department);
  const github_user_name = github?.replace("https://github.com/", "");
  return (
    <div className="info__component">
      <a
        className="avatar_component"
        href={github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`${github}.png`} alt={"Github profile image of " + name} />
      </a>
      <div className="name_college_department">
        <p>
          Hey , this is <strong>{name}</strong> from <strong>{college}</strong>{" "}
          in <strong>{department}</strong> department.
        </p>
      </div>
      <a
        className="github_info"
        href={github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`https://github-readme-stats.vercel.app/api?username=${github_user_name}&&show_icons=true&title_color=000&icon_color=00f&text_color=000&bg_color=fff&hide_rank=true`}
          alt={`${name}`}
        />
      </a>
    </div>
  );
};
