
import React from "react";
import "./about.css";

export function About() {
  const [imageUrl, setImageUrl] = React.useState(
    "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
  );

  React.useEffect(() => {
    setImageUrl("/quiz.jpg");
  }, []);

  function handleImgError() {
    
    setImageUrl("/placeholder.jpg"); 
  }

  return (
    <main className="container text-center my-4">
      <div id="picture" className="picture-box mb-4">
        <img
          src={imageUrl}
          onError={handleImgError}
          alt="Trivia game"
          className="img-fluid rounded shadow"
          style={{ maxWidth: "420px" }}
        />
      </div>

      <p className="lead">
        Quiztopia is a multiplayer trivia game where players compete in real time.
        Trivia has been a crowd favorite for decades—Quiztopia brings that tradition
        into a slick, competitive online arena. Challenge friends and see who can
        answer the most questions!
      </p>
    </main>
  );
}

