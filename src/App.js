import star from "./assets/star.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import RepoForm from "./components/RepoForm/RepoForm";
import IssueTable from "./components/IssueTable/IssueTable";
import { useEffect } from "react";
import { chooseRepo, changeRepoList } from "./store/actions";


function App() {
  const dispatch = useDispatch();
  const currentRepo = useSelector(state => state.currentRepo);
  const isError = useSelector(state => state.isError);
  const isMoving = useSelector(state => state.isMoving);
  const url = useSelector(state => state.url);
  const stargazersList = useSelector(state => state.stargazersList);
  const repoList = useSelector(state => state.repoList);

  useEffect(() => {
    const storedRepoList = localStorage.getItem('repoList');
    const storedCurrentRepo = localStorage.getItem('currentRepo');

    if (storedRepoList) {
      dispatch(changeRepoList(JSON.parse(storedRepoList)));
      dispatch(chooseRepo(storedCurrentRepo));
    }
  }, [])

  return (
    <div className="App">
      {isMoving && <div className="App__background" />}

      <header className="App__header">
        <RepoForm />

        <div className="App__container">
          {isError ? "PAGE NOT FOUND"
            : (Object.keys(repoList).length && !!currentRepo
              ? (
                <>
                  <a className={`App__link ${isError ? "App__link--error" : ""}`} href={url.slice(0, url.lastIndexOf("/"))}>
                    {currentRepo[0].toUpperCase() + currentRepo.slice(1, currentRepo.lastIndexOf("/"))}
                  </a>
                  &gt;
                  <a className={`App__link ${isError ? "App__link--error" : ""}`} href={url}>
                    {currentRepo.slice(currentRepo.lastIndexOf("/"))[1].toUpperCase() + currentRepo.slice(currentRepo.lastIndexOf("/")).slice(2)}
                  </a>
                </>
              )
              : "Please Enter Repository URL"
          )}

          <img className="App__icon" src={star} alt="star" />
          {stargazersList[currentRepo] || 0} stars
        </div>
      </header>

      <IssueTable />
    </div>
  );
}

export default App;
