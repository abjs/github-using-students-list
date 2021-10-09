import { useEffect, useState } from "react";
export default function App() {
  const [reviewData, setReviewData] = useState<ReviewComponentProps[] | []>([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://raw.githubusercontent.com/abjs/github-using-students-list/main/data.json"
      );
      const { Data } = await response.json();
      const dataArray = Object.keys(Data).map((key) => Data[key]);
      console.log(dataArray);
      setReviewData(dataArray);
    }
    try {
      fetchData();
    } catch (error) {
      console.log("error", error);
    }
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
  const github_user_name = github.replace("https://github.com/", "");
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
